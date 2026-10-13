/** Map an original asset to its optimised WebP twin in /images/opt. */
export function opt(src?: string): string | undefined {
  if (!src) return undefined
  const name = src.split('/').pop()!.replace(/\.(png|jpe?g)$/i, '')
  if (src.startsWith('/avatars/')) return `/images/opt/avatar-${name}.webp`
  if (src.startsWith('/images/') && !src.startsWith('/images/opt/')) return `/images/opt/${name}.webp`
  return src
}
