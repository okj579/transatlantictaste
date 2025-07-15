export default function useContentPage() {
  const route = useRoute();
  return useAsyncData(
    `content-${route.path}`,
    queryContent(route.path).findOne
  );
}
