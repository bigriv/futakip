import type { BestWorstQuestion } from '~/types/game';
import { bestWorstQuestions } from '~/data/bestWorstQuestions';

type Phase =
  | 'intro'
  | 'answer-best'
  | 'answer-worst'
  | 'pass'
  | 'guess-best'
  | 'guess-worst'
  | 'result'
  | 'final';

const TOTAL_QUESTIONS = 6;

const conversationPrompts = [
  'なんでそれが1位なのか聞いてみよう!',
  '最下位の理由が気になるね',
  'お互いの価値観、意外と違う?',
  '相手の意外な一面が見えたかも',
  'そのチョイス、わかる〜!',
  'なるほど、そういうタイプか!',
];

const titleThresholds = [
  { min: 0, max: 4, title: 'まだまだこれから!', comment: 'もっとおしゃべりしよう' },
  { min: 5, max: 8, title: 'なかなかの読み合い!', comment: 'いい勝負だね' },
  { min: 9, max: 13, title: 'お見通し!', comment: '相手のことよく分かってるね' },
  { min: 14, max: 18, title: '以心伝心!', comment: 'ふたりの絆はホンモノ' },
];

export const useBestWorstStore = defineStore('bestWorst', () => {
  const phase = ref<Phase>('intro');
  const questionIndex = ref(0);
  const answerer = ref(1);

  const questions = ref<BestWorstQuestion[]>([]);
  const currentQuestion = computed(() => questions.value[questionIndex.value]);

  const answerBest = ref(-1);
  const answerWorst = ref(-1);
  const guessBest = ref(-1);
  const guessWorst = ref(-1);

  const scores = ref([0, 0]);

  const deck = useDeck(bestWorstQuestions);

  const currentConversationPrompt = computed(
    () => conversationPrompts[questionIndex.value % conversationPrompts.length],
  );

  const bestCorrect = computed(() => guessBest.value === answerBest.value);
  const worstCorrect = computed(() => guessWorst.value === answerWorst.value);
  const roundScore = computed(() => {
    if (bestCorrect.value && worstCorrect.value) return 3;
    if (bestCorrect.value || worstCorrect.value) return 1;
    return 0;
  });

  const totalScore = computed(() => scores.value[0] + scores.value[1]);
  const finalTitle = computed(() => {
    const t = titleThresholds.find(
      (th) => totalScore.value >= th.min && totalScore.value <= th.max,
    );
    return t || titleThresholds[0];
  });

  function start() {
    questions.value = deck.drawMany(TOTAL_QUESTIONS);
    questionIndex.value = 0;
    answerer.value = 1;
    scores.value = [0, 0];
    answerBest.value = -1;
    answerWorst.value = -1;
    guessBest.value = -1;
    guessWorst.value = -1;
    phase.value = 'answer-best';
  }

  function selectBest(index: number) {
    answerBest.value = index;
    phase.value = 'answer-worst';
  }

  function selectWorst(index: number) {
    answerWorst.value = index;
    phase.value = 'pass';
  }

  function afterPass() {
    guessBest.value = -1;
    guessWorst.value = -1;
    phase.value = 'guess-best';
  }

  function guessBestOption(index: number) {
    guessBest.value = index;
    phase.value = 'guess-worst';
  }

  function guessWorstOption(index: number) {
    guessWorst.value = index;
    const guesserIndex = answerer.value === 1 ? 1 : 0;
    scores.value[guesserIndex] += roundScore.value;
    phase.value = 'result';
  }

  function nextQuestion() {
    questionIndex.value++;
    if (questionIndex.value >= TOTAL_QUESTIONS) {
      phase.value = 'final';
      return;
    }
    answerer.value = answerer.value === 1 ? 2 : 1;
    answerBest.value = -1;
    answerWorst.value = -1;
    guessBest.value = -1;
    guessWorst.value = -1;
    phase.value = 'answer-best';
  }

  function reset() {
    phase.value = 'intro';
    questionIndex.value = 0;
  }

  return {
    phase,
    questionIndex,
    totalQuestions: TOTAL_QUESTIONS,
    answerer,
    currentQuestion,
    answerBest,
    answerWorst,
    guessBest,
    guessWorst,
    scores,
    bestCorrect,
    worstCorrect,
    roundScore,
    totalScore,
    finalTitle,
    currentConversationPrompt,
    start,
    selectBest,
    selectWorst,
    afterPass,
    guessBestOption,
    guessWorstOption,
    nextQuestion,
    reset,
  };
});
