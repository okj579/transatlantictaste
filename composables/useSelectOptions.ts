export function useSelectOptions<T>(tPrefix: string, values: T[]) {
  const { t } = useI18n();
  const options = values.map((value) => ({
    value,
    label: t(`${tPrefix}.${value}`),
  }));
  return {
    options,
    valueAttribute: "value",
    optionAttribute: "label",
  };
}
