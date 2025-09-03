import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Locale } from './types'

type Dict = Record<string, any>

const dict: Record<Locale, Dict> = {
  es: {
    technologies: 'Tecnologías',
    languages: 'Idiomas',
    startups: 'Startups',
    seeAll: 'Ver todas',
    thanks: '¡Gracias por ver! 🦝',
    status: { done: 'Terminado', in_progress: 'En progreso', canceled: 'Cancelado', planned: 'Planeado' },
    tabs: {
      laborales: 'Laborales',
      tecnologicos: 'Tecnológicos',
      cientificos: 'Científicos',
      gastronomia: 'Gastronomía',
      voluntariados: 'Voluntariados',
      conferencias: 'Conferencias',
      premios: 'Premios',
    },
    notes: {
      laborales: 'Trabajos y colaboraciones destacadas. Selección curada.',
      tecnologicos: 'Prototipos y exploraciones técnicas que me divirtieron.',
      cientificos: 'Ciencia de datos, papers y visualizaciones.',
      gastronomia: 'Me encanta cocinar, así que verás intentos y “fallos” sabrosos.',
      voluntariados: 'Proyectos y liderazgo como voluntario en comunidades.',
      conferencias: 'Charlas, workshops y presentaciones que he estado.',
      premios: 'Reconocimientos y logros que me han otorgado.',
    },
  },
  en: {
    technologies: 'Technologies',
    languages: 'Languages',
    startups: 'Startups',
    seeAll: 'See all',
    thanks: 'Thanks for visiting! 🦝',
    status: { done: 'Ended', in_progress: 'In progress', canceled: 'Canceled', planned: 'Planned' },
    tabs: {
      laborales: 'Work',
      tecnologicos: 'Tech',
      cientificos: 'Scientific',
      gastronomia: 'Gastronomy',
      voluntariados: 'Volunteering',
      conferencias: 'Talks',
      premios: 'Awards',
    },
    notes: {
      laborales: 'Selected work and collaborations.',
      tecnologicos: 'Playground prototypes and technical explorations.',
      cientificos: 'Data science, papers and visualizations.',
      gastronomia: 'I love cooking — you will find tasty experiments.',
      voluntariados: 'Community volunteering and leadership initiatives.',
      conferencias: 'Talks, workshops and presentations I have attended.',
      premios: 'Recognitions and awards received.',
    },
  },
}

function get(obj: Dict, path: string): string {
  return path.split('.').reduce((acc: any, k) => (acc ? acc[k] : undefined), obj) ?? path
}

const I18nCtx = createContext<{
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}>({ locale: 'es', setLocale: () => {}, t: (k) => k })

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('es')
  useEffect(() => {
    const saved = (localStorage.getItem('locale') as Locale | null) || 'es'
    setLocale(saved)
  }, [])
  useEffect(() => {
    localStorage.setItem('locale', locale)
  }, [locale])
  const t = useMemo(() => (key: string) => get(dict[locale], key), [locale])
  const value = useMemo(() => ({ locale, setLocale, t }), [locale])
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>
}

export function useI18n() {
  return useContext(I18nCtx)
}
