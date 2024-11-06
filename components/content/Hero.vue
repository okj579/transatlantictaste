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
  <div
    class="relative left-[calc(50%-50vw)] -mt-8 min-h-[calc(100vh-65px)] w-[100vw]"
  >
    <NuxtPicture
      class="-z-2 absolute h-full w-full"
      :img-attrs="{ class: 'w-full h-full object-cover' }"
      :src="src"
      :placeholder="[100, 50, 20]"
      sizes="1216px"
      alt=""
    />
    <div
      class="-z-1 absolute h-full w-full bg-gray-700/50 dark:bg-gray-950/70"
    />
    <div class="relative px-4 py-12 sm:px-6 md:py-20">
      <div class="prose dark:prose-invert mx-auto max-w-2xl text-gray-100">
        <LogoLarge
          class="text-primary-400 dark:text-primary-300 mx-auto mb-20 h-56 max-w-full drop-shadow-md"
        />
        <div
          class="mb-4 text-center text-xl font-extrabold drop-shadow sm:text-2xl"
        >
          <slot name="title" />
        </div>
        <div
          class="rounded-3xl bg-gray-500/20 p-4 px-8 text-lg backdrop-blur dark:text-gray-300"
        >
          <slot name="description" />
        </div>
      </div>
    </div>
    <ImageCredit
      :image="src"
      class="text-subtle absolute bottom-2 right-4 block"
    />
  </div>
</template>
