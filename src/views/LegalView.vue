<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import PageHero from '@/components/layout/PageHero.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { usePagesStore } from '@/stores/pages'
import type { LegalDocId, PageHeroCopy } from '@/types/content'

const props = defineProps<{ doc: LegalDocId }>()

const { legal, legalLabels } = storeToRefs(usePagesStore())

const page = computed(() => legal.value[props.doc])
const hero = computed<PageHeroCopy>(() => ({
  eyebrow: legalLabels.value.eyebrow,
  title: page.value.title,
  intro: page.value.intro,
}))

usePageMeta(() => page.value.meta)
</script>

<template>
  <PageHero :copy="hero" />

  <article class="section-y bg-white">
    <div class="container-page">
      <div class="mx-auto max-w-3xl">
        <p class="text-sm text-muted">{{ legalLabels.updated }}: {{ page.updated }}</p>
        <section v-for="section in page.sections" :key="section.heading" class="mt-10">
          <h2 class="font-display text-2xl font-bold tracking-tight text-ink">{{ section.heading }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph" class="mt-4 text-pretty text-ink/80">
            {{ paragraph }}
          </p>
        </section>
      </div>
    </div>
  </article>
</template>
