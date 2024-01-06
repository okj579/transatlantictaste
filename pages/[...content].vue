<script setup lang="ts">
const imageCredits = useImageCredits();
</script>

<template>
  <ContentDoc>
    <template #default="{ doc }">
      <NuxtLayout
        :pageTitle="doc.showTitle ?? true ? doc.title : false"
        :prose="false"
      >
        <figure
          v-if="doc.image"
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
        <ContentRenderer :value="doc" class="prose dark:prose-invert" />
        <div class="clear-end" />
      </NuxtLayout>
    </template>
    <template #empty="{ doc }">
      <NuxtLayout :pageTitle="doc?.showTitle ?? true ? doc?.title : false" />
    </template>
  </ContentDoc>
</template>
