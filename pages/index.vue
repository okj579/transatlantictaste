<script setup lang="ts">
const { navDirFromPath } = useContentHelpers();
const { navigation } = await useNavigation();
const recipes = computed(
  () =>
    navigation.value &&
    navDirFromPath("/recipes", navigation.value)?.slice(1, 4),
);
const tips = computed(
  () =>
    navigation.value &&
    navDirFromPath("/tips-ingredients", navigation.value)?.slice(1, 5),
);
</script>
<template>
  <NuxtLayout name="wide">
    <pre>{{}}</pre>
    <Hero>
      <template #title>
        Your guide to cooking across borders with easy conversions and tips.
      </template>
      <template #description>
        <p>
          I'm Owen, a US native who has called Germany home for over a decade.
          During this time, I've wrestled with adapting US recipes to a German
          kitchen and learned a lot about it. Over time, I curated a collection
          of converted recipes, accompanied by plenty of insights on ingredient
          usage and sourcing. And why not invite you along for this culinary
          journey? I'm excited to share what I've learned, my love for cooking,
          and some great recipes. Whether you're in the mood for classic
          American comfort or ready for a culinary adventure, Transatlantic
          Taste is your friendly guide to savoring the harmonious flavors of two
          continents.
        </p>
        <p class="text-center font-bold">
          Let's cook up something delicious together!
        </p>
      </template>
    </Hero>

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
