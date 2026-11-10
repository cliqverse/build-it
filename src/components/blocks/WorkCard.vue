<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppLink from '@/components/ui/AppLink.vue'
import type { Work } from '@/types/content'
import { pad } from '@/utils/format'

const props = withDefaults(
  defineProps<{
    work: Work
    index: number
    visitLabel: string
    /** Puts the screenshots on the right on large screens, so stacked stories alternate. */
    reverse?: boolean
  }>(),
  { reverse: false },
)

const host = computed(() => new URL(props.work.url).hostname.replace(/^www\./, ''))

/** Each story gets its own backdrop so stacked rows read as distinct. */
const stages = ['bg-brand-100', 'bg-ink', 'bg-maroon-100', 'bg-brand-600']
const stage = computed(() => stages[props.index % stages.length])
</script>

<template>
  <article :id="`story-${work.id}`" class="group/card card grid overflow-hidden lg:grid-cols-12">
    <!-- Screenshots: a browser window with the phone version overlapping one corner. On hover the page scrolls slowly. -->
    <div
      class="relative px-5 pt-6 pb-10 sm:px-10 sm:pt-10 sm:pb-14 lg:col-span-7 lg:flex lg:items-center lg:py-14"
      :class="[stage, { 'lg:order-2': reverse }]"
    >
      <div class="relative mx-auto w-full max-w-2xl">
        <div
          class="overflow-hidden rounded-xl border border-ink/10 bg-white shadow-lift transition-transform duration-700 ease-smooth motion-safe:group-hover/card:-translate-y-1"
        >
          <div class="flex items-center gap-3 border-b border-ink/10 px-4 py-2.5">
            <span aria-hidden="true" class="flex gap-1.5">
              <span class="size-2.5 rounded-full bg-maroon-400" />
              <span class="size-2.5 rounded-full bg-brand-200" />
              <span class="size-2.5 rounded-full bg-ink/15" />
            </span>
            <span class="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-paper px-3 py-1 text-xs text-ink/70">
              <span aria-hidden="true" class="relative flex size-2 shrink-0">
                <span class="absolute inline-flex size-full rounded-full bg-brand-600 opacity-60 motion-safe:animate-ping" />
                <span class="relative inline-flex size-2 rounded-full bg-brand-600" />
              </span>
              <span class="truncate">{{ host }}</span>
            </span>
          </div>
          <div class="aspect-[16/10] overflow-hidden bg-paper">
            <img
              :src="work.screenshots.desktop"
              :alt="work.screenshots.alt"
              loading="lazy"
              decoding="async"
              class="size-full object-cover object-top transition-[object-position] duration-[3000ms] ease-in-out group-hover/card:object-bottom motion-reduce:transition-none"
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          class="absolute -bottom-6 hidden w-[22%] transition-transform duration-700 ease-smooth sm:block motion-safe:group-hover/card:-translate-y-3"
          :class="reverse ? '-left-4' : '-right-4'"
        >
          <div class="overflow-hidden rounded-[1.4rem] border-[5px] border-ink bg-ink shadow-lift ring-1 ring-white/20">
            <img
              :src="work.screenshots.mobile"
              alt=""
              loading="lazy"
              decoding="async"
              class="aspect-[390/844] w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col p-7 sm:p-10 lg:col-span-5 lg:p-12" :class="{ 'lg:order-1': reverse }">
      <div class="flex items-center gap-3">
        <span aria-hidden="true" class="font-display text-sm font-bold text-ink/40">{{ pad(index + 1) }}</span>
        <span class="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold tracking-eyebrow text-brand-700 uppercase">
          {{ work.category }}
        </span>
      </div>
      <h3 class="mt-5 font-display text-3xl font-bold tracking-tight text-ink lg:text-4xl">{{ work.title }}</h3>
      <p class="isolate mt-4">
        <span class="marker inline-flex items-center gap-1.5 px-2 py-1 text-sm font-bold">
          <AppIcon name="bolt" :size="16" :stroke-width="2.25" />
          {{ work.result }}
        </span>
      </p>
      <p class="mt-5 text-ink/70 lg:text-lg">{{ work.description }}</p>

      <ul class="mt-6 flex flex-wrap gap-2">
        <li v-for="item in work.delivered" :key="item" class="rounded-full bg-paper px-3 py-1 text-sm text-ink/80">
          {{ item }}
        </li>
      </ul>

      <div class="mt-auto pt-8">
        <AppLink
          :href="work.url"
          class="group/visit inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-[background-color,box-shadow,translate] duration-300 ease-smooth hover:bg-brand-600 hover:shadow-brand motion-safe:hover:-translate-y-0.5"
        >
          {{ visitLabel }}
          <!-- Long addresses can't fit a pill on the narrowest phones; screen readers still hear them. -->
          <span class="max-[25rem]:sr-only">{{ host }}</span>
          <AppIcon
            name="arrow-up-right"
            :size="16"
            :stroke-width="2.25"
            class="transition-transform duration-300 ease-smooth group-hover/visit:translate-x-0.5 group-hover/visit:-translate-y-0.5 motion-reduce:transition-none"
          />
        </AppLink>
      </div>
    </div>
  </article>
</template>
