// src/data/resume.ts
// Single source of truth for the downloadable resume (PDF generated from this data).
// Leave a field as an empty string to omit it — nothing is rendered for blanks.

export const contact = {
  name: 'Rashid Ali',
  headline: 'Artificial Intelligence Undergraduate',
  specialty: 'Machine Learning · Data · Web Development',
  email: 'rashidsami10000@gmail.com',
  location: 'Pakistan',
  /** e.g. '+92 300 1234567' */
  phone: '',
  github: 'rashidsami10000-afk',
  website: 'rashidsami10000-afk.github.io/portfolio',
  linkedin: 'https://www.linkedin.com/in/rashid-ali-9445903a1/',
};

export const summary =
  'Artificial Intelligence undergraduate who builds machine-learning systems end to end: ' +
  'the models, the pipelines that feed them, and the interfaces people use to run them. ' +
  'Works mainly in Python and C++, with project experience in scikit-learn, Apache Kafka, ' +
  'and full-stack web development.';

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
    name: 'AI Spam Filter',
    tech: 'Python · scikit-learn · FastAPI',
    points: [
      'Built and evaluated a text-classification model that separates spam from legitimate email at 98% accuracy.',
      'Served predictions through a FastAPI endpoint so other applications can call the model directly.',
    ],
  },
  {
    name: 'Real-Time Spam Detection',
    tech: 'Python · Apache Kafka · Spark Streaming',
    points: [
      'Moved spam scoring from batch to streaming: incoming mail is published to a Kafka topic and classified as it arrives.',
      'Used Spark Streaming to consume the topic and score messages without a batch delay.',
    ],
  },
  {
    name: 'IoT Home Automation',
    tech: 'Node.js · MQTT · React · Raspberry Pi',
    points: [
      'Connected Raspberry Pi devices over MQTT with a React dashboard for control and live device status.',
      'Owned the path from device messaging through to the interface used to operate it.',
    ],
  },
  {
    name: 'Portfolio Website',
    tech: 'Astro · TypeScript · Tailwind CSS',
    points: [
      'Designed and built a static portfolio with a custom editorial design system and self-hosted webfonts.',
      'Automated builds and deployment to GitHub Pages with GitHub Actions.',
    ],
  },
];

export const additional = [
  'Contributes to open-source projects and follows applied machine-learning research to stay current.',
  'Helps newer developers get started with programming fundamentals.',
];

/** Label for the "last updated" note shown on the web resume page. */
export const updated = 'November 2026';
