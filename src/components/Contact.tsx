export default function Contact() {
  return (
    <section id="contact" className="px-8 py-16 bg-cream">
      <div className="max-w-[970px] mx-auto">
        <h2 className="text-[12.5px] tracking-[0.3em] uppercase text-blue/40 mb-3">
          Contact
        </h2>
        <p className="text-[19px] font-light leading-relaxed text-blue/70 mb-3">
          Open to AI engineering and infrastructure roles. If you're building
          agent systems or real-time voice and want someone who measures them,
          I'd like to hear from you.
        </p>
        {/* an invitation to verify the tenancy claim rather than take it on faith */}
        <p className="text-[16.5px] font-light leading-relaxed text-blue/50 mb-5">
          The fastest way to judge that: open CaseFlow, log in as one firm, copy
          a case ID, then log in as the other and try to open it.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[16.5px]">
          <a
            href="mailto:nanxu1279@gmail.com"
            className="text-blue hover:opacity-60 transition-opacity"
          >
            nanxu1279@gmail.com
          </a>
          <a
            href="https://github.com/nxu22"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue/50 hover:text-blue transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  )
}
