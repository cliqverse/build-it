import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useWorkStore } from '@/stores/work'
import type { Client, HeroCard, HomeHero, PageMeta, SectionCopy, Stat } from '@/types/content'

/** Copy for the home page. */
export const useHomeStore = defineStore('home', () => {
  const meta = ref<PageMeta>({
    title: 'BuildIt | Any software, built fast',
    description: 'Websites, mobile apps, business software and AI, built fast and to enterprise standards, plus expert advice on what to build. One accountable team with over a decade of delivery.',
  })

  const hero = ref<HomeHero>({
    eyebrow: 'Websites · Apps · Business software · AI · Consulting',
    title: { lead: 'Any software you need.', highlight: 'Built fast.', rest: 'Built to stand the test of time.' },
    primary: { label: 'Start your project', href: '/contact' },
    secondary: { label: 'See success stories', href: '/work' },
    pickerTitle: 'What can we help with?',
  })

  /**
   * Floating cards around the hero (wide screens). Every figure repeats a claim made
   * elsewhere on the site, so keep them in step with the stats and success stories.
   */
  const heroCards = ref<HeroCard[]>([
    { icon: 'shield', label: 'Uptime', value: '99.9%', note: 'Online and working', tone: 'brand' },
    { icon: 'rocket', label: 'Products launched', value: '30+', tone: 'maroon' },
    { icon: 'compass', label: 'Years building software', value: '10+', tone: 'brand' },
    { icon: 'bolt', label: 'We respond', value: 'Promptly', tone: 'maroon' },
    { icon: 'calendar', label: 'Every week', value: 'Working progress', tone: 'brand', bars: [36, 52, 48, 68, 76, 92] },
    { icon: 'rocket', label: 'Recently launched', value: 'CliqMit', note: 'Discover, book and host events', tone: 'maroon' },
  ])

  const statsSection = ref<SectionCopy>({
    id: 'results',
    eyebrow: 'Results',
    title: 'The numbers do the talking.',
    intro: 'Over a decade of building software that businesses depend on every single day.',
  })

  const stats = ref<Stat[]>([
    { value: 10, suffix: '+', label: 'Years building software' },
    { value: 30, suffix: '+', label: 'Products launched' },
    { value: 12, label: 'Industries served' },
    { value: 99.9, decimals: 1, suffix: '%', label: 'Uptime: our systems stay online and working' },
  ])

  /** The organisations behind our success stories, so the list grows with every new story. */
  const workStore = useWorkStore()
  const clients = computed<Client[]>(() =>
    workStore.works.map((work) => ({ name: work.client, href: `/work#story-${work.id}` })),
  )

  const testimonialsSection = ref<SectionCopy>({
    id: 'testimonials',
    eyebrow: 'Testimonials',
    title: 'Don’t take our word for it.',
  })

  return {
    meta,
    hero,
    heroCards,
    statsSection,
    stats,
    clients,
    testimonialsSection,
  }
})
