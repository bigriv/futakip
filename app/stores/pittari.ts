import type { PittariTheme } from '~/types/game';
import { pittariThemes } from '~/data/pittariThemes';

type Phase = 'intro' | 'answer' | 'pass' | 'guess' | 'result' | 'pass-next' | 'final';

const TOTAL_ROUNDS = 5;

const judgments = [
  { maxDiff: 0, label: 'ピッタリ!', score: 4 },
  { maxDiff: 5, label: '以心伝心!', score: 3 },
  { maxDiff: 15, label: 'いいかんじ', score: 2 },
  { maxDiff: 30, label: 'おしい', score: 1 },
  { maxDiff: Infinity, label: 'すれ\nちがい…', score: 0 },
] as const;

const titleThresholds = [
  { min: 0, max: 4, title: 'すれちがい\n列車…', comment: 'もっと一緒にいよう!' },
  { min: 5, max: 9, title: 'まずまずの\n相性!', comment: '伸びしろあり' },
  { min: 10, max: 14, title: 'いい感じ!', comment: '心の距離が近いね' },
  { min: 15, max: 20, title: 'テレパシー\nレベル!', comment: '通じ合いすぎ!' },
];

function generateSecretNumber(): number {
  const raw = Math.random();
  const adjusted = 0.05 + 0.9 * raw;
  return Math.max(1, Math.min(100, Math.round(adjusted * 100)));
}

export const usePittariStore = defineStore('pittari', () => {
  const phase = ref<Phase>('intro');
  const roundIndex = ref(0);
  const answerer = ref(1);

  const themes = ref<PittariTheme[]>([]);
  const currentTheme = computed(() => themes.value[roundIndex.value]);
  const secretNumber = ref(0);
  const guessValue = ref(50);
  const totalScore = ref(0);
  const roundScores = ref<number[]>([]);

  const deck = useDeck(pittariThemes);

  const currentDiff = computed(() => Math.abs(secretNumber.value - guessValue.value));
  const currentJudgment = computed(
    () => judgments.find((j) => currentDiff.value <= j.maxDiff)!,
  );

  const finalTitle = computed(() => {
    const t = titleThresholds.find(
      (th) => totalScore.value >= th.min && totalScore.value <= th.max,
    );
    return t || titleThresholds[0];
  });

  function start() {
    themes.value = deck.drawMany(TOTAL_ROUNDS);
    roundIndex.value = 0;
    answerer.value = 1;
    totalScore.value = 0;
    roundScores.value = [];
    secretNumber.value = generateSecretNumber();
    guessValue.value = 50;
    phase.value = 'answer';
  }

  function confirmAnswer() {
    phase.value = 'pass';
  }

  function afterPass() {
    guessValue.value = 50;
    phase.value = 'guess';
  }

  function submitGuess() {
    const score = currentJudgment.value.score;
    totalScore.value += score;
    roundScores.value.push(score);
    phase.value = 'result';
  }

  function nextRound() {
    roundIndex.value++;
    if (roundIndex.value >= TOTAL_ROUNDS) {
      phase.value = 'final';
      return;
    }
    answerer.value = answerer.value === 1 ? 2 : 1;
    secretNumber.value = generateSecretNumber();
    guessValue.value = 50;
    phase.value = 'pass-next';
  }

  function afterPassNext() {
    phase.value = 'answer';
  }

  function reset() {
    phase.value = 'intro';
    roundIndex.value = 0;
  }

  return {
    phase,
    roundIndex,
    totalRounds: TOTAL_ROUNDS,
    answerer,
    currentTheme,
    secretNumber,
    guessValue,
    totalScore,
    roundScores,
    currentDiff,
    currentJudgment,
    finalTitle,
    start,
    confirmAnswer,
    afterPass,
    submitGuess,
    nextRound,
    afterPassNext,
    reset,
  };
});
