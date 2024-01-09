<script setup lang="ts">
import DefaultLayout from "./default.vue";
const { data: doc } = useContentPage();
</script>

<template>
  <DefaultLayout>
    <figure
      v-if="doc?.image"
      class="float-end mb-4 sm:max-w-[50vw] sm:ml-4 xl:max-w-[600px]"
    >
      <NuxtImg
        :src="doc.image"
        :width="600"
        :height="400"
        class="rounded-2xl"
        :placeholder="[100, 67]"
        sizes="100vw sm:50vw xl:600px"
      />
      <figcaption class="text-right mt-2">
        <ImageCredit :image="doc.image" />
      </figcaption>
    </figure>

    <div class="prose">
      <slot />
    </div>

    <div class="clear-end" />
  </DefaultLayout>
</template>
