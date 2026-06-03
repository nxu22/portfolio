import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="font-sans antialiased bg-cream text-blue min-h-screen flex flex-col lg:flex-row">

      {/* Sidebar — full width on mobile, sticky column on desktop */}
      <aside className="w-full lg:w-[28%] lg:sticky lg:top-0 lg:h-screen lg:border-r lg:border-blue/10 lg:shrink-0">
        <Hero />
      </aside>

      {/* Right scrollable content */}
      <main className="w-full lg:w-[72%]">
        <Projects />
        <Contact />
        <footer className="py-8 text-center font-sans text-xs tracking-[0.3em] uppercase text-blue/40 border-t border-blue/20 bg-cream">
          Designed & built by Nan &nbsp;·&nbsp; {new Date().getFullYear()}
        </footer>
      </main>

    </div>
  )
}
