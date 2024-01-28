<script setup lang="ts">
import type { IngredientGroup, Ingredient } from "~/types/recipes";
import { hash } from "ohash";

const props = defineProps<{
  ingredients: Ingredient[];
  groups?: IngredientGroup[];
}>();

const localePath = useLocalePath();
const { t } = useI18n();

const { showMetric, showTranslation } = toRefs(useRecipeSettings());

const ingredientNames = [
  ...props.ingredients.map((i) => i.name),
  ...(props.groups?.flatMap?.((g) => g.ingredients).map((i) => i.name) ?? []),
];
interface Glossary {
  ingredients: Record<string, string>;
}
const { data: translations } = useAsyncData(
  `ingredients-${hash(ingredientNames)}`,
  queryContent<Glossary>("_glossary").findOne,
  {
    transform: (d) => pick(d.ingredients, ingredientNames),
  },
);

const getTranslation = (ingredient: Ingredient) =>
  ingredient.translation ?? translations.value?.[ingredient.name];
</script>
<template>
  <div class="my-4">
    <div class="flex flex-wrap gap-x-4">
      <div class="overflow-hidden w-max mb-4">
        <UCheckbox v-model="showMetric" :label="t('options.showMetric')" />
      </div>
      <div class="overflow-hidden w-max mb-4">
        <UCheckbox
          v-model="showTranslation"
          :label="t('options.showTranslation')"
        />
      </div>
    </div>
    <table class="table-auto w-auto m-0">
      <tbody v-for="group in [{ ingredients }, ...(groups ?? [])]">
        <tr v-if="'title' in group" class="border-b-0">
          <th colspan="3">
            <h4>{{ group.title }}</h4>
          </th>
        </tr>
        <tr v-for="(ingredient, i) in group.ingredients" :key="i" class="">
          <td class="text-right">
            <IngredientAmount
              v-if="ingredient.amount"
              :amount="ingredient.amount"
              :showMetric
            />
          </td>
          <td>
            <Tooltip
              v-if="!showTranslation && getTranslation(ingredient)"
              :tooltip="getTranslation(ingredient)"
            >
              {{ ingredient.name }}
            </Tooltip>
            <span v-else>{{ ingredient.name }}</span>
            <NuxtLink
              v-if="ingredient.link"
              :to="localePath(ingredient.link)"
              class="ms-1"
            >
              <UIcon
                name="i-mdi-information-variant-circle-outline"
                class="text-lg align-middle"
              />
            </NuxtLink>
          </td>
          <td v-if="showTranslation">{{ getTranslation(ingredient) ?? "" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
