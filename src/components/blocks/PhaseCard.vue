<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import type { Phase } from '@/types/content'

defineProps<{ phase: Phase }>()
</script>

<template>
  <article class="group/card card flex h-full flex-col p-7 lg:p-8">
    <div class="flex items-center justify-between gap-4">
      <IconBadge :icon="phase.icon" tone="ink" />
      <span class="rounded-full bg-maroon-100 px-3 py-1 text-xs font-bold tracking-eyebrow text-maroon-700 uppercase">
        {{ phase.badge }}
      </span>
    </div>

    <h3 class="mt-8 font-display text-2xl font-bold tracking-tight text-ink">{{ phase.title }}</h3>
    <p class="mt-3 text-ink/70">{{ phase.body }}</p>

    <ul class="mt-6 space-y-3 border-t border-ink/10 pt-6">
      <li v-for="point in phase.points" :key="point" class="flex gap-3 font-medium text-ink">
        <AppIcon name="check" :size="20" :stroke-width="2.25" class="shrink-0 text-brand-600" />
        {{ point }}
      </li>
    </ul>
  </article>
</template>
