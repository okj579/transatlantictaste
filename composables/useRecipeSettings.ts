const key = "recipeSettings" as const;
const defaults = {
  showMetric: false,
  showTranslation: false,
};

export default function useRecipeSettings() {
  return toReactive(useLocalStorage(key, defaults, { mergeDefaults: true }));
}
