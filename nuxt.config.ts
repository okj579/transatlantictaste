export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxt/content", "@nuxt/image", "@nuxtjs/i18n", "@vueuse/nuxt", "@nuxtjs/seo"],

  css: ["~/assets/app.css"],

  site: {
    url: "https://www.transatlantictaste.com",
    name: "Transatlantic Taste",
    defaultLocale: "en",
  },

  content: {
    experimental: { nativeSqlite: true },
    renderer: {
      anchorLinks: false,
    },
    build: {
      transformers: ["~~/services/transformer.ts"],
    },
  },

  icon: {
    // serverBundle: { disabled: !import.meta.dev },
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
    strategy: "prefix_except_default",
  },

  tailwindcss: {
    config: {
      safelist: ["col-start-[ma"],
    },
  },

  compatibilityDate: "2025-07-07",
});
