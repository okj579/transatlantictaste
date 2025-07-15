<script setup lang="ts">
const { data: doc, error } = await useContentPage();
if (doc.value) useContentHead(doc.value);
if (!doc.value) showError({ statusCode: 404 });
</script>

<template>
  <NuxtLayout :name="doc?.layout ?? 'content'">
    <Content :doc="doc" />
  </NuxtLayout>
</template>
