<script setup lang="ts">
const { data: doc } = await useContentPage();
if (doc.value) useContentHead(doc.value);
const { data: pages } = useSubpages();
</script>
<template>
  <NuxtLayout>
    <Content :doc="doc" class="prose dark:prose-invert pb-10" />

    <TipsList v-if="pages" :pages="pages" />
  </NuxtLayout>
</template>
