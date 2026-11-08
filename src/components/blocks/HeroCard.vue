<script setup lang="ts">
import IconBadge from '@/components/ui/IconBadge.vue'
import type { HeroCard } from '@/types/content'

defineProps<{ card: HeroCard }>()
</script>

<template>
  <div
    class="group/card w-52 rounded-2xl border border-ink/[0.07] bg-white p-4 shadow-lift transition-[translate,box-shadow] duration-500 ease-smooth motion-safe:hover:-translate-y-1"
  >
    <div class="flex items-start gap-3">
      <IconBadge :icon="card.icon" :tone="card.tone" size="sm" />
      <div class="min-w-0">
        <p class="text-xs text-ink/60">{{ card.label }}</p>
        <p
          class="mt-0.5 font-display text-lg leading-tight font-bold"
          :class="card.tone === 'maroon' ? 'text-maroon-700' : 'text-ink'"
        >
          {{ card.value }}
        </p>
        <p v-if="card.note" class="mt-1 text-xs text-ink/60">{{ card.note }}</p>
      </div>
    </div>
    <div v-if="card.bars" class="mt-3 flex h-10 items-end gap-1.5">
      <span
        v-for="(height, i) in card.bars"
        :key="i"
        class="flex-1 rounded-full"
        :class="i === card.bars.length - 1 ? 'bg-brand-600' : 'bg-brand-200'"
        :style="{ height: `${height}%` }"
      />
    </div>
  </div>
</template>
