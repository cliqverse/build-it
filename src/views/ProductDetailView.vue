<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import PageHero from '@/components/layout/PageHero.vue'
import CtaSection from '@/components/sections/CtaSection.vue'
import PracticesSection from '@/components/sections/PracticesSection.vue'
import SpeedStrip from '@/components/sections/SpeedStrip.vue'
import WorkSection from '@/components/sections/WorkSection.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { useProductsStore } from '@/stores/products'
import { useSiteStore } from '@/stores/site'
import { useWorkStore } from '@/stores/work'
import type { PageHeroCopy, Product, SectionCopy } from '@/types/content'
import { pad } from '@/utils/format'

const props = defineProps<{ id: string }>()

const productsStore = useProductsStore()
const { products, detail } = storeToRefs(productsStore)
const { works } = storeToRefs(useWorkStore())
const { nav } = storeToRefs(useSiteStore())

/* The router only lets known ids through, so the fallback is never shown in practice. */
const product = computed<Product>(() => productsStore.findProduct(props.id) ?? products.value[0]!)

const relatedWorks = computed(() => works.value.filter((work) => work.product === product.value.id))

const hero = computed<PageHeroCopy>(() => ({
  eyebrow: product.value.name,
  title: product.value.tagline,
  intro: product.value.summary,
  primary: product.value.cta ?? nav.value.cta,
  secondary: relatedWorks.value.length
    ? { label: detail.value.relatedLink, href: `#${detail.value.related.id}` }
    : undefined,
}))

const capabilitiesCopy = computed<SectionCopy>(() => ({ ...detail.value.capabilities, intro: product.value.descriptor }))
const otherProducts = computed(() => products.value.filter((item) => item.id !== product.value.id))

usePageMeta(() => ({
  title: `${product.value.name}: ${product.value.tagline.replace(/\.$/, '')}`,
  description: product.value.summary,
}))
</script>

<template>
  <PageHero :copy="hero" />

  <section :id="capabilitiesCopy.id" :aria-labelledby="`${capabilitiesCopy.id}-title`" class="section-y bg-white">
    <div class="container-page">
      <SectionHeading :copy="capabilitiesCopy" />
      <ul class="mt-12 grid gap-4 md:grid-cols-2 lg:gap-5">
        <RevealOnScroll v-for="(capability, i) in product.capabilities" :key="capability.title" as="li" :delay="(i % 2) * 100">
          <div class="card flex h-full gap-5 p-7 lg:p-9">
            <span aria-hidden="true" class="font-display text-sm font-bold text-brand-600">{{ pad(i + 1) }}</span>
            <div>
              <h3 class="font-display text-2xl font-bold tracking-tight text-ink">{{ capability.title }}</h3>
              <p class="mt-2 text-ink/70">{{ capability.body }}</p>
            </div>
          </div>
        </RevealOnScroll>
      </ul>
    </div>
  </section>

  <SpeedStrip />

  <WorkSection
    v-if="relatedWorks.length"
    :copy="detail.related"
    :works="relatedWorks"
  />

  <PracticesSection :copy="detail.others" :products="otherProducts" :explore-label="detail.explore" />

  <CtaSection />
</template>
