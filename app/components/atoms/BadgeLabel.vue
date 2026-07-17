<script setup lang="ts">
import type { GameGenre } from '~/types/game';

interface Props {
  genre: GameGenre;
}

defineProps<Props>();

const colorMap: Record<GameGenre, string> = {
  推理: 'bg-orange/20 text-orange',
  協力: 'bg-green/20 text-green',
  心理戦: 'bg-stamp/20 text-stamp',
};
</script>

<template>
  <span
    :class="[
      'inline-block rounded-full px-3 py-0.5 text-xs font-bold tracking-wider',
      colorMap[genre],
    ]"
  >
    {{ genre }}
  </span>
</template>
