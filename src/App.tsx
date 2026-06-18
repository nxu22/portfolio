import { useState } from 'react'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'

const skillGroups = [
  { label: 'AI & APIs', skills: ['Claude API', 'LangGraph', 'RAG', 'Agent Orchestration', 'ChromaDB', 'Langfuse', 'Eval Harness', 'OpenCV', 'MCP', 'WhatsApp API', 'Stripe', 'Resend'] },
  { label: 'Backend', skills: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'SQLite', 'Node.js'] },
  { label: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML / CSS'] },
  { label: 'Tools', skills: ['Git', 'Docker', 'GitHub Actions', 'CI/CD', 'AWS (EC2 · RDS · S3)', 'Vercel', 'Netlify', 'ngrok'] },
]

export default function App() {
  const [skillsOpen, setSkillsOpen] = useState(false)

  return (
    <div className="font-sans antialiased bg-cream text-blue min-h-screen">

      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-blue/10">
        <div className="px-8 py-4 flex items-center justify-between">

          {/* Left: title + skills toggle */}
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-2xl text-blue italic">My Projects</h2>
            <button
              onClick={() => setSkillsOpen(v => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-blue/25 rounded-full font-sans text-xs tracking-[0.2em] text-blue/60 uppercase hover:border-orange hover:text-orange transition-colors duration-200"
            >
              Skills
              <span className={`inline-block transition-transform duration-200 text-[10px] ${skillsOpen ? 'rotate-180' : ''}`}>↓</span>
            </button>
          </div>

          {/* Right: name + photo hover popup */}
          <Hero />
        </div>

        {/* Skills dropdown panel */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${skillsOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-8 pt-4 pb-5 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-blue/10">
            {skillGroups.map(group => (
              <div key={group.label} className="border-l-2 border-blue/30 pl-4">
                <h3 className="font-sans text-[10px] tracking-[0.35em] text-blue/50 uppercase mb-2">{group.label}</h3>
                <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                  {group.skills.map(skill => (
                    <span key={skill} className="font-sans font-light text-xs text-blue/70 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-orange shrink-0" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main>
        <Projects />
        <Contact />
        <footer className="py-8 text-center font-sans text-xs tracking-[0.3em] uppercase text-blue/40 border-t border-blue/20 bg-cream">
          Designed & built by Nan &nbsp;·&nbsp; {new Date().getFullYear()}
        </footer>
      </main>

    </div>
  )
}
