import { Link, useParams } from 'react-router-dom'
import { useI18n } from '../i18n'
import { projectById, projects } from '../content'
import { Arrow, Eyebrow, Pill, Reveal, SignalCover, Split, StatusDot } from '../components/primitives'
import { opt } from '../lib/img'
import NotFound from './NotFound'
import { NoddleMocks } from '../components/NoddleMocks'

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
        {project.context && (
          <Reveal delay={240}>
            <p className="label mt-6 text-signal-ink">{project.context[locale]}</p>
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
          {project.id === 'noddle' ? (
            <div className="bg-[#F2EFEA] px-[6%] pt-[5%] pb-[8%]">
              <NoddleMocks />
            </div>
          ) : project.image ? (
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
          {project.built && (
            <Reveal delay={140} className="mt-12">
              <p className="label">{t('detail.built')}</p>
              <ol className="mt-4 border-t border-line">
                {project.built.map((b, i) => (
                  <li key={i} className="grid grid-cols-[2.5rem_1fr] border-b border-line py-4 text-[0.95rem] leading-relaxed">
                    <span className="label pt-0.5 text-signal-ink">{String(i + 1).padStart(2, '0')}</span>
                    <span>{b[locale]}</span>
                  </li>
                ))}
              </ol>
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

      {project.metrics && (
        <section className="px-[var(--gutter)] pt-24">
          <p className="label">{t('detail.numbers')}</p>
          <div className="mt-6 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {project.metrics.map((m, i) => (
              <Reveal
                key={i}
                delay={i * 80}
                className="flex flex-col justify-between gap-8 border-b border-line py-8 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:border-r lg:first:pl-0 lg:last:border-r-0"
              >
                <span className="display text-[clamp(3rem,6vw,5.5rem)]">{m.value}</span>
                <span className="max-w-[22ch] text-sm leading-snug text-muted">{m.label[locale]}</span>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {project.code && (
        <section className="px-[var(--gutter)] pt-24">
          <Reveal className="overflow-hidden rounded-[2px] border border-line bg-elev">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-signal" />
              </span>
              <span className="label">{project.code.file}</span>
              <span className="label">{project.code.lang}</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[0.8rem] leading-relaxed text-fg md:p-8 md:text-[0.875rem]">
              <code>{project.code.source}</code>
            </pre>
          </Reveal>
        </section>
      )}

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
