import type { NavItem } from "@nuxt/content/dist/runtime/types";

export function useSubpages() {
  const route = useRoute();
  const currentPage = computed(() => route.fullPath.slice(1));
  const indexPages = computed(() => {
    const path = currentPage.value.split("/");
    return path.map((_, i) => "/" + path.slice(0, i + 1).join("/"));
  });
  return useAsyncData(`subpages-${route.fullPath}`, async () => {
    const nav = await fetchContentNavigation(
      queryContent(currentPage.value).where({
        _path: {
          $not: {
            $in: indexPages.value,
          },
        },
      })
    );
    return indexPages.value.reduce(
      (nav, path): NavItem[] =>
        nav.find((n) => n._path === path)?.children ?? [],
      nav
    );
  });
}
