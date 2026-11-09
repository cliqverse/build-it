<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const props = withDefaults(defineProps<{ delay?: number; as?: string }>(), { delay: 0, as: 'div' })

/* A short stagger reads as polish; anything longer leaves content trailing the scroll. */
const MAX_DELAY = 150
const delay = computed(() => Math.min(props.delay, MAX_DELAY))

const el = useTemplateRef<HTMLElement>('el')
const { isVisible, instant } = useScrollReveal(el)
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
    :class="[
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
      { '[transition:opacity_350ms_ease-out,translate_500ms_var(--ease-smooth)]': !instant },
    ]"
    :data-reveal="isVisible ? 'in' : 'out'"
    :data-instant="instant || undefined"
    :style="delay && !instant ? { transitionDelay: `${delay}ms` } : undefined"
  >
    <slot />
  </component>
</template>
