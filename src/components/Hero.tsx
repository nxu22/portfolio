import photo from '../assets/photo.png'

export default function Hero() {
  return (
    <div className="flex flex-col justify-between h-full px-8 py-12 lg:px-10 lg:py-16">

      <div>
        <h1 className="font-serif text-4xl font-bold text-blue italic mb-5">
          Hi, I'm Nan.
        </h1>

        <img
          src={photo}
          alt="Nan"
          className="w-32 drop-shadow-md mb-6"
        />

        <p className="font-sans font-light text-blue/65 text-sm leading-relaxed">
          I build full-stack web apps and AI-powered tools — case management systems,
          e-commerce stores, WhatsApp agents, and AI chatbots that capture leads and
          automate client communication.{' '}
          <a
            href="#contact"
            className="text-blue/70 underline underline-offset-4 decoration-blue/30 hover:text-orange hover:decoration-orange transition-colors duration-200"
          >
            Want to work together?
          </a>
        </p>
      </div>

      <p className="font-sans font-light text-blue/30 text-xs mt-8">
        © {new Date().getFullYear()} Nan Xu
      </p>

    </div>
  )
}
