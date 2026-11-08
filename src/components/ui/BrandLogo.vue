<script setup lang="ts">
withDefaults(defineProps<{ name: string; tone?: 'dark' | 'light' }>(), { tone: 'dark' })
</script>

<template>
  <span class="group/logo inline-flex items-center gap-2">
    <svg viewBox="0 0 32 32" class="size-7" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="6" class="fill-brand-600" />
      <rect x="7" y="17" width="8" height="8" rx="1.75" class="fill-white" />
      <rect x="17" y="17" width="8" height="8" rx="1.75" class="fill-white" />
      <rect
        x="12"
        y="7"
        width="8"
        height="8"
        rx="1.75"
        class="origin-center fill-white transition-transform duration-500 ease-smooth [transform-box:fill-box] motion-safe:group-hover/logo:-translate-y-[3px] motion-safe:group-hover/logo:-rotate-12"
      />
    </svg>
    <span
      class="font-display text-[1.375rem] leading-none font-bold tracking-tight"
      :class="tone === 'light' ? 'text-white' : 'text-ink'"
    >
      {{ name }}
    </span>
  </span>
</template>
