<script setup lang="ts">
import { type AmountInput, type Quantity } from "~/types/recipes";
import { parseAmount } from "~/utils/amounts";
import { UnitSystem as S, UnitType } from "~/services/units";

const props = defineProps<{
  amount: AmountInput;
  showMetric?: boolean;
}>();

const amounts = reactiveComputed(() => parseAmount(props.amount));

const formatQuantity = (q?: Quantity) =>
  q && `${q.amountText ?? q.amount}\u00A0${q.unit}`;

const getDisplayModes = (type: UnitType) => {
  if (!amounts[type][S.IMPERIAL] && !amounts[type][S.METRIC]) return [];
  if (!amounts[type][S.IMPERIAL]) return [S.METRIC];
  if (!amounts[type][S.METRIC]) return [S.IMPERIAL];
  if (props.showMetric) return [S.IMPERIAL, S.METRIC];
  return ["combined"];
};
const displayModes = reactive({
  [UnitType.VOLUME]: computed(() => getDisplayModes(UnitType.VOLUME)),
  [UnitType.MASS]: computed(() => getDisplayModes(UnitType.MASS)),
});
</script>
<template>
  <span class="amount">
    <span v-if="amounts.text" class="q text"> {{ amounts.text }} </span>
    <template v-for="type in [UnitType.VOLUME, UnitType.MASS]">
      <span v-for="mode in displayModes[type]" class="q" :class="type">
        <Tooltip
          v-if="mode === 'combined'"
          :tooltip="formatQuantity(amounts[type][S.METRIC])"
        >
          {{ formatQuantity(amounts[type][S.IMPERIAL]) }}
        </Tooltip>
        <template v-else>
          {{ formatQuantity(amounts[type][mode]) }}
        </template>
      </span>
    </template>
  </span>
</template>

<style scoped>
.q ~ .q:before {
  content: " / ";
  display: inline;
}
.q ~ .mass {
  &::before {
    content: " (";
  }
  &::after {
    content: ") ";
  }
}
</style>
