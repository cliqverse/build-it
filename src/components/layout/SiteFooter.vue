<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AppLink from '@/components/ui/AppLink.vue'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import { useSiteStore } from '@/stores/site'

const { brand, footer, ui, year } = storeToRefs(useSiteStore())

/** Splits before "@" so an email address wraps there, not mid-word, in a narrow column. */
const wrapPoints = (label: string) => label.split(/(?=@)/)
const isExternal = (href: string) => /^https?:\/\//.test(href)
</script>

<template>
  <footer class="surface-dark bg-ink text-white">
    <div class="container-page pt-16 pb-8 md:pt-24">
      <p aria-hidden="true" class="max-w-4xl text-balance font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] font-bold tracking-[-0.04em]">
        {{ footer.statement.lead }}
        <span class="whitespace-nowrap text-maroon-300">{{ footer.statement.highlight }}</span>
        <span class="inline-block text-balance">{{ footer.statement.rest }}</span>
      </p>

      <div class="mt-16 grid gap-12 border-t border-white/15 pt-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <AppLink href="/" class="-m-2 inline-flex rounded-lg p-2">
            <BrandLogo :name="brand.name" tone="light" />
          </AppLink>
          <p class="mt-4 max-w-xs text-sm text-white/60">{{ brand.tagline }}</p>
        </div>

        <nav :aria-label="ui.footerNav" class="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-10 md:grid-cols-4 lg:col-span-8">
          <div v-for="column in footer.columns" :key="column.title">
            <h2 class="text-xs font-bold tracking-eyebrow text-maroon-200 uppercase">{{ column.title }}</h2>
            <ul class="mt-4 space-y-3 pointer-coarse:mt-1 pointer-coarse:space-y-0">
              <li v-for="link in column.links" :key="link.label">
                <AppLink
                  :href="link.href"
                  class="link-sweep text-sm text-white/75 transition-colors duration-300 [overflow-wrap:anywhere] hover:text-white pointer-coarse:block pointer-coarse:py-[0.6875rem]"
                >
                  <template v-for="(part, i) in wrapPoints(link.label)" :key="i"><wbr v-if="i" />{{ part }}</template>
                  <span v-if="isExternal(link.href)" class="sr-only"> {{ ui.newTab }}</span>
                </AppLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="mt-16 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:justify-between">
        <p>© {{ year }} {{ brand.name }}. {{ footer.legal }}</p>
        <p>{{ footer.credit }}</p>
      </div>
    </div>
  </footer>
</template>
