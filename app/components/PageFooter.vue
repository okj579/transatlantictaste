<script setup lang="ts">
const paths = ["/legal"];

const { data: links } = await useAsyncData(() =>
  queryContent()
    .where({ _path: { $in: paths } })
    .only(["_path", "title", "navigation"])
    .find()
);
</script>
<template>
  <footer class="text-right text-xs">
    <NuxtLink v-for="link in links" :to="link._path">
      {{ link.navigation?.title ?? link.title }}
    </NuxtLink>
  </footer>
</template>
