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
    type: "checkbox",
    checked: colorMode.preference === code,
    onSelect: () => (colorMode.preference = code),
  })),
);
</script>

<template>
  <UDropdownMenu :items="[colorsDropdown]" :ui="{ itemLeadingIcon: 'text-default' }">
    <UButton color="neutral" variant="ghost" square :title="t('theme')" class="cursor-pointer">
      <UIcon name="heroicons:sun" class="h-5 w-5 dark:hidden" />
      <UIcon name="heroicons:moon" class="hidden h-5 w-5 dark:block" />
    </UButton>
  </UDropdownMenu>
</template>
