<script setup lang="ts">
interface Props {
  score: number;
  maxScore: number;
  label?: string;
}

withDefaults(defineProps<Props>(), {
  label: 'スコア',
});
</script>

<template>
  <div class="text-center">
    <p class="mb-1 text-sm text-muted">{{ label }}</p>
    <p class="text-4xl font-bold text-ink">
      {{ score }}<span class="text-lg text-muted"> / {{ maxScore }}</span>
    </p>
  </div>
</template>
