<script setup lang="ts">
import PhaseCard from '@/components/blocks/PhaseCard.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import type { Phase, SectionCopy } from '@/types/content'

defineProps<{ copy: SectionCopy; phases: Phase[] }>()
</script>

<template>
  <section :id="copy.id" :aria-labelledby="`${copy.id}-title`" class="section-y bg-paper">
    <div class="container-page">
      <SectionHeading :copy="copy" />
      <ol class="mt-12 grid gap-6 lg:grid-cols-3">
        <RevealOnScroll v-for="(phase, i) in phases" :key="phase.title" as="li" :delay="i * 100">
          <PhaseCard :phase="phase" />
        </RevealOnScroll>
      </ol>
    </div>
  </section>
</template>
