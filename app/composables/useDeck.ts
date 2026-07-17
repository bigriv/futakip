export function useDeck<T>(items: readonly T[]) {
  const deck = ref<T[]>([]);

  function shuffle() {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    deck.value = arr;
  }

  function draw(): T {
    if (deck.value.length === 0) shuffle();
    return deck.value.pop()!;
  }

  function drawMany(count: number): T[] {
    return Array.from({ length: count }, () => draw());
  }

  shuffle();

  return { deck, shuffle, draw, drawMany };
}
