<script setup lang="ts">
import type { IngredientGroup, Ingredient } from "~/types/recipes";

defineProps<{
  name: string;
  prepTime?: string;
  serves?: number;
  cookTime?: string;
  ingredients?: Ingredient[];
  groups?: IngredientGroup[];
}>();
</script>
<template>
  <div>
    <div>
      <div v-if="serves">Serves: {{ serves }}</div>
      <div v-if="prepTime">Preparation time: {{ prepTime }}</div>
      <div v-if="cookTime">Cook time: {{ cookTime }}</div>
    </div>

    <slot name="ingredients">
      <IngredientList :ingredients="ingredients" :groups="groups" />
    </slot>

    <slot name="default" />

    <slot name="steps" />
  </div>
</template>
