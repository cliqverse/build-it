<script setup lang="ts">
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/ui/BaseButton.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { usePagesStore } from '@/stores/pages'

const { notFound } = storeToRefs(usePagesStore())

usePageMeta(() => notFound.value.meta)
</script>

<template>
  <section aria-labelledby="not-found-title" class="bg-white">
    <div class="container-page flex min-h-[60vh] flex-col justify-center py-24">
      <p class="isolate font-display text-7xl font-bold tracking-tight md:text-9xl">
        <span class="marker">{{ notFound.eyebrow }}</span>
      </p>
      <h1 id="not-found-title" class="mt-8 max-w-2xl text-title font-bold text-ink">{{ notFound.title }}</h1>
      <p class="mt-5 max-w-lg text-lg text-ink/70">{{ notFound.body }}</p>
      <div class="mt-9 flex flex-wrap gap-3">
        <BaseButton as="a" :href="notFound.primary.href" size="lg" icon="arrow-right">{{ notFound.primary.label }}</BaseButton>
        <BaseButton as="a" :href="notFound.secondary.href" variant="outline" size="lg">{{ notFound.secondary.label }}</BaseButton>
      </div>
    </div>
  </section>
</template>
