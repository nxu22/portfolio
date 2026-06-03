import photo from '../assets/photo.png'

const skillGroups = [
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML / CSS'],
  },
  {
    label: 'Backend',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Node.js'],
  },
  {
    label: 'AI & APIs',
    skills: ['Claude API', 'WhatsApp API', 'Stripe', 'AWS (EC2 · RDS · S3)', 'Resend'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'Docker', 'Vercel', 'Netlify', 'ngrok'],
  },
]

export default function Hero() {
  return (
    <div className="flex flex-col h-full px-8 py-12 lg:px-10 lg:py-16 overflow-y-auto">

      {/* Title + photo side by side */}
      <div className="flex items-center gap-4 mb-5">
        <h1 className="font-serif text-4xl font-bold text-blue italic">
          Hi, I'm Nan.
        </h1>
        <img
          src={photo}
          alt="Nan"
          className="w-16 drop-shadow-md shrink-0"
        />
      </div>

      <p className="font-sans font-light text-blue/65 text-sm leading-relaxed mb-8">
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

      {/* Skills */}
      <div className="flex flex-col gap-5">
        {skillGroups.map((group) => (
          <div key={group.label} className="border-l-2 border-blue/30 pl-4">
            <h3 className="font-sans text-[10px] tracking-[0.35em] text-blue/50 uppercase mb-2">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {group.skills.map((skill) => (
                <span key={skill} className="font-sans font-light text-xs text-blue/70 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-orange shrink-0" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="font-sans font-light text-blue/30 text-xs mt-auto pt-8">
        © {new Date().getFullYear()} Nan Xu
      </p>

    </div>
  )
}
