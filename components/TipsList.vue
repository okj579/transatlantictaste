<script setup lang="ts">
import type { NavItem } from "@nuxt/content/dist/runtime/types";

defineProps<{
  pages: NavItem[] | null;
}>();
</script>

<template>
  <div v-for="page in pages" :key="page._path" class="mb-2 not-prose">
    <NuxtLink :to="page._path">
      <UCard class="overflow-hidden" :ui="{ body: { padding: '' } }">
        <div class="flex items-center justify-between">
          <div class="text-lg m-4">{{ page.title }}</div>
          <div v-if="page.image" class="self-stretch">
            <NuxtPicture
              :src="page.image"
              :width="100"
              :height="80"
              class="h-full"
              :img-attrs="{ class: 'h-full' }"
              sizes="100px"
              alt=""
            />
          </div>
        </div>
      </UCard>
    </NuxtLink>
  </div>
</template>
