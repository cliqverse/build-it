import { onBeforeUnmount, onMounted, ref, toValue, type MaybeRefOrGetter } from 'vue'

interface ScrollRevealOptions {
  rootMargin?: string
  threshold?: number
}

/**
 * Flips `isVisible` to true the first time `target` enters the viewport, then
 * stops observing. Browsers without IntersectionObserver show content immediately.
 */
export function useScrollReveal(
  target: MaybeRefOrGetter<Element | null | undefined>,
  { rootMargin = '0px 0px -10% 0px', threshold = 0 }: ScrollRevealOptions = {},
) {
  const isVisible = ref(false)
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    const el = toValue(target)
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        isVisible.value = true
        observer?.disconnect()
      },
      { rootMargin, threshold },
    )
    observer.observe(el)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { isVisible }
}
