<script setup lang="ts">
import type { IngredientGroup, Ingredient } from "~/types/recipes";

defineProps<{
  name: string;
  prepTime?: string;
  serves?: number;
  cookTime?: string;
  ingredients: Ingredient[];
  groups?: IngredientGroup[];
}>();
</script>
<template>
  <div>
    <div>
      <div v-if="serves">Serves: {{ serves }}</div>
      <div v-if="prepTime">Preperation time: {{ prepTime }}</div>
      <div v-if="cookTime">Cook time: {{ cookTime }}</div>
    </div>

    <IngredientList :ingredients="ingredients" :groups="groups" />

    <slot name="default" />

    <slot name="steps" />
  </div>
</template>
