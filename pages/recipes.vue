<script setup lang="ts">
const route = useRoute();
const { data: pages } = useSubpages();
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
</script>
<template>
  <NuxtLayout :prose="false">
    <ContentDoc class="prose dark:prose-invert pb-10">
      <template #empty></template>
    </ContentDoc>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"
    >
      <div v-if="pages" v-for="page in pages" :key="page._path" class="w-full">
        <NuxtLink :to="page._path">
          <UCard :ui="{ body: { padding: '' } }">
            <div v-if="page.image">
              <NuxtImg
                :src="page.image"
                width="200"
                height="160"
                class="w-full"
                placeholder
              />
            </div>
            <template #footer>
              <div class="text-lg">{{ page.title }}</div>
            </template>
          </UCard>
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>
