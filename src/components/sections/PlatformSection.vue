<script setup lang="ts">
import { storeToRefs } from 'pinia'
import PlatformDiagram from '@/components/blocks/PlatformDiagram.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { usePlatformStore } from '@/stores/platform'
import { pad } from '@/utils/format'

const { architectureSection, layers, diagramLabel } = storeToRefs(usePlatformStore())
</script>

<template>
  <section
    :id="architectureSection.id"
    :aria-labelledby="`${architectureSection.id}-title`"
    class="surface-dark section-y bg-ink text-white"
  >
    <div class="container-page grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
      <div>
        <SectionHeading :copy="architectureSection" tone="dark" layout="stack" />
        <ul class="mt-10 divide-y divide-white/15 border-y border-white/15">
          <RevealOnScroll v-for="(layer, i) in layers" :key="layer.name" as="li" :delay="i * 100" class="flex gap-5 py-5">
            <span aria-hidden="true" class="pt-1 font-display text-sm font-bold text-maroon-200">{{ pad(i + 1) }}</span>
            <div>
              <p class="font-display text-xl font-bold">{{ layer.tag }}</p>
              <p class="mt-1 text-white/70">{{ layer.name }} · {{ layer.caption }}</p>
            </div>
          </RevealOnScroll>
        </ul>
      </div>

      <RevealOnScroll :delay="200" class="pr-3 pb-3">
        <PlatformDiagram :layers="layers" :label="diagramLabel" />
      </RevealOnScroll>
    </div>
  </section>
</template>
