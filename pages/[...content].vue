<script setup lang="ts">
const { data: doc, error } = await useContentPage();
if (!doc.value) showError({ statusCode: 404 });
</script>

<template>
  <NuxtLayout :name="doc?.layout ?? 'content'">
    <ContentRenderer :value="doc" />
  </NuxtLayout>
</template>
