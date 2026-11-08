<script setup lang="ts">
import { computed } from 'vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import type { SectionCopy } from '@/types/content'

/**
 * Left-aligned editorial heading. "split" puts the intro in a right-hand column on
 * large screens; "stack" keeps everything in one column.
 */
const props = withDefaults(
  defineProps<{ copy: SectionCopy; tone?: 'light' | 'dark' | 'brand'; layout?: 'split' | 'stack' }>(),
  { tone: 'light', layout: 'split' },
)

const onDark = computed(() => props.tone !== 'light')
</script>

<template>
  <div :class="layout === 'split' ? 'grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10' : 'max-w-3xl'">
    <div :class="layout === 'split' ? 'lg:col-span-7' : ''">
      <RevealOnScroll
        as="p"
        class="flex items-start gap-2.5 text-sm font-bold tracking-eyebrow uppercase"
        :class="onDark ? 'text-maroon-200' : 'text-brand-600'"
      >
        <span aria-hidden="true" class="mt-[0.45em] size-2 shrink-0 rounded-full" :class="onDark ? 'bg-maroon-200' : 'bg-brand-600'" />
        {{ copy.eyebrow }}
      </RevealOnScroll>
      <RevealOnScroll
        :id="`${copy.id}-title`"
        as="h2"
        :delay="80"
        class="isolate mt-4 text-heading font-bold"
        :class="onDark ? 'text-white' : 'text-ink'"
      >
        {{ copy.title }}
        <template v-if="copy.highlight">
          {{ ' ' }}<br /><span class="marker">{{ copy.highlight }}</span>
        </template>
      </RevealOnScroll>
    </div>
    <RevealOnScroll
      v-if="copy.intro"
      as="p"
      :delay="160"
      class="text-lg text-pretty"
      :class="[
        layout === 'split' ? 'lg:col-span-5 lg:pb-1' : 'mt-5',
        tone === 'brand' ? 'text-white/80' : tone === 'dark' ? 'text-white/70' : 'text-ink/70',
      ]"
    >
      {{ copy.intro }}
    </RevealOnScroll>
  </div>
</template>
