import type { Project } from '../types'

/**
 * Every claim here comes from the repo README or the paper behind it.
 * Order matters: featured work first, then by ambition, not by date.
 */
export const projects: Project[] = [
  /* ---------------------------------------------------------------- */
  /* Science & neuroengineering                                        */
  /* ---------------------------------------------------------------- */
  {
    id: 'sbind-als',
    title: 'ALS Speech Biomarkers — SBiND 2027',
    kind: 'science',
    year: '2026',
    status: 'research',
    featured: true,
    context: {
      es: 'Paper para SBiND 2027 · workshop satélite de ICASSP 2027',
      en: 'Paper for SBiND 2027 · ICASSP 2027 satellite workshop',
    },
    summary: {
      es: '¿Qué medidas del habla ya difieren en pacientes con ELA cuyo habla el neurólogo califica como normal? Un pipeline acústico reproducible sobre la base pública VOC-ALS que busca la señal antes de que el oído clínico la detecte.',
      en: 'Which speech measures already differ in ALS patients whose speech a neurologist rates as normal? A reproducible acoustic pipeline over the public VOC-ALS database that looks for the signal before the clinical ear can hear it.',
    },
    detail: {
      es: 'La esclerosis lateral amiotrófica (ELA) afecta el habla, pero cuando el neurólogo ya escucha la disartria, la enfermedad lleva tiempo avanzando. La pregunta del paper es qué cambia antes: en los pacientes con habla clínicamente normal, ¿hay alguna medida acústica interpretable que ya los separe de los controles sanos?\n\nEl pipeline extrae 39 medidas interpretables de fonación, articulación y soporte respiratorio con Praat/Parselmouth, las valida contra las columnas acústicas publicadas con VOC-ALS (Spearman 0.95–0.99) y las somete a control de falsos descubrimientos, validación cruzada repetida, nulos por permutación y pruebas de robustez del pitch tracker (Praat vs. REAPER de Google).\n\nEl hallazgo: de las 39 medidas, solo una sobrevive al control FDR — la dispersión en semitonos de la F0 entre núcleos silábicos en las tareas /pa/, /ta/, /ka/ (AUC 0.70). Una inestabilidad laríngea entre sílabas que aparece antes de que el habla suene alterada. Cada número del paper se genera desde el código, así que el resultado es trazable de punta a punta.',
      en: 'Amyotrophic lateral sclerosis (ALS) affects speech, but by the time a neurologist hears the dysarthria the disease has been progressing for a while. The paper asks what changes first: in patients with clinically normal speech, is there an interpretable acoustic measure that already separates them from healthy controls?\n\nThe pipeline extracts 39 interpretable phonation, articulation and respiratory measures with Praat/Parselmouth, validates them against the acoustic columns released with VOC-ALS (Spearman 0.95–0.99), and puts them through false-discovery control, repeated cross-validation, permutation nulls and pitch-tracker robustness checks (Praat vs. Google’s REAPER).\n\nThe finding: of 39 measures, only one survives FDR control — the semitone spread of F0 across syllable nuclei in the /pa/, /ta/, /ka/ tasks (AUC 0.70). A between-syllable laryngeal instability that shows up before speech sounds impaired. Every number in the paper is generated from the code, so the result is traceable end to end.',
    },
    built: [
      { es: 'Extracción de 39 medidas acústicas interpretables (F0, jitter, shimmer, HNR, CPPS, formantes, DDK, respiración).', en: 'Extraction of 39 interpretable acoustic measures (F0, jitter, shimmer, HNR, CPPS, formants, DDK, breathing).' },
      { es: 'Análisis subclínico con AUC bootstrap, BH-FDR, ajuste por edad/sexo y 20×5-fold CV estratificada.', en: 'Subclinical analysis with bootstrap AUC, BH-FDR, age/sex adjustment and 20×5-fold stratified CV.' },
      { es: 'Descomposición por escalas temporales del contorno de F0 y dinámica de re-inicio de voz.', en: 'Time-scale decomposition of the F0 contour and voice re-initiation dynamics.' },
      { es: 'Correlaciones parciales motoneurona superior vs. inferior (PUMNS vs. MRC) y progresión.', en: 'Upper vs. lower motor neuron partial correlations (PUMNS vs. MRC) and progression.' },
      { es: 'Generación automática de tablas y números del paper en LaTeX desde los CSV.', en: 'Automatic generation of the paper’s LaTeX tables and numbers from the CSVs.' },
    ],
    metrics: [
      { value: '153', label: { es: 'sujetos en VOC-ALS', en: 'subjects in VOC-ALS' } },
      { value: '39', label: { es: 'medidas interpretables', en: 'interpretable measures' } },
      { value: '0.70', label: { es: 'AUC de la única medida que pasa FDR', en: 'AUC of the only measure passing FDR' } },
      { value: '1224', label: { es: 'grabaciones procesadas', en: 'recordings processed' } },
    ],
    code: {
      lang: 'bash',
      file: 'run_all.sh',
      source: `python src/extract_features.py --data data/raw --xlsx data/raw/VOC-ALS.xlsx \\
       --out results/features.csv --jobs 2
python src/analyze_subclinical.py --features results/features.csv \\
       --out results/analysis --repeats 20 --boot 2000
python src/analyze_ablation.py --features results/features.csv --perms 200
python src/make_paper_tables.py --features results/features.csv --out paper
cd paper && latexmk -pdf main.tex`,
    },
    tech: ['Python', 'Praat / Parselmouth', 'Signal Processing', 'scikit-learn', 'Biostatistics', 'LaTeX'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/sbind-als', kind: 'repo' }],
  },
  {
    id: 'ember',
    title: 'EMBER — Memoria episódica para robots',
    kind: 'science',
    year: '2026',
    status: 'research',
    featured: true,
    context: {
      es: 'Investigación · arquitectura cognitiva e-MDB',
      en: 'Research · e-MDB cognitive architecture',
    },
    summary: {
      es: 'Memoria episódica de largo plazo bioinspirada para robots cognitivos: qué guardar, cuánto tiempo mantenerlo y cómo recuperarlo desde una pista degradada. Una búsqueda exhaustiva sobre 576 diseños de memoria que termina en una ley.',
      en: 'Bio-inspired long-term episodic memory for cognitive robots: what to keep, how long to keep it, and how to recall it from a degraded cue. An exhaustive search over 576 memory designs that ends in a law.',
    },
    detail: {
      es: 'Un robot que aprende toda su vida tiene que decidir qué vale la pena recordar. El buffer episódico de la arquitectura e-MDB es una cola FIFO de tamaño fijo: guarda lo último que vio, trate de lo que trate.\n\nEMBER convierte cada mecanismo de memoria bioinspirada — lectura, escritura, fuerza modulada por error de predicción, decaimiento, olvido, refuerzo — en un eje de un espacio de diseño discreto, y lo recorre entero. El FIFO desplegado no es un baseline externo sino un punto más de ese espacio, lo que vuelve la comparación falsable: ¿dónde cae el incumbente y qué combinación define la frontera?\n\nEl resultado central es la ley del umbral: qué mecanismo importa depende del cociente r = K_proto / C entre prototipos de experiencia recurrentes y capacidad. Por debajo de 1 domina la consolidación por fusión; por encima, el olvido selectivo modulado por saliencia. Para un robot, el régimen cambia a lo largo de su vida — y la arquitectura de la frontera funciona en ambos.',
      en: 'A robot that learns for its whole life has to decide what is worth remembering. The episodic buffer in the e-MDB architecture is a fixed-size FIFO: it keeps the last thing it saw, whatever it was about.\n\nEMBER turns every bio-inspired memory mechanism — read, write, prediction-error-gated strength, decay, eviction, reinforcement — into an axis of a discrete design space, and searches all of it. The deployed FIFO is not an external baseline but one more point in that space, which makes the comparison falsifiable: where does the incumbent land, and which combination defines the frontier?\n\nThe central result is the threshold law: which mechanism matters depends on the ratio r = K_proto / C between recurring experience prototypes and capacity. Below 1, compression by merging wins; above it, selective forgetting modulated by salience. For a robot the regime shifts over its lifetime — and the frontier architecture works in both.',
    },
    built: [
      { es: 'Espacio de 576 genotipos de memoria y un motor de búsqueda paralelo con estadística.', en: 'A space of 576 memory genotypes and a parallel search engine with statistics.' },
      { es: 'Memorias SDM, ENN, spiking (LIF + STDP) y Spiking-SDM bajo un mismo protocolo.', en: 'SDM, ENN, spiking (LIF + STDP) and Spiking-SDM memories under one protocol.' },
      { es: 'Núcleo que depende solo de numpy, pensado para correr en un Robotino.', en: 'A numpy-only core, built to run on a Robotino.' },
      { es: 'Cinco experimentos reproducibles con manifiesto de SHA, semillas y versiones.', en: 'Five reproducible experiments with a manifest of git SHA, seeds and versions.' },
    ],
    metrics: [
      { value: '576', label: { es: 'diseños de memoria evaluados', en: 'memory designs evaluated' } },
      { value: 'r = K/C', label: { es: 'la ley del umbral', en: 'the threshold law' } },
      { value: '4', label: { es: 'familias de memoria bioinspirada', en: 'bio-inspired memory families' } },
    ],
    code: {
      lang: 'python',
      file: 'ember/core',
      source: `from ember.core import Genotype, PolicyMemory
from ember.core.policies import Append, MinStrength, NearestNeighbour, NoDecay, PredErrorGated

frontier = Genotype(
    read=NearestNeighbour(),
    write=Append(),
    strength=PredErrorGated(),   # surprise decides how hard it is encoded
    decay=NoDecay(),
    evict=MinStrength(),
    reinforce=0.0,
)
mem = PolicyMemory(dim=32, capacity=20, genotype=frontier, seed=0)`,
    },
    tech: ['Python', 'Computational Neuroscience', 'Spiking Networks', 'Robotics', 'NAS', 'MiniGrid'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/EMBER', kind: 'repo' }],
  },
  {
    id: 'cora',
    title: 'CORA — Resiliencia cognitiva',
    kind: 'science',
    year: '2025',
    featured: true,
    status: 'research',
    context: { es: 'Investigación independiente', en: 'Independent research' },
    summary: {
      es: 'El cerebro como sistema dinámico no estacionario: en lugar de etiquetar estados mentales, detectar transiciones, medir recuperación y estudiar cómo un sistema cognitivo se reorganiza — o colapsa — bajo estrés.',
      en: 'The brain as a non-stationary dynamical system: instead of labelling mental states, detect transitions, measure recovery and study how a cognitive system reorganises — or collapses — under stress.',
    },
    detail: {
      es: 'La mayoría del machine learning sobre datos cerebrales es clasificación supervisada con etiquetas diagnósticas. CORA toma la perspectiva opuesta: el objetivo es entender cómo cambia el cerebro, no etiquetar qué es.\n\nCORA-core define las abstracciones — estados, estresores, detección de cambios, métricas de adaptación — sobre series temporales multivariadas, de forma agnóstica al dominio. CORA-Brain lo aplica a EEG y señales neurales públicas (PhysioNet): modela el comportamiento base, introduce u observa perturbaciones, detecta transiciones con change point detection y evalúa estabilidad, recuperación o colapso. Las etiquetas solo se usan para validar a posteriori.',
      en: 'Most machine learning on brain data is supervised classification against diagnostic labels. CORA takes the opposite view: the goal is to understand how the brain changes, not to label what it is.\n\nCORA-core defines the abstractions — states, stressors, change detection, adaptation metrics — over multivariate time series, domain-agnostic. CORA-Brain applies it to EEG and public neural signals (PhysioNet): model baseline behaviour, introduce or observe perturbations, detect transitions with change point detection, and evaluate stability, recovery or collapse. Labels are only used for post-hoc validation.',
    },
    tech: ['Python', 'EEG', 'Dynamical Systems', 'Change Point Detection', 'PhysioNet'],
    links: [
      { label: 'CORA-core', href: 'https://github.com/AllanDBB/CORA-core', kind: 'repo' },
      { label: 'CORA-Brain', href: 'https://github.com/AllanDBB/CORA-Brain', kind: 'repo' },
    ],
  },
  {
    id: 'online-cpd-pipeline',
    title: 'Online CPD Pipeline',
    kind: 'science',
    year: '2025',
    status: 'shipped',
    context: { es: 'Infraestructura del paper de ITISE 2026', en: 'Infrastructure behind the ITISE 2026 paper' },
    summary: {
      es: 'El framework de benchmarking detrás del paper publicado: 17 detectores online de puntos de cambio bajo un mismo protocolo, sobre datos sintéticos, reales y el benchmark TCPD.',
      en: 'The benchmarking framework behind the published paper: 17 online change point detectors under one protocol, on synthetic, real and TCPD benchmark data.',
    },
    detail: {
      es: 'Integra algoritmos de River (Page-Hinkley, ADWIN), métodos estadísticos clásicos (EWMA, CUSUM), variantes online de ruptures (Focus, Gaussian, NPFocus, MDFocus) y modelos de espacio de estados (SSM con Kalman, TAGI-LSTM/SSM), entre otros.\n\nLas métricas — F1 con tolerancia temporal, tiempo medio a la detección (MTTD) y Maximum Mean Discrepancy — están implementadas desde cero, e incluye grid search sobre datos reales, un enfoque de transfer learning y análisis de acuerdo entre anotadores para las etiquetas manuales.',
      en: 'It integrates River algorithms (Page-Hinkley, ADWIN), classical statistical methods (EWMA, CUSUM), online ruptures variants (Focus, Gaussian, NPFocus, MDFocus) and state-space models (SSM with Kalman, TAGI-LSTM/SSM), among others.\n\nThe metrics — tolerance-based F1, mean time to detection (MTTD) and Maximum Mean Discrepancy — are implemented from scratch, with grid search on real data, a transfer-learning approach and inter-annotator agreement analysis for the manual labels.',
    },
    metrics: [
      { value: '17', label: { es: 'detectores online', en: 'online detectors' } },
      { value: '3', label: { es: 'métricas propias: F1·τ, MTTD, MMD', en: 'own metrics: F1·τ, MTTD, MMD' } },
    ],
    tech: ['Python', 'River', 'ruptures', 'Kalman Filters', 'TeX'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/online-cpd-pipeline', kind: 'repo' }],
  },
  {
    id: 'heartrate-forecasting',
    title: 'Heart Rate Forecasting',
    kind: 'science',
    year: '2026',
    status: 'active',
    context: { es: 'Línea de arritmias · TEC', en: 'Arrhythmia line · TEC' },
    summary: {
      es: 'Modelos de pronóstico sobre series de frecuencia cardíaca: la base experimental para adelantarse a un evento arrítmico en lugar de clasificarlo después.',
      en: 'Forecasting models over heart-rate series: the experimental base for getting ahead of an arrhythmic event instead of classifying it afterwards.',
    },
    tech: ['Python', 'Time Series', 'Forecasting', 'ECG / HRV', 'Jupyter'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/heartrate-forecasting', kind: 'repo' }],
  },

  /* ---------------------------------------------------------------- */
  /* AI & data                                                         */
  /* ---------------------------------------------------------------- */
  {
    id: 'dcp-itcr',
    title: 'DCP — Plataforma de detección de puntos de cambio',
    kind: 'ml',
    year: '2025',
    status: 'shipped',
    featured: true,
    context: { es: 'Proyecto de investigación · TEC', en: 'Research project · TEC' },
    summary: {
      es: 'Plataforma web para subir datasets, visualizar series temporales y marcar puntos de cambio a mano o con algoritmos. Convirtió el etiquetado del benchmark en un flujo repetible para todo el equipo.',
      en: 'A web platform to upload datasets, visualise time series and mark change points by hand or with algorithms. It turned the benchmark’s labelling into a repeatable workflow for the whole team.',
    },
    detail: {
      es: 'El benchmark de detectores necesitaba datos reales etiquetados, y etiquetar series temporales a mano en un notebook es lento y propenso a error. DCP lo resuelve: se sube un dataset, se visualiza la serie, y los puntos de cambio se marcan directamente sobre el gráfico o se dejan detectar a un algoritmo.\n\nLas etiquetas se exportan listas para entrenamiento supervisado y alimentan el análisis de acuerdo entre anotadores del pipeline. La herramienta es parte directa del trabajo publicado en ITISE 2026.',
      en: 'The detector benchmark needed labelled real data, and labelling time series by hand in a notebook is slow and error-prone. DCP fixes that: upload a dataset, see the series, and mark change points directly on the chart or let an algorithm detect them.\n\nLabels export ready for supervised training and feed the pipeline’s inter-annotator agreement analysis. The tool is a direct part of the work published at ITISE 2026.',
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
      es: 'Un sistema de IA multi-agente que responde sobre apuntes de curso y además actúa: orquestación inspirada en A2A, memoria conversacional, herramientas transaccionales vía MCP y trazas completas en Langfuse.',
      en: 'A multi-agent AI system that answers over course notes and also acts: A2A-inspired orchestration, conversational memory, transactional tools over MCP and full traces in Langfuse.',
    },
    detail: {
      es: 'Un asistente sobre material de curso necesita más que RAG: algo tiene que decidir qué agente atiende cada consulta, mantener contexto entre turnos y permitir que el sistema ejecute acciones reales en lugar de solo hablar.\n\nLa orquestación reparte el trabajo entre agentes con un patrón inspirado en A2A, las herramientas transaccionales se exponen con Model Context Protocol, y cada traza queda instrumentada en Langfuse para poder depurar por qué el sistema respondió lo que respondió.',
      en: 'An assistant over course material needs more than RAG: something must decide which agent handles each query, keep context across turns and let the system take real actions rather than just talk.\n\nOrchestration splits work across agents with an A2A-inspired pattern, transactional tools are exposed through the Model Context Protocol, and every trace is instrumented in Langfuse so you can debug why the system answered what it did.',
    },
    built: [
      { es: 'Router de agentes con patrón inspirado en A2A.', en: 'Agent router with an A2A-inspired pattern.' },
      { es: 'RAG sobre apuntes del curso con memoria conversacional.', en: 'RAG over course notes with conversational memory.' },
      { es: 'Herramientas transaccionales expuestas como servidor MCP.', en: 'Transactional tools exposed as an MCP server.' },
      { es: 'Observabilidad de punta a punta con Langfuse.', en: 'End-to-end observability with Langfuse.' },
    ],
    tech: ['Python', 'LLM Agents', 'RAG', 'MCP', 'A2A', 'Langfuse'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/ai-agents-rag-mcp-system', kind: 'repo' }],
  },
  {
    id: 'anomaly-distillation',
    title: 'Anomaly Detection — Teacher–Student',
    kind: 'ml',
    year: '2026',
    featured: true,
    status: 'shipped',
    summary: {
      es: 'Detección de anomalías industriales en MVTec AD: CNN desde cero vs. destilación teacher–student con ResNet-18, más un autoencoder U-Net; embeddings analizados con Mahalanobis y DBSCAN.',
      en: 'Industrial anomaly detection on MVTec AD: from-scratch CNN vs. ResNet-18 teacher–student distillation, plus a U-Net autoencoder; embeddings analysed with Mahalanobis and DBSCAN.',
    },
    detail: {
      es: 'Tres estrategias sobre el mismo benchmark: aprender desde cero, transferir por destilación y reconstruir con autoencoder. La evaluación va más allá de la métrica: analiza el espacio de embeddings para entender qué separa realmente cada método. Montado en PyTorch Lightning, con Hydra para configuración y WandB para seguimiento, así que cada corrida es reproducible.',
      en: 'Three strategies on the same benchmark: learn from scratch, transfer through distillation and reconstruct with an autoencoder. Evaluation goes past the metric and analyses the embedding space to see what each method actually separates. Built on PyTorch Lightning with Hydra for config and WandB for tracking, so every run is reproducible.',
    },
    tech: ['PyTorch Lightning', 'Hydra', 'WandB', 'ResNet-18', 'U-Net', 'DBSCAN'],
    links: [
      { label: 'Repositorio', href: 'https://github.com/AllanDBB/nomaly-detection-distillation', kind: 'repo' },
      { label: 'Autoencoder', href: 'https://github.com/AllanDBB/mvtec-autoencoder-reconstruction', kind: 'repo' },
    ],
  },
  {
    id: 'voice-command-ai',
    title: 'Voice Command AI — inferencia on-device',
    kind: 'ml',
    year: '2026',
    status: 'shipped',
    summary: {
      es: 'Pipeline completo de reconocimiento de comandos de voz, del dataset al teléfono, con inferencia 100% en el dispositivo y sin llamadas a servidor.',
      en: 'A complete voice-command recognition pipeline, from dataset to phone, with 100% on-device inference and no server calls.',
    },
    detail: {
      es: 'Preprocesamiento de audio, entrenamiento, cuantización y despliegue móvil. La restricción de diseño — inferencia enteramente en el dispositivo — obliga a negociar explícitamente precisión contra tamaño del modelo.',
      en: 'Audio preprocessing, training, quantisation and mobile deployment. The design constraint — inference entirely on device — forces an explicit trade-off between accuracy and model size.',
    },
    tech: ['Python', 'Deep Learning', 'Audio Processing', 'Quantization', 'Mobile'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/voice-command-ai', kind: 'repo' }],
  },
  {
    id: 'bank-campaign-insights',
    title: 'Bank Campaign Insights',
    kind: 'ml',
    year: '2025',
    status: 'shipped',
    summary: {
      es: 'Exploración y visualización de una campaña de marketing bancario directo para entender qué determina la conversión.',
      en: 'Exploration and visualisation of a direct bank-marketing campaign to understand what drives conversion.',
    },
    tech: ['React', 'Vite', 'Data Analysis', 'Visualization'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/bank-campaign-insights', kind: 'repo' }],
  },

  /* ---------------------------------------------------------------- */
  /* Systems                                                           */
  /* ---------------------------------------------------------------- */
  {
    id: 'genlen',
    title: 'GenLen — Lenguaje genético',
    kind: 'systems',
    year: '2026',
    status: 'active',
    featured: true,
    context: { es: 'Compiladores e Intérpretes · TEC', en: 'Compilers & Interpreters · TEC' },
    summary: {
      es: 'Un lenguaje de propósito específico donde el ADN, el ARN y las proteínas son ciudadanos de primera clase. Editar con CRISPR, transcribir y traducir se escribe como se piensa.',
      en: 'A domain-specific language where DNA, RNA and proteins are first-class citizens. Editing with CRISPR, transcribing and translating read the way you think about them.',
    },
    detail: {
      es: 'La bioinformática obliga a expresar ideas biológicas en lenguajes que no fueron diseñados para eso: una operación simple sobre secuencias termina en decenas de líneas de manipulación de strings.\n\nGenLen propone lo contrario. Los tipos son adn, arn y prot; los programas son laboratorios y las funciones son protocolos; y las operaciones del dominio — cas9, transcribir, traducir — se encadenan con ->. El proyecto cubre la gramática EBNF completa, el explorador léxico con reporte de errores por línea y columna, y su batería de pruebas.',
      en: 'Bioinformatics forces biological ideas into languages never designed for them: a simple operation on sequences ends up as dozens of lines of string manipulation.\n\nGenLen proposes the opposite. The types are adn, arn and prot; programs are labs and functions are protocols; and domain operations — cas9, transcribe, translate — chain with ->. The project covers the full EBNF grammar, a lexer with line-and-column error reporting, and its test suite.',
    },
    code: {
      lang: 'genlen',
      file: 'ejemplos/ejemplo2.gl',
      source: `lab Ejemplo3
/\
    muestra genBase   : adn = adn 'ATGGCCTAGCTA';
    muestra resultado : prot;

    protocolo editarYTraducir(g: adn, corte: adn)
    /\
        muestra editado   : adn;
        muestra mensajero : arn;

        editado   = g->cas9(corte);
        mensajero = editado->transcribir();
        mensajero->traducir();
    \/

    editarYTraducir(genBase, adn 'TAGCTA');
    resultado = genBase->cas9(adn 'TAGCTA')->transcribir()->traducir();
    resultado->mostrar();
\/`,
    },
    tech: ['Python', 'Compilers', 'Language Design', 'EBNF', 'Bioinformatics'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/GenLen', kind: 'repo' }],
  },
  {
    id: 'mr-meeseeks-os',
    title: 'Mr. Meeseeks Box — procesos en C',
    kind: 'systems',
    year: '2026',
    status: 'shipped',
    context: { es: 'IC-6600 Sistemas Operativos · TEC', en: 'IC-6600 Operating Systems · TEC' },
    summary: {
      es: 'La Caja de Mr. Meeseeks hecha sistema operativo: cada solicitud la atienden procesos creados con fork() que se comunican por pipes y comparten contadores en memoria compartida protegidos con semáforos POSIX. Si tarda demasiado: caos planetario.',
      en: 'Mr. Meeseeks’ Box as an operating-systems exercise: every request is served by processes spawned with fork() that talk over pipes and share counters in shared memory guarded by POSIX semaphores. Take too long and you get planetary chaos.',
    },
    detail: {
      es: 'Cada Meeseeks es un proceso. Si la tarea es difícil, se multiplica — más procesos, con la dificultad diluyéndose entre ellos — hasta resolverla o hasta que se acaba el tiempo. Un semáforo contador limita cuántos trabajan a la vez, y la Box lleva la cuenta global en memoria compartida.\n\nLa Box acepta texto libre con dificultad y duración, cálculos aritméticos y lógicos (calc), y ejecución de programas externos (run) usando su código de salida. Tiene modo experimento, semilla reproducible y exportación CSV por solicitud para medir el comportamiento bajo carga.',
      en: 'Every Meeseeks is a process. If the task is hard it multiplies — more processes, with the difficulty diluted between them — until it is solved or time runs out. A counting semaphore caps how many work at once, and the Box keeps the global tally in shared memory.\n\nThe Box takes free text with difficulty and duration, arithmetic and logic expressions (calc), and external programs (run) using their exit code. It has an experiment mode, a reproducible seed and per-request CSV export to measure behaviour under load.',
    },
    code: {
      lang: 'sh',
      file: 'README.md',
      source: `make            # genera ./meeseeks
./meeseeks [-T seg] [-m max_total] [-a max_vivos] [-g ganancia] [-s semilla] [-q] [-x] [-k] [-o salida.csv]

# dentro de la Box
Quiero ser feliz                   # texto libre: pide dificultad y duración
calc (3+4)*2 >= 14 && !0           # cálculo aritmético o lógico
run <comando>                      # usa el código de salida de un programa
adios                              # cierra la Box e imprime el informe`,
    },
    tech: ['C', 'Linux', 'fork / pipe', 'POSIX Semaphores', 'Shared Memory', 'Make'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/Mr.-Meeseeks---OS', kind: 'repo' }],
  },
  {
    id: 'nozzle-benchmark',
    title: 'Supersonic Nozzle Design Benchmark',
    kind: 'systems',
    year: '2026',
    status: 'shipped',
    featured: true,
    summary: {
      es: 'Un framework que diseña toberas supersónicas de tres formas — Método de las Características, RANS en OpenFOAM y optimización — y las compara con el mismo evaluador CFD.',
      en: 'A framework that designs supersonic nozzles three ways — Method of Characteristics, RANS in OpenFOAM and optimisation — and compares them with the same CFD evaluator.',
    },
    detail: {
      es: 'Genera una tobera clásica por MOC como referencia, busca una geometría alternativa por optimización, y evalúa ambas con simulaciones RANS 2D y 3D en OpenFOAM. La salida incluye empuje estimado, pérdida de presión total, gráficas de velocidad sobre el eje y las líneas características del MOC.\n\nTodo corre en Docker con perfiles rápidos y pesados, pensado para que alguien que domina toberas — pero no necesariamente programación — pueda reproducirlo. La pregunta de fondo: cuánto gana realmente la optimización numérica sobre un método analítico bien aplicado.',
      en: 'It generates a classical MOC nozzle as reference, searches for an alternative geometry by optimisation, and evaluates both with 2D and 3D RANS simulations in OpenFOAM. Output includes estimated thrust, total pressure loss, axial velocity plots and the MOC characteristic lines.\n\nEverything runs in Docker with quick and heavy profiles, designed so someone who knows nozzles — but not necessarily programming — can reproduce it. The underlying question: how much numerical optimisation really gains over a well-applied analytical method.',
    },
    built: [
      { es: 'Generador de geometría por Método de las Características.', en: 'Geometry generator by the Method of Characteristics.' },
      { es: 'Evaluación RANS 2D/3D en OpenFOAM dentro de Docker.', en: '2D/3D RANS evaluation in OpenFOAM inside Docker.' },
      { es: 'Búsqueda de geometría por optimización contra el mismo evaluador.', en: 'Geometry search by optimisation against the same evaluator.' },
      { es: 'Reportes y gráficas comparativas automáticas.', en: 'Automatic comparison reports and plots.' },
    ],
    code: {
      lang: 'bash',
      file: 'terminal',
      source: `docker compose build
docker compose run --rm nozzle python3 main_pipeline.py --config docs/rans_2d_quick.json
docker compose run --rm nozzle python3 main_pipeline.py --config docs/rans_3d_heavy.json`,
    },
    tech: ['Python', 'OpenFOAM', 'CFD / RANS', 'Optimization', 'Docker', 'Aerospace'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/nozzle-design-benchmark', kind: 'repo' }],
  },
  {
    id: 'transactional-models',
    title: 'Data Warehouse políglota',
    kind: 'systems',
    year: '2026',
    status: 'shipped',
    context: { es: 'Bases de Datos II · TEC', en: 'Databases II · TEC' },
    summary: {
      es: 'Cinco motores de base de datos — MySQL, SQL Server, Supabase, MongoDB y Neo4j — alimentando un mismo data warehouse mediante capas de extracción y staging orquestadas en Docker.',
      en: 'Five database engines — MySQL, SQL Server, Supabase, MongoDB and Neo4j — feeding one data warehouse through extraction and staging layers orchestrated in Docker.',
    },
    detail: {
      es: 'Relacional, documental y de grafos en un mismo sistema. Cada fuente tiene su ETL hacia un esquema de staging común en el warehouse de SQL Server — incluyendo convertir nodos y aristas de Neo4j en tablas — y un scheduler en contenedor ejecuta la extracción.',
      en: 'Relational, document and graph in one system. Each source has its own ETL into a common staging schema in the SQL Server warehouse — including turning Neo4j nodes and edges into tables — and a containerised scheduler runs the extraction.',
    },
    tech: ['Python', 'SQL Server', 'MySQL', 'MongoDB', 'Neo4j', 'Supabase', 'Docker'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/Transactional-Models-Project', kind: 'repo' }],
  },
  {
    id: 'dwh',
    title: 'Data Warehouse sobre SAP B1',
    kind: 'systems',
    year: '2025',
    status: 'shipped',
    summary: {
      es: 'Restaurar un backup real de SAP Business One, diseñar el modelo dimensional e integrar tres fuentes — backup, tipos de cambio en Excel y ventas agregadas en JSON — en SQL Server.',
      en: 'Restore a real SAP Business One backup, design the dimensional model and integrate three sources — the backup, Excel exchange rates and aggregated JSON sales — into SQL Server.',
    },
    detail: {
      es: 'Tres contenedores: el SQL Server de origen que restaura el backup OLTP, el SQL Server del warehouse con el modelo dimensional (Fact_Sales y siete dimensiones, incluida una de tipo de cambio CRC/USD), y un contenedor de ETL en Python con ODBC que reconstruye el esquema y carga todo de forma idempotente.',
      en: 'Three containers: the source SQL Server restoring the OLTP backup, the warehouse SQL Server with the dimensional model (Fact_Sales plus seven dimensions, including a CRC/USD exchange-rate one), and a Python ETL container over ODBC that rebuilds the schema and loads everything idempotently.',
    },
    tech: ['Python', 'SQL Server', 'Dimensional Modeling', 'ETL', 'Docker', 'pandas'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/DWH_DB2', kind: 'repo' }],
  },
  {
    id: 'tricount-assembly',
    title: 'Tricount en Assembly',
    kind: 'systems',
    year: '2024',
    status: 'shipped',
    context: { es: 'Arquitectura de Computadores · TEC', en: 'Computer Architecture · TEC' },
    summary: {
      es: 'Un gestor de gastos compartidos al estilo Tricount, escrito en ensamblador: memoria, estructuras de datos, E/S y aritmética resueltas a mano.',
      en: 'A Tricount-style shared-expense manager written in assembly: memory, data structures, I/O and arithmetic solved by hand.',
    },
    detail: {
      es: 'Es el proyecto que más me enseñó sobre lo que realmente ocurre debajo del código que escribo todos los días.',
      en: 'It is the project that taught me most about what actually happens beneath the code I write every day.',
    },
    tech: ['Assembly', 'Computer Architecture', 'Low-level'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/Tricount-in-Assembly', kind: 'repo' }],
  },

  /* ---------------------------------------------------------------- */
  /* Products & startups                                               */
  /* ---------------------------------------------------------------- */
  {
    id: 'noddle',
    title: 'Noddle',
    kind: 'product',
    year: '2026',
    status: 'active',
    context: { es: 'Mi startup · Founder', en: 'My startup · Founder' },
    summary: {
      es: 'La app para pedir y pagar desde la mesa, y el POS que lo recibe al instante. Dos lados de la mesa, un solo producto.',
      en: 'The app to order and pay from the table, and the POS that receives it instantly. Two sides of the table, one product.',
    },
    detail: {
      es: 'Del lado del comensal: decidir dónde comer — restaurantes cercanos, un mazo para deslizar y un feed de platos estilo Reels — y después comer sin esperar: escanear el QR de la mesa, pedir, seguir el pedido en vivo, llamar al mesero, dividir la cuenta (lo mío, entre N o por ítem) y pagar con tarjeta, SINPE Móvil o efectivo. Con alergias marcadas en cada fila del menú.\n\nDel lado del restaurante: un POS que funciona como el sistema operativo del lugar, con cuatro modos — salón, cocina, caja y gerencia — donde todo lo que el comensal hace en la app aparece en el momento. La tesis: el comensal ya lo dijo.\n\nApp y POS están completos como demo; el siguiente paso es el backend real y el acceso anticipado.',
      en: 'On the guest side: decide where to eat — nearby restaurants, a swipe deck and a Reels-style dish feed — then eat without waiting: scan the table QR, order, follow the order live, call the waiter, split the bill (mine, between N or by item) and pay by card, SINPE Móvil or cash. With allergens flagged on every menu row.\n\nOn the restaurant side: a POS that works as the operating system of the place, with four modes — floor, kitchen, till and management — where everything the guest does in the app shows up instantly. The thesis: the guest already said it.\n\nApp and POS are complete as demos; next comes the real backend and early access.',
    },
    built: [
      { es: 'App móvil en Flutter para iOS y Android.', en: 'Flutter mobile app for iOS and Android.' },
      { es: 'POS en Flutter para tablet, teléfono y web, con cocina (KDS), caja y gerencia.', en: 'Flutter POS for tablet, phone and web, with kitchen (KDS), till and management.' },
      { es: 'Sincronización en vivo entre lo que pide la mesa y lo que ve la cocina.', en: 'Live sync between what the table orders and what the kitchen sees.' },
      { es: 'Marca, landing pública y lista de acceso anticipado en noddleapp.com.', en: 'Brand, public landing and early-access waitlist at noddleapp.com.' },
    ],
    metrics: [
      { value: '2', label: { es: 'productos: app y POS', en: 'products: app and POS' } },
      { value: '4', label: { es: 'modos del POS', en: 'POS modes' } },
      { value: '960+', label: { es: 'commits en su primer mes', en: 'commits in its first month' } },
    ],
    tech: ['Flutter', 'Dart', 'iOS', 'Android', 'Astro', 'SINPE Móvil'],
    links: [{ label: 'Ver en vivo', href: 'https://noddleapp.com', kind: 'demo' }],
    image: '/images/noddle.png',
  },
  {
    id: 'gourmetgo',
    title: 'GourmetGo',
    kind: 'product',
    year: '2025',
    status: 'shipped',
    summary: {
      es: 'Marketplace móvil de dos lados para descubrir y reservar experiencias culinarias — cenas temáticas, clases de cocina, eventos — con panel para chefs y restaurantes.',
      en: 'A two-sided mobile marketplace to discover and book culinary experiences — themed dinners, cooking classes, events — with a panel for chefs and restaurants.',
    },
    detail: {
      es: 'Los usuarios exploran y reservan; los chefs gestionan sus experiencias, participantes y contenido. Incluye autenticación, reservas con código QR, sistema de calificaciones y un chatbot de soporte. App nativa en Kotlin con backend propio.',
      en: 'Users browse and book; chefs manage their experiences, participants and content. It includes authentication, QR-code bookings, a ratings system and a support chatbot. Native Kotlin app with its own backend.',
    },
    built: [
      { es: 'App Android nativa en Kotlin.', en: 'Native Android app in Kotlin.' },
      { es: 'Reservas con código QR y control de asistencia.', en: 'QR-code bookings and attendance control.' },
      { es: 'Panel para chefs y restaurantes.', en: 'Panel for chefs and restaurants.' },
      { es: 'Calificaciones y chatbot de soporte.', en: 'Ratings and a support chatbot.' },
    ],
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
      es: 'Plataforma para gestionar eventos masivos en Centroamérica: creación de eventos, control de acceso, reservas y reportes, en web y móvil.',
      en: 'A platform for managing large-scale events in Central America: event creation, access control, bookings and reports, on web and mobile.',
    },
    detail: {
      es: 'Backend en NestJS sobre MongoDB y un único cliente en React Native para web y móvil. Los administradores crean eventos, controlan el acceso y generan informes; los asistentes exploran, reservan y gestionan sus entradas.',
      en: 'A NestJS backend on MongoDB and a single React Native client for web and mobile. Admins create events, control access and generate reports; attendees browse, book and manage their tickets.',
    },
    tech: ['NestJS', 'TypeScript', 'React Native', 'Expo', 'MongoDB'],
    links: [
      { label: 'Ver en vivo', href: 'https://logi-events-phi.vercel.app', kind: 'demo' },
      { label: 'Repositorio', href: 'https://github.com/AllanDBB/LogiEvents', kind: 'repo' },
    ],
  },
  {
    id: 'h2ome',
    title: 'H2OME — RetoMarte 2024',
    kind: 'product',
    year: '2024',
    status: 'shipped',
    context: { es: 'Equipo Yaku Mars · final internacional en Madrid', en: 'Team Yaku Mars · international finals in Madrid' },
    summary: {
      es: 'App para que astronautas y colonos en Marte monitoreen su salud y su vida diaria. Ganó la edición nacional de RetoMarte y llevó al equipo a la final internacional en España.',
      en: 'An app for astronauts and settlers on Mars to monitor their health and daily life. It won the national RetoMarte edition and took the team to the international finals in Spain.',
    },
    detail: {
      es: 'Construida en un hackatón: monitoreo de signos vitales, calendario de citas médicas, un asistente virtual con IA para preguntas de salud y noticias de la colonia. React Native con Expo y TypeScript.',
      en: 'Built at a hackathon: vital-sign monitoring, a medical appointment calendar, an AI virtual assistant for health questions and colony news. React Native with Expo and TypeScript.',
    },
    tech: ['React Native', 'Expo', 'TypeScript', 'AI Assistant'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/H2OME-APP', kind: 'repo' }],
    image: '/images/retomarte.jpg',
  },
  {
    id: 'sibora',
    title: 'Siböra',
    kind: 'product',
    year: '2025',
    status: 'active',
    context: { es: 'Startup eco-tech', en: 'Eco-tech startup' },
    summary: {
      es: 'Startup de innovación regenerativa: tecnología, sostenibilidad y gamificación para que comunidades y organizaciones participen en prácticas que regeneran ecosistemas.',
      en: 'A regenerative-innovation startup: technology, sustainability and gamification so communities and organisations can take part in practices that regenerate ecosystems.',
    },
    detail: {
      es: 'Puntos, tokens y recompensas para que el progreso sostenible se vea y se comparta. Identidad de marca propia — un símbolo circular de semilla, ciclo y energía — y un stack planeado sobre React / React Native, NestJS y PostgreSQL, con NFC y tokens como siguiente paso.',
      en: 'Points, tokens and rewards so sustainable progress can be seen and shared. Its own brand identity — a circular seed-cycle-energy mark — and a planned stack on React / React Native, NestJS and PostgreSQL, with NFC and tokens as next steps.',
    },
    tech: ['TypeScript', 'React', 'NestJS', 'PostgreSQL', 'Gamification'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/Sibora', kind: 'repo' }],
  },
  {
    id: 'budgetme',
    title: 'BudgetMe',
    kind: 'product',
    year: '2026',
    status: 'active',
    summary: {
      es: 'Finanzas personales que no solo registran el pasado: identifica patrones de consumo y proyecta escenarios con modelos de aprendizaje automático.',
      en: 'Personal finance that does more than record the past: it finds spending patterns and projects scenarios with machine learning models.',
    },
    tech: ['Machine Learning', 'Forecasting', 'Web'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/BudgetMe', kind: 'repo' }],
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
    context: { es: 'Desarrollador full-stack · en producción', en: 'Full-stack developer · in production' },
    summary: {
      es: 'El sitio institucional del Colegio Científico de Alajuela, rehecho para ser rápido: ~30% menos tiempo de carga y 25% menos latencia gracias a un microservicio en Node.js.',
      en: 'The institutional site for Colegio Científico de Alajuela, rebuilt to be fast: ~30% less load time and 25% less latency thanks to a Node.js microservice.',
    },
    detail: {
      es: 'Programas académicos, noticias y recursos para estudiantes y familias. El trabajo no fue solo construir el sitio sino hacerlo rápido: arquitectura modular, optimización del frontend y un microservicio dedicado a las solicitudes de datos en tiempo real.',
      en: 'Academic programmes, news and resources for students and families. The job was not just building the site but making it fast: modular architecture, frontend optimisation and a microservice dedicated to real-time data requests.',
    },
    metrics: [
      { value: '−30%', label: { es: 'tiempo de carga', en: 'load time' } },
      { value: '−25%', label: { es: 'latencia operacional', en: 'operational latency' } },
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Performance'],
    links: [
      { label: 'Ver en vivo', href: 'https://ccalajuela.ed.cr', kind: 'demo' },
      { label: 'Repositorio', href: 'https://github.com/AllanDBB/CCAL-Website', kind: 'repo' },
    ],
    image: '/images/ccalajuela_web.png',
  },
  {
    id: 'petziclub-web',
    title: 'PetziClub',
    kind: 'web',
    year: '2024',
    status: 'shipped',
    context: { es: 'PetziClub · en producción', en: 'PetziClub · in production' },
    summary: {
      es: 'Sitio corporativo de PetziClub: catálogo, reservas, galería de servicios e información para dueños de mascotas.',
      en: 'PetziClub’s corporate site: catalogue, bookings, service gallery and information for pet owners.',
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
    context: { es: 'Freelance · open source', en: 'Freelance · open source' },
    summary: {
      es: 'Sitio web freelance para KuraForce, responsivo y de código abierto.',
      en: 'A freelance website for KuraForce, responsive and open source.',
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
    id: 'console-conqueror',
    title: 'Console Conqueror',
    kind: 'academic',
    year: '2025',
    status: 'shipped',
    summary: {
      es: 'Juego de cartas multijugador cliente-servidor en Java: salas, combate por turnos y comandos, con patrones Command y Strategy para acciones y ataques.',
      en: 'A client-server multiplayer card game in Java: rooms, turn-based combat and commands, with Command and Strategy patterns for actions and attacks.',
    },
    tech: ['Java', 'Sockets', 'Swing', 'Design Patterns'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/Console-Conqueror', kind: 'repo' }],
  },
  {
    id: 'death-and-reincarnation',
    title: 'Death and Reincarnation',
    kind: 'academic',
    year: '2025',
    status: 'shipped',
    context: { es: 'Estructuras de Datos · TEC', en: 'Data Structures · TEC' },
    summary: {
      es: 'Simulación de una humanidad entera — personas, muertes, cielo, ángeles y reencarnación — sobre estructuras de datos propias, con interfaz en Qt/C++.',
      en: 'A simulation of an entire humanity — people, deaths, heaven, angels and reincarnation — on hand-built data structures, with a Qt/C++ interface.',
    },
    tech: ['C++', 'Qt', 'Data Structures', 'Simulation'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/Death-and-reincarnation', kind: 'repo' }],
  },
  {
    id: 'graphebbean',
    title: 'Pirates of the Graphebbean',
    kind: 'academic',
    year: '2024',
    status: 'shipped',
    context: { es: 'Estructuras de Datos · TEC', en: 'Data Structures · TEC' },
    summary: {
      es: 'Proyecto de Estructuras de Datos en Java centrado en grafos: recorridos, caminos mínimos y visualización.',
      en: 'A Data Structures project in Java centred on graphs: traversals, shortest paths and visualisation.',
    },
    tech: ['Java', 'Graphs', 'Data Structures'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/Pirates-of-Graphebbean', kind: 'repo' }],
  },
  {
    id: 'soltura-db',
    title: 'Soltura DB',
    kind: 'academic',
    year: '2025',
    status: 'shipped',
    context: { es: 'Bases de Datos I · TEC', en: 'Databases I · TEC' },
    summary: {
      es: 'Base de datos en T-SQL: modelado relacional, procedimientos almacenados e integridad referencial.',
      en: 'A T-SQL database: relational modelling, stored procedures and referential integrity.',
    },
    tech: ['T-SQL', 'SQL Server', 'Database Design'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/Soltura_DB', kind: 'repo' }],
  },
  {
    id: 'object-recognition',
    title: 'Object Recognition',
    kind: 'academic',
    year: '2025',
    status: 'shipped',
    context: { es: 'Requerimientos de Software · TEC', en: 'Software Requirements · TEC' },
    summary: {
      es: 'Aplicación de reconocimiento de objetos con visión por computadora.',
      en: 'An object recognition app using computer vision.',
    },
    tech: ['TypeScript', 'Computer Vision'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/ObjectRecognition', kind: 'repo' }],
  },
  {
    id: 'tournament-manager',
    title: 'Tournament Manager',
    kind: 'academic',
    year: '2025',
    status: 'shipped',
    summary: {
      es: 'Gestor de torneos en TypeScript: emparejamientos, brackets y resultados.',
      en: 'A tournament manager in TypeScript: pairings, brackets and results.',
    },
    tech: ['TypeScript', 'React'],
    links: [{ label: 'Repositorio', href: 'https://github.com/AllanDBB/tournament-manager', kind: 'repo' }],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function projectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
