<script setup lang="ts">
const { data: doc } = useContentPage();
if (doc.value) useContentHead(doc.value);
const { data: pages } = useSubpages();
</script>
<template>
  <NuxtLayout>
    <Content :doc class="prose pb-10" />

    <RecipeList :pages />
  </NuxtLayout>
</template>
