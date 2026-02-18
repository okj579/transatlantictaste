<script setup lang="ts">
import type { Ingredient, IngredientGroup } from "~~/types/recipes";
import { hash } from "ohash";

const props = defineProps<{
  ingredients: Ingredient[];
  groups?: IngredientGroup[] | "";
}>();
const groups = computed(() => props.groups || []);

const { t } = useI18n();

const { showTranslation } = toRefs(useRecipeSettings());

const ingredientNames = [
  ...props.ingredients.map((i) => i.name),
  ...(groups.value.flatMap?.((g) => g.ingredients).map((i) => i.name) ?? []),
];
const { data: translations } = await useAsyncData<Record<string, string>>(
  `ingredients-${hash(ingredientNames)}`,
  () => import("~~/content/_data/glossary.yaml").then((m) => m.default.ingredients),
  { pick: ingredientNames },
);
const getTranslation = ({ translation, name }: Ingredient) => translation ?? translations.value?.[name];
</script>

<template>
  <div class="my-4">
    <div class="ingredient-table m-0 grid w-auto">
      <template v-for="group in [{ ingredients }, ...groups]">
        <div v-if="'title' in group" class="col-span-full border-b-0">
          <h4>{{ group.title }}</h4>
        </div>
        <div
          v-for="(ingredient, i) in group.ingredients"
          :key="i"
          class="border-muted col-span-full grid grid-cols-subgrid border-b last:border-0"
          role="listitem"
        >
          <IngredientAmount :amount="ingredient.amount" />
          <div class="cell col-start-[name]">
            <Tooltip v-if="!showTranslation && getTranslation(ingredient)" :tooltip="getTranslation(ingredient)">
              {{ ingredient.name }}
            </Tooltip>
            <span v-else>{{ ingredient.name }}</span>
            <NuxtLinkLocale v-if="ingredient.link" :to="ingredient.link" class="ms-1">
              <UIcon name="i-mdi-information-variant-circle-outline" class="align-middle text-lg" :title="t('info')" />
            </NuxtLinkLocale>
          </div>
          <div v-if="showTranslation" class="cell">
            {{ getTranslation(ingredient) ?? "" }}
          </div>
        </div>
      </template>
      <div class="col-span-full">
        <IngredientSettings class="mt-2 block" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference '~/assets/app.css';

.ingredient-table {
  grid-template-columns: [vol volI] min-content [volM] min-content [mass massI] min-content [massM] min-content [name] auto auto;
}
.ingredient-table :deep(.cell) {
  @apply px-2 py-1;
}
</style>
