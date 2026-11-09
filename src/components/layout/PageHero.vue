<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import type { PageHeroCopy } from '@/types/content'

defineProps<{ copy: PageHeroCopy }>()
</script>

<template>
  <section aria-labelledby="page-title" class="surface-brand bg-brand-600 text-white">
    <div class="container-page grid gap-8 py-16 md:py-24 lg:grid-cols-12 lg:items-end lg:gap-10">
      <div class="lg:col-span-7">
        <RevealOnScroll as="p" class="flex items-start gap-2.5 text-sm font-bold tracking-eyebrow text-brand-200 uppercase">
          <span aria-hidden="true" class="mt-[0.45em] size-2 shrink-0 rounded-full bg-brand-200" />
          {{ copy.eyebrow }}
        </RevealOnScroll>
        <RevealOnScroll id="page-title" as="h1" :delay="80" class="mt-5 text-title font-bold">
          {{ copy.title }}
        </RevealOnScroll>
      </div>
      <div class="lg:col-span-5 lg:pb-2">
        <RevealOnScroll as="p" :delay="160" class="text-lg text-pretty text-white/80 md:text-xl">
          {{ copy.intro }}
        </RevealOnScroll>
        <RevealOnScroll v-if="copy.primary || copy.secondary" :delay="240" class="mt-8 flex flex-wrap gap-3">
          <BaseButton v-if="copy.primary" as="a" :href="copy.primary.href" variant="light" size="lg" icon="arrow-right">
            {{ copy.primary.label }}
          </BaseButton>
          <BaseButton v-if="copy.secondary" as="a" :href="copy.secondary.href" variant="outline-light" size="lg">
            {{ copy.secondary.label }}
          </BaseButton>
        </RevealOnScroll>
      </div>
    </div>
  </section>
</template>
