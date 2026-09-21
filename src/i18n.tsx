import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Locale } from './types'

type Dict = Record<string, unknown>

const dict: Record<Locale, Dict> = {
  es: {
    nav: {
      home: 'Inicio',
      work: 'Trayectoria',
      research: 'Investigación',
      projects: 'Proyectos',
      about: 'Perfil',
    },
    hero: {
      scroll: 'Seguir',
      available: 'Abierto a oportunidades',
    },
    home: {
      selectedResearch: 'Investigación seleccionada',
      selectedWork: 'Trabajo seleccionado',
      currently: 'Actualmente',
      recognition: 'Reconocimientos',
      seeAllResearch: 'Toda la investigación',
      seeAllWork: 'Toda la trayectoria',
      seeAllProjects: 'Todos los proyectos',
      twoTracks: 'Dos frentes',
      researchTrack: 'Investigación',
      engineeringTrack: 'Ingeniería',
    },
    work: {
      title: 'Trayectoria',
      lead: 'Seis posiciones entre investigación aplicada y arquitectura de software.',
      present: 'Actualidad',
      responsibilities: 'Responsabilidades',
      education: 'Formación',
      community: 'Comunidad y liderazgo',
      letters: 'Cartas de recomendación',
      openLetter: 'Abrir carta',
    },
    research: {
      title: 'Investigación',
      lead: 'Series temporales, detección de cambios y sistemas cognitivos.',
      paper: 'Publicación',
      line: 'Línea de investigación',
      experiment: 'Experimento',
      abstract: 'Resumen',
    },
    projects: {
      title: 'Proyectos',
      lead: 'Del modelo entrenado al producto desplegado.',
      all: 'Todos',
      ml: 'IA y datos',
      systems: 'Sistemas y lenguajes',
      product: 'Productos',
      web: 'Web',
      academic: 'Académicos',
      empty: 'No hay proyectos en esta categoría.',
      count: 'proyectos',
    },
    detail: {
      back: 'Volver a proyectos',
      about: 'Sobre el proyecto',
      stack: 'Stack',
      year: 'Año',
      links: 'Enlaces',
      next: 'Siguiente proyecto',
    },
    about: {
      title: 'Perfil',
      lead: 'Quién soy y cómo trabajo.',
      skills: 'Capacidades técnicas',
      languages: 'Idiomas',
      education: 'Formación',
      ventures: 'Iniciativas',
      contact: 'Contacto',
      downloadCV: 'Descargar CV',
    },
    status: {
      shipped: 'Entregado',
      active: 'En curso',
      research: 'Investigación',
      archived: 'Archivado',
    },
    footer: {
      built: 'Diseñado y construido por Allan Bolaños',
      source: 'Código fuente',
      rights: 'Todos los derechos reservados.',
    },
    common: {
      viewLive: 'Ver en vivo',
      repository: 'Repositorio',
      readPaper: 'Leer el paper',
      theme: 'Cambiar tema',
      language: 'Cambiar idioma',
      menu: 'Menú',
      close: 'Cerrar',
      notFound: 'Página no encontrada',
      notFoundLead: 'La ruta que buscás no existe.',
      goHome: 'Ir al inicio',
    },
  },
  en: {
    nav: {
      home: 'Home',
      work: 'Experience',
      research: 'Research',
      projects: 'Projects',
      about: 'Profile',
    },
    hero: {
      scroll: 'Continue',
      available: 'Open to opportunities',
    },
    home: {
      selectedResearch: 'Selected research',
      selectedWork: 'Selected work',
      currently: 'Currently',
      recognition: 'Recognition',
      seeAllResearch: 'All research',
      seeAllWork: 'Full experience',
      seeAllProjects: 'All projects',
      twoTracks: 'Two tracks',
      researchTrack: 'Research',
      engineeringTrack: 'Engineering',
    },
    work: {
      title: 'Experience',
      lead: 'Six positions across applied research and software architecture.',
      present: 'Present',
      responsibilities: 'Responsibilities',
      education: 'Education',
      community: 'Community & leadership',
      letters: 'Letters of recommendation',
      openLetter: 'Open letter',
    },
    research: {
      title: 'Research',
      lead: 'Time series, change detection and cognitive systems.',
      paper: 'Publication',
      line: 'Research line',
      experiment: 'Experiment',
      abstract: 'Abstract',
    },
    projects: {
      title: 'Projects',
      lead: 'From the trained model to the deployed product.',
      all: 'All',
      ml: 'AI & data',
      systems: 'Systems & languages',
      product: 'Products',
      web: 'Web',
      academic: 'Academic',
      empty: 'No projects in this category.',
      count: 'projects',
    },
    detail: {
      back: 'Back to projects',
      about: 'About the project',
      stack: 'Stack',
      year: 'Year',
      links: 'Links',
      next: 'Next project',
    },
    about: {
      title: 'Profile',
      lead: 'Who I am and how I work.',
      skills: 'Technical skills',
      languages: 'Languages',
      education: 'Education',
      ventures: 'Ventures',
      contact: 'Contact',
      downloadCV: 'Download CV',
    },
    status: {
      shipped: 'Shipped',
      active: 'Ongoing',
      research: 'Research',
      archived: 'Archived',
    },
    footer: {
      built: 'Designed and built by Allan Bolaños',
      source: 'Source code',
      rights: 'All rights reserved.',
    },
    common: {
      viewLive: 'View live',
      repository: 'Repository',
      readPaper: 'Read the paper',
      theme: 'Toggle theme',
      language: 'Toggle language',
      menu: 'Menu',
      close: 'Close',
      notFound: 'Page not found',
      notFoundLead: 'The route you are looking for does not exist.',
      goHome: 'Go home',
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
