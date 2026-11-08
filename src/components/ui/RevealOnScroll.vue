<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

withDefaults(defineProps<{ delay?: number; as?: string }>(), { delay: 0, as: 'div' })

const el = useTemplateRef<HTMLElement>('el')
const { isVisible } = useScrollReveal(el)
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="transition-[opacity,translate] duration-900 ease-smooth motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
    :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
    :data-reveal="isVisible ? 'in' : 'out'"
    :style="delay ? { transitionDelay: `${delay}ms` } : undefined"
  >
    <slot />
  </component>
</template>
