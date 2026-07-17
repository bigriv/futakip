import type { ShiritoriDifficulty, ShiritoriEntry } from '~/types/game';

type Phase = 'play' | 'pass' | 'gameover';

const difficultyLengths: Record<ShiritoriDifficulty, number> = {
  local: 3,
  express: 4,
  limited: 5,
};

const startCharCandidates =
  'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわ';

export const useShiritoriStore = defineStore('shiritori', () => {
  const { toHiragana, getNextChar, isEndsWithN, matchesStartChar, isValidKana } =
    useKana();

  const phase = ref<Phase>('play');
  const difficulty = ref<ShiritoriDifficulty>('local');
  const currentPlayer = ref(1);
  const currentChar = ref('');
  const history = ref<ShiritoriEntry[]>([]);
  const turn = ref(1);
  const loseReason = ref('');
  const loser = ref(0);

  const requiredLength = computed(() => difficultyLengths[difficulty.value]);

  function startGame(diff: ShiritoriDifficulty) {
    difficulty.value = diff;
    currentPlayer.value = 1;
    currentChar.value =
      startCharCandidates[Math.floor(Math.random() * startCharCandidates.length)];
    history.value = [];
    turn.value = 1;
    loseReason.value = '';
    loser.value = 0;
    phase.value = 'play';
  }

  function validate(word: string): string | null {
    const normalized = toHiragana(word.trim());

    if (!isValidKana(word.trim())) return 'ひらがな・カタカナで入力してね';
    if (normalized.length < 3) return '3文字以上で入力してね';
    if (!matchesStartChar(normalized, currentChar.value))
      return `「${currentChar.value}」から始まる言葉を入力してね`;

    const req = requiredLength.value;
    if (req && normalized.length !== req) return `${req}文字ちょうどで入力してね`;

    return null;
  }

  function submitWord(word: string): { valid: boolean; error?: string } {
    const trimmed = word.trim();
    const normalized = toHiragana(trimmed);

    const error = validate(trimmed);
    if (error) return { valid: false, error };

    if (isEndsWithN(normalized)) {
      history.value.push({
        word: normalized,
        player: currentPlayer.value,
        turn: turn.value,
      });
      loseReason.value = `「${normalized}」は「ん」で終わってる!`;
      loser.value = currentPlayer.value;
      phase.value = 'gameover';
      return { valid: true };
    }

    const existingWords = history.value.map((e) => e.word);
    if (existingWords.includes(normalized)) {
      history.value.push({
        word: normalized,
        player: currentPlayer.value,
        turn: turn.value,
      });
      loseReason.value = `「${normalized}」はもう出てた!`;
      loser.value = currentPlayer.value;
      phase.value = 'gameover';
      return { valid: true };
    }

    history.value.push({
      word: normalized,
      player: currentPlayer.value,
      turn: turn.value,
    });
    currentChar.value = getNextChar(normalized);
    currentPlayer.value = currentPlayer.value === 1 ? 2 : 1;
    turn.value++;
    phase.value = 'pass';

    return { valid: true };
  }

  function afterPass() {
    phase.value = 'play';
  }

  function reset() {
    phase.value = 'play';
  }

  return {
    phase,
    difficulty,
    currentPlayer,
    currentChar,
    history,
    turn,
    loseReason,
    loser,
    requiredLength,
    startGame,
    validate,
    submitWord,
    afterPass,
    reset,
  };
});
