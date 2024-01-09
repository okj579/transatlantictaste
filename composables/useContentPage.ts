export default function useContentPage() {
  const route = useRoute();
  const asyncData = useAsyncData(
    `content-${route.path}`,
    queryContent(route.path).findOne,
  );
  watch(asyncData.data, (doc) => doc && useContentHead(doc));
  return asyncData;
}
