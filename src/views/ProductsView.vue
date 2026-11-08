<script setup lang="ts">
import { storeToRefs } from 'pinia'
import PageHero from '@/components/layout/PageHero.vue'
import CtaSection from '@/components/sections/CtaSection.vue'
import OfferingsSection from '@/components/sections/OfferingsSection.vue'
import PracticesSection from '@/components/sections/PracticesSection.vue'
import SpeedStrip from '@/components/sections/SpeedStrip.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { useProductsStore } from '@/stores/products'

const { meta, hero, practicesSection, products, detail, offeringsSection, offerings, offeringsAdvice, offeringsCta } =
  storeToRefs(useProductsStore())

usePageMeta(meta)
</script>

<template>
  <PageHero :copy="hero" />
  <PracticesSection :copy="practicesSection" :products="products" :explore-label="detail.explore" />
  <SpeedStrip />
  <OfferingsSection :copy="offeringsSection" :offerings="offerings" :advice="offeringsAdvice" :cta="offeringsCta" />
  <CtaSection />
</template>
