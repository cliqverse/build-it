<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import AppLink from '@/components/ui/AppLink.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import type { Link, Offering, SectionCopy } from '@/types/content'

withDefaults(
  defineProps<{
    copy: SectionCopy
    offerings: Offering[]
    cta: { title: string; body: string; link: Link }
    /** Optional wide card under the grid, for visitors who want advice before choosing. */
    advice?: Offering & { link: Link }
    tone?: 'white' | 'paper'
  }>(),
  { tone: 'paper' },
)
</script>

<template>
  <section
    :id="copy.id"
    :aria-labelledby="`${copy.id}-title`"
    class="section-y"
    :class="tone === 'paper' ? 'bg-paper' : 'bg-white'"
  >
    <div class="container-page">
      <SectionHeading :copy="copy" />

      <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        <RevealOnScroll v-for="(offering, i) in offerings" :key="offering.title" as="li" :delay="(i % 3) * 80">
          <div class="group/card card flex h-full flex-col p-7 lg:p-8">
            <IconBadge :icon="offering.icon" />
            <h3 class="mt-6 font-display text-xl font-bold tracking-tight text-ink">{{ offering.title }}</h3>
            <p class="mt-2 text-ink/70">{{ offering.body }}</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll as="li" :delay="160">
          <div
            class="group/card surface-maroon flex h-full flex-col rounded-2xl bg-maroon-700 p-7 text-white shadow-soft transition-[translate,box-shadow] duration-500 ease-smooth hover:shadow-maroon motion-safe:hover:-translate-y-1 lg:p-8"
          >
            <IconBadge icon="sparkle" tone="inverse" />
            <h3 class="mt-6 font-display text-xl font-bold tracking-tight">{{ cta.title }}</h3>
            <p class="mt-2 text-white/80">{{ cta.body }}</p>
            <AppLink
              :href="cta.link.href"
              class="group/link mt-3.5 -mb-2.5 inline-flex items-center gap-2 self-start py-2.5 font-bold text-white underline decoration-white/40 decoration-2 underline-offset-4 transition-colors duration-300 hover:decoration-white"
            >
              {{ cta.link.label }}
              <AppIcon
                name="arrow-right"
                :size="18"
                :stroke-width="2.25"
                class="transition-transform duration-300 ease-smooth group-hover/link:translate-x-1 motion-reduce:transition-none"
              />
            </AppLink>
          </div>
        </RevealOnScroll>
      </ul>

      <RevealOnScroll v-if="advice" class="mt-4 lg:mt-5">
        <div class="group/card card flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:gap-6 lg:p-8">
          <IconBadge :icon="advice.icon" tone="ink" />
          <div class="flex-1">
            <h3 class="font-display text-xl font-bold tracking-tight text-ink">{{ advice.title }}</h3>
            <p class="mt-2 max-w-2xl text-ink/70">{{ advice.body }}</p>
          </div>
          <BaseButton as="a" :href="advice.link.href" variant="dark" icon="arrow-right" class="self-start sm:self-center">
            {{ advice.link.label }}
          </BaseButton>
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>
