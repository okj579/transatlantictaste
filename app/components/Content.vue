<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

defineProps<{
  doc: ParsedContent | null;
}>();
</script>
<template>
  <ContentRenderer v-if="doc" :value="doc">
    <template #empty></template>
  </ContentRenderer>
</template>
