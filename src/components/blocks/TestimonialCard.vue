<script setup lang="ts">
import MonogramAvatar from '@/components/ui/MonogramAvatar.vue'
import type { Testimonial } from '@/types/content'

defineProps<{ testimonial: Testimonial }>()
</script>

<template>
  <figure
    class="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 transition-[translate,background-color,border-color] duration-500 ease-smooth hover:border-white/20 hover:bg-white/[0.07] motion-safe:hover:-translate-y-1 lg:p-10"
  >
    <span aria-hidden="true" class="block h-8 font-display text-8xl leading-none font-bold text-maroon-400">“</span>
    <blockquote class="mt-6 text-lg leading-relaxed text-pretty text-white md:text-xl md:leading-relaxed">
      <p>{{ testimonial.quote }}</p>
    </blockquote>
    <figcaption class="mt-auto flex items-center gap-3 pt-10">
      <MonogramAvatar :name="testimonial.name" tone="maroon" />
      <span class="flex flex-col">
        <span class="font-bold text-white">{{ testimonial.name }}</span>
        <span class="text-sm text-white/60">{{ testimonial.role }}, {{ testimonial.company }}</span>
      </span>
    </figcaption>
  </figure>
</template>
