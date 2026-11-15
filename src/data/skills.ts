// src/data/skills.ts
// Single source of truth for skills and the homepage stack marquee.

export interface SkillGroup {
  label: string;
  value: string;
}

export const skillGroups: SkillGroup[] = [
  { label: 'Languages', value: 'C++, C#, Python, SQL, TypeScript' },
  { label: 'Data analysis', value: 'NumPy, pandas, Matplotlib, Seaborn, Jupyter' },
  { label: 'Machine learning', value: 'scikit-learn, feature engineering, model evaluation' },
  { label: 'Databases', value: 'Relational modeling, SQL, schema design' },
  { label: 'CS foundations', value: 'Data structures, algorithms, OOP, programming fundamentals' },
  { label: 'Web design & development', value: 'Responsive layout & typography; HTML, CSS, Astro, Tailwind CSS' },
];

export const stack: string[] = [
  'C++',
  'C#',
  'Python',
  'SQL',
  'TypeScript',
  'scikit-learn',
  'pandas',
  'NumPy',
  'Matplotlib',
  'Seaborn',
  'Jupyter',
  '.NET',
  'WPF',
  'SQLite',
  'HTML/CSS',
  'Astro',
  'Tailwind CSS',
  'Git',
];
