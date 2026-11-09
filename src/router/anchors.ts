import { prefersReducedMotion } from '@/utils/motion'

/** Height of the sticky header plus breathing room, used for in-page scroll offsets. */
export const HEADER_OFFSET = 80

const findSection = (hash: string) => document.getElementById(decodeURIComponent(hash.slice(1)))

/*
 * Distance from the top of the page, ignoring transforms. Pages fade up on arrival and sections
 * slide in as they reveal, so a measured position would be off by those offsets until they settle,
 * leaving the section partly under the sticky header.
 */
const pageTop = (el: HTMLElement) => {
  let top = 0
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop
  return top
}

/** Scroll position that puts the section a link points at just below the sticky header. */
export const hashScrollTop = (hash: string) => {
  const el = findSection(hash)
  return el ? pageTop(el) - HEADER_OFFSET : undefined
}

export const scrollToHash = (hash: string) => {
  const top = hashScrollTop(hash)
  if (top === undefined) return
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

/** Moves keyboard and screen-reader focus to the section an in-page link points at. */
export const focusHash = (hash: string) => {
  const el = findSection(hash)
  if (!el) return
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}
