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
    tags: ['React', 'Python', 'FastAPI', 'AI Agent', 'Netlify'],
    github: 'https://github.com/nxu22/Buildright_construction',
    live: 'https://buildrightforconstruction.netlify.app/',
    video: '/buildright.mp4',
  },
  {
    title: 'Pale Grain',
    description:
      'Pale Grain is a personal photography portfolio and booking site showcasing film-inspired documentary work across the Canadian landscape, with an integrated portrait-session offering. It\'s both a gallery and a soft sales page — visitors browse the work, then find session pricing and a first-session discount that turns a casual viewer into a potential booking.\n\nI designed and built the whole site, and the part I\'m most pleased with sits behind the scenes: photos come straight off the camera in large HEIF and RAW formats that browsers can\'t display well, so I built a Python pipeline that batch-converts them into fast, web-optimized images. That keeps the gallery sharp but quick to load — important when the work itself is the entire pitch. On the front end, the photos are presented in a masonry gallery with a full-screen lightbox and keyboard navigation, framed-photo styling throughout, and scroll-triggered reveal animations that let each image arrive on its own.\n\nThe whole experience is fully responsive, from the mobile navigation down to the grid layouts, and the site is live and deployed. It\'s built with React and styled by hand with Tailwind.',
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
      'Build The Bridge is the client-facing website for a cross-border marketing consultancy that helps Canadian natural and sustainable brands launch into the Chinese market through Xiaohongshu (小红书) campaigns and influencer partnerships. The site is the agency\'s primary online presence — it pitches the service, walks prospective clients through the agency\'s approach, showcases real brand success stories, and captures inbound leads.\n\nI designed and built the full site. It spans several pages — a brand pitch and value proposition, an editorial piece on the Canada–China market opportunity, a step-by-step breakdown of the agency\'s process, a carousel of real cross-border case studies, an FAQ, and separate landing pages tailored to Canadian and Chinese audiences. At the center is a contact form that delivers each submission straight to the founder\'s inbox while sending the prospective client an instant confirmation, so no lead goes unanswered. I built the contact handling securely on the server so the email credentials are never exposed to visitors, and kept the rest of the architecture fast and static.\n\nThe design leans on motion and a soft, organic visual identity — flowing peach-toned background shapes and smooth animations — to convey the warmth and trust the consultancy wants to project to brand partners. The site is live and deployed, built with Next.js and TypeScript.',
    tags: ['React', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/nxu22/BuildTheBridge',
    live: 'https://build-the-bridge-ohje.vercel.app/',
    video: '/buildthebridge.mp4',
  },
]
