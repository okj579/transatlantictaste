export const enum UnitSystem {
  IMPERIAL = "I",
  METRIC = "M",
}

export const enum UnitType {
  VOLUME,
  MASS,
}

export enum Unit {
  TSP = "tsp",
  TBSP = "Tbsp",
  CUP = "cups",
  ML = "ml",
  G = "g",
}

export interface UnitDefinition {
  unit: Unit;
  unCode: string;
  text: string;
  system: UnitSystem;
  type: UnitType;
  conversion: number; // equivalent to this many g or ml
}

type Entry<T extends object, K extends keyof T = keyof T> = [K, T[K]];

export const units = new Set(Object.values(Unit).filter((x) => isNaN(Number(x))));
export const isUnit = (value: any): value is Unit => units.has(value);

type ObjectMatcher<T extends object> = Partial<T>;
const matchObject = <T extends object>(matcher: ObjectMatcher<T>) => {
  const s = Object.entries(matcher) as Entry<T>[];
  return (obj: T): boolean => s.every(([k, v]) => obj[k] == v);
};

class SearchableMap<
  PrimaryKey extends string,
  Keys extends string,
  Value extends { [k in PrimaryKey]: Keys },
> extends Map<Keys, Value> {
  protected primaryKey: PrimaryKey;

  constructor(primaryKey: PrimaryKey, values: Value[]) {
    super(values.map((value) => [value[primaryKey], value]));
    this.primaryKey = primaryKey;
  }
  findBy(matcher: Partial<Value>): Value | undefined {
    const test = matchObject(matcher);
    return Array.from(this.values()).find(test);
  }

  getBy(matcher: Partial<Value>): typeof this {
    const test = matchObject(matcher);
    const { constructor } = Object.getPrototypeOf(this);
    return new constructor(Array.from(this.values()).filter(test));
  }
}

export class UnitMap extends SearchableMap<"unit", Unit, UnitDefinition> {
  constructor(units: UnitDefinition[]) {
    super("unit", units);
  }

  findByUnCode = (unCode: UnitDefinition["unCode"]) => this.findBy({ unCode });
  findByText = (text: UnitDefinition["text"]) => this.findBy({ text });

  getBySystem = (system: UnitDefinition["system"]) => this.getBy({ system });
  getByType = (type: UnitDefinition["type"]) => this.getBy({ type });
}
