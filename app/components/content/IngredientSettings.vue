<script setup lang="ts">
import { UnitOptions } from "~/composables/useRecipeSettings";

const { t } = useI18n();
const { showTranslation, volumeUnits, massUnits } = toRefs(useRecipeSettings());

const volumeOptions = useSelectOptions("unitOptions", [UnitOptions.IMPERIAL, UnitOptions.METRIC, UnitOptions.BOTH]);
const massOptions = useSelectOptions("unitOptions", [UnitOptions.METRIC, UnitOptions.BOTH]);
</script>
<template>
  <UCollapsible class="not-prose">
    <UButton
      variant="soft"
      color="neutral"
      :label="t('ingredientSettings.label')"
      icon="i-mdi-cog"
      trailingIcon="i-mdi-chevron-down"
      class="w-full"
      :ui="{ label: 'flex-1 text-left px-2' }"
    />
    <template #content>
      <div class="border-muted/50 bg-muted/50 mx-2 flex flex-wrap gap-4 rounded-b-lg border border-t-0 px-4 py-2">
        <UFormField :label="t('ingredientSettings.volumeUnits')">
          <URadioGroup :items="volumeOptions" v-model="volumeUnits" />
        </UFormField>
        <UFormField :label="t('ingredientSettings.massUnits')">
          <URadioGroup v-model="massUnits" :items="massOptions" />
        </UFormField>
        <UFormField :label="t('ingredientSettings.showTranslation')">
          <USwitch v-model="showTranslation" class="mt-1" />
        </UFormField>
      </div>
    </template>
  </UCollapsible>
</template>
