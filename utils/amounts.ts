import {
  type AmountInput,
  Unit,
  type IngredientQuantity,
  type Quantity,
  UnitSystem,
} from "~/types/recipes";

const units = new Set(Object.values(Unit).filter((x) => isNaN(Number(x))));
const isUnit = (value: any): value is Unit => units.has(value);

const imperialVolumes = {
  [Unit.TSP]: 5,
  [Unit.TBSP]: 15,
  [Unit.CUP]: 240,
} as { [k in Unit]: number };

export const parseAmount = (input: AmountInput): IngredientQuantity => {
  const result: IngredientQuantity = { volume: {}, mass: {} };

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

  for (const [unit, conversion] of Object.entries(imperialVolumes) as [
    Unit,
    number,
  ][]) {
    const num = parseFraction(input[unit]);

    if (num) {
      result.volume[UnitSystem.IMPERIAL] = {
        amount: num,
        amountText: formatFraction(num),
        unit,
      };
      result.volume[UnitSystem.METRIC] = {
        amount: num * conversion,
        unit: Unit.ML,
      };
    }
  }

  if (input[Unit.ML]) {
    const unit = Unit.ML;
    const amount = Number(input[unit]);
    result.volume[UnitSystem.IMPERIAL] = convertImperialVolume(amount);
    result.volume[UnitSystem.METRIC] = { amount, unit };
  }
  if (input[Unit.G]) {
    const unit = Unit.G;
    const amount = Number(input[unit]);
    result.mass[UnitSystem.METRIC] = { amount, unit };
  }

  return result;
};

const convertImperialVolume = (ml: number): Quantity => {
  const unit = (() => {
    if (ml < 15) return Unit.TSP;
    if (ml < 60) return Unit.TBSP;
    return Unit.CUP;
  })();
  const amount = ml / imperialVolumes[unit];
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
