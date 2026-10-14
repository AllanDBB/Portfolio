import type { Research } from '../types'

export const research: Research[] = [
  {
    id: 'cpd-benchmark',
    title: 'Assessing Online Change Point Detection in Noisy Environments: A Case Study on Synthetic and Real Crime Data',
    kind: 'paper',
    year: '2026',
    venue: {
      es: 'ITISE 2026 · Computer Sciences & Mathematics Forum (MDPI) 16(1), 2',
      en: 'ITISE 2026 · Computer Sciences & Mathematics Forum (MDPI) 16(1), 2',
    },
    authors: 'Allan Bolaños Barrientos, Martín Solís',
    doi: '10.3390/cmsf2026016002',
    status: 'shipped',
    featured: true,
    abstract: {
      es: 'Benchmark de 16 algoritmos de detección de puntos de cambio online sobre series sintéticas (variando ruido, magnitud y tipo de cambio) y series reales de criminalidad etiquetadas a mano. Ningún método gana en todos los regímenes.',
      en: 'A benchmark of 16 online change point detection algorithms over synthetic series (varying noise, change magnitude and change type) and hand-labeled real crime-count series. No single method wins across regimes.',
    },
    detail: {
      es: 'La detección de puntos de cambio online tiene un problema práctico: la literatura reporta resultados sobre datos limpios, pero las señales reales llegan con ruido. Este trabajo evalúa 16 algoritmos bajo un protocolo común, midiendo tiempo medio hasta la detección (MTTD) y F1 con tolerancia, y caracteriza cómo se degrada cada familia de métodos conforme aumenta el ruido.\n\nEl resultado no es un ganador único sino un mapa de trade-offs: qué algoritmos sostienen precisión a costa de latencia, cuáles detectan rápido pero generan falsos positivos, y en qué regímenes de ruido cada uno deja de ser útil.',
      en: 'Online change point detection has a practical problem: the literature reports results on clean data, but real signals arrive noisy. This work evaluates 16 algorithms under a common protocol, measuring mean time to detection (MTTD) and tolerance-based F1, and characterizes how each family degrades as noise increases.\n\nThe outcome is not a single winner but a map of trade-offs: which algorithms hold precision at the cost of latency, which detect fast but generate false positives, and in which noise regimes each stops being useful.',
    },
    tech: ['Time Series', 'Statistical Analysis', 'CUSUM', 'EWMA', 'Python'],
    links: [
      { label: 'DOI · MDPI', href: 'https://doi.org/10.3390/cmsf2026016002', kind: 'paper' },
      { label: 'Manuscrito (PDF)', href: '/papers/ChangePoint_manuscript__Final.pdf', kind: 'paper' },
      { label: 'Pipeline', href: 'https://github.com/AllanDBB/online-cpd-pipeline', kind: 'repo' },
      { label: 'Plataforma DCP', href: 'https://dcp-itcr.vercel.app', kind: 'demo' },
    ],
    image: '/images/timeseries_paper.png',
  },
  {
    id: 'sbind-als',
    title: 'Which speech measures differ when ALS speech is rated normal? Between-syllable laryngeal instability',
    kind: 'paper',
    year: '2027',
    venue: {
      es: 'SBiND 2027 · workshop satélite de ICASSP 2027 · por aparecer',
      en: 'SBiND 2027 · ICASSP 2027 satellite workshop · to appear',
    },
    status: 'research',
    featured: true,
    abstract: {
      es: 'En pacientes con ELA cuyo habla el neurólogo califica como normal, solo una de 39 medidas acústicas interpretables sobrevive al control FDR: la dispersión en semitonos de la F0 entre núcleos silábicos (AUC 0.70, VOC-ALS, n = 153).',
      en: 'In ALS patients whose speech a neurologist rates as normal, only one of 39 interpretable acoustic measures survives FDR control: the semitone spread of F0 across syllable nuclei (AUC 0.70, VOC-ALS, n = 153).',
    },
    detail: {
      es: 'Neuroingeniería aplicada al habla: buscar biomarcadores de una enfermedad neurodegenerativa antes de que el oído clínico los detecte. El pipeline extrae medidas de fonación, articulación y respiración con Praat/Parselmouth, las valida contra la base pública VOC-ALS y las somete a FDR, validación cruzada repetida, nulos por permutación y pruebas de robustez del pitch tracker.\n\nEl resultado apunta a una inestabilidad laríngea entre sílabas en pacientes sin disartria audible. Con disartria, todos los subsistemas cambian, y las medidas respiratorias y articulatorias siguen la fuerza de los músculos cefálicos más que el puntaje bulbar de motoneurona superior.',
      en: 'Neuroengineering applied to speech: looking for biomarkers of a neurodegenerative disease before the clinical ear can hear them. The pipeline extracts phonation, articulation and respiratory measures with Praat/Parselmouth, validates them against the public VOC-ALS database, and puts them through FDR, repeated cross-validation, permutation nulls and pitch-tracker robustness checks.\n\nThe result points to a between-syllable laryngeal instability in patients with no audible dysarthria. With dysarthria every subsystem changes, and respiratory and articulatory measures track head-muscle strength rather than the upper-motor-neuron bulbar score.',
    },
    tech: ['Speech Biomarkers', 'ALS', 'Praat / Parselmouth', 'Biostatistics', 'Python'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/sbind-als', kind: 'repo' }],
  },
  {
    id: 'arrhythmia',
    title: 'Detección temprana de arritmias en series temporales cardíacas',
    kind: 'line',
    year: '2025 —',
    venue: { es: 'Línea activa · TEC', en: 'Active line · TEC' },
    status: 'active',
    featured: true,
    abstract: {
      es: 'Modelos de machine learning que anticipan eventos arrítmicos a partir de señales cardíacas, combinando change point detection con detección de anomalías fisiológicas.',
      en: 'Machine learning models that anticipate arrhythmic events from cardiac signals, combining change point detection with physiological anomaly detection.',
    },
    detail: {
      es: 'El objetivo es adelantarse al evento, no clasificarlo después. Trabajo con datasets reales de frecuencia cardíaca y derivados de ECG, donde el reto principal no es el modelo sino la señal: artefactos de movimiento, pérdida de muestras y ruido de sensor que rompen los supuestos de estacionariedad.\n\nEl enfoque combina detección de puntos de cambio para segmentar regímenes fisiológicos con detección de anomalías dentro de cada régimen, y valida los resultados con evaluación estadística comparativa entre enfoques de modelado temporal.',
      en: 'The goal is to get ahead of the event, not classify it afterwards. I work with real heart rate and ECG-derived datasets, where the hard part is not the model but the signal: motion artifacts, dropped samples and sensor noise that break stationarity assumptions.\n\nThe approach pairs change point detection to segment physiological regimes with anomaly detection inside each regime, validating results through comparative statistical evaluation of temporal modeling approaches.',
    },
    tech: ['PyTorch', 'Signal Processing', 'Anomaly Detection', 'ECG', 'Python'],
    links: [
      { label: 'Heart rate forecasting', href: 'https://github.com/AllanDBB/heartrate-forecasting', kind: 'repo' },
    ],
    image: '/images/biomedical.png',
  },
  {
    id: 'cora',
    title: 'CORA — Cognitive Resilience & Adaptation',
    kind: 'line',
    year: '2025 —',
    venue: { es: 'Investigación independiente', en: 'Independent research' },
    status: 'research',
    featured: true,
    abstract: {
      es: 'El cerebro como sistema dinámico no estacionario: detectar transiciones de estado en EEG, medir recuperación y estudiar cómo un sistema cognitivo se reorganiza o colapsa bajo estrés.',
      en: 'The brain as a non-stationary dynamical system: detect state transitions in EEG, measure recovery and study how a cognitive system reorganises or collapses under stress.',
    },
    detail: {
      es: 'CORA parte de una pregunta: si un sistema cognitivo se comporta como un sistema dinámico en el tiempo, ¿se puede medir su resiliencia con las mismas herramientas que uso para detectar cambios de régimen en una señal?\n\nEl proyecto tiene dos capas. CORA-core define la arquitectura y las primitivas de modelado sobre dinámicas de series temporales; CORA-Brain aplica esa arquitectura a modelar el cerebro bajo condiciones de estrés, buscando indicadores de adaptación y de pérdida de resiliencia.',
      en: 'CORA starts from a question: if a cognitive system behaves like a dynamical system in time, can its resilience be measured with the same tools I use to detect regime shifts in a signal?\n\nThe project has two layers. CORA-core defines the architecture and modeling primitives over time-series dynamics; CORA-Brain applies that architecture to modeling the brain under stress, looking for indicators of adaptation and of resilience loss.',
    },
    tech: ['Python', 'EEG', 'Dynamical Systems', 'Change Point Detection', 'PhysioNet'],
    links: [
      { label: 'CORA-core', href: 'https://github.com/AllanDBB/CORA-core', kind: 'repo' },
      { label: 'CORA-Brain', href: 'https://github.com/AllanDBB/CORA-Brain', kind: 'repo' },
    ],
  },
  {
    id: 'ember',
    title: 'EMBER — Emergent Memory-Based Encoding and Reactivation',
    kind: 'line',
    year: '2025 —',
    venue: { es: 'Investigación · robótica cognitiva (e-MDB)', en: 'Research · cognitive robotics (e-MDB)' },
    status: 'research',
    featured: true,
    abstract: {
      es: 'Memoria episódica de largo plazo bioinspirada para robots cognitivos. Una búsqueda exhaustiva sobre 576 diseños de memoria revela la ley del umbral: el mecanismo que importa depende de r = K_proto / C.',
      en: 'Bio-inspired long-term episodic memory for cognitive robots. An exhaustive search over 576 memory designs reveals the threshold law: which mechanism matters depends on r = K_proto / C.',
    },
    detail: {
      es: 'Un robot que aprende toda su vida tiene que decidir qué guardar, mantenerlo accesible según su relevancia y recuperarlo desde una pista degradada. El buffer FIFO de e-MDB no hace ninguna de las tres.\n\nEMBER convierte cada mecanismo bioinspirado — lectura, escritura, fuerza modulada por error de predicción, decaimiento, olvido — en un eje de un espacio de diseño y lo recorre entero, tratando al FIFO como un punto más de ese espacio. Por debajo de r = 1 domina la consolidación por fusión; por encima, el olvido selectivo. El régimen cambia a lo largo de la vida del robot, y la arquitectura de la frontera funciona en ambos.',
      en: 'A robot that learns for its whole life must decide what to keep, keep it accessible in proportion to its relevance, and recall it from a degraded cue. The e-MDB FIFO buffer does none of the three.\n\nEMBER turns every bio-inspired mechanism — read, write, prediction-error-gated strength, decay, eviction — into an axis of a design space and searches all of it, treating the FIFO as one more point in that space. Below r = 1 compression by merging wins; above it, selective forgetting. The regime shifts over the robot’s life, and the frontier architecture works in both.',
    },
    tech: ['Computational Neuroscience', 'Spiking Networks (LIF + STDP)', 'Sparse Distributed Memory', 'Robotics', 'Python'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/EMBER', kind: 'repo' }],
  },
  {
    id: 'cpd-pipeline',
    title: 'Online CPD Pipeline',
    kind: 'experiment',
    year: '2025',
    venue: { es: 'Infraestructura experimental', en: 'Experimental infrastructure' },
    status: 'shipped',
    abstract: {
      es: 'Pipeline experimental end-to-end para detección de puntos de cambio online sobre series sintéticas: tuning de parámetros, evaluación con MTTD y F1 por tolerancia, y benchmarking contra CUSUM y EWMA.',
      en: 'End-to-end experimental pipeline for online change point detection over synthetic series: parameter tuning, MTTD and tolerance-based F1 evaluation, and benchmarking against CUSUM and EWMA.',
    },
    detail: {
      es: 'Es la infraestructura que hace reproducible el benchmark. Diseñado como framework modular para poder integrar y probar algoritmos propios contra los métodos clásicos bajo exactamente el mismo protocolo de evaluación.',
      en: 'This is the infrastructure that makes the benchmark reproducible. Designed as a modular framework so custom algorithms can be plugged in and tested against classical methods under exactly the same evaluation protocol.',
    },
    tech: ['Python', 'CUSUM', 'EWMA', 'Benchmarking', 'TeX'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/online-cpd-pipeline', kind: 'repo' }],
  },
  {
    id: 'anomaly-distillation',
    title: 'Anomaly Detection via Teacher–Student Distillation',
    kind: 'experiment',
    year: '2026',
    venue: { es: 'MVTec AD', en: 'MVTec AD' },
    status: 'shipped',
    abstract: {
      es: 'Detección de anomalías sobre MVTec AD comparando una CNN entrenada desde cero contra destilación teacher-student con ResNet-18, más un autoencoder U-Net. Embeddings evaluados con distancia de Mahalanobis y clustering DBSCAN.',
      en: 'Anomaly detection on MVTec AD comparing a from-scratch CNN against ResNet-18 teacher-student distillation, plus a U-Net autoencoder. Embeddings evaluated with Mahalanobis distance and DBSCAN clustering.',
    },
    detail: {
      es: 'El experimento contrasta tres estrategias sobre el mismo benchmark industrial: aprendizaje desde cero, transferencia por destilación, y reconstrucción con autoencoder. La evaluación no se queda en la métrica de detección: analiza el espacio de embeddings con Mahalanobis y DBSCAN para entender qué separa realmente cada método.\n\nMontado sobre PyTorch Lightning con configuración en Hydra y seguimiento de experimentos en WandB, para que cada corrida sea reproducible.',
      en: 'The experiment contrasts three strategies on the same industrial benchmark: learning from scratch, transfer through distillation, and autoencoder reconstruction. Evaluation goes past the detection metric: it analyzes the embedding space with Mahalanobis and DBSCAN to understand what each method actually separates.\n\nBuilt on PyTorch Lightning with Hydra configuration and WandB experiment tracking, so every run is reproducible.',
    },
    tech: ['PyTorch Lightning', 'Hydra', 'WandB', 'ResNet-18', 'U-Net', 'DBSCAN'],
    links: [
      { label: 'Repositorio', href: 'https://github.com/AllanDBB/nomaly-detection-distillation', kind: 'repo' },
      { label: 'Autoencoder', href: 'https://github.com/AllanDBB/mvtec-autoencoder-reconstruction', kind: 'repo' },
    ],
  },
]
