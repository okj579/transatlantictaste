<script setup lang="ts">
import type { Recipe } from "schema-dts";
defineProps<{
  name: string;
  prepTime: string;
  serves: 4;
  ingredients: any[];
}>();
</script>
<template>
  <div>
    <slot name="default" />

    <div>
      <div v-if="serves">Serves: {{ serves }}</div>
      <div v-if="prepTime">Preperation time: {{ prepTime }}</div>
      <div v-if="cookTime">Cook time: {{ cookTime }}</div>
    </div>

    <IngredientList :ingredients="ingredients" />

    <slot name="steps" />
  </div>
</template>
