<script setup lang="ts">
import type { IngredientGroup, Ingredient } from "~/types/recipes";

defineProps<{
  ingredients: Ingredient[];
  groups?: IngredientGroup[];
}>();

const localePath = useLocalePath();
const { t } = useI18n();

const showTranslation = ref(false);
</script>
<template>
  <div class="my-4">
    <div class="overflow-hidden w-max mb-4">
      <UCheckbox
        v-model="showTranslation"
        :label="t('options.showTranslation')"
      />
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
            <IngredientAmount :amount="ingredient.amount" />
          </td>
          <td>
            <UPopover
              v-if="!showTranslation && ingredient.translation"
              mode="hover"
              class="inline-block"
              :popper="{ offsetSkid: 20 }"
            >
              <span class="underline decoration-dotted cursor-help">
                {{ ingredient.name }}
              </span>
              <template #panel>
                <div class="p-4 pointer-events-none">
                  {{ ingredient.translation }}
                </div>
              </template>
            </UPopover>
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
          <td v-if="showTranslation">{{ ingredient.translation ?? "" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
