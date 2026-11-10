<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '@/components/layout/PageHero.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppLink from '@/components/ui/AppLink.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { usePagesStore } from '@/stores/pages'
import { CONTACT_EMAIL, useSiteStore, whatsappLink } from '@/stores/site'
import type { ContactOption } from '@/types/content'
import { pad } from '@/utils/format'

const { contact } = storeToRefs(usePagesStore())
const { projectTypes, ui } = storeToRefs(useSiteStore())
const route = useRoute()

const picked = computed(() => projectTypes.value.find((type) => type.id === route.query.need))

const hrefFor = (option: ContactOption) => {
  if (!picked.value) return option.link.href
  if (option.project) {
    const subject = `${contact.value.projectSubject}: ${picked.value.label}`
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
  }
  if (option.whatsapp) return whatsappLink(`${contact.value.whatsappMessage} ${picked.value.label}.`)
  return option.link.href
}

usePageMeta(() => contact.value.meta)
</script>

<template>
  <PageHero :copy="contact.hero" />

  <section class="section-y bg-paper">
    <div class="container-page grid gap-10 lg:grid-cols-12">
      <div class="lg:col-span-7">
        <h2 id="contact-options" class="font-display text-3xl font-bold tracking-tight text-ink">
          {{ contact.optionsTitle }}
        </h2>
        <p v-if="picked" class="mt-4 inline-flex flex-wrap items-center gap-2 text-ink/70">
          {{ contact.pickedLabel }}
          <span
            class="inline-flex items-center gap-2 rounded-full bg-maroon-700 px-3 py-1 font-bold text-white shadow-maroon motion-safe:animate-pop"
          >
            <AppIcon :name="picked.icon" :size="16" />
            {{ picked.label }}
          </span>
        </p>
        <ul class="mt-6 grid gap-5" aria-labelledby="contact-options">
          <RevealOnScroll
            v-for="(option, i) in contact.options"
            :key="option.title"
            as="li"
            :delay="i * 100"
          >
            <div class="group/card card flex flex-col gap-5 p-7 sm:flex-row lg:p-8">
              <IconBadge :icon="option.icon" :tone="option.project ? 'maroon' : 'brand'" />
              <div class="min-w-0">
                <h3 class="font-display text-2xl font-bold tracking-tight text-ink">{{ option.title }}</h3>
                <p class="mt-1 text-ink/70">{{ option.body }}</p>
                <AppLink
                  :href="hrefFor(option)"
                  class="group/link mt-1.5 -mb-2.5 inline-flex items-center gap-2 py-2.5 font-bold text-ink underline decoration-brand-600/40 decoration-2 underline-offset-4 transition-colors duration-300 [overflow-wrap:anywhere] hover:decoration-brand-600"
                >
                  <span>{{ option.link.label }}<span v-if="option.whatsapp" class="sr-only"> {{ ui.newTab }}</span></span>
                  <AppIcon
                    name="arrow-right"
                    :size="18"
                    :stroke-width="2.25"
                    class="shrink-0 text-brand-600 transition-transform duration-300 ease-smooth group-hover/link:translate-x-1 motion-reduce:transition-none"
                  />
                </AppLink>
              </div>
            </div>
          </RevealOnScroll>
        </ul>
      </div>

      <RevealOnScroll :delay="150" class="lg:col-span-5">
        <div class="surface-dark h-full rounded-2xl bg-ink p-7 text-white shadow-lift lg:p-9">
          <h2 class="font-display text-3xl font-bold tracking-tight">{{ contact.stepsTitle }}</h2>
          <ol class="mt-8 space-y-7">
            <li v-for="(step, i) in contact.steps" :key="step.title" class="group/step flex gap-4">
              <span
                aria-hidden="true"
                class="grid size-9 shrink-0 place-items-center rounded-full bg-maroon-700 font-display text-sm font-bold text-white transition-transform duration-500 ease-smooth motion-safe:group-hover/step:scale-110"
              >
                {{ pad(i + 1) }}
              </span>
              <div>
                <h3 class="text-lg font-bold">{{ step.title }}</h3>
                <p class="mt-1 text-white/70">{{ step.body }}</p>
              </div>
            </li>
          </ol>

          <div class="mt-8 border-t border-white/15 pt-6">
            <h3 class="text-sm font-bold tracking-eyebrow text-maroon-200 uppercase">{{ contact.assurancesTitle }}</h3>
            <ul class="mt-4 space-y-3">
              <li v-for="item in contact.assurances" :key="item" class="flex gap-3 text-white/85">
                <AppIcon name="check" :size="20" :stroke-width="2.25" class="shrink-0 text-maroon-200" />
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
</template>
