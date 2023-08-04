<script setup lang="ts">
interface Ingredient {
  amount: string;
  name: string;
}
const { ingredients } = defineProps<{
  ingredients: Ingredient[];
}>();
</script>
<template>
  <div>
    <table class="table-auto w-auto">
      <tbody>
        <tr v-for="(ingredient, i) in ingredients" :key="i" class="">
          <td class="text-right">{{ ingredient.amount }}</td>
          <td>{{ ingredient.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
