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
    glossary: defineCollection({
      type: "data",
      source: "_data/glossary.yaml",
      schema: z.object({
        ingredients: z.record(z.string(), z.string()),
      }),
    }),
    imageCredits: defineCollection({
      type: "data",
      source: "_data/image-credits.yaml",
      schema: z.object({
        body: z.array(
          z.object({
            image: z.string(),
            author: z.string().optional(),
            authorLink: z.string().optional(),
            link: z.string().optional(),
            license: z.string().optional(),
            sourceUrl: z.string().optional(),
          }),
        ),
      }),
    }),
  },
});
