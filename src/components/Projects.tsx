import React, { useState, useEffect } from 'react'
import { projectGroups, type Project } from '../data/projects'

export function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/** "SalesPilot — Multi-Agent Sales Intelligence Assistant" → "SalesPilot" */
export function shortName(title: string): string {
  return title.split('—')[0].trim()
}

function linkifyText(text: string): React.ReactNode[] {
  const re = /\b([a-z0-9-]+\.(?:com|site|io|ca|co|net|org|app|dev|ai)(?:\/\S*)?)\b/gi
  const result: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  re.lastIndex = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) result.push(text.slice(last, m.index))
    const href = `https://${m[0]}`
    result.push(
      <a key={m.index} href={href} target="_blank" rel="noopener noreferrer"
        className="underline underline-offset-2 decoration-blue/25 hover:decoration-blue">
        {m[0]}
      </a>
    )
    last = re.lastIndex
  }
  if (last < text.length) result.push(text.slice(last))
  return result
}

function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  return m ? m[1] : null
}

function embedUrl(src: string): string {
  const yt = youtubeId(src)
  if (yt) return `https://www.youtube.com/embed/${yt}?autoplay=1`
  return src.replace('streamable.com/', 'streamable.com/e/')
}

function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-8 right-0 text-white/70 hover:text-white text-xs tracking-wide"
        >
          Close ✕
        </button>
        <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={embedUrl(src)}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

function ProjectEntry({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const paragraphs = project.description.split('\n\n')
  const hasMore = paragraphs.length > 1
  const shown = expanded ? paragraphs : paragraphs.slice(0, 1)

  return (
    <article id={slug(shortName(project.title))} className="scroll-mt-28">
      {project.stage && (
        <p className="text-[12.5px] tracking-[0.25em] uppercase text-blue/35 mb-1.5">
          {project.stage}
        </p>
      )}

      <h3 className="text-[22px] font-medium text-blue leading-snug mb-1.5">
        {project.title}
      </h3>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-blue/45 mb-4">
        {project.phone && (
          <a
            href={`tel:+1${project.phone.replace(/\D/g, '')}`}
            className="text-blue hover:opacity-60 transition-opacity"
          >
            {project.phone} ↗
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="hover:text-blue transition-colors">
            Live ↗
          </a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue transition-colors">
            GitHub ↗
          </a>
        )}
        {project.videoLink && (
          <button onClick={() => setVideoOpen(true)} className="hover:text-blue transition-colors">
            Demo ▸
          </button>
        )}
      </div>

      <div className="text-[18.5px] font-light leading-[1.75] text-blue/75 space-y-4">
        {shown.map((para, i) => (
          <p key={i}>{linkifyText(para)}</p>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-[15px] text-blue/45 hover:text-blue transition-colors"
        >
          {expanded ? 'Less ↑' : 'More ↓'}
        </button>
      )}

      <p className="mt-4 text-[14px] leading-relaxed text-blue/35">
        {project.tags.join(' · ')}
      </p>

      {videoOpen && project.videoLink && (
        <VideoModal src={project.videoLink} onClose={() => setVideoOpen(false)} />
      )}
    </article>
  )
}

/** Full scope in one glance — six names, clickable, no scrolling required */
export function ProjectIndex() {
  const all = projectGroups.flatMap(g => g.projects)
  return (
    <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[15px] text-blue/45">
      {all.map(p => (
        <a
          key={p.title}
          href={`#${slug(shortName(p.title))}`}
          className="hover:text-blue transition-colors"
        >
          {shortName(p.title)}
        </a>
      ))}
    </nav>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="px-8 pb-20 bg-cream">
      <div className="max-w-[970px] mx-auto space-y-20">
        {projectGroups.map(group => (
          <div
            key={group.label}
            id={slug(group.label)}
            className="grid lg:grid-cols-[250px_1fr] gap-x-12 gap-y-5 scroll-mt-28"
          >
            {/* left rail — stays in view so the through-line never scrolls away */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-[12.5px] tracking-[0.3em] uppercase text-blue/40 mb-2.5">
                {group.label}
              </h2>
              <p className="text-[16.5px] font-light leading-relaxed text-blue/60">
                {group.thesis}
              </p>
              {group.progression && (
                <div className="mt-3 space-y-0.5 text-[12.5px] tracking-[0.15em] uppercase text-blue/35">
                  {group.projects.map((p, i) => (
                    <p key={p.title}>{i > 0 && '→ '}{p.stage}</p>
                  ))}
                </div>
              )}
            </div>

            {/* right column — the projects themselves */}
            <div className="space-y-14 max-w-2xl">
              {group.projects.map(project => (
                <ProjectEntry key={project.title} project={project} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
