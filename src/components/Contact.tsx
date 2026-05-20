export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Get In Touch</h2>
        <p className="text-gray-500 mb-10">
          I'm currently open to new opportunities. Whether you have a project in mind or just want
          to say hi — my inbox is always open.
        </p>
        <a
          href="mailto:nanxu1279@gmail.com"
          className="inline-block px-10 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-700 transition-colors duration-200 mb-12"
        >
          Say Hello
        </a>
        <div className="flex justify-center gap-6 text-gray-400">
          <a
            href="https://github.com/nanxu1279"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
