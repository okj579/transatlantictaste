import z from "zod";

export default defineEventHandler(async (event) => {
  const { path } = await getValidatedQuery(event, z.object({ path: z.string() }).parse);
  return queryCollection(event, "content").path(path).first();
});
