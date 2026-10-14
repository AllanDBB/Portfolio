import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { projects } from '../content'
import { PROJECT_KINDS } from '../types'
import type { ProjectKind } from '../types'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/primitives'
import { useHoverPreview } from '../components/HoverPreview'
import { opt } from '../lib/img'

export default function Projects() {
  const { t, locale } = useI18n()
  const [filter, setFilter] = useState<ProjectKind | 'all'>('all')
  const { show, hide } = useHoverPreview()

  const list = filter === 'all' ? projects : projects.filter((p) => p.kind === filter)
  const count = (k: ProjectKind | 'all') => (k === 'all' ? projects.length : projects.filter((p) => p.kind === k).length)

  return (
    <>
      <PageHero
        index="P"
        eyebrow={t('projects.title')}
        title={locale === 'es' ? 'Índice de\n_proyectos_' : 'Project\n_index_'}
        lead={t('projects.lead')}
        meta={<span className="display text-[4rem] leading-none">{projects.length}</span>}
      />

      <section className="px-[var(--gutter)]">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={t('projects.title')}>
          {(['all', ...PROJECT_KINDS] as const).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={filter === k}
              onClick={() => setFilter(k)}
              className={`rounded-full border px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.08em] transition-colors duration-500 ${
                filter === k ? 'border-fg bg-fg text-bg' : 'border-line-strong text-muted hover:border-fg hover:text-fg'
              }`}
            >
              {t(`projects.${k}`)}
              <sup className="ml-1 opacity-60">{count(k)}</sup>
            </button>
          ))}
        </div>

        <div className="label mt-12 hidden grid-cols-[4rem_1fr_11rem_15rem_5rem] gap-6 border-b border-line pb-4 md:grid">
          <span>#</span>
          <span>{locale === 'es' ? 'Proyecto' : 'Project'}</span>
          <span>{locale === 'es' ? 'Tipo' : 'Type'}</span>
          <span>{locale === 'es' ? 'Contexto' : 'Context'}</span>
          <span className="text-right">{t('detail.year')}</span>
        </div>

        <ul onPointerLeave={hide} className="border-t border-line md:border-t-0">
          {list.map((p, i) => (
            <Reveal as="li" key={`${filter}-${p.id}`} delay={Math.min(i, 8) * 40}>
              <Link
                to={`/projects/${p.id}`}
                onPointerEnter={() => show(opt(p.image))}
                data-cursor={p.image ? undefined : t('projects.view')}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-6 gap-y-2 border-b border-line py-6 md:grid-cols-[4rem_1fr_11rem_15rem_5rem] md:py-7"
              >
                <span className="label">{String(i + 1).padStart(2, '0')}</span>
                <span className="display text-[clamp(1.5rem,3.2vw,3rem)] leading-[1] tracking-[-0.035em] transition-[transform,color] duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-4 group-hover:text-signal-ink">
                  {p.title}
                </span>
                <span className="label text-right md:hidden">{p.year}</span>
                <span className="label col-start-2 md:col-start-auto">{t(`projects.${p.kind}`)}</span>
                <span className="hidden truncate text-xs text-muted md:block">{p.context ? p.context[locale] : p.tech.slice(0, 3).join(' · ')}</span>
                <span className="label hidden text-right md:block">{p.year}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
        {list.length === 0 && <p className="py-16 text-muted">{t('projects.empty')}</p>}
      </section>
    </>
  )
}
