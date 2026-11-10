# BuildIt company website

The BuildIt company website: a multi-page site built with Vue 3 (`<script setup>` + TypeScript), Vite, Vue Router 4, Pinia and Tailwind CSS v4.
The look is flat and editorial: violet `#6108e6` with maroon `#800020` as the secondary colour, warm paper neutrals and no gradients. All text is set in Google Sans, self-hosted through Fontsource with optical sizes. Copy is written in plain English for non-technical buyers and leads with two messages: we build any software, and we build it fast.

## Run

This project uses **pnpm** (pinned in `package.json` → `packageManager`).

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # type-check (vue-tsc) + production build to dist/
pnpm preview      # serve dist/ locally
```

Requires Node 20.19+ or 22.12+. If your global pnpm is older, pnpm downloads the pinned version automatically.

`pnpm-workspace.yaml` only exists because pnpm 12 refuses packages published in the last 24 hours, and Tailwind 4.3.5 came out on 6 November 2026. From 8 November 2026 the file can be deleted.

## Pages

| Route | View | Content store |
| --- | --- | --- |
| `/` | `HomeView` | `stores/home.ts` |
| `/products` | `ProductsView` | `stores/products.ts` |
| `/products/build`, `/intelligence`, `/access`, `/consulting` | `ProductDetailView` | `stores/products.ts` |
| `/how-we-work` (old `/platform` redirects) | `PlatformView` | `stores/platform.ts` (also holds the speed story) |
| `/work` | `WorkView` | `stores/work.ts` |
| `/contact` | `ContactView` | `stores/pages.ts` |
| `/privacy`, `/terms`, `/cookies` | `LegalView` | `stores/pages.ts` |
| anything else | `NotFoundView` | `stores/pages.ts` |

Each view sets its own document title and description through `usePageMeta`. After every navigation, focus moves to the new page (or to the linked section) for keyboard and screen-reader users.

The chips under the home headline link to `/contact?need=<id>`; the contact page then shows the chosen project type and pre-fills both the email subject and the WhatsApp message with it. The list lives in `stores/site.ts` → `projectTypes`.

## Where things live

| Path | Purpose |
| --- | --- |
| `src/stores/` | **All copy, links and content.** `site.ts` holds the brand, navigation, footer, closing call to action and testimonials; the others hold one page each. Nothing is hard-coded in templates. |
| `src/types/content.ts` | Types for the content model. |
| `src/assets/work/` | Desktop and phone screenshots of the live products on the Success stories page (WebP). Retake them when an app's design changes. |
| `src/styles/main.css` | Tailwind v4 entry: `@theme` tokens (violet and maroon scales, paper neutrals, type scale), the `marker` highlight utility, and WCAG contrast notes. |
| `src/components/layout/` | `SiteHeader` (with the "What we build" dropdown), `NavDropdown`, `SiteFooter`, `PageHero` (flat violet header for inner pages). |
| `src/components/sections/` | Page sections. Shared ones (`OfferingsSection`, `SpeedSection`, `PracticesSection`, `PhasesSection`, `WorkSection`) take their copy as props. |
| `src/components/blocks/` | `HeroCard`, `StatBlock`, `PhaseCard`, `WorkCard`, `TestimonialCard`, `PlatformDiagram`, `EnquiryForm` (the contact page form). |
| `src/components/ui/` | Primitives: `BaseButton` (`primary` / `dark` / `outline` on light surfaces; `light` / `outline-light` on violet, maroon or ink), `AppLink`, `SectionHeading`, `IconBadge`, `AppIcon`, `BrandLogo`, `MonogramAvatar`, `RevealOnScroll`. |
| `src/composables/` | `useScrollReveal`, `useCountUp`, `usePageMeta`. |
| `src/router/` | Routes, 404 handling, scroll behaviour and in-page anchor helpers. |
| `api/enquiry.ts` | Vercel function behind the contact form. Sends each enquiry to the team on WhatsApp; see [WhatsApp enquiry form](#whatsapp-enquiry-form). |

## Before launch

- **Hero cards** (`stores/home.ts` → `heroCards`) repeat figures stated elsewhere on the site (10+ years, 30+ products, 99.9% uptime, the response time). Keep them in step if the numbers change.
- **Contact email** is set once, in `stores/site.ts` → `CONTACT_EMAIL` (currently `hello@buildit.com`), and used everywhere the site shows or links to an email address. Make sure it's a working inbox on a domain you own.
- **WhatsApp number** is set once, in `stores/site.ts` → `WHATSAPP_NUMBER` (digits only, for the `wa.me` links) and `WHATSAPP_DISPLAY` (as shown on the page), currently +234 816 090 5978. Keep the two in step. It's used on the contact page, in the closing call to action and in the footer. Use a number the team answers in the WhatsApp or WhatsApp Business app (a number registered only to the WhatsApp Cloud API can't be answered from a phone), and reply within the same response time as email.
- **Testimonials** (`stores/site.ts`) are drafted quotes for Ikenna (Mobiey), Ajie Takon (Kashia) and Costly Ayang (Expensive Group). Get each person's written approval of the exact wording before launch. The "Trusted by teams at" names come from the success stories in `stores/work.ts`, so they stay in step automatically.
- **Response time** is set once, in `stores/site.ts` → `RESPONSE_TIME` (currently 24 hours), and used everywhere the site mentions it. Only promise a time the team always meets.
- **Enterprise commitments** (`stores/platform.ts` → `assurance`, and the contact page list in `stores/pages.ts`): confidentiality and NDAs on request, a named project lead, client ownership of code and designs, monitoring, and support response times agreed up front. Confirm the team honours each one before launch.
- **Speed promises** (`stores/platform.ts`): "Launch in weeks, not months", "working progress every week" and "a clear plan, timeline and price" describe how you work. Confirm they match your typical projects, or swap in your real numbers.
- **Legal pages** (`stores/pages.ts`) are a draft that describes how the site works today: no cookies or analytics, and one contact form that sends enquiries to the team on WhatsApp. Have them reviewed, and update them if you add analytics or change what the form collects.
- **Enquiry form** needs a permanent WhatsApp token and an approved message template before it can send anything. See below.

## WhatsApp enquiry form

The form on `/contact` posts to `api/enquiry.ts`, a Vercel function that sends each enquiry to the team as a WhatsApp message through the WhatsApp Cloud API. The function checks the details, then sends the team's numbers an approved template message with the visitor's name, WhatsApp number, project type and message. Nothing is stored, and the API token never reaches the browser. If sending fails, the form asks the visitor to try again or use the contact email.

To set it up:

1. **Get a token that doesn't expire.** In Meta Business Settings, go to Users → System users, add a system user, give it access to your app and your WhatsApp account, and generate a token with the `whatsapp_business_messaging` and `whatsapp_business_management` permissions. Tokens copied from the app's API Setup page stop working after about a day.
2. **Create the alert template.** In WhatsApp Manager → Message templates, create a **Utility** template named `new_enquiry_alert` in English, with this body, and wait for Meta to approve it:

   ```text
   New enquiry from the BuildIt website.

   Name: {{1}}
   WhatsApp: {{2}}
   Looking for: {{3}}
   Message: {{4}}

   Please reply within 24 hours.
   ```

3. **Set the variables** in `.env` for local testing (`.env.example` lists them) and in the Vercel project for the live site, e.g. `npx vercel env add WHATSAPP_TOKEN production`. Never prefix them with `VITE_`, or Vite would publish them in the site's JavaScript.

| Variable | Value |
| --- | --- |
| `WHATSAPP_TOKEN` | The system user token. |
| `WHATSAPP_PHONE_NUMBER_ID` | The sending number's ID, from the app's API Setup page or WhatsApp Manager. It's an ID, not the phone number. |
| `WHATSAPP_ALERT_TO` | The team numbers to alert: international format, digits only, comma-separated (e.g. `2348160905978`). |
| `WHATSAPP_ALERT_TEMPLATE` | Optional. Defaults to `new_enquiry_alert`. |
| `WHATSAPP_TEMPLATE_LANGUAGE` | Optional. Defaults to `en`; it must match the template's language (`en_US` if you picked English (US)). |

While you're sending from Meta's test number, every number in `WHATSAPP_ALERT_TO` must be on that test number's list of allowed recipients (five at most).

`pnpm dev` and `pnpm preview` run the function too (see `vite.config.ts`), using the variables in `.env`, so you can try the form locally. Errors from the WhatsApp API appear in the terminal there, and in the function's logs on Vercel.

The only spam protection is a hidden field that bots fill in and people never see. If spam gets through, add a rate-limiting rule in Vercel's firewall, or Cloudflare Turnstile.

## Deploying

The site is hosted on Vercel as the `build-it` project, live at https://build-it-xi-seven.vercel.app. This folder is linked to it through `.vercel/`, which is git-ignored. `vercel.json` sends every path that isn't a file or under `/api/` to `index.html`, so deep links and page refreshes work with the site's real URLs (such as `/products/build`). It also caches the hashed files in `/assets` for a year and adds basic security headers.

The site is built locally and the finished files are uploaded, because Vercel's build servers may not support the pnpm version this project pins. To publish a new version:

```bash
npx vercel build --prod
npx vercel deploy --prebuilt --prod
```

Elsewhere, configure the host the same way: on Netlify, add `/* /index.html 200`; on nginx, use `try_files $uri /index.html;`.
