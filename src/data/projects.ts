export interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
  video?: string
  demo?: string
}

export const projects: Project[] = [
  {
    title: 'CaseFlow MB — Traffic Defense Case Management System',
    description:
      'CaseFlow MB is a full-stack case management application built for Manitoba traffic defense law firms. Lawyers log in securely and get a real-time view of all active cases — court dates, fine amounts, and case status — with the full lifecycle tracked from intake through to resolution: Open → In Progress → Won / Lost / Dismissed.\n\nThe standout feature is one-click AI document analysis powered by Claude: lawyers upload traffic tickets, court notices, and evidence directly to a private AWS S3 bucket, then hit a single button to get an instant summary that extracts key legal details, flags missing information, and surfaces defense considerations. Document access is handled through presigned URLs so files are never publicly exposed. I built the entire backend as a FastAPI service with SQLAlchemy and PostgreSQL, and the frontend as a Next.js 16 app with TypeScript and Tailwind.\n\nThe application is deployed on AWS: the FastAPI backend runs on EC2 with Gunicorn, the PostgreSQL database is on RDS, and documents are stored in a private S3 bucket. The full stack is containerized with Docker for consistent environments across development and production.',
    tags: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'AWS', 'Docker', 'Claude API', 'Tailwind CSS'],
  },
  {
    title: 'BuildRight Renovations — AI Agent',
    description:
      'BuildRight is a full-stack AI chatbot built for a fictional home renovation company, designed to turn website visitors into qualified sales leads. Visitors open a chat widget, ask about services and pricing, and get instant, conversational answers — while the business owner automatically receives a summarized lead with the full conversation by email.\n\nI built the entire system end to end. It\'s a true RAG system rather than prompt-stuffing: the renovation knowledge base is embedded with sentence-transformers (all-MiniLM-L6-v2) and stored in a ChromaDB vector store, and on each question the system runs semantic similarity search to pull only the most relevant entries into the prompt before handing off to Claude. That keeps answers grounded in the actual knowledge base — accurate and on-topic instead of generic — so it can walk a customer through quote estimates for a kitchen, bathroom, basement, or flooring project across different budget tiers.\n\nThe backend is a multi-step server-side pipeline. When a visitor shares their contact details, they get an instant confirmation email; when they close the window, the backend is reliably triggered via sendBeacon, calls Claude to summarize the full conversation into structured key points, then assembles and sends the lead email — AI summary, full transcript, and structured customer info — to the owner through the Resend API. I paid particular attention to reliability: the lead still gets delivered even if a visitor abruptly closes the browser, and duplicate notifications are prevented so the owner gets exactly one email per conversation.\n\nThe interface has a deliberately hand-drawn, sketchbook feel — a handwritten font, a coral-and-mint palette, and custom SVG house and tool illustrations — to match the friendly, approachable tone of a local renovation business. The app is live and deployed, built with a React frontend, a Python (FastAPI) backend, and an email integration on a custom domain.',
    tags: ['React', 'Python', 'FastAPI', 'AI Agent', 'Netlify'],
    github: 'https://github.com/nxu22/Buildright_construction',
    live: 'https://buildrightforconstruction.netlify.app/',
    video: '/buildright.mp4',
  },
  {
    title: 'Luminary Goods — AI Customer Support Agent on WhatsApp',
    description:
      'A production-style AI customer service agent for an e-commerce home décor brand, deployed on WhatsApp via Meta Cloud API. Built with FastAPI and Anthropic\'s Claude, the agent handles order inquiries, shipping questions, returns, and refund policies in natural English. Features include per-user conversation memory, sliding-window context management, and automatic escalation to human agents when conversations exceed defined business policies or detect customer frustration.',
    tags: ['Python', 'FastAPI', 'Anthropic Claude API', 'Meta WhatsApp Cloud API', 'ngrok'],
    github: 'https://github.com/nxu22/luminary-goods-whatsapp-agent',
    demo: '/demo-slideshow.html',
  },
  {
    title: 'Build The Bridge — Cross-Border Marketing Agency',
    description:
      'Build The Bridge is the website for a cross-border marketing consultancy that helps Canadian natural and sustainable brands launch into the Chinese market through RED NOTE and influencer partnerships. I built and deployed the entire site end to end.\n\nIt\'s a multi-page, client-facing site built with Next.js 15 (App Router) and TypeScript, spanning the service pitch, the agency\'s approach, brand case studies, an FAQ, and dedicated landing pages for different audiences. I used Framer Motion for entrance and scroll-triggered animation, paired with custom hand-drawn SVG backgrounds and gradient lighting for a clean, polished feel, with SEO handled through Next.js\'s native metadata.\n\nLead capture is backed by real server-side logic: /api/contact is a Next.js Route Handler running on Vercel\'s Node.js serverless runtime — it parses the form payload, manages API keys securely through environment variables, and sends two emails through the Resend API (an inquiry notification to the agency and a confirmation to the sender) before returning a structured JSON response.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/nxu22/BuildTheBridge',
    live: 'https://build-the-bridge-ohje.vercel.app/',
    video: '/buildthebridge.mp4',
  },
  {
    title: 'Pale Grain',
    description:
      'Pale Grain is a personal photography portfolio and booking site showcasing film-inspired documentary work across the Canadian landscape, with an integrated portrait-session offering. It\'s both a gallery and a soft sales page — visitors browse the work, then find session pricing and a first-session discount that turns a casual viewer into a potential booking.\n\nI designed and built the whole site, and the part I\'m most pleased with sits behind the scenes: photos come straight off the camera in large HEIF and RAW formats that browsers can\'t display well, so I built a Python pipeline that batch-converts them into fast, web-optimized images. That keeps the gallery sharp but quick to load — important when the work itself is the entire pitch. On the front end, the photos are presented in a masonry gallery with a full-screen lightbox and keyboard navigation, framed-photo styling throughout, and scroll-triggered reveal animations that let each image arrive on its own.\n\nThe whole experience is fully responsive, from the mobile navigation down to the grid layouts, and the site is live and deployed. It\'s built with React and styled by hand with Tailwind.',
    tags: ['React', 'Tailwind', 'Python', 'Netlify'],
    github: 'https://github.com/nxu22/PaleGrainCo',
    live: 'https://palegrain.netlify.app',
    video: '/palegrain.mp4',
  },
  {
    title: 'Strange Light — Animal Lamp Shop',
    description:
      'Strange Light is a full-stack e-commerce application for a handmade lamp shop, built end to end as a complete, production-deployed store. It supports the full customer journey: browsing a product catalog, searching by category, managing a shopping cart, creating an account, and checking out with real credit card payments.\n\nI designed and built the entire application — frontend, database, authentication, and payment processing. The standout piece is a secure Stripe checkout: card payments are processed through a server-side function that creates the payment request before the customer\'s card details are ever collected, with completed orders saved to a PostgreSQL database. I built the interface entirely by hand rather than relying on a UI library, giving the shop a distinctive editorial design with custom animations and four switchable color themes.\n\nThe app is live and deployed, built with React, Supabase (authentication and database), Stripe (payments), and hosted on Vercel.',
    tags: ['React', 'TypeScript', 'Supabase', 'Stripe', 'Vercel'],
    live: 'https://strange-light-shop.vercel.app/',
    video: '/strangelight.mp4',
  },
]
