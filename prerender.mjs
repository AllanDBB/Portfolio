/**
 * Static prerender step.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 * For every route it renders real HTML into dist/<route>/index.html and
 * rewrites the per-page meta tags, so links have working previews and the
 * page is readable before JS boots.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const distDir = join(root, 'dist')

const { render, allRoutes } = await import('./dist-ssr/entry-server.js')

const template = await readFile(join(distDir, 'index.html'), 'utf8')

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

/** Replace the content of a meta tag matched by attribute selector. */
function setMeta(html, attr, name, content) {
  const pattern = new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`, 'i')
  if (pattern.test(html)) return html.replace(pattern, `$1${escapeAttr(content)}$2`)
  return html.replace('</head>', `  <meta ${attr}="${name}" content="${escapeAttr(content)}" />\n  </head>`)
}

function routeToFile(route) {
  return route === '/' ? join(distDir, 'index.html') : join(distDir, route.slice(1), 'index.html')
}

const routes = allRoutes()
let written = 0

for (const route of routes) {
  const { html, meta } = render(route)
  const absoluteImage = meta.image.startsWith('http')
    ? meta.image
    : `https://allanbolanos.com${meta.image}`

  let page = template
    .replace('<!--app-html-->', html)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(meta.title)}</title>`)
    .replace(
      /(<link rel="canonical" href=")[^"]*(")/i,
      `$1${escapeAttr(meta.canonical)}$2`
    )

  page = setMeta(page, 'name', 'description', meta.description)
  page = setMeta(page, 'property', 'og:title', meta.title)
  page = setMeta(page, 'property', 'og:description', meta.description)
  page = setMeta(page, 'property', 'og:url', meta.canonical)
  page = setMeta(page, 'property', 'og:image', absoluteImage)
  page = setMeta(page, 'name', 'twitter:title', meta.title)
  page = setMeta(page, 'name', 'twitter:description', meta.description)
  page = setMeta(page, 'name', 'twitter:image', absoluteImage)

  const file = routeToFile(route)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, page, 'utf8')
  written++
}

/* ---- sitemap.xml ---- */
const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) =>
      `  <url><loc>https://allanbolanos.com${route === '/' ? '' : route}</loc><lastmod>${today}</lastmod></url>`
  )
  .join('\n')}
</urlset>
`
await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8')

await writeFile(
  join(distDir, 'robots.txt'),
  'User-agent: *\nAllow: /\n\nSitemap: https://allanbolanos.com/sitemap.xml\n',
  'utf8'
)

console.log(`prerendered ${written} routes + sitemap.xml + robots.txt`)
