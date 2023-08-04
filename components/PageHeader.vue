<template>
  <header
    v-if="page"
    class="relative border-b border-gray-200 dark:border-gray-800 pb-8 mb-12"
  >
    <p
      class="mb-4 text-sm leading-6 font-semibold text-primary-500 dark:text-primary-400 capitalize"
    >
      {{ page._dir?.title ? page._dir.title : useLowerCase(page._dir) }}
    </p>
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <h1
        class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight dark:text-white"
      >
        {{ page.title }}
      </h1>
    </div>
  </header>
</template>

<script setup lang="ts">
const { page } = useContent();
const useLowerCase = (s: any) => s?.toLowerCase?.() ?? s;
</script>
