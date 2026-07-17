<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  block: false,
  disabled: false,
});
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-lg font-bold transition-all active:scale-95',
      'focus:outline-none focus:ring-2 focus:ring-orange/50',
      'disabled:opacity-50 disabled:pointer-events-none',
      {
        'bg-orange text-paper shadow-md hover:brightness-110': variant === 'primary',
        'bg-green text-paper shadow-md hover:brightness-110': variant === 'secondary',
        'bg-transparent text-muted border border-muted/30 hover:bg-white/5':
          variant === 'ghost',
        'bg-transparent text-navy border-2 border-navy shadow-md hover:bg-navy/5':
          variant === 'outline',
      },
      {
        'px-3 py-1.5 text-sm min-h-[36px]': size === 'sm',
        'px-5 py-2.5 text-base min-h-[48px]': size === 'md',
        'px-6 py-3 text-lg min-h-[56px]': size === 'lg',
      },
      block ? 'w-full' : '',
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
