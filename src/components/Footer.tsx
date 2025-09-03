import { links } from '../data/links'
import { useI18n } from '../i18n'
import { profile } from '../data/profile'

function Icon({ name }: { name: 'linkedin' | 'github' | 'cv' | 'instagram' }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor' } as const
  switch (name) {
    case 'linkedin':
      return (
        <svg {...common} aria-hidden>
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V23h-4V8zM8 8h3.8v2.05h.05C12.53 8.88 14.36 8 16.5 8 21 8 23 10.57 23 15.2V23h-4v-6.6c0-3.14-1.18-4.72-3.65-4.72-2 0-3.18 1.35-3.7 2.65-.19.47-.24 1.13-.24 1.79V23H8V8z" />
        </svg>
      )
    case 'github':
      return (
        <svg {...common} aria-hidden>
          <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.25.82-.57V20.7c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.1-.76.08-.75.08-.75 1.2.08 1.83 1.24 1.83 1.24 1.08 1.84 2.84 1.3 3.53 1 .1-.8.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.3.47-2.37 1.24-3.2-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.22a11.4 11.4 0 0 1 6 0c2.3-1.54 3.3-1.22 3.3-1.22.66 1.66.24 2.88.12 3.18.77.83 1.24 1.9 1.24 3.2 0 4.62-2.8 5.65-5.48 5.95.44.38.82 1.1.82 2.22v3.29c0 .32.22.68.83.57A12 12 0 0 0 12 .5Z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...common} aria-hidden>
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zM18.6 6.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
        </svg>
      )
    case 'cv':
    default:
      return (
        <svg {...common} aria-hidden>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 0v6h6" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
  }
}

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="mt-10 mb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-2xl card px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {links.map((l) => (
              <a
                key={l.key}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full chip hover:opacity-90"
              >
                <Icon name={l.key} />
                <span className="text-sm">{l.label}</span>
              </a>
            ))}
          </div>
          <div className="mt-3 text-center text-sm" style={{color:'var(--muted)'}}>
            <div>{t('thanks')}</div>
            <div className="mt-1">© {year} {profile.name}</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
