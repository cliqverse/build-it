<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { focusHash, scrollToHash } from '@/router/anchors'

const props = defineProps<{ href: string }>()

const route = useRoute()
const router = useRouter()

const isPath = computed(() => props.href.startsWith('/'))
const isHash = computed(() => props.href.startsWith('#'))
const isExternal = computed(() => /^https?:\/\//.test(props.href))

/** Same-page anchors: re-clicking the current hash is a duplicate navigation, so scroll manually. */
const onHashClick = async (event: MouseEvent) => {
  const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
  if (event.defaultPrevented || event.button !== 0 || modified) return
  event.preventDefault()
  if (route.hash === props.href) {
    scrollToHash(props.href)
    focusHash(props.href)
    return
  }
  await router.push({ hash: props.href })
}
</script>

<template>
  <RouterLink v-if="isPath" :to="href"><slot /></RouterLink>
  <a v-else-if="isHash" :href="href" @click="onHashClick"><slot /></a>
  <a
    v-else
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </a>
</template>
