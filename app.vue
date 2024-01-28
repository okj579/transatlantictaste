<script setup lang="ts">
const { t } = useI18n();
useHead(() => ({
  link: [{ rel: "icon", href: "/favicon.png" }],
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "description", content: t("siteDescription") },
  ],
}));
</script>

<template>
  <div>
    <Header />
    <UContainer class="pt-8 pb-2">
      <NuxtPage />
    </UContainer>
  </div>
</template>
