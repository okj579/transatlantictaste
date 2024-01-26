<script setup lang="ts">
import {
  type AmountInput,
  type Quantity,
  UnitSystem as S,
} from "~/types/recipes";
import { parseAmount } from "~/utils/amounts";

const props = defineProps<{
  amount: AmountInput;
}>();

const { text, volume, mass } = toRefs(
  reactiveComputed(() => parseAmount(props.amount)),
);

const formatQuantity = (q?: Quantity) =>
  q && `${q.amountText ?? q.amount}\u00A0${q.unit}`;
</script>
<template>
  <span class="amount">
    <span v-if="text"> {{ text }} </span>
    <Tooltip
      v-if="volume[S.IMPERIAL] && volume[S.METRIC]"
      :tooltip="formatQuantity(volume[S.METRIC])"
    >
      {{ formatQuantity(volume[S.IMPERIAL]) }}
    </Tooltip>
    <span v-if="volume[S.METRIC] && !volume[S.IMPERIAL]">
      {{ formatQuantity(volume[S.METRIC]) }}
    </span>
    <span v-if="mass[S.METRIC]">{{ formatQuantity(mass[S.METRIC]) }}</span>
  </span>
</template>

<style scoped>
.amount > :not(:first-child)::before {
  content: " / ";
  display: inline;
}
</style>
