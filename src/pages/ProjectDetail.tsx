import { Link, useParams } from 'react-router-dom'
import { useI18n } from '../i18n'
import { projectById, projects } from '../content'
import { Arrow, Eyebrow, Pill, Reveal, SignalCover, Split, StatusDot } from '../components/primitives'
import { opt } from '../lib/img'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { id = '' } = useParams()
  const { t, locale } = useI18n()
  const project = projectById(id)
  if (!project) return <NotFound />

  const idx = projects.findIndex((p) => p.id === project.id)
  const next = projects[(idx + 1) % projects.length]
  const [name, subtitle] = project.title.split(' — ')

  return (
    <article>
      <section className="px-[var(--gutter)] pt-36 md:pt-48">
        <Link to="/projects" className="label roll-host inline-flex items-center gap-2 text-fg">
          <Arrow className="rotate-[-135deg]" /> {t('detail.back')}
        </Link>
        <h1 className="display h-lg mt-10 break-words">
          <Split text={name} />
        </h1>
        {subtitle && (
          <Reveal delay={200}>
            <p className="serif mt-4 text-[clamp(1.5rem,3vw,2.75rem)] text-muted">{subtitle}</p>
          </Reveal>
        )}

        <Reveal delay={250} className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-4">
          <Meta label={t('detail.year')} value={project.year} />
          <Meta label={t('detail.type')} value={t(`projects.${project.kind}`)} />
          <div>
            <p className="label">{t('detail.status')}</p>
            <div className="mt-2">
              <StatusDot status={project.status} />
            </div>
          </div>
          <Meta label={t('detail.stack')} value={project.tech.slice(0, 3).join(', ')} />
        </Reveal>
      </section>

      <Reveal clip className="mt-14 px-[var(--gutter)]">
        <div className="overflow-hidden rounded-[2px]">
          {project.image ? (
            <img src={opt(project.image)} alt={project.title} className="aspect-[16/9] w-full object-cover" />
          ) : (
            <SignalCover seed={project.id} className="aspect-[16/9] w-full" />
          )}
        </div>
      </Reveal>

      <section className="grid gap-12 px-[var(--gutter)] pt-20 md:grid-cols-12">
        <div className="md:col-span-3">
          <Eyebrow>{t('detail.about')}</Eyebrow>
        </div>
        <div className="md:col-span-6">
          <Reveal>
            <p className="text-[clamp(1.25rem,2vw,1.75rem)] leading-snug text-fg">{project.summary[locale]}</p>
          </Reveal>
          {project.detail && (
            <Reveal delay={120} className="prose-body mt-10">
              {project.detail[locale].split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </Reveal>
          )}
          <Reveal delay={160} className="mt-10 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </Reveal>
        </div>
        <div className="flex flex-col gap-3 md:col-span-3 md:items-end">
          {project.links.map((l, i) => (
            <Pill key={l.href} href={l.href} solid={i === 0}>
              {l.kind === 'demo' ? t('common.viewLive') : l.kind === 'repo' ? t('common.repository') : l.label}
            </Pill>
          ))}
        </div>
      </section>

      {/* Next project — the whole band is the link */}
      <Link
        to={`/projects/${next.id}`}
        data-cursor={t('detail.next')}
        className="group mt-36 block border-t border-line px-[var(--gutter)] pt-10 pb-4"
      >
        <span className="label">{t('detail.next')} →</span>
        <span className="display h-lg mt-6 block transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:translate-x-6">
          {next.title.split(' — ')[0]}
        </span>
      </Link>
    </article>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="label">{label}</p>
      <p className="mt-2 text-sm text-fg">{value}</p>
    </div>
  )
}
