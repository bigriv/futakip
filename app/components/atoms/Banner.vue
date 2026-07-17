<script setup lang="ts">
defineProps<{
  icon?: string;
}>();
</script>

<template>
  <p class="rounded-lg bg-orange px-3 py-2.5 text-center text-base font-bold text-paper">
    {{ icon || '🙈' }} <slot />
  </p>
</template>
