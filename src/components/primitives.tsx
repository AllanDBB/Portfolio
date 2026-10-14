import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import type { Company, Research, Status } from '../types'

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export function Container({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`w-full px-[var(--gutter)] ${className}`}>{children}</div>
}

/** Mono eyebrow with a running index, e.g. "(02) — Research". */
export function Eyebrow({ index, children, className = '' }: { index?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`label flex items-center gap-3 ${className}`}>
      {index && <span className="text-signal-ink">({index})</span>}
      <span className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* In-view hook: adds `.is-in` once, then lets CSS do the motion.      */
/* ------------------------------------------------------------------ */

export function useInView<T extends HTMLElement>(margin = '0px 0px -12% 0px') {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: margin, threshold: 0.01 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [margin])
  return [ref, inView] as const
}

/**
 * Word-masked headline. Renders real text (good for SSR and screen readers)
 * and slides each word up from behind its own mask on entry.
 */
export function Split({
  text,
  as: Comp = 'span',
  className = '',
  delay = 0,
}: {
  text: string
  as?: React.ElementType
  className?: string
  delay?: number
}) {
  const [ref, inView] = useInView<HTMLElement>()
  let i = 0
  let italic = false
  return (
    <Comp
      ref={ref}
      className={`split ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` } as React.CSSProperties}
    >
      {text.split('\n').map((line, li, lines) => {
        const words = line.split(' ')
        return (
          <React.Fragment key={li}>
            {words.map((raw, wi) => {
              // `_like this_` marks a serif-italic run, possibly across words.
              let word = raw
              if (word.startsWith('_')) {
                italic = true
                word = word.slice(1)
              }
              const isItalic = italic
              if (word.endsWith('_')) {
                italic = false
                word = word.slice(0, -1)
              }
              return (
                <React.Fragment key={wi}>
                  <span className="split-line">
                    <span className={`split-word ${isItalic ? 'serif' : ''}`} style={{ '--i': i++ } as React.CSSProperties}>
                      {word}
                    </span>
                  </span>
                  {wi < words.length - 1 ? ' ' : null}
                </React.Fragment>
              )
            })}
            {li < lines.length - 1 && <br />}
          </React.Fragment>
        )
      })}
    </Comp>
  )
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  clip = false,
  as: Comp = 'div',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  clip?: boolean
  as?: React.ElementType
}) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <Comp
      ref={ref}
      className={`reveal ${clip ? 'reveal-clip' : ''} ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Comp>
  )
}

/* ------------------------------------------------------------------ */
/* Magnetic: element leans toward the pointer.                         */
/* ------------------------------------------------------------------ */

export function Magnetic({ children, strength = 0.35 }: { children: React.ReactElement; strength?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * strength
      const y = (e.clientY - (r.top + r.height / 2)) * strength
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    const leave = () => {
      el.style.transform = ''
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength])
  return (
    <span ref={ref} className="inline-block transition-transform duration-700 ease-[var(--ease-out-expo)]">
      {children}
    </span>
  )
}

/** Label that rolls to a duplicate of itself on hover. */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll" aria-hidden={false}>
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  )
}

/** Pill button / link with a signal-coloured fill on hover. */
export function Pill({
  to,
  href,
  children,
  solid = false,
  cursor,
  onClick,
}: {
  to?: string
  href?: string
  children: string
  solid?: boolean
  cursor?: string
  onClick?: () => void
}) {
  const cls = `pill roll-host ${solid ? 'pill-solid' : ''}`
  const inner = (
    <>
      <Roll>{children}</Roll>
      <Arrow />
    </>
  )
  if (to)
    return (
      <Magnetic>
        <Link to={to} className={cls} data-cursor={cursor}>
          {inner}
        </Link>
      </Magnetic>
    )
  if (href) {
    const external = href.startsWith('http')
    return (
      <Magnetic>
        <a
          href={href}
          className={cls}
          data-cursor={cursor}
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          {inner}
        </a>
      </Magnetic>
    )
  }
  return (
    <Magnetic>
      <button type="button" className={cls} onClick={onClick} data-cursor={cursor}>
        {inner}
      </button>
    </Magnetic>
  )
}

export function Arrow({ className = '', diagonal = true }: { className?: string; diagonal?: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden
      className={className}
      style={diagonal ? undefined : { transform: 'rotate(45deg)' }}
    >
      <path d="M2 10 10 2M4 2h6v6" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */

export function Marquee({
  items,
  speed = 40,
  reverse = false,
  className = '',
  separator = '✳',
}: {
  items: string[]
  speed?: number
  reverse?: boolean
  className?: string
  separator?: string
}) {
  const track = (hidden: boolean) => (
    <div className="marquee-track" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-[0.35em]">{item}</span>
          <span className="px-[0.35em] text-signal-ink">{separator}</span>
        </span>
      ))}
    </div>
  )
  return (
    <div
      className={`marquee ${reverse ? 'marquee-reverse' : ''} ${className}`}
      style={{ '--speed': `${speed}s` } as React.CSSProperties}
    >
      {track(false)}
      {track(true)}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Status                                                              */
/* ------------------------------------------------------------------ */

export function StatusDot({ status }: { status: Status }) {
  const { t } = useI18n()
  const live = status === 'active' || status === 'research'
  return (
    <span className="label inline-flex items-center gap-2">
      <span className="relative flex h-1.5 w-1.5">
        {live && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${live ? 'bg-signal' : 'bg-faint'}`} />
      </span>
      {t(`status.${status}`)}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Generative cover for work without a screenshot.                     */
/* Seeded by id, so a project always draws the same signal.            */
/* ------------------------------------------------------------------ */

function hash(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function SignalCover({ seed, label, className = '' }: { seed: string; label?: string; className?: string }) {
  const h = hash(seed)
  const variant = h % 3
  const w = 400
  const hgt = 300
  const cp = 120 + (h % 180)
  const rand = (i: number) => {
    const x = Math.sin(h * 0.0001 + i * 12.9898) * 43758.5453
    return x - Math.floor(x)
  }

  let art: React.ReactNode
  if (variant === 0) {
    // Ridgelines with a regime shift
    const rows = 12 + (h % 6)
    art = Array.from({ length: rows }, (_, r) => {
      const base = 40 + r * ((hgt - 60) / rows)
      let d = ''
      for (let x = 0; x <= w; x += 4) {
        const env = Math.exp(-(((x - w / 2) / 120) ** 2))
        const f1 = 0.02 + ((h >> (r % 16)) % 7) * 0.004
        let y = Math.sin(x * f1 + r * 1.7 + (h % 13)) * 5 * env + Math.sin(x * 0.13 + r) * 2.5 * env
        if (x > cp) y -= 12 * env * (r % 3 === 0 ? 1 : 0.35)
        d += `${x === 0 ? 'M' : 'L'}${x},${(base + y).toFixed(1)}`
      }
      return <path key={r} d={d} fill="none" stroke="var(--c-fg)" strokeOpacity={0.2 + (r % 4) * 0.08} strokeWidth="1" />
    })
  } else if (variant === 1) {
    // One loud series on the signal colour
    let d = ''
    for (let x = 0; x <= w; x += 3) {
      const shift = x > cp ? -46 : 0
      const y = hgt / 2 + 20 + shift + Math.sin(x * 0.09 + h) * 10 + (rand(x) - 0.5) * (x > cp ? 46 : 22)
      d += `${x === 0 ? 'M' : 'L'}${x},${y.toFixed(1)}`
    }
    art = (
      <>
        <rect width={w} height={hgt} fill="var(--c-signal)" />
        <path d={d} fill="none" stroke="#0b0b0a" strokeWidth="1.4" strokeLinejoin="round" />
      </>
    )
  } else {
    // Heat grid: two regimes of cell intensity
    const cols = 24
    const rows = 18
    const cw = w / cols
    const ch = hgt / rows
    const cells: React.ReactNode[] = []
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const after = c * cw > cp
        const v = rand(r * cols + c) * (after ? 1 : 0.45)
        cells.push(
          <rect
            key={`${r}-${c}`}
            x={c * cw + 1}
            y={r * ch + 1}
            width={cw - 2}
            height={ch - 2}
            fill={v > 0.82 ? 'var(--c-signal)' : 'var(--c-fg)'}
            fillOpacity={v > 0.82 ? 1 : v * 0.35}
          />
        )
      }
    art = cells
  }

  return (
    <div className={`relative overflow-hidden ${variant === 1 ? 'bg-signal' : 'bg-elev'} ${className}`}>
      <svg viewBox={`0 0 ${w} ${hgt}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        {art}
        {variant !== 1 && (
          <>
            <line x1={cp} x2={cp} y1="14" y2={hgt - 14} stroke="var(--c-signal)" strokeWidth="1.2" strokeDasharray="3 4" />
            <circle cx={cp} cy="14" r="3" fill="var(--c-signal)" />
          </>
        )}
      </svg>
      <span className={`label absolute bottom-4 right-4 ${variant === 1 ? 'text-[#0b0b0a]' : ''}`}>τ={(cp / w).toFixed(2)}</span>
      {label && (
        <span className={`display absolute bottom-4 left-4 text-[clamp(1.75rem,4vw,3rem)] ${variant === 1 ? 'text-[#0b0b0a]' : 'text-fg'}`}>
          {label}
        </span>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Company logo tile                                                   */
/* ------------------------------------------------------------------ */

export function CompanyLogo({ company, size = 56 }: { company: Company; size?: number }) {
  const initials = company.name
    .split(' ')
    .filter((w) => /^[A-ZÁÉÍÓÚ]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] ring-1 ring-line"
      style={{ width: size, height: size, background: company.logoBg }}
    >
      {company.logo ? (
        <img src={company.logo} alt={`${company.name} logo`} className="h-[66%] w-[66%] object-contain" loading="lazy" />
      ) : (
        <span className="font-display text-[0.95rem] font-semibold tracking-tight text-[#efece4]">{initials}</span>
      )}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Publication status + smart links                                    */
/* ------------------------------------------------------------------ */

export function PubChip({ pub }: { pub: NonNullable<Research['pub']> }) {
  const { t } = useI18n()
  const style = {
    published: 'bg-signal text-on-signal',
    accepted: 'bg-fg text-bg',
    submitted: 'border border-line-strong text-fg',
    manuscript: 'border border-line text-muted',
  }[pub]
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.08em] ${style}`}>
      {t(`research.pub.${pub}`)}
    </span>
  )
}

/**
 * One link component for content: routes stay in the SPA, while external
 * sites and files (PDFs) open in a new tab.
 */
export function SmartLink({
  href,
  className = '',
  children,
  ...rest
}: { href: string; className?: string; children: React.ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const external = /^(https?:|mailto:)/.test(href) || /\.(pdf|png|jpe?g|webp)$/i.test(href)
  if (!external)
    return (
      <Link to={href} className={className} {...rest}>
        {children}
      </Link>
    )
  return (
    <a href={href} className={className} {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer' })} {...rest}>
      {children}
    </a>
  )
}
