<script setup lang="ts">
import { storeToRefs } from 'pinia'
import TestimonialCard from '@/components/blocks/TestimonialCard.vue'
import RevealOnScroll from '@/components/ui/RevealOnScroll.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useHomeStore } from '@/stores/home'
import { useSiteStore } from '@/stores/site'

const { testimonialsSection } = storeToRefs(useHomeStore())
const { testimonials } = storeToRefs(useSiteStore())
</script>

<template>
  <section
    :id="testimonialsSection.id"
    :aria-labelledby="`${testimonialsSection.id}-title`"
    class="surface-dark section-y bg-ink text-white"
  >
    <div class="container-page">
      <SectionHeading :copy="testimonialsSection" tone="dark" layout="stack" />
      <ul class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        <RevealOnScroll
          v-for="(testimonial, i) in testimonials"
          :key="testimonial.name"
          as="li"
          :delay="i * 100"
          class="md:odd:last:col-span-2 lg:odd:last:col-span-1"
        >
          <TestimonialCard :testimonial="testimonial" />
        </RevealOnScroll>
      </ul>
    </div>
  </section>
</template>
