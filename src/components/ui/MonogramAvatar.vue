<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ name: string; tone?: 'dark' | 'tint' | 'maroon' }>(), { tone: 'tint' })

const HONORIFICS = new Set(['dr', 'prof', 'mr', 'mrs', 'ms', 'mx'])

const initials = computed(() => {
  const words = props.name
    .split(/\s+/)
    .filter((word) => word && !HONORIFICS.has(word.replace(/\.$/, '').toLowerCase()))
  const first = words.at(0)?.charAt(0) ?? ''
  const last = words.length > 1 ? (words.at(-1)?.charAt(0) ?? '') : ''
  return `${first}${last}`.toUpperCase()
})

const tones = { dark: 'bg-ink text-white', tint: 'bg-brand-100 text-brand-700', maroon: 'bg-maroon-700 text-white' }
</script>

<template>
  <span
    aria-hidden="true"
    class="grid size-9 shrink-0 place-items-center rounded-full text-xs font-bold"
    :class="tones[tone]"
  >
    {{ initials }}
  </span>
</template>
