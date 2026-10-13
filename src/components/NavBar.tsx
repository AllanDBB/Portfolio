import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n'
import { useTheme } from '../theme'
import { links } from '../content'
import { Roll } from './primitives'
import { setScrollLocked } from '../lib/scroll'

const ROUTES = [
  { to: '/work', key: 'nav.work' },
  { to: '/research', key: 'nav.research' },
  { to: '/projects', key: 'nav.projects' },
  { to: '/about', key: 'nav.about' },
]

/** Live clock for San José — tells visitors when a reply is likely. */
export function useCostaRicaTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/Costa_Rica',
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export function NavBar() {
  const { t, locale, toggleLocale } = useI18n()
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()
  const time = useCostaRicaTime()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    setScrollLocked(open)
    return () => setScrollLocked(false)
  }, [open])

  // Tuck the bar away while reading down, bring it back on scroll up.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 200 && y > last)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] text-[#efece4] mix-blend-difference transition-transform duration-700 ease-[var(--ease-out-expo)] ${
          hidden && !open ? '-translate-y-full' : ''
        }`}
      >
        <div className="grid h-[68px] grid-cols-[1fr_auto] items-center gap-6 px-[var(--gutter)] md:grid-cols-[1fr_auto_1fr]">
          <Link to="/" className="roll-host flex items-baseline gap-2" aria-label={t('nav.home')}>
            <span className="font-display text-[1.05rem] font-semibold tracking-tight">
              <Roll>Allan Bolaños</Roll>
            </span>
            <span className="mono hidden opacity-60 sm:inline">©26</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {ROUTES.map((route) => (
              <NavLink key={route.to} to={route.to} className="roll-host mono link-line">
                <Roll>{t(route.key)}</Roll>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-4">
            <span className="mono hidden tabular-nums opacity-60 lg:inline">CR {time}</span>
            <button onClick={toggleLocale} aria-label={t('common.language')} className="mono roll-host">
              <Roll>{locale === 'es' ? 'EN' : 'ES'}</Roll>
            </button>
            <button onClick={toggle} aria-label={t('common.theme')} className="mono roll-host">
              <Roll>{theme === 'dark' ? (locale === 'es' ? 'Claro' : 'Light') : locale === 'es' ? 'Oscuro' : 'Dark'}</Roll>
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={t('common.menu')}
              aria-expanded={open}
              className="mono roll-host md:hidden"
            >
              <Roll>{open ? t('common.close') : t('common.menu')}</Roll>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu (mobile) */}
      <div
        className={`fixed inset-0 z-[55] flex flex-col justify-between bg-signal px-[var(--gutter)] pt-24 pb-8 text-on-signal transition-[clip-path] duration-900 ease-[var(--ease-in-out-quart)] md:hidden ${
          open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col">
          {[{ to: '/', key: 'nav.home' }, ...ROUTES].map((route, i) => (
            <NavLink
              key={route.to}
              to={route.to}
              tabIndex={open ? 0 : -1}
              className="display flex items-baseline gap-4 border-b border-black/15 py-3 text-[clamp(2.75rem,13vw,5rem)]"
            >
              <span className="mono">0{i + 1}</span>
              {t(route.key)}
            </NavLink>
          ))}
        </nav>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <a key={l.label} href={l.href} tabIndex={open ? 0 : -1} className="mono" target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
