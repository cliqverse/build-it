import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Link, Offering, PageHeroCopy, PageMeta, Product, ProductId, SectionCopy } from '@/types/content'

export const useProductsStore = defineStore('products', () => {
  const meta = ref<PageMeta>({
    title: 'What we build — BuildIt',
    description: 'Websites, mobile apps, business software, AI that saves your team time, and expert advice on what to build: BuildIt delivers whatever you need, fast, and keeps it running.',
  })

  const hero = ref<PageHeroCopy>({
    eyebrow: 'What we build',
    title: 'If you can picture it, we can build it.',
    intro: 'From expert advice on where to start to a finished website, app or AI assistant, one accountable team handles planning, design, build, launch and support — fast, and to enterprise standards.',
    primary: { label: 'Start your project', href: '/contact' },
    secondary: { label: 'See success stories', href: '/work' },
  })

  const offeringsSection = ref<SectionCopy>({
    id: 'what-we-build',
    eyebrow: 'What we build',
    title: 'You name it.',
    highlight: 'We build it.',
    intro: 'Whatever your business needs, chances are we’ve built something like it before — so yours gets done faster.',
  })

  const offerings = ref<Offering[]>([
    { icon: 'globe', title: 'Websites', body: 'Fast, good-looking websites that turn visitors into customers.' },
    { icon: 'phone', title: 'Mobile apps', body: 'iPhone and Android apps people actually keep on their phones.' },
    { icon: 'cart', title: 'Online stores and payments', body: 'Sell online and get paid smoothly, from the first order to the thousandth.' },
    { icon: 'calendar', title: 'Booking and scheduling', body: 'Let customers book, pay and reschedule on their own, day or night.' },
    { icon: 'table', title: 'Business software', body: 'Swap messy spreadsheets for software built around the way you work.' },
    { icon: 'users', title: 'Customer and staff portals', body: 'One place for your people to log in and get things done.' },
    { icon: 'chat', title: 'AI assistants', body: 'AI that answers questions, reads documents and takes routine work off your team.' },
    { icon: 'wrench', title: 'Upgrades and rescues', body: 'Old system slow, broken or abandoned? We bring it back up to speed.' },
  ])

  /** Shown under the grid, for visitors who aren't sure yet what they need. */
  const offeringsAdvice = ref<Offering & { link: Link }>({
    icon: 'compass',
    title: 'Not sure what you need yet?',
    body: 'Start with expert advice. We’ll look at your idea or your current systems, tell you honestly what will work and what it will cost, and give you a clear plan.',
    link: { label: 'Explore consulting', href: '/products/consulting' },
  })

  const offeringsCta = ref<{ title: string; body: string; link: Link }>({
    title: 'Something nobody’s built yet?',
    body: 'Those are our favourite. Tell us the idea and we’ll show you how fast we can make it real.',
    link: { label: 'Start your project', href: '/contact' },
  })

  const practicesSection = ref<SectionCopy>({
    id: 'practices',
    eyebrow: 'Our four teams',
    title: 'Everything under one roof.',
    intro: 'Each team is great on its own. Together, they cover anything your business needs.',
  })

  const detail = ref({
    capabilities: { id: 'what-you-get', eyebrow: 'What you get', title: 'What we can do for you.' } satisfies SectionCopy,
    related: { id: 'related-work', eyebrow: 'Success stories', title: 'Proof it works.' } satisfies SectionCopy,
    others: { id: 'other-products', eyebrow: 'Also from BuildIt', title: 'Need more? We do that too.' } satisfies SectionCopy,
    explore: 'Explore',
    relatedLink: 'See success stories',
  })

  const products = ref<Product[]>([
    {
      id: 'build',
      icon: 'build',
      name: 'BuildIt Software',
      shortName: 'Build',
      tagline: 'Websites, apps and business software, built fast.',
      descriptor: 'Websites, mobile apps and business software, designed, built and looked after by one team.',
      summary: 'From payroll platforms and events apps to games people play in the browser, we build software that’s fast, reliable and ready when you need it.',
      features: [
        'Websites and online stores',
        'iPhone and Android apps',
        'Business software that replaces spreadsheets',
        'Upgrades for old or broken systems',
      ],
      capabilities: [
        {
          title: 'Websites that sell',
          body: 'Fast, easy-to-use websites and online stores that turn visitors into paying customers.',
        },
        {
          title: 'Mobile apps',
          body: 'iPhone and Android apps that stay quick and dependable, even on a weak signal.',
        },
        {
          title: 'Software for your business',
          body: 'Replace spreadsheets and paperwork with tools built around how your team really works.',
        },
        {
          title: 'Always on, always looked after',
          body: 'Monitoring, security updates and support after launch, so everything stays fast, secure and online.',
        },
      ],
    },
    {
      id: 'intelligence',
      icon: 'intelligence',
      name: 'BuildIt Intelligence',
      shortName: 'Intelligence',
      tagline: 'AI that does the busywork for you.',
      descriptor: 'Custom AI that answers questions, reads documents and takes routine work off your team’s hands.',
      summary: 'Forget the hype. We build AI that actually saves your team time — built around your business, private to your company and tested before it goes live.',
      features: [
        'AI assistants that answer questions',
        'AI that reads and sorts documents',
        'Smart suggestions for your customers',
        'Private AI that keeps your data in-house',
      ],
      capabilities: [
        {
          title: 'Your own AI assistant',
          body: 'Answers questions about your business instantly, so customers and staff aren’t left waiting.',
        },
        {
          title: 'Paperwork, handled',
          body: 'AI that reads forms, letters and records, pulls out what matters and flags anything unclear for a person.',
        },
        {
          title: 'Smarter suggestions',
          body: 'Show every customer the products and content they’re most likely to want, the moment they arrive.',
        },
        {
          title: 'Private and secure',
          body: 'Your AI can run inside your own company, so sensitive information stays with you. Every update is tested before launch.',
        },
      ],
    },
    {
      id: 'access',
      icon: 'access',
      name: 'BuildIt Access',
      shortName: 'Access',
      tagline: 'Apps everyone can use, anywhere.',
      descriptor: 'Apps that work for everyone — by voice, by touch and even without internet.',
      summary: 'Reach every customer, including people with disabilities: apps that talk, apps that see, and apps that keep working when the signal drops.',
      features: [
        'Apps you can use by voice',
        'Camera features that describe the world',
        'Works without internet',
        'Accessibility checks and fixes',
      ],
      capabilities: [
        {
          title: 'Talk to it',
          body: 'Apps people can use by speaking and listening, not just by tapping and reading.',
        },
        {
          title: 'Apps that see',
          body: 'The phone’s camera spots obstacles, reads signs and describes what’s ahead, out loud.',
        },
        {
          title: 'No signal? No problem.',
          body: 'Your app keeps working offline and catches up the moment the connection returns.',
        },
        {
          title: 'Checks and fixes',
          body: 'We test your existing website or app for accessibility problems and fix them, before your customers notice.',
        },
      ],
    },
    {
      id: 'consulting',
      icon: 'compass',
      name: 'BuildIt Consulting',
      shortName: 'Consulting',
      tagline: 'Expert advice before you build.',
      descriptor: 'Straight answers on what to build, what it will cost and how to get there, from people who build software every day.',
      summary: 'Not sure where to start, or worried about spending in the wrong place? Our senior team reviews your idea or your current systems and gives you a straight answer, a clear plan and a realistic budget.',
      cta: { label: 'Book a consultation', href: '/contact?need=expert-advice' },
      features: [
        'Honest reviews of your idea',
        'Advice on where AI can help',
        'Health checks for existing systems',
        'Clear plans, timelines and budgets',
      ],
      capabilities: [
        {
          title: 'Test your idea first',
          body: 'Find out what will work, what it will cost and what to build first, before you commit a budget.',
        },
        {
          title: 'The right tools for you',
          body: 'Plain-English advice on the platforms, tools and suppliers that fit your business and your budget.',
        },
        {
          title: 'Where AI really helps',
          body: 'We show you where AI can save your team time or money, and where it isn’t worth it yet.',
        },
        {
          title: 'A health check for what you have',
          body: 'We review your current website, app or systems for speed, security and running costs, then give you a clear, prioritised list of fixes.',
        },
      ],
    },
  ])

  const isProductId = (id: string): id is ProductId => products.value.some((product) => product.id === id)
  const findProduct = (id: string) => products.value.find((product) => product.id === id)

  return {
    meta,
    hero,
    offeringsSection,
    offerings,
    offeringsAdvice,
    offeringsCta,
    practicesSection,
    detail,
    products,
    isProductId,
    findProduct,
  }
})
