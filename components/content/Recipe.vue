<script setup lang="ts">
defineProps<{
  name: string;
  prepTime?: string;
  serves?: number;
  cookTime?: string;
  ingredients: any[];
  groups?: any[];
}>();
</script>
<template>
  <div>
    <div>
      <div v-if="serves">Serves: {{ serves }}</div>
      <div v-if="prepTime">Preperation time: {{ prepTime }}</div>
      <div v-if="cookTime">Cook time: {{ cookTime }}</div>
    </div>

    <IngredientList :ingredients :groups />

    <slot name="default" />

    <slot name="steps" />
  </div>
</template>
