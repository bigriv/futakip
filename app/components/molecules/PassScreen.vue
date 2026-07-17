<script setup lang="ts">
interface Props {
  playerLabel?: string;
}

withDefaults(defineProps<Props>(), {
  playerLabel: '',
});

defineEmits<{
  next: [];
}>();
</script>

<template>
  <div
    class="flex min-h-dvh flex-col items-center justify-center px-6 text-center"
    @click="$emit('next')"
  >
    <div class="mb-8 text-6xl">🔒</div>
    <p class="mb-4 text-2xl font-bold text-paper">画面を伏せて渡してね</p>
    <p v-if="playerLabel" class="mb-8 text-lg text-muted">
      つぎは {{ playerLabel }} の番だよ
    </p>
    <p class="animate-pulse text-sm text-muted">
      受け取った人がタップしてね
    </p>
  </div>
</template>
