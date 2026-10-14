import { useEffect, useRef } from 'react'

/**
 * Noddle, shown with its real screens: the POS kitchen on a tablet and
 * two guest-app screens on phones in front of it. Leans with the pointer.
 */

function Phone({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`rounded-[2.1rem] bg-[#111111] p-[0.42rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.75rem] bg-[#F2EFEA]">
        <span className="absolute left-1/2 top-[0.45rem] z-10 h-[0.9rem] w-[28%] -translate-x-1/2 rounded-full bg-[#111111]" />
        <img src={src} alt={alt} loading="lazy" className="block w-full" />
      </div>
    </div>
  )
}

export function NoddleMocks({ className = '' }: { className?: string }) {
  const root = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = root.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--mx', x.toFixed(3))
      el.style.setProperty('--my', y.toFixed(3))
    }
    const leave = () => {
      el.style.setProperty('--mx', '0')
      el.style.setProperty('--my', '0')
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  const layer = (depth: number) => ({
    transform: `translate3d(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px), 0)`,
    transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
  })

  return (
    <div ref={root} className={`relative aspect-[5/4] w-full ${className}`} aria-label="Noddle: app para comensales y POS para restaurantes" role="img">
      {/* Warm gold light from the top-right, like the app's paper */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(70% 60% at 85% 10%, rgba(255,181,36,0.35), transparent 70%), #F2EFEA' }}
      />

      {/* Tablet — POS, kitchen mode */}
      <div className="absolute left-[6%] top-[9%] w-[78%]" style={layer(-14)}>
        <div className="rounded-[1.4rem] bg-[#111111] p-[0.55rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
          <img src="/images/noddle/pos-cocina.webp" alt="POS de Noddle, modo cocina" loading="lazy" className="block w-full rounded-[0.95rem]" />
        </div>
        <span className="mt-3 block font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[#111111]/60">POS · Cocina</span>
      </div>

      {/* Phones — guest app */}
      <div className="absolute bottom-[4%] right-[22%] w-[25%] rotate-[-5deg]" style={layer(18)}>
        <Phone src="/images/noddle/app-allergen.webp" alt="App de Noddle: menú con alergias marcadas" />
      </div>
      <div className="absolute bottom-[-6%] right-[3%] w-[27%] rotate-[4deg]" style={layer(30)}>
        <Phone src="/images/noddle/app-live.webp" alt="App de Noddle: pedido en vivo" />
      </div>

      {/* Live badge */}
      <div
        className="absolute left-[9%] bottom-[12%] flex items-center gap-2 rounded-full bg-[#111111] px-4 py-2 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[#FAFAF8] shadow-lg"
        style={layer(22)}
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FFB524]" />
        Mesa 12 · en vivo
      </div>
    </div>
  )
}
