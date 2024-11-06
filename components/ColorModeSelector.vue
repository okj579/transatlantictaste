<script setup lang="ts">
const colorMode = useColorMode();
const { t } = useI18n();

const COLOR_ICONS = {
  dark: "heroicons:moon",
  light: "heroicons:sun",
  system: "heroicons:computer-desktop",
};
const colorsDropdown = computed(() =>
  Object.entries(COLOR_ICONS).map(([code, icon]) => ({
    code,
    icon,
    label: t(`themes.${code}`),
    click: () => {
      colorMode.preference = code;
    },
  })),
);
</script>

<template>
  <UDropdown :items="[colorsDropdown]">
    <UButton color="gray" variant="ghost" square :title="t('theme')">
      <UIcon name="heroicons:sun" class="h-5 w-5 dark:hidden" />
      <UIcon name="heroicons:moon" class="hidden h-5 w-5 dark:block" />
    </UButton>

    <template #item="{ item }">
      <UIcon :name="item.icon" class="h-5 w-5 flex-shrink-0" />
      <span class="flex-grow text-left">{{ item.label }}</span>
      <UIcon
        v-if="item.code === colorMode.preference"
        name="heroicons:check-20-solid"
        class="h-5 w-5 flex-shrink-0"
      />
    </template>
  </UDropdown>
</template>
