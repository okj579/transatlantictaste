import units, { UnitCode, UnitValue } from "./units";

export function convert(value: UnitValue, unitCode: UnitCode) {
    const unitFrom = units.get(value.unitCode);
    const unitTo = units.get(unitCode);
    if (!unit) throw new Error(`Unit ${unitCode} not found`);

    return {
        value: value.value / unitFrom?.conversion * unit.conversion,
        unitTo,
    } as UnitValue;
}