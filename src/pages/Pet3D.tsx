import { useEffect, useRef, useState } from 'react'
import type * as ThreeNS from 'three'

/** Carga three sólo cuando esta ruta se monta: no pesa en el resto del sitio. */
export default function Pet3D({ label, onReady }: { label: string; onReady?: () => void }) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let stop = false
    let cleanup: (() => void) | undefined

    const start = async () => {
      let THREE: typeof import('three')
      let buildPet: typeof import('./pet').buildPet
      try {
        ;[THREE, { buildPet }] = await Promise.all([import('three'), import('./pet')])
      } catch {
        if (!stop) setFailed(true)
        return
      }
      if (stop) return

      const canvas = document.createElement('canvas')
      canvas.setAttribute('role', 'img')
      canvas.setAttribute('aria-label', label)
      canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab'

      let renderer: ThreeNS.WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      } catch {
        if (!stop) setFailed(true)
        return
      }
      host.appendChild(canvas)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 40)
      camera.position.set(0, 0.62, 5.1)
      camera.lookAt(0, 0.42, 0)

      scene.add(new THREE.HemisphereLight(0xfff6da, 0xd6ecc8, 2.1))
      const key = new THREE.DirectionalLight(0xfff4d6, 2.3)
      key.position.set(2.6, 4.2, 3.4)
      scene.add(key)
      const rim = new THREE.DirectionalLight(0xffd9ec, 0.9)
      rim.position.set(-3, 1.4, -2.6)
      scene.add(rim)

      const pet = buildPet()
      scene.add(pet.root)

      const resize = () => {
        const w = host.clientWidth || 300
        const h = host.clientHeight || 300
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(host)

      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      let spin = -0.35
      let target = -0.35
      let dragging = false
      let lastX = 0

      const down = (e: PointerEvent) => {
        dragging = true
        lastX = e.clientX
        canvas.setPointerCapture(e.pointerId)
        canvas.style.cursor = 'grabbing'
      }
      const move = (e: PointerEvent) => {
        if (!dragging) return
        target += (e.clientX - lastX) * 0.011
        lastX = e.clientX
      }
      const up = (e: PointerEvent) => {
        dragging = false
        canvas.releasePointerCapture?.(e.pointerId)
        canvas.style.cursor = 'grab'
      }
      canvas.addEventListener('pointerdown', down)
      canvas.addEventListener('pointermove', move)
      canvas.addEventListener('pointerup', up)
      canvas.addEventListener('pointercancel', up)

      let raf = 0
      let announced = false
      let blinkAt = 2.4
      const clock = new THREE.Clock()

      const frame = () => {
        const t = clock.getElapsedTime()

        if (!dragging && !still) target += 0.0022
        spin += (target - spin) * 0.09
        pet.root.rotation.y = spin

        if (!still) {
          pet.root.position.y = 0.12 + Math.sin(t * 1.5) * 0.035
          pet.head.rotation.z = Math.sin(t * 0.85) * 0.055
          pet.head.rotation.x = Math.sin(t * 1.2) * 0.03
          pet.tail.rotation.y = Math.sin(t * 1.1) * 0.24
          pet.ears.forEach((ear, i) => {
            ear.rotation.x = Math.sin(t * 2.3 + i * 1.4) * 0.05
          })

          if (t > blinkAt) {
            const k = (t - blinkAt) / 0.16
            const s = k < 1 ? Math.max(0.08, Math.abs(Math.cos(k * Math.PI))) : 1
            pet.eyes.forEach((eye) => eye.scale.setY(s))
            if (k >= 1) blinkAt = t + 2.6 + Math.random() * 3.4
          }
        }

        renderer.render(scene, camera)
        if (!announced) {
          announced = true
          onReady?.()
        }
        raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)

      cleanup = () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        canvas.removeEventListener('pointerdown', down)
        canvas.removeEventListener('pointermove', move)
        canvas.removeEventListener('pointerup', up)
        canvas.removeEventListener('pointercancel', up)
        pet.dispose()
        renderer.dispose()
        canvas.remove()
      }
    }

    start()

    return () => {
      stop = true
      cleanup?.()
    }
  }, [label, onReady])

  if (failed) return null
  return <div ref={hostRef} className="md-pet3d" aria-hidden={false} />
}
