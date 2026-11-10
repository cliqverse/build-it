<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppLink from '@/components/ui/AppLink.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import { useSiteStore } from '@/stores/site'

const { cta } = storeToRefs(useSiteStore())
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

      <RevealOnScroll :delay="240" class="lg:col-span-4">
        <div class="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
          <BaseButton as="a" :href="cta.primary.href" variant="light" size="lg" icon="arrow-right">{{ cta.primary.label }}</BaseButton>
          <BaseButton as="a" :href="cta.secondary.href" variant="outline-light" size="lg">{{ cta.secondary.label }}</BaseButton>
        </div>
        <ul class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <li v-for="channel in cta.channels" :key="channel.link.href">
            <AppLink
              :href="channel.link.href"
              class="group/channel flex items-center gap-4 rounded-xl border border-white/25 p-3 pr-4 transition-colors duration-300 ease-smooth hover:border-white/50 hover:bg-white/10"
            >
              <IconBadge :icon="channel.icon" tone="inverse" size="sm" />
              <span class="min-w-0 flex-1">
                <span class="block text-sm text-white/75">{{ channel.prompt }}</span>
                <span class="block font-bold text-white [overflow-wrap:anywhere]">{{ channel.link.label }}</span>
              </span>
              <AppIcon
                name="arrow-up-right"
                :size="18"
                :stroke-width="2.25"
                class="shrink-0 text-white/75 transition-[translate,color] duration-300 ease-smooth group-hover/channel:text-white motion-safe:group-hover/channel:translate-x-0.5 motion-safe:group-hover/channel:-translate-y-0.5"
              />
            </AppLink>
          </li>
        </ul>
      </RevealOnScroll>
    </div>
    <div class="container-page">
      <p class="border-t border-white/20 py-5 text-sm font-medium text-white/75">{{ cta.footnote }}</p>
    </div>
  </section>
</template>
