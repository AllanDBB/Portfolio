import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

/**
 * A single floating image that trails the cursor over list rows.
 * Rows call `show(src)` / `hide()`; touch devices never see it.
 */

const Ctx = createContext<{ show: (src?: string) => void; hide: () => void }>({
  show: () => {},
  hide: () => {},
})

export function HoverPreviewProvider({ children }: { children: React.ReactNode }) {
  const box = useRef<HTMLDivElement | null>(null)
  const [src, setSrc] = useState<string | undefined>()
  const [on, setOn] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    const pos = { x: 0, y: 0 }
    const cur = { x: 0, y: 0, r: 0 }
    let raf = 0
    const move = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
    }
    const tick = () => {
      const dx = pos.x - cur.x
      cur.x += dx * 0.12
      cur.y += (pos.y - cur.y) * 0.12
      cur.r += (Math.max(-12, Math.min(12, dx * 0.08)) - cur.r) * 0.1
      if (box.current) box.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(32px, -50%) rotate(${cur.r}deg)`
      raf = requestAnimationFrame(tick)
    }
    // Content scrolling under a still pointer never fires pointerleave.
    const onScroll = () => setOn(false)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const show = useCallback((next?: string) => {
    if (!next) return setOn(false)
    setSrc(next)
    setOn(true)
  }, [])
  const hide = useCallback(() => setOn(false), [])

  return (
    <Ctx.Provider value={{ show, hide }}>
      {children}
      {enabled && (
        <div ref={box} className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block" aria-hidden>
          <div
            className={`h-[300px] w-[240px] overflow-hidden rounded-[2px] transition-[clip-path,opacity] duration-700 ease-[var(--ease-out-expo)] ${
              on ? 'opacity-100 [clip-path:inset(0_0_0_0)]' : 'opacity-0 [clip-path:inset(50%_50%_50%_50%)]'
            }`}
          >
            {src && <img src={src} alt="" className="h-full w-full scale-110 object-cover" />}
          </div>
        </div>
      )}
    </Ctx.Provider>
  )
}

export function useHoverPreview() {
  return useContext(Ctx)
}
