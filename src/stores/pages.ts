import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CONSULTATION_MAILTO, CONTACT_EMAIL, PROJECT_MAILTO, RESPONSE_TIME, WHATSAPP_DISPLAY, WHATSAPP_URL } from '@/stores/site'
import type { ContactPage, LegalDoc, LegalDocId, NotFoundPage } from '@/types/content'

const UPDATED = '7 November 2026'

/**
 * Contact, legal and error pages.
 *
 * The legal wording describes how this website works today (no cookies or
 * analytics; one contact form, whose messages go to the team on WhatsApp). It is
 * a starting draft: have it reviewed before launch, and update it whenever the
 * site starts collecting anything new.
 */
export const usePagesStore = defineStore('pages', () => {
  const contact = ref<ContactPage>({
    meta: {
      title: 'Contact | BuildIt',
      description: `Tell BuildIt what you need built, big or small. We respond within ${RESPONSE_TIME}, and everything you share stays confidential.`,
    },
    hero: {
      eyebrow: 'Contact',
      title: 'Let’s talk about your project.',
      intro: `Tell us what you need, big or small. We respond within ${RESPONSE_TIME}, and everything you share stays confidential.`,
    },
    form: {
      title: 'Send us a message',
      body: `Tell us what you need in a few lines. We’ll reply on WhatsApp within ${RESPONSE_TIME}.`,
      fields: {
        name: { label: 'Your name', error: 'Please tell us your name.' },
        phone: {
          label: 'Your WhatsApp number',
          hint: 'Include your country code, such as +234 for Nigeria.',
          placeholder: '+234 800 000 0000',
          error: 'Please enter a WhatsApp number that starts with your country code, such as +234.',
        },
        need: { label: 'What do you need? (optional)' },
        message: {
          label: 'Your message',
          placeholder: 'A few lines about your idea and when you need it.',
          error: 'Please add a short message.',
        },
      },
      notSure: 'Not sure yet',
      honeypot: 'Leave this field empty',
      consent: 'By sending this, you agree that BuildIt can reply to you on WhatsApp.',
      privacyLink: { label: 'How we use your details', href: '/privacy' },
      submit: 'Send message',
      sending: 'Sending…',
      success: {
        title: 'Thanks, your message is on its way.',
        body: `We’ll reply on WhatsApp within ${RESPONSE_TIME}.`,
      },
      failed: 'Sorry, your message didn’t go through. Please try again, or email us at',
    },
    optionsTitle: 'Pick your path',
    assurancesTitle: 'Every conversation comes with',
    assurances: ['Confidentiality, with an NDA on request', 'A named lead from day one', 'Full ownership of everything we build'],
    pickedLabel: 'You’re interested in',
    projectSubject: 'New project',
    whatsappMessage: 'Hi BuildIt! I’m interested in:',
    options: [
      {
        icon: 'rocket',
        title: 'Start a project',
        body: 'Tell us what you’d like built. A few lines is plenty. We’ll take it from there.',
        link: { label: 'Email us your idea', href: PROJECT_MAILTO },
        project: true,
      },
      {
        icon: 'whatsapp',
        title: 'Prefer WhatsApp?',
        body: `Message us on ${WHATSAPP_DISPLAY} about anything, from a quick question to a whole project. We reply within ${RESPONSE_TIME}.`,
        link: { label: 'Chat with us on WhatsApp', href: WHATSAPP_URL },
        whatsapp: true,
      },
      {
        icon: 'compass',
        title: 'Get expert advice',
        body: 'Not sure what you need yet? Book a consultation and we’ll help you decide what to build, what it will cost and where to start.',
        link: { label: 'Book a consultation', href: CONSULTATION_MAILTO },
      },
    ],
    stepsTitle: 'What happens next',
    steps: [
      {
        title: 'You tell us your idea',
        body: 'A few lines about what you need and when you need it is plenty.',
      },
      {
        title: `We respond within ${RESPONSE_TIME}`,
        body: 'With thoughtful questions, first ideas or times for a call.',
      },
      {
        title: 'A clear plan, fast',
        body: 'We agree what success looks like and how quickly we can get you there.',
      },
    ],
  })

  const legal = ref<Record<LegalDocId, LegalDoc>>({
    privacy: {
      meta: {
        title: 'Privacy policy | BuildIt',
        description: 'What information the BuildIt website collects and how we use it.',
      },
      title: 'Privacy policy',
      updated: '10 November 2026',
      intro: 'This policy explains what information the BuildIt website collects and how we use it.',
      sections: [
        {
          heading: 'What we collect',
          paragraphs: [
            'This website does not use analytics or advertising trackers, and it does not ask you to create an account.',
            'If you use the form on our contact page, we receive your name, your WhatsApp number, the kind of project you pick and your message. The website passes them straight to our team as a WhatsApp message, sent through WhatsApp’s business platform, which is run by Meta. The website itself does not store them.',
            'If you email us, we receive your email address, your name if you include it, and anything else you choose to send.',
            'If you message us on WhatsApp, we receive your phone number, your WhatsApp profile name and anything else you choose to send. WhatsApp is a Meta service, and your use of it is covered by WhatsApp’s own privacy policy.',
            'Our hosting provider may keep standard server logs, such as IP addresses and request times, to keep the site secure and reliable.',
          ],
        },
        {
          heading: 'How we use it',
          paragraphs: [
            'We use what you send us, whether by email, WhatsApp or the contact form, only to reply and, if you ask us to, to arrange a call or prepare a proposal. We do not sell your information or use it for advertising.',
          ],
        },
        {
          heading: 'How long we keep it',
          paragraphs: [
            'We keep correspondence for as long as we need it to respond and to keep a record of our working relationship, then delete it.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            `You can ask us what information we hold about you, ask us to correct it or ask us to delete it by emailing ${CONTACT_EMAIL}.`,
          ],
        },
      ],
    },
    terms: {
      meta: {
        title: 'Terms of use | BuildIt',
        description: 'The terms that apply to your use of the BuildIt website.',
      },
      title: 'Terms of use',
      updated: UPDATED,
      intro: 'These terms apply to your use of the BuildIt website.',
      sections: [
        {
          heading: 'Using this website',
          paragraphs: [
            'The content on this website is general information about BuildIt and our services. It is not an offer or a contract.',
          ],
        },
        {
          heading: 'Intellectual property',
          paragraphs: [
            'Unless stated otherwise, the text, design and graphics on this website belong to BuildIt. Please ask before reusing them.',
          ],
        },
        {
          heading: 'Links to other websites',
          paragraphs: [
            'Where we link to other websites, we are not responsible for their content or for how they handle your data.',
          ],
        },
        {
          heading: 'Changes to these terms',
          paragraphs: [
            'We may update these terms from time to time. The date at the top of this page shows when they last changed.',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [`Questions about these terms can be sent to ${CONTACT_EMAIL}.`],
        },
      ],
    },
    cookies: {
      meta: {
        title: 'Cookie policy | BuildIt',
        description: 'The BuildIt website does not set cookies.',
      },
      title: 'Cookie policy',
      updated: UPDATED,
      intro: 'This website does not set cookies.',
      sections: [
        {
          heading: 'Cookies on this site',
          paragraphs: [
            'The BuildIt website does not use cookies, analytics or advertising trackers. Fonts are served from our own domain rather than from a third-party service.',
          ],
        },
        {
          heading: 'If this changes',
          paragraphs: [
            'If we ever add cookies, we will update this page first and, where the law requires it, ask for your consent before setting them.',
          ],
        },
      ],
    },
  })

  const legalLabels = ref({ updated: 'Last updated', eyebrow: 'Legal' })

  const notFound = ref<NotFoundPage>({
    meta: {
      title: 'Page not found | BuildIt',
      description: 'The page you were looking for does not exist.',
    },
    eyebrow: '404',
    title: 'We can’t find that page.',
    body: 'The link may be broken, or the page may have moved. Here are the best places to go next.',
    primary: { label: 'Back to home', href: '/' },
    secondary: { label: 'Talk to us', href: '/contact' },
  })

  return { contact, legal, legalLabels, notFound }
})
