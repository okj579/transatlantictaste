<script setup lang="ts">
withDefaults(
  defineProps<{
    src?: string;
  }>(),
  {
    src: "/images/maarten-van-den-heuvel-EzH46XCDQRY-unsplash.jpg",
  },
);
</script>

<template>
  <div class="relative left-[calc(50%-50vw)] -mt-8 min-h-[calc(100vh-65px)] w-screen">
    <NuxtPicture
      class="absolute -z-2 h-full w-full"
      :img-attrs="{ class: 'w-full h-full object-cover' }"
      :src="src"
      :placeholder="[100, 50, 20]"
      sizes="1216px"
      alt=""
    />
    <div class="absolute -z-1 h-full w-full bg-neutral-700/50 dark:bg-neutral-950/70" />
    <div class="relative px-4 py-12 sm:px-6 md:py-20">
      <div class="prose dark:prose-invert mx-auto max-w-2xl text-neutral-100">
        <LogoLarge class="text-primary-400 dark:text-primary-300 mx-auto mb-20 h-56 max-w-full drop-shadow-md" />
        <div class="mb-4 text-center text-xl font-extrabold drop-shadow-sm sm:text-2xl">
          <slot name="title" />
        </div>
        <div class="rounded-3xl bg-neutral-500/20 p-4 px-8 text-lg backdrop-blur-sm dark:text-neutral-300">
          <slot name="description" />
        </div>
      </div>
    </div>
    <ImageCredit :image="src" class="text-subtle absolute right-4 bottom-2 block" />
  </div>
</template>
