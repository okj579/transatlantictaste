import { dirname } from "pathe";

export default async function useNavigation() {
  const route = useRoute();
  const { navPageFromPath } = useContentHelpers();

  const { data: navigation } = await useAsyncData("navigation", () =>
    fetchContentNavigation(),
  );

  const dir = navPageFromPath(dirname(route.path), navigation.value!);
  // const page = navPageFromPath(route.path, navigation.value!);

  return { navigation, dir };
}
