import { useI18n } from '../i18n'
import { experience, involvement, letters, profile } from '../content'
import { PageHero } from '../components/PageHero'
import { Arrow, Eyebrow, Reveal, Split } from '../components/primitives'
import { opt } from '../lib/img'

function fmt(date: string | null, locale: 'es' | 'en', present: string) {
  if (!date) return present
  const [y, m] = date.split('-').map(Number)
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-CR' : 'en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, 1))
  )
}

export default function Work() {
  const { t, locale } = useI18n()

  return (
    <>
      <PageHero
        index="E"
        eyebrow={t('work.title')}
        title={locale === 'es' ? 'Dos frentes,\n_una_ práctica' : 'Two fronts,\n_one_ practice'}
        lead={t('work.lead')}
        meta={
          <div className="label space-y-1">
            <p>{t('work.education')}</p>
            <p className="text-fg">{profile.education.school}</p>
            <p>{profile.education.period}</p>
          </div>
        }
      />

      <section className="px-[var(--gutter)]">
        <ol className="border-t border-line">
          {experience.map((e) => (
            <li key={e.id} id={e.id} className="scroll-mt-24 border-b border-line">
              <Reveal className="grid gap-8 py-12 md:grid-cols-12 md:py-16">
                <div className="md:col-span-3">
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-fg">
                    {fmt(e.start, locale, '')} — {fmt(e.end, locale, t('work.present'))}
                  </p>
                  <p className="label mt-2">{e.mode[locale]}</p>
                  <span
                    className={`mt-6 inline-block rounded-full px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.08em] ${
                      e.track === 'founder' ? 'bg-[#FFB524] text-[#111111]' : e.track === 'research' ? 'bg-signal text-on-signal' : 'border border-line-strong text-muted'
                    }`}
                  >
                    {t(`work.${e.track}`)}
                  </span>
                </div>
                <div className="md:col-span-6">
                  <a
                    href={e.orgUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group/org inline-flex items-baseline gap-3"
                  >
                    <h2 className="display text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[0.92] tracking-[-0.04em]">{e.org}</h2>
                    <Arrow className="opacity-50 transition-transform duration-500 group-hover/org:rotate-45" />
                  </a>
                  <p className="mt-3 text-sm text-muted">{e.orgInfo[locale]}</p>
                  <p className="mt-6 text-xl font-medium leading-snug tracking-tight">{e.role[locale]}</p>
                  <p className="mt-6 text-lg leading-snug text-fg">{e.summary[locale]}</p>
                  <ul className="mt-6 space-y-3">
                    {e.highlights.map((h, i) => (
                      <li key={i} className="grid grid-cols-[1.5rem_1fr] text-[0.95rem] leading-relaxed text-muted">
                        <span className="label pt-1">{String(i + 1).padStart(2, '0')}</span>
                        <span>{h[locale]}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {e.tech.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {e.image && (
                  <div className="md:col-span-3">
                    <div className="overflow-hidden rounded-[2px]">
                      <img src={opt(e.image)} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
                    </div>
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- Community ---- */}
      <section className="px-[var(--gutter)] pt-36">
        <Eyebrow index="C">{t('work.community')}</Eyebrow>
        <h2 className="display h-md mt-6">
          <Split text={locale === 'es' ? 'Fuera del _horario_' : 'Off the _clock_'} />
        </h2>
        <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {involvement.map((item, i) => (
            <Reveal key={item.id} delay={i * 80} className="group">
              {item.image && (
                <div className="overflow-hidden rounded-[2px]">
                  <img
                    src={opt(item.image)}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover grayscale transition-[filter,transform] duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
              )}
              <p className="label mt-5">{item.period}</p>
              <h3 className="mt-2 text-lg font-medium leading-snug tracking-tight">{item.role[locale]}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary[locale]}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Letters ---- */}
      <section className="px-[var(--gutter)] pt-36">
        <Eyebrow index="L">{t('work.letters')}</Eyebrow>
        <ul className="mt-10 border-t border-line">
          {letters.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                data-cursor={t('work.openLetter')}
                className="group flex items-baseline justify-between gap-6 border-b border-line py-7"
              >
                <span className="display text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.035em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3">
                  {l.author}
                </span>
                <span className="label flex items-center gap-2">
                  {l.role[locale]} · PDF <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
