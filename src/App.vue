<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { nextTick, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import { focusHash } from '@/router/anchors'
import { useSiteStore } from '@/stores/site'

const { ui } = storeToRefs(useSiteStore())
const main = useTemplateRef<HTMLElement>('main')
const route = useRoute()

/*
 * After client-side navigation, move focus to the new page (or to the linked
 * section) so keyboard and screen-reader users start from the top of the new
 * content instead of staying on the link they activated.
 */
watch(
  () => route.fullPath,
  async () => {
    await nextTick()
    if (route.hash) focusHash(route.hash)
    else main.value?.focus({ preventScroll: true })
  },
)
</script>

<template>
  <a
    href="#main"
    class="sr-only rounded-lg bg-brand-600 px-4 py-2 font-display text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
    @click.prevent="main?.focus()"
  >
    {{ ui.skipLink }}
  </a>

  <SiteHeader />

  <main id="main" ref="main" tabindex="-1">
    <RouterView v-slot="{ Component, route: current }">
      <div :key="current.path" class="motion-safe:animate-page-in">
        <component :is="Component" />
      </div>
    </RouterView>
  </main>

  <SiteFooter />
</template>
