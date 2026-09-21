import type { Experience } from '../types'

/** Reverse-chronological. Source of truth: AllanBolanos_CV.pdf */
export const experience: Experience[] = [
  {
    id: 'tec-biomedical',
    role: {
      es: 'Asistente de investigación en IA — Series temporales biomédicas y detección de arritmias',
      en: 'AI Research Assistant — Biomedical Time Series & Arrhythmia Detection',
    },
    org: 'Tecnológico de Costa Rica',
    orgUrl: 'https://www.tec.ac.cr',
    mode: { es: 'Medio tiempo · Remoto', en: 'Part-time · Remote' },
    start: '2025-12',
    end: null,
    track: 'research',
    summary: {
      es: 'Diseño y evalúo modelos de machine learning para la detección temprana de eventos arrítmicos a partir de señales cardíacas.',
      en: 'I design and evaluate machine learning models for early detection of arrhythmic events from cardiac signals.',
    },
    highlights: [
      {
        es: 'Diseñé y evalué modelos de ML para detección temprana de eventos arrítmicos usando series temporales cardíacas.',
        en: 'Designed and evaluated ML models for early detection of arrhythmic events using cardiac time series.',
      },
      {
        es: 'Apliqué técnicas de change point detection y anomaly detection para identificar patrones fisiológicos anormales.',
        en: 'Applied change point and anomaly detection techniques to identify abnormal physiological patterns.',
      },
      {
        es: 'Procesé datasets reales de frecuencia cardíaca y derivados de ECG, mejorando la robustez de la señal bajo ruido.',
        en: 'Processed real-world heart rate and ECG-derived datasets, improving signal robustness under noise.',
      },
      {
        es: 'Ejecuté validación estadística y evaluación comparativa de enfoques de modelado temporal.',
        en: 'Ran statistical validation and comparative evaluation of temporal modeling approaches.',
      },
    ],
    tech: ['Python', 'Machine Learning', 'Time Series', 'Signal Processing', 'Change Point Detection'],
    image: '/images/biomedical.png',
  },
  {
    id: 'petziclub-backend',
    role: {
      es: 'Ingeniero de backend y arquitectura de software',
      en: 'Backend & Software Architecture Engineer',
    },
    org: 'Petziclub',
    orgUrl: 'https://petziclub.com',
    mode: { es: 'Remoto', en: 'Remote' },
    start: '2025-07',
    end: null,
    track: 'engineering',
    summary: {
      es: 'Defino la arquitectura de sistema y construyo los servicios backend que la sostienen.',
      en: 'I define the system architecture and build the backend services that hold it up.',
    },
    highlights: [
      {
        es: 'Arquitecté e implementé servicios backend escalables y REST APIs.',
        en: 'Architected and implemented scalable backend services and REST APIs.',
      },
      {
        es: 'Definí la arquitectura del sistema: descomposición de servicios, flujo de datos y patrones de integración.',
        en: 'Defined system architecture: service decomposition, data flow and integration patterns.',
      },
      {
        es: 'Optimicé el diseño de base de datos y el rendimiento del backend, mejorando mantenibilidad y escalabilidad.',
        en: 'Optimized database design and backend performance, improving maintainability and scalability.',
      },
      {
        es: 'Trabajé con despliegues basados en Docker y entornos de hosting en la nube.',
        en: 'Worked with Docker-based deployments and cloud hosting environments.',
      },
    ],
    tech: ['Node.js', 'Express', 'Docker', 'REST API', 'System Design', 'MongoDB'],
    image: '/images/petzibackend.png',
  },
  {
    id: 'tec-timeseries',
    role: {
      es: 'Asistente de investigación en IA — Series temporales y detección de anomalías',
      en: 'AI Research Assistant — Time Series & Anomaly Detection',
    },
    org: 'Tecnológico de Costa Rica',
    orgUrl: 'https://www.tec.ac.cr',
    mode: { es: 'Medio tiempo · Remoto', en: 'Part-time · Remote' },
    start: '2025-02',
    end: '2025-12',
    track: 'research',
    summary: {
      es: 'Comparé sistemáticamente 16 algoritmos de detección de puntos de cambio online sobre datos sintéticos y reales.',
      en: 'Systematically benchmarked 16 online change point detection algorithms across synthetic and real datasets.',
    },
    highlights: [
      {
        es: 'Evalué 16 algoritmos de change point detection online sobre datasets sintéticos y del mundo real.',
        en: 'Benchmarked 16 online change point detection algorithms across synthetic and real-world datasets.',
      },
      {
        es: 'Analicé el rendimiento de los algoritmos bajo condiciones de ruido alto, identificando trade-offs de robustez.',
        en: 'Analyzed algorithm performance under high-noise conditions, identifying robustness trade-offs.',
      },
      {
        es: 'Implementé modelos de ML para predicción de deserción y análisis de patrones de comportamiento.',
        en: 'Implemented ML models for dropout prediction and behavioral pattern analysis.',
      },
      {
        es: 'Construí una herramienta web de etiquetado para soportar flujos de entrenamiento supervisado.',
        en: 'Engineered a web-based labeling tool to support supervised training workflows.',
      },
    ],
    tech: ['Python', 'Machine Learning', 'Statistical Modeling', 'Anomaly Detection', 'React'],
    image: '/images/timeseries.png',
  },
  {
    id: 'petziclub-fullstack',
    role: { es: 'Desarrollador full-stack', en: 'Full Stack Developer' },
    org: 'Petziclub',
    orgUrl: 'https://petziclub.com',
    mode: { es: 'Remoto', en: 'Remote' },
    start: '2024-07',
    end: '2025-07',
    track: 'engineering',
    summary: {
      es: 'Construí aplicaciones completas en Node.js y React Native, del componente al servicio.',
      en: 'Built complete applications in Node.js and React Native, from component to service.',
    },
    highlights: [
      {
        es: 'Desarrollé aplicaciones full-stack con Node.js (Express) y React Native.',
        en: 'Built full-stack applications using Node.js (Express) and React Native.',
      },
      {
        es: 'Entregué componentes frontend responsivos y lógica de negocio en el backend.',
        en: 'Delivered responsive frontend components and backend business logic.',
      },
      {
        es: 'Contribuí a una arquitectura orientada a microservicios preparada para escalar.',
        en: 'Contributed to a microservices-oriented architecture built to scale.',
      },
    ],
    tech: ['Node.js', 'Express', 'React Native', 'MongoDB', 'Microservices'],
    image: '/images/petzifulstack.png',
  },
  {
    id: 'ccal',
    role: { es: 'Desarrollador full-stack', en: 'Full Stack Developer' },
    org: 'Colegio Científico de Alajuela',
    orgUrl: 'https://ccalajuela.ed.cr',
    mode: { es: 'Medio tiempo · Remoto', en: 'Part-time · Remote' },
    start: '2024-01',
    end: null,
    track: 'engineering',
    summary: {
      es: 'Desarrollo y optimizo la plataforma web institucional: −30% en tiempos de carga, −25% en latencia operacional.',
      en: 'I build and optimize the institutional web platform: −30% load times, −25% operational latency.',
    },
    highlights: [
      {
        es: 'Desarrollé y optimicé una plataforma web con React, HTML y Tailwind CSS, reduciendo los tiempos de carga en ~30%.',
        en: 'Developed and optimized a web platform with React, HTML and Tailwind CSS, cutting load times by ~30%.',
      },
      {
        es: 'Implementé un microservicio en Node.js para solicitudes de datos en tiempo real, reduciendo la latencia operacional en 25%.',
        en: 'Implemented a Node.js microservice for real-time data requests, reducing operational latency by 25%.',
      },
      {
        es: 'Diseñé una arquitectura modular que mejoró la escalabilidad y simplificó el mantenimiento a largo plazo.',
        en: 'Designed a modular architecture that improved scalability and simplified long-term maintenance.',
      },
      {
        es: 'Documenté procesos técnicos y establecí buenas prácticas de desarrollo para el equipo.',
        en: 'Documented technical processes and established development best practices for the team.',
      },
    ],
    tech: ['React', 'Node.js', 'Tailwind CSS', 'Microservices', 'Performance'],
    image: '/images/ccalajuela.png',
  },
  {
    id: 'centennial',
    role: {
      es: 'Administrador de bases de datos asistente (pasantía)',
      en: 'Assistant Database Administrator (Intern)',
    },
    org: 'Centennial Partners',
    orgUrl: 'https://www.linkedin.com/company/centennial-partnerstwr/',
    mode: { es: 'Contrato temporal · Remoto (Panamá)', en: 'Temporary contract · Remote (Panama)' },
    start: '2024-01',
    end: '2024-04',
    track: 'engineering',
    summary: {
      es: 'Optimicé consultas y sostuve la integridad de datos en sistemas en producción.',
      en: 'Optimized queries and maintained data integrity across production systems.',
    },
    highlights: [
      {
        es: 'Soporté tareas de gestión de base de datos y modificaciones de sistema, asegurando integridad de datos.',
        en: 'Supported database management tasks and system modifications, ensuring data integrity.',
      },
      {
        es: 'Trabajé con SQL y MySQL para optimizar consultas y mejorar el rendimiento de la base de datos.',
        en: 'Worked with SQL and MySQL to optimize queries and improve database performance.',
      },
      {
        es: 'Implementé actualizaciones y procedimientos de mantenimiento para requisitos cambiantes.',
        en: 'Implemented database updates and maintenance procedures for evolving requirements.',
      },
    ],
    tech: ['SQL', 'MySQL', 'Query Optimization', 'Database Management'],
    image: '/images/centennial_partners.png',
  },
]
