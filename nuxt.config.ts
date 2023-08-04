import content from "@originjs/vite-plugin-content";

export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n", "@nuxthq/ui", "@nuxt/content", "@nuxt/image"],
  vite: {
    plugins: [content()],
  },
  content: {
    documentDriven: true,
  },
  ui: {
    icons: ["heroicons"],
  },
});
