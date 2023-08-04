<template>
  <header
    class="sticky top-0 z-50 w-full backdrop-blur flex-none border-b border-gray-900/10 dark:border-gray-50/[0.06] bg-white/75 dark:bg-gray-900/75"
  >
    <UContainer>
      <div class="flex items-center h-16">
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/"
            class="flex items-end gap-1.5 font-bold text-xl text-gray-900 dark:text-white"
          >
            Recipes
          </NuxtLink>
        </div>

        <nav class="mx-8 max-lg:hidden">
          <ul class="flex">
            <li v-for="(navItem, i) in navigation" :key="i" class="mx-2">
              <NuxtLink :to="navItem._path">
                {{ navItem.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="grow" />

        <div class="flex items-center -mr-1.5">
          <UButton
            color="gray"
            variant="ghost"
            class="lg:hidden"
            icon="i-heroicons-magnifying-glass-20-solid"
            @click="openSearch"
          />

          <ClientOnly>
            <UButton
              :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
              color="gray"
              variant="ghost"
              aria-label="Theme"
              @click="isDark = !isDark"
            />

            <template #fallback>
              <div class="w-8 h-8" />
            </template>
          </ClientOnly>

          <UButton
            color="gray"
            variant="ghost"
            class="lg:hidden"
            icon="i-heroicons-bars-3-20-solid"
            @click="isDialogOpen = true"
          />
        </div>
      </div>
    </UContainer>

    <TransitionRoot :show="isDialogOpen" as="template">
      <Dialog as="div" @close="isDialogOpen = false">
        <DialogPanel
          class="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-gray-900 lg:hidden"
        >
          <div
            class="px-4 sm:px-6 sticky top-0 border-b border-gray-900/10 dark:border-gray-50/[0.06] bg-white/75 dark:bg-gray-900/75 backdrop-blur z-10"
          >
            <div class="flex items-center justify-between h-16">
              <div class="flex items-center gap-3">
                <NuxtLink
                  to="/"
                  class="flex items-end gap-1.5 font-bold text-xl text-gray-900 dark:text-white"
                >
                  Recipes
                </NuxtLink>
              </div>

              <div class="flex -mr-1.5">
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-x-mark-20-solid"
                  @click="isDialogOpen = false"
                />
              </div>
            </div>
          </div>
          <nav class="px-4 sm:px-6 py-4 sm:py-6">
            <ul>
              <li
                v-for="(navItem, i) in navigation"
                :key="i"
                class="block my-2"
              >
                <NuxtLink :to="navItem._path">
                  {{ navItem.title }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </DialogPanel>
      </Dialog>
    </TransitionRoot>
  </header>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, TransitionRoot } from "@headlessui/vue";
import type { NavItem } from "@nuxt/content/dist/runtime/types";

const { navigation } = useContent() as { navigation: NavItem[] };

const colorMode = useColorMode();

const isDialogOpen = ref(false);
const isSearchModalOpen = ref(false);

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

function openSearch() {
  isDialogOpen.value = false;

  setTimeout(() => {
    isSearchModalOpen.value = true;
  }, 100);
}
</script>
