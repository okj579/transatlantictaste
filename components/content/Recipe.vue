<script setup lang="ts">
import type { IngredientGroup, Ingredient } from "~/types/recipes";

const props = defineProps<{
  name: string;
  prepTime?: string;
  serves?: number;
  cookTime?: string;
  ingredients?: Ingredient[];
  groups?: IngredientGroup[];
}>();
const ingredients = computed(() => props.ingredients || []);
const groups = computed(() => props.groups || []);
</script>
<template>
  <div>
    <slot name="default" />
    <div>
      <div v-if="serves">Serves: {{ serves }}</div>
      <div v-if="prepTime">Preparation time: {{ prepTime }}</div>
      <div v-if="cookTime">Cook time: {{ cookTime }}</div>
    </div>

    <slot name="ingredients">
      <IngredientList :ingredients :groups />
    </slot>

    <slot name="description" />

    <slot name="steps" />
  </div>
</template>
