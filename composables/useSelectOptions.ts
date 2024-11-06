export function useSelectOptions<T>(tPrefix: string, values: T[]) {
  const { t } = useI18n();
  return computed(() =>
    values.map((value) => ({
      value,
      label: t(`${tPrefix}.${value}`),
    })),
  );
}
