<script setup lang="ts">
const { data: doc } = await useContentPage();
if (doc.value) useContentHead(doc.value);

const recipes = useSubpages("/recipes", 3);
const tips = useSubpages("/tips-ingredients", 4);

useHead({
  titleTemplate: "%pageTitle",
});
</script>
<template>
  <NuxtLayout name="wide">
    <ContentRenderer :value="doc" />

    <div class="mt-10">
      <h3 class="mb-8 text-3xl">Recipes</h3>
      <RecipeList :pages="recipes">
        <template #extra-tiles>
          <div class="flex items-center justify-center">
            <NuxtLink
              to="/recipes"
              class="flex h-full min-h-36 w-full items-center justify-center rounded-lg bg-gray-500/10 underline backdrop-blur"
            >
              <span>More Recipes...</span>
            </NuxtLink>
          </div>
        </template>
      </RecipeList>
    </div>

    <div class="mt-10">
      <h3 class="mb-8 text-3xl">Tips & Ingredients</h3>
      <TipsList :pages="tips" />
      <NuxtLink to="/tips-ingredients" class="my-4 inline-block px-6 underline">
        More Tips & Ingredients...
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
