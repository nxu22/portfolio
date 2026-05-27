import { useState } from 'react'
import { projects, type Project } from '../data/projects'

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
  const paragraphs = project.description.split('\n\n')
  const hasMore = paragraphs.length > 1

  return (
    <div className="group bg-cream border border-blue/20 rounded-xl overflow-hidden hover:border-orange/60 transition-all duration-300">
      {/* video preview */}
      {project.video && (
        <a href={project.live} target="_blank" rel="noopener noreferrer">
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full cursor-pointer"
          />
        </a>
      )}

      {/* interactive demo */}
      {project.demo && (
        <div className="w-full bg-cream flex justify-center items-center py-6">
          <iframe
            src={project.demo}
            className="border-0"
            style={{ width: '100%', height: '780px', overflow: 'hidden' }}
            title={`${project.title} demo`}
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-serif text-xl text-blue italic">
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

        <div className="font-sans font-light text-blue/60 text-sm leading-relaxed mb-3">
          <p>{paragraphs[0]}</p>
          {expanded && paragraphs.slice(1).map((para, i) => (
            <p key={i} className="mt-3">{para}</p>
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

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-blue/10 text-blue text-xs font-sans tracking-wide rounded-full"
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
    <section id="projects" className="py-24 px-6 bg-cream">
      <div className="max-w-5xl mx-auto">

        <div className="mb-14 text-center">
          <h2 className="font-serif text-5xl text-blue italic">My Projects</h2>
        </div>

        <div className="flex flex-col gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
