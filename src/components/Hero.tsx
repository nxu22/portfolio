import { useState } from 'react'
import photo from '../assets/photo.png'

export default function Hero() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative flex items-center gap-3 cursor-default"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <h1 className={`font-serif text-xl font-bold italic transition-colors duration-200 ${open ? 'text-orange' : 'text-blue'}`}>
        Hi, I'm Nan.
      </h1>
      <img
        src={photo}
        alt="Nan"
        className={`w-10 drop-shadow-md shrink-0 transition-transform duration-200 ${open ? 'scale-105' : ''}`}
      />

      {/* Contact popup */}
      <div
        className={`absolute right-0 top-full mt-2 w-64 bg-cream border border-blue/20 rounded-xl shadow-lg p-4 transition-all duration-200 ${open ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-1'}`}
      >
        <p className="font-sans font-light text-blue/60 text-xs leading-relaxed mb-3">
          I'm currently open to new opportunities. Whether you have a project
          in mind or just want to connect — I'd love to hear from you.
        </p>
        <a
          href="mailto:nanxu1279@gmail.com"
          className="block text-center px-5 py-2 bg-blue text-cream font-sans text-[10px] tracking-[0.25em] uppercase rounded-full hover:bg-blue/80 transition-colors duration-300 mb-3"
        >
          Send a Message
        </a>
        <div className="flex justify-center gap-6 font-sans text-[10px] tracking-[0.25em] uppercase text-blue/40">
          <a
            href="https://github.com/nxu22"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange transition-colors duration-200"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}
