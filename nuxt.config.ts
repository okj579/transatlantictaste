export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxtjs/seo",
  ],

  css: ["~/assets/app.css"],

  site: {
    url: "https://www.transatlantictaste.com",
    name: "Transatlantic Taste",
    defaultLocale: "en",
  },

  content: {
    navigation: { fields: ["title", "image"] },
    markdown: {
      anchorLinks: false,
    },
  },

  ui: {
    icons: ["heroicons", "mdi"],
  },

  image: {
    format: ["avif", "webp"],
  },

  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.yaml", label: "English" },
      // { code: 'de', iso: 'de-DE', file: 'de.yaml', label: 'Deutsch' },
    ],
    defaultLocale: "en",
    langDir: "lang",
    strategy: "prefix_except_default",
  },
});
