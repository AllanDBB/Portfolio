import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import type { Status } from '../types'

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
  return <div className={`mx-auto w-full max-w-[1240px] px-6 md:px-10 lg:px-14 ${className}`}>{children}</div>
}

/** Section header: mono label + jade rule + serif title. */
export function SectionHead({
  label,
  title,
  lead,
  action,
}: {
  label: string
  title: string
  lead?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="jade-rule" />
          <span className="label">{label}</span>
        </div>
        <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.25rem)]">{title}</h2>
        {lead && <p className="prose-body mt-3 text-base">{lead}</p>}
      </div>
      {action}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Reveal on scroll                                                    */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Comp = 'div',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: React.ElementType
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Comp
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  )
}

/* ------------------------------------------------------------------ */
/* Atoms                                                               */
/* ------------------------------------------------------------------ */

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide text-muted">
      {children}
    </span>
  )
}

const STATUS_DOT: Record<Status, string> = {
  shipped: 'bg-jade',
  active: 'bg-jade',
  research: 'bg-muted',
  archived: 'bg-faint',
}

export function StatusPill({ status }: { status: Status }) {
  const { t } = useI18n()
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
      <span className={`relative flex h-1.5 w-1.5 ${STATUS_DOT[status]} rounded-full`}>
        {status === 'active' && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jade opacity-60" />
        )}
      </span>
      {t(`status.${status}`)}
    </span>
  )
}

export function ArrowLink({
  to,
  href,
  children,
  className = '',
}: {
  to?: string
  href?: string
  children: React.ReactNode
  className?: string
}) {
  const inner = (
    <span className="inline-flex items-center gap-2">
      <span className="link-underline">{children}</span>
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </span>
  )
  const cls = `group inline-flex font-mono text-xs uppercase tracking-[0.14em] text-jade ${className}`

  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
      {inner}
    </a>
  )
}

/** Small external link with an arrow glyph. */
export function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http') || href.startsWith('mailto:')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className="link-underline inline-flex items-center gap-1.5 text-sm text-fg/90 hover:text-jade"
    >
      {children}
      <span aria-hidden className="text-[0.6em] text-faint">
        ↗
      </span>
    </a>
  )
}
