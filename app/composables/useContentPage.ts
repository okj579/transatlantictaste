export default function useContentPage() {
  const route = useRoute();
  return useAsyncData(
    () => `content-${route.path}`,
    () => queryCollection("content").path(route.path).first(),
  );
}
