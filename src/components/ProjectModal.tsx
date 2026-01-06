import type { Project } from '../types'
import { useI18n } from '../i18n'
import { useEffect, useRef, useState } from 'react'

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t, locale } = useI18n()
  const imgs = project.images && project.images.length > 0 ? project.images : (project.imageUrl ? [project.imageUrl] : [])
  const [idx, setIdx] = useState(0)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => { setIdx(0) }, [project?.id])

  const getSummary = (summary: string | { es: string; en: string }) => {
    return typeof summary === 'string' ? summary : summary[locale]
  }

  const prev = () => setIdx((i) => (i - 1 + imgs.length) % Math.max(1, imgs.length))
  const next = () => setIdx((i) => (i + 1) % Math.max(1, imgs.length))

  // simple touch swipe
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let sx = 0
    const onStart = (e: TouchEvent) => { sx = e.touches[0].clientX }
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - sx
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev() }
    }
    el.addEventListener('touchstart', onStart)
    el.addEventListener('touchend', onEnd)
    return () => { el.removeEventListener('touchstart', onStart); el.removeEventListener('touchend', onEnd) }
  }, [imgs.length])

  // Status badge styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'in_progress':
        return { bg: '#0d9488', fg: 'white' }
      case 'done':
        return { bg: '#10b981', fg: 'white' }
      case 'planned':
        return { bg: '#f59e0b', fg: 'white' }
      case 'canceled':
        return { bg: '#6b7280', fg: 'white' }
      case 'paper':
        return { bg: '#8b5cf6', fg: 'white' }
      default:
        return { bg: '#e5e7eb', fg: '#374151' }
    }
  }

  const statusColors = project.status ? getStatusStyle(project.status) : null

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
    >
      <article 
        className="relative z-10 max-w-2xl w-full rounded-2xl bg-[color:var(--card)] shadow-2xl overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Image Gallery */}
        {imgs.length > 0 && (
          <div className="relative bg-gray-100" ref={trackRef} style={{ flexShrink: 0 }}>
            {/* Close button over image */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 size-10 rounded-full bg-[color:var(--card)]/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-[color:var(--card)] transition-colors"
              aria-label="Cerrar"
            >
              <svg className="size-5 text-[color:var(--text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <img src={imgs[idx]} alt={project.title} className="w-full h-72 object-cover" />
            {imgs.length > 1 && (
              <>
                <button 
                  aria-label="Anterior" 
                  onClick={prev} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-[color:var(--card)]/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-[color:var(--card)] transition-all"
                >
                  <svg className="size-5 text-[color:var(--text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  aria-label="Siguiente" 
                  onClick={next} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-[color:var(--card)]/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-[color:var(--card)] transition-all"
                >
                  <svg className="size-5 text-[color:var(--text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {imgs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={"size-2 rounded-full transition-all " + (i === idx ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80')}
                      aria-label={`Ir a imagen ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {project.company && (
                <p className="text-sm font-medium text-[color:var(--accent)] mb-1">{project.company}</p>
              )}
              <h3 className="text-2xl font-bold text-[color:var(--text)] leading-tight">{project.title}</h3>
            </div>
            {statusColors && (
              <span 
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide uppercase whitespace-nowrap"
                style={{ background: statusColors.bg, color: statusColors.fg }}
              >
                <span className="size-1.5 rounded-full" style={{ background: statusColors.fg }} />
                {t(`status.${project.status}`)}
              </span>
            )}
          </div>

          {/* Summary */}
          <p className="text-base text-[color:var(--muted)] leading-relaxed">
            {getSummary(project.summary)}
          </p>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold text-[color:var(--text)] mb-2">{t('technologies')}</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tch) => (
                <span 
                  key={tch} 
                  className="px-3 py-1.5 text-sm rounded-full bg-[color:var(--accent-light)] text-[color:var(--accent)] font-medium"
                >
                  {tch}
                </span>
              ))}
            </div>
          </div>

          {/* Link */}
          {project.link && (
            <div className="pt-4 border-t border-[color:var(--border)]">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[color:var(--accent)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <span>{t('viewProject')}</span>
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
