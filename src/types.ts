export type Category =
  | 'laborales'
  | 'tecnologicos'
  | 'cientificos'
  | 'gastronomia'
  | 'voluntariados'
  | 'conferencias'
  | 'premios'

export interface Project {
  id: string
  title: string
  category: Category
  summary: string
  tech: string[]
  imageUrl?: string // legacy single image (thumbnail)
  images?: string[] // optional gallery
  link?: string
  status?: Status
}

export type Locale = 'es' | 'en'
export interface Stat { label: string; value: string; icon?: string }

export type Status = 'done' | 'in_progress' | 'canceled' | 'planned'
