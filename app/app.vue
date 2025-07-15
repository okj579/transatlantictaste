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
    <UContainer class="pb-2 pt-8">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UContainer>
  </div>
</template>
