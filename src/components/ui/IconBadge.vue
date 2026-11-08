<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import type { IconName } from '@/types/content'

type Tone = 'brand' | 'maroon' | 'ink' | 'inverse'

withDefaults(defineProps<{ icon: IconName; tone?: Tone; size?: 'sm' | 'md' }>(), { tone: 'brand', size: 'md' })

const tones: Record<Tone, string> = {
  brand: 'bg-brand-100 text-brand-700',
  maroon: 'bg-maroon-700 text-white',
  ink: 'bg-ink text-maroon-200',
  inverse: 'bg-white/15 text-white',
}
</script>

<template>
  <span
    aria-hidden="true"
    class="grid shrink-0 place-items-center rounded-xl transition-transform duration-500 ease-smooth motion-safe:group-hover/card:scale-110 motion-safe:group-hover/card:-rotate-6"
    :class="[tones[tone], size === 'sm' ? 'size-9' : 'size-12']"
  >
    <AppIcon :name="icon" :size="size === 'sm' ? 18 : 24" />
  </span>
</template>
