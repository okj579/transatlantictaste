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

  icon: {
    serverBundle: { disabled: !process.dev },
    clientBundle: { scan: true },
    collections: ["heroicons", "mdi"],
  },

  image: {
    format: ["avif", "webp"],
  },

  i18n: {
    locales: [
      { code: "en", language: "en-US", file: "en.yaml", label: "English" },
      // { code: 'de', language: 'de-DE', file: 'de.yaml', label: 'Deutsch' },
    ],
    defaultLocale: "en",
    langDir: "locales",
    strategy: "prefix_except_default",
    vueI18n: "i18n.config.ts",
  },

  tailwindcss: {
    config: {
      safelist: ["col-start-[ma"],
    },
  },

  compatibilityDate: "2024-10-30",
});
