<script setup lang="ts">
const { data: doc } = await useContentPage();
if (doc.value) useContentHead(doc.value);
const { data: pages } = useSubpages();
</script>
<template>
  <NuxtLayout>
    <Content :doc="doc" class="prose pb-10" />

    <RecipeList :pages="pages" />
  </NuxtLayout>
</template>
