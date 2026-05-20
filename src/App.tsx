import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="font-sans antialiased text-gray-900">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <footer className="py-6 text-center text-sm text-gray-400 border-t border-gray-100">
        Designed & built by Nan
      </footer>
    </div>
  )
}
