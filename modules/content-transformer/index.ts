import { defineNuxtModule, createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);

export default defineNuxtModule({
  meta: { name: "content-transformer" },
  hooks: {
    "content:context": ({ transformers }) => {
      transformers.push(resolve("transformer.ts"));
    },
  },
});
