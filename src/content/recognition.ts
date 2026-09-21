import type { Award, Involvement, Letter } from '../types'

export const awards: Award[] = [
  {
    id: 'wro-2023',
    title: 'World Robot Olympiad International',
    place: { es: '1er lugar — categoría AI Project', en: '1st place — AI Project category' },
    year: '2023',
    org: { es: 'Competencia internacional', en: 'International competition' },
    summary: {
      es: 'Primer lugar en la categoría de proyectos de inteligencia artificial de la final internacional, con una solución construida para resolver un desafío abierto de robótica.',
      en: 'First place in the artificial intelligence project category at the international finals, with a solution built to solve an open robotics challenge.',
    },
    image: '/images/wro.jpg',
  },
  {
    id: 'oci-2023',
    title: 'Olimpiada Nacional de Programación',
    place: { es: 'Medalla de oro absoluta', en: 'Absolute gold medal' },
    year: '2023',
    org: { es: 'Costa Rica', en: 'Costa Rica' },
    summary: {
      es: 'Oro absoluto a nivel nacional, resolviendo problemas de algoritmos y estructuras de datos bajo tiempo.',
      en: 'Absolute national gold, solving algorithm and data structure problems under time pressure.',
    },
    image: '/images/oci.png',
  },
  {
    id: 'retomarte-2024',
    title: 'RetoMarte',
    place: { es: 'Ganador nacional — final internacional en España', en: 'National winner — international finals in Spain' },
    year: '2024',
    org: { es: 'Equipo Yaku Mars', en: 'Team Yaku Mars' },
    summary: {
      es: 'Ganadores de la edición nacional con el proyecto H2OME, enfocado en gestión de agua, avanzando a la final internacional en España.',
      en: 'Winners of the national edition with H2OME, a water management project, advancing to the international finals in Spain.',
    },
    image: '/images/retomarte.jpg',
  },
]

export const involvement: Involvement[] = [
  {
    id: 'embs-chair',
    kind: 'leadership',
    role: { es: 'Chair — IEEE EMBS, capítulo estudiantil TEC', en: 'Chair — IEEE EMBS, TEC student chapter' },
    org: 'IEEE Engineering in Medicine and Biology Society',
    period: '2025 —',
    summary: {
      es: 'Dirijo el capítulo estudiantil de IEEE EMBS en el TEC: organizo actividades, workshops y mentorías para estudiantes interesados en ingeniería biomédica y aplicaciones de machine learning en salud.',
      en: 'I lead the IEEE EMBS student chapter at TEC: organizing activities, workshops and mentoring for students interested in biomedical engineering and machine learning applications in healthcare.',
    },
    image: '/images/embs_chair.jpg',
  },
  {
    id: 'acm-icimi',
    kind: 'volunteering',
    role: { es: 'Voluntario estudiantil — ACM ICIMI Costa Rica', en: 'Student volunteer — ACM ICIMI Costa Rica' },
    org: 'ACM International Conference on Intelligent Manufacturing and Internet of Things',
    period: '2024',
    summary: {
      es: 'Apoyo en logística, coordinación de sesiones y asistencia a participantes durante la conferencia.',
      en: 'Support in logistics, session coordination and participant assistance throughout the conference.',
    },
    image: '/images/BIP.png',
  },
  {
    id: 'ieee-cr',
    kind: 'volunteering',
    role: { es: 'Voluntario — Conferencias IEEE Sección Costa Rica', en: 'Volunteer — IEEE Costa Rica Section conferences' },
    org: 'IEEE Costa Rica Section',
    period: '2024 — 2025',
    summary: {
      es: 'Colaboración en la organización de múltiples conferencias técnicas de la sección, incluyendo CONCAPAN.',
      en: 'Collaboration in organizing multiple technical conferences for the section, including CONCAPAN.',
    },
    image: '/images/CONCAPAN.jpg',
  },
  {
    id: 'alphafold',
    kind: 'talk',
    role: { es: 'Workshop AlphaFold — predicción de estructura proteica con IA', en: 'AlphaFold Workshop — protein structure prediction with AI' },
    org: 'Universidad de Costa Rica',
    period: '2025',
    summary: {
      es: 'Workshop especializado en predicción de estructura de proteínas usando AlphaFold y técnicas de inteligencia artificial aplicadas a bioinformática.',
      en: 'Specialized workshop on protein structure prediction using AlphaFold and AI techniques applied to bioinformatics.',
    },
    image: '/images/workshop_alphafold.jpg',
  },
]

export const letters: Letter[] = [
  {
    id: 'esteban',
    author: 'Esteban',
    role: { es: 'Carta de recomendación', en: 'Letter of recommendation' },
    href: '/Recommendationletters/carta_esteban.pdf',
  },
  {
    id: 'martin',
    author: 'Martín',
    role: { es: 'Carta de recomendación', en: 'Letter of recommendation' },
    href: '/Recommendationletters/carta_martin.pdf',
  },
  {
    id: 'sam',
    author: 'Sam',
    role: { es: 'Carta de recomendación', en: 'Letter of recommendation' },
    href: '/Recommendationletters/carta_sam.pdf',
  },
]
