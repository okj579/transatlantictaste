<script setup lang="ts">
import { type AmountInput, type Quantity, UnitSystem } from "~/types/recipes";
import { parseAmount } from "~/utils/amounts";
const I = UnitSystem.IMPERIAL;
const M = UnitSystem.METRIC;

const props = defineProps<{
  amount: AmountInput;
}>();

const { text, volume, mass } = toRefs(
  reactiveComputed(() => parseAmount(props.amount)),
);

const formatQuantity = (q: Quantity) =>
  `${q.amountText ?? q.amount}\u00A0${q.unit}`;
</script>
<template>
  <span class="amount">
    <span v-if="text"> {{ text }} </span>
    <span v-if="volume[I]">
      {{ formatQuantity(volume[I]) }}
      <small v-if="volume[M] && volume[M]?.amount > 40">
        ({{ formatQuantity(volume[M]) }})
      </small>
    </span>
    <span v-if="volume[M] && !volume[I]">{{ formatQuantity(volume[M]) }}</span>
    <template v-if="volume[M] && mass[M]"> / </template>
    <span v-if="mass[M]">{{ formatQuantity(mass[M]) }}</span>
  </span>
</template>
