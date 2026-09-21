import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import Pet3D from './Pet3D'
import './my-darling.css'

const FONTS =
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700&family=Caveat:wght@500;700&display=swap'

/** Con semilla, para que el campo salga igual en el servidor y en el cliente. */
function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Kind = 'tulipan' | 'narciso' | 'margarita' | 'ranunculo' | 'mimosa'

const KINDS: Kind[] = [
  'tulipan',
  'tulipan',
  'tulipan',
  'narciso',
  'narciso',
  'narciso',
  'margarita',
  'margarita',
  'ranunculo',
  'ranunculo',
  'mimosa',
]

type Bloom = {
  x: number
  w: number
  b: number
  delay: number
  sway: number
  kind: Kind
  bend: number
  tone: number
}

function growField(seed: number): Bloom[] {
  const rnd = seeded(seed)
  return Array.from({ length: 38 }, (_, i) => {
    const x = (i / 37) * 106 - 5 + (rnd() - 0.5) * 3
    const kind = KINDS[Math.floor(rnd() * KINDS.length)]
    return {
      x,
      w: (kind === 'mimosa' ? 40 : 46) + rnd() * 74,
      b: rnd() * 27,
      delay: ((x + 5) / 111) * 14.5 + rnd() * 2.4,
      sway: 4.2 + rnd() * 3.8,
      kind,
      bend: (rnd() - 0.5) * 22,
      tone: Math.floor(rnd() * 4),
    }
  })
}

const TONES = [
  ['#fff7d2', '#ffe873', '#eab814'],
  ['#ffe9a0', '#ffd23f', '#e09a0c'],
  ['#fff6cf', '#ffe17a', '#d9a316'],
  ['#ffeda8', '#ffc93f', '#d4890a'],
]

const GREENS = ['#7cc96d', '#5fae5f', '#8fd977', '#63b86b']

function ring(n: number, from = 0) {
  return Array.from({ length: n }, (_, i) => from + (360 / n) * i)
}

function Leaf({ fill, vein, transform }: { fill: string; vein: string; transform: string }) {
  return (
    <g transform={transform}>
      <path d="M0 0 C16 -13 40 -9 54 5 C37 20 12 17 0 0 Z" fill={fill} />
      <path d="M3 2 C19 2 39 5 52 7" fill="none" stroke={vein} strokeWidth="1.7" strokeLinecap="round" opacity="0.45" />
      <path d="M14 -3 L20 4 M26 -5 L31 5 M38 -4 L41 6" stroke={vein} strokeWidth="1.1" strokeLinecap="round" opacity="0.3" />
    </g>
  )
}

function Flower({
  id,
  kind,
  bend,
  tone,
  className = '',
}: {
  id: string
  kind: Kind
  bend: number
  tone: number
  className?: string
}) {
  const [hi, mid, low] = TONES[tone % TONES.length]
  const leaf = GREENS[tone % GREENS.length]
  const stem = `M0 0 C ${bend} 54, ${-bend} 110, ${bend * 0.35} 158`

  return (
    <svg viewBox="-70 -72 140 232" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-p`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={hi} />
          <stop offset="62%" stopColor={mid} />
          <stop offset="100%" stopColor={low} />
        </linearGradient>
        <linearGradient id={`${id}-q`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#fffdf2" />
          <stop offset="58%" stopColor={hi} />
          <stop offset="100%" stopColor={mid} />
        </linearGradient>
        <radialGradient id={`${id}-c`} cx="38%" cy="34%">
          <stop offset="0%" stopColor={hi} />
          <stop offset="100%" stopColor={low} />
        </radialGradient>
      </defs>

      <path d={stem} fill="none" stroke={leaf} strokeWidth="5.2" strokeLinecap="round" />

      {kind === 'tulipan' ? (
        <>
          <path d="M1 44 C-28 54 -34 96 -7 112 C-17 88 -11 62 1 44 Z" fill={leaf} />
          <path d="M0 50 C-14 66 -16 92 -7 110" fill="none" stroke={low} strokeWidth="1.6" strokeLinecap="round" opacity="0.3" />
          <path d="M-1 66 C28 76 33 112 8 126 C17 104 11 82 -1 66 Z" fill={GREENS[(tone + 1) % GREENS.length]} />
          <path d="M0 72 C14 88 16 110 8 124" fill="none" stroke={low} strokeWidth="1.6" strokeLinecap="round" opacity="0.3" />
        </>
      ) : kind === 'mimosa' ? (
        <>
          {[28, 52, 76, 100].map((y, i) => (
            <g key={y}>
              <ellipse cx={-17} cy={y} rx="16" ry="4.2" fill={leaf} transform={`rotate(-18 -17 ${y})`} opacity={0.95 - i * 0.07} />
              <ellipse cx={17} cy={y + 12} rx="16" ry="4.2" fill={leaf} transform={`rotate(18 17 ${y + 12})`} opacity={0.95 - i * 0.07} />
            </g>
          ))}
        </>
      ) : (
        <>
          <Leaf fill={leaf} vein={low} transform="translate(-2 66) rotate(155) scale(0.92)" />
          <Leaf fill={GREENS[(tone + 1) % GREENS.length]} vein={low} transform="translate(2 104) rotate(24) scale(0.82)" />
        </>
      )}

      <g className="md-head">
        {kind === 'tulipan' && (
          <>
            <path
              d="M0 10 C-21 3 -27 -26 -18 -50 C-12 -31 -6 -20 0 -14 Z"
              fill={`url(#${id}-p)`}
              stroke={low}
              strokeWidth="1.2"
            />
            <path
              d="M0 10 C21 3 27 -26 18 -50 C12 -31 6 -20 0 -14 Z"
              fill={`url(#${id}-p)`}
              stroke={low}
              strokeWidth="1.2"
            />
            <path
              d="M0 10 C-14 1 -16 -31 0 -54 C16 -31 14 1 0 10 Z"
              fill={`url(#${id}-q)`}
              stroke={low}
              strokeWidth="1.2"
            />
            <path
              d="M0 4 C-5 -14 -5 -34 0 -48 M-8 2 C-11 -12 -11 -28 -7 -40 M8 2 C11 -12 11 -28 7 -40"
              fill="none"
              stroke={low}
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.28"
            />
          </>
        )}

        {kind === 'narciso' && (
          <>
            {ring(6).map((a) => (
              <ellipse
                key={a}
                cx="0"
                cy="-29"
                rx="14"
                ry="27"
                fill={`url(#${id}-p)`}
                stroke={low}
                strokeWidth="1.1"
                transform={`rotate(${a})`}
              />
            ))}
            {ring(6).map((a) => (
              <path
                key={`v${a}`}
                d="M0 -18 L0 -50"
                stroke={low}
                strokeWidth="1.1"
                strokeLinecap="round"
                opacity="0.32"
                transform={`rotate(${a})`}
              />
            ))}
            <circle r="14.5" fill={`url(#${id}-c)`} />
            <circle r="14.5" fill="none" stroke={low} strokeWidth="2.6" />
            <circle r="8" fill={low} opacity="0.45" />
          </>
        )}

        {kind === 'margarita' && (
          <>
            {ring(16).map((a) => (
              <ellipse
                key={a}
                cx="0"
                cy="-29"
                rx="4.6"
                ry="28"
                fill={`url(#${id}-q)`}
                stroke={low}
                strokeWidth="0.8"
                transform={`rotate(${a})`}
              />
            ))}
            <circle r="10.5" fill={`url(#${id}-c)`} />
          </>
        )}

        {kind === 'ranunculo' && (
          <>
            {ring(9).map((a) => (
              <ellipse
                key={`o${a}`}
                cx="0"
                cy="-20"
                rx="13"
                ry="19"
                fill={`url(#${id}-p)`}
                stroke={low}
                strokeWidth="1"
                transform={`rotate(${a})`}
              />
            ))}
            {ring(7, 22).map((a) => (
              <ellipse
                key={`i${a}`}
                cx="0"
                cy="-12"
                rx="9"
                ry="13"
                fill={`url(#${id}-q)`}
                stroke={low}
                strokeWidth="0.8"
                transform={`rotate(${a})`}
              />
            ))}
            <circle r="5.5" fill={low} opacity="0.8" />
          </>
        )}

        {kind === 'mimosa' &&
          [
            [0, -54, 7],
            [-15, -43, 8],
            [15, -43, 8],
            [-29, -29, 7],
            [0, -31, 8.5],
            [29, -29, 7],
            [-16, -17, 7.5],
            [16, -17, 7.5],
            [0, -8, 7],
            [-31, -11, 6],
            [31, -11, 6],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill={i % 3 === 0 ? hi : mid}
              stroke={low}
              strokeWidth="0.8"
            />
          ))}
      </g>
    </svg>
  )
}

function Kitten({ id }: { id: string }) {
  const coat = `url(#${id}-coat)`
  const far = '#9f958a'
  const belly = '#faf6ee'
  const line = '#7d7266'
  const inner = '#dfb0b2'
  const stripe = '#8d8375'
  const nose = '#cf9096'

  return (
    <svg viewBox="0 0 224 172" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-coat`} x1="0.25" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#f1ebe1" />
          <stop offset="46%" stopColor="#d6cec1" />
          <stop offset="100%" stopColor="#a89e91" />
        </linearGradient>
        <linearGradient id={`${id}-iris`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9e9c6" />
          <stop offset="55%" stopColor="#9cc08d" />
          <stop offset="100%" stopColor="#5b8a5c" />
        </linearGradient>
        <linearGradient id={`${id}-tail`} x1="0.9" y1="1" x2="0.1" y2="0">
          <stop offset="0%" stopColor="#b3a99c" />
          <stop offset="55%" stopColor="#cdc5b8" />
          <stop offset="100%" stopColor="#7f7568" />
        </linearGradient>
        <radialGradient id={`${id}-cheek`} cx="50%" cy="45%">
          <stop offset="0%" stopColor={belly} />
          <stop offset="100%" stopColor={belly} stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-body`}>
          <path d="M52 106 C50 86 62 74 84 70 C108 66 134 69 148 78 C162 87 166 104 158 118 C148 134 120 140 94 138 C68 136 55 126 52 106 Z" />
        </clipPath>
      </defs>

      <ellipse cx="112" cy="160" rx="72" ry="8" fill={line} opacity="0.16" />

      <path
        d="M58 112 C34 122 14 110 12 84 C11 66 22 54 36 55"
        fill="none"
        stroke={far}
        strokeWidth="15"
        strokeLinecap="round"
      />
      <path
        d="M58 112 C36 121 18 110 16 85 C15 69 24 58 34 57"
        fill="none"
        stroke={`url(#${id}-tail)`}
        strokeWidth="11"
        strokeLinecap="round"
      />

      <path
        d="M45 112 L49 122 M27 107 L31 117 M13 95 L23 97 M13 77 L23 77"
        stroke={stripe}
        strokeWidth="3.6"
        strokeLinecap="round"
        opacity="0.32"
      />
      <path d="M64 126 C58 140 60 154 66 158 C74 161 82 157 81 149 C80 139 76 130 74 124 Z" fill={far} />
      <ellipse cx="73" cy="158" rx="8.5" ry="4.6" fill={belly} opacity="0.75" />
      <path d="M132 124 C128 138 131 151 137 155 C145 158 153 154 152 146 C151 137 146 128 143 122 Z" fill={far} />
      <ellipse cx="144" cy="155" rx="8.5" ry="4.6" fill={belly} opacity="0.75" />

      <path
        d="M52 106 C50 86 62 74 84 70 C108 66 134 69 148 78 C162 87 166 104 158 118 C148 134 120 140 94 138 C68 136 55 126 52 106 Z"
        fill={coat}
        stroke={line}
        strokeWidth="2"
        strokeOpacity="0.32"
      />

      <g clipPath={`url(#${id}-body)`}>
        <path d="M60 130 C86 146 136 146 162 128 L166 142 L54 144 Z" fill={belly} opacity="0.85" />
        <path d="M50 86 C82 74 122 72 156 82" fill="none" stroke={stripe} strokeWidth="5.5" strokeLinecap="round" opacity="0.34" />
        <path d="M70 70 C76 86 76 102 70 118" fill="none" stroke={stripe} strokeWidth="5" strokeLinecap="round" opacity="0.42" />
        <path d="M86 65 C92 83 92 101 86 119" fill="none" stroke={stripe} strokeWidth="5.4" strokeLinecap="round" opacity="0.42" />
        <path d="M102 63 C108 82 108 101 102 119" fill="none" stroke={stripe} strokeWidth="5" strokeLinecap="round" opacity="0.38" />
        <path d="M118 64 C124 82 124 100 118 117" fill="none" stroke={stripe} strokeWidth="4.5" strokeLinecap="round" opacity="0.34" />
        <path d="M134 67 C139 83 139 99 134 114" fill="none" stroke={stripe} strokeWidth="4" strokeLinecap="round" opacity="0.3" />
        <path d="M147 72 C151 85 151 97 147 110" fill="none" stroke={stripe} strokeWidth="3.4" strokeLinecap="round" opacity="0.26" />
      </g>

      <path
        d="M94 128 C88 142 90 156 96 160 C104 163 113 159 112 151 C111 141 106 132 104 126 Z"
        fill={coat}
        stroke={line}
        strokeWidth="1.8"
        strokeOpacity="0.28"
      />
      <path
        d="M154 126 C150 141 153 155 159 159 C167 162 176 158 175 150 C174 140 169 131 166 124 Z"
        fill={coat}
        stroke={line}
        strokeWidth="1.8"
        strokeOpacity="0.28"
      />
      <path
        d="M96 138 L110 137 M95 147 L111 146 M156 136 L173 135 M156 145 L174 144"
        stroke={stripe}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.28"
      />
      <ellipse cx="104" cy="159" rx="9" ry="5" fill={belly} />
      <ellipse cx="167" cy="158" rx="9" ry="5" fill={belly} />

      <path d="M128 48 C122 30 124 16 131 14 C140 12 151 26 157 40 Z" fill={coat} stroke={line} strokeWidth="2" strokeLinejoin="round" />
      <path d="M133 42 C129 30 130 22 134 21 C139 21 145 30 148 39 Z" fill={inner} />
      <path d="M192 46 C199 28 198 15 191 13 C182 12 171 25 166 38 Z" fill={coat} stroke={line} strokeWidth="2" strokeLinejoin="round" />
      <path d="M187 41 C191 29 190 21 186 20 C181 20 176 29 173 38 Z" fill={inner} />

      <path
        d="M160 30 C186 30 202 48 202 72 C202 96 185 112 160 112 C135 112 118 96 118 72 C118 48 134 30 160 30 Z"
        fill={coat}
        stroke={line}
        strokeWidth="2"
        strokeOpacity="0.5"
      />
      <ellipse cx="160" cy="92" rx="26" ry="18" fill={`url(#${id}-cheek)`} />
      <path
        d="M144 52 C146 43 148 39 150 34 M160 49 C160 41 160 36 160 31 M176 52 C174 43 172 39 170 34"
        fill="none"
        stroke={stripe}
        strokeWidth="3.6"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M128 64 C123 60 120 57 118 53 M127 75 C121 74 117 72 114 70 M192 64 C197 60 200 57 202 53 M193 75 C199 74 203 72 206 70"
        fill="none"
        stroke={stripe}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.3"
      />

      <ellipse cx="129" cy="86" rx="9.5" ry="5.2" fill="#f0a8ae" opacity="0.42" />
      <ellipse cx="191" cy="86" rx="9.5" ry="5.2" fill="#f0a8ae" opacity="0.42" />

      <g>
        <ellipse cx="142" cy="69" rx="11.8" ry="12.8" fill="#fffdf6" stroke={line} strokeWidth="1.6" strokeOpacity="0.4" />
        <circle cx="142" cy="70" r="9.6" fill={`url(#${id}-iris)`} />
        <ellipse cx="142" cy="70" rx="3.4" ry="8.2" fill="#2a1d12" />
        <circle cx="138.3" cy="65.4" r="3.1" fill="#fff" opacity="0.95" />
        <circle cx="145.6" cy="74.4" r="1.8" fill="#fff" opacity="0.75" />
      </g>
      <g>
        <ellipse cx="178" cy="69" rx="11.8" ry="12.8" fill="#fffdf6" stroke={line} strokeWidth="1.6" strokeOpacity="0.4" />
        <circle cx="178" cy="70" r="9.6" fill={`url(#${id}-iris)`} />
        <ellipse cx="178" cy="70" rx="3.4" ry="8.2" fill="#2a1d12" />
        <circle cx="174.3" cy="65.4" r="3.1" fill="#fff" opacity="0.95" />
        <circle cx="181.6" cy="74.4" r="1.8" fill="#fff" opacity="0.75" />
      </g>

      <path d="M154 86 L166 86 C166 92 162 95 160 95 C158 95 154 92 154 86 Z" fill={nose} stroke={line} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M160 95 C160 100 155 103 150 100 M160 95 C160 100 165 103 170 100" fill="none" stroke={line} strokeWidth="2.2" strokeLinecap="round" />

      <path
        d="M136 84 L108 76 M136 90 L107 90 M137 96 L110 104 M184 84 L212 76 M184 90 L213 90 M183 96 L210 104"
        stroke={line}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}

function Butterfly({ tint, dark }: { tint: string; dark: string }) {
  return (
    <svg viewBox="0 0 52 40" aria-hidden="true">
      <g className="md-wing">
        <path d="M25 20 C14 2 2 2 3 12 C1 20 6 26 13 25 C8 30 12 36 18 34 C22 32 24 27 25 22 Z" fill={tint} />
        <path d="M25 20 C17 8 8 6 6 11 C5 16 11 22 18 22 Z" fill={dark} opacity="0.55" />
        <circle cx="10" cy="12" r="2.2" fill="#fffdf2" opacity="0.9" />
        <circle cx="14" cy="29" r="1.6" fill="#fffdf2" opacity="0.8" />
        <path d="M25 20 C18 14 11 10 5 10 M25 20 C18 22 12 26 10 31" fill="none" stroke={dark} strokeWidth="0.7" opacity="0.6" />
      </g>
      <g className="md-wing md-wing-r">
        <path d="M27 20 C38 2 50 2 49 12 C51 20 46 26 39 25 C44 30 40 36 34 34 C30 32 28 27 27 22 Z" fill={tint} />
        <path d="M27 20 C35 8 44 6 46 11 C47 16 41 22 34 22 Z" fill={dark} opacity="0.55" />
        <circle cx="42" cy="12" r="2.2" fill="#fffdf2" opacity="0.9" />
        <circle cx="38" cy="29" r="1.6" fill="#fffdf2" opacity="0.8" />
        <path d="M27 20 C34 14 41 10 47 10 M27 20 C34 22 40 26 42 31" fill="none" stroke={dark} strokeWidth="0.7" opacity="0.6" />
      </g>
      <path d="M26 10 C28.4 10 29.4 14 29.4 20 C29.4 27 28.2 32 26 32 C23.8 32 22.6 27 22.6 20 C22.6 14 23.6 10 26 10 Z" fill="#5a4021" />
      <circle cx="26" cy="11" r="3" fill="#48331a" />
      <path d="M25 9 C22 5 20 3 18 2.6 M27 9 C30 5 32 3 34 2.6" fill="none" stroke="#5a4021" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="17.6" cy="2.2" r="1.3" fill="#5a4021" />
      <circle cx="34.4" cy="2.2" r="1.3" fill="#5a4021" />
    </svg>
  )
}

function Bee() {
  return (
    <svg viewBox="0 0 72 56" aria-hidden="true">
      <defs>
        <linearGradient id="bee-wing" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#cfe6f2" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="bee-body" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#ffe373" />
          <stop offset="60%" stopColor="#f6c026" />
          <stop offset="100%" stopColor="#d79408" />
        </linearGradient>
        <clipPath id="bee-abd">
          <ellipse cx="38" cy="32" rx="21" ry="15" transform="rotate(-8 38 32)" />
        </clipPath>
      </defs>

      <path d="M30 20 C22 4 8 2 7 9 C6 16 17 23 29 23 Z" fill="url(#bee-wing)" stroke="#a9c7d6" strokeWidth="0.7" />
      <path d="M34 20 C34 5 48 0 52 6 C56 12 47 22 35 23 Z" fill="url(#bee-wing)" stroke="#a9c7d6" strokeWidth="0.7" />
      <path d="M29 22 C22 14 14 9 9 9 M34 22 C38 13 45 7 51 7" fill="none" stroke="#a9c7d6" strokeWidth="0.6" opacity="0.8" />

      <path d="M20 40 L14 50 M27 44 L24 53 M36 45 L36 54" stroke="#4a3520" strokeWidth="2" strokeLinecap="round" />

      <ellipse cx="38" cy="32" rx="21" ry="15" transform="rotate(-8 38 32)" fill="url(#bee-body)" />
      <g clipPath="url(#bee-abd)">
        <path d="M34 12 L27 52 L35 52 L42 12 Z" fill="#4a3520" />
        <path d="M48 12 L41 52 L48 52 L55 12 Z" fill="#4a3520" />
        <path d="M60 14 L54 52 L60 52 L66 14 Z" fill="#4a3520" />
        <ellipse cx="34" cy="24" rx="13" ry="5" fill="#fff8d8" opacity="0.3" />
      </g>
      <path d="M58 40 C63 43 66 45 68 48" fill="none" stroke="#4a3520" strokeWidth="2.4" strokeLinecap="round" />

      <ellipse cx="20" cy="29" rx="13" ry="12" fill="#f0b81c" />
      <path
        d="M9 22 L6 19 M8 27 L4 26 M9 33 L5 35 M13 38 L11 42 M19 41 L19 45 M26 39 L28 43"
        stroke="#f0b81c"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="12" cy="26" r="7.5" fill="#3a2a16" />
      <circle cx="10" cy="23.5" r="2.4" fill="#fff" opacity="0.85" />
      <path d="M11 18 C8 12 6 9 3 8 M17 17 C16 11 15 8 13 6" fill="none" stroke="#3a2a16" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="2.6" cy="7.4" r="1.8" fill="#3a2a16" />
      <circle cx="12.6" cy="5.4" r="1.8" fill="#3a2a16" />
    </svg>
  )
}

function Egg({ id }: { id: string }) {
  const speckles = [
    [52, 58, 5],
    [88, 44, 3.4],
    [42, 96, 4.2],
    [96, 112, 5.4],
    [66, 128, 3.6],
    [104, 76, 3],
    [58, 40, 2.6],
    [82, 138, 4],
  ]

  return (
    <svg viewBox="0 0 140 176" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-shell`} cx="36%" cy="28%">
          <stop offset="0%" stopColor="#fffdf6" />
          <stop offset="52%" stopColor="#ffeccb" />
          <stop offset="100%" stopColor="#f0bd92" />
        </radialGradient>
        <linearGradient id={`${id}-inner`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c98a63" />
          <stop offset="100%" stopColor="#8f5a3c" />
        </linearGradient>
        <clipPath id={`${id}-top`}>
          <path d="M26 88 C26 46 46 20 70 20 C94 20 114 46 114 88 L104 80 L94 90 L84 80 L74 90 L64 80 L54 90 L44 80 L34 90 Z" />
        </clipPath>
        <clipPath id={`${id}-bot`}>
          <path d="M26 88 L34 90 L44 80 L54 90 L64 80 L74 90 L84 80 L94 90 L104 80 L114 88 C114 126 96 152 70 152 C44 152 26 126 26 88 Z" />
        </clipPath>
      </defs>

      <ellipse cx="70" cy="164" rx="42" ry="8" fill="#4f9e54" opacity="0.3" />

      <g className="md-egg-shell">
        <g className="md-egg-bot">
          <path
            d="M26 88 L34 90 L44 80 L54 90 L64 80 L74 90 L84 80 L94 90 L104 80 L114 88 C114 126 96 152 70 152 C44 152 26 126 26 88 Z"
            fill={`url(#${id}-shell)`}
          />
          <g clipPath={`url(#${id}-bot)`}>
            <path d="M26 86 C46 100 94 100 114 86 L114 76 L26 76 Z" fill={`url(#${id}-inner)`} opacity="0.35" />
            {speckles
              .filter(([, cy]) => cy > 92)
              .map(([cx, cy, r], i) => (
                <circle key={i} cx={cx} cy={cy} r={r} fill="#d99a6b" opacity="0.45" />
              ))}
            <ellipse cx="46" cy="118" rx="14" ry="22" fill="#fffdf6" opacity="0.4" />
          </g>
          <path
            d="M26 88 L34 90 L44 80 L54 90 L64 80 L74 90 L84 80 L94 90 L104 80 L114 88 C114 126 96 152 70 152 C44 152 26 126 26 88 Z"
            fill="none"
            stroke="#d9a678"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
        </g>

        <g className="md-egg-top">
          <path
            d="M26 88 C26 46 46 20 70 20 C94 20 114 46 114 88 L104 80 L94 90 L84 80 L74 90 L64 80 L54 90 L44 80 L34 90 Z"
            fill={`url(#${id}-shell)`}
          />
          <g clipPath={`url(#${id}-top)`}>
            {speckles
              .filter(([, cy]) => cy <= 92)
              .map(([cx, cy, r], i) => (
                <circle key={i} cx={cx} cy={cy} r={r} fill="#d99a6b" opacity="0.45" />
              ))}
            <ellipse cx="50" cy="46" rx="15" ry="20" fill="#fffdf6" opacity="0.55" transform="rotate(-24 50 46)" />
          </g>
          <path
            d="M26 88 C26 46 46 20 70 20 C94 20 114 46 114 88 L104 80 L94 90 L84 80 L74 90 L64 80 L54 90 L44 80 L34 90 Z"
            fill="none"
            stroke="#d9a678"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
        </g>
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

const POEM: Array<[string, string]> = [
  ['S', 'iempre que pienso en ti'],
  ['I', 'magino tu risa antes que nada,'],
  ['T', 'an clara que el día se arregla solo.'],
  ['E', 's por eso que junté pétalos'],
  ['L', 'ejos de cualquier floristería,'],
  ['A', ' mano, uno por uno,'],
  ['S', 'abiendo que ninguno se va a marchitar.'],
  ['D', 'eja que este jardín te cuide'],
  ['A', ' cualquier hora que lo abras,'],
  ['R', 'ecordándote una sola cosa,'],
  ['E', 'sa que ya sabes.'],
]

const PETS = [
  { name: 'Gatita Plateada', rar: 'Legendary', cls: 'md-legend', art: 'cat' },
  { name: 'Abeja Curiosa', rar: 'Ultra-Rare', cls: 'md-ultra', art: 'bee' },
  { name: 'Tulipán Eterno', rar: 'Rare', cls: 'md-rare', art: 'flower' },
  { name: 'Huevo Sorpresa', rar: 'Common', cls: 'md-common', art: 'egg' },
] as const

/** `pos` es el object-position: el marco recorta a cuadrado. */
const PHOTOS: Array<{ src: string | null; cap: string; pos: string; r: string; tr: string }> = [
  { src: '/my-darling/tu.jpeg', cap: 'tú', pos: '50% 0%', r: '-2.6deg', tr: '3deg' },
  { src: '/my-darling/nosotros.jpeg', cap: 'nosotros', pos: '42% 50%', r: '1.8deg', tr: '-4deg' },
  { src: '/my-darling/ese-dia.jpeg', cap: 'ese día', pos: '50% 50%', r: '-1.2deg', tr: '5deg' },
  { src: '/my-darling/mifav.jpeg', cap: 'la que más me gusta', pos: '88% 50%', r: '2.4deg', tr: '-2deg' },
]

export default function MyDarling() {
  const [season, setSeason] = useState(0)
  const [hatched, setHatched] = useState(false)
  const [sunNote, setSunNote] = useState(false)
  const [petReady, setPetReady] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const field = useMemo(() => growField(20260921 + season), [season])

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
        spoiler chiquito: el ramo de verdad ya está encargado 🌼
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
          <p className="md-cue">sigue bajando ↓</p>
        </header>

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
                <Flower id={`fl${season}-${i}`} kind={f.kind} bend={f.bend} tone={f.tone} />
              </div>
            </div>
          ))}

          <div className="md-fly" style={{ '--fb': '52%', '--fd': '21s', '--fdelay': '9s' } as CSSProperties}>
            <Butterfly tint="#ffc2d6" dark="#d9738f" />
          </div>
          <div className="md-fly" style={{ '--fb': '66%', '--fd': '27s', '--fdelay': '15s' } as CSSProperties}>
            <Butterfly tint="#ffe58a" dark="#d99a0c" />
          </div>

          <div className="md-cat-walk">
            <div className="md-bounce">
              <Kitten id={`cat${season}`} />
            </div>
          </div>
        </div>

        <div className="md-wrap">
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

          <section className="md-sec" id="rincon">
            <div className="md-card">
              <span className="md-sec-label">tu rincón</span>
              <h2 className="md-h2">Te conseguí un huevo. Tócalo.</h2>
              <p className="md-p">
                Sin rerolls, sin trades raros, sin gente ofreciéndote un pet común por tu legendaria.
                Acá todo sale legendario a la primera.
              </p>

              <div className="md-egg-row">
                <div>
                  <div className="md-hatch">
                    <button
                      type="button"
                      className={`md-egg ${hatched ? 'md-open' : 'md-idle'}`}
                      onClick={() => setHatched(true)}
                      aria-label={hatched ? 'El huevo ya eclosionó' : 'Abrir el huevo'}
                    >
                      <Egg id="egg" />
                    </button>
                    {hatched && (
                      <div className={`md-pet-stage ${petReady ? 'md-on' : ''}`}>
                        <div className="md-pet-fallback">
                          <Kitten id="hatched" />
                        </div>
                        <Pet3D
                          label="Gatita atigrada en 3D. Arrástrala para girarla."
                          onReady={() => setPetReady(true)}
                        />
                      </div>
                    )}
                  </div>
                  <p className="md-egg-hint">
                    {!hatched ? 'toca el huevo' : petReady ? 'arrástrala para girarla' : '¡legendaria!'}
                  </p>
                </div>

                <p className={`md-hatch-note ${hatched ? 'md-on' : ''}`}>
                  {hatched ? (
                    <>
                      Salió atigrada, gris plata, igualita a la que ya conoces.
                      <br />
                      Legendaria, obvio. Y no la cambio por nada.
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
                    {p.art === 'flower' && <Flower id="pet-flower" kind="tulipan" bend={6} tone={1} />}
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
                      🌼
                      <span>
                        Ramo de flores amarillas
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
                    <h3>tú ofreces</h3>
                    <span className="md-slot">
                      💛
                      <span>
                        Nada
                        <small>ya me encantas así</small>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="md-sec" id="fotos">
            <div className="md-card">
              <span className="md-sec-label">nuestras fotos</span>
              <h2 className="md-h2">Este espacio ya es tuyo</h2>
              <p className="md-p">
                Cuatro que me gusta tener a mano. Con estas, el jardín ya está completo.
              </p>

              <div className="md-photos">
                {PHOTOS.map((p) => (
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
                          decoding="async"
                          style={{ objectPosition: p.pos }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      )}
                      {!p.src && (
                        <span className="md-shot-empty">
                          <CameraMark />
                          tu foto aquí
                        </span>
                      )}
                    </div>
                    <figcaption className="md-frame-cap">{p.cap}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <section className="md-letter" id="carta">
            <Flower id="letter-flower" kind="narciso" bend={0} tone={1} className="md-letter-mark" />
            <p className="md-letter-text">
              Tal vez no pueda darte flores físicas,
              <span className="md-letter-em">pero quiero que sepas que me encantas.</span>
            </p>
            <p className="md-sign">— con todo, para ti</p>
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
