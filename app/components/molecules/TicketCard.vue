<script setup lang="ts">
interface Props {
  header?: string;
}

withDefaults(defineProps<Props>(), {
  header: '',
});
</script>

<template>
  <div class="ticket-card relative mx-4 rounded bg-paper px-6 py-5 shadow-lg">
    <div v-if="header" class="mb-3 border-b border-dashed border-paper-edge pb-2">
      <span class="text-xs font-bold tracking-widest text-muted">{{ header }}</span>
    </div>
    <slot />
    <div class="ticket-notch-left" />
    <div class="ticket-notch-right" />
  </div>
</template>

<style scoped>
.ticket-notch-left,
.ticket-notch-right {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #1f2a44;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}

.ticket-notch-left {
  left: -10px;
}

.ticket-notch-right {
  right: -10px;
}
</style>
