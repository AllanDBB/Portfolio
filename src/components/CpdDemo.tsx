import { useMemo, useState } from 'react'
import { useI18n } from '../i18n'

/**
 * A pocket version of the paper: one series with a known change point,
 * a noise slider, and a real two-sided CUSUM running on it. Turn the
 * noise up and watch the detection delay (and the false alarms) grow.
 */

const N = 240
const TAU = 132
const SHIFT = 1.2

/** Deterministic standard normals (mulberry32 + Box–Muller). */
function normals(seed: number, n: number) {
  let a = seed >>> 0
  const rand = () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const out = new Float64Array(n)
  for (let i = 0; i < n; i++) {
    const u = Math.max(rand(), 1e-9)
    out[i] = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand())
  }
  return out
}

const BASE_NOISE = normals(20260915, N)

/** Two-sided CUSUM, restarting after every alarm. Returns alarm indices. */
function cusum(x: Float64Array, k: number, h: number) {
  // Estimate the in-control mean/σ from a warm-up window, as an online detector would.
  const warm = 40
  let mu = 0
  for (let i = 0; i < warm; i++) mu += x[i]
  mu /= warm
  let v = 0
  for (let i = 0; i < warm; i++) v += (x[i] - mu) ** 2
  const sd = Math.sqrt(v / (warm - 1)) || 1
  const alarms: number[] = []
  let gp = 0
  let gn = 0
  for (let i = warm; i < x.length; i++) {
    const z = (x[i] - mu) / sd
    gp = Math.max(0, gp + z - k)
    gn = Math.max(0, gn - z - k)
    if (gp > h || gn > h) {
      alarms.push(i)
      // A real detector would hand off here; the first alarm past τ ends the run.
      if (i >= TAU) break
      gp = 0
      gn = 0
    }
  }
  return alarms
}

export function CpdDemo() {
  const { locale } = useI18n()
  const [sigma, setSigma] = useState(0.45)

  const { alarms, detected, delay, falseAlarms, path, min, max } = useMemo(() => {
    const s = new Float64Array(N)
    for (let i = 0; i < N; i++) s[i] = (i >= TAU ? SHIFT : 0) + BASE_NOISE[i] * sigma + Math.sin(i / 9) * 0.08
    const a = cusum(s, 0.5, 8)
    const hit = a.find((i) => i >= TAU)
    const fa = a.filter((i) => i < TAU).length
    let lo = Infinity
    let hi = -Infinity
    for (const v of s) {
      lo = Math.min(lo, v)
      hi = Math.max(hi, v)
    }
    const pad = (hi - lo) * 0.12
    lo -= pad
    hi += pad
    let d = ''
    for (let i = 0; i < N; i++) {
      const x = (i / (N - 1)) * 600
      const y = 200 - ((s[i] - lo) / (hi - lo)) * 200
      d += `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`
    }
    return { alarms: a, detected: hit, delay: hit !== undefined ? hit - TAU : undefined, falseAlarms: fa, path: d, min: lo, max: hi }
  }, [sigma])

  const xOf = (i: number) => (i / (N - 1)) * 600
  const yOf = (v: number) => 200 - ((v - min) / (max - min)) * 200

  const es = locale === 'es'

  return (
    <div className="rounded-[2px] border border-line bg-elev p-5 md:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="label">{es ? 'Demo en vivo · CUSUM bilateral' : 'Live demo · two-sided CUSUM'}</span>
        <span className="label">k=0.5 · h=8</span>
      </div>

      <svg viewBox="-4 -24 608 246" className="mt-5 w-full overflow-visible" role="img" aria-label={es ? 'Serie temporal con un punto de cambio' : 'Time series with one change point'}>
        {/* Regimes */}
        <rect x={xOf(TAU)} y={-20} width={600 - xOf(TAU)} height={224} fill="var(--c-signal)" opacity="0.06" />
        <line x1={0} x2={xOf(TAU)} y1={yOf(0)} y2={yOf(0)} stroke="var(--c-faint)" strokeDasharray="2 4" />
        <line x1={xOf(TAU)} x2={600} y1={yOf(SHIFT)} y2={yOf(SHIFT)} stroke="var(--c-faint)" strokeDasharray="2 4" />

        <path d={path} fill="none" stroke="var(--c-fg)" strokeWidth="1.1" strokeLinejoin="round" opacity="0.85" />

        {/* True change point */}
        <line x1={xOf(TAU)} x2={xOf(TAU)} y1={-20} y2={204} stroke="var(--c-muted)" strokeWidth="1" />
        <text x={xOf(TAU) - 6} y={-10} textAnchor="end" className="fill-[var(--c-muted)] font-mono text-[10px]">
          τ = {TAU}
        </text>

        {/* Alarms */}
        {alarms.map((i) => {
          const good = i >= TAU && i === detected
          return (
            <g key={i}>
              <line
                x1={xOf(i)}
                x2={xOf(i)}
                y1={-20}
                y2={204}
                stroke={good ? 'var(--c-signal-ink)' : '#ff5a36'}
                strokeWidth={good ? 1.6 : 1}
                strokeDasharray={good ? undefined : '3 3'}
              />
              {good && (
                <text x={xOf(i) + 6} y={214} className="fill-[var(--c-signal-ink)] font-mono text-[10px]">
                  τ̂ = {i}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      <label className="mt-6 block">
        <span className="flex items-baseline justify-between">
          <span className="label">{es ? 'Ruido σ' : 'Noise σ'}</span>
          <span className="font-mono text-xs tabular-nums text-fg">{sigma.toFixed(2)}</span>
        </span>
        <input
          type="range"
          min={0.1}
          max={1.6}
          step={0.01}
          value={sigma}
          onChange={(e) => setSigma(Number(e.target.value))}
          className="mt-3 w-full accent-[var(--c-signal-ink)]"
        />
      </label>

      <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5">
        <Stat label={es ? 'Retardo' : 'Delay'} value={delay !== undefined ? `${delay}` : '—'} unit={es ? 'muestras' : 'samples'} />
        <Stat label={es ? 'Falsas alarmas' : 'False alarms'} value={String(falseAlarms)} warn={falseAlarms > 0} />
        <Stat label="SNR" value={(SHIFT / sigma).toFixed(1)} unit="Δ/σ" />
      </dl>
    </div>
  )
}

function Stat({ label, value, unit, warn }: { label: string; value: string; unit?: string; warn?: boolean }) {
  return (
    <div>
      <dt className="label">{label}</dt>
      <dd className={`display mt-2 text-[2.25rem] tabular-nums ${warn ? 'text-[#ff5a36]' : 'text-fg'}`}>
        {value}
        {unit && <span className="label ml-1.5 align-middle">{unit}</span>}
      </dd>
    </div>
  )
}
