<script setup lang="ts">
defineProps<{
  text?: string;
  tooltip?: string;
}>();
</script>
<template>
  <UPopover mode="hover" class="inline-block" :popper="{ offsetSkid: 20 }">
    <span class="underline decoration-dotted cursor-help">
      <slot name="default">{{ text }}</slot>
    </span>
    <template #panel>
      <div class="px-4 py-2 pointer-events-none">
        <slot name="tooltip">{{ tooltip }}</slot>
      </div>
    </template>
  </UPopover>
</template>
