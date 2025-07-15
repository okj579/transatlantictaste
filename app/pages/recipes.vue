<script setup lang="ts">
const { data: doc } = await useContentPage();
if (doc.value) useHead(doc.value.seo);
const pages = useSubpages();
</script>
<template>
  <Content v-if="doc" :doc="doc" class="prose pb-10" />

  <RecipeList :pages="pages" />
</template>
