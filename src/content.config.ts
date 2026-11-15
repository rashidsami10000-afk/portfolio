// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.string(),
    role: z.string(),
    tech: z.string(),
    /** Hero image, relative to /public. Omit to render a typographic plate instead. */
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    /** Set only for photographs that are not the author's own work. */
    imageCredit: z.string().optional(),
    imageCreditUrl: z.string().optional(),
    code: z.string().url().optional(),
    demo: z.string().url().optional(),
    report: z.string().url().optional(),
    /** Evidence figures rendered below the case study body. */
    figures: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        }),
      )
      .optional(),
    slug: z.string(),
  }),
});

export const collections = {
  projects,
};
