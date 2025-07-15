import defu from "defu";

import {
  addServerPlugin,
  createResolver,
  defineNuxtModule,
  resolvePath,
} from "@nuxt/kit";
import type { NuxtOptions } from "@nuxt/schema";

export default defineNuxtModule({
  meta: {
    name: "ipx-cache",
  },

  async setup(opts, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    nuxt.options.nitro = defu(nuxt.options.nitro, {
      routeRules: {
        "/_ipx/**": {
          static: true,
          cache: {
            base: "ipxCache",
            maxAge: 60 * 60 * 24 * 365,
          },
        },
      },
      storage: {
        ipxCache: {
          driver: "fsLite",
          base: await resolvePath("~~/node_modules/.cache/ipx-cache/"),
        },
      },
    } satisfies NuxtOptions["nitro"]);

    addServerPlugin(resolve("./plugin.ts"));
  },
});
