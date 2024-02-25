import { dirname } from "pathe";
import type {NavItem} from '@nuxt/content/dist/runtime/types'

export default async function useNavigation() {
  const route = useRoute();
  const { navPageFromPath, navDirFromPath } = useContentHelpers();

  const { data: navigation }: {data: Ref<NavItem[]>} = await useAsyncData("navigation", () =>
    fetchContentNavigation(queryContent().sort({date: -1})),
  );

  const dir = navPageFromPath(dirname(route.path), navigation.value);



  return {
    navigation,
    dir,
    navDirFromPath: (path: string) => navDirFromPath(path, navigation.value)
  };
}
