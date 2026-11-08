<script setup lang="ts">
import { storeToRefs } from 'pinia'
import PageHero from '@/components/layout/PageHero.vue'
import CtaSection from '@/components/sections/CtaSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import WorkSection from '@/components/sections/WorkSection.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { useWorkStore } from '@/stores/work'

const { meta, hero, listSection, works } = storeToRefs(useWorkStore())

usePageMeta(meta)
</script>

<template>
  <PageHero :copy="hero" />
  <WorkSection :copy="listSection" :works="works" />
  <TestimonialsSection />
  <CtaSection />
</template>
