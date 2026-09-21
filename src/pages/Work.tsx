import { useI18n } from '../i18n'
import { experience, involvement, letters, profile } from '../content'
import { Container, Reveal, SectionHead } from '../components/primitives'
import { ExperienceRow } from '../components/cards'

export default function Work() {
  const { t, locale } = useI18n()

  return (
    <Container className="pt-12">
      <Reveal>
        <PageHead label={t('nav.work')} title={t('work.title')} lead={t('work.lead')} />
      </Reveal>

      <div className="mt-4">
        {experience.map((item, i) => (
          <Reveal key={item.id} delay={Math.min(i, 4) * 60}>
            <ExperienceRow item={item} index={i} />
          </Reveal>
        ))}
      </div>

      {/* ---- Education ---- */}
      <section className="pt-24">
        <Reveal>
          <SectionHead label={t('work.education')} title={locale === 'es' ? 'Formación' : 'Education'} />
        </Reveal>
        <Reveal>
          <div className="flex flex-col gap-2 border-b border-line py-8 md:flex-row md:items-baseline md:gap-8">
            <span className="index-num md:w-12">01</span>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-fg">{profile.education.degree[locale]}</h3>
              <p className="mt-1 text-sm text-muted">{profile.education.school}</p>
            </div>
            <span className="font-mono text-xs text-jade">{profile.education.period}</span>
          </div>
        </Reveal>
      </section>

      {/* ---- Community ---- */}
      <section className="pt-24">
        <Reveal>
          <SectionHead
            label={t('work.community')}
            title={locale === 'es' ? 'Comunidad y liderazgo' : 'Community & leadership'}
          />
        </Reveal>
        <div className="mt-2">
          {involvement.map((item, i) => (
            <Reveal key={item.id} delay={i * 60}>
              <article className="row-item grid gap-3 border-b border-line py-7 md:grid-cols-12 md:gap-6">
                <div className="flex items-baseline gap-4 md:col-span-3 md:flex-col md:gap-2">
                  <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-mono text-xs text-faint">{item.period}</span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-base font-medium text-fg">{item.role[locale]}</h3>
                  <p className="mt-1 font-mono text-xs text-faint">{item.org}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{item.summary[locale]}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Letters ---- */}
      <section className="pt-24">
        <Reveal>
          <SectionHead
            label={t('work.letters')}
            title={locale === 'es' ? 'Cartas de recomendación' : 'Letters of recommendation'}
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {letters.map((letter, i) => (
            <Reveal key={letter.id} delay={i * 70}>
              <a
                href={letter.href}
                target="_blank"
                rel="noreferrer noopener"
                className="card-lift group flex h-full flex-col justify-between rounded-lg border border-line bg-elev p-6"
              >
                <div>
                  <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-base font-medium text-fg group-hover:text-jade">{letter.author}</h3>
                  <p className="mt-1 text-sm text-muted">{letter.role[locale]}</p>
                </div>
                <span className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-jade">
                  {t('work.openLetter')} ↗
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </Container>
  )
}

export function PageHead({ label, title, lead }: { label: string; title: string; lead?: string }) {
  return (
    <header className="border-b border-line pb-10">
      <div className="flex items-center gap-3">
        <span className="jade-rule" />
        <span className="label">{label}</span>
      </div>
      <h1 className="display mt-5 text-[clamp(2.75rem,7vw,5.5rem)]">{title}</h1>
      {lead && <p className="prose-body mt-4 max-w-2xl">{lead}</p>}
    </header>
  )
}
