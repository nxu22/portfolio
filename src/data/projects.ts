export interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
  video?: string
  videoLink?: string
  demo?: string
  image?: string
}

export const projects: Project[] = [
  {
    title: 'SalesPilot — Multi-Agent Sales Intelligence Assistant',
    description:
      'SalesPilot lets sales teams ask questions about their customers and get back answers drawn from two data sources simultaneously — a PostgreSQL database of orders, accounts, and products, and a library of Markdown contract documents — with every factual claim annotated with its exact source.\n\nThe system is built as a LangGraph pipeline with four nodes. The Orchestrator classifies each incoming question and routes it to the right agents — database, contracts, or both — using Claude\'s tool-use API. The SQL Agent translates natural language into PostgreSQL, validates safety with two independent layers (a sqlparse whitelist at the application level and a read-only database role at the infrastructure level), executes the query, and returns structured results with table citations. The RAG Agent chunks contract documents by section, prepends the account name to each chunk to prevent retrieval confusion across similar contracts, embeds everything into ChromaDB, and retrieves the four most relevant passages with filename citations. The Synthesis node assembles the final answer, grounding every number and claim to its source — and explicitly refuses to answer if neither agent returned supporting data.\n\nThe hardest part was keeping multi-source answers honest. Early versions hallucinated when one agent came back empty. The fix was making the synthesis step source-gated: if a claim can\'t be tied to a specific table or document, the answer says so rather than filling the gap. Correctness is verified by an automated eval harness that runs all four acceptance questions end-to-end, asserting both the answer values and the source citations — including a cross-source check on Q4 that catches the case where SQL returns zero rows and the RAG agent silently fills in both numbers alone. Tracing is handled end-to-end with Langfuse.',
    tags: ['LangGraph', 'Claude API', 'Multi-Agent', 'Agent Orchestration', 'PostgreSQL', 'ChromaDB', 'RAG', 'FastAPI', 'Python', 'Langfuse', 'Eval Harness'],
    github: 'https://github.com/nxu22/salespilot-multi-agent',
    live: 'https://salespilot-multi-agent.onrender.com/',
    video: '/salespilot.mp4',
  },
  {
    title: 'Riverstone Pet Clinic — Voice AI Booking Agent',
    description:
      'River is a real-time inbound voice agent that answers the phone at a veterinary clinic, handles caller questions about services and hours, and books appointments — without a human receptionist. Callers speak naturally; River responds in under a second with a warm, conversational voice and confirms the booking before hanging up.\n\nThe stack has three layers working in concert. Retell handles voice orchestration — streaming audio in and out, managing turn-taking, and calling the FastAPI backend over signature-verified webhooks so no unauthenticated request can trigger a booking. ElevenLabs provides the voice, and Claude Haiku drives the conversation: it reads available time slots from a SQLite database, reasons about the caller\'s preferred time, and either confirms a booking or offers alternatives when the slot is taken.\n\nThe hardest part was keeping latency low enough to feel like a real phone call. The webhook pipeline had to complete — verify signature, query availability, write the booking, return a response — within the window Retell expects before the caller hears dead air. SQLite\'s single-file reads made query time negligible, and keeping the Claude prompt tight (no chain-of-thought, structured output only) kept inference fast.\n\nPost-call automation runs through n8n: once a booking is written, a workflow fires a confirmation email to the client and pushes the appointment into the CRM — no manual follow-up required.',
    tags: ['Retell', 'ElevenLabs', 'Claude API', 'Voice AI', 'FastAPI', 'Python', 'SQLite', 'n8n', 'Webhooks'],
    github: 'https://github.com/nxu22/Riverstone-Pet-Clinic-Voice-AI-Agent',
    videoLink: 'https://streamable.com/wrv0mb',
    image: '/riverstone.png',
  },
  {
    title: 'WildWatch — AI Wildlife Camera Analysis Agent',
    description:
      'WildWatch is an AI agent that watches wildlife camera footage and automatically identifies animals, flags unusual behaviour, and suggests a follow-up action — without a human watching the screen. Upload a video, and the system handles the rest.\n\nThe agent follows a three-stage loop: Perceive → Decide → Act. OpenCV reads the video and samples one frame per second. Claude Fable 5 (Vision) analyzes the frames and returns structured JSON — scientific species name, a noteworthy flag, a one-line observation, and a suggested action. The result is written to SQLite; anything flagged as noteworthy is recorded in a notification log for review.\n\nThe hardest engineering problem was consistency. Early versions returned "goat", "Alpine chamois", and "Chamois" across three runs of the same 30-second clip — three strings for the same animal, causing duplicates and making species tracking useless. I fixed it in three steps: upgrading to claude-fable-5 (which immediately returned the full scientific name "Chamois (Rupicapra rupicapra)" instead of a generic label); switching to multi-frame batching — 3 consecutive frames per Claude call — so the model can cross-reference angles and reduce misidentification; and adding an OpenCV motion filter (cv2.absdiff(), threshold 5.0) that skips static frames entirely, so only active moments reach the model.\n\nAccuracy is validated by eval.py, a repeatable test script that runs a known clip, compares output against expected results, and scores each criterion. On the 30-second chamois clip: ✓ Animal detected · ✓ Species = "Chamois (Rupicapra rupicapra)" · ✓ Noteworthy = True — 3/3, reproducible via docker exec. The FrameSource ABC keeps the pipeline decoupled from the video source, so a live RTSP stream could be swapped in without touching any other code.',
    tags: ['Claude Vision API', 'claude-fable-5', 'OpenCV', 'AI Agent', 'Python', 'FastAPI', 'React', 'Tailwind CSS', 'SQLite', 'Docker'],
    github: 'https://github.com/nxu22/wildwatch',
    live: 'https://wildwatch-eux3.onrender.com/',
    image: '/wildwatch.png',
  },
  {
    title: 'CaseFlow MB — AI-Powered Traffic Defense Case Management',
    description:
      'A full-stack case management system for Manitoba traffic defense law firms — tracking HTA violation cases from intake through resolution, with client profiles and a per-case document library.\n\nThe core feature is a human-in-the-loop AI intake agent built with LangGraph: extracting document details, looking up real HTA statutes, retrieving similar past cases, and drafting a legal memo — then pausing for lawyer review before any DB write. The AI never acts unilaterally on legal work.\n\nAgent state is persisted with PostgresSaver on AWS RDS, surviving server restarts across Gunicorn workers. Also ships an MCP server (FastMCP) exposing case data as agent tools for Claude Desktop, and a public demo endpoint with server-side API key proxying and per-IP rate limiting.\n\nDeployment is fully automated through GitHub Actions: every push to main triggers an SSH deploy to AWS EC2, rebuilding the stack via Docker Compose with zero downtime and no manual server access required. Live demo: caseflowmb.site/demo',
    tags: ['LangGraph', 'MCP', 'Human-in-the-loop', 'Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'AWS', 'Docker', 'GitHub Actions', 'CI/CD', 'Claude API'],
    github: 'https://github.com/nxu22/CaseFlow-MB',
    live: 'https://caseflowmb.site',
    video: '/caseflow.mp4',
  },
  {
    title: 'BuildRight Renovations — AI Agent',
    description:
      'BuildRight is a full-stack AI chatbot built for a fictional home renovation company, designed to turn website visitors into qualified sales leads. Visitors open a chat widget, ask about services and pricing, and get instant, conversational answers — while the business owner automatically receives a summarized lead with the full conversation by email.\n\nI built the entire system end to end. It\'s a true RAG system rather than prompt-stuffing: the renovation knowledge base is embedded with sentence-transformers (all-MiniLM-L6-v2) and stored in a ChromaDB vector store, and on each question the system runs semantic similarity search to pull only the most relevant entries into the prompt before handing off to Claude. That keeps answers grounded in the actual knowledge base — accurate and on-topic instead of generic — so it can walk a customer through quote estimates for a kitchen, bathroom, basement, or flooring project across different budget tiers.\n\nThe backend is a multi-step server-side pipeline. When a visitor shares their contact details, they get an instant confirmation email; when they close the window, the backend is reliably triggered via sendBeacon, calls Claude to summarize the full conversation into structured key points, then assembles and sends the lead email — AI summary, full transcript, and structured customer info — to the owner through the Resend API. I paid particular attention to reliability: the lead still gets delivered even if a visitor abruptly closes the browser, and duplicate notifications are prevented so the owner gets exactly one email per conversation.\n\nThe interface has a deliberately hand-drawn, sketchbook feel — a handwritten font, a coral-and-mint palette, and custom SVG house and tool illustrations — to match the friendly, approachable tone of a local renovation business. The app is live and deployed, built with a React frontend, a Python (FastAPI) backend, and an email integration on a custom domain.',
    tags: ['React', 'Python', 'FastAPI', 'AI Agent', 'Netlify'],
    github: 'https://github.com/nxu22/Buildright_construction',
    live: 'https://buildrightca.space/',
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
