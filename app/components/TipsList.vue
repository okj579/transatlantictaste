<script setup lang="ts">
import type { NavItem } from "~/composables/useNavigation";

defineProps<{
  pages?: NavItem[];
}>();
</script>

<template>
  <div
    v-if="pages"
    v-for="page in pages"
    :key="page.path"
    class="not-prose mb-2"
  >
    <NuxtLink :to="page.path">
      <UCard class="overflow-hidden" :ui="{ body: { padding: '' } }">
        <div class="flex items-center justify-between">
          <div class="m-4 text-lg">{{ page.title }}</div>
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
