import { useMemo, useState } from 'react'
import { useI18n } from '../i18n'
import { projects } from '../content'
import { PROJECT_KINDS, type ProjectKind } from '../types'
import { Container, Reveal } from '../components/primitives'
import { ProjectCard } from '../components/cards'
import { PageHead } from './Work'

type Filter = ProjectKind | 'all'

export default function Projects() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.kind === filter)),
    [filter]
  )

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([['all', projects.length]])
    for (const kind of PROJECT_KINDS) {
      map.set(kind, projects.filter((p) => p.kind === kind).length)
    }
    return map
  }, [])

  const filters: Filter[] = ['all', ...PROJECT_KINDS]

  return (
    <Container className="pt-12">
      <Reveal>
        <PageHead label={t('nav.projects')} title={t('projects.title')} lead={t('projects.lead')} />
      </Reveal>

      <div className="sticky top-[72px] z-30 -mx-2 mt-8 flex flex-wrap gap-2 bg-bg/90 px-2 py-4 backdrop-blur-sm">
        {filters.map((key) => {
          const active = filter === key
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] transition-colors ${
                active
                  ? 'border-jade bg-jade text-on-jade'
                  : 'border-line text-muted hover:border-jade hover:text-jade'
              }`}
            >
              {t(`projects.${key}`)}
              <span className={`ml-2 ${active ? 'text-on-jade/70' : 'text-faint'}`}>{counts.get(key) ?? 0}</span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-sm text-muted">{t('projects.empty')}</p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 70}>
              <ProjectCard item={project} />
            </Reveal>
          ))}
        </div>
      )}
    </Container>
  )
}
