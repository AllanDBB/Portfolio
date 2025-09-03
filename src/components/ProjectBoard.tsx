import React, { useEffect, useState } from 'react'
import type { Project, Status } from '../types'
import { useI18n } from '../i18n'

function statusStyle(s: Status) {
  switch (s) {
    case 'done':
      return { bg: '#E6F7EE', fg: '#0F8C5A', br: '#C8ECDD' }
    case 'in_progress':
      return { bg: '#FFF4E5', fg: '#B4690E', br: '#FDE1BD' }
    case 'canceled':
      return { bg: '#FDE7EB', fg: '#B42318', br: '#FAC5CE' }
    case 'planned':
    default:
      return { bg: '#EEF2F7', fg: '#3B4A66', br: '#D5DEEA' }
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
              className="rounded-xl overflow-hidden card cursor-pointer"
              onClick={() => onOpen?.(p)}
            >
              {thumb ? (
                <img src={thumb} alt={p.title} className="h-36 w-full object-cover" />
              ) : (
                <div className="h-36 w-full" style={{ background: 'linear-gradient(135deg,#eee,#e6e2de)' }} />
              )}
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
                    style={{ background: bg, color: fg, border: `1px solid ${br}` }}
                  >
                    <span className="size-1.5 rounded-full" style={{ background: fg }} />
                    {t(`status.${s}`)}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  {p.summary}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {p.tech.map((tch) => (
                    <span key={tch} className="text-xs px-2 py-0.5 rounded-full chip">
                      {tch}
                    </span>
                  ))}
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

