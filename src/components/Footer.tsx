import { useState } from 'react'
import { useI18n } from '../i18n'
import { links, profile } from '../content'
import { Arrow, Magnetic, Roll, Split } from './primitives'
import { useCostaRicaTime } from './NavBar'
import { scrollTo } from '../lib/scroll'

export function Footer() {
  const { t, locale } = useI18n()
  const time = useCostaRicaTime()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <footer className="relative z-[2] overflow-hidden border-t border-line bg-bg pt-24 md:pt-36">
      <div className="px-[var(--gutter)]">
        <div className="label flex items-center gap-3">
          <span className="text-signal-ink">(∞)</span>
          <span className="h-px w-8 bg-line-strong" />
          <span>{t('footer.kicker')}</span>
        </div>

        <h2 className="display h-xl mt-8">
          <Split text={locale === 'es' ? 'Construyamos\nalgo _medible._' : "Let's build\nsomething _measurable._"} />
        </h2>

        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Magnetic strength={0.15}>
              <button
                type="button"
                onClick={copy}
                data-cursor={copied ? t('footer.copied') : t('footer.copy')}
                className="group display block text-left text-[clamp(1.6rem,4.6vw,4rem)] tracking-[-0.03em]"
              >
                <span className="bg-[linear-gradient(var(--c-signal),var(--c-signal))] bg-[length:0%_100%] bg-left bg-no-repeat transition-[background-size,color] duration-700 ease-[var(--ease-out-expo)] group-hover:bg-[length:100%_100%] group-hover:text-on-signal">
                  {profile.email}
                </span>
              </button>
            </Magnetic>
            <p className="label mt-4" aria-live="polite">
              {copied ? t('footer.copied') : t('footer.copyHint')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-5">
            <div>
              <p className="label">{t('footer.elsewhere')}</p>
              <ul className="mt-4 space-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="roll-host inline-flex items-center gap-2 text-fg"
                    >
                      <Roll>{l.label}</Roll>
                      <Arrow className="opacity-50" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label">{t('footer.local')}</p>
              <p className="mt-4 font-mono text-sm tabular-nums text-fg">{time || '—'} · GMT-6</p>
              <p className="label mt-8">{t('footer.status')}</p>
              <p className="mt-4 flex items-center gap-2 text-sm text-fg">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
                {t('hero.available')}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-line py-6">
          <span className="label">© {new Date().getFullYear()} {profile.fullName}</span>
          <span className="label">{t('footer.built')}</span>
          <button type="button" onClick={() => scrollTo(0)} className="label roll-host text-fg">
            <Roll>{t('footer.top')}</Roll>
          </button>
        </div>
      </div>

      {/* Oversized signature, cropped by the viewport edge */}
      <div aria-hidden className="pointer-events-none select-none px-[var(--gutter)]">
        <div className="display translate-y-[18%] whitespace-nowrap text-[19.5vw] leading-[0.8] text-signal-ink">
          Bolaños<span className="serif">B.</span>
        </div>
      </div>
    </footer>
  )
}
