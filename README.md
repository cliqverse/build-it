# BuildIt — marketing site

Multi-page marketing site for BuildIt, built with Vue 3 (`<script setup>` + TypeScript), Vite, Vue Router 4, Pinia and Tailwind CSS v4.
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

The chips under the home headline link to `/contact?need=<id>`; the contact page then shows the chosen project type and pre-fills the email subject with it. The list lives in `stores/site.ts` → `projectTypes`.

## Where things live

| Path | Purpose |
| --- | --- |
| `src/stores/` | **All copy, links and content.** `site.ts` holds the brand, navigation, footer, closing call to action and testimonials; the others hold one page each. Nothing is hard-coded in templates. |
| `src/types/content.ts` | Types for the content model. |
| `src/assets/work/` | Desktop and phone screenshots of the live products on the Success stories page (WebP). Retake them when an app's design changes. |
| `src/styles/main.css` | Tailwind v4 entry: `@theme` tokens (violet and maroon scales, paper neutrals, type scale), the `marker` highlight utility, and WCAG contrast notes. |
| `src/components/layout/` | `SiteHeader` (with the "What we build" dropdown), `NavDropdown`, `SiteFooter`, `PageHero` (flat violet header for inner pages). |
| `src/components/sections/` | Page sections. Shared ones (`OfferingsSection`, `SpeedSection`, `PracticesSection`, `PhasesSection`, `WorkSection`) take their copy as props. |
| `src/components/blocks/` | `HeroCard`, `StatBlock`, `PhaseCard`, `WorkCard`, `TestimonialCard`, `PlatformDiagram`. |
| `src/components/ui/` | Primitives: `BaseButton` (`primary` / `dark` / `outline` on light surfaces; `light` / `outline-light` on violet, maroon or ink), `AppLink`, `SectionHeading`, `IconBadge`, `AppIcon`, `BrandLogo`, `MonogramAvatar`, `RevealOnScroll`. |
| `src/composables/` | `useScrollReveal`, `useCountUp`, `usePageMeta`. |
| `src/router/` | Routes, 404 handling, scroll behaviour and in-page anchor helpers. |

## Before launch

- **Hero cards** (`stores/home.ts` → `heroCards`) repeat figures stated elsewhere on the site (10+ years, 30+ products, 99.9% uptime, the response time). Keep them in step if the numbers change.
- **Contact email** is set once, in `stores/site.ts` → `CONTACT_EMAIL` (currently `hello@buildit.com`), and used everywhere the site shows or links to an email address. Make sure it's a working inbox on a domain you own.
- **Placeholders** in the stores: the testimonials, including the people and companies they're attributed to. Use only real quotes you have permission to publish. The "Trusted by teams at" names come from the success stories in `stores/work.ts`, so they stay in step automatically.
- **Response time** is set once, in `stores/site.ts` → `RESPONSE_TIME` (currently 24 hours), and used everywhere the site mentions it. Only promise a time the team always meets.
- **Enterprise commitments** (`stores/platform.ts` → `assurance`, and the contact page list in `stores/pages.ts`): confidentiality and NDAs on request, a named project lead, client ownership of code and designs, monitoring, and support response times agreed up front. Confirm the team honours each one before launch.
- **Speed promises** (`stores/platform.ts`): "Launch in weeks, not months", "working progress every week" and "a clear plan, timeline and price" describe how you work. Confirm they match your typical projects, or swap in your real numbers.
- **Legal pages** (`stores/pages.ts`) are a draft that describes how the site works today: no cookies, analytics or forms. Have them reviewed, and update them if you add analytics or a contact form.

## Deploying

The site uses HTML5 history mode with real URLs such as `/products/build`. Configure your host to serve `index.html` for any path that isn't a file, so that deep links and page refreshes work. On Netlify, add `/* /index.html 200`; on Vercel, add a rewrite to `/index.html`; on nginx, use `try_files $uri /index.html;`.
