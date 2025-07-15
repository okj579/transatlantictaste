<script setup lang="ts">
const { data: doc, error } = await useContentPage();
if (error.value || !doc.value) throw createError(error.value ?? { status: 404 });

useHead(doc.value.seo);
</script>

<template>
  <figure v-if="doc?.image" class="float-end mb-4 sm:ml-4 sm:max-w-[50vw] xl:max-w-[600px]">
    <NuxtPicture
      :src="doc.image"
      :width="600"
      :height="400"
      :img-attrs="{ class: 'rounded-2xl' }"
      :placeholder="[100, 67]"
      sizes="100vw sm:50vw xl:600px"
      alt=""
    />
    <figcaption class="mt-2 text-right">
      <ImageCredit :image="doc.image" />
    </figcaption>
  </figure>

  <div class="prose dark:prose-invert">
    <Content :doc />
  </div>

  <div class="clear-end" />
</template>
