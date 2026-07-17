<script setup lang="ts">
import type { GameInfo } from '~/types/game';

interface Props {
  game: GameInfo;
}

defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="game.path"
    class="ticket-card group relative block rounded bg-paper px-5 py-4 shadow-lg transition-transform active:scale-[0.98]"
  >
    <div class="mb-2 flex items-center justify-between">
      <span class="text-xs font-bold tracking-widest text-muted">乗車券</span>
      <BadgeLabel :genre="game.genre" />
    </div>
    <div class="border-t border-dashed border-paper-edge pt-3">
      <h3 class="mb-1 text-lg font-bold text-ink">{{ game.title }}</h3>
      <p class="text-sm text-muted">{{ game.subtitle }}</p>
    </div>
    <div class="mt-3 border-t border-dashed border-paper-edge pt-2">
      <p class="text-xs text-ink/60">{{ game.description }}</p>
    </div>
    <div class="ticket-notch-left" />
    <div class="ticket-notch-right" />
  </NuxtLink>
</template>

<style scoped>
.ticket-notch-left,
.ticket-notch-right {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #1f2a44;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}

.ticket-notch-left {
  left: -10px;
}

.ticket-notch-right {
  right: -10px;
}
</style>
