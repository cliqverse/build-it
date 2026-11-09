import { onBeforeUnmount, ref, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue'
import { prefersReducedMotion } from '@/utils/motion'

/**
 * Animates from 0 to `target` (ease-out cubic) once `start` becomes true.
 * With reduced motion the final value is shown immediately.
 */
export function useCountUp(target: MaybeRefOrGetter<number>, start: Ref<boolean>, duration = 1200) {
  const current = ref(0)
  let frame = 0

  const run = () => {
    const end = toValue(target)
    if (prefersReducedMotion()) {
      current.value = end
      return
    }

    const startedAt = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      current.value = end * (1 - (1 - progress) ** 3)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
  }

  watch(
    start,
    (started) => {
      if (started) run()
    },
    { immediate: true },
  )

  onBeforeUnmount(() => cancelAnimationFrame(frame))

  return current
}
