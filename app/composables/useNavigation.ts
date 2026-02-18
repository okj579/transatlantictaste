import type { ContentCollectionItem, ContentNavigationItem } from "@nuxt/content";
import type { Simplify } from "type-fest";

interface _NavItem extends ContentNavigationItem, Pick<ContentCollectionItem, (typeof extraFields)[number]> {
  children?: NavItem[];
}
export type NavItem = Simplify<_NavItem>;

export default async function useNavigation() {
  const { data: navigation } = await useFetch("/api/navigation");

  return {
    navigation,
  };
}
