export function useKana() {
  function toHiragana(str: string): string {
    return str.replace(/[ァ-ヶ]/g, (c) =>
      String.fromCharCode(c.charCodeAt(0) - 0x60),
    );
  }

  const smallToLarge: Record<string, string> = {
    ゃ: 'や',
    ゅ: 'ゆ',
    ょ: 'よ',
    ぁ: 'あ',
    ぃ: 'い',
    ぅ: 'う',
    ぇ: 'え',
    ぉ: 'お',
    っ: 'つ',
  };

  const dakutenBase: Record<string, string> = {
    が: 'か',
    ぎ: 'き',
    ぐ: 'く',
    げ: 'け',
    ご: 'こ',
    ざ: 'さ',
    じ: 'し',
    ず: 'す',
    ぜ: 'せ',
    ぞ: 'そ',
    だ: 'た',
    ぢ: 'ち',
    づ: 'つ',
    で: 'て',
    ど: 'と',
    ば: 'は',
    び: 'ひ',
    ぶ: 'ふ',
    べ: 'へ',
    ぼ: 'ほ',
    ぱ: 'は',
    ぴ: 'ひ',
    ぷ: 'ふ',
    ぺ: 'へ',
    ぽ: 'ほ',
  };

  function getEffectiveLastChar(word: string): string {
    let i = word.length - 1;
    while (i > 0 && word[i] === 'ー') i--;
    return word[i];
  }

  function getNextChar(word: string): string {
    const normalized = toHiragana(word);
    let char = getEffectiveLastChar(normalized);

    if (char in smallToLarge) char = smallToLarge[char];
    if (char === 'を') char = 'お';

    return char;
  }

  function isEndsWithN(word: string): boolean {
    const normalized = toHiragana(word);
    return getEffectiveLastChar(normalized) === 'ん';
  }

  function matchesStartChar(word: string, startChar: string): boolean {
    const normalized = toHiragana(word);
    const first = normalized[0];
    if (first === startChar) return true;

    const baseFirst = dakutenBase[first] || first;
    const baseStart = dakutenBase[startChar] || startChar;
    return baseFirst === baseStart;
  }

  function isValidKana(str: string): boolean {
    return /^[ぁ-ゖァ-ヶー]+$/.test(str);
  }

  return {
    toHiragana,
    getNextChar,
    isEndsWithN,
    matchesStartChar,
    isValidKana,
  };
}
