<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import AppLink from '@/components/ui/AppLink.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import type { Product, SectionCopy } from '@/types/content'
import { pad } from '@/utils/format'

defineProps<{ copy: SectionCopy; products: Product[]; exploreLabel: string }>()
</script>

<template>
  <section :id="copy.id" :aria-labelledby="`${copy.id}-title`" class="section-y bg-white">
    <div class="container-page">
      <SectionHeading :copy="copy" />

      <ul class="mt-12">
        <RevealOnScroll v-for="(product, i) in products" :key="product.id" as="li" :delay="i * 80" class="relative">
          <span aria-hidden="true" class="draw-in absolute inset-x-0 top-0 h-px bg-ink/15" />
          <article
            class="group/card grid gap-6 rounded-2xl px-0 py-8 transition-colors duration-500 ease-smooth sm:-mx-6 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:py-10 lg:hover:bg-paper"
          >
            <div class="flex items-start gap-5 lg:col-span-4">
              <span aria-hidden="true" class="pt-1 font-display text-sm font-bold text-brand-600">{{ pad(i + 1) }}</span>
              <div>
                <IconBadge :icon="product.icon" />
                <h3 :id="`practice-${product.id}`" class="mt-5 font-display text-3xl font-bold tracking-tight text-ink">
                  {{ product.name }}
                </h3>
                <p class="mt-2 text-lg font-semibold text-brand-600">{{ product.tagline }}</p>
              </div>
            </div>

            <div class="lg:col-span-5">
              <p class="text-ink/70">{{ product.summary }}</p>
              <ul class="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                <li v-for="feature in product.features" :key="feature" class="flex gap-2.5 font-medium text-ink">
                  <AppIcon name="check" :size="20" :stroke-width="2.25" class="shrink-0 text-brand-600" />
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="lg:col-span-3 lg:justify-self-end">
              <AppLink
                :href="`/products/${product.id}`"
                :aria-describedby="`practice-${product.id}`"
                class="group/link inline-flex h-11 items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 font-bold whitespace-nowrap text-ink shadow-soft transition-[background-color,color,border-color,box-shadow,translate] duration-300 ease-smooth hover:border-brand-600 hover:bg-brand-600 hover:text-white hover:shadow-brand motion-safe:hover:-translate-y-0.5"
              >
                {{ exploreLabel }} {{ product.shortName }}
                <AppIcon
                  name="arrow-right"
                  :size="18"
                  :stroke-width="2.25"
                  class="transition-transform duration-300 ease-smooth group-hover/link:translate-x-1 motion-reduce:transition-none"
                />
              </AppLink>
            </div>
          </article>
        </RevealOnScroll>
      </ul>
    </div>
  </section>
</template>
