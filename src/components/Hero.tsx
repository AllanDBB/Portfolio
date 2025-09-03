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
  const next1 = images.length > 1 ? images[1] : undefined
  const next2 = images.length > 2 ? images[2] : undefined
  return (
    <header className="w-full">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="size-32 md:size-36 rounded-full overflow-hidden accent-ring" style={{background:'#f0efee'}}>
            {mainSrc ? (
              <img src={mainSrc} alt={name} className="w-full h-full object-cover" />
            ) : null}
          </div>
          {next1 ? (
            <img
              src={next1}
              alt="alt-avatar-1"
              className="absolute size-9 rounded-full object-cover soft-shadow float-slow"
              style={{ left: '-14px', top: '6px' }}
            />
          ) : null}
          {next2 ? (
            <img
              src={next2}
              alt="alt-avatar-2"
              className="absolute size-9 rounded-full object-cover soft-shadow float-slower"
              style={{ left: '-14px', bottom: '6px' }}
            />
          ) : null}
        </div>
        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-semibold text-neutral-100 drop-shadow-sm">{name}</h1>
          <p className="rounded-2xl px-4 py-3 card">
            {about}
          </p>
        </div>
      </div>
    </header>
  )
}
