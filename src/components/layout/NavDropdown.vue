<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useId, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppLink from '@/components/ui/AppLink.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import type { NavItem } from '@/types/content'

defineProps<{ item: NavItem; active: boolean }>()

const panelId = useId()
const root = useTemplateRef<HTMLElement>('root')
const button = useTemplateRef<HTMLButtonElement>('button')
const open = ref(false)
const route = useRoute()

/* Mouse users get hover-to-open; keyboard and touch use the button as a disclosure toggle. */
let closeTimer: number | undefined
let openedByHover = false

const onPointerEnter = (event: PointerEvent) => {
  if (event.pointerType !== 'mouse') return
  window.clearTimeout(closeTimer)
  if (!open.value) openedByHover = true
  open.value = true
}

const onPointerLeave = (event: PointerEvent) => {
  if (event.pointerType !== 'mouse') return
  closeTimer = window.setTimeout(() => {
    open.value = false
  }, 150)
}

const onToggle = () => {
  if (openedByHover && open.value) {
    openedByHover = false
    return
  }
  openedByHover = false
  open.value = !open.value
}

const close = (returnFocus = false) => {
  open.value = false
  openedByHover = false
  if (returnFocus) button.value?.focus()
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && open.value) close(true)
}

const onFocusOut = (event: FocusEvent) => {
  if (!root.value?.contains(event.relatedTarget as Node | null)) close()
}

const onDocumentPointerDown = (event: PointerEvent) => {
  if (open.value && !root.value?.contains(event.target as Node)) close()
}

watch(() => route.fullPath, () => close())

onMounted(() => document.addEventListener('pointerdown', onDocumentPointerDown))
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  window.clearTimeout(closeTimer)
})
</script>

<template>
  <div
    ref="root"
    class="relative"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @focusout="onFocusOut"
    @keydown="onKeydown"
  >
    <button
      ref="button"
      type="button"
      class="nav-underline inline-flex min-h-11 items-center gap-1 px-3.5 text-[0.9375rem] font-medium transition-colors duration-300 hover:text-ink"
      :class="active ? 'text-ink' : 'text-ink/70'"
      :data-active="active"
      :aria-expanded="open"
      :aria-controls="panelId"
      @click="onToggle"
    >
      {{ item.label }}
      <AppIcon
        name="chevron-down"
        :size="16"
        :stroke-width="2"
        class="transition-transform duration-300 ease-smooth motion-reduce:transition-none"
        :class="{ 'rotate-180': open }"
      />
    </button>

    <Transition
      enter-active-class="transition duration-300 ease-smooth motion-reduce:transition-none"
      enter-from-class="opacity-0 translate-y-2 scale-[0.98]"
      leave-active-class="transition duration-150 ease-in motion-reduce:transition-none"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div v-show="open" :id="panelId" class="absolute top-full left-0 z-10 w-[22rem] origin-top-left pt-3">
        <div class="rounded-2xl border border-ink/[0.07] bg-white p-2 shadow-lift">
          <ul>
            <li v-for="child in item.children" :key="child.href">
              <AppLink
                :href="child.href"
                class="group/card flex items-start gap-3 rounded-xl p-3 transition-colors duration-300 hover:bg-paper aria-[current=page]:bg-paper"
              >
                <IconBadge :icon="child.icon" size="sm" />
                <span class="flex flex-col">
                  <span class="text-[0.9375rem] font-semibold text-ink">{{ child.label }}</span>
                  <span class="text-sm text-muted">{{ child.description }}</span>
                </span>
              </AppLink>
            </li>
          </ul>
          <AppLink
            v-if="item.overview"
            :href="item.href"
            class="group/link mt-1 flex items-center justify-between rounded-xl bg-maroon-700 px-4 py-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-maroon-800"
          >
            {{ item.overview }}
            <AppIcon
              name="arrow-right"
              :size="16"
              :stroke-width="2"
              class="transition-transform duration-300 ease-smooth group-hover/link:translate-x-1 motion-reduce:transition-none"
            />
          </AppLink>
        </div>
      </div>
    </Transition>
  </div>
</template>
