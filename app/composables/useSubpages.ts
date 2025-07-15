import type { MaybeRef } from "vue";
import { findPageChildren } from "@nuxt/content/utils";

export function useSubpages(path?: MaybeRef<string>, limit: number = 50) {
  const _path = path ? ref(path) : toRef(useRoute(), "fullPath");

  return asyncComputed(async () => {
    const { navigation } = await useNavigation();
    return findPageChildren(navigation.value, _path.value);
  });
}
