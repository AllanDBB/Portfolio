import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { I18nProvider } from './i18n'
import { ThemeProvider } from './theme'
import { metaForPath, allRoutes } from './lib/seo'

export { allRoutes }

/** Renders one route to static HTML for the prerender step. */
export function render(url: string) {
  const html = renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <ThemeProvider>
          <I18nProvider>
            <App />
          </I18nProvider>
        </ThemeProvider>
      </StaticRouter>
    </React.StrictMode>
  )

  return { html, meta: metaForPath(url) }
}
