<script setup lang="ts">
interface Props {
  text: string;
}

defineProps<Props>();
</script>

<template>
  <div class="stamp-container inline-flex items-center justify-center">
    <div
      class="stamp-mark flex items-center justify-center w-28 h-28 rounded-full border-4 border-stamp"
    >
      <span class="text-stamp text-2xl font-bold text-center leading-tight">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.stamp-mark {
  animation: stamp-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}

@keyframes stamp-in {
  0% {
    transform: scale(2.5) rotate(-15deg);
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(-8deg);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stamp-mark {
    animation: none;
    opacity: 1;
    transform: rotate(-8deg);
  }
}
</style>
