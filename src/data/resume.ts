// src/data/resume.ts
// Single source of truth for the downloadable resume (PDF generated from this data).
// Leave a field as an empty string to omit it — nothing is rendered for blanks.

export const contact = {
  name: 'Rashid Ali',
  headline: 'Artificial Intelligence Undergraduate',
  specialty: 'Machine Learning · Data · Web Development',
  email: 'rashidsami10000@gmail.com',
  /** e.g. 'Lahore, Pakistan' — left empty, omitted from the resume */
  location: '',
  /** e.g. '+92 300 1234567' */
  phone: '',
  github: 'rashidsami10000-afk',
  website: 'rashidsami10000-afk.github.io/portfolio',
  linkedin: 'https://www.linkedin.com/in/rashid-ali-9445903a1/',
};

export const summary =
  'Artificial Intelligence undergraduate who builds machine-learning systems end to end: ' +
  'the models, the pipelines that feed them, and the interfaces people use to run them. ' +
  'Works mainly in Python and C++, with project experience in scikit-learn, pandas, SQL, ' +
  'and front-end development.';

export const education = [
  {
    school: 'University of Malakand',
    degree: 'BS Artificial Intelligence',
    period: 'In progress',
    detail: 'Focus on machine learning and applied AI',
    coursework:
      'Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Programming Fundamentals',
  },
];

export const projects = [
  {
    name: 'Refresh Opportunity Model — FlyRank',
    tech: 'Python · pandas · scikit-learn',
    points: [
      'Built a page-month panel of 101,441 pages from ~79M rows of production search data and ranked which pages need review first.',
      'Shipped a transparent hand rule at P@50 0.92 against a 0.48 base rate; it matched a cross-validated logistic regression (0.952 ± 0.033), so the simpler model went live.',
      'Validated with client-grouped splits and a planted-leak harness that caught a feature inflating P@50 to 1.0.',
    ],
  },
  {
    name: 'Lawyer Case Manager',
    tech: 'C# · .NET 8 · WPF · SQLite',
    points: [
      'Offline Windows application replacing a legal paper notebook: cases, clients, notes timeline, linked documents and a court calendar.',
      'Designed a four-table SQLite schema with enforced foreign keys and cascade rules, behind roughly 550 lines of data access.',
    ],
  },
  {
    name: 'Portfolio & Design System',
    tech: 'Astro · TypeScript · Tailwind CSS',
    points: [
      'Custom editorial design system with self-hosted webfonts, a typed content collection and static deployment to GitHub Pages.',
      'Generates the résumé PDF from one data file, so the web résumé, print sheet and download stay in sync.',
    ],
  },
];

export const additional = [
  'Ships personal projects end to end: data preparation, model evaluation, interface and deployment.',
  'Interested in ranking and retrieval systems, and in keeping model output reviewable by humans.',
];

/** Label for the "last updated" note shown on the web resume page. */
export const updated = 'November 2026';
