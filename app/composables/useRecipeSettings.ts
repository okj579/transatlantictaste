import { UnitSystem } from "~~/services/units";

export enum UnitOptions {
  IMPERIAL = UnitSystem.IMPERIAL,
  METRIC = UnitSystem.METRIC,
  NONE = "none",
  BOTH = "both",
}

const key = "recipeSettings" as const;
const defaults = {
  showMetric: false,
  showTranslation: false,
  volumeUnits: UnitOptions.IMPERIAL,
  massUnits: UnitOptions.METRIC,
};

export default function useRecipeSettings() {
  return toReactive(useLocalStorage(key, defaults, { mergeDefaults: true }));
}
