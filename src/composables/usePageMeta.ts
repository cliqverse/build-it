import { type MaybeRefOrGetter, toValue, watchEffect } from 'vue'
import type { PageMeta } from '@/types/content'

const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.append(tag)
  }
  tag.content = content
}

/** Keeps the document title and description in sync with the current page's copy. */
export const usePageMeta = (meta: MaybeRefOrGetter<PageMeta>) => {
  watchEffect(() => {
    const { title, description } = toValue(meta)
    document.title = title
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
  })
}
