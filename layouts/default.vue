<script setup lang="ts">
withDefaults(defineProps<{
  prose?: boolean,
  pageTitle?: string | false,
}>(), {
  prose: true,
  pageTitle: undefined,
});
</script>

<template>
  <div>
    <PageHeader :pageTitle="pageTitle" />

    <div :class="{ 'prose dark:prose-invert': prose }">
      <slot />
    </div>

    <hr class="border-gray-200 dark:border-gray-800 my-6" />

    <PageFooter class="mt-16" />
  </div>
</template>
