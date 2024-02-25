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
    <ContentRenderer :value="doc"/>

    <div class="mt-10">
      <h3 class="text-3xl mb-8">Recipes</h3>
      <RecipeList :pages="recipes">
        <template #extra-tiles>
          <div class="flex justify-center items-center">
            <NuxtLink
              to="/recipes"
              class="underline w-full h-full bg-gray-500/10 backdrop-blur rounded-lg min-h-36 flex items-center justify-center"
            >
              <span>More Recipes...</span>
            </NuxtLink>
          </div>
        </template>
      </RecipeList>
    </div>

    <div class="mt-10">
      <h3 class="text-3xl mb-8">Tips & Ingredients</h3>
      <TipsList :pages="tips" />
      <NuxtLink to="/tips-ingredients" class="underline my-4 px-6 inline-block">
        More Tips & Ingredients...
      </NuxtLink>
    </div>

  </NuxtLayout>
</template>
