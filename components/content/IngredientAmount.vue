<script setup lang="ts">
import { type AmountInput, type Quantity } from "~/types/recipes";
import { parseAmount } from "~/utils/amounts";
import { UnitSystem, UnitSystem as S, UnitType } from "~/services/units";
import { UnitOptions } from "~/composables/useRecipeSettings";

const props = defineProps<{
  amount: AmountInput;
}>();

const amounts = reactiveComputed(() => parseAmount(props.amount));

const { volumeUnits, massUnits } = toRefs(useRecipeSettings());
const settings = reactive({
  [UnitType.VOLUME]: volumeUnits,
  [UnitType.MASS]: massUnits,
});

const formatQuantity = (q?: Quantity) =>
  q && `${q.amountText ?? q.amount}\u00A0${q.unit}`;

const COMBINED = Symbol("combined");
type Mode = UnitSystem | typeof COMBINED;

const hasAmount = (type: UnitType, system?: UnitSystem) => {
  if (system) !!amounts[type][system];
  return [S.IMPERIAL, S.METRIC].some((system) => amounts[type][system]);
};
const hasAllAmounts = (type: UnitType) => {
  return [S.IMPERIAL, S.METRIC].every((system) => amounts[type][system]);
};
const otherType = (type: UnitType) =>
  type === UnitType.MASS ? UnitType.VOLUME : UnitType.MASS;

const getDisplayModes = (type: UnitType): Mode[] => {
  if (amounts.text && type === UnitType.VOLUME) return [];
  switch (settings[type]) {
    case UnitOptions.NONE:
      if (hasAmount(otherType(type))) return [];
    // fall through if other type empty
    case UnitOptions.IMPERIAL:
      if (hasAllAmounts(type)) return [COMBINED];
      if (hasAmount(type, S.IMPERIAL)) return [S.IMPERIAL];
      if (hasAmount(type, S.METRIC)) return [S.METRIC];
      return [];
    case UnitOptions.METRIC:
      if (hasAmount(type, S.METRIC)) return [S.METRIC];
      if (hasAmount(type, S.IMPERIAL)) return [S.IMPERIAL];
      return [];
    case UnitOptions.BOTH:
      return [S.IMPERIAL, S.METRIC];
  }
};
const displayModes = reactive({
  [UnitType.VOLUME]: computed(() => getDisplayModes(UnitType.VOLUME)),
  [UnitType.MASS]: computed(() => getDisplayModes(UnitType.MASS)),
});

const getColumnName = (type: UnitType, mode: Mode) =>
  (type === UnitType.MASS ? "mass" : "vol") + (mode === COMBINED ? "" : mode);
</script>
<template>
  <div v-if="amounts.text" class="cell col-[vol/mass] text-nowrap text-right">
    {{ amounts.text }}
  </div>
  <template v-for="type in [UnitType.VOLUME, UnitType.MASS]" :key="type">
    <div
      v-for="mode in displayModes[type]"
      :key="mode"
      :class="{
        'cell text-nowrap text-right': true,
        [`col-start-[${getColumnName(type, mode)}]`]: true,
        'col-span-1': mode !== COMBINED,
        'col-span-2': mode === COMBINED,
      }"
    >
      <Tooltip
        v-if="mode === COMBINED"
        :tooltip="formatQuantity(amounts[type][S.METRIC])"
      >
        {{ formatQuantity(amounts[type][S.IMPERIAL]) }}
      </Tooltip>
      <template v-else>
        {{ formatQuantity(amounts[type][mode]) }}
      </template>
    </div>
  </template>
</template>
