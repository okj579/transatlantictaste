<script setup lang="ts">
defineProps<{
  text?: string;
  tooltip?: string;
}>();
</script>
<template>
  <div class="group relative inline-block">
    <span class="cursor-help underline decoration-dotted">
      <slot name="default">{{ text }}</slot>
    </span>
    <UCard
      class="pointer-events-none invisible absolute top-full left-0 z-10 mt-1 group-hover:visible"
      :ui="{ body: 'px-4 py-2' }"
    >
      <slot name="tooltip">{{ tooltip }}</slot>
    </UCard>
  </div>
</template>
