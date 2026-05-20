const skillGroups = [
  {
    label: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs'],
  },
  {
    label: 'Tools & Other',
    skills: ['Git', 'Docker', 'Linux', 'CI/CD', 'Figma'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Skills</h2>
        <p className="text-gray-500 mb-12">Technologies I work with</p>
        <div className="grid sm:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div key={group.label} className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-4">
                {group.label}
              </h3>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-gray-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
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
