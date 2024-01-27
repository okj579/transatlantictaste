import {
  type AmountInput,
  type IngredientQuantity,
  type Quantity,
} from "~/types/recipes";
import { Unit, UnitSystem as S, UnitType as T, isUnit } from "~/services/units";
import { unitData } from "~/services/unitData";

export const parseAmount = (input: AmountInput): IngredientQuantity => {
  const result: IngredientQuantity = {
    [T.MASS]: {},
    [T.VOLUME]: {},
  };

  if (typeof input === "string") {
    input = Object.fromEntries(
      input.split("@").map((input) => {
        const amount = input.match(/^[\d\s\./]+ /)?.[0].trim();
        const unit = amount && input.replace(amount, "").trim();
        return isUnit(unit) ? [unit, Number(amount)] : ["text", input];
      }),
    ) as object;
  }

  if (typeof input === "number") {
    result.text = input.toString();
    return result;
  }

  result.text = input.text
    ?.trim()
    .replaceAll("/", "\u2044")
    .replaceAll(/\s{2,}/g, " ");

  const impVolUnits = unitData
    .getBy({ system: S.IMPERIAL, type: T.VOLUME })
    .values();
  for (const { unit, conversion, type } of impVolUnits) {
    const num = parseFraction(input[unit]);

    if (num) {
      result[type][S.IMPERIAL] = {
        amount: num,
        amountText: formatFraction(num),
        unit,
      };
      result[type][S.METRIC] = {
        amount: num * conversion,
        unit: Unit.ML,
      };
    }
  }

  for (const { unit, type } of unitData.getBySystem(S.METRIC).values()) {
    if (input[unit]) {
      const amount = Number(input[unit]);
      result[type][S.METRIC] = { amount, unit };

      if (type === T.VOLUME) {
        result[type][S.IMPERIAL] = convertImperialVolume(amount);
      }
    }
  }

  return result;
};

const convertImperialVolume = (ml: number): Quantity => {
  const unit = (() => {
    if (ml < 15) return Unit.TSP;
    if (ml < 60) return Unit.TBSP;
    return Unit.CUP;
  })();
  const amount = ml / unitData.get(unit)!.conversion;
  const amountText = formatFraction(amount);
  return { amount, unit, amountText };
};

const parseFraction = (str: string | number | undefined) => {
  if (typeof str === "number") return str;
  if (typeof str !== "string") return;
  const m = str.match(/(?:(\d*))?\b\s*(?:(\d*)\/(\d*))?/);
  if (!m) return;
  return Number(m[1] ?? 0) + Number(m[2] ?? 0) / Number(m[3] ?? 1);
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
