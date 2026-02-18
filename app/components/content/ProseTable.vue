<script setup lang="ts"></script>
<template>
  <div class="max-w-full overflow-auto">
    <table v-bind="$attrs" class="text-nowrap">
      <slot />
    </table>
  </div>
</template>
