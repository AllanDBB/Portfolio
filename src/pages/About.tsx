import { useI18n } from '../i18n'
import { languages, links, profile, skillGroups, ventures } from '../content'
import { Container, Reveal, SectionHead } from '../components/primitives'
import { PageHead } from './Work'

export default function About() {
  const { t, locale } = useI18n()

  return (
    <Container className="pt-12">
      <Reveal>
        <PageHead label={t('nav.about')} title={t('about.title')} lead={t('about.lead')} />
      </Reveal>

      <div className="grid gap-14 pt-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <Reveal>
            <div className="max-w-2xl space-y-6">
              {profile.about[locale].split('\n\n').map((paragraph, i) => (
                <p key={i} className={i === 0 ? 'prose-body text-lg text-fg' : 'prose-body'}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <section className="mt-16">
              <h2 className="label">{t('about.skills')}</h2>
              <div className="mt-6 space-y-7">
                {skillGroups.map((group) => (
                  <div key={group.label.en} className="border-t border-line pt-5">
                    <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-jade">
                      {group.label[locale]}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] text-muted"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        </div>

        <aside className="md:col-span-5 md:pl-6">
          <Reveal>
            <div className="overflow-hidden rounded-lg border border-line bg-elev">
              <img src={profile.avatar} alt={profile.name} className="aspect-[4/5] w-full object-cover" />
            </div>
          </Reveal>

          <Reveal>
            <section className="mt-10">
              <h2 className="label">{t('about.languages')}</h2>
              <ul className="mt-5 space-y-4">
                {languages.map((language) => (
                  <li key={language.name.en}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-sm text-fg">{language.name[locale]}</span>
                      <span className="font-mono text-[0.7rem] text-faint">{language.level[locale]}</span>
                    </div>
                    <div className="mt-2 h-px w-full bg-line">
                      <div className="h-px bg-jade" style={{ width: `${language.proficiency}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section className="mt-10">
              <h2 className="label">{t('about.education')}</h2>
              <p className="mt-4 text-sm text-fg">{profile.education.degree[locale]}</p>
              <p className="mt-1 text-sm text-muted">{profile.education.school}</p>
              <p className="mt-1 font-mono text-xs text-jade">{profile.education.period}</p>
            </section>
          </Reveal>

          <Reveal>
            <section className="mt-10">
              <h2 className="label">{t('about.ventures')}</h2>
              <ul className="mt-4 space-y-4">
                {ventures.map((venture) => (
                  <li key={venture.id}>
                    {venture.href ? (
                      <a
                        href={venture.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-underline text-sm text-fg hover:text-jade"
                      >
                        {venture.name} ↗
                      </a>
                    ) : (
                      <span className="text-sm text-fg">{venture.name}</span>
                    )}
                    <p className="mt-1 text-xs leading-relaxed text-muted">{venture.tagline[locale]}</p>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section className="mt-10 border-t border-line pt-8">
              <h2 className="label">{t('about.contact')}</h2>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                      className="link-underline text-sm text-muted hover:text-jade"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="/AllanBolanos_CV.pdf"
                className="mt-6 inline-block rounded-full bg-jade px-5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-on-jade transition-opacity hover:opacity-90"
              >
                {t('about.downloadCV')} ↓
              </a>
            </section>
          </Reveal>
        </aside>
      </div>

      <section className="pt-28">
        <Reveal>
          <SectionHead label={t('about.contact')} title={locale === 'es' ? 'Escribime' : 'Get in touch'} />
        </Reveal>
        <Reveal>
          <a
            href={`mailto:${profile.email}`}
            className="display mt-8 block break-all text-[clamp(1.5rem,5vw,3.5rem)] transition-colors hover:text-jade"
          >
            {profile.email}
          </a>
        </Reveal>
      </section>
    </Container>
  )
}
