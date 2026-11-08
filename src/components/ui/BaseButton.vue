<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppLink from '@/components/ui/AppLink.vue'
import type { IconName } from '@/types/content'

/**
 * On light surfaces:          primary (violet), dark (ink), outline (ink border).
 * On violet, maroon or ink:   light (white), outline-light (white border).
 */
type Variant = 'primary' | 'dark' | 'outline' | 'light' | 'outline-light'
type Size = 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    as?: 'button' | 'a'
    href?: string
    variant?: Variant
    size?: Size
    type?: 'button' | 'submit' | 'reset'
    icon?: IconName
  }>(),
  { as: 'button', href: '', variant: 'primary', size: 'md', type: 'button', icon: undefined },
)

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 hover:shadow-brand',
  dark: 'bg-ink text-white hover:bg-brand-600 hover:shadow-brand',
  outline: 'border border-ink/15 bg-white text-ink shadow-soft hover:border-ink/35 hover:shadow-lift',
  light: 'bg-white text-ink hover:bg-maroon-50 hover:shadow-lift',
  'outline-light': 'border border-white/45 text-white hover:border-white hover:bg-white/10',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-13 px-6 text-base',
}

const bindings = computed(() => (props.as === 'a' ? { href: props.href } : { type: props.type }))
</script>

<template>
  <component
    :is="as === 'a' ? AppLink : 'button'"
    v-bind="bindings"
    class="group/btn inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow,translate,scale] duration-300 ease-smooth motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97]"
    :class="[variants[variant], sizes[size]]"
  >
    <slot />
    <AppIcon
      v-if="icon"
      :name="icon"
      :size="18"
      :stroke-width="2"
      class="transition-transform duration-300 ease-smooth group-hover/btn:translate-x-1 motion-reduce:transition-none"
    />
  </component>
</template>
