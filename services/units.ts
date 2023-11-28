import unitsRaw from "~/assets/units.csv";
import type { Opaque } from 'type-fest'

export type UnitCode = Opaque<string, "UnitCode">;
export enum UnitSystem {
  US = 'US',
  METRIC = 'metric'
}
export enum UnitType {
  WEIGHT = 'weight',
  VOLUME = 'volume',
}
export interface UnitDefinition {
  code: UnitCode;
  unCode: string;
  text: string;
  system: UnitSystem;
  type: UnitType;
  conversion: number; // equivalent to this many g or ml
}


export interface UnitValue {
  value: number;
  unitCode: UnitCode;
}


const findBy =
  <T, K extends keyof T>(target: Map<any, T>, field: K) =>
    (value: T[K]): T | undefined => {
      for (const unit of target.values())
        if (unit[field] === value) return unit;
    }

const getBy =
  <T extends UnitDefinition, K extends keyof T>(target: Map<any, T>, field: K) =>
    (value: T[K]): UnitMap =>
      new UnitMap([...target.values()].filter((unit) => unit[field] === value));

class UnitMap extends Map<UnitCode, UnitDefinition> {
  constructor(units: UnitDefinition[]) {
    super(units.map(unit => [unit.code, unit]));
    // units.forEach((item) => this.push(item));
  }

  findByCode = this.get;
  findByUnCode = findBy(this, "unCode");
  findByText = findBy(this, "text");

  getBySystem = getBy(this, "system")
  getByType = getBy(this, "type")
}

export default new UnitMap(
  (unitsRaw as string[]).map(
    ([code, unCode, text, system, type, conversion]) =>
    ({
      code,
      unCode,
      text,
      system,
      type,
      conversion: parseFloat(conversion),
    } as UnitDefinition)
  )
);
