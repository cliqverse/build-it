<script setup lang="ts">
import IconBadge from '@/components/ui/IconBadge.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import type { Assurance } from '@/types/content'

withDefaults(defineProps<{ assurance: Assurance; tone?: 'white' | 'paper' }>(), { tone: 'paper' })
</script>

<template>
  <section
    :id="assurance.section.id"
    :aria-labelledby="`${assurance.section.id}-title`"
    class="section-y"
    :class="tone === 'paper' ? 'bg-paper' : 'bg-white'"
  >
    <div class="container-page">
      <SectionHeading :copy="assurance.section" />

      <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        <RevealOnScroll v-for="(item, i) in assurance.items" :key="item.title" as="li" :delay="(i % 3) * 80">
          <div class="group/card card flex h-full flex-col gap-5 p-7 sm:flex-row lg:p-8">
            <IconBadge :icon="item.icon" tone="ink" />
            <div>
              <h3 class="font-display text-xl font-bold tracking-tight text-ink">{{ item.title }}</h3>
              <p class="mt-2 text-ink/70">{{ item.body }}</p>
            </div>
          </div>
        </RevealOnScroll>
      </ul>
    </div>
  </section>
</template>
