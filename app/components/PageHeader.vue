<script setup lang="ts">
import { findPageBreadcrumb } from "@nuxt/content/utils";

const { navigation } = await useNavigation();
const { data: doc, error } = await useContentPage();
const route = useRoute();
const breadcrumb = computed(() => findPageBreadcrumb(navigation.value, route.path));
</script>

<template>
  <header class="relative mb-12 border-b border-neutral-200 pb-8 dark:border-neutral-800">
    <p v-if="breadcrumb.length" class="text-primary mb-4 text-sm leading-6 font-semibold capitalize">
      <template v-for="item in breadcrumb">
        <span class="mx-2 first:hidden" aria-hidden="true">»</span>
        <NuxtLink :to="item.path" class="breadcrumb-item">
          {{ item.title }}
        </NuxtLink>
      </template>
    </p>
    <div v-if="doc?.title" class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <h1 class="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
        {{ doc?.title }}
      </h1>
    </div>
  </header>
</template>

<style scoped>
header:empty {
  display: none;
}
</style>
