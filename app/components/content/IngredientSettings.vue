<script setup lang="ts">
import { UnitOptions } from "~/composables/useRecipeSettings";

const { t } = useI18n();
const { showTranslation, volumeUnits, massUnits } = toRefs(useRecipeSettings());

const volumeOptions = useSelectOptions("unitOptions", [
  UnitOptions.IMPERIAL,
  UnitOptions.METRIC,
  UnitOptions.BOTH,
]);
const massOptions = useSelectOptions("unitOptions", [
  UnitOptions.METRIC,
  UnitOptions.BOTH,
]);
</script>
<template>
  <UAccordion
    :items="[
      {
        label: t('ingredientSettings.label'),
        icon: 'i-mdi-cog',
        variant: 'soft',
        color: 'green',
      },
    ]"
    class="not-prose rounded-lg bg-gray-800"
  >
    <template #item>
      <div class="flex flex-wrap gap-4 px-4">
        <UFormGroup :label="t('ingredientSettings.volumeUnits')">
          <URadioGroup :options="volumeOptions" v-model="volumeUnits" />
        </UFormGroup>
        <UFormGroup :label="t('ingredientSettings.massUnits')">
          <URadioGroup v-model="massUnits" :options="massOptions" />
        </UFormGroup>
        <UFormGroup :label="t('ingredientSettings.showTranslation')">
          <UToggle v-model="showTranslation" class="mt-1" />
        </UFormGroup>
      </div>
    </template>
  </UAccordion>
</template>
