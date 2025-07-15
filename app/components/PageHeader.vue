<script setup lang="ts">
const { dir } = await useNavigation();
const { data: doc, error } = await useContentPage();
</script>

<template>
  <header
    class="relative border-b border-gray-200 dark:border-gray-800 pb-8 mb-12"
  >
    <p
      v-if="dir"
      class="mb-4 text-sm leading-6 font-semibold text-primary-500 dark:text-primary-400 capitalize"
    >
      <NuxtLink :to="dir._path">
        {{ dir.title }}
      </NuxtLink>
    </p>
    <div
      v-if="doc?.title"
      class="flex flex-col lg:flex-row lg:items-center lg:justify-between"
    >
      <h1
        class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight dark:text-white"
      >
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
