<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AppLink from '@/components/ui/AppLink.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import { useSiteStore } from '@/stores/site'

const { brand, cta, ui } = storeToRefs(useSiteStore())
</script>

<template>
  <section aria-labelledby="cta-title" class="surface-maroon bg-maroon-700 text-white">
    <div class="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:items-end">
      <div class="lg:col-span-8">
        <RevealOnScroll as="p" class="flex items-start gap-2.5 text-sm font-bold tracking-eyebrow text-maroon-200 uppercase">
          <span aria-hidden="true" class="mt-[0.45em] size-2 shrink-0 rounded-full bg-maroon-200" />
          {{ cta.eyebrow }}
        </RevealOnScroll>
        <RevealOnScroll id="cta-title" as="h2" :delay="80" class="mt-5 text-title font-bold">
          {{ cta.title.lead }} <br class="hidden sm:block" />{{ cta.title.highlight }}
        </RevealOnScroll>
        <RevealOnScroll as="p" :delay="160" class="mt-6 max-w-xl text-lg text-pretty text-white/80 md:text-xl">
          {{ cta.body }}
        </RevealOnScroll>
      </div>

      <RevealOnScroll :delay="240" class="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
        <BaseButton as="a" :href="cta.primary.href" variant="light" size="lg" icon="arrow-right">{{ cta.primary.label }}</BaseButton>
        <BaseButton as="a" :href="cta.secondary.href" variant="outline-light" size="lg">{{ cta.secondary.label }}</BaseButton>
        <div class="mt-2 space-y-1 text-sm text-white/80">
          <p>
            {{ cta.emailPrompt }}
            <AppLink :href="`mailto:${brand.email}`" class="font-bold text-white underline decoration-2 underline-offset-4">
              {{ brand.email }}
            </AppLink>
          </p>
          <p>
            {{ cta.whatsappPrompt }}
            <AppLink :href="cta.whatsapp.href" class="font-bold text-white underline decoration-2 underline-offset-4">
              {{ cta.whatsapp.label }}<span class="sr-only"> {{ ui.newTab }}</span>
            </AppLink>
          </p>
        </div>
      </RevealOnScroll>
    </div>
    <div class="container-page">
      <p class="border-t border-white/20 py-5 text-sm font-medium text-white/75">{{ cta.footnote }}</p>
    </div>
  </section>
</template>
