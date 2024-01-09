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
    <NuxtImg
      class="absolute -z-2 w-full h-full object-cover"
      :src="src"
      :width="1216"
      :placeholder="[100, 50, 20]"
    />
    <div class="absolute w-full h-full -z-1 bg-gray-950/70" />
    <div class="py-12 md:py-20 px-4 sm:px-6 relative">
      <div class="max-w-2xl mx-auto prose">
        <LogoLarge class="h-56 mx-auto text-primary-300" />
        <div class="mt-20">
          <div class="text-xl sm:text-2xl font-extrabold mb-4 text-center">
            <slot name="title" />
          </div>
          <div
            class="text-lg text-subtle p-4 backdrop-blur rounded-3xl bg-gray-500/20 px-8"
          >
            <slot name="description" />
          </div>
        </div>
      </div>
    </div>
    <ImageCredit
      :image="src"
      class="absolute block bottom-2 right-4 text-subtle"
    />
  </div>
</template>
