import ViteYaml from "@modyfi/vite-plugin-yaml";
import { resolve } from "pathe";

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
    provider: "ipxStatic",
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
      safelist: [
        "col-start-[vol]",
        "col-start-[volI]",
        "col-start-[volM]",
        "col-start-[mass]",
        "col-start-[massI]",
        "col-start-[massM]",
        "col-start-[name]",
      ],
      // safelist: ["col-start-[ma"],
    },
  },

  vite: {
    plugins: [
      ViteYaml({
        exclude: ["i18n/**"],
      }),
    ],
    define: {
      "window.WebAssembly": false,
    },
  },

  build: {
    analyze: {
      get projectRoot() {
        const roots = ["/.nuxt/", "/node_modules/", "/_nuxt/", `${resolve(".")}/`];
        roots.push(...roots.map(encodeURIComponent));
        const rootsRegex = roots.map((s: string) => s.replaceAll(/[.$^[{(]/g, (s) => `\\${s}`)).join("|");
        return new RegExp(`.*(${rootsRegex})`);
      },
    },
  },

  compatibilityDate: "2025-07-07",
});
