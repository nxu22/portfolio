import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="font-sans antialiased bg-cream text-blue min-h-screen">
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <footer className="py-8 text-center font-sans text-xs tracking-[0.3em] uppercase text-blue/40 border-t border-blue/20 bg-cream">
        Designed & built by Nan &nbsp;·&nbsp; {new Date().getFullYear()}
      </footer>
    </div>
  )
}
