<script setup lang="ts">
import { storeToRefs } from 'pinia'
import StatBlock from '@/components/blocks/StatBlock.vue'
import AppLink from '@/components/ui/AppLink.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useHomeStore } from '@/stores/home'
import { useSiteStore } from '@/stores/site'

const { statsSection, stats, clients } = storeToRefs(useHomeStore())
const { ui } = storeToRefs(useSiteStore())
</script>

<template>
  <section :id="statsSection.id" :aria-labelledby="`${statsSection.id}-title`" class="section-y bg-white">
    <div class="container-page">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-4">
          <SectionHeading :copy="statsSection" layout="stack" />
        </div>
        <dl
          :aria-label="ui.statsLabel"
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8 lg:gap-5"
        >
          <StatBlock v-for="stat in stats" :key="stat.label" :stat="stat" />
        </dl>
      </div>

      <RevealOnScroll class="mt-14 flex flex-col gap-4 border-t border-ink/10 pt-8 md:flex-row md:items-baseline md:gap-8">
        <p class="shrink-0 text-sm font-bold tracking-eyebrow text-ink/60 uppercase">{{ ui.clientsLabel }}</p>
        <ul class="flex flex-wrap gap-x-8">
          <li v-for="client in clients" :key="client.name">
            <AppLink
              :href="client.href"
              class="inline-flex min-h-11 items-center font-display text-lg font-bold tracking-tight text-ink/70 transition-colors duration-300 hover:text-brand-600"
            >
              {{ client.name }}
            </AppLink>
          </li>
        </ul>
      </RevealOnScroll>
    </div>
  </section>
</template>
