<script setup lang="ts">
import { storeToRefs } from 'pinia'
import HeroCard from '@/components/blocks/HeroCard.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppLink from '@/components/ui/AppLink.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import { useHomeStore } from '@/stores/home'
import { useSiteStore } from '@/stores/site'

const { hero, heroCards } = storeToRefs(useHomeStore())
const { projectTypes } = storeToRefs(useSiteStore())

/** Card slots around the centred headline, three down each side (wide screens only). */
const slots = ['top-10 left-6', 'top-[40%] left-0', 'bottom-24 left-6', 'top-14 right-4', 'top-[38%] right-0', 'bottom-20 right-6']

const isStandout = (index: number) => index === projectTypes.value.length - 1
</script>

<template>
  <section aria-labelledby="hero-title" class="relative isolate overflow-hidden border-b border-ink/10 bg-paper">
    <div aria-hidden="true" class="grid-lines pointer-events-none absolute inset-0 -z-10" />

    <div class="container-page relative pt-16 pb-20 md:pt-24 md:pb-24">
      <div class="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <RevealOnScroll>
          <p
            class="inline-flex items-start gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-bold tracking-eyebrow text-balance text-brand-700 uppercase shadow-soft"
          >
            <span aria-hidden="true" class="mt-[0.3em] hidden size-1.5 shrink-0 rounded-full bg-brand-600 sm:block" />
            {{ hero.eyebrow }}
          </p>
        </RevealOnScroll>

        <!-- From small tablets up, lead, highlight and rest each start a new line; a long rest wraps evenly. -->
        <RevealOnScroll
          id="hero-title"
          as="h1"
          :delay="80"
          class="isolate mt-7 text-hero font-bold text-ink"
        >
          <span class="text-brand-600">{{ hero.title.lead }}</span> <br class="hidden sm:block" /><span
            class="marker whitespace-nowrap"
            >{{ hero.title.highlight }}</span
          >{{ ' ' }}<br class="hidden sm:block" /><span class="inline-block text-balance">{{ hero.title.rest }}</span>
        </RevealOnScroll>

        <RevealOnScroll :delay="160" class="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <BaseButton as="a" :href="hero.secondary.href" variant="outline" size="lg">{{ hero.secondary.label }}</BaseButton>
          <BaseButton as="a" :href="hero.primary.href" size="lg" icon="arrow-right">{{ hero.primary.label }}</BaseButton>
        </RevealOnScroll>

        <RevealOnScroll :delay="240" class="mt-10 w-full max-w-2xl">
          <h2 class="text-sm font-bold tracking-eyebrow text-ink/70 uppercase">{{ hero.pickerTitle }}</h2>
          <ul class="mt-4 flex flex-wrap justify-center gap-2">
            <li v-for="(type, i) in projectTypes" :key="type.id">
              <AppLink
                :href="`/contact?need=${type.id}`"
                class="group/chip inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold shadow-soft transition-[background-color,color,border-color,box-shadow,translate,scale] duration-300 ease-smooth motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97]"
                :class="
                  isStandout(i)
                    ? 'border-maroon-700 bg-maroon-700 text-white hover:bg-maroon-800 hover:shadow-maroon'
                    : 'border-ink/10 bg-white text-ink hover:border-brand-600 hover:bg-brand-600 hover:text-white hover:shadow-brand'
                "
              >
                <AppIcon
                  :name="type.icon"
                  :size="16"
                  class="transition-transform duration-500 ease-smooth motion-safe:group-hover/chip:scale-115 motion-safe:group-hover/chip:-rotate-12"
                />
                {{ type.label }}
              </AppLink>
            </li>
          </ul>
        </RevealOnScroll>

      </div>

      <!-- Illustrative cards; each figure is also stated elsewhere on the site. -->
      <ul aria-hidden="true" class="hidden xl:block">
        <RevealOnScroll
          v-for="(card, i) in heroCards"
          :key="card.label"
          as="li"
          :delay="200 + i * 80"
          class="absolute"
          :class="slots[i]"
        >
          <div class="motion-safe:animate-float" :style="{ animationDelay: `${i * -1.3}s` }">
            <HeroCard :card="card" />
          </div>
        </RevealOnScroll>
      </ul>
    </div>
  </section>
</template>
