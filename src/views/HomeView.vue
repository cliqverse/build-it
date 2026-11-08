<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AssuranceSection from '@/components/sections/AssuranceSection.vue'
import CtaSection from '@/components/sections/CtaSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import OfferingsSection from '@/components/sections/OfferingsSection.vue'
import SpeedSection from '@/components/sections/SpeedSection.vue'
import StatsSection from '@/components/sections/StatsSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { useHomeStore } from '@/stores/home'
import { usePlatformStore } from '@/stores/platform'
import { useProductsStore } from '@/stores/products'

const { meta } = storeToRefs(useHomeStore())
const { offeringsSection, offerings, offeringsAdvice, offeringsCta } = storeToRefs(useProductsStore())
const { speed, assurance } = storeToRefs(usePlatformStore())

usePageMeta(meta)
</script>

<template>
  <HeroSection />
  <OfferingsSection
    :copy="offeringsSection"
    :offerings="offerings"
    :advice="offeringsAdvice"
    :cta="offeringsCta"
    tone="white"
  />
  <SpeedSection :speed="speed" />
  <AssuranceSection :assurance="assurance" />
  <StatsSection />
  <TestimonialsSection />
  <CtaSection />
</template>
