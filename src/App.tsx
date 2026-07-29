import { useState } from 'react'
import Hero from './components/Hero'
import Projects, { slug, ProjectIndex } from './components/Projects'
import Contact from './components/Contact'
import { projectGroups } from './data/projects'

const skillGroups = [
  { label: 'AI & Agents', skills: ['Claude API', 'LangGraph', 'Multi-Agent', 'RAG', 'ChromaDB', 'MCP', 'OpenCV'] },
  { label: 'Real-Time Voice', skills: ['LiveKit', 'Deepgram', 'Cartesia', 'WebRTC', 'Retell', 'ElevenLabs'] },
  { label: 'Observability & Eval', skills: ['Prometheus', 'Grafana', 'Langfuse', 'Eval harnesses'] },
  { label: 'Backend & Infra', skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS', 'GitHub Actions', 'CI/CD', 'TypeScript', 'React'] },
]

export default function App() {
  const [skillsOpen, setSkillsOpen] = useState(false)

  return (
    <div className="font-sans antialiased bg-cream text-blue min-h-screen">

      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm">
        <div className="px-8 py-4 flex items-start justify-between gap-6">

          <div>
            <h1 className="text-[19px] font-medium text-blue leading-tight">Nan Xu</h1>
            <p className="text-[14px] tracking-[0.15em] uppercase text-blue/40 mt-0.5">
              AI Engineer
            </p>
          </div>

          <div className="flex items-start gap-6">
            {/* section jump — a reader who only cares about voice can go straight there */}
            <nav className="hidden sm:flex items-center gap-4 text-[14px] tracking-[0.15em] uppercase text-blue/40 pt-0.5">
              {projectGroups.map(g => (
                <a
                  key={g.label}
                  href={`#${slug(g.label)}`}
                  className="hover:text-blue transition-colors"
                >
                  {g.nav}
                </a>
              ))}
            </nav>

            <button
              onClick={() => setSkillsOpen(v => !v)}
              className="text-[14px] tracking-[0.15em] uppercase text-blue/40 hover:text-blue transition-colors pt-0.5"
            >
              Skills {skillsOpen ? '↑' : '↓'}
            </button>

            <Hero />
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${skillsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-8 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5 max-w-5xl">
            {skillGroups.map(group => (
              <div key={group.label}>
                <h3 className="text-[12.5px] tracking-[0.25em] text-blue/40 uppercase mb-1.5">
                  {group.label}
                </h3>
                <p className="text-[15px] font-light leading-relaxed text-blue/65">
                  {group.skills.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main>
        {/* Positioning statement + full scope — the first thing a visitor reads */}
        <section className="px-8 pt-12 pb-24 bg-cream">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[25px] font-medium leading-[1.55] text-blue">
              I build multi-agent and real-time voice systems, and instrument them
              so latency, tokens, and cost per run are measured rather than assumed.
            </p>
            <p className="mt-3 text-[16.5px] font-light leading-relaxed text-blue/45">
              Working on inference infrastructure now: provider gateways,
              streaming latency, failover.
            </p>
            <div className="mt-8">
              <ProjectIndex />
            </div>
          </div>
        </section>

        <Projects />
        <Contact />

        <footer className="px-8 py-10 bg-cream">
          <p className="max-w-[970px] mx-auto text-[14px] tracking-[0.15em] uppercase text-blue/30">
            Nan Xu · {new Date().getFullYear()}
          </p>
        </footer>
      </main>

    </div>
  )
}
