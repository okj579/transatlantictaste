<script setup lang="ts">
const credits = useImageCreditsList();
</script>
<template>
  <ul>
    <li v-for="image in credits.filter((c) => c.author)" class="my-0">
      {{ image.author }}
      on
      <NuxtLink
        :to="image.link"
        rel="external nofollow noopener noreferrer"
        target="_blank"
      >
        <UIcon name="i-heroicons-link" class="align-middle me-1" />
        <span class="italic underline">{{ image.source }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>
