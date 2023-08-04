import unitsRaw from "~/assets/units.csv";

interface UnitDefinition {
  code: string;
  unCode: string;
  text: string;
  system: "US" | "metric";
  type: "weight" | "volume";
  conversion: number; // equivalent to this many g or ml
}

const findBy =
  <T, K extends keyof T>(target: Array<T>, field: K) =>
  (value: T[K]): T | undefined =>
    target.find((unit) => unit[field] === value);

const getBy =
    <T extends UnitDefinition, K extends keyof T>(target: Array<T>, field: K) =>
    (value: T[K]): UnitMap =>
      new UnitMap(target.filter((unit) => unit[field] === value));
  
class UnitMap extends Array<UnitDefinition> {
  constructor(units: UnitDefinition[]) {
    super();
    units.forEach((item) => this.push(item));
  }

  findByCode = findBy(this, "code");
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
