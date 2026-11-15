---
title: "Portfolio & Design System"
summary: "This site: an editorial design system in Astro, and a résumé PDF generated from the same data file the pages render from."
year: "2026"
role: "Design and build"
tech: "Astro · TypeScript · Tailwind CSS"
image: "/images/projects/portfolio-site.jpg"
imageAlt: "The portfolio homepage: a cream page with tight uppercase display type reading 'I build systems that learn.'"
code: "https://github.com/rashidsami10000-afk/portfolio"
demo: "https://rashidsami10000-afk.github.io/portfolio/"
slug: "portfolio-site"
---

## The problem

A portfolio has one job: make a stranger believe the work is real. Most of them fail at the same two points — they look like the template they were built from, and they describe projects in adjectives instead of evidence.

## What I built

An editorial design system in Astro and Tailwind: a cream-and-ink palette, one display face at tight tracking, monospace for labels, a floating pill header, and a list-based work index rather than a card grid. Self-hosted webfonts, no client-side framework, and a content collection so a case study is a Markdown file with a typed schema rather than a page of hardcoded JSX.

The résumé is the part I would keep. One TypeScript file holds the contact block, summary, education, skills and projects; the web résumé, the A4 print sheet and the downloadable PDF all render from it. The PDF is printed from the print page by headless Edge over the DevTools protocol, which is why the text stays selectable and machine-readable rather than becoming an image of a résumé.

## Result

Statically built and deployed to GitHub Pages by Actions on every push: `astro build`, then a link check that fails the job if an internal URL is missing the `/portfolio` base path. Lighthouse scores 100 for accessibility, best practices and SEO on every page, with a skip link, visible focus rings and a reduced-motion path.

## What I'd change

Lighthouse still runs on my laptop rather than in CI, so an accessibility regression can reach production and wait for me to notice — it belongs next to the link check as a deploy blocker. I would also push harder on the case-study format itself: the strongest version of this site is not a page about a project, but a page that hands over the artefact and the number that proves it.
