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

1. Push the `portfolio` folder to a GitHub repository.
2. Enable GitHub Pages in repository settings, using the `dist` folder as the source.
3. Run `npm run build` to generate the static site in `dist/`.
4. Push the `dist` folder contents to the `gh-pages` branch.

Alternatively, use Vercel or Netlify for automatic deployment.