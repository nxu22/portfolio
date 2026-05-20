export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-slate-100 px-6">
      <div className="text-center max-w-2xl animate-fade-in">
        <p className="text-sm font-semibold tracking-widest text-indigo-500 uppercase mb-4">
          Hello, I'm
        </p>
        <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 tracking-tight mb-4">
          Nan
        </h1>
        <h2 className="text-2xl sm:text-3xl font-medium text-gray-500 mb-8">
          Full Stack Developer
        </h2>
        <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          I build clean, performant web applications — from polished UIs to
          scalable backends.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="px-8 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-700 transition-colors duration-200"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:border-gray-500 hover:text-gray-900 transition-colors duration-200"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}
