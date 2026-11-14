// src/data/skills.ts
// Single source of truth for skills and the homepage stack marquee.

export interface SkillGroup {
  label: string;
  value: string;
}

export const skillGroups: SkillGroup[] = [
  { label: 'Languages', value: 'C++, Python, SQL, TypeScript' },
  { label: 'CS foundations', value: 'Data structures, algorithms, OOP, programming fundamentals' },
  { label: 'Databases', value: 'Relational modeling, SQL, schema design' },
  { label: 'Web design', value: 'Layout, typography, responsive UI' },
  { label: 'Web development', value: 'HTML, CSS, React, Astro' },
];

export const stack: string[] = [
  'C++',
  'Python',
  'SQL',
  'TypeScript',
  'PyTorch',
  'scikit-learn',
  'FastAPI',
  'Kafka',
  'Spark',
  'PostgreSQL',
  'HTML/CSS',
  'React',
  'Astro',
  'Docker',
  'Linux',
];
