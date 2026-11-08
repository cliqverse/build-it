<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AppIcon from '@/components/ui/AppIcon.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import { usePlatformStore } from '@/stores/platform'

const { speed } = storeToRefs(usePlatformStore())
</script>

<template>
  <section aria-labelledby="speed-strip-title" class="surface-dark bg-ink text-white">
    <div class="container-page grid gap-8 py-12 md:py-16 lg:grid-cols-12 lg:items-center">
      <RevealOnScroll id="speed-strip-title" as="h2" class="font-display text-3xl font-bold tracking-tight md:text-4xl lg:col-span-5">
        <span class="text-maroon-300">{{ speed.claim }}</span>
      </RevealOnScroll>
      <ul class="grid gap-4 sm:grid-cols-3 lg:col-span-7">
        <RevealOnScroll v-for="(point, i) in speed.points" :key="point" as="li" :delay="i * 80" class="group/point flex items-start gap-3 font-bold">
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
