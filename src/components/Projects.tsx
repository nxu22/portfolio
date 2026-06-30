import React, { useState, useEffect, useRef } from 'react'
import { projects as defaultProjects, type Project } from '../data/projects'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const STORAGE_KEY = 'portfolio-project-order'

function loadSavedOrder(defaults: Project[]): Project[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return defaults
    const order: string[] = JSON.parse(saved)
    const map = new Map(defaults.map(p => [p.title, p]))
    const sorted = order.flatMap(t => { const p = map.get(t); return p ? [p] : [] })
    const missing = defaults.filter(p => !order.includes(p.title))
    return [...sorted, ...missing]
  } catch {
    return defaults
  }
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
        className="text-orange hover:underline">
        {m[0]}
      </a>
    )
    last = re.lastIndex
  }
  if (last < text.length) result.push(text.slice(last))
  return result
}

function ExternalVideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const embedSrc = src.replace('streamable.com/', 'streamable.com/e/')

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
        <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={embedSrc}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

function LazyVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !el.src) {
          el.src = src
          el.play().catch(() => {})
        }
      },
      { rootMargin: '300px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [src])

  return <video ref={ref} loop muted playsInline preload="none" className={className} />
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

function GripIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
      <circle cx="5" cy="3.5" r="1.3" />
      <circle cx="11" cy="3.5" r="1.3" />
      <circle cx="5" cy="8" r="1.3" />
      <circle cx="11" cy="8" r="1.3" />
      <circle cx="5" cy="12.5" r="1.3" />
      <circle cx="11" cy="12.5" r="1.3" />
    </svg>
  )
}

function ProjectCard({
  project,
  dragHandleProps,
}: {
  project: Project
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>
}) {
  const [expanded, setExpanded] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [externalVideoOpen, setExternalVideoOpen] = useState(false)
  const paragraphs = project.description.split('\n\n')
  const hasMore = paragraphs.length > 1

  return (
    <div className="group bg-cream border border-blue/20 rounded-xl overflow-hidden hover:border-orange/60 transition-all duration-300">
      {/* drag handle */}
      <div
        {...dragHandleProps}
        className="flex justify-center py-1.5 cursor-grab active:cursor-grabbing text-blue/20 hover:text-blue/50 transition-colors touch-none select-none"
      >
        <GripIcon />
      </div>

      {/* title + links — above media */}
      <div className="px-3 pb-2 flex items-start justify-between">
        <h3 className="font-serif text-sm sm:text-base text-blue italic font-semibold">
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

      {/* video preview */}
      {project.video && (
        <>
          <div
            className="relative cursor-pointer group/video"
            onClick={() => setVideoOpen(true)}
          >
            <LazyVideo src={project.video} className="w-full" />
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

      {/* external video link — thumbnail + play button, opens modal on click */}
      {project.videoLink && (
        <>
          <div
            className="relative cursor-pointer group/video"
            onClick={() => setExternalVideoOpen(true)}
          >
            <div className="relative w-full aspect-video bg-blue/10 overflow-hidden">
              <img
                src={project.image ?? `https://cdn-cf-east.streamable.com/image/${project.videoLink.split('/').pop()}.jpg`}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/video:opacity-100 transition-opacity duration-200">
                <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-blue ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {externalVideoOpen && <ExternalVideoModal src={project.videoLink} onClose={() => setExternalVideoOpen(false)} />}
        </>
      )}

      {/* static screenshot */}
      {project.image && !project.video && !project.videoLink && (
        <a href={project.live ?? project.github} target="_blank" rel="noopener noreferrer">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full object-cover"
            loading="lazy"
          />
        </a>
      )}

      {/* interactive demo */}
      {project.demo && (
        <div className="w-full bg-cream flex justify-center items-center py-6">
          <iframe
            src={project.demo}
            className="border-0"
            style={{ width: '100%', height: '500px', overflow: 'hidden' }}
            title={`${project.title} demo`}
            allowFullScreen
          />
        </div>
      )}

      <div className="p-3">
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

function SortableCard({ project }: { project: Project }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.title })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 10 : 'auto',
        position: 'relative',
      }}
    >
      <ProjectCard project={project} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  )
}

export default function Projects() {
  const [items, setItems] = useState<Project[]>(() => loadSavedOrder(defaultProjects))

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setItems(prev => {
      const oldIndex = prev.findIndex(p => p.title === active.id)
      const newIndex = prev.findIndex(p => p.title === over.id)
      const next = arrayMove(prev, oldIndex, newIndex)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next.map(p => p.title)))
      return next
    })
  }

  return (
    <section id="projects" className="py-8 px-8 bg-cream">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(p => p.title)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(project => (
              <SortableCard key={project.title} project={project} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </section>
  )
}
