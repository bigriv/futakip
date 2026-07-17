<script setup lang="ts">
interface Props {
  secret: number;
  guess: number;
  low: string;
  high: string;
}

defineProps<Props>();
</script>

<template>
  <div>
    <div class="flex justify-between text-xs text-muted">
      <span>1: {{ low }}</span>
      <span>100: {{ high }}</span>
    </div>
    <div class="relative mt-8 mb-8 h-6 rounded-full bg-paper-edge">
      <div
        class="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-green border-2 border-white shadow"
        :style="{ left: `calc(${(secret - 1) / 99 * 100}% - 10px)` }"
      >
        <span
          class="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-green px-1.5 py-0.5 text-xs font-bold text-white"
        >
          {{ secret }}
        </span>
      </div>
      <div
        class="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-orange border-2 border-white shadow"
        :style="{ left: `calc(${(guess - 1) / 99 * 100}% - 10px)` }"
      >
        <span
          class="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-orange px-1.5 py-0.5 text-xs font-bold text-white"
        >
          {{ guess }}
        </span>
      </div>
    </div>
    <div class="flex justify-center gap-6 text-xs">
      <span class="flex items-center gap-1">
        <span class="inline-block h-3 w-3 rounded-full bg-green" />
        ひみつの数字
      </span>
      <span class="flex items-center gap-1">
        <span class="inline-block h-3 w-3 rounded-full bg-orange" />
        予想
      </span>
    </div>
  </div>
</template>
