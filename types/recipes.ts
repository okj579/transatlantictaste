import { Unit, UnitSystem, UnitType } from "~/services/units";

interface AmountObject extends Partial<Record<Unit, number>> {
  text?: string;
}
export type AmountInput = string | number | AmountObject | string[];

export type IngredientQuantity = {
  text?: string;
} & Record<UnitType, Partial<Record<UnitSystem, Quantity>>>;

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
