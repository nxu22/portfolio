export interface Project {
  title: string
  description: string
  tags: string[]
  github: string
}

export const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-featured online store with cart, checkout, and Stripe payments. Built with a REST API backend and React frontend.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com/nanxu1279',
  },
  {
    title: 'Task Management App',
    description:
      'Real-time collaborative task board with drag-and-drop, user auth, and live updates via WebSockets.',
    tags: ['React', 'Express', 'Socket.io', 'MongoDB'],
    github: 'https://github.com/nanxu1279',
  },
  {
    title: 'Dev Blog CMS',
    description:
      'A headless CMS with Markdown support, syntax highlighting, and a custom admin dashboard for managing posts.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    github: 'https://github.com/nanxu1279',
  },
  {
    title: 'Weather Dashboard',
    description:
      'Location-aware weather app with 7-day forecasts, interactive charts, and geolocation. Consumes OpenWeather API.',
    tags: ['React', 'Recharts', 'REST API', 'CSS'],
    github: 'https://github.com/nanxu1279',
  },
]
