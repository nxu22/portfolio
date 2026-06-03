import photo from '../assets/photo.png'

export default function Hero() {
  return (
    <section className="min-h-0 py-12 flex flex-col items-start justify-start bg-cream px-12 relative overflow-hidden gap-8 pt-24">

      {/* main row */}
      <div className="flex flex-row items-center gap-10 relative z-10 w-full max-w-3xl">

        {/* text */}
        <div className="text-left">
          <h1 className="font-serif text-4xl sm:text-[2.6rem] font-bold text-blue italic mb-4">
            Hi, I'm Nan.
          </h1>

          {/* photo — below title */}
          <img
            src={photo}
            alt="Nan"
            className="w-32 sm:w-40 drop-shadow-md mb-6"
          />

          <p className="font-sans font-light text-blue/65 text-lg sm:text-xl leading-relaxed max-w-sm">
            I'm a full stack developer living with my buddy Togo. I build
            web apps front to back — e-commerce stores, photography sites,
            and AI agents that capture leads and email clients automatically.{' '}
            <a href="#contact" className="text-blue/70 underline underline-offset-4 decoration-blue/30 hover:text-orange hover:decoration-orange transition-colors duration-200 whitespace-nowrap">
              Want to work together?
            </a>
          </p>
        </div>

      </div>

      {/* scroll hint */}
      <p className="font-sans font-light text-blue/40 text-sm text-left">
        Scroll down to{' '}
        <a href="#projects" className="text-blue/60 underline underline-offset-4 decoration-blue/25 hover:text-orange hover:decoration-orange transition-colors duration-200">
          view my projects
        </a>
        .
      </p>

    </section>
  )
}
