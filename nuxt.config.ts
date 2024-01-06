export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxt/devtools",
  ],
  content: {
    navigation: { fields: ["title", "image"] },
    markdown: {
      anchorLinks: false,
    },
  },
  ui: {
    icons: ["heroicons", "mdi"],
  },
  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.yaml", label: "English" },
      // { code: 'de', iso: 'de-DE', file: 'de.yaml', label: 'Deutsch' },
    ],
    defaultLocale: "en",
    langDir: "lang",
    strategy: "no_prefix",
  },
});
