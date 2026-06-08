import React, { useState, useEffect, useRef } from 'react'
import { projects, type Project } from '../data/projects'

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
        className="text-orange hover:underline">
        {m[0]}
      </a>
    )
    last = re.lastIndex
  }
  if (last < text.length) result.push(text.slice(last))
  return result
}

function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-9 right-0 text-white/80 hover:text-white text-sm font-sans tracking-wide transition-colors"
        >
          Close ✕
        </button>
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          className="w-full rounded-xl shadow-2xl"
        />
      </div>
    </div>
  )
}

function GitHubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const paragraphs = project.description.split('\n\n')
  const hasMore = paragraphs.length > 1

  return (
    <div className="group bg-cream border border-blue/20 rounded-xl overflow-hidden hover:border-orange/60 transition-all duration-300 break-inside-avoid mb-4">
      {/* video preview */}
      {project.video && (
        <>
          <div
            className="relative cursor-pointer group/video"
            onClick={() => setVideoOpen(true)}
          >
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/video:opacity-100 transition-opacity duration-200">
              <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-blue ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
          {videoOpen && <VideoModal src={project.video} onClose={() => setVideoOpen(false)} />}
        </>
      )}

      {/* interactive demo */}
      {project.demo && (
        <div className="w-full bg-cream flex justify-center items-center py-6">
          <iframe
            src={project.demo}
            className="border-0"
            style={{ width: '100%', height: '500px', overflow: 'hidden' }}
            title={`${project.title} demo`}
          />
        </div>
      )}

      <div className="p-3">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="font-serif text-sm sm:text-base text-blue italic">
            {project.live ? (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors duration-200">
                {project.title}
              </a>
            ) : project.title}
          </h3>
          <div className="flex items-center gap-3 ml-3 shrink-0 text-blue/30 group-hover:text-blue/60 transition-colors">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange transition-colors"
                aria-label="Live site"
              >
                <ExternalLinkIcon />
              </a>
            )}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange transition-colors"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
            ) : (
              <span className="opacity-30 cursor-default">
                <GitHubIcon />
              </span>
            )}
          </div>
        </div>

        <div className="font-sans font-light text-blue/60 text-[11px] leading-relaxed mb-2">
          <p>{linkifyText(paragraphs[0])}</p>
          {expanded && paragraphs.slice(1).map((para, i) => (
            <p key={i} className="mt-3">{linkifyText(para)}</p>
          ))}
        </div>

        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-sans text-orange hover:text-blue transition-colors duration-200 mb-4 tracking-wide"
          >
            {expanded ? 'Read less ↑' : 'Read more ↓'}
          </button>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-blue/10 text-blue text-[10px] font-sans tracking-wide rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-10 px-4 bg-cream">
      <div className="max-w-3xl mx-auto">

        <div className="mb-7 text-right">
          <h2 className="font-serif text-3xl text-blue italic">My Projects</h2>
        </div>

        <div className="sm:columns-2 gap-4 space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
