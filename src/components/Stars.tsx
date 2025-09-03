import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  r: number
  base: number
  amp: number
  speed: number
  phase: number
}

export function Stars({ density = 14000 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const animRef = useRef<number | null>(null)
  const starsRef = useRef<Star[]>([])
  type Shooter = {
    x: number
    y: number
    vx: number
    vy: number
    life: number
    ttl: number
    trail: { x: number; y: number }[]
  }
  const shootersRef = useRef<Shooter[]>([])

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d', { alpha: true })!

    let w = 0, h = 0, dpr = Math.max(1, window.devicePixelRatio || 1)
    let dustCanvas: HTMLCanvasElement | null = null
    let dustW = 0, dustH = 0

    function generateDust(size = 1024) {
      dustCanvas = document.createElement('canvas')
      dustCanvas.width = size
      dustCanvas.height = size
      const dctx = dustCanvas.getContext('2d')!
      dctx.clearRect(0, 0, size, size)
      const blobs = 200
      for (let i = 0; i < blobs; i++) {
        const cx = Math.random() * size
        const cy = Math.random() * size
        const r = 40 + Math.random() * 160
        const huePick = Math.random()
        let color = '255,255,255'
        if (huePick < 0.25) color = '255,122,162'
        else if (huePick < 0.5) color = '122,196,255'
        const a1 = 0.06 + Math.random() * 0.06
        // Draw the blob and seamless wrap copies (9-tile) to avoid square seams
        const positions = [-size, 0, size]
        for (const dx of positions) {
          for (const dy of positions) {
            const x = cx + dx
            const y = cy + dy
            const grad = dctx.createRadialGradient(x, y, 0, x, y, r)
            grad.addColorStop(0, `rgba(${color},${a1})`)
            grad.addColorStop(1, 'rgba(255,255,255,0)')
            dctx.fillStyle = grad
            dctx.beginPath()
            dctx.arc(x, y, r, 0, Math.PI * 2)
            dctx.fill()
          }
        }
      }
      dustW = size
      dustH = size
    }

    function resize() {
      const parent = canvas.parentElement as HTMLElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      w = Math.max(1, Math.floor(rect.width))
      h = Math.max(1, Math.floor(rect.height))
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // recreate stars based on area
      const count = Math.max(40, Math.floor((w * h) / density))
      const stars: Star[] = []
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 0.9 + 0.4, // 0.4 - 1.3 px
          base: 0.25 + Math.random() * 0.25, // base alpha
          amp: 0.15 + Math.random() * 0.25, // twinkle amplitude
          speed: 0.5 + Math.random() * 0.8, // twinkle speed factor
          phase: Math.random() * Math.PI * 2,
        })
      }
        starsRef.current = stars

        // regenerate dust texture (size is fixed; content randomized)
        generateDust(1024)
      }

    let start = performance.now()
    let last = start
    function spawnShooter() {
      // Spawn from a random edge towards bottom-right mostly
      const fromTop = Math.random() < 0.6
      const margin = 40
      const x = fromTop ? Math.random() * (w * 0.6) + margin : -margin
      const y = fromTop ? -margin : Math.random() * (h * 0.4) + margin
      const speed = 400 + Math.random() * 260 // px/s
      const angle = (Math.PI / 6) + Math.random() * (Math.PI / 6) // 30-60 deg
      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed
      shootersRef.current.push({ x, y, vx, vy, life: 0, ttl: 1.2 + Math.random() * 0.8, trail: [] })
    }

    function tick(now: number) {
      const t = (now - start) / 1000
      const dt = Math.max(0.001, (now - last) / 1000)
      last = now
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#fff'
      for (const s of starsRef.current) {
        const a = s.base + s.amp * (0.5 + 0.5 * Math.sin(s.speed * t + s.phase))
        ctx.globalAlpha = Math.min(0.9, Math.max(0, a))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
        ctx.globalAlpha = 1

        // Nebula / dust layer: seamless tile with slow drift + slight rotation
        if (dustCanvas) {
          const offx = (t * 10) % dustW
          const offy = (t * 7) % dustH
          ctx.save()
          ctx.globalCompositeOperation = 'screen'
          ctx.globalAlpha = 0.14
          // apply gentle rotation/scaling so it doesn't feel grid-like
          ctx.translate(w / 2, h / 2)
          ctx.rotate(t * 0.02)
          ctx.scale(1.12, 1.12)
          // draw tiled pattern covering transformed viewport
          for (let x = -w - dustW; x < w + dustW; x += dustW) {
            for (let y = -h - dustH; y < h + dustH; y += dustH) {
              ctx.drawImage(dustCanvas, Math.floor(x - offx), Math.floor(y - offy))
            }
          }
          ctx.restore()
        }

      // Occasionally create a few shooting stars (allow up to 3 concurrent)
        if (shootersRef.current.length < 3 && Math.random() < dt / 3) {
          spawnShooter()
        }

      // Update + draw shooting stars with fading trails
      if (shootersRef.current.length) {
        const next: Shooter[] = []
        for (const s of shootersRef.current) {
          s.life += dt
          s.x += s.vx * dt
          s.y += s.vy * dt
          s.trail.unshift({ x: s.x, y: s.y })
          if (s.trail.length > 28) s.trail.pop()

          // Trail
          for (let i = 0; i < s.trail.length - 1; i++) {
            const p1 = s.trail[i]
            const p2 = s.trail[i + 1]
            const alpha = Math.max(0, 0.9 - i * 0.045)
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx.lineWidth = Math.max(0.5, 2 - i * 0.07)
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
          // Head (bright)
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = '#ffffff'
          ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.arc(s.x, s.y, 1.6, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0

          // keep if alive
          if (!(s.life > s.ttl || s.x > w + 80 || s.y > h + 80)) next.push(s)
        }
        shootersRef.current = next
      }
      animRef.current = requestAnimationFrame(tick)
    }

    resize()
    animRef.current = requestAnimationFrame(tick)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement as Element)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
