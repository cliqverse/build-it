import { defineStore } from 'pinia'
import { ref } from 'vue'
import { RESPONSE_TIME } from '@/stores/site'
import type { Assurance, PageHeroCopy, PageMeta, Phase, PlatformLayer, SectionCopy, Speed } from '@/types/content'

/** Copy for "How we work", plus the speed story shared with the home page. */
export const usePlatformStore = defineStore('platform', () => {
  const meta = ref<PageMeta>({
    title: 'How we work | BuildIt',
    description: 'Fast, transparent and accountable: how BuildIt takes your project from the first conversation to launch, then secures, supports and improves it.',
  })

  const hero = ref<PageHeroCopy>({
    eyebrow: 'How we work',
    title: 'Fast. Transparent. Accountable.',
    intro: 'One team owns your project from the first conversation to launch day and beyond. You always know what’s happening, what it costs and what comes next.',
    primary: { label: 'Start your project', href: '/contact' },
    secondary: { label: 'See success stories', href: '/work' },
  })

  /**
   * Speed is the headline promise. "Weeks, not months" and "every week" describe
   * how BuildIt works; confirm they match your typical projects before launch.
   */
  const speed = ref<Speed>({
    section: {
      id: 'speed',
      eyebrow: 'Speed',
      title: 'Built fast.',
      highlight: 'Never rushed.',
      intro: 'Speed is how we win. Small expert teams, a proven playbook and over a decade of building mean you see real progress early and often, not a pile of paperwork months later.',
    },
    claim: 'Launch in weeks, not months.',
    steps: [
      {
        marker: `Within ${RESPONSE_TIME}`,
        title: 'We respond',
        body: `Tell us about your project and you’ll hear back within ${RESPONSE_TIME}, with clear next steps.`,
      },
      {
        marker: 'Fast start',
        title: 'A clear plan and price',
        body: 'No months of meetings. You get a written plan, timeline and price, ready to share with your stakeholders.',
      },
      {
        marker: 'Every week',
        title: 'Watch it come to life',
        body: 'You see real, working progress every week, not one big reveal at the end.',
      },
      {
        marker: 'Launch day',
        title: 'Go live with confidence',
        body: 'We launch with you, monitor everything closely and keep improving it after go-live.',
      },
    ],
    points: [
      'Small expert teams that move fast',
      'A playbook sharpened over 30+ launches',
      'No hand-offs, no waiting on other suppliers',
    ],
  })

  /**
   * Commitments that come with every project. Each one is a promise to clients:
   * confirm the team can honour all of them (NDAs, code ownership, a named lead,
   * agreed support response times) before launch.
   */
  const assurance = ref<Assurance>({
    section: {
      id: 'assurance',
      eyebrow: 'Enterprise-grade by default',
      title: 'Fast, without',
      highlight: 'cutting corners.',
      intro: 'Speed only matters if you can trust what ships. Every project, large or small, comes with the same commitments.',
    },
    items: [
      {
        icon: 'shield',
        title: 'Security built in',
        body: 'Secure coding, encrypted data and strict access controls from day one, not bolted on at the end.',
      },
      {
        icon: 'lock',
        title: 'Confidential by default',
        body: 'Your plans and data stay private, with an NDA whenever you need one. We use your data only to build and run your product.',
      },
      {
        icon: 'activity',
        title: 'Reliable in production',
        body: '99.9% uptime across the systems we run, with monitoring and alerts so issues are caught before your users notice.',
      },
      {
        icon: 'users',
        title: 'One accountable team',
        body: 'A named project lead and a single point of contact, with weekly demos and progress you can see.',
      },
      {
        icon: 'key',
        title: 'You own what we build',
        body: 'The code, designs and data are yours, with documentation for a clean hand-over whenever you want it.',
      },
      {
        icon: 'refresh',
        title: 'Support after launch',
        body: 'Maintenance, updates and improvements, with support response times agreed up front and written down.',
      },
    ],
  })

  const phasesSection = ref<SectionCopy>({
    id: 'phases',
    eyebrow: 'Behind the scenes',
    title: 'Three steps.',
    highlight: 'Zero guesswork.',
    intro: 'The same proven playbook for a simple website or a smart AI system.',
  })

  const phases = ref<Phase[]>([
    {
      icon: 'compass',
      badge: 'Step 1',
      title: 'Plan it',
      body: 'We get to know your business, your customers and your goals, then map out exactly what to build.',
      points: ['Listen first, build second', 'Agree what success looks like', 'A clear plan, timeline and price'],
    },
    {
      icon: 'bolt',
      badge: 'Step 2',
      title: 'Build it',
      body: 'Small expert teams build fast and show you working progress every week, with security built in from day one.',
      points: ['Working progress every week', 'Your feedback shapes every step', 'Safe and secure from the start'],
    },
    {
      icon: 'rocket',
      badge: 'Step 3',
      title: 'Launch and grow',
      body: 'We launch with you, keep everything running smoothly and keep improving it. Or we hand it over with everything your team needs.',
      points: ['Launch-day support', 'Ongoing care and improvements', 'An easy hand-over whenever you’re ready'],
    },
  ])

  const architectureSection = ref<SectionCopy>({
    id: 'one-team',
    eyebrow: 'Under one roof',
    title: 'One team for the whole job.',
    intro: 'No juggling designers, developers and AI specialists from different companies. Everything works together, so nothing falls through the cracks.',
  })

  const layers = ref<PlatformLayer[]>([
    { name: 'BuildIt Access', tag: 'What your customers use', caption: 'Easy for everyone, everywhere' },
    { name: 'BuildIt Intelligence', tag: 'What makes it smart', caption: 'AI that saves time' },
    { name: 'BuildIt Software', tag: 'What keeps it running', caption: 'Websites, apps and systems' },
  ])

  const diagramLabel = ref(
    'Diagram: BuildIt Software keeps everything running, BuildIt Intelligence makes it smart, and BuildIt Access makes it easy for every customer to use, with what we learn after launch feeding into the next improvement.',
  )

  return { meta, hero, speed, assurance, phasesSection, phases, architectureSection, layers, diagramLabel }
})
