export default function useContentPage() {
  const route = useRoute();
  return useFetch("/api/content?path=" + route.path);
}
