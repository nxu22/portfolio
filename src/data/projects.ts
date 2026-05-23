export interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
  video?: string
}

export const projects: Project[] = [
  {
    title: 'BuildRight Renovations — AI Agent',
    description:
      'A landing page for a GTA renovation company with an AI-powered chat assistant. Visitors describe their project in plain language, and the assistant captures the lead, summarizes the scope, budget, and next steps, and automatically emails both the team and the customer. Built to turn casual curiosity into qualified leads without a human in the loop.',
    tags: ['React', 'CSS', 'AI Agent', 'Netlify'],
    github: 'https://github.com/nxu22/Buildright_construction',
    live: 'https://buildrightforconstruction.netlify.app/',
    video: '/buildright.mp4',
  },
  {
    title: 'Pale Grain',
    description:
      'A photography portfolio website showcasing original work. Clean, minimal design built to let the images speak for themselves.',
    tags: ['React', 'Vite', 'CSS', 'Netlify'],
    github: 'https://github.com/nxu22/PaleGrainCo',
    live: 'https://palegrain.netlify.app',
    video: '/palegrain.mp4',
  },
  {
    title: 'Strange Light — Animal Lamp Shop',
    description:
      'A full-stack e-commerce store for handcrafted animal lamps. Features product browsing, cart, and checkout. Built with React, TypeScript, and Supabase for auth and database.',
    tags: ['React', 'TypeScript', 'Supabase', 'JavaScript', 'Vercel'],
    live: 'https://strange-light-shop.vercel.app/',
    video: '/strangelight.mp4',
  },
  {
    title: 'Build The Bridge — Cross-Border Marketing Agency',
    description:
      'A bilingual landing page for a cross-border marketing agency that helps Canadian natural and sustainable brands enter the Chinese market through Xiaohongshu (RED), KOL partnerships, and on-the-ground connections. Covers market-entry services from feasibility research to Tmall agent sourcing, with a structured "Work With Us" intake form that captures budget and service interest.',
    tags: ['React', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/nxu22/BuildTheBridge',
    live: 'https://build-the-bridge-ohje.vercel.app/',
    video: '/buildthebridge.mp4',
  },
]
