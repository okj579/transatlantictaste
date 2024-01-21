import {
  type AmountInput,
  type IngredientQuantity,
  type Quantity,
  UnitSystem,
} from "~/types/recipes";

const quantity = (amount: number, unit: string): Quantity => ({ amount, unit });

export const parseAmount = (amountInput: AmountInput): IngredientQuantity => {
  // computed<IngredientQuantity>(() => {
  const input = unref(amountInput);

  const result: IngredientQuantity = { volume: {}, mass: {} };

  if (typeof input === "string" || typeof input === "number") {
    result.text = input.toString();
    return result;
  }

  result.text = input.text;

  if (input.ml) {
    if (input.imperial ?? true) {
      result.volume[UnitSystem.IMPERIAL] = convertImperialVolume(input.ml);
    }
    result.volume[UnitSystem.METRIC] = quantity(input.ml, "ml");
  }
  if (input.g) {
    result.mass[UnitSystem.METRIC] = quantity(input.g, "g");
  }

  return result;
};

const convertImperialVolume = (ml: number): Quantity => {
  const q = (amount: number, unit: string) => ({
    amount,
    unit,
    amountText: formatFraction(amount),
  });
  if (ml < 15) {
    return q(ml / 5, "tsp");
  }
  if (ml < 60) {
    return q(ml / 15, "Tbsp");
  }
  return q(ml / 240, "cups");
};

export const formatFraction = (num: number) => {
  const int = Math.floor(num);
  const frac = num - int;

  const denominator = ((frac: number) => {
    const DENOMINATORS = [2, 3, 4, 8] as const;
    const LCM = 24;
    const parts = Math.round(frac * LCM);
    for (let d of DENOMINATORS) {
      if (parts % (LCM / d) === 0) return d;
    }
    return Math.max(...DENOMINATORS);
  })(frac);

  const numerator = Math.round(frac * denominator);

  if (!numerator) return int.toString();
  if (numerator === denominator) return (int + 1).toString();

  return `${int || ""} ${numerator}\u2044${denominator}`.trim();
};
