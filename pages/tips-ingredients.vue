<script setup lang="ts">
const { data: subpages } = useSubpages();
</script>
<template>
  <NuxtLayout>
    <ContentDoc class="prose pb-10">
      <template #empty></template>
    </ContentDoc>

    <TipsList :pages="subpages" />
  </NuxtLayout>
</template>
