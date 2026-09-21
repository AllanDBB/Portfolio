import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { links, profile, ventures } from '../content'
import { Container } from './primitives'

export function Footer() {
  const { t, locale } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-32 border-t border-line">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05]">
              {locale === 'es' ? 'Conversemos.' : "Let's talk."}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline mt-4 inline-block font-mono text-sm text-jade"
            >
              {profile.email}
            </a>
            <p className="mt-2 font-mono text-xs text-faint">{profile.phone}</p>
          </div>

          <div className="md:col-span-3">
            <p className="label">{t('about.contact')}</p>
            <ul className="mt-4 space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                    className="link-underline text-sm text-muted hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="label">{t('about.ventures')}</p>
            <ul className="mt-4 space-y-3">
              {ventures.map((venture) => (
                <li key={venture.id} className="text-sm">
                  {venture.href ? (
                    <a
                      href={venture.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline text-fg hover:text-jade"
                    >
                      {venture.name}
                    </a>
                  ) : (
                    <span className="text-fg">{venture.name}</span>
                  )}
                  <span className="block text-xs text-faint">{venture.tagline[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 font-mono text-[0.7rem] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name} — {t('footer.rights')}
          </p>
          <div className="flex items-center gap-5">
            <Link to="/about" className="hover:text-jade">
              {t('nav.about')}
            </Link>
            <a
              href="https://github.com/AllanDBB/Portfolio"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-jade"
            >
              {t('footer.source')}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
