import type { L10n, LanguageSkill, LinkRef, Venture } from '../types'

export const profile = {
  name: 'Allan Bolaños B.',
  shortName: 'Allan Bolaños',
  location: { es: 'Costa Rica', en: 'Costa Rica' } satisfies L10n,
  email: 'adbyb.es@gmail.com',
  phone: '+506 6166 7902',

  /** The one-line hybrid positioning. */
  role: {
    es: 'Ingeniero de software · Investigador en series temporales',
    en: 'Software engineer · Time-series researcher',
  } satisfies L10n,

  /** Hero statement — the thesis that joins both halves. */
  thesis: {
    es: 'Construyo sistemas que llegan a producción y estudio las señales que los sistemas producen.',
    en: 'I build systems that reach production, and study the signals those systems produce.',
  } satisfies L10n,

  intro: {
    es: 'Mi trabajo vive en dos frentes que se alimentan mutuamente: arquitectura backend y desarrollo full-stack por un lado, y detección de puntos de cambio y anomalías en series temporales biomédicas por el otro. Lo que aprendo midiendo sistemas reales lo llevo a la investigación, y lo que valido en investigación termina en código que alguien usa.',
    en: 'My work runs on two fronts that feed each other: backend architecture and full-stack development on one side, change point and anomaly detection in biomedical time series on the other. What I learn measuring real systems goes into the research, and what I validate in research ends up as code someone uses.',
  } satisfies L10n,

  about: {
    es: 'Soy estudiante de Ingeniería en Computación en el Tecnológico de Costa Rica (graduación esperada 2027) y asistente de investigación en análisis de series temporales aplicado a datos biomédicos. En paralelo trabajo como ingeniero backend y arquitecto de software, diseñando servicios que aguantan carga real.\n\nMe interesa la frontera donde el rigor estadístico se encuentra con la ingeniería que se despliega: modelos que detectan arritmias a partir de señales cardíacas, algoritmos de change point detection evaluados bajo ruido alto, lenguajes de dominio específico para bioinformática, y sistemas multi-agente con RAG. También diseño y despliego productos completos, desde APIs en Node hasta apps móviles en Kotlin.\n\nAprendo rápido, itero más rápido y mantengo las cosas simples.',
    en: 'I am a Computer Engineering student at Tecnológico de Costa Rica (expected 2027) and a research assistant in time series analysis applied to biomedical data. In parallel I work as a backend engineer and software architect, designing services that hold up under real load.\n\nI am drawn to the boundary where statistical rigor meets engineering that actually ships: models that detect arrhythmias from cardiac signals, change point detection algorithms evaluated under high noise, domain-specific languages for bioinformatics, and multi-agent systems with RAG. I also design and deploy complete products, from Node APIs to Kotlin mobile apps.',
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
    href: 'https://philoneural-landing.vercel.app',
  },
  {
    id: 'sibora',
    name: 'Siböra',
    tagline: {
      es: 'Eco-tech: sostenibilidad, tecnología y gamificación.',
      en: 'Eco-tech: sustainability, technology and gamification.',
    },
  },
]
