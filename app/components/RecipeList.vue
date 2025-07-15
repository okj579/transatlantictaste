<script setup lang="ts">
import type { NavItem } from "~/composables/useNavigation";

defineProps<{
  pages?: NavItem[];
}>();
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2">
    <div v-if="pages" v-for="page in pages" :key="page.path" class="w-full">
      <NuxtLink :to="page.path">
        <UCard :ui="{ body: { padding: '' } }" class="overflow-hidden">
          <div v-if="page.image">
            <NuxtPicture
              :src="page.image"
              :width="200"
              :height="160"
              class="w-full"
              :img-attrs="{ class: 'w-full' }"
              :placeholder="[20, 16]"
              alt=""
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
