<script setup lang="ts">
interface Props {
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: '',
});
</script>

<template>
  <div class="flex min-h-dvh flex-col px-2 py-4">
    <header class="mb-4 flex items-center justify-between px-2">
      <NuxtLink
        to="/"
        class="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-bold text-muted transition-colors hover:text-paper"
      >
        ← 改札へ
      </NuxtLink>
      <span v-if="title" class="text-sm font-bold text-paper/80">{{ title }}</span>
    </header>
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
