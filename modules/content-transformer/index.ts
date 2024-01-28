import { defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  setup(_options, nuxt) {
    nuxt.options.nitro.externals = nuxt.options.nitro.externals || {};
    nuxt.options.nitro.externals.inline =
      nuxt.options.nitro.externals.inline || [];
    nuxt.options.nitro.externals.inline.push("~/modules/content-transformer/");

    // @ts-ignore
    nuxt.hook("content:context", (contentContext) => {
      contentContext.transformers.push(
        "~/modules/content-transformer/transformer.ts",
      );
    });
  },
});
