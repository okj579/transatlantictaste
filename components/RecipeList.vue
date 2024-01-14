<script setup lang="ts">
import type { NavItem } from "@nuxt/content/dist/runtime/types";

defineProps<{
  pages: NavItem[] | null;
}>();
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2">
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
    <slot name="extra-tiles" />
  </div>
</template>
