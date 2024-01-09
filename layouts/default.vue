<template>
  <div>
    <main>
      <PageHeader />
      <slot />
    </main>

    <hr class="border-gray-200 dark:border-gray-800 my-12" />

    <PageFooter />
  </div>
</template>
<script setup lang="ts"></script>
