import { useState } from 'react'
import photo from '../assets/photo.png'

export default function Hero() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      {/* click, not hover — hover has no equivalent on touch devices */}
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2.5 text-[14px] tracking-[0.15em] uppercase text-blue/40 hover:text-blue transition-colors"
      >
        Contact {open ? '↑' : '↓'}
        <img src={photo} alt="" className="w-8 shrink-0" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3 w-60 bg-cream border border-blue/15 p-4 z-50">
          <p className="text-[15px] font-light leading-relaxed text-blue/65 mb-3">
            Open to AI engineering and infrastructure roles.
          </p>
          <a
            href="mailto:nanxu1279@gmail.com"
            className="block text-[15px] text-blue hover:opacity-60 transition-opacity mb-3 break-all"
          >
            nanxu1279@gmail.com
          </a>
          <a
            href="https://github.com/nxu22"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] tracking-[0.15em] uppercase text-blue/45 hover:text-blue transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      )}
    </div>
  )
}
