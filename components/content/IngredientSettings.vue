<script setup lang="ts">
import { UnitOptions } from "~/composables/useRecipeSettings";

const { t } = useI18n();
const { showTranslation, volumeUnits, massUnits } = toRefs(useRecipeSettings());

const volumeUnitOptions = [
  UnitOptions.IMPERIAL,
  UnitOptions.METRIC,
  UnitOptions.BOTH,
];
const massUnitOptions = [UnitOptions.METRIC, UnitOptions.NONE];
</script>
<template>
  <UAccordion
    :items="[
      {
        label: t('ingredientSettings.label'),
        icon: 'i-mdi-cog',
        variant: 'soft',
        color: 'green',
        class: 'py-2',
      },
    ]"
    class="rounded-lg bg-gray-800"
  >
    <template #item>
      <div class="flex flex-wrap gap-4 px-4">
        <UFormGroup :label="t('ingredientSettings.volumeUnits')">
          <URadioGroup
            v-model="volumeUnits"
            v-bind="useSelectOptions('unitOptions', volumeUnitOptions)"
          />
        </UFormGroup>
        <UFormGroup :label="t('ingredientSettings.massUnits')">
          <URadioGroup
            v-model="massUnits"
            v-bind="useSelectOptions('unitOptions', massUnitOptions)"
          />
        </UFormGroup>
        <UFormGroup :label="t('ingredientSettings.showTranslation')">
          <UToggle v-model="showTranslation" />
        </UFormGroup>
      </div>
    </template>
  </UAccordion>
</template>
