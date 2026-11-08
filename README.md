# Personal Portfolio - Rashid Ali

## How to run locally

```bash
cd portfolio
npm install
npm run dev
```

Open http://localhost:4321 in your browser.

## How to edit content

- **Add a project**: Create a new `.md` file in `src/content/projects/` with the frontmatter fields: title, summary, tech, image, code, demo, paper, slug.
- **Change the bio**: Edit `src/pages/about.astro`.
- **Swap the resume**: Replace `assets/resume.pdf` with your own PDF.
- **Update site config**: Edit `astro.config.mjs` for site URL and other settings.

## How to deploy

### Option 1: GitHub Pages (free, public repo)
1. Create a public GitHub repo named `portfolio`.
2. Push this folder: `git push -u origin main`.
3. In repo settings → Pages → Source: GitHub Actions.
4. The workflow in `.github/workflows/deploy.yml` will build and deploy automatically on every push.
5. Live URL: `https://rashidali.github.io/portfolio`.

### Option 2: Vercel (free, private repo support)
1. Create a private GitHub repo named `portfolio`.
2. Push this folder: `git push -u origin main`.
3. Go to vercel.com → New Project → import the repo → deploy.
4. Live URL: `https://portfolio-<hash>.vercel.app`.