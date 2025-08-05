import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: {
        include: "**/*",
        exclude: ["**/.!(navigation.yml)", "_data"],
      },
      schema: z.object({
        date: z.date().optional(),
        layout: z.enum(["content", "default", "wide"]).optional(),
        image: z.string().optional(),
      }),
    }),
  },
});
