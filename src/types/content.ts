export type IconName =
  | 'build'
  | 'intelligence'
  | 'access'
  | 'check'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'menu'
  | 'close'
  | 'chevron-down'
  | 'mail'
  | 'sparkle'
  | 'compass'
  | 'shield'
  | 'globe'
  | 'phone'
  | 'cart'
  | 'calendar'
  | 'table'
  | 'users'
  | 'chat'
  | 'wrench'
  | 'bolt'
  | 'rocket'
  | 'lock'
  | 'key'
  | 'activity'
  | 'refresh'
  | 'whatsapp'

/** `href` may be a path (`/work`), an in-page hash (`#related-work`), a `mailto:` or an absolute URL. */
export interface Link {
  label: string
  href: string
}

export type ProductId = 'build' | 'intelligence' | 'access' | 'consulting'

export interface PageMeta {
  title: string
  description: string
}

export interface PageHeroCopy {
  eyebrow: string
  title: string
  intro: string
  primary?: Link
  secondary?: Link
}

export interface SectionCopy {
  id: string
  eyebrow: string
  title: string
  highlight?: string
  intro?: string
}

export interface Slogan {
  lead: string
  highlight: string
  rest: string
}

export interface Brand {
  name: string
  tagline: string
  email: string
}

export interface NavChild extends Link {
  description: string
  icon: IconName
}

export interface NavItem extends Link {
  children?: NavChild[]
  overview?: string
}

export interface Nav {
  items: NavItem[]
  cta: Link
}

/** A kind of software a visitor can pick; `id` travels to the contact page as `?need=`. */
export interface ProjectType {
  id: string
  label: string
  icon: IconName
}

export interface HomeHero {
  eyebrow: string
  title: Slogan
  primary: Link
  secondary: Link
  pickerTitle: string
}

export interface HeroCard {
  icon: IconName
  label: string
  value: string
  note?: string
  tone: 'brand' | 'maroon'
  bars?: number[]
}

export interface Offering {
  icon: IconName
  title: string
  body: string
}

export interface SpeedStep {
  marker: string
  title: string
  body: string
}

/** Commitments that come with every project (security, ownership, support…). */
export interface Assurance {
  section: SectionCopy
  items: Offering[]
}

export interface Speed {
  section: SectionCopy
  claim: string
  steps: SpeedStep[]
  points: string[]
}

/** An organisation we've built for, linked to its success story. */
export interface Client {
  name: string
  href: string
}

export interface Stat {
  value: number
  decimals?: number
  suffix?: string
  label: string
}

export interface Capability {
  title: string
  body: string
}

export interface Product {
  id: ProductId
  icon: IconName
  name: string
  /** Name without the brand prefix, for compact labels such as "Explore Build". */
  shortName: string
  tagline: string
  descriptor: string
  summary: string
  features: string[]
  capabilities: Capability[]
  /** The product page's main button; defaults to the site-wide "Start your project". */
  cta?: Link
}

export interface Phase {
  icon: IconName
  badge: string
  title: string
  body: string
  points: string[]
}

export interface PlatformLayer {
  name: string
  tag: string
  caption: string
}

export interface Work {
  /** Anchor for in-page links, e.g. `#story-cliqmit`. */
  id: string
  category: string
  title: string
  /** The organisation, as listed under "Trusted by teams at". */
  client: string
  description: string
  result: string
  delivered: string[]
  product: ProductId
  /** The live product. */
  url: string
  /** Screenshots of the live product; `alt` describes the desktop one, the phone one is decorative. */
  screenshots: { desktop: string; mobile: string; alt: string }
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

export interface ClosingCta {
  eyebrow: string
  title: { lead: string; highlight: string }
  body: string
  primary: Link
  secondary: Link
  emailPrompt: string
  whatsappPrompt: string
  whatsapp: Link
  footnote: string
}

export interface ContactOption {
  icon: IconName
  title: string
  body: string
  link: Link
  /** The project option gets its email subject pre-filled with the type picked on the home page. */
  project?: boolean
  /** The WhatsApp option gets its message pre-filled the same way, and opens in a new tab. */
  whatsapp?: boolean
}

export interface FormField {
  label: string
  hint?: string
  placeholder?: string
  /** Shown under the field when it's empty or the server rejects it. */
  error?: string
}

/** The contact page form, which sends enquiries to the team on WhatsApp through `api/enquiry.ts`. */
export interface EnquiryFormCopy {
  title: string
  body: string
  fields: { name: FormField; phone: FormField; need: FormField; message: FormField }
  /** The project list's empty choice, and what the team sees when nothing is picked. */
  notSure: string
  /** Label of the hidden field that catches spam bots. */
  honeypot: string
  consent: string
  privacyLink: Link
  submit: string
  sending: string
  success: { title: string; body: string }
  /** Shown when the message couldn't be sent; the contact email follows it as a link. */
  failed: string
}

export interface ContactPage {
  meta: PageMeta
  hero: PageHeroCopy
  form: EnquiryFormCopy
  optionsTitle: string
  assurancesTitle: string
  assurances: string[]
  pickedLabel: string
  projectSubject: string
  /** Opens the pre-filled WhatsApp message; the picked project type follows it. */
  whatsappMessage: string
  options: ContactOption[]
  stepsTitle: string
  steps: Capability[]
}

export interface LegalSection {
  heading: string
  paragraphs: string[]
}

export type LegalDocId = 'privacy' | 'terms' | 'cookies'

export interface LegalDoc {
  meta: PageMeta
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

export interface NotFoundPage {
  meta: PageMeta
  eyebrow: string
  title: string
  body: string
  primary: Link
  secondary: Link
}

export interface FooterColumn {
  title: string
  links: Link[]
}

export interface Footer {
  statement: Slogan
  columns: FooterColumn[]
  legal: string
  credit: string
}

export interface UiStrings {
  skipLink: string
  primaryNav: string
  footerNav: string
  openMenu: string
  closeMenu: string
  statsLabel: string
  visitSite: string
  storyNav: string
  newTab: string
  clientsLabel: string
}
