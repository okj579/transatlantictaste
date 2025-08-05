<script setup lang="ts">
import { isPlainObject } from "@vue/shared";

const paths = ["/legal"];

const { data: links } = await useAsyncData("footer-links", () =>
  queryCollection("content")
    .where("path", "IN", paths)
    .select("path", "title", "navigation")
    .all()
    .then((list) =>
      list.map((link) => ({
        path: link.path,
        title: (isPlainObject(link.navigation) && link.navigation.title) || link.title,
      })),
    ),
);
</script>
<template>
  <footer class="text-right text-xs">
    <NuxtLink v-for="link in links" :to="link.path">
      {{ link.title }}
    </NuxtLink>
  </footer>
</template>
