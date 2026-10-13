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
    es: 'Investigador en IA y neuroingeniería · Ingeniero de software · Construyendo startups',
    en: 'AI & neuroengineering researcher · Software engineer · Building startups',
  } satisfies L10n,

  /** Hero statement — the thesis that joins both halves. */
  thesis: {
    es: 'Estudio cómo cambian las señales del cuerpo y del cerebro, y construyo los sistemas que convierten esa ciencia en algo que la gente usa.',
    en: 'I study how the signals of the body and the brain change, and build the systems that turn that science into something people use.',
  } satisfies L10n,

  intro: {
    es: 'Mi trabajo vive en dos frentes que se alimentan mutuamente: arquitectura backend y desarrollo full-stack por un lado, y detección de puntos de cambio y anomalías en series temporales biomédicas por el otro. Lo que aprendo midiendo sistemas reales lo llevo a la investigación, y lo que valido en investigación termina en código que alguien usa.',
    en: 'My work runs on two fronts that feed each other: backend architecture and full-stack development on one side, change point and anomaly detection in biomedical time series on the other. What I learn measuring real systems goes into the research, and what I validate in research ends up as code someone uses.',
  } satisfies L10n,

  about: {
    es: 'Soy estudiante de Ingeniería en Computación en el Tecnológico de Costa Rica (graduación esperada 2027) y asistente de investigación en análisis de series temporales aplicado a datos biomédicos. En paralelo trabajo como ingeniero backend y arquitecto de software, diseñando servicios que aguantan carga real.\n\nMe interesa la frontera donde el rigor estadístico se encuentra con la ingeniería que se despliega: modelos que detectan arritmias a partir de señales cardíacas, algoritmos de change point detection evaluados bajo ruido alto, lenguajes de dominio específico para bioinformática, y sistemas multi-agente con RAG. También diseño y despliego productos completos, desde APIs en Node hasta apps móviles en Kotlin.\n\nMe encantan los problemas difíciles, la ciencia que no cabe en un tweet y la energía de construir algo desde cero a las 2 a.m. con un equipo que cree en lo mismo. Amo lo que hago.',
    en: 'I am a Computer Engineering student at Tecnológico de Costa Rica (expected 2027) and a research assistant in time series analysis applied to biomedical data. In parallel I work as a backend engineer and software architect, designing services that hold up under real load.\n\nI am drawn to the boundary where statistical rigor meets engineering that actually ships: models that detect arrhythmias from cardiac signals, change point detection algorithms evaluated under high noise, domain-specific languages for bioinformatics, and multi-agent systems with RAG. I also design and deploy complete products, from Node APIs to Kotlin mobile apps.\n\nI love hard problems, science that does not fit in a tweet, and the energy of building something from zero at 2 a.m. with a team that believes in the same thing. I love what I do.',
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
    id: 'philoneural',
    name: 'Philoneural',
    tagline: {
      es: 'Investigación e ingeniería en sistemas cognitivos.',
      en: 'Research and engineering in cognitive systems.',
    },
    problem: {
      es: 'La IA actual imita la cognición sin entenderla. La neurociencia la entiende, pero rara vez la convierte en sistemas.',
      en: 'Today’s AI imitates cognition without understanding it. Neuroscience understands it, but rarely turns it into systems.',
    },
    bet: {
      es: 'Modelar el cerebro como un sistema dinámico — resiliencia, memoria, adaptación — y construir arquitecturas a partir de eso. CORA y EMBER son los primeros prototipos.',
      en: 'Model the brain as a dynamical system — resilience, memory, adaptation — and build architectures from it. CORA and EMBER are the first prototypes.',
    },
    stage: { es: 'Investigación → prototipo', en: 'Research → prototype' },
    href: 'https://philoneural-landing.vercel.app',
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
