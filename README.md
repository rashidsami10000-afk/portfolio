# Personal Portfolio — Rashid Ali

Astro + Tailwind CSS static portfolio, deployed to GitHub Pages.

**Live:** https://rashidsami10000-afk.github.io/portfolio/

## How to run locally

```bash
cd portfolio
npm install
npm run dev
```

Open http://localhost:4321/portfolio/ (the site is built with `base: '/portfolio'`).

To preview the exact production output:

```bash
npm run build
npm run preview
```

## How to edit content

- **Add a project**: create a new `.md` file in `src/content/projects/`. Required frontmatter: `title`, `summary`, `tech`, `image`, `code`, `demo`, `paper`, `slug`. The file name becomes the URL (`spam-filter.md` → `/portfolio/projects/spam-filter/`).
- **Change the bio**: edit `src/pages/about.astro`.
- **Swap the resume**: replace `public/assets/resume.pdf` with your own PDF (keep the same file name).
- **Contact details**: edit `src/pages/contact.astro`.
- **Site URL / base path**: `site` and `base` in `astro.config.mjs`.
- **Styling**: `src/styles/global.css` and Tailwind classes in the components.

### Internal links

Because the site is served from a sub-path, internal links must go through the
`withBase()` helper:

```astro
import { withBase } from '../utils/paths';
<a href={withBase('/projects')}>Projects</a>
```

`scripts/check-links.cjs` fails the check if any built page contains an internal
link that is missing the base prefix.

## Checks

```bash
npm run build
npm run check:links
```

Lighthouse (production build) scores: Accessibility 100, Best Practices 100, SEO 100.

## How to deploy

GitHub Pages via GitHub Actions (already configured):

1. Push to `main`.
2. `.github/workflows/deploy.yml` builds the site and deploys it.
3. Live URL: https://rashidsami10000-afk.github.io/portfolio/

Pages settings must be **Source: GitHub Actions** (`build_type: workflow`). The
legacy `pages-build-deployment` (Jekyll) workflow is not used and any old run of
it can be ignored.

## Remaining placeholders

- Project images (currently Unsplash URLs) and project code/demo/paper links.
- `public/assets/resume.pdf` is a placeholder PDF.
- `rashid.ali@example.com` in `src/pages/contact.astro`.
- About bio and skills list.
- `public/og-image.svg` social preview image.
