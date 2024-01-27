const defaults = {
  showMetric: false,
  showTranslation: false,
};
export default function useRecipeSettings() {
  const recipeSettings = useLocalStorage("recipeSettings", defaults);

  const showMetric = computed({
    get: () => recipeSettings.value.showMetric,
    set: (value) =>
      (recipeSettings.value = { ...recipeSettings.value, showMetric: value }),
  });

  const showTranslation = computed({
    get: () => recipeSettings.value.showTranslation,
    set: (value) =>
      (recipeSettings.value = {
        ...recipeSettings.value,
        showTranslation: value,
      }),
  });

  return reactive({ showMetric, showTranslation });
}
