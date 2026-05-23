export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-cream border-t border-blue/15">
      <div className="max-w-xl mx-auto text-center">

        <p className="font-sans text-xs tracking-[0.4em] text-blue/40 uppercase mb-2">03 — Contact</p>
        <h2 className="font-serif text-5xl text-blue italic mb-5">Say Hello</h2>

        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="h-px w-14 bg-blue/25" />
          <span className="text-orange text-sm">◆</span>
          <span className="h-px w-14 bg-blue/25" />
        </div>

        <p className="font-sans font-light text-blue/60 text-base leading-relaxed mb-10">
          I'm currently open to new opportunities. Whether you have a project
          in mind or just want to connect — I'd love to hear from you.
        </p>

        <a
          href="mailto:nanxu1279@gmail.com"
          className="inline-block px-10 py-3.5 bg-blue text-cream font-sans text-xs tracking-[0.25em] uppercase rounded-full hover:bg-blue/80 transition-colors duration-300 mb-12"
        >
          Send a Message
        </a>

        <div className="flex justify-center gap-8 font-sans text-xs tracking-[0.25em] uppercase text-blue/40">
          <a
            href="https://github.com/nanxu1279"
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
    </section>
  )
}
