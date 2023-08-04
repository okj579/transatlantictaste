import { NavItem } from "@nuxt/content/dist/runtime/types";

export function useSubpages() {
  const currentPage = computed(() => useRoute().fullPath.slice(1));
  const indexPages = computed(() => {
    const path = currentPage.value.split("/");
    return path.map((_, i) => "/" + path.slice(0, i + 1).join("/"));
  });
  return useAsyncData(`subpages-${currentPage.value}`, async () => {
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
