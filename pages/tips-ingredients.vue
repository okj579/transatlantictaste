<script setup lang="ts">
const { data: pages } = useSubpages();
</script>
<template>
  <NuxtLayout :prose="false">
    <ContentDoc class="prose dark:prose-invert pb-10">
      <template #empty></template>
    </ContentDoc>

    <div v-for="page in pages" :key="page._path" class="mb-2 not-prose">
      <NuxtLink :to="page._path">
        <UCard>
          <div class="flex align-center justify-between">
            <div class="text-lg">{{ page.title }}</div>
            <div v-if="page.image" class="-my-6 -mr-6">
              <NuxtImg
                :src="page.image"
                width="100"
                height="80"
                :placeholder="[50, 40, 25]"
              />
            </div>
          </div>
        </UCard>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
