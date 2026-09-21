import { profile } from '../content/profile'
import { projects } from '../content/projects'
import { research } from '../content/research'

export const SITE = {
  url: 'https://allanbolanos.com',
  title: 'Allan Bolaños B.',
  ogImage: '/avatars/1.png',
}

export type PageMeta = {
  title: string
  description: string
  image: string
  canonical: string
}

function meta(title: string, description: string, path: string, image = SITE.ogImage): PageMeta {
  return {
    title: title === SITE.title ? title : `${title} · ${SITE.title}`,
    description,
    image,
    canonical: `${SITE.url}${path === '/' ? '' : path}`,
  }
}

/** Static routes plus one per project — this list drives the prerender. */
export function allRoutes(): string[] {
  return ['/', '/work', '/research', '/projects', '/about', ...projects.map((p) => `/projects/${p.id}`)]
}

export function metaForPath(path: string): PageMeta {
  const clean = path.replace(/\/+$/, '') || '/'

  if (clean.startsWith('/projects/')) {
    const id = clean.slice('/projects/'.length)
    const project = projects.find((p) => p.id === id)
    if (project) {
      return meta(project.title, project.summary.es, clean, project.image ?? SITE.ogImage)
    }
  }

  switch (clean) {
    case '/':
      return meta(
        SITE.title,
        'Ingeniero de software e investigador en series temporales. Arquitectura backend, machine learning aplicado y detección de anomalías en señales biomédicas.',
        '/'
      )
    case '/work':
      return meta(
        'Trayectoria',
        'Seis posiciones entre investigación aplicada en el TEC y arquitectura de software en producción, más liderazgo en IEEE EMBS.',
        '/work'
      )
    case '/research':
      return meta(
        'Investigación',
        `Detección de puntos de cambio, arritmias en series cardíacas y sistemas cognitivos. ${research.length} líneas y publicaciones.`,
        '/research'
      )
    case '/projects':
      return meta(
        'Proyectos',
        `${projects.length} proyectos: machine learning, diseño de lenguajes, simulación numérica, productos móviles y web.`,
        '/projects'
      )
    case '/about':
      return meta('Perfil', profile.intro.es, '/about')
    default:
      return meta('Página no encontrada', 'La ruta que buscás no existe.', clean)
  }
}
