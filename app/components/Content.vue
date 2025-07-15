<script setup lang="ts">
import type { PageCollectionItemBase } from "@nuxt/content";

defineProps<{
  doc?: PageCollectionItemBase;
}>();
</script>
<template>
  <ContentRenderer v-if="doc" :value="doc">
    <template #empty></template>
  </ContentRenderer>
</template>
