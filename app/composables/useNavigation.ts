import type {
  ContentCollectionItem,
  ContentNavigationItem,
} from "@nuxt/content";
import type { Simplify } from "type-fest";

const extraFields = ["image"] satisfies (keyof ContentCollectionItem)[];

interface _NavItem
  extends ContentNavigationItem,
    Pick<ContentCollectionItem, (typeof extraFields)[number]> {
  children?: NavItem[];
}
export type NavItem = Simplify<_NavItem>;

export default async function useNavigation() {
  const { data: navigation } = await useAsyncData<NavItem[]>("navigation", () =>
    queryCollectionNavigation("content", extraFields).order("date", "DESC"),
  );

  return {
    navigation,
  };
}
