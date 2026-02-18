<template>
  <div>
    <main>
      <PageHeader />
      <slot />
    </main>

    <hr class="my-12 border-neutral-200 dark:border-neutral-800" />

    <PageFooter />
  </div>
</template>
<script setup lang="ts"></script>
