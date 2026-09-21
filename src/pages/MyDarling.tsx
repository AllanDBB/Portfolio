import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import './my-darling.css'

/* ------------------------------------------------------------------ */
/* Ruta privada: un jardín para ella. No va en el nav ni en el sitemap. */
/* ------------------------------------------------------------------ */

const FONTS =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700&family=Caveat:wght@500;700&display=swap'

/** PRNG con semilla: el campo se ve igual en el servidor y en el cliente. */
function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Bloom = {
  x: number
  w: number
  b: number
  delay: number
  sway: number
  petals: number
  bend: number
  tone: 0 | 1 | 2
}

/** 32 girasoles que abren de izquierda a derecha a lo largo de ~17 s. */
function growField(seed: number): Bloom[] {
  const rnd = seeded(seed)
  return Array.from({ length: 32 }, (_, i) => {
    const x = (i / 31) * 104 - 4 + (rnd() - 0.5) * 3
    return {
      x,
      w: 58 + rnd() * 62,
      b: rnd() * 16,
      delay: ((x + 4) / 108) * 14.5 + rnd() * 2.2,
      sway: 4.4 + rnd() * 3.6,
      petals: [10, 12, 14][Math.floor(rnd() * 3)],
      bend: (rnd() - 0.5) * 26,
      tone: Math.floor(rnd() * 3) as 0 | 1 | 2,
    }
  })
}

const TONES = [
  ['#ffe58a', '#ffd23f', '#f2a115'],
  ['#fff0b4', '#ffc728', '#e08f0c'],
  ['#ffe9a0', '#ffdb5c', '#f2a115'],
]

function Flower({
  id,
  petals,
  bend,
  tone,
  className = '',
}: {
  id: string
  petals: number
  bend: number
  tone: 0 | 1 | 2
  className?: string
}) {
  const [hi, mid, low] = TONES[tone]
  const ring = Array.from({ length: petals }, (_, i) => (360 / petals) * i)

  return (
    <svg viewBox="-70 -72 140 232" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-p`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hi} />
          <stop offset="70%" stopColor={mid} />
          <stop offset="100%" stopColor={low} />
        </linearGradient>
        <radialGradient id={`${id}-c`} cx="38%" cy="34%">
          <stop offset="0%" stopColor="#c98a2a" />
          <stop offset="100%" stopColor="#7c4a10" />
        </radialGradient>
      </defs>

      <path
        d={`M0 0 C ${bend} 56, ${-bend} 112, ${bend * 0.35} 158`}
        fill="none"
        stroke="#3c8b55"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <ellipse cx="-24" cy="74" rx="24" ry="11" fill="#7cc96d" transform="rotate(-22 -24 74)" />
      <ellipse cx="25" cy="108" rx="22" ry="10" fill="#5fae5f" transform="rotate(20 25 108)" />

      <g className="md-head">
        {ring.map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-36"
            rx="15"
            ry="34"
            fill={`url(#${id}-p)`}
            stroke={low}
            strokeWidth="1.4"
            transform={`rotate(${a})`}
          />
        ))}
        <circle cx="0" cy="0" r="21" fill={`url(#${id}-c)`} />
        <circle cx="-6" cy="-5" r="2.4" fill="#f6d79b" opacity="0.7" />
        <circle cx="6" cy="3" r="2" fill="#f6d79b" opacity="0.55" />
        <circle cx="1" cy="9" r="1.8" fill="#f6d79b" opacity="0.5" />
      </g>
    </svg>
  )
}

function Kitten({
  id,
  neon = false,
  box,
}: {
  id: string
  neon?: boolean
  /** Sólo cuando el gatito va anidado dentro de otro SVG. */
  box?: { x: number; y: number; width: number; height: number }
}) {
  const coat = neon ? `url(#${id}-neon)` : '#ffd884'
  const dark = neon ? '#ff8bb0' : '#f0a94b'

  return (
    <svg viewBox="0 0 132 104" {...box} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-neon`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff3b0" />
          <stop offset="48%" stopColor="#ffd23f" />
          <stop offset="100%" stopColor="#ffb1c8" />
        </linearGradient>
      </defs>

      <path d="M22 70 C2 68 6 40 22 44" fill="none" stroke={coat} strokeWidth="11" strokeLinecap="round" />
      <ellipse cx="56" cy="68" rx="34" ry="23" fill={coat} />
      <rect x="36" y="82" width="13" height="16" rx="6.5" fill={coat} />
      <rect x="58" y="82" width="13" height="16" rx="6.5" fill={coat} />
      <path d="M78 34 L74 14 L94 26 Z" fill={coat} />
      <path d="M78 34 L76 20 L88 27 Z" fill={dark} />
      <path d="M110 34 L118 16 L122 36 Z" fill={coat} />
      <path d="M110 34 L116 22 L118 34 Z" fill={dark} />
      <circle cx="98" cy="52" r="22" fill={coat} />
      <path d="M86 46 q5 -4 10 0" fill="none" stroke="#5a4021" strokeWidth="3" strokeLinecap="round" />
      <path d="M104 46 q5 -4 10 0" fill="none" stroke="#5a4021" strokeWidth="3" strokeLinecap="round" />
      <path d="M96 57 l5 0 l-2.5 3.4 Z" fill="#d96a8c" />
      <path d="M92 62 q6 5 12 0" fill="none" stroke="#5a4021" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M80 54 L68 51 M80 58 L68 60 M116 54 L128 51 M116 58 L128 60"
        stroke="#5a4021"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  )
}

function Butterfly({ tint }: { tint: string }) {
  return (
    <svg viewBox="0 0 44 34" aria-hidden="true">
      <path className="md-wing" d="M21 17 C8 0 0 6 4 16 C0 26 10 32 21 17 Z" fill={tint} opacity="0.92" />
      <path className="md-wing md-wing-r" d="M23 17 C36 0 44 6 40 16 C44 26 34 32 23 17 Z" fill={tint} opacity="0.92" />
      <ellipse cx="22" cy="17" rx="2.4" ry="8" fill="#5a4021" />
      <path d="M22 9 L17 3 M22 9 L27 3" stroke="#5a4021" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function Bee() {
  return (
    <svg viewBox="0 0 60 48" aria-hidden="true">
      <ellipse cx="18" cy="14" rx="14" ry="9" fill="#ffffff" opacity="0.75" transform="rotate(-24 18 14)" />
      <ellipse cx="40" cy="14" rx="14" ry="9" fill="#ffffff" opacity="0.75" transform="rotate(24 40 14)" />
      <ellipse cx="30" cy="28" rx="18" ry="13" fill="#ffd23f" />
      <path d="M24 17 L21 39 M32 16 L30 41 M40 20 L37 37" stroke="#5a4021" strokeWidth="4" strokeLinecap="round" />
      <circle cx="13" cy="26" r="7" fill="#5a4021" />
      <circle cx="11" cy="24" r="1.8" fill="#fff" />
    </svg>
  )
}

function Egg({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 140 172" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-shell`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#fffaf0" />
          <stop offset="55%" stopColor="#ffe9c0" />
          <stop offset="100%" stopColor="#ffd0a8" />
        </linearGradient>
      </defs>

      <ellipse cx="70" cy="162" rx="40" ry="7" fill="#4f9e54" opacity="0.28" />

      <g className="md-neon" style={{ pointerEvents: 'none' }}>
        <Kitten id={`${id}-k`} neon box={{ x: 20, y: 62, width: 100, height: 79 }} />
      </g>

      <g className="md-egg-shell">
        <path
          className="md-egg-top"
          d="M26 88 C26 46 46 20 70 20 C94 20 114 46 114 88 L104 80 L94 90 L84 80 L74 90 L64 80 L54 90 L44 80 L34 90 Z"
          fill={`url(#${id}-shell)`}
          stroke="#e8b98a"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          className="md-egg-bot"
          d="M26 88 L34 90 L44 80 L54 90 L64 80 L74 90 L84 80 L94 90 L104 80 L114 88 C114 126 96 152 70 152 C44 152 26 126 26 88 Z"
          fill={`url(#${id}-shell)`}
          stroke="#e8b98a"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle className="md-egg-bot" cx="54" cy="118" r="7" fill="#ffb1c8" opacity="0.8" />
        <circle className="md-egg-bot" cx="86" cy="132" r="5" fill="#ffd23f" opacity="0.85" />
        <circle className="md-egg-top" cx="62" cy="48" r="6" fill="#ffd23f" opacity="0.8" />
      </g>
    </svg>
  )
}

function CameraMark() {
  return (
    <svg viewBox="0 0 48 40" aria-hidden="true">
      <rect x="2" y="9" width="44" height="29" rx="8" fill="none" stroke="#f2a115" strokeWidth="3" strokeDasharray="6 5" />
      <path d="M16 9 l4 -6 h8 l4 6" fill="none" stroke="#f2a115" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="8" fill="none" stroke="#f2a115" strokeWidth="3" />
      <circle cx="24" cy="24" r="2.6" fill="#ffb1c8" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */

const POEM: Array<[string, string]> = [
  ['S', 'iempre que pienso en vos'],
  ['I', 'magino tu risa antes que nada,'],
  ['T', 'an clara que el día se arregla solo.'],
  ['E', 's por eso que junté pétalos'],
  ['L', 'ejos de cualquier floristería,'],
  ['A', ' mano, uno por uno,'],
  ['S', 'abiendo que ninguno se va a marchitar.'],
  ['D', 'ejá que este jardín te cuide'],
  ['A', ' cualquier hora que lo abras,'],
  ['R', 'ecordándote una sola cosa,'],
  ['E', 'sa que ya sabés.'],
]

const PETS = [
  { name: 'Gatita Amarilla', rar: 'Legendary', cls: 'md-legend', art: 'cat' },
  { name: 'Abeja Curiosa', rar: 'Ultra-Rare', cls: 'md-ultra', art: 'bee' },
  { name: 'Girasol Eterno', rar: 'Rare', cls: 'md-rare', art: 'flower' },
  { name: 'Huevo Sorpresa', rar: 'Common', cls: 'md-common', art: 'egg' },
] as const

/**
 * Los marcos. `src: null` = todavía vacío, muestra el placeholder.
 * Para llenar uno: dejá el archivo en public/my-darling/ y poné su ruta acá.
 *   foto-1.jpg · foto-2.jpg · foto-3.jpg · foto-4.jpg (cuadradas se ven mejor)
 */
const PHOTOS: Array<{ src: string | null; cap: string; r: string; tr: string }> = [
  { src: null, cap: 'vos', r: '-2.6deg', tr: '3deg' },
  { src: null, cap: 'nosotros', r: '1.8deg', tr: '-4deg' },
  { src: null, cap: 'ese día', r: '-1.2deg', tr: '5deg' },
  { src: null, cap: 'la que más me gusta', r: '2.4deg', tr: '-2deg' },
]

export default function MyDarling() {
  const [season, setSeason] = useState(0)
  const [hatched, setHatched] = useState(false)
  const [sunNote, setSunNote] = useState(false)
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const field = useMemo(() => growField(20260921 + season), [season])

  /* Fuentes y fondo: sólo mientras esta ruta está montada. */
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONTS
    document.head.appendChild(link)

    const html = document.documentElement
    const prev = html.style.background
    html.style.background = '#6fc9e8'

    return () => {
      link.remove()
      html.style.background = prev
    }
  }, [])

  /* Pétalos que flotan por encima de todo el scroll. */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const tints = ['#ffd23f', '#ffe58a', '#ffb1c8', '#fff0b4']
    const petals = Array.from({ length: 34 }, () => ({
      x: 0,
      y: 0,
      r: 0,
      vy: 0,
      vx: 0,
      spin: 0,
      a: 0,
      tint: tints[Math.floor(Math.random() * tints.length)],
    }))

    const place = (p: (typeof petals)[number], top: boolean) => {
      p.x = Math.random() * w
      p.y = top ? -20 - Math.random() * h * 0.4 : Math.random() * h
      p.r = 3.5 + Math.random() * 5.5
      p.vy = 16 + Math.random() * 34
      p.vx = -14 + Math.random() * 28
      p.spin = (Math.random() - 0.5) * 2.4
      p.a = Math.random() * Math.PI * 2
    }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    petals.forEach((p) => place(p, false))
    window.addEventListener('resize', resize)

    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      ctx.clearRect(0, 0, w, h)
      for (const p of petals) {
        p.y += p.vy * dt
        p.x += p.vx * dt + Math.sin(p.a) * 12 * dt
        p.a += p.spin * dt
        if (p.y - p.r > h) place(p, true)
        if (p.x < -30) p.x = w + 20
        if (p.x > w + 30) p.x = -20
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.a)
        ctx.globalAlpha = 0.72
        ctx.fillStyle = p.tint
        ctx.beginPath()
        ctx.ellipse(0, 0, p.r * 0.56, p.r, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="md-root">
      <button
        type="button"
        className="md-sun"
        aria-label="El sol"
        onClick={() => setSunNote((v) => !v)}
      />
      <div className={`md-sun-note ${sunNote ? 'md-on' : ''}`} aria-hidden={!sunNote}>
        spoiler chiquito: el ramo de verdad ya está encargado 🌻
      </div>

      <div className="md-cloud" style={{ '--ch': '34px', '--cd': '64s', '--cdelay': '0s', top: '12vh' } as CSSProperties} />
      <div className="md-cloud" style={{ '--ch': '22px', '--cd': '92s', '--cdelay': '-30s', top: '26vh' } as CSSProperties} />
      <div className="md-cloud" style={{ '--ch': '44px', '--cd': '120s', '--cdelay': '-70s', top: '5vh' } as CSSProperties} />

      <canvas ref={canvasRef} className="md-petals" aria-hidden="true" />

      <div className="md-scene">
        <header className="md-hero">
          <p className="md-eyebrow">para mi darling</p>
          <h1 className="md-title">my darling</h1>
          <p className="md-lead">
            Sembré un jardín que no se marchita. Tarda un rato en abrir; vale la pena esperarlo.
          </p>
          <p className="md-cue">seguí bajando ↓</p>
        </header>

        {/* ---- el campo que florece ---- */}
        <div className="md-field" key={season}>
          <div className="md-ground" />

          {field.map((f, i) => (
            <div
              key={i}
              className="md-flower"
              style={
                {
                  '--x': `${f.x}%`,
                  '--w': `${f.w}px`,
                  '--b': `${f.b}%`,
                  '--d': `${f.delay.toFixed(2)}s`,
                  '--sw': `${f.sway.toFixed(2)}s`,
                } as CSSProperties
              }
            >
              <div className="md-sway">
                <Flower id={`fl${season}-${i}`} petals={f.petals} bend={f.bend} tone={f.tone} />
              </div>
            </div>
          ))}

          <div className="md-fly" style={{ '--fb': '52%', '--fd': '21s', '--fdelay': '9s' } as CSSProperties}>
            <Butterfly tint="#ffb1c8" />
          </div>
          <div className="md-fly" style={{ '--fb': '66%', '--fd': '27s', '--fdelay': '15s' } as CSSProperties}>
            <Butterfly tint="#ffe58a" />
          </div>

          <div className="md-cat-walk">
            <div className="md-bounce">
              <Kitten id={`cat${season}`} />
            </div>
          </div>
        </div>

        <div className="md-wrap">
          {/* ---- el poema ---- */}
          <section className="md-sec" id="poema">
            <div className="md-card">
              <span className="md-sec-label">lo que quería decirte</span>
              <h2 className="md-h2">Once líneas, escritas despacio</h2>
              <div className="md-poem">
                {POEM.map(([ini, rest], i) => (
                  <span key={i}>
                    <span className="md-ini">{ini}</span>
                    {rest}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ---- rincón Adopt Me ---- */}
          <section className="md-sec" id="rincon">
            <div className="md-card">
              <span className="md-sec-label">tu rincón</span>
              <h2 className="md-h2">Te conseguí un huevo. Tocalo.</h2>
              <p className="md-p">
                Sin rerolls, sin trades raros, sin gente ofreciéndote un pet común por tu legendaria.
                Acá todo sale legendario a la primera.
              </p>

              <div className="md-egg-row">
                <div>
                  <button
                    type="button"
                    className={`md-egg ${hatched ? 'md-open' : 'md-idle'}`}
                    onClick={() => setHatched(true)}
                    aria-label={hatched ? 'El huevo ya eclosionó' : 'Abrir el huevo'}
                  >
                    <Egg id="egg" />
                  </button>
                  <p className="md-egg-hint">{hatched ? '¡legendaria!' : 'tocá el huevo'}</p>
                </div>

                <p className={`md-hatch-note ${hatched ? 'md-on' : ''}`}>
                  {hatched ? (
                    <>
                      Salió una gatita neón amarilla.
                      <br />
                      Igual que vos: rarísima, brillante, y no la cambio por nada.
                    </>
                  ) : (
                    <>
                      ¿Qué habrá adentro?
                      <br />
                      Hay una sola forma de averiguarlo.
                    </>
                  )}
                </p>
              </div>

              <div className="md-pets">
                {PETS.map((p) => (
                  <div className="md-pet" key={p.name}>
                    {p.art === 'cat' && <Kitten id={`pet-${p.art}`} />}
                    {p.art === 'bee' && <Bee />}
                    {p.art === 'flower' && <Flower id="pet-flower" petals={12} bend={8} tone={0} />}
                    {p.art === 'egg' && <Egg id="pet-egg" />}
                    <span className="md-pet-name">{p.name}</span>
                    <span className={`md-rar ${p.cls}`}>{p.rar}</span>
                  </div>
                ))}
              </div>

              <div className="md-trade">
                <div className="md-trade-top">
                  <span>Trade</span>
                  <span className="md-trade-badge">pendiente de entrega</span>
                </div>
                <div className="md-trade-body">
                  <div className="md-trade-side">
                    <h3>yo ofrezco</h3>
                    <span className="md-slot">
                      🌻
                      <span>
                        Ramo de girasoles
                        <small>físico · en camino</small>
                      </span>
                    </span>
                    <span className="md-slot">
                      🐈
                      <span>
                        Este jardín
                        <small>infinito · no caduca</small>
                      </span>
                    </span>
                  </div>
                  <div className="md-trade-mid" aria-hidden="true">
                    ⇄
                  </div>
                  <div className="md-trade-side">
                    <h3>vos ofrecés</h3>
                    <span className="md-slot">
                      💛
                      <span>
                        Nada
                        <small>ya me encantás así</small>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---- las fotos ---- */}
          <section className="md-sec" id="fotos">
            <div className="md-card">
              <span className="md-sec-label">nuestras fotos</span>
              <h2 className="md-h2">Este espacio ya es tuyo</h2>
              <p className="md-p">
                Cuatro marcos esperando. En cuanto pongamos las fotos, el jardín queda completo.
              </p>

              <div className="md-photos">
                {PHOTOS.map((p, i) => (
                  <figure
                    className="md-frame"
                    key={p.cap}
                    style={{ '--r': p.r, '--tr': p.tr } as CSSProperties}
                  >
                    <span className="md-tape" aria-hidden="true" />
                    <div className="md-shot">
                      {p.src && (
                        <img
                          src={p.src}
                          alt={p.cap}
                          loading="lazy"
                          onLoad={() => setLoaded((prev) => ({ ...prev, [i]: true }))}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      )}
                      {!(p.src && loaded[i]) && (
                        <span className="md-shot-empty">
                          <CameraMark />
                          aquí va {p.cap}
                        </span>
                      )}
                    </div>
                    <figcaption className="md-frame-cap">{p.cap}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          {/* ---- la carta ---- */}
          <section className="md-letter" id="carta">
            <Flower id="letter-flower" petals={14} bend={0} tone={1} className="md-letter-mark" />
            <p className="md-letter-text">
              Tal vez no pueda darte flores físicas,
              <span className="md-letter-em">pero quiero que sepas que me encantás.</span>
            </p>
            <p className="md-sign">— con todo, para vos</p>
          </section>

          <footer className="md-foot">
            <button type="button" className="md-replay" onClick={() => setSeason((s) => s + 1)}>
              volver a sembrar el jardín
            </button>
            <p className="md-ps">P.D. las letras doradas dicen algo, de arriba hacia abajo.</p>
          </footer>
        </div>
      </div>

      <p className="md-sub" aria-hidden="true">
        sí, también te las voy a dar de verdad
      </p>
    </div>
  )
}
