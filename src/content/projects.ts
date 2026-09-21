import type { Project } from '../types'

export const projects: Project[] = [
  /* ---------------------------------------------------------------- */
  /* ML & AI                                                           */
  /* ---------------------------------------------------------------- */
  {
    id: 'dcp-itcr',
    title: 'DCP — Plataforma de detección de puntos de cambio',
    kind: 'ml',
    year: '2025',
    status: 'shipped',
    featured: true,
    summary: {
      es: 'Plataforma interactiva para subir datasets, visualizar series temporales y detectar puntos de cambio manual o automáticamente con algoritmos estadísticos.',
      en: 'Interactive platform to upload datasets, visualize time series and detect change points manually or automatically with statistical algorithms.',
    },
    detail: {
      es: 'El benchmark de 16 algoritmos necesitaba datos etiquetados, y etiquetar series temporales a mano en un notebook es lento y propenso a error. DCP resuelve eso: se sube un dataset, se visualiza la serie, y se marcan los puntos de cambio directamente sobre el gráfico o se dejan detectar por un algoritmo.\n\nLas etiquetas se exportan en un formato listo para entrenamiento supervisado, lo que convirtió una tarea manual en un flujo repetible para todo el equipo de investigación.',
      en: 'The 16-algorithm benchmark needed labeled data, and labeling time series by hand in a notebook is slow and error-prone. DCP solves that: upload a dataset, visualize the series, and mark change points directly on the chart or let an algorithm detect them.\n\nLabels export in a format ready for supervised training, turning a manual chore into a repeatable workflow for the whole research team.',
    },
    tech: ['React', 'TypeScript', 'Python', 'Data Visualization', 'Time Series'],
    links: [
      { label: 'Ver en vivo', href: 'https://dcp-itcr.vercel.app', kind: 'demo' },
      { label: 'Repositorio', href: 'https://github.com/AllanDBB/DCP_ITCR', kind: 'repo' },
    ],
    image: '/images/dcp.png',
  },
  {
    id: 'ai-agents-rag-mcp',
    title: 'Sistema multi-agente con RAG y MCP',
    kind: 'ml',
    year: '2026',
    status: 'shipped',
    featured: true,
    summary: {
      es: 'Sistema de IA multi-agente que combina RAG sobre apuntes de curso, orquestación inspirada en A2A, memoria conversacional, herramientas transaccionales vía MCP y observabilidad con Langfuse.',
      en: 'Multi-agent AI system combining RAG over course notes, A2A-inspired orchestration, conversational memory, MCP-based transactional tools and Langfuse observability.',
    },
    detail: {
      es: 'Un asistente que responde sobre material de curso no basta con RAG: hay que decidir qué agente atiende cada consulta, mantener contexto entre turnos, y permitir que el sistema ejecute acciones reales, no solo que hable.\n\nEste sistema junta esas piezas. La orquestación reparte trabajo entre agentes siguiendo un patrón inspirado en A2A, las herramientas transaccionales se exponen mediante MCP, y toda la traza queda instrumentada en Langfuse para poder depurar por qué el sistema respondió lo que respondió.',
      en: 'An assistant answering over course material needs more than RAG: something must decide which agent handles each query, keep context across turns, and let the system take real actions rather than just talk.\n\nThis system puts those pieces together. Orchestration distributes work across agents following an A2A-inspired pattern, transactional tools are exposed through MCP, and the full trace is instrumented in Langfuse so you can debug why the system answered the way it did.',
    },
    tech: ['Python', 'RAG', 'MCP', 'Multi-agent', 'Langfuse', 'LLM'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/ai-agents-rag-mcp-system', kind: 'repo' }],
  },
  {
    id: 'voice-command-ai',
    title: 'Voice Command AI — inferencia on-device',
    kind: 'ml',
    year: '2026',
    status: 'shipped',
    summary: {
      es: 'Pipeline de IA end-to-end para reconocimiento de comandos de voz con despliegue móvil e inferencia completamente en el dispositivo.',
      en: 'End-to-end AI pipeline for voice command recognition with mobile deployment and fully on-device inference.',
    },
    detail: {
      es: 'Todo el ciclo, del dataset al teléfono: preprocesamiento de audio, entrenamiento del modelo, cuantización y despliegue. La restricción de diseño fue que la inferencia ocurriera enteramente en el dispositivo, sin llamadas a servidor, lo que obliga a un compromiso explícito entre precisión y tamaño del modelo.',
      en: 'The whole cycle, from dataset to phone: audio preprocessing, model training, quantization and deployment. The design constraint was that inference happen entirely on-device, with no server calls, which forces an explicit trade-off between accuracy and model size.',
    },
    tech: ['Python', 'Deep Learning', 'Audio Processing', 'On-device ML', 'Mobile'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/voice-command-ai', kind: 'repo' }],
  },
  {
    id: 'heartrate-forecasting',
    title: 'Heart Rate Forecasting',
    kind: 'ml',
    year: '2026',
    status: 'active',
    summary: {
      es: 'Modelos de pronóstico sobre series de frecuencia cardíaca, base experimental para la línea de detección temprana de arritmias.',
      en: 'Forecasting models over heart rate series, the experimental base for the early arrhythmia detection line.',
    },
    tech: ['Python', 'Time Series', 'Forecasting', 'Jupyter'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/heartrate-forecasting', kind: 'repo' }],
  },
  {
    id: 'bank-campaign-insights',
    title: 'Bank Campaign Insights',
    kind: 'ml',
    year: '2025',
    status: 'shipped',
    summary: {
      es: 'Análisis de campañas bancarias: exploración de datos y modelado para entender qué determina la conversión de una campaña de marketing directo.',
      en: 'Bank campaign analysis: data exploration and modeling to understand what drives conversion in a direct marketing campaign.',
    },
    tech: ['JavaScript', 'Data Analysis', 'Visualization'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/bank-campaign-insights', kind: 'repo' }],
  },

  /* ---------------------------------------------------------------- */
  /* Systems & languages                                               */
  /* ---------------------------------------------------------------- */
  {
    id: 'genlen',
    title: 'GenLen — DSL para bioinformática',
    kind: 'systems',
    year: '2026',
    status: 'active',
    featured: true,
    summary: {
      es: 'Lenguaje de propósito específico que permite a investigadores, bioinformáticos y estudiantes trabajar con conceptos biológicos de forma más intuitiva y expresiva.',
      en: 'A domain-specific language letting researchers, bioinformaticians and students work with biological concepts more intuitively and expressively.',
    },
    detail: {
      es: 'La bioinformática obliga a expresar ideas biológicas en lenguajes que no fueron diseñados para eso: una operación conceptualmente simple sobre secuencias termina en decenas de líneas de manipulación de strings.\n\nGenLen propone lo contrario: que el lenguaje hable en términos del dominio. Implica diseñar la gramática, el analizador léxico y sintáctico, y la semántica de ejecución — es tanto un ejercicio de teoría de lenguajes como una herramienta pensada para gente que no es programadora de oficio.',
      en: 'Bioinformatics forces biological ideas into languages never designed for them: a conceptually simple operation over sequences ends up as dozens of lines of string manipulation.\n\nGenLen proposes the opposite: let the language speak in domain terms. That means designing the grammar, the lexer and parser, and the execution semantics — as much an exercise in language theory as a tool aimed at people who are not programmers by trade.',
    },
    tech: ['Python', 'Compilers', 'Language Design', 'Parsing', 'Bioinformatics'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/GenLen', kind: 'repo' }],
  },
  {
    id: 'nozzle-benchmark',
    title: 'Supersonic Nozzle Design Benchmark',
    kind: 'systems',
    year: '2026',
    status: 'shipped',
    featured: true,
    summary: {
      es: 'Framework computacional para comparar metodologías de diseño de toberas supersónicas, contrastando el Método de las Características clásico contra optimización basada en CFD.',
      en: 'Computational framework for benchmarking supersonic nozzle design methodologies, contrasting the classical Method of Characteristics against CFD-based optimization.',
    },
    detail: {
      es: 'El framework genera geometrías de tobera parametrizadas, evalúa su rendimiento bajo supuestos de flujo ideal y no ideal, y compara enfoques de diseño clásicos contra optimización computacional.\n\nLa pregunta de fondo es cuánto gana realmente la optimización numérica sobre un método analítico bien aplicado, y bajo qué supuestos esa ventaja se sostiene o desaparece.',
      en: 'The framework generates parametrized nozzle geometries, evaluates their performance under ideal and non-ideal flow assumptions, and compares classical design approaches against computational optimization.\n\nThe underlying question is how much numerical optimization actually gains over a well-applied analytical method, and under which assumptions that advantage holds or vanishes.',
    },
    tech: ['Python', 'CFD', 'Numerical Methods', 'Optimization', 'Aerospace'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/nozzle-design-benchmark', kind: 'repo' }],
  },
  {
    id: 'tricount-assembly',
    title: 'Tricount en Assembly',
    kind: 'systems',
    year: '2024',
    status: 'shipped',
    summary: {
      es: 'Un gestor de gastos compartidos al estilo Tricount, escrito en ensamblador para el curso de Arquitectura de Computadores.',
      en: 'A shared-expense manager in the style of Tricount, written in assembly for the Computer Architecture course.',
    },
    detail: {
      es: 'Escribir una aplicación con lógica de negocio real en ensamblador obliga a resolver a mano todo lo que un lenguaje de alto nivel regala: manejo de memoria, estructuras de datos, entrada y salida, aritmética. Es el proyecto que más me enseñó sobre lo que realmente ocurre debajo del código que escribo todos los días.',
      en: 'Writing an application with real business logic in assembly forces you to hand-solve everything a high-level language gives away: memory management, data structures, I/O, arithmetic. It is the project that taught me most about what actually happens beneath the code I write every day.',
    },
    tech: ['Assembly', 'Computer Architecture', 'Low-level'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/Tricount-in-Assembly', kind: 'repo' }],
  },
  {
    id: 'transactional-models',
    title: 'Transactional Models',
    kind: 'systems',
    year: '2026',
    status: 'shipped',
    summary: {
      es: 'Implementación y análisis de modelos transaccionales: concurrencia, aislamiento y garantías de consistencia.',
      en: 'Implementation and analysis of transactional models: concurrency, isolation and consistency guarantees.',
    },
    tech: ['Python', 'Concurrency', 'Transactions', 'Databases'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/Transactional-Models-Project', kind: 'repo' }],
  },
  {
    id: 'dwh',
    title: 'Data Warehouse',
    kind: 'systems',
    year: '2025',
    status: 'shipped',
    summary: {
      es: 'Diseño e implementación de un data warehouse: modelado dimensional, procesos ETL y consultas analíticas.',
      en: 'Data warehouse design and implementation: dimensional modeling, ETL processes and analytical queries.',
    },
    tech: ['Python', 'Data Warehousing', 'ETL', 'SQL'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/DWH_DB2', kind: 'repo' }],
  },

  /* ---------------------------------------------------------------- */
  /* Products                                                          */
  /* ---------------------------------------------------------------- */
  {
    id: 'gourmetgo',
    title: 'GourmetGo',
    kind: 'product',
    year: '2025',
    status: 'shipped',
    featured: true,
    summary: {
      es: 'Plataforma móvil para descubrir y reservar experiencias culinarias: cenas temáticas, clases de cocina y eventos especiales, con panel para chefs y restaurantes.',
      en: 'Mobile platform for discovering and booking culinary experiences: themed dinners, cooking classes and special events, with a panel for chefs and restaurants.',
    },
    detail: {
      es: 'Un marketplace de dos lados: quienes buscan una experiencia gastronómica y quienes la ofrecen. Los usuarios exploran y reservan; los chefs y restaurantes gestionan sus experiencias, participantes y contenido.\n\nIncluye autenticación, reservas con código QR, gestión de contenido, sistema de calificaciones y un chatbot de soporte. Desarrollado en Kotlin para móvil con backend propio.',
      en: 'A two-sided marketplace: people looking for a culinary experience and the people offering it. Users browse and book; chefs and restaurants manage their experiences, participants and content.\n\nIt includes authentication, QR-code booking, content management, a ratings system and a support chatbot. Built in Kotlin for mobile with its own backend.',
    },
    tech: ['Kotlin', 'Android', 'REST API', 'Firebase', 'QR'],
    links: [
      { label: 'Ver en vivo', href: 'https://gourmetgocore.vercel.app', kind: 'demo' },
      { label: 'Repositorio', href: 'https://github.com/AllanDBB/GourmetGo', kind: 'repo' },
    ],
  },
  {
    id: 'logievents',
    title: 'LogiEvents',
    kind: 'product',
    year: '2025',
    status: 'shipped',
    summary: {
      es: 'Plataforma de gestión y logística de eventos, construida en TypeScript y desplegada en producción.',
      en: 'Event management and logistics platform, built in TypeScript and deployed to production.',
    },
    tech: ['TypeScript', 'React', 'Node.js'],
    links: [
      { label: 'Ver en vivo', href: 'https://logi-events-phi.vercel.app', kind: 'demo' },
      { label: 'Repositorio', href: 'https://github.com/AllanDBB/LogiEvents', kind: 'repo' },
    ],
  },
  {
    id: 'budgetme',
    title: 'BudgetMe',
    kind: 'product',
    year: '2026',
    status: 'active',
    summary: {
      es: 'Aplicación de finanzas personales que registra ingresos y gastos, identifica patrones de consumo y proyecta escenarios futuros con modelos de análisis y aprendizaje automático.',
      en: 'Personal finance app that tracks income and expenses, identifies spending patterns and projects future scenarios using analytical and machine learning models.',
    },
    detail: {
      es: 'La mayoría de apps de finanzas solo registran el pasado. BudgetMe intenta lo siguiente: a partir del historial de consumo, identificar patrones y proyectar escenarios, para que la decisión de gasto se tome con una estimación de su efecto y no a ciegas.',
      en: 'Most finance apps only record the past. BudgetMe attempts the next step: from spending history, identify patterns and project scenarios, so a spending decision can be made with an estimate of its effect rather than blind.',
    },
    tech: ['Machine Learning', 'Forecasting', 'Web'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/BudgetMe', kind: 'repo' }],
  },
  {
    id: 'h2ome',
    title: 'H2OME — RetoMarte 2024',
    kind: 'product',
    year: '2024',
    status: 'shipped',
    summary: {
      es: 'Proyecto del equipo Yaku Mars 2024 para RetoMarte Costa Rica, enfocado en gestión de agua. Ganador nacional y clasificado a la final internacional en España.',
      en: 'Project by team Yaku Mars 2024 for RetoMarte Costa Rica, focused on water management. National winner, qualified for the international finals in Spain.',
    },
    tech: ['TypeScript', 'React', 'Sustainability'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/H2OME-APP', kind: 'repo' }],
    image: '/images/retomarte.jpg',
  },

  /* ---------------------------------------------------------------- */
  /* Web                                                               */
  /* ---------------------------------------------------------------- */
  {
    id: 'ccal-website',
    title: 'Colegio Científico de Alajuela',
    kind: 'web',
    year: '2024 —',
    status: 'active',
    featured: true,
    summary: {
      es: 'Sitio institucional del Colegio Científico de Alajuela. Reducción de ~30% en tiempos de carga y 25% en latencia operacional mediante un microservicio en Node.js.',
      en: 'Institutional site for Colegio Científico de Alajuela. ~30% reduction in load times and 25% in operational latency through a Node.js microservice.',
    },
    detail: {
      es: 'Plataforma web para programas académicos, noticias y recursos para estudiantes y familias. El trabajo no fue solo construir el sitio sino hacerlo rápido: rediseño de la arquitectura en módulos, optimización de frontend y un microservicio dedicado a las solicitudes de datos en tiempo real.\n\nLos resultados medidos: ~30% menos tiempo de carga y 25% menos latencia operacional.',
      en: 'A web platform for academic programs, news and resources for students and families. The job was not just building the site but making it fast: modular architecture redesign, frontend optimization and a dedicated microservice for real-time data requests.\n\nMeasured results: ~30% less load time and 25% less operational latency.',
    },
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Performance'],
    links: [
      { label: 'Ver en vivo', href: 'https://ccalajuela.ed.cr', kind: 'demo' },
      { label: 'Repositorio', href: 'https://github.com/AllanDBB/CCAL-Website', kind: 'repo' },
    ],
    image: '/images/ccalajuela_web.png',
  },
  {
    id: 'petziclub-web',
    title: 'Petziclub',
    kind: 'web',
    year: '2024',
    status: 'shipped',
    summary: {
      es: 'Sitio corporativo de Petziclub: catálogo de productos, sistema de reservas, galería de servicios y panel informativo para dueños de mascotas.',
      en: 'Petziclub corporate site: product catalog, booking system, service gallery and information panel for pet owners.',
    },
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    links: [{ label: 'Ver en vivo', href: 'https://petziclub.com', kind: 'demo' }],
    image: '/images/petziweb.png',
  },
  {
    id: 'kuraforce',
    title: 'KuraForce',
    kind: 'web',
    year: '2025',
    status: 'shipped',
    summary: {
      es: 'Sitio web desarrollado como freelance para KuraForce, con interfaz responsiva y open source.',
      en: 'Website built as a freelancer for KuraForce, responsive and open source.',
    },
    tech: ['TypeScript', 'React', 'UI/UX', 'Responsive'],
    links: [
      { label: 'Ver en vivo', href: 'https://kuraforce.vercel.app', kind: 'demo' },
      { label: 'Repositorio', href: 'https://github.com/AllanDBB/KuraForce-Web', kind: 'repo' },
    ],
    image: '/images/kura.png',
  },

  /* ---------------------------------------------------------------- */
  /* Academic                                                          */
  /* ---------------------------------------------------------------- */
  {
    id: 'tournament-manager',
    title: 'Tournament Manager',
    kind: 'academic',
    year: '2025',
    status: 'shipped',
    summary: {
      es: 'Gestor de torneos en TypeScript: emparejamientos, brackets y seguimiento de resultados.',
      en: 'Tournament manager in TypeScript: pairings, brackets and results tracking.',
    },
    tech: ['TypeScript', 'React'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/tournament-manager', kind: 'repo' }],
  },
  {
    id: 'soltura-db',
    title: 'Soltura DB',
    kind: 'academic',
    year: '2025',
    status: 'shipped',
    summary: {
      es: 'Proyecto de bases de datos en T-SQL: modelado relacional, procedimientos almacenados e integridad referencial.',
      en: 'T-SQL database project: relational modeling, stored procedures and referential integrity.',
    },
    tech: ['T-SQL', 'SQL Server', 'Database Design'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/Soltura_DB', kind: 'repo' }],
  },
  {
    id: 'graphebbean',
    title: 'Pirates of the Graphebbean',
    kind: 'academic',
    year: '2024',
    status: 'shipped',
    summary: {
      es: 'Proyecto de Estructuras de Datos en Java centrado en grafos: recorridos, caminos mínimos y visualización.',
      en: 'Data Structures project in Java centered on graphs: traversals, shortest paths and visualization.',
    },
    tech: ['Java', 'Graphs', 'Data Structures'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/Pirates-of-Graphebbean', kind: 'repo' }],
  },
  {
    id: 'object-recognition',
    title: 'Object Recognition',
    kind: 'academic',
    year: '2025',
    status: 'shipped',
    summary: {
      es: 'Aplicación de reconocimiento de objetos desarrollada para el curso de Requerimientos de Software.',
      en: 'Object recognition application built for the Software Requirements course.',
    },
    tech: ['TypeScript', 'Computer Vision'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/ObjectRecognition', kind: 'repo' }],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function projectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
