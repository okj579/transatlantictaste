<script setup lang="ts">
const props = defineProps<{
  image: string;
}>();
const { data: credit } = await useImageCredits(() => props.image);
const link = computed(() => credit.value.authorLink ?? credit.value.link);
const domain = computed(() => link.value && new URL(link.value).host);
</script>

<template>
  <small v-if="credit">
    <UPopover class="inline-block" :popper="{ placement: 'bottom-end' }">
      <span class="cursor-help text-2xs italic">
        Image: {{ credit.author }}
        <template v-if="credit.source && !credit.author"> from {{ credit.source }} </template>
        <template v-if="credit.license && !credit.author"> ({{ credit.license }}) </template>
      </span>
      <template #panel>
        <div class="p-4 text-left text-xs">
          Image
          <template v-if="credit.author"> by {{ credit.author }} </template>
          <template v-if="credit.source"> from {{ credit.source }} </template>
          <template v-if="credit.license"> licensed under {{ credit.license }} </template>
          <br />
          <NuxtLink v-if="link" :to="link" rel="external nofollow noopener noreferrer" target="_blank">
            <UIcon name="i-heroicons-link" class="me-1 align-middle" />
            <span class="italic underline">{{ domain }}</span>
          </NuxtLink>
        </div>
      </template>
    </UPopover>
  </small>
</template>
