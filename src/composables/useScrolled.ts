import { onBeforeUnmount, onMounted, ref } from 'vue'

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 8) {
  const scrolled = ref(false)
  let frame = 0

  const update = () => {
    frame = 0
    scrolled.value = window.scrollY > threshold
  }

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    if (frame) cancelAnimationFrame(frame)
  })

  return scrolled
}
