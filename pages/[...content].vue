<script setup lang="ts">
const isDev = process.dev ?? false;
</script>

<template>
    <ContentDoc>
        <template #default="{doc}">
            <NuxtLayout :pageTitle="(doc.showTitle ?? true) ? doc.title : false">
                <ContentRenderer :value="doc" />
            </NuxtLayout>
        </template>
        <template #empty="{doc}">
            <NuxtLayout :pageTitle="(doc?.showTitle ?? true) ? doc?.title : false" />
        </template>
    </ContentDoc>
</template>