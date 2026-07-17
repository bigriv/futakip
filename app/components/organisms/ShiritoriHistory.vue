<script setup lang="ts">
import type { ShiritoriEntry } from '~/types/game';

interface Props {
  history: ShiritoriEntry[];
  duplicateWord?: string;
}

withDefaults(defineProps<Props>(), {
  duplicateWord: '',
});
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="(entry, i) in history"
      :key="i"
      :class="[
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm',
        entry.player === 1 ? 'bg-orange/10' : 'bg-green/10',
        duplicateWord && entry.word === duplicateWord ? 'ring-2 ring-stamp' : '',
      ]"
    >
      <span
        :class="[
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white',
          entry.player === 1 ? 'bg-orange' : 'bg-green',
        ]"
      >
        {{ entry.player }}
      </span>
      <span class="font-bold text-ink">{{ entry.word }}</span>
      <span class="ml-auto text-xs text-muted">{{ entry.turn }}手目</span>
    </div>
  </div>
</template>
