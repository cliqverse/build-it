import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Brand, ClosingCta, Footer, Nav, ProjectType, Testimonial, UiStrings } from '@/types/content'

export const CONTACT_EMAIL = 'hello@buildit.com'
export const PROJECT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=New%20project`
export const CONSULTATION_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Consultation`

/** The number the team answers on WhatsApp, in international format with digits only, as wa.me links need it. */
export const WHATSAPP_NUMBER = '2348160905978'
/** The same number as visitors read it. Keep the two in step. */
export const WHATSAPP_DISPLAY = '+234 816 090 5978'
/** Opens a WhatsApp chat with the team, with `message` already typed in and ready to send. */
export const whatsappLink = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
export const WHATSAPP_URL = whatsappLink('Hi BuildIt! I’d like to talk about a project.')

/**
 * Site-wide copy: brand, navigation, footer, the closing call to action and
 * interface strings. Page-specific copy lives in the other stores in this folder,
 * so templates never hard-code text and the content can later come from a CMS.
 *
 * Voice: plain English for non-technical buyers. Lead with "we build any software"
 * and with speed; avoid technical terms.
 */
export const useSiteStore = defineStore('site', () => {
  const brand = ref<Brand>({
    name: 'BuildIt',
    tagline: 'From expert advice to websites, apps, business software and AI: one accountable team, start to finish.',
    email: CONTACT_EMAIL,
  })

  const nav = ref<Nav>({
    items: [
      {
        label: 'What we build',
        href: '/products',
        overview: 'See everything we build',
        children: [
          {
            label: 'BuildIt Software',
            href: '/products/build',
            description: 'Websites, apps and business software.',
            icon: 'build',
          },
          {
            label: 'BuildIt Intelligence',
            href: '/products/intelligence',
            description: 'AI that takes the busywork off your plate.',
            icon: 'intelligence',
          },
          {
            label: 'BuildIt Access',
            href: '/products/access',
            description: 'Apps everyone can use, anywhere.',
            icon: 'access',
          },
          {
            label: 'BuildIt Consulting',
            href: '/products/consulting',
            description: 'Expert advice before you build.',
            icon: 'compass',
          },
        ],
      },
      { label: 'How we work', href: '/how-we-work' },
      { label: 'Success stories', href: '/work' },
      { label: 'Contact', href: '/contact' },
    ],
    cta: { label: 'Start your project', href: '/contact' },
  })

  const projectTypes = ref<ProjectType[]>([
    { id: 'website', label: 'A website', icon: 'globe' },
    { id: 'mobile-app', label: 'A mobile app', icon: 'phone' },
    { id: 'online-store', label: 'An online store', icon: 'cart' },
    { id: 'booking-system', label: 'A booking system', icon: 'calendar' },
    { id: 'business-software', label: 'Business software', icon: 'table' },
    { id: 'ai-assistant', label: 'An AI assistant', icon: 'chat' },
    { id: 'system-fix', label: 'A fix for an old system', icon: 'wrench' },
    { id: 'expert-advice', label: 'Expert advice', icon: 'compass' },
    { id: 'something-new', label: 'Something brand new', icon: 'sparkle' },
  ])

  /**
   * Drafted quotes for real clients: get each person's written approval of the exact
   * wording before the site goes live, and edit freely to match what they actually said.
   */
  const testimonials = ref<Testimonial[]>([
    {
      quote: 'BuildIt took Mobiey from an idea to a live platform, AI assistant and all. They moved fast, explained every decision and never left us guessing.',
      name: 'Ikenna',
      role: 'CEO',
      company: 'Mobiey',
    },
    {
      quote: 'Payroll and escrow leave no room for mistakes. BuildIt built Kashia with the care that demands, and they’re still the team we call first.',
      name: 'Ajie Takon',
      role: 'CEO',
      company: 'Kashia',
    },
    {
      quote: 'They only promise what they can deliver, and then they deliver it. One accountable team, a clear plan and no surprises on the bill.',
      name: 'Costly Ayang',
      role: 'President',
      company: 'Expensive Group',
    },
  ])

  const cta = ref<ClosingCta>({
    eyebrow: 'Talk to us',
    title: { lead: 'Ready to move?', highlight: 'We reply as soon as you reach out.' },
    body: 'Share a few details about your project and we’ll get back to you promptly with clear next steps. Everything you share stays confidential.',
    primary: { label: 'Start your project', href: '/contact' },
    secondary: { label: 'See success stories', href: '/work' },
    channels: [
      { icon: 'mail', prompt: 'Prefer email?', link: { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` } },
      { icon: 'whatsapp', prompt: 'Prefer WhatsApp?', link: { label: WHATSAPP_DISPLAY, href: WHATSAPP_URL } },
    ],
    footnote: 'Prompt replies · Confidential by default · Over a decade of delivery',
  })

  const footer = ref<Footer>({
    statement: { lead: 'Any software.', highlight: 'Built fast.', rest: 'Built to stand the test of time.' },
    columns: [
      {
        title: 'What we build',
        links: [
          { label: 'BuildIt Software', href: '/products/build' },
          { label: 'BuildIt Intelligence', href: '/products/intelligence' },
          { label: 'BuildIt Access', href: '/products/access' },
          { label: 'BuildIt Consulting', href: '/products/consulting' },
          { label: 'Everything we build', href: '/products' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'How we work', href: '/how-we-work' },
          { label: 'Success stories', href: '/work' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        title: 'Let’s talk',
        links: [
          { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
          { label: 'Chat on WhatsApp', href: WHATSAPP_URL },
          { label: 'Start your project', href: PROJECT_MAILTO },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy policy', href: '/privacy' },
          { label: 'Terms of use', href: '/terms' },
          { label: 'Cookie policy', href: '/cookies' },
        ],
      },
    ],
    legal: 'All rights reserved.',
    credit: 'Designed and built in-house, like everything we ship.',
  })

  const ui = ref<UiStrings>({
    skipLink: 'Skip to content',
    primaryNav: 'Primary',
    footerNav: 'Footer',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    statsLabel: 'BuildIt in numbers',
    visitSite: 'Visit',
    storyNav: 'Jump to a success story',
    newTab: '(opens in a new tab)',
    clientsLabel: 'Trusted by teams at',
  })

  const year = computed(() => new Date().getFullYear())

  return { brand, nav, projectTypes, testimonials, cta, footer, ui, year }
})
