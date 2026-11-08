import { prefersReducedMotion } from '@/utils/motion'

/** Height of the sticky header plus breathing room, used for in-page scroll offsets. */
export const HEADER_OFFSET = 80

const findSection = (hash: string) => document.getElementById(decodeURIComponent(hash.slice(1)))

export const scrollToHash = (hash: string) => {
  const el = findSection(hash)
  if (!el) return
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}

/** Moves keyboard and screen-reader focus to the section an in-page link points at. */
export const focusHash = (hash: string) => {
  const el = findSection(hash)
  if (!el) return
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}
