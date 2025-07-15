<script setup lang="ts">
defineProps<{
  text?: string;
  tooltip?: string;
}>();
</script>
<template>
  <div class="inline-block relative group">
    <span class="underline decoration-dotted cursor-help">
      <slot name="default">{{ text }}</slot>
    </span>
    <UCard
      class="absolute top-full mt-1 left-0 z-10 invisible group-hover:visible pointer-events-none"
      :ui="{ body: { padding: 'px-4 py-2 ' }, strategy: 'override' }"
    >
      <slot name="tooltip">{{ tooltip }}</slot>
    </UCard>
  </div>
</template>
