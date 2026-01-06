import { useMemo } from 'react'

interface Props {
  name: string
  about: string
  avatarUrl?: string
  avatars?: string[]
}

export function Hero({ name, about, avatarUrl, avatars }: Props) {
  const images = useMemo(() => {
    const list = (avatars && avatars.length ? avatars : avatarUrl ? [avatarUrl] : []).filter(Boolean) as string[]
    return Array.from(new Set(list))
  }, [avatarUrl, avatars])

  const mainSrc = images.length ? images[0] : undefined
  
  return (
    <header className="w-full">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative shrink-0">
          <div className="size-32 md:size-40 rounded-full overflow-hidden border-2 border-white shadow-lg ring-2 ring-[color:var(--accent)] ring-offset-2 ring-offset-transparent">
            {mainSrc ? (
              <img src={mainSrc} alt={name} className="w-full h-full object-cover object-[center_35%]" />
            ) : (
                <div className="w-full h-full bg-[color:var(--muted)]/10" />
            )}
          </div>
        </div>
        <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
                <h1 className="text-3xl md:text-4xl font-semibold text-[color:var(--text)] tracking-wider">{name}</h1>
            </div>
            {/* Render 'about' with highlighted keywords if possible, otherwise plain text */}
            <div className="text-lg text-[color:var(--muted)] leading-relaxed max-w-2xl">
              <p dangerouslySetInnerHTML={{ 
                __html: about
                  .replace(/Ingeniería en Computación/g, '<strong class="font-semibold text-[color:var(--text)]">Ingeniería en Computación</strong>')
                  .replace(/builder/g, '<span class="px-2 py-0.5 rounded-md bg-[color:var(--accent-light)] text-[color:var(--accent)] font-medium text-base align-middle mx-1">builder</span>')
                  .replace(/sistemas, datos y algoritmos/g, '<strong class="font-semibold text-[color:var(--text)]">sistemas, datos y algoritmos</strong>')
              }} />
            </div>
        </div>
      </div>
    </header>
  )
}
