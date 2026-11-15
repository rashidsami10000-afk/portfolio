// src/data/skills.ts
// Single source of truth for skills and the homepage stack marquee.

export interface SkillGroup {
  label: string;
  value: string;
}

export const skillGroups: SkillGroup[] = [
  { label: 'Languages', value: 'C++, C#, Python, SQL, TypeScript' },
  { label: 'CS foundations', value: 'Data structures, algorithms, OOP, programming fundamentals' },
  { label: 'Databases', value: 'Relational modeling, SQL, schema design' },
  { label: 'Web design', value: 'Layout, typography, responsive UI' },
  { label: 'Web development', value: 'HTML, CSS, Astro, Tailwind CSS' },
];

export const stack: string[] = [
  'C++',
  'C#',
  'Python',
  'SQL',
  'TypeScript',
  'scikit-learn',
  'pandas',
  'Jupyter',
  '.NET',
  'WPF',
  'SQLite',
  'HTML/CSS',
  'Astro',
  'Tailwind CSS',
  'Git',
];
