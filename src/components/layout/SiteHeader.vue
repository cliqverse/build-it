<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavDropdown from '@/components/layout/NavDropdown.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppLink from '@/components/ui/AppLink.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import { useScrolled } from '@/composables/useScrolled'
import { useSiteStore } from '@/stores/site'

const { brand, nav, ui } = storeToRefs(useSiteStore())

const route = useRoute()
const scrolled = useScrolled()
const menuOpen = ref(false)
const toggle = useTemplateRef<HTMLButtonElement>('toggle')

/** True on a section's own page and on its children, e.g. /products and /products/build. */
const inSection = (href: string) => route.path === href || route.path.startsWith(`${href}/`)

const closeMenu = () => {
  menuOpen.value = false
}

watch(menuOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

watch(() => route.fullPath, closeMenu)

const onKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Escape' || !menuOpen.value) return
  closeMenu()
  toggle.value?.focus()
}

const desktop = window.matchMedia('(min-width: 64rem)')
const onBreakpoint = (event: MediaQueryListEvent) => {
  if (event.matches) closeMenu()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  desktop.addEventListener('change', onBreakpoint)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  desktop.removeEventListener('change', onBreakpoint)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-smooth"
    :class="
      scrolled || menuOpen
        ? 'border-ink/10 bg-white/95 shadow-[0_12px_32px_-24px_rgb(15_15_18/0.45)] backdrop-blur-md'
        : 'border-transparent bg-white'
    "
  >
    <div class="container-page flex h-18 items-center gap-8">
      <AppLink href="/" class="-m-2 rounded-lg p-2">
        <BrandLogo :name="brand.name" />
      </AppLink>

      <nav :aria-label="ui.primaryNav" class="ml-auto hidden lg:block">
        <ul class="flex items-center gap-1">
          <li v-for="item in nav.items" :key="item.href">
            <NavDropdown v-if="item.children" :item="item" :active="inSection(item.href)" />
            <AppLink
              v-else
              :href="item.href"
              class="nav-underline inline-flex min-h-11 items-center px-3.5 text-[0.9375rem] font-medium transition-colors duration-300 hover:text-ink"
              :class="inSection(item.href) ? 'text-ink' : 'text-ink/70'"
              :data-active="inSection(item.href)"
            >
              {{ item.label }}
            </AppLink>
          </li>
        </ul>
      </nav>

      <div class="ml-auto flex items-center gap-3 lg:ml-0">
        <div class="hidden lg:block">
          <BaseButton as="a" :href="nav.cta.href" variant="dark" icon="arrow-right">{{ nav.cta.label }}</BaseButton>
        </div>

        <button
          ref="toggle"
          type="button"
          class="grid size-11 place-items-center rounded-xl border border-ink/15 text-ink transition-colors duration-300 hover:border-ink/30 hover:bg-paper lg:hidden"
          :aria-label="menuOpen ? ui.closeMenu : ui.openMenu"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          @click="menuOpen = !menuOpen"
        >
          <AppIcon
            :name="menuOpen ? 'close' : 'menu'"
            :size="24"
            class="transition-transform duration-300 ease-smooth motion-reduce:transition-none"
            :class="{ 'rotate-90': menuOpen }"
          />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-smooth motion-reduce:transition-none"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-200 ease-in motion-reduce:transition-none"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-show="menuOpen"
        id="mobile-menu"
        class="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden"
      >
        <nav :aria-label="ui.primaryNav" class="container-page flex min-h-full flex-col py-4">
          <ul class="divide-y divide-line">
            <li
              v-for="(item, i) in nav.items"
              :key="item.href"
              class="py-2 motion-safe:animate-menu-in"
              :style="{ animationDelay: `${60 + i * 60}ms` }"
            >
              <AppLink
                :href="item.href"
                class="group/item flex items-center justify-between py-3 font-display text-2xl font-bold tracking-tight"
                :class="inSection(item.href) ? 'text-brand-600' : 'text-ink'"
              >
                {{ item.label }}
                <AppIcon name="arrow-right" :size="20" class="text-ink/40 transition-transform duration-300 ease-smooth group-hover/item:translate-x-1" />
              </AppLink>
              <ul v-if="item.children" class="grid gap-1 pb-2">
                <li v-for="child in item.children" :key="child.href">
                  <AppLink
                    :href="child.href"
                    class="group/card flex items-center gap-3 rounded-xl p-2 transition-colors duration-300 hover:bg-paper aria-[current=page]:bg-paper"
                  >
                    <IconBadge :icon="child.icon" size="sm" />
                    <span class="flex flex-col">
                      <span class="text-[0.9375rem] font-semibold text-ink">{{ child.label }}</span>
                      <span class="text-sm text-muted">{{ child.description }}</span>
                    </span>
                  </AppLink>
                </li>
              </ul>
            </li>
          </ul>
          <BaseButton as="a" :href="nav.cta.href" variant="dark" size="lg" icon="arrow-right" class="mt-6 w-full">
            {{ nav.cta.label }}
          </BaseButton>
        </nav>
      </div>
    </Transition>
  </header>
</template>
