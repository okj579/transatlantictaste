<template>
  <div>
    <PageHeader />

    <div class="prose dark:prose-invert">
      <slot />
    </div>

    <hr class="border-gray-200 dark:border-gray-800 my-6" />

    <PageFooter class="mt-16" />
  </div>
</template>
