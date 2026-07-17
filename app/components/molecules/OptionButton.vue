<script setup lang="ts">
interface Props {
  label: string;
  selected?: boolean;
  selectedVariant?: 'default' | 'best' | 'worst';
  disabled?: boolean;
  highlight?: 'correct' | 'wrong' | null;
}

withDefaults(defineProps<Props>(), {
  selected: false,
  selectedVariant: 'default',
  disabled: false,
  highlight: null,
});

defineEmits<{
  select: [];
}>();
</script>

<template>
  <button
    :class="[
      'w-full rounded-lg border-2 px-4 py-3 text-left text-sm font-bold transition-all',
      'min-h-[48px] active:scale-[0.98]',
      'disabled:pointer-events-none',
      {
        'border-paper-edge bg-white text-ink hover:border-orange/50': !selected && !highlight,
        'border-orange bg-orange/10 text-orange': selected && !highlight && selectedVariant !== 'worst',
        'border-blue bg-blue/10 text-blue': selected && !highlight && selectedVariant === 'worst',
        'border-green bg-green/10 text-green': highlight === 'correct',
        'border-stamp/70 bg-stamp/10 text-stamp': highlight === 'wrong',
      },
    ]"
    :disabled="disabled"
    @click="$emit('select')"
  >
    {{ label }}
  </button>
</template>
