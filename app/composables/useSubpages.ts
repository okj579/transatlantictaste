import type { NavItem } from "@nuxt/content/dist/runtime/types";
import type { MaybeRef } from 'vue'

export function useSubpages(path?: MaybeRef<string>, limit: number = 50) {
  const _path = path ? ref(path) : toRef(useRoute(), 'fullPath');

  return asyncComputed<NavItem[] | undefined>( async () => {
    const { navDirFromPath } = await useNavigation();
    return (
      navDirFromPath(_path.value)
        ?.filter((n) => n._path !== _path.value)
        ?.slice(0, limit)
        ?? []
    );
  });
}
