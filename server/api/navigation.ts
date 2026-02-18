export default defineEventHandler(async (event) => {
  return queryCollectionNavigation(event, "content", ["image"]).order("date", "DESC");
});
