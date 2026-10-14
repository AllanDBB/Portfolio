import type { L10n, LanguageSkill, LinkRef, Venture } from '../types'

export const profile = {
  name: 'Allan Bolaños B.',
  shortName: 'Allan Bolaños',
  fullName: 'Allan Bolaños Barrientos',
  orcid: '0009-0007-3141-5160',
  location: { es: 'Costa Rica', en: 'Costa Rica' } satisfies L10n,
  email: 'adbyb.es@gmail.com',
  phone: '+506 6166 7902',

  /** The one-line hybrid positioning. */
  role: {
    es: 'Investigador en IA y neuroingeniería · Founder de Noddle',
    en: 'AI & neuroengineering researcher · Founder of Noddle',
  } satisfies L10n,

  /** Hero statement — the thesis that joins both halves. */
  thesis: {
    es: 'Investigo cómo la IA puede leer las señales del cerebro y del cuerpo — y construyo Noddle, la startup que fundé.',
    en: 'I research how AI can read the signals of the brain and the body — and I am building Noddle, the startup I founded.',
  } satisfies L10n,

  intro: {
    es: 'Mi trabajo vive en dos frentes que se alimentan mutuamente: arquitectura backend y desarrollo full-stack por un lado, y detección de puntos de cambio y anomalías en series temporales biomédicas por el otro. Lo que aprendo midiendo sistemas reales lo llevo a la investigación, y lo que valido en investigación termina en código que alguien usa.',
    en: 'My work runs on two fronts that feed each other: backend architecture and full-stack development on one side, change point and anomaly detection in biomedical time series on the other. What I learn measuring real systems goes into the research, and what I validate in research ends up as code someone uses.',
  } satisfies L10n,

  about: {
    es: 'Soy founder de Noddle e investigador en IA y neuroingeniería en el Tecnológico de Costa Rica, donde estudio Ingeniería en Computación (graduación esperada 2027).\n\nMi investigación busca lo que las señales del cuerpo y del cerebro dicen antes de que alguien lo note: biomarcadores de ELA en el habla, detección temprana de arritmias, memoria episódica bioinspirada para robots y el cerebro como sistema dinámico bajo estrés. Publiqué en ITISE 2026 sobre detección de puntos de cambio bajo ruido.\n\nEn paralelo construyo producto: Noddle, la startup que fundé, y antes servicios backend y arquitectura de software en producción. Me encantan los problemas difíciles, la ciencia que no cabe en un tweet y la energía de construir algo desde cero a las 2 a.m. con un equipo que cree en lo mismo. Amo lo que hago.',
    en: 'I am the founder of Noddle and an AI and neuroengineering researcher at Tecnológico de Costa Rica, where I study Computer Engineering (expected 2027).\n\nMy research looks for what the signals of the body and the brain say before anyone notices: ALS biomarkers in speech, early arrhythmia detection, bio-inspired episodic memory for robots and the brain as a dynamical system under stress. I published at ITISE 2026 on change point detection under noise.\n\nIn parallel I build product: Noddle, the startup I founded, and before that backend services and software architecture in production. I love hard problems, science that does not fit in a tweet, and the energy of building something from zero at 2 a.m. with a team that believes in the same thing. I love what I do.',
  } satisfies L10n,

  education: {
    degree: { es: 'B.Sc. Ingeniería en Computación', en: 'B.Sc. Computer Engineering' } satisfies L10n,
    school: 'Tecnológico de Costa Rica (TEC)',
    period: '2024 — 2027',
  },

  avatar: '/avatars/1.png',
} as const

export const links: LinkRef[] = [
  { label: 'GitHub', href: 'https://github.com/AllanDBB', kind: 'repo' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/allandbb', kind: 'org' },
  { label: 'Instagram', href: 'https://www.instagram.com/allandbb_', kind: 'org' },
  { label: 'ORCID', href: 'https://orcid.org/0009-0007-3141-5160', kind: 'org' },
  { label: 'Email', href: 'mailto:adbyb.es@gmail.com', kind: 'org' },
  { label: 'CV (PDF)', href: '/AllanBolanos_CV.pdf', kind: 'doc' },
]

export const languages: LanguageSkill[] = [
  {
    name: { es: 'Español', en: 'Spanish' },
    level: { es: 'Nativo', en: 'Native' },
    proficiency: 100,
  },
  {
    name: { es: 'Inglés', en: 'English' },
    level: { es: 'Profesional avanzado', en: 'Advanced professional' },
    proficiency: 85,
  },
  {
    name: { es: 'Coreano', en: 'Korean' },
    level: { es: 'Inicial', en: 'Beginner' },
    proficiency: 20,
  },
  {
    name: { es: 'Portugués', en: 'Portuguese' },
    level: { es: 'Inicial', en: 'Beginner' },
    proficiency: 20,
  },
]

/** Grouped technical skills, straight from the CV. */
export const skillGroups: { label: L10n; items: string[] }[] = [
  {
    label: { es: 'Lenguajes', en: 'Languages' },
    items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Kotlin', 'C / C++', 'SQL', 'Assembly'],
  },
  {
    label: { es: 'IA y datos', en: 'AI & data' },
    items: [
      'PyTorch',
      'PyTorch Lightning',
      'Time Series Analysis',
      'Change Point Detection',
      'Anomaly Detection',
      'Statistical Modeling',
      'RAG',
      'Hydra',
      'WandB',
    ],
  },
  {
    label: { es: 'Ciencia y neuroingeniería', en: 'Science & neuroengineering' },
    items: ['Signal Processing', 'ECG / HRV', 'Dynamical Systems', 'Computational Neuroscience', 'AlphaFold', 'Bioinformatics'],
  },
  {
    label: { es: 'Backend y sistemas', en: 'Backend & systems' },
    items: ['Node.js', 'Express', 'REST API Design', 'System Design', 'Docker', 'Microservices'],
  },
  {
    label: { es: 'Frontend', en: 'Frontend' },
    items: ['React', 'React Native', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    label: { es: 'Bases de datos', en: 'Databases' },
    items: ['MongoDB', 'MySQL', 'SQL Server', 'Firebase', 'Data Warehousing'],
  },
]

/** Discreet mention — these are initiatives, not the main event. */
export const ventures: Venture[] = [
  {
    id: 'noddle',
    name: 'Noddle',
    role: { es: 'Founder', en: 'Founder' },
    tagline: {
      es: 'La app para pedir y pagar desde la mesa, y el POS que lo recibe al instante.',
      en: 'The app to order and pay from the table, and the POS that receives it instantly.',
    },
    problem: {
      es: 'Comer afuera sigue siendo esperar: al mesero, la carta, la cuenta. Y del otro lado, el salón, la cocina y la caja viven en sistemas que no se hablan.',
      en: 'Eating out is still waiting: for the waiter, the menu, the bill. And on the other side, the floor, the kitchen and the till live in systems that do not talk to each other.',
    },
    bet: {
      es: 'Un solo producto con dos lados. El comensal decide dónde comer, escanea el QR, pide, divide la cuenta y paga con SINPE Móvil; lo que hace en la app cae en vivo en el POS — salón, cocina, caja y gerencia.',
      en: 'One product with two sides. Guests decide where to eat, scan the QR, order, split the bill and pay with SINPE Móvil; what they do in the app lands live in the POS — floor, kitchen, till and management.',
    },
    stage: { es: 'App + POS completos · acceso anticipado', en: 'App + POS complete · early access' },
    href: 'https://noddleapp.com',
  },
  {
    id: 'sibora',
    name: 'Siböra',
    tagline: {
      es: 'Eco-tech: sostenibilidad, tecnología y gamificación.',
      en: 'Eco-tech: sustainability, technology and gamification.',
    },
    problem: {
      es: 'Todos sabemos qué hábitos son sostenibles; casi nadie los sostiene.',
      en: 'Everyone knows which habits are sustainable; almost no one sustains them.',
    },
    bet: {
      es: 'Convertir la sostenibilidad en un juego con datos reales detrás: que el progreso se vea, se mida y se comparta.',
      en: 'Turn sustainability into a game with real data behind it: progress you can see, measure and share.',
    },
    stage: { es: 'Concepto → producto', en: 'Concept → product' },
  },
]
