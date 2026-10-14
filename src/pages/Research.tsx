import { useState } from 'react'
import { useI18n } from '../i18n'
import { profile, research } from '../content'
import { PageHero } from '../components/PageHero'
import { CpdDemo } from '../components/CpdDemo'
import { Arrow, Eyebrow, Pill, PubChip, Reveal, SmartLink, StatusDot } from '../components/primitives'
import { opt } from '../lib/img'
import { tr } from '../types'
import type { Research as ResearchItem } from '../types'

function citation(r: ResearchItem) {
  return `Bolaños Barrientos, A.; Solís, M. ${r.title}. Comput. Sci. Math. Forum 2026, 16(1), 2. https://doi.org/${r.doi}`
}

export default function Research() {
  const { t, locale } = useI18n()
  const paper = research.find((r) => r.kind === 'paper')!
  const papers = research.filter((r) => r.kind === 'paper' && r.id !== paper.id)
  const lines = research.filter((r) => r.kind !== 'paper')
  const [copied, setCopied] = useState(false)

  const copyCite = async () => {
    try {
      await navigator.clipboard.writeText(citation(paper))
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked: the DOI link is right there */
    }
  }

  return (
    <>
      <PageHero
        index="R"
        eyebrow={t('research.title')}
        title={locale === 'es' ? 'Señales\ny _ruido_' : 'Signal\n& _noise_'}
        lead={t('research.lead')}
        meta={
          <div className="label space-y-1">
            <p>ORCID</p>
            <a className="link-line text-fg" href={`https://orcid.org/${profile.orcid}`} target="_blank" rel="noreferrer">
              {profile.orcid}
            </a>
          </div>
        }
      />

      {/* ---- The paper ---- */}
      <section id={paper.id} className="scroll-mt-24 px-[var(--gutter)]">
        <div className="grid gap-12 border-t border-line pt-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-signal px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-on-signal">
                {t('research.published')} · {paper.year}
              </span>
              <span className="label">{paper.venue && tr(paper.venue, locale)}</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display mt-8 text-[clamp(2.25rem,4.6vw,4.75rem)] leading-[0.92] tracking-[-0.04em]">{paper.title}</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 text-sm text-muted">
                <span className="text-fg">{paper.authors}</span> — Instituto Tecnológico de Costa Rica
              </p>
            </Reveal>

            <Reveal delay={200} className="mt-12 grid gap-8 md:grid-cols-[10rem_1fr]">
              <span className="label">{t('research.abstract')}</span>
              <div className="prose-body">
                {(paper.detail ?? paper.abstract)[locale].split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                <p>
                  {locale === 'es'
                    ? 'Con ruido bajo destacan ssm_canary y ocpdet_two_sample_test; con ruido alto, changepoint_online_gaussian y ocpdet_two_sample_test. Sobre los datos reales de criminalidad el mejor F1 ronda 0.41 — un recordatorio de lo lejos que está el laboratorio de la calle.'
                    : 'Under low noise ssm_canary and ocpdet_two_sample_test lead; under high noise, changepoint_online_gaussian and ocpdet_two_sample_test. On the real crime data the best F1 sits around 0.41 — a reminder of how far the lab is from the street.'}
                </p>
              </div>
            </Reveal>

            <Reveal delay={260} className="mt-10 flex flex-wrap gap-3">
              {paper.links.map((l, i) => (
                <Pill key={l.href} href={l.href} solid={i === 0}>
                  {l.label}
                </Pill>
              ))}
              <Pill onClick={copyCite}>{copied ? t('research.copied') : t('research.cite')}</Pill>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <CpdDemo />
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-4 text-xs leading-relaxed text-faint">
                  {locale === 'es'
                    ? 'Serie sintética con un cambio de media en τ=132. Subí el ruido: el retardo de detección crece y aparecen falsas alarmas — el trade-off que el paper mide entre detectores.'
                    : 'Synthetic series with a mean shift at τ=132. Turn the noise up: detection delay grows and false alarms appear — the trade-off the paper measures across detectors.'}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Publications ---- */}
      <section className="px-[var(--gutter)] pt-32">
        <Eyebrow index="P">{t('research.publications')}</Eyebrow>
        <ol className="mt-10 border-t border-line">
          {papers.map((r) => (
            <li key={r.id} id={r.id} className="scroll-mt-24 border-b border-line">
              <Reveal className="grid gap-8 py-12 md:grid-cols-12 md:py-14">
                <div className="space-y-3 md:col-span-3">
                  {r.pub && <PubChip pub={r.pub} />}
                  <p className="label">{r.year}</p>
                  {r.venue && <p className="text-sm leading-snug text-muted">{tr(r.venue, locale)}</p>}
                </div>
                <div className="md:col-span-6">
                  <h3 className="display text-[clamp(1.7rem,2.9vw,2.75rem)] leading-[0.97] tracking-[-0.035em]">{r.title}</h3>
                  {r.authors && <p className="mt-4 text-sm text-muted">{r.authors}</p>}
                  <div className="prose-body mt-6">
                    {(r.detail ?? r.abstract)[locale].split('\n\n').map((para, k) => (
                      <p key={k}>{para}</p>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {r.tech.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <ul className="space-y-2 md:col-span-3">
                  {r.links.map((l) => (
                    <li key={l.href}>
                      <SmartLink href={l.href} className="link-line inline-flex items-center gap-2 text-sm text-fg">
                        {l.label}
                        <Arrow />
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- Lines & experiments ---- */}
      <section className="px-[var(--gutter)] pt-32">
        <Eyebrow index="L">{t('research.lines')}</Eyebrow>
        <ol className="mt-10 border-t border-line">
          {lines.map((r, i) => (
            <li key={r.id} id={r.id} className="scroll-mt-24 border-b border-line">
              <Reveal className="grid gap-8 py-12 md:grid-cols-12 md:py-16">
                <div className="md:col-span-3">
                  <span className="display block text-[clamp(3rem,6vw,6rem)] text-faint">{String(i + 1).padStart(2, '0')}</span>
                  <div className="mt-4 space-y-2">
                    <p className="label">{t(`research.${r.kind}`)} · {r.year}</p>
                    <StatusDot status={r.status} />
                  </div>
                </div>
                <div className="md:col-span-6">
                  <h3 className="display text-[clamp(1.9rem,3.4vw,3.25rem)] leading-[0.95] tracking-[-0.035em]">{r.title}</h3>
                  {r.venue && <p className="label mt-4">{tr(r.venue, locale)}</p>}
                  <div className="prose-body mt-6">
                    {(r.detail ?? r.abstract)[locale].split('\n\n').map((para, k) => (
                      <p key={k}>{para}</p>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {r.tech.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-6 md:col-span-3">
                  {r.image && (
                    <div className="overflow-hidden rounded-[2px]">
                      <img src={opt(r.image)} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                    </div>
                  )}
                  <ul className="space-y-2">
                    {r.links.map((l) => (
                      <li key={l.href}>
                        <SmartLink href={l.href} className="link-line inline-flex items-center gap-2 text-sm text-fg">
                          {l.label}
                          <Arrow />
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
