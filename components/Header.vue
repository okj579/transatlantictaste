<script setup lang="ts">
const { navigation } = await useNavigation();

const colorMode = useColorMode();
const { t } = useI18n();

const isMenuOpen = ref(false);
watch(useRouter().currentRoute, () => {
  isMenuOpen.value = false;
});

const COLOR_ICONS = {
  dark: "i-heroicons-moon",
  light: "i-heroicons-sun",
  system: "i-heroicons-computer-desktop",
};
const colorsDropdown = computed(() =>
  Object.entries(COLOR_ICONS).map(([code, icon]) => ({
    code,
    icon,
    label: t(`themes.${code}`),
  })),
);
</script>

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
            <Logo class="h-6" />
          </NuxtLink>
        </div>

        <nav class="mx-8 max-sm:hidden">
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
          <USelectMenu
            :options="colorsDropdown"
            :modelValue="{ name: colorMode.preference }"
            by="code"
            @update:modelValue="({ code }) => (colorMode.preference = code)"
          >
            <UButton
              icon="dark:i-heroicons-moon i-heroicons-sun"
              color="gray"
              variant="ghost"
            />
          </USelectMenu>

          <UButton
            color="gray"
            variant="ghost"
            class="sm:hidden"
            icon="i-heroicons-bars-3-20-solid"
            @click="isMenuOpen = true"
          />
        </div>
      </div>
    </UContainer>

    <USlideover v-model="isMenuOpen">
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex justify-between gap-3">
            <NuxtLink
              to="/"
              class="font-bold text-xl text-gray-900 dark:text-white"
            >
              Recipes
            </NuxtLink>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              @click="isMenuOpen = false"
            />
          </div>
        </template>
        <nav class="px-4 sm:px-6 py-4 sm:py-6">
          <ul>
            <li v-for="(navItem, i) in navigation" :key="i" class="block my-2">
              <NuxtLink :to="navItem._path">
                {{ navItem.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </UCard>
    </USlideover>
  </header>
</template>
