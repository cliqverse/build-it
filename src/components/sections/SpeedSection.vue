<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import type { Speed } from '@/types/content'
import { pad } from '@/utils/format'

/** "brand" is the full violet block used on the home page; "light" sits on white elsewhere. */
const props = withDefaults(defineProps<{ speed: Speed; tone?: 'brand' | 'light' }>(), { tone: 'brand' })

const onBrand = computed(() => props.tone === 'brand')
</script>

<template>
  <section
    :id="speed.section.id"
    :aria-labelledby="`${speed.section.id}-title`"
    class="section-y"
    :class="onBrand ? 'surface-brand bg-brand-600 text-white' : 'border-b border-ink/10 bg-white text-ink'"
  >
    <div class="container-page">
      <SectionHeading :copy="speed.section" :tone="onBrand ? 'brand' : 'light'" />

      <RevealOnScroll
        as="p"
        :delay="120"
        class="mt-12 font-display text-3xl font-bold tracking-tight md:text-5xl"
        :class="onBrand ? 'text-maroon-200' : 'text-brand-600'"
      >
        {{ speed.claim }}
      </RevealOnScroll>

      <ol class="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <RevealOnScroll
          v-for="(step, i) in speed.steps"
          :key="step.title"
          as="li"
          :delay="i * 100"
          class="relative pt-7"
        >
          <span
            aria-hidden="true"
            class="draw-in absolute inset-x-0 top-0 h-1 rounded-full"
            :class="onBrand ? 'bg-maroon-200' : 'bg-ink'"
          />
          <div class="flex items-center justify-between gap-3">
            <span
              class="rounded-full bg-maroon-700 px-3 py-1 text-xs font-bold tracking-eyebrow text-white uppercase"
            >
              {{ step.marker }}
            </span>
            <span aria-hidden="true" class="font-display text-sm font-bold" :class="onBrand ? 'text-white/60' : 'text-ink/60'">
              {{ pad(i + 1) }}
            </span>
          </div>
          <h3 class="mt-5 font-display text-2xl font-bold tracking-tight">{{ step.title }}</h3>
          <p class="mt-2" :class="onBrand ? 'text-white/80' : 'text-ink/70'">{{ step.body }}</p>
        </RevealOnScroll>
      </ol>

      <ul
        class="mt-14 grid gap-4 border-t pt-8 md:grid-cols-3"
        :class="onBrand ? 'border-white/20' : 'border-ink/10'"
      >
        <RevealOnScroll v-for="(point, i) in speed.points" :key="point" as="li" :delay="i * 80" class="group/point flex items-center gap-3 text-lg font-bold">
          <span
            aria-hidden="true"
            class="grid size-9 shrink-0 place-items-center rounded-xl bg-maroon-700 text-white transition-transform duration-500 ease-smooth motion-safe:group-hover/point:scale-110 motion-safe:group-hover/point:-rotate-12"
          >
            <AppIcon name="bolt" :size="18" :stroke-width="2.25" />
          </span>
          {{ point }}
        </RevealOnScroll>
      </ul>
    </div>
  </section>
</template>
