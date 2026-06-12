const skillGroups = [
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML / CSS'],
  },
  {
    label: 'Backend',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'SQLite', 'Node.js'],
  },
  {
    label: 'AI & APIs',
    skills: ['Claude API', 'OpenCV', 'MCP', 'WhatsApp API', 'Stripe', 'AWS (EC2 · RDS · S3)', 'Resend'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'Docker', 'GitHub Actions', 'CI/CD', 'Vercel', 'Netlify', 'ngrok'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-cream border-t border-blue/15">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-end gap-6 mb-14">
          <div>
            <p className="font-sans text-xs tracking-[0.4em] text-blue/40 uppercase mb-1">02 — Skills</p>
            <h2 className="font-serif text-5xl text-blue italic">Tech Stack</h2>
          </div>
          <span className="hidden sm:block h-px flex-1 bg-blue/15 mb-3" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="border-l-2 border-blue/40 pl-5 py-1"
            >
              <h3 className="font-sans text-xs tracking-[0.35em] text-blue uppercase mb-5">
                {group.label}
              </h3>
              <ul className="space-y-3">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 font-sans font-light text-sm text-blue/70">
                    <span className="w-1 h-1 rounded-full bg-orange shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
