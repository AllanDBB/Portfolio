import { useEffect, useRef } from 'react'

/**
 * Hero canvas: stacked heart-rate ridgelines (à la Unknown Pleasures).
 * Every few seconds one row undergoes a regime shift; a mock online
 * detector "catches" it after a delay and marks the change point —
 * the same problem the research is about, drawn live.
 */

type Event = {
  row: number
  x: number
  born: number
  detectAt: number
  algo: string
}

const ALGOS = ['CUSUM', 'EWMA', 'BOCPD', 'Page-Hinkley', 'SSM-Canary', 'KS two-sample']

/** One ECG beat over phase p ∈ [0,1): P wave, QRS complex, T wave. */
function ecg(p: number) {
  const g = (mu: number, s: number, a: number) => a * Math.exp(-((p - mu) ** 2) / (2 * s * s))
  return g(0.18, 0.025, 0.12) + g(0.3, 0.008, -0.14) + g(0.33, 0.01, 1) + g(0.36, 0.009, -0.28) + g(0.58, 0.05, 0.26)
}

export function SignalField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let dpr = 1
    let rows = 0
    let gap = 0
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    let colors = { bg: '#0b0b0a', fg: '#efece4', signal: '#d4ff3a' }
    let event: Event | null = null
    let raf = 0
    let visible = true
    let frame = 0
    const start = performance.now()
    let ys = new Float32Array(1)

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      colors = {
        bg: cs.getPropertyValue('--c-bg').trim() || colors.bg,
        fg: cs.getPropertyValue('--c-fg').trim() || colors.fg,
        signal: cs.getPropertyValue('--c-signal-ink').trim() || colors.signal,
      }
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      rows = Math.max(16, Math.min(44, Math.round(h / 20)))
      gap = (h * 0.86) / rows
      ys = new Float32Array(Math.ceil(w / 4) + 4)
    }

    const spawn = (now: number) => {
      const row = Math.floor(rows * (0.25 + Math.random() * 0.6))
      const x = w * (0.42 + Math.random() * 0.38)
      event = {
        row,
        x,
        born: now,
        detectAt: now + 380 + Math.random() * 520,
        algo: ALGOS[Math.floor(Math.random() * ALGOS.length)],
      }
    }

    const draw = (now: number) => {
      const t = (now - start) / 1000
      if (frame++ % 45 === 0) readColors()
      mouse.x += (mouse.tx - mouse.x) * 0.08
      mouse.y += (mouse.ty - mouse.y) * 0.08

      if (!event || now - event.born > 4200) spawn(now)
      const ev = event!

      ctx.clearRect(0, 0, w, h)
      const top = h * 0.1
      const cx = w * 0.64
      const sigma = w * 0.2
      const step = w < 700 ? 5 : 4

      for (let r = 0; r < rows; r++) {
        const base = top + r * gap + gap
        const seed = r * 12.9898
        const speed = 0.16 + ((r * 7) % 5) * 0.012
        const isEv = r === ev.row
        const shiftAge = isEv ? Math.min(1, (now - ev.born) / 500) : 0

        let n = 0
        for (let x = 0; x <= w + step; x += step) {
          const env = Math.exp(-(((x - cx) / sigma) ** 2))
          const md = Math.hypot(x - mouse.x, base - mouse.y)
          const near = Math.exp(-((md / 170) ** 2))
          const amp = gap * (0.55 + 3.4 * env + 2.6 * near)
          const noise =
            Math.sin(x * 0.021 + t * 1.3 + seed) * 0.08 +
            Math.sin(x * 0.057 - t * 0.9 + seed * 1.7) * 0.05 +
            Math.sin(x * 0.11 + t * 2.1 + seed * 0.3) * 0.025
          const phase = ((((x / w) * 3.2 - t * speed + seed * 0.37) % 1) + 1) % 1
          let y = ecg(phase) * 0.9 + noise
          // Regime shift: mean and variance jump to the right of the change point.
          if (isEv && x > ev.x) {
            const k = Math.min(1, (x - ev.x) / 40) * shiftAge
            y += k * (0.55 + Math.sin(x * 0.19 + t * 6) * 0.22)
          }
          ys[n++] = base - Math.max(0, y) * amp
        }

        const trace = () => {
          ctx.beginPath()
          ctx.moveTo(0, ys[0])
          for (let i = 1; i < n; i++) ctx.lineTo(i * step, ys[i])
        }
        // Occlude the rows behind with the background, then stroke.
        trace()
        ctx.lineTo((n - 1) * step, h)
        ctx.lineTo(0, h)
        ctx.closePath()
        ctx.fillStyle = colors.bg
        ctx.fill()
        trace()
        const detected = isEv && now >= ev.detectAt
        ctx.strokeStyle = detected ? colors.signal : colors.fg
        ctx.globalAlpha = detected ? 1 : 0.32 + 0.5 * (r / rows)
        ctx.lineWidth = detected ? 1.6 : 1
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      // Detection marker
      if (now >= ev.detectAt) {
        const age = Math.min(1, (now - ev.detectAt) / 450)
        const fade = now - ev.born > 3600 ? Math.max(0, 1 - (now - ev.born - 3600) / 600) : 1
        const y0 = top
        const y1 = top + (ev.row + 1) * gap + gap * 0.2
        ctx.globalAlpha = fade
        ctx.strokeStyle = colors.signal
        ctx.setLineDash([3, 4])
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(ev.x, y0)
        ctx.lineTo(ev.x, y0 + (y1 - y0) * age)
        ctx.stroke()
        ctx.setLineDash([])
        ctx.fillStyle = colors.signal
        ctx.beginPath()
        ctx.arc(ev.x, y0, 3, 0, Math.PI * 2)
        ctx.fill()

        const mttd = Math.round(ev.detectAt - ev.born)
        ctx.font = '500 10px "JetBrains Mono", monospace'
        ctx.textBaseline = 'bottom'
        const label = `Δ CHANGE POINT  τ=${(ev.x / w).toFixed(3)}  ·  ${ev.algo}  ·  MTTD ${mttd}ms`
        const tw = ctx.measureText(label).width
        const lx = Math.min(ev.x + 8, w - tw - 12)
        ctx.fillText(label.slice(0, Math.ceil(label.length * age)), lx, y0 - 6)
        ctx.globalAlpha = 1
      }

      if (!reduce && visible) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - r.left
      mouse.ty = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.tx = -9999
      mouse.ty = -9999
    }

    readColors()
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    const io = new IntersectionObserver(([entry]) => {
      const was = visible
      visible = entry.isIntersecting
      if (visible && !was && !reduce) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)

    if (reduce) {
      const now = performance.now()
      spawn(now - 2000)
      event!.detectAt = now - 1500
      draw(now)
    } else raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={`block h-full w-full ${className}`} />
}
