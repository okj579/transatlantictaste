export enum Unit {
  TSP = "tsp",
  TBSP = "Tbsp",
  CUP = "cups",
  ML = "ml",
  G = "g",
}

interface AmountObject extends Partial<Record<Unit, number>> {
  text?: string;
}
export type AmountInput = string | number | AmountObject;

export interface IngredientQuantity {
  text?: string;
  volume: { [k in UnitSystem]?: Quantity };
  mass: { [k in UnitSystem]?: Quantity };
}

export const enum UnitSystem {
  IMPERIAL,
  METRIC,
}

export interface Quantity {
  amount: number;
  amountText?: string;
  unit: string;
}

export interface IngredientGroup {
  title: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  amount: AmountInput;
  name: string;
  link?: string;
  translation?: string;
}
