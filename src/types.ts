export type Locale = 'es' | 'en'

/** A string that exists in both languages. */
export type L10n = { es: string; en: string }

/** Resolve an L10n (or a plain string) for the active locale. */
export function tr(value: L10n | string, locale: Locale): string {
  return typeof value === 'string' ? value : value[locale]
}

export type Status = 'shipped' | 'active' | 'research' | 'archived'

export type LinkRef = {
  label: string
  href: string
  kind?: 'repo' | 'demo' | 'paper' | 'org' | 'doc'
}

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type Experience = {
  id: string
  role: L10n
  org: string
  orgUrl?: string
  /** Employment shape, e.g. "Part-time · Remote". */
  mode: L10n
  start: string
  /** `null` means current. */
  end: string | null
  summary: L10n
  highlights: L10n[]
  tech: string[]
  image?: string
  /** Groups the two halves of the hybrid positioning. */
  track: 'research' | 'engineering'
}

/* ------------------------------------------------------------------ */
/* Research                                                            */
/* ------------------------------------------------------------------ */

export type ResearchKind = 'paper' | 'line' | 'experiment'

export type Research = {
  id: string
  title: string
  kind: ResearchKind
  year: string
  venue?: L10n
  status: Status
  abstract: L10n
  /** Longer body shown on the detail page. */
  detail?: L10n
  tech: string[]
  links: LinkRef[]
  image?: string
  featured?: boolean
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectKind = 'ml' | 'systems' | 'product' | 'web' | 'academic'

export const PROJECT_KINDS: ProjectKind[] = ['ml', 'systems', 'product', 'web', 'academic']

export type Project = {
  /** URL slug — must be unique, used at /projects/:id */
  id: string
  title: string
  kind: ProjectKind
  year: string
  status: Status
  summary: L10n
  detail?: L10n
  tech: string[]
  links: LinkRef[]
  image?: string
  images?: string[]
  featured?: boolean
}

/* ------------------------------------------------------------------ */
/* Recognition & community                                             */
/* ------------------------------------------------------------------ */

export type Award = {
  id: string
  title: string
  place: L10n
  year: string
  org: L10n
  summary: L10n
  image?: string
}

export type Involvement = {
  id: string
  role: L10n
  org: string
  period: string
  summary: L10n
  image?: string
  kind: 'leadership' | 'volunteering' | 'talk'
}

export type Letter = {
  id: string
  author: string
  role: L10n
  href: string
}

export type Venture = {
  id: string
  name: string
  tagline: L10n
  href?: string
}

export type LanguageSkill = {
  name: L10n
  level: L10n
  /** 0–100, drives the meter. */
  proficiency: number
}
