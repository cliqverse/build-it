import { defineStore } from 'pinia'
import { ref } from 'vue'
import biroFightDesktop from '@/assets/work/biro-fight-desktop.webp'
import biroFightMobile from '@/assets/work/biro-fight-mobile.webp'
import cliqmitDesktop from '@/assets/work/cliqmit-desktop.webp'
import cliqmitMobile from '@/assets/work/cliqmit-mobile.webp'
import kashiaDesktop from '@/assets/work/kashia-desktop.webp'
import kashiaMobile from '@/assets/work/kashia-mobile.webp'
import mobieyDesktop from '@/assets/work/mobiey-desktop.webp'
import mobieyMobile from '@/assets/work/mobiey-mobile.webp'
import type { PageHeroCopy, PageMeta, SectionCopy, Work } from '@/types/content'

/** Live products we have built. Each `result` restates a fact from its description; keep the two in step. */
export const useWorkStore = defineStore('work', () => {
  const meta = ref<PageMeta>({
    title: 'Success stories — BuildIt',
    description: 'Biro Fight, a browser game; CliqMit, an events platform; Kashia, for payroll, hiring and escrow; and Mobiey, a real estate platform with its own AI assistant: real products BuildIt has built and launched.',
  })

  const hero = ref<PageHeroCopy>({
    eyebrow: 'Success stories',
    title: 'Big wins. Delivered fast. Still running.',
    intro: 'A few of the products we’ve designed, built and launched — live today and used by real people.',
    primary: { label: 'Start your project', href: '/contact' },
  })

  const listSection = ref<SectionCopy>({
    id: 'stories',
    eyebrow: 'Live in production',
    title: 'Different industries.',
    highlight: 'One high standard.',
    intro: 'Gaming, events, finance and real estate: four very different products, each designed, built and launched by the same accountable team, and all live today.',
  })

  const works = ref<Work[]>([
    {
      id: 'biro-fight',
      category: 'Game',
      title: 'Biro Fight: School Life',
      client: 'Biro Fight',
      description: 'A free browser game that brings back Nigerian secondary school, from JSS1 to SS3. Flick your biro to knock your classmate’s biro off the desk, then take on friends online or battle through knockout cups.',
      result: 'Free to play, right in the browser',
      delivered: ['Browser game', 'Online multiplayer', 'Knockout cups'],
      product: 'build',
      url: 'https://biro-fight.onrender.com/',
      screenshots: {
        desktop: biroFightDesktop,
        mobile: biroFightMobile,
        alt: 'Biro Fight home screen: classmates in school uniform crowd around a desk with two biros, above the Play, Play online and Go to school buttons.',
      },
    },
    {
      id: 'cliqmit',
      category: 'Events',
      title: 'CliqMit',
      client: 'CliqMit',
      description: 'An all-in-one events platform. Hosts create, promote and manage their events, and fans discover and book everything from concerts and Afrobeat nights to festivals and retreats.',
      result: 'Discover, book and host in one app',
      delivered: ['Event discovery', 'Easy booking', 'Tools for hosts', 'Spotify picks'],
      product: 'build',
      url: 'https://cliqmit.com/',
      screenshots: {
        desktop: cliqmitDesktop,
        mobile: cliqmitMobile,
        alt: 'CliqMit home page: “Your Next Event Starts Here” above a grid of concert and festival photos, event categories and recent events.',
      },
    },
    {
      id: 'kashia',
      category: 'Finance',
      title: 'Kashia',
      client: 'Kashia',
      description: 'One platform for businesses to hire verified talent, run HR and payroll, and close deals safely, with payments held in escrow until the work is done.',
      result: 'Payroll, hiring and escrow in one place',
      delivered: ['Payroll and HR', 'Talent hiring', 'Escrow payments'],
      product: 'build',
      url: 'https://www.kashiahq.com/',
      screenshots: {
        desktop: kashiaDesktop,
        mobile: kashiaMobile,
        alt: 'Kashia home page: “Global talent. Local operations. Trusted transactions.” with cards for employees, monthly payroll and attendance.',
      },
    },
    {
      id: 'mobiey',
      category: 'Real estate',
      title: 'Mobiey',
      client: 'Mobiey',
      description: 'A real estate platform for finding, renting and managing apartments, office spaces and short-term stays. Seekers search by map and message owners directly, while Eva, the built-in AI assistant, suggests matches, helps prepare applications and answers rental questions.',
      result: 'An AI assistant that finds your next place',
      delivered: ['Home and office search', 'Map view', 'AI assistant', 'Listings for owners'],
      product: 'intelligence',
      url: 'https://mobiey.com/',
      screenshots: {
        desktop: mobieyDesktop,
        mobile: mobieyMobile,
        alt: 'Mobiey home page: a “Find your next place” search box over a city street, above popular office and apartment listings with Call and Message buttons.',
      },
    },
  ])

  return { meta, hero, listSection, works }
})
