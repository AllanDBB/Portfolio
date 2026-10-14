import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Locale } from './types'

type Dict = Record<string, unknown>

const dict: Record<Locale, Dict> = {
  es: {
    nav: { home: 'Inicio', work: 'Trayectoria', research: 'Investigación', projects: 'Proyectos', about: 'Perfil' },
    hero: {
      available: 'Abierto a oportunidades',
      scroll: 'Desliza',
      role: 'Ingeniero de software\ne investigador en IA',
      index: 'Portafolio — Edición 2026',
    },
    home: {
      manifesto: 'Manifiesto',
      numbers: 'En cifras',
      research: 'Investigación',
      researchTitle: 'Publicado y _en curso_',
      work: 'Trabajo seleccionado',
      workTitle: 'Cosas que _se despliegan_',
      dragHint: 'Desliza para recorrer',
      experience: 'Trayectoria',
      experienceTitle: 'Dónde he _estado_',
      recognition: 'Reconocimientos',
      recognitionTitle: 'Competir _contra el reloj_',
      founderTitle: 'Modo _fundador_',
      founderLead: 'Me encantan las startups. La parte de investigar me da las preguntas; la parte de fundar me obliga a responderlas con algo que exista. Esto es lo que estoy construyendo ahora.',
      seeAllResearch: 'Toda la investigación',
      seeAllWork: 'Trayectoria completa',
      seeAllProjects: 'Todos los proyectos',
      stack: 'Stack',
    },
    stats: {
      algos: 'algoritmos de detección comparados en el benchmark publicado',
      wro: 'lugar — World Robot Olympiad Internacional, categoría IA',
      roles: 'roles entre investigación aplicada y producción',
      projects: 'proyectos, del modelo al producto desplegado',
    },
    work: {
      title: 'Trayectoria',
      lead: 'Seis posiciones entre investigación aplicada en el TEC y arquitectura de software en producción.',
      present: 'Hoy',
      education: 'Formación',
      community: 'Comunidad y liderazgo',
      letters: 'Cartas de recomendación',
      openLetter: 'Abrir carta',
      research: 'Investigación',
      engineering: 'Ingeniería',
    },
    research: {
      title: 'Investigación',
      lead: 'Detección de puntos de cambio, arritmias en series cardíacas y neuroingeniería: el cerebro como sistema dinámico. Una publicación revisada por pares y varias líneas abiertas.',
      paper: 'Publicación',
      line: 'Línea de investigación',
      experiment: 'Experimento',
      abstract: 'Resumen',
      published: 'Publicado',
      cite: 'Copiar cita',
      copied: 'Cita copiada',
      read: 'Leer',
    },
    projects: {
      title: 'Proyectos',
      lead: 'Del modelo entrenado al producto desplegado.',
      all: 'Todos',
      science: 'Ciencia y neuro',
      ml: 'IA y datos',
      systems: 'Sistemas',
      product: 'Productos',
      web: 'Web',
      academic: 'Académicos',
      empty: 'No hay proyectos en esta categoría.',
      view: 'Ver',
    },
    detail: {
      back: 'Proyectos',
      about: 'Sobre el proyecto',
      stack: 'Stack',
      year: 'Año',
      type: 'Tipo',
      status: 'Estado',
      links: 'Enlaces',
      next: 'Siguiente',
      built: 'Qué construí',
      numbers: 'En números',
    },
    about: {
      title: 'Perfil',
      skills: 'Capacidades',
      languages: 'Idiomas',
      education: 'Formación',
      ventures: 'Iniciativas',
      downloadCV: 'Descargar CV',
      principles: 'Cómo trabajo',
    },
    status: { shipped: 'Entregado', active: 'En curso', research: 'Investigación', archived: 'Archivado' },
    footer: {
      kicker: 'Contacto',
      copy: 'Copiar',
      copied: '¡Copiado!',
      copyHint: 'Click para copiar el correo',
      elsewhere: 'En otros lados',
      local: 'Hora local',
      status: 'Estado',
      built: 'Diseñado y construido a mano',
      top: 'Volver arriba ↑',
    },
    common: {
      viewLive: 'Ver en vivo',
      repository: 'Repositorio',
      theme: 'Cambiar tema',
      language: 'Cambiar idioma',
      menu: 'Menú',
      close: 'Cerrar',
      notFound: 'Señal perdida',
      notFoundLead: 'La ruta que buscás no existe. Ningún algoritmo detectó esta página.',
      goHome: 'Volver al inicio',
      open: 'Abrir',
    },
  },
  en: {
    nav: { home: 'Index', work: 'Experience', research: 'Research', projects: 'Projects', about: 'Profile' },
    hero: {
      available: 'Open to opportunities',
      scroll: 'Scroll',
      role: 'Software engineer\n& AI researcher',
      index: 'Portfolio — 2026 Edition',
    },
    home: {
      manifesto: 'Manifesto',
      numbers: 'By the numbers',
      research: 'Research',
      researchTitle: 'Published & _ongoing_',
      work: 'Selected work',
      workTitle: 'Things that _ship_',
      dragHint: 'Scroll to explore',
      experience: 'Experience',
      experienceTitle: 'Where I have _been_',
      recognition: 'Recognition',
      recognitionTitle: 'Racing _the clock_',
      founderTitle: 'Founder _mode_',
      founderLead: 'I love startups. Research gives me the questions; founding forces me to answer them with something that exists. This is what I am building right now.',
      seeAllResearch: 'All research',
      seeAllWork: 'Full experience',
      seeAllProjects: 'All projects',
      stack: 'Stack',
    },
    stats: {
      algos: 'online change point detectors compared in the published benchmark',
      wro: 'place — World Robot Olympiad International, AI category',
      roles: 'roles across applied research and production',
      projects: 'projects, from trained model to shipped product',
    },
    work: {
      title: 'Experience',
      lead: 'Six positions across applied research at TEC and software architecture in production.',
      present: 'Now',
      education: 'Education',
      community: 'Community & leadership',
      letters: 'Letters of recommendation',
      openLetter: 'Open letter',
      research: 'Research',
      engineering: 'Engineering',
    },
    research: {
      title: 'Research',
      lead: 'Change point detection, arrhythmias in cardiac series and neuroengineering: the brain as a dynamical system. One peer-reviewed publication and several open lines.',
      paper: 'Publication',
      line: 'Research line',
      experiment: 'Experiment',
      abstract: 'Abstract',
      published: 'Published',
      cite: 'Copy citation',
      copied: 'Citation copied',
      read: 'Read',
    },
    projects: {
      title: 'Projects',
      lead: 'From the trained model to the deployed product.',
      all: 'All',
      science: 'Science & neuro',
      ml: 'AI & data',
      systems: 'Systems',
      product: 'Products',
      web: 'Web',
      academic: 'Academic',
      empty: 'No projects in this category.',
      view: 'View',
    },
    detail: {
      back: 'Projects',
      about: 'About the project',
      stack: 'Stack',
      year: 'Year',
      type: 'Type',
      status: 'Status',
      links: 'Links',
      next: 'Next',
      built: 'What I built',
      numbers: 'By the numbers',
    },
    about: {
      title: 'Profile',
      skills: 'Capabilities',
      languages: 'Languages',
      education: 'Education',
      ventures: 'Ventures',
      downloadCV: 'Download CV',
      principles: 'How I work',
    },
    status: { shipped: 'Shipped', active: 'Ongoing', research: 'Research', archived: 'Archived' },
    footer: {
      kicker: 'Contact',
      copy: 'Copy',
      copied: 'Copied!',
      copyHint: 'Click to copy the address',
      elsewhere: 'Elsewhere',
      local: 'Local time',
      status: 'Status',
      built: 'Designed & built by hand',
      top: 'Back to top ↑',
    },
    common: {
      viewLive: 'View live',
      repository: 'Repository',
      theme: 'Toggle theme',
      language: 'Toggle language',
      menu: 'Menu',
      close: 'Close',
      notFound: 'Signal lost',
      notFoundLead: 'The route you are looking for does not exist. No detector fired on this page.',
      goHome: 'Back home',
      open: 'Open',
    },
  },
}

function get(obj: Dict, path: string): string {
  const value = path
    .split('.')
    .reduce<unknown>((acc, key) => (acc && typeof acc === 'object' ? (acc as Dict)[key] : undefined), obj)
  return typeof value === 'string' ? value : path
}

type I18nValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  toggleLocale: () => void
  t: (key: string) => string
}

const I18nCtx = createContext<I18nValue>({
  locale: 'es',
  setLocale: () => {},
  toggleLocale: () => {},
  t: (k) => k,
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Always start at 'es' so server-rendered HTML and first client render agree.
  const [locale, setLocale] = useState<Locale>('es')

  useEffect(() => {
    const saved = localStorage.getItem('locale')
    if (saved === 'es' || saved === 'en') setLocale(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale((l) => (l === 'es' ? 'en' : 'es')),
      t: (key: string) => get(dict[locale], key),
    }),
    [locale]
  )

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>
}

export function useI18n() {
  return useContext(I18nCtx)
}
