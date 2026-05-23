import photo from '../assets/photo.png'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-cream px-8 relative overflow-hidden gap-14 pt-16">

      {/* main row */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-10 sm:gap-28 relative z-10 w-full max-w-4xl">

        {/* text */}
        <div className="text-center sm:text-left">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-blue italic mb-8">
            Hi, I'm Nan.
          </h1>

          <p className="font-sans font-light text-blue/65 text-lg sm:text-xl leading-relaxed max-w-sm">
            I'm a full stack developer living with my buddy Togo. I build
            web apps front to back — e-commerce stores, photography sites,
            and AI agents that capture leads and email clients automatically.{' '}
            <a href="#contact" className="text-blue/70 underline underline-offset-4 decoration-blue/30 hover:text-orange hover:decoration-orange transition-colors duration-200 whitespace-nowrap">
              Want to work together?
            </a>
          </p>
        </div>

        {/* photo */}
        <div className="shrink-0">
          <img
            src={photo}
            alt="Nan"
            className="w-40 sm:w-52 drop-shadow-md"
          />
        </div>

      </div>

      {/* scroll hint */}
      <p className="font-sans font-light text-blue/40 text-sm text-center">
        Scroll down to{' '}
        <a href="#projects" className="text-blue/60 underline underline-offset-4 decoration-blue/25 hover:text-orange hover:decoration-orange transition-colors duration-200">
          view my projects
        </a>
        .
      </p>

    </section>
  )
}
