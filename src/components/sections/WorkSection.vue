<script setup lang="ts">
import { storeToRefs } from 'pinia'
import WorkCard from '@/components/blocks/WorkCard.vue'
import AppLink from '@/components/ui/AppLink.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useSiteStore } from '@/stores/site'
import type { SectionCopy, Work } from '@/types/content'
import { pad } from '@/utils/format'

defineProps<{ copy: SectionCopy; works: Work[] }>()

const { ui } = storeToRefs(useSiteStore())
</script>

<template>
  <section :id="copy.id" :aria-labelledby="`${copy.id}-title`" class="section-y bg-paper">
    <div class="container-page">
      <SectionHeading :copy="copy" />

      <RevealOnScroll v-if="works.length > 1" as="nav" :delay="200" :aria-label="ui.storyNav" class="mt-10">
        <ul class="flex flex-wrap gap-2">
          <li v-for="(work, i) in works" :key="work.id">
            <AppLink
              :href="`#story-${work.id}`"
              class="group/jump inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white py-2 pr-4 pl-2 text-sm font-semibold text-ink shadow-soft transition-[border-color,box-shadow,translate] duration-300 ease-smooth hover:border-brand-600/40 hover:shadow-lift motion-safe:hover:-translate-y-0.5"
            >
              <span
                class="grid size-7 place-items-center rounded-full bg-brand-100 font-display text-xs font-bold text-brand-700 transition-colors duration-300 group-hover/jump:bg-brand-600 group-hover/jump:text-white"
              >
                {{ pad(i + 1) }}
              </span>
              {{ work.title }}
              <span class="font-medium text-ink/60">· {{ work.category }}</span>
            </AppLink>
          </li>
        </ul>
      </RevealOnScroll>

      <ul class="mt-12 space-y-6 lg:space-y-8">
        <RevealOnScroll v-for="(work, i) in works" :key="work.title" as="li">
          <WorkCard
            :work="work"
            :index="i"
            :reverse="i % 2 === 1"
            :visit-label="ui.visitSite"
            :new-tab-label="ui.newTab"
          />
        </RevealOnScroll>
      </ul>
    </div>
  </section>
</template>
