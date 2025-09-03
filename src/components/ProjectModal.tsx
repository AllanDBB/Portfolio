import type { Project } from '../types'
import { useI18n } from '../i18n'
import { useEffect, useRef, useState } from 'react'

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useI18n()
  const imgs = project.images && project.images.length > 0 ? project.images : (project.imageUrl ? [project.imageUrl] : [])
  const [idx, setIdx] = useState(0)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => { setIdx(0) }, [project?.id])

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

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/10" />
      <article className="relative z-10 max-w-xl w-[92%] rounded-2xl card p-4" onClick={(e) => e.stopPropagation()}>
        {imgs.length > 0 && (
          <div className="relative rounded-xl overflow-hidden" ref={trackRef}>
            <img src={imgs[idx]} alt={project.title} className="h-48 w-full object-cover" />
            {imgs.length > 1 && (
              <>
                <button aria-label="Prev" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 size-8 rounded-full chip grid place-items-center">{'<'}
                </button>
                <button aria-label="Next" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-full chip grid place-items-center">{'>'}
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {imgs.map((_, i) => (
                    <span key={i} className={"size-1.5 rounded-full " + (i === idx ? 'bg-[color:var(--text)]' : 'bg-black/20')}></span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        <div className="mt-3 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          {project.status ? (
            <span className="text-xs chip px-2 py-0.5 rounded-full">{t(`status.${project.status}`)}</span>
          ) : null}
        </div>
        <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>
          {project.summary}
        </p>
        <div className="mt-3 flex flex-wrap gap-1">
          {project.tech.map((tch) => (
            <span key={tch} className="text-xs px-2 py-0.5 rounded-full chip">
              {tch}
            </span>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-3 py-1 rounded-full card font-medium">Cerrar</button>
        </div>
      </article>
    </div>
  )
}
