<script setup lang="ts">
interface Ingredient {
  amount: string;
  name: string;
  link?: string;
  translation?: string;
}
const { ingredients } = defineProps<{
  ingredients: Ingredient[];
}>();
const localePath = useLocalePath();
// const {t} = useI18n();
const t = (x) => x;


const showTranslation = ref(false);
</script>
<template>
  <div>
    <UCheckbox v-model="showTranslation" :label="t('options.showTranslation')"/>
    <table class="table-auto w-auto">
      <tbody>
        <tr v-for="(ingredient, i) in ingredients" :key="i" class="">
          <td class="text-right">{{ ingredient.amount }}</td>
          <td>
            <NuxtLink :to="ingredient.link" :custom="!ingredient.link">
              <span 
                v-if="!showTranslation && ingredient.translation" 
                :title="ingredient.translation"
                class="underline decoration-dotted cursor-help"
               >{{ ingredient.name }}</span>
              <span v-else>{{ ingredient.name }}</span>
            </NuxtLink>
          </td>
          <td v-if="showTranslation">{{ ingredient.translation ?? '' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
