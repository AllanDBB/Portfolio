import type Lenis from 'lenis'

/**
 * One Lenis instance for the whole site, driven by GSAP's ticker so
 * ScrollTrigger and smooth scroll never disagree about where we are.
 * Everything is loaded lazily: nothing here runs during prerender.
 */

let lenis: Lenis | null = null
let ready: Promise<typeof import('gsap')> | null = null

export function loadGsap() {
  if (!ready) {
    ready = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([g, st]) => {
      g.gsap.registerPlugin(st.ScrollTrigger)
      return g
    })
  }
  return ready
}

export async function startSmoothScroll() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const [{ default: LenisCtor }, { gsap }, { ScrollTrigger }] = await Promise.all([
    import('lenis'),
    loadGsap(),
    import('gsap/ScrollTrigger'),
  ])
  lenis = new LenisCtor({ lerp: 0.1, wheelMultiplier: 1 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

export function scrollTo(target: string | number) {
  if (lenis) lenis.scrollTo(target, { duration: 1.4 })
  else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' })
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
}

export function setScrollLocked(locked: boolean) {
  if (lenis) (locked ? lenis.stop() : lenis.start())
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

export async function refreshTriggers() {
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  ScrollTrigger.refresh()
}
