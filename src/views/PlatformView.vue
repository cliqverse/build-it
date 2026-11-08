<script setup lang="ts">
import { storeToRefs } from 'pinia'
import PageHero from '@/components/layout/PageHero.vue'
import AssuranceSection from '@/components/sections/AssuranceSection.vue'
import CtaSection from '@/components/sections/CtaSection.vue'
import PhasesSection from '@/components/sections/PhasesSection.vue'
import PlatformSection from '@/components/sections/PlatformSection.vue'
import SpeedSection from '@/components/sections/SpeedSection.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { usePlatformStore } from '@/stores/platform'

const { meta, hero, speed, assurance, phasesSection, phases } = storeToRefs(usePlatformStore())

usePageMeta(meta)
</script>

<template>
  <PageHero :copy="hero" />
  <SpeedSection :speed="speed" tone="light" />
  <PhasesSection :copy="phasesSection" :phases="phases" />
  <AssuranceSection :assurance="assurance" tone="white" />
  <PlatformSection />
  <CtaSection />
</template>
