import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { Cursor, Curtain, Preloader } from './components/Chrome'
import { HoverPreviewProvider } from './components/HoverPreview'
import Home from './pages/Home'
import Work from './pages/Work'
import Research from './pages/Research'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import NotFound from './pages/NotFound'
import MyDarling from './pages/MyDarling'
import { metaForPath } from './lib/seo'
import { refreshTriggers, scrollTo, scrollToTop, startSmoothScroll } from './lib/scroll'

/** Keeps <title>/description in sync on client-side navigation. */
function DocumentMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = metaForPath(pathname)
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [pathname])

  return null
}

/** New route → top of page (or to its #anchor), then re-measure triggers. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    scrollToTop()
    if (hash) {
      // Wait for the new page to lay out (and the curtain to lift), then glide
      // to the anchor; retry briefly in case the target mounts late.
      let tries = 0
      const go = () => {
        if (scrollTo(hash, -96) || ++tries > 10) return
        id = window.setTimeout(go, 150)
      }
      let id = window.setTimeout(go, 500)
      return () => clearTimeout(id)
    }
    const id = setTimeout(refreshTriggers, 120)
    return () => clearTimeout(id)
  }, [pathname, hash])
  return null
}

/** Rutas privadas: se sirven sin nav, sin footer y sin el grano del sitio. */
const BARE_ROUTES = ['/my-darling']

export default function App() {
  const { pathname } = useLocation()
  const bare = BARE_ROUTES.includes(pathname.replace(/\/+$/, '') || '/')

  useEffect(() => {
    if (!bare) startSmoothScroll()
  }, [bare])

  if (bare) {
    return (
      <div className="flex min-h-screen flex-col">
        <DocumentMeta />
        <main className="relative flex-1">
          <Routes>
            <Route path="/my-darling" element={<MyDarling />} />
          </Routes>
        </main>
      </div>
    )
  }

  return (
    <HoverPreviewProvider>
      <div className="grain flex min-h-screen flex-col">
        <DocumentMeta />
        <ScrollManager />
        <Preloader />
        <Curtain />
        <Cursor />
        <NavBar />
        <main className="relative z-[2] flex-1 bg-bg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/research" element={<Research />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HoverPreviewProvider>
  )
}
