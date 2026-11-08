<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useCountUp } from '@/composables/useCountUp'
import { useScrollReveal } from '@/composables/useScrollReveal'
import type { Stat } from '@/types/content'

const props = defineProps<{ stat: Stat }>()

const root = useTemplateRef<HTMLElement>('root')
const { isVisible } = useScrollReveal(root, { threshold: 0.5 })
const current = useCountUp(() => props.stat.value, isVisible)

const format = (n: number) => n.toFixed(props.stat.decimals ?? 0)
const suffix = computed(() => props.stat.suffix ?? '')
const finalText = computed(() => `${format(props.stat.value)}${suffix.value}`)
</script>

<template>
  <div ref="root" class="card flex flex-col gap-3 p-6 md:p-8">
    <dt class="order-2 text-ink/70">{{ stat.label }}</dt>
    <dd class="order-1 font-display text-5xl leading-none font-bold tracking-tight text-brand-600 tabular-nums md:text-7xl">
      <span class="sr-only">{{ finalText }}</span>
      <!-- The invisible copy reserves the final width so counting never shifts layout. -->
      <span aria-hidden="true" class="inline-grid">
        <span class="invisible col-start-1 row-start-1">{{ finalText }}</span>
        <span class="col-start-1 row-start-1">{{ format(current) }}{{ suffix }}</span>
      </span>
    </dd>
  </div>
</template>
