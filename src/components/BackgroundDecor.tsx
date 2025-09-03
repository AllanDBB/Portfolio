import { Stars } from './Stars'

export function BackgroundDecor(
  { active, scope = 'page', cutoff }: { active?: string; scope?: 'page' | 'section'; cutoff?: 'top' | 'none' }
) {
  // Paletas por sección (toques sutiles y consistentes con la UI)
  const colorBySection: Record<string, [string, string, string?]> = {
    laborales: ['#ff7aa2', '#7ac4ff', '#ffd4e3'],
    tecnologicos: ['#7ac4ff', '#8b5cf6', '#c4b5fd'],
    cientificos: ['#34d399', '#7ac4ff', '#a7f3d0'],
    gastronomia: ['#f59e0b', '#ff7aa2', '#fde68a'],
    voluntariados: ['#22c55e', '#7ac4ff', '#bbf7d0'],
    conferencias: ['#8b5cf6', '#ff7aa2', '#ddd6fe'],
    premios: ['#f59e0b', '#8b5cf6', '#fde68a'],
  }

  const [c1, c2, c3] = active && colorBySection[active]
    ? colorBySection[active]
    : ['#ff7aa2', '#7ac4ff', '#e5e7eb'] // fallback acorde a --accent y --accent-2

  const containerPos = scope === 'page' ? 'fixed' : 'absolute'
  const zIndexClass = scope === 'page' ? '-z-10' : 'z-0'
  const maskStyle = cutoff === 'top'
    ? {
        WebkitMaskImage: 'linear-gradient(to bottom, black 0, black 56vh, rgba(0,0,0,0) 72vh)',
        maskImage: 'linear-gradient(to bottom, black 0, black 56vh, rgba(0,0,0,0) 72vh)',
      } as React.CSSProperties
    : undefined
  return (
      <div
        aria-hidden
        className={`${containerPos} inset-0 ${zIndexClass} pointer-events-none overflow-hidden`}
        style={maskStyle}
      >
        {/* Base oscura con degradado suave */}
        <div
          className="absolute inset-0"
          style={{
          background:
            'radial-gradient(1200px 800px at 15% 10%, #0e1628 0%, rgba(14,22,40,0.90) 38%, rgba(10,15,26,0.88) 60%), linear-gradient(180deg, #060b14 0%, #0c1424 100%)',
          }}
        />

        {/* Estrellas sutiles */}
        <div className="absolute inset-0 opacity-60" style={{ mixBlendMode: 'screen' }}>
          {/* densidad: menor = más estrellas por área */}
          <Stars density={16000} />
        </div>

      {/* Auroras animadas muy sutiles */}
      <div
        className="absolute inset-0 opacity-[0.12] aurora"
        style={{
          background: `radial-gradient(35% 55% at 20% 30%, ${c1}33 0%, transparent 60%), radial-gradient(40% 60% at 80% 20%, ${c2}33 0%, transparent 60%), radial-gradient(50% 70% at 60% 80%, ${c3 || '#ffffff'}33 0%, transparent 70%)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Luz central sutil para mantener legibilidad en títulos */}
      {/* Glow central retirado para reducir el blur general */}

      {/* Burbujas de color por sección */}
      <div
        className="absolute -top-16 right-[-10rem] w-[42rem] h-[42rem] rounded-full opacity-[0.12] blur-xl drift-slow"
        style={{
          background: `radial-gradient(55% 55% at 50% 50%, ${c1} 0%, rgba(0,0,0,0) 70%)`,
        }}
      />
      <div
        className="absolute bottom-[-14rem] left-[6%] w-[48rem] h-[48rem] rounded-full opacity-[0.10] blur-xl drift-medium"
        style={{
          background: `radial-gradient(60% 60% at 50% 50%, ${c2} 0%, rgba(0,0,0,0) 70%)`,
        }}
      />
      {/* Tercera burbuja eliminada para simplificar */}

      {/* Sutil malla gradiente (ultra baja opacidad) */}
      <div
        className="absolute inset-[-20%] opacity-[0.02] rotate-slower"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${c1}, ${c2}, ${c3 || '#ffffff'}, ${c1})`,
          filter: 'blur(40px)',
        }}
      />
    </div>
  )
}
