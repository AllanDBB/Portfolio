import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '../i18n'

/* ------------------------------------------------------------------ */
/* Cursor: a difference-blended dot that swells over interactive       */
/* things and turns into a labelled disc over [data-cursor] targets.   */
/* ------------------------------------------------------------------ */

export function Cursor() {
  const dot = useRef<HTMLDivElement | null>(null)
  const label = useRef<HTMLDivElement | null>(null)
  const [text, setText] = useState('')

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const pos = { x: -100, y: -100 }
    const cur = { x: -100, y: -100 }
    let raf = 0

    const move = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      const target = e.target as HTMLElement | null
      const labelled = target?.closest<HTMLElement>('[data-cursor]')
      const interactive = target?.closest('a, button, [role="button"], input, label')
      dot.current?.classList.toggle('is-hover', !!interactive)
      const next = labelled?.dataset.cursor ?? ''
      dot.current?.classList.toggle('is-label', !!next)
      label.current?.classList.toggle('is-on', !!next)
      setText((prev) => (prev === next ? prev : next || prev))
    }
    const tick = () => {
      cur.x += (pos.x - cur.x) * 0.2
      cur.y += (pos.y - cur.y) * 0.2
      const tf = `translate3d(${cur.x}px, ${cur.y}px, 0)`
      if (dot.current) dot.current.style.transform = tf
      if (label.current) label.current.style.translate = `${cur.x}px ${cur.y}px`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor" aria-hidden>
        <div className="cursor-dot" />
      </div>
      <div ref={label} className="cursor-label" aria-hidden>
        {text}
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Preloader: rendered in the static HTML so there is no flash; an     */
/* inline script in index.html hides it for returning visitors.        */
/* ------------------------------------------------------------------ */

export function Preloader() {
  const { locale } = useI18n()
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)
  const pathRef = useRef<SVGPathElement | null>(null)

  useEffect(() => {
    if (document.documentElement.classList.contains('intro-seen')) {
      setGone(true)
      return
    }
    const startT = performance.now()
    const dur = 1900
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - startT) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * 100))
      if (pathRef.current) pathRef.current.style.strokeDashoffset = String(1 - eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        try {
          sessionStorage.setItem('intro', '1')
        } catch {
          /* private mode */
        }
        setTimeout(() => setDone(true), 180)
        setTimeout(() => {
          setGone(true)
          // From now on, hero reveals use the short delay.
          document.documentElement.classList.add('intro-seen')
        }, 2600)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (gone) return null

  return (
    <div className={`preloader ${done ? 'is-done' : ''}`} aria-hidden>
      <div className="flex justify-between">
        <span className="label">Allan Bolaños B. — Portfolio</span>
        <span className="label">{locale === 'es' ? 'Calibrando señal' : 'Calibrating signal'}</span>
      </div>
      <svg viewBox="0 0 600 80" className="w-full" preserveAspectRatio="none" aria-hidden>
        <path
          ref={pathRef}
          d="M0 50 L180 50 L200 46 L215 50 L240 50 L250 56 L262 6 L274 70 L284 50 L320 50 L345 40 L370 50 L600 50"
          fill="none"
          stroke="var(--c-signal-ink)"
          strokeWidth="1.5"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="flex items-end justify-between">
        <span className="display text-[clamp(5rem,22vw,20rem)] leading-none tabular-nums">
          {String(count).padStart(3, '0')}
        </span>
        <span className="label mb-4">
          {locale === 'es' ? 'Costa Rica · 9.93° N' : 'Costa Rica · 9.93° N'}
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Route curtain: a signal-coloured panel sweeps up on navigation.     */
/* ------------------------------------------------------------------ */

const NAMES: Record<string, { es: string; en: string }> = {
  '/': { es: 'Inicio', en: 'Index' },
  '/work': { es: 'Trayectoria', en: 'Experience' },
  '/research': { es: 'Investigación', en: 'Research' },
  '/projects': { es: 'Proyectos', en: 'Projects' },
  '/about': { es: 'Perfil', en: 'Profile' },
}

export function Curtain() {
  const { pathname } = useLocation()
  const { locale } = useI18n()
  const ref = useRef<HTMLDivElement | null>(null)
  const prev = useRef(pathname)

  // Layout effect so the curtain covers before the new page paints.
  const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect
  useIsoLayoutEffect(() => {
    if (prev.current === pathname) return
    prev.current = pathname
    const el = ref.current
    if (!el) return
    el.classList.remove('is-run')
    void el.offsetWidth
    el.classList.add('is-run')
  }, [pathname])

  const key = '/' + (pathname.split('/')[1] ?? '')
  const name = NAMES[key]?.[locale] ?? (locale === 'es' ? 'Proyecto' : 'Project')

  return (
    <div ref={ref} className="curtain" aria-hidden>
      <span className="display text-[clamp(3rem,10vw,9rem)]">{name}</span>
    </div>
  )
}
