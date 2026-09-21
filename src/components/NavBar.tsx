import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n'
import { useTheme } from '../theme'
import { Container } from './primitives'

const ROUTES = [
  { to: '/work', key: 'nav.work' },
  { to: '/research', key: 'nav.research' },
  { to: '/projects', key: 'nav.projects' },
  { to: '/about', key: 'nav.about' },
]

export function NavBar() {
  const { t, locale, toggleLocale } = useI18n()
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <Link to="/" className="group flex items-baseline gap-2.5" aria-label={t('nav.home')}>
          <span className="display text-xl tracking-tight">Allan Bolaños</span>
          <span className="h-1.5 w-1.5 rounded-full bg-jade transition-transform duration-300 group-hover:scale-150" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {ROUTES.map((route) => (
            <NavLink
              key={route.to}
              to={route.to}
              className={({ isActive }) =>
                `link-underline font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors ${
                  isActive ? 'text-jade' : 'text-muted hover:text-fg'
                }`
              }
            >
              {t(route.key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleLocale}
            aria-label={t('common.language')}
            className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted transition-colors hover:border-jade hover:text-jade"
          >
            {locale === 'es' ? 'EN' : 'ES'}
          </button>

          <button
            onClick={toggle}
            aria-label={t('common.theme')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-jade hover:text-jade"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={t('common.menu')}
            aria-expanded={open}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-jade hover:text-jade md:hidden"
          >
            <span className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ${
                  open ? 'top-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ${
                  open ? 'top-1/2 -rotate-45' : 'top-full'
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-line bg-bg transition-[max-height] duration-400 md:hidden ${
          open ? 'max-h-80' : 'max-h-0 border-t-transparent'
        }`}
      >
        <Container className="flex flex-col gap-1 py-4">
          {ROUTES.map((route, i) => (
            <NavLink
              key={route.to}
              to={route.to}
              className={({ isActive }) =>
                `flex items-baseline gap-4 py-3 font-mono text-sm uppercase tracking-[0.14em] ${
                  isActive ? 'text-jade' : 'text-muted'
                }`
              }
            >
              <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
              {t(route.key)}
            </NavLink>
          ))}
        </Container>
      </div>
    </header>
  )
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="4.2" />
      <path
        strokeLinecap="round"
        d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z" />
    </svg>
  )
}
