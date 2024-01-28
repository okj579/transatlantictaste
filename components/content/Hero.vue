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
    class="relative -mt-8 left-[calc(50%-50vw)] w-[100vw] min-h-[calc(100vh-65px)]"
  >
    <NuxtPicture
      class="absolute -z-2 w-full h-full"
      :img-attrs="{ class: 'w-full h-full object-cover' }"
      :src="src"
      :placeholder="[100, 50, 20]"
      sizes="1216px"
      alt=""
    />
    <div
      class="absolute w-full h-full -z-1 bg-gray-700/50 dark:bg-gray-950/70"
    />
    <div class="py-12 md:py-20 px-4 sm:px-6 relative">
      <div class="max-w-2xl mx-auto prose text-gray-100">
        <LogoLarge
          class="h-56 mx-auto text-primary-400 drop-shadow-md dark:text-primary-300 mb-20"
        />
        <div
          class="text-xl sm:text-2xl font-extrabold mb-4 text-center drop-shadow"
        >
          <slot name="title" />
        </div>
        <div
          class="text-lg dark:text-gray-300 p-4 backdrop-blur rounded-3xl bg-gray-500/20 px-8"
        >
          <slot name="description" />
        </div>
      </div>
    </div>
    <ImageCredit
      :image="src"
      class="absolute block bottom-2 right-4 text-subtle"
    />
  </div>
</template>
