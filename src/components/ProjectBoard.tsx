import React, { useEffect, useState } from 'react'
import type { Project, Status } from '../types'
import { useI18n } from '../i18n'

function statusStyle(s: Status) {
  switch (s) {
    case 'done':
      return { bg: '#E6F7EE', fg: '#0F8C5A', br: '#C8ECDD' }
    case 'in_progress':
      // Turquoise/Teal theme
      return { bg: 'var(--accent-light)', fg: 'var(--accent)', br: 'var(--accent)' }
    case 'canceled':
      return { bg: '#FDE7EB', fg: '#B42318', br: '#FAC5CE' }
    case 'planned':
    default:
      return { bg: '#F3F4F6', fg: '#4B5563', br: '#E5E7EB' }
  }
}

export function ProjectBoard({ projects, note, pageSize = 6, onOpen }: { projects: Project[]; note?: string; pageSize?: number; onOpen?: (p: Project) => void }) {
  const { t } = useI18n()
  const [page, setPage] = useState<number>(1)
  useEffect(() => {
    setPage(1)
  }, [projects])

  const total = projects.length
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const start = (page - 1) * pageSize
  const visible = projects.slice(start, start + pageSize)

  return (
    <section className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        {note ? (
          <div className="relative px-3 py-2 rounded-2xl card text-sm">
            {note}
            <div className="w-3 h-3 rotate-45 card absolute left-1/2 -translate-x-1/2" style={{ bottom: '-6px' }} />
          </div>
        ) : (
          <span />
        )}
        {pages > 1 && (
          <div className="flex items-center gap-2 text-sm">
            <span style={{ color: 'var(--muted)' }}>Page {page}/{pages}</span>
            <button
              className="px-2 py-1 rounded-full chip"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous"
            >
              {'<'}
            </button>
            <button
              className="px-2 py-1 rounded-full chip"
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
              aria-label="Next"
            >
              {'>'}
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((p) => {
          const s = p.status ?? 'planned'
          const { bg, fg, br } = statusStyle(s)
          const thumb = (p.images && p.images[0]) || p.imageUrl
          return (
            <article
              key={p.id}
              className="group relative flex flex-col h-full rounded-xl overflow-hidden card cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 bg-white border border-[color:var(--border)]"
              onClick={() => onOpen?.(p)}
            >
              {/* Image Container with subtle overlay on hover */}
              <div className="relative h-40 w-full overflow-hidden">
                {thumb ? (
                  <img src={thumb} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="h-full w-full bg-[color:var(--bg-alt)] flex items-center justify-center text-[color:var(--muted)]/20">
                     <svg className="size-12" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v12H4z" opacity="0.5"/></svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex flex-col flex-1 p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-[color:var(--text)] group-hover:text-[color:var(--accent)] transition-colors line-clamp-1" title={p.title}>
                        {p.title}
                    </h3>
                </div>
                
                <p className="flex-1 text-sm text-[color:var(--muted)] line-clamp-3 mb-4 leading-relaxed">
                    {p.summary}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[color:var(--border)]/50 mt-auto">
                    <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase"
                        style={{ background: bg, color: fg }}
                    >
                        <span className="size-1.5 rounded-full" style={{ background: fg }} />
                        {t(`status.${s}`)}
                    </span>
                    
                    {/* Optional: Add a subtle 'View' or arrow icon */}
                     <span className="text-[color:var(--accent)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        →
                     </span>
                </div>
              </div>
            </article>
          )
        })}
      </div>
      {pages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            className="px-2 py-1 rounded-full chip"
            onClick={() => setPage((p: number) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous"
          >
            {'<'}
          </button>
          {Array.from({ length: pages }).map((_, i) => {
            const n = i + 1
            const active = n === page
            return (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={active ? 'px-3 py-1 rounded-full card font-medium' : 'px-3 py-1 rounded-full chip'}
                aria-current={active ? 'page' : undefined}
              >
                {n}
              </button>
            )
          })}
          <button
            className="px-2 py-1 rounded-full chip"
            onClick={() => setPage((p: number) => Math.min(pages, p + 1))}
            disabled={page === pages}
            aria-label="Next"
          >
            {'>'}
          </button>
        </div>
      )}
    </section>
  )
}

