<script setup lang="ts">
const { data: pages } = useSubpages();
</script>
<template>
  <div>
    <NuxtLayout>
      <ContentDoc />
      <div v-for="page in pages" :key="page._path" class="mb-2 not-prose">
        <NuxtLink :to="page._path">
          <UCard>
            <div class="flex align-center justify-between">
              <div class="text-lg">{{ page.title }}</div>
              <div v-if="page.image" class="-my-6 -mr-6">
                <NuxtImg :src="page.image" width="100" height="80" />
              </div>
            </div>
          </UCard>
        </NuxtLink>
      </div>
    </NuxtLayout>
  </div>
</template>
