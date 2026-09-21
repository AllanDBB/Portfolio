import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import type { Experience, Project, Research } from '../types'
import { StatusPill, Tag } from './primitives'

/* ------------------------------------------------------------------ */
/* Experience row — editorial index style                              */
/* ------------------------------------------------------------------ */

function formatPeriod(start: string, end: string | null, present: string): string {
  const fmt = (value: string) => {
    const [y, m] = value.split('-')
    return m ? `${m}/${y}` : y
  }
  return `${fmt(start)} — ${end ? fmt(end) : present}`
}

export function ExperienceRow({ item, index }: { item: Experience; index: number }) {
  const { t, locale } = useI18n()

  return (
    <article className="row-item grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-6">
      <div className="flex items-baseline gap-4 md:col-span-3 md:flex-col md:gap-2">
        <span className="index-num">{String(index + 1).padStart(2, '0')}</span>
        <span className="font-mono text-xs text-faint">
          {formatPeriod(item.start, item.end, t('work.present'))}
        </span>
      </div>

      <div className="md:col-span-9">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h3 className="text-lg font-medium leading-snug text-fg">{item.role[locale]}</h3>
          <span
            className={`font-mono text-[0.65rem] uppercase tracking-[0.14em] ${
              item.track === 'research' ? 'text-jade' : 'text-faint'
            }`}
          >
            {item.track === 'research' ? t('home.researchTrack') : t('home.engineeringTrack')}
          </span>
        </div>

        <p className="mt-1.5 text-sm text-muted">
          {item.orgUrl ? (
            <a
              href={item.orgUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline text-fg/80 hover:text-jade"
            >
              {item.org}
            </a>
          ) : (
            <span className="text-fg/80">{item.org}</span>
          )}
          <span className="text-faint"> · {item.mode[locale]}</span>
        </p>

        <p className="prose-body mt-4 max-w-2xl text-[0.95rem]">{item.summary[locale]}</p>

        <ul className="mt-4 space-y-2">
          {item.highlights.map((highlight, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted">
              <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-jade/60" />
              <span>{highlight[locale]}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {item.tech.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Research card                                                       */
/* ------------------------------------------------------------------ */

export function ResearchCard({ item, index }: { item: Research; index: number }) {
  const { t, locale } = useI18n()

  return (
    <article className="group flex flex-col border-b border-line py-8 md:grid md:grid-cols-12 md:gap-8">
      <div className="mb-3 flex items-center gap-4 md:col-span-3 md:mb-0 md:flex-col md:items-start md:gap-3">
        <span className="index-num">{String(index + 1).padStart(2, '0')}</span>
        <span className="label !text-jade">{t(`research.${item.kind}`)}</span>
        <span className="font-mono text-xs text-faint">{item.year}</span>
      </div>

      <div className="md:col-span-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="max-w-xl text-xl font-medium leading-snug text-fg">{item.title}</h3>
          <StatusPill status={item.status} />
        </div>

        {item.venue && <p className="mt-1.5 font-mono text-xs text-faint">{item.venue[locale]}</p>}

        <p className="prose-body mt-4 max-w-2xl">{item.abstract[locale]}</p>

        {item.detail && (
          <div className="mt-4 max-w-2xl space-y-3">
            {item.detail[locale].split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted/85">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {item.tech.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        {item.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {item.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                className="link-underline font-mono text-xs uppercase tracking-[0.12em] text-jade"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Project card                                                        */
/* ------------------------------------------------------------------ */

export function ProjectCard({ item }: { item: Project }) {
  const { locale } = useI18n()

  return (
    <Link
      to={`/projects/${item.id}`}
      className="card-lift group flex flex-col overflow-hidden rounded-lg border border-line bg-elev"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        {item.image ? (
          <img
            src={item.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
          />
        ) : (
          <GlyphPanel title={item.title} />
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-elev to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">{item.year}</span>
          <StatusPill status={item.status} />
        </div>

        <h3 className="mt-2.5 text-[1.0625rem] font-medium leading-snug text-fg transition-colors group-hover:text-jade">
          {item.title}
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{item.summary[locale]}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tech.slice(0, 3).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
          {item.tech.length > 3 && (
            <span className="self-center font-mono text-[0.65rem] text-faint">+{item.tech.length - 3}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

/** Fallback visual for projects without an image: initials on a jade wash. */
export function GlyphPanel({ title }: { title: string }) {
  const initials = title
    .replace(/[^\p{L}\p{N} ]/gu, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('')

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 22% 28%, var(--c-jade) 0%, transparent 46%), radial-gradient(circle at 78% 76%, var(--c-jade-dim) 0%, transparent 52%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--c-line-strong) 1px, transparent 1px), linear-gradient(to bottom, var(--c-line-strong) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <span className="display relative text-5xl text-jade/45">{initials}</span>
    </div>
  )
}
