import { onBeforeUnmount, onMounted, ref, toValue, type MaybeRefOrGetter } from 'vue'

interface ScrollRevealOptions {
  rootMargin?: string
  threshold?: number
}

/*
 * Scroll speed, shared by every reveal and tracked for the lifetime of the app. Content that
 * arrives during a fast flick or an anchor jump appears at once rather than fading in behind
 * the scroll; reading-speed scrolling keeps the entrance animation.
 */
const FAST_SCROLL = 1.2 // px per ms, roughly where reading turns into skimming
let lastY = 0
let lastTime = 0
let speed = 0
let tracking = false

const trackScroll = () => {
  const now = performance.now()
  const y = window.scrollY
  const elapsed = now - lastTime
  /* After a pause, a big change in one event is a jump (an anchor link), not a slow drift. */
  speed = Math.abs(y - lastY) / (elapsed > 100 ? 16 : Math.max(elapsed, 1))
  lastY = y
  lastTime = now
}

const startTracking = () => {
  if (tracking) return
  tracking = true
  lastY = window.scrollY
  lastTime = performance.now()
  window.addEventListener('scroll', trackScroll, { passive: true })
}

const scrollingFast = () => speed > FAST_SCROLL && performance.now() - lastTime < 150

/**
 * Flips `isVisible` to true the first time `target` comes within a quarter of a screen of the
 * viewport, then stops observing. Starting just before content scrolls into view means it
 * is already settling as it arrives, instead of leaving gaps that fill in behind the scroll.
 * `instant` is true when that happened mid-flick, so the entrance animation can be skipped.
 * Browsers without IntersectionObserver show content immediately.
 */
export function useScrollReveal(
  target: MaybeRefOrGetter<Element | null | undefined>,
  { rootMargin = '0px 0px 25% 0px', threshold = 0 }: ScrollRevealOptions = {},
) {
  const isVisible = ref(false)
  const instant = ref(false)
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    const el = toValue(target)
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      isVisible.value = true
      return
    }

    startTracking()
    observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        instant.value = scrollingFast()
        isVisible.value = true
        observer?.disconnect()
      },
      { rootMargin, threshold },
    )
    observer.observe(el)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { isVisible, instant }
}
