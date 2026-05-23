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
      'BuildRight is a full-stack AI chatbot built for a fictional home renovation company, designed to turn website visitors into qualified sales leads. Potential clients open a chat widget, ask questions about services and pricing, and get instant, conversational answers — and the business owner automatically receives a summarized lead with the full conversation by email.\n\nI built the entire system end to end. The chatbot is powered by Claude and grounded in a custom renovation knowledge base, so its answers stay accurate and on-topic rather than generic — it can walk a customer through quote estimates for a kitchen, bathroom, basement, or flooring project across different budget tiers. Once a visitor shares their contact details, they get an instant confirmation email, and the owner receives an AI-written summary of the conversation. I paid particular attention to making lead capture reliable: the system still delivers the lead even if a visitor abruptly closes the browser, and prevents duplicate emails so the owner gets exactly one notification per conversation.\n\nThe interface has a deliberately hand-drawn, sketchbook feel — a handwritten font, a coral-and-mint palette, and custom SVG house and tool illustrations — to match the friendly, approachable tone of a local renovation business. The app is live and deployed, built with React, a Python (FastAPI) backend, and an email integration on a custom domain.',
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
      'Strange Light is a full-stack e-commerce application for a handmade lamp shop, built end to end as a complete, production-deployed store. It supports the full customer journey: browsing a product catalog, searching by category, managing a shopping cart, creating an account, and checking out with real credit card payments.\n\nI designed and built the entire application — frontend, database, authentication, and payment processing. The standout piece is a secure Stripe checkout: card payments are processed through a server-side function that creates the payment request before the customer\'s card details are ever collected, with completed orders saved to a PostgreSQL database. I built the interface entirely by hand rather than relying on a UI library, giving the shop a distinctive editorial design with custom animations and four switchable color themes.\n\nThe app is live and deployed, built with React, Supabase (authentication and database), Stripe (payments), and hosted on Vercel.',
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
