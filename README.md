# Personal Portfolio — Rashid Ali

Editorial-style portfolio for an ML engineer and researcher. Built with Astro and
Tailwind CSS, deployed as a static site to GitHub Pages.

**Live:** https://rashidsami10000-afk.github.io/portfolio/

## Design

The visual language is bold editorial: oversized tight uppercase headlines, a warm
cream/ink palette with red and lime accents, monospaced micro-labels, a floating pill
header, list-based project rows, and scroll-triggered reveals.

### Palette

Defined once as Tailwind theme tokens in `src/styles/global.css`:

| Token          | Value     | Used for                        |
| -------------- | --------- | ------------------------------- |
| `paper`        | `#f9f4eb` | Page background                 |
| `paper-dim`    | `#f1ebe0` | Panels, image placeholders      |
| `ink`          | `#1a1c1c` | Body text, dark sections        |
| `red`          | `#e75d60` | Accents, hover states           |
| `lime`         | `#d0ff7e` | Highlights, focus moments       |
| `ice`          | `#dcf2f4` | Optional cool accent            |
| `line`         | `#d8d0c2` | Hairline rules                  |

Sections flip between paper and ink with `.section--dark`; there is no light/dark
theme toggle anymore.

### Typography

- **Display / body:** Inter Tight (variable, 400–700), self-hosted at
  `public/fonts/inter-tight-latin.woff2`.
- **Micro-labels:** JetBrains Mono (400/500), self-hosted at
  `public/fonts/jetbrains-mono-latin.woff2`.

Both fonts are licensed under the SIL Open Font License 1.1. They are redistributed
here as latin-subset `.woff2` files, so the site makes no third-party font requests.
Type utilities include `.display-1` through `.display-4`, `.lede`, `.copy`, `.mono`,
`.label`, and `.statement`.

### Layout primitives

- `.shell` — horizontal page padding, driven by `--shell-x`.
- `.section` / `.section--tight` — fluid vertical rhythm from the spacing scale.
- `.grid-12` — 6-column mobile / 12-column desktop grid.
- `.split`, `.panel`, `.stack-list`, `.prose-block` — shared content blocks.
- `.work-row`, `.service`, `.fact-grid` — list-based content patterns.
- `.marquee` — CSS-only infinite marquee (mono and display variants).
- `.cursor-preview` — desktop-only image that follows the cursor over project rows.

### Components

| File                              | Purpose                                              |
| --------------------------------- | ---------------------------------------------------- |
| `src/components/Layout.astro`     | Head/meta, fonts, header, footer, all client-side JS |
| `src/components/Header.astro`     | Floating pill nav, status dot, fullscreen menu       |
| `src/components/Footer.astro`     | Display marquee, email CTA, links, local clock       |
| `src/components/WorkRow.astro`    | Project list row + hover preview source              |
| `src/components/Marquee.astro`    | Repeating text marquee                               |
| `src/components/MicroLabel.astro` | Bracketed monospaced label                           |

`src/components/ProjectCard.astro` is the original card component and is currently
unused; it is kept for reference.

### Motion and accessibility

The only client-side JavaScript lives inline in `Layout.astro` and does five small
things: open/close the menu (with `inert`, ESC, and focus restore), reveal sections
with `IntersectionObserver`, update the scroll-progress bar, move the cursor preview,
and tick the local clock. No animation library is used.

- Skip link, visible focus rings, and logical landmarks are in place.
- The menu is keyboard operable and restores focus on close.
- All animation is disabled or flattened under `prefers-reduced-motion: reduce`.
- The cursor preview only activates for fine pointers at desktop widths.
- The viewport is not zoom-blocked.

## How to run locally

```bash
npm install
npm run dev
```

Open http://localhost:4321/portfolio/ (the site is built with `base: '/portfolio'`).

To preview the exact production output:

```bash
npm run build
npm run preview
```

### Windows note

On some managed Windows machines, Application Control blocks the native
`rolldown`/`satteri` binaries that Astro 7 uses, and `npm run build` fails with
`Cannot find native binding`. This affects local builds only; GitHub Actions on
Linux builds normally.

If you hit it, you can either build in a Linux container/CI, or validate in a
scratch copy pinned to Astro 5:

```powershell
# copy the project to a temp folder, then:
# set "astro": "^5.14.0" and "@astrojs/sitemap": "^3.6.0" in package.json
npm install
npx astro build
```

Do not commit that pin — the repository itself stays on Astro 7.

## How to edit content

- **Add a project:** create a new `.md` file in `src/content/projects/`. Required
  frontmatter: `title`, `summary`, `tech`, `image`, `code`, `demo`, `paper`, `slug`
  — plus optional `imageAlt`, `imageCredit`, `imageCreditUrl`. The file name becomes
  the URL (`spam-filter.md` → `/portfolio/projects/spam-filter/`).
- **Project images:** stored in `public/images/projects/` and referenced as
  `/images/projects/<name>.jpg`. The current images are free-to-use Unsplash photos,
  credited on each project page.
- **Homepage copy:** `src/pages/index.astro` (headline, approach statement, services,
  stack marquee, about teaser).
- **Change the bio:** `src/pages/about.astro`.
- **Portrait:** replace `src/assets/rashid-portrait.jpg` (4:5 portrait works best; the
  About page crops it with `object-position` and applies a warm monochrome treatment).
- **Skills and stack:** `src/data/skills.ts` drives the About Toolkit, the Resume
  “Technical skills” section, and the homepage stack marquee.
- **Swap the resume:** replace `public/assets/resume.pdf` with your own PDF (keep the
  same file name).
- **Contact details:** `src/pages/contact.astro` and the email/GitHub/LinkedIn
  constants in `src/components/Header.astro` and `src/components/Footer.astro`.
- **Site URL / base path:** `site` and `base` in `astro.config.mjs`. If the base path
  changes, also update the two `url("/portfolio/fonts/...")` values in `global.css`.
- **Styling:** design tokens and component styles in `src/styles/global.css`; layout
  composition in the pages and components.

### Internal links

Because the site is served from a sub-path, internal links must go through the
`withBase()` helper:

```astro
import { withBase } from '../utils/paths';
<a href={withBase('/projects')}>Projects</a>
```

`scripts/check-links.cjs` fails if any built page contains an internal link that is
missing the base prefix.

## Checks

```bash
npm run build
npm run check:links
```

Lighthouse (production build, desktop) currently scores **100** for Accessibility,
Best Practices, and SEO on every page.

## How to deploy

GitHub Pages via GitHub Actions (already configured):

1. Push to `main`.
2. `.github/workflows/deploy.yml` builds the site and deploys it.
3. Live URL: https://rashidsami10000-afk.github.io/portfolio/

Pages settings must be **Source: GitHub Actions** (`build_type: workflow`). The
legacy `pages-build-deployment` (Jekyll) workflow is not used and any old run of it
can be ignored.

## Remaining placeholders

- Project code/demo/paper links (`*.rashid.dev` demo URLs are samples).
- `public/assets/resume.pdf` is a placeholder PDF.
- `public/og-image.svg` social preview image.
