import {
  Unit,
  type UnitDefinition,
  UnitMap,
  UnitSystem as S,
  UnitType as T,
} from "~~/services/units";

const defineUnit = (
  unit: Unit,
  type: T,
  system: S,
  unCode: string,
  text: string,
  conversion: number,
): UnitDefinition => ({ unit, unCode, text, system, type, conversion });
export const unitData = Object.freeze(
  new UnitMap([
    defineUnit(Unit.TSP, T.VOLUME, S.IMPERIAL, "", "tsp", 5),
    defineUnit(Unit.TBSP, T.VOLUME, S.IMPERIAL, "", "Tbsp", 15),
    defineUnit(Unit.CUP, T.VOLUME, S.IMPERIAL, "", "cups", 240),
    defineUnit(Unit.ML, T.VOLUME, S.METRIC, "MLT", "ml", 1),
    defineUnit(Unit.G, T.MASS, S.METRIC, "GRM", "g", 1),
  ]),
);
