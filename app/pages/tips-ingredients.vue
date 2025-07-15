<script setup lang="ts">
const { data: doc } = await useContentPage();
if (doc.value) useContentHead(doc.value);
const pages = useSubpages();
</script>
<template>
  <NuxtLayout>
    <Content :doc="doc" class="prose dark:prose-invert pb-10" />

    <TipsList :pages="pages" />
  </NuxtLayout>
</template>
