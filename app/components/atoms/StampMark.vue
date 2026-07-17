<script setup lang="ts">
interface Props {
  text: string;
  size?: 'sm' | 'md';
}

withDefaults(defineProps<Props>(), {
  size: 'md',
});
</script>

<template>
  <div class="stamp-container inline-flex items-center justify-center">
    <div
      :class="[
        'stamp-mark flex items-center justify-center rounded-full border-stamp',
        size === 'sm' ? 'w-16 h-16 border-[3px]' : 'w-28 h-28 border-4',
      ]"
    >
      <span
        :class="[
          'text-stamp font-bold text-center leading-tight whitespace-pre-line',
          size === 'sm' ? 'text-sm' : 'text-xl',
        ]"
      >
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
