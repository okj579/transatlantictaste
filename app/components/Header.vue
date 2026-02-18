<script setup lang="ts">
const { navigation } = await useNavigation();

const { t } = useI18n();

const isMenuOpen = ref(false);
watch(useRouter().currentRoute, () => {
  isMenuOpen.value = false;
});
</script>

<template>
  <header
    class="border-muted/50 sticky top-0 z-50 w-full flex-none border-b bg-white/75 backdrop-blur-sm dark:bg-gray-900/50"
  >
    <UContainer>
      <div class="flex h-16 items-center">
        <div class="flex items-center gap-3">
          <NuxtLink to="/">
            <Logo class="h-6" :aria-label="t('siteTitle')" />
          </NuxtLink>
        </div>

        <nav class="mx-8 max-sm:hidden">
          <ul class="flex">
            <li v-for="(navItem, i) in navigation" :key="i" class="mx-2">
              <NuxtLink :to="navItem.path">
                {{ navItem.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="grow" />

        <div class="-mr-1.5 flex items-center">
          <ColorModeSelector />

          <UButton
            color="neutral"
            variant="ghost"
            class="sm:hidden"
            icon="i-heroicons-bars-3-20-solid"
            @click="isMenuOpen = true"
            :title="t('menu')"
          />
        </div>
      </div>
    </UContainer>

    <USlideover v-model:open="isMenuOpen">
      <template #content>
        <UCard class="flex flex-1 flex-col">
          <template #header>
            <div class="flex justify-between gap-3">
              <NuxtLink to="/" class="flex items-center">
                <Logo class="h-6" :aria-label="t('siteTitle')" />
              </NuxtLink>
              <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="isMenuOpen = false" />
            </div>
          </template>
          <nav class="px-4 py-4 sm:px-6 sm:py-6">
            <ul>
              <li v-for="(navItem, i) in navigation" :key="i" class="my-2 block">
                <NuxtLink :to="navItem.path">
                  {{ navItem.title }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </UCard>
      </template>
    </USlideover>
  </header>
</template>
