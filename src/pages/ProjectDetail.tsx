import { Link, useParams } from 'react-router-dom'
import { useI18n } from '../i18n'
import { projects } from '../content'
import { Container, Reveal, StatusPill, Tag } from '../components/primitives'
import { GlyphPanel } from '../components/cards'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const { t, locale } = useI18n()

  const index = projects.findIndex((p) => p.id === id)
  const project = index >= 0 ? projects[index] : undefined

  if (!project) return <NotFound />

  const next = projects[(index + 1) % projects.length]

  return (
    <Container className="pt-8">
      <Link
        to="/projects"
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-jade"
      >
        <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">
          ←
        </span>
        {t('detail.back')}
      </Link>

      <header className="mt-10 border-b border-line pb-10">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="label !text-jade">{t(`projects.${project.kind}`)}</span>
          <StatusPill status={project.status} />
          <span className="font-mono text-xs text-faint">{project.year}</span>
        </div>

        <h1 className="display mt-5 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)]">{project.title}</h1>
        <p className="prose-body mt-6 max-w-2xl text-lg">{project.summary[locale]}</p>

        {project.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.map((link) => {
              const primary = link.kind === 'demo'
              return (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  className={`rounded-full px-5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] transition-colors ${
                    primary
                      ? 'bg-jade text-on-jade hover:opacity-90'
                      : 'border border-line text-muted hover:border-jade hover:text-jade'
                  }`}
                >
                  {link.label} ↗
                </a>
              )
            })}
          </div>
        )}
      </header>

      <div className="grid gap-12 pt-12 md:grid-cols-12">
        <div className="md:col-span-8">
          <Reveal>
            <div className="overflow-hidden rounded-lg border border-line bg-elev">
              <div className="aspect-[16/9]">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                ) : (
                  <GlyphPanel title={project.title} />
                )}
              </div>
            </div>
          </Reveal>

          {project.detail && (
            <Reveal>
              <section className="mt-12">
                <h2 className="label">{t('detail.about')}</h2>
                <div className="mt-5 max-w-2xl space-y-5">
                  {project.detail[locale].split('\n\n').map((paragraph, i) => (
                    <p key={i} className="prose-body">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {project.images && project.images.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.images.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="w-full rounded-lg border border-line object-cover"
                />
              ))}
            </div>
          )}
        </div>

        <aside className="md:col-span-4">
          <div className="sticky top-24 space-y-8 rounded-lg border border-line bg-elev p-6">
            <div>
              <h2 className="label">{t('detail.year')}</h2>
              <p className="mt-2 font-mono text-sm text-fg">{project.year}</p>
            </div>
            <div>
              <h2 className="label">{t('detail.stack')}</h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
            <div>
              <h2 className="label">{t('detail.links')}</h2>
              <ul className="mt-3 space-y-2">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                      className="link-underline text-sm text-muted hover:text-jade"
                    >
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* ---- Next ---- */}
      <Link
        to={`/projects/${next.id}`}
        className="row-item mt-24 flex flex-col gap-2 border-t border-line py-10 md:flex-row md:items-center md:justify-between"
      >
        <span className="label">{t('detail.next')}</span>
        <span className="display text-[clamp(1.5rem,4vw,2.75rem)] transition-colors hover:text-jade">
          {next.title} →
        </span>
      </Link>
    </Container>
  )
}
