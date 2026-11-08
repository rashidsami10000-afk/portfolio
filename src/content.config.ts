// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tech: z.string(),
    image: z.string(),
    code: z.string(),
    demo: z.string(),
    paper: z.string(),
    slug: z.string(),
  }),
});

export const collections = {
  projects,
};