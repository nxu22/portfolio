export interface Project {
  title: string
  description: string
  tags: string[]
  /** Position in a progression group, e.g. 'Managed' → 'Self-hosted' → 'Provider-agnostic' */
  stage?: string
  github?: string
  live?: string
  /** Display string, e.g. '(431) 830-7788' — dialled via tel: */
  phone?: string
  video?: string
  videoLink?: string
  demo?: string
  image?: string
}

export interface ProjectGroup {
  label: string
  /** Short label for the sticky top nav */
  nav: string
  thesis: string
  /** Render the cards as an ordered arc rather than a flat set */
  progression?: boolean
  projects: Project[]
}

export const projectGroups: ProjectGroup[] = [
  {
    label: 'Multi-Agent Systems',
    nav: 'Agents',
    thesis: 'Built them, then measured them — and found the obvious optimisations were the wrong ones.',
    projects: [
      {
        title: 'SalesPilot — Multi-Agent Sales Intelligence Assistant',
        description:
          'A multi-agent SQL + RAG pipeline (LangGraph, parallel fan-out via the Send API) that I instrumented end to end — Prometheus + Grafana for aggregate health, Langfuse for per-request traces — and then actually read the numbers. Two optimisations that looked obvious beforehand turned out to be worthless.\n\nThe database is 2.6% of SQL agent latency. The other ~97% is Claude turning the question into SQL — so indexes, query tuning, and connection pooling would not have moved the needle. The cost is generation, not execution. Separately, "retrieval" in the RAG agent is 99.9% a remote Voyage embedding call; local vector search over ~240 chunks is sub-millisecond, so TOP_K and ChromaDB are not the lever — caching query embeddings is. The orchestrator runs a 22.4:1 input-to-output token ratio against a fixed system prompt, which is the textbook case for prompt caching. Cost lands at $0.0023 per question on Haiku 4.5 across all three model calls.\n\nThe database was the obvious suspect for SQL latency. TOP_K was the obvious knob for retrieval latency. Neither would have helped, and I would have spent a day finding that out by hand.\n\nCorrectness is gated by two eval suites run before any commit that touches the graph: retrieval accuracy (does the right contract file come back?) and end-to-end answer correctness with source grounding. 5/5 acceptance questions pass — including one the system must refuse ("What\'s the weather like today?"). That refusal test is the one that matters: a system that answers it is a system that will invent a discount rate. The refusal rate metric sits at 22.6%, matching the deliberately-unanswerable share of generated traffic, so drift becomes visible.\n\nAn LLM writing SQL is an injection surface, so validation alone is not enough. Two independent layers: sqlparse verifies the generated statement is exactly one SELECT before it reaches the database, and the agent connects as sp_readonly — a role with SELECT-only grants, so writes are impossible even if validation is bypassed. Metric labels are kept to bounded values; nothing is labelled with a question, user, or session.\n\nHonest limits: the dashboard figures come from 31 requests, so ratios are trustworthy but P95 latencies are directional only. Prompt caching is identified but not yet implemented. Evals are run by hand, not wired to CI. Cost tracking covers Anthropic but not Voyage embedding spend.',
        tags: ['LangGraph', 'Claude Haiku 4.5', 'Multi-Agent', 'Observability', 'Prometheus', 'Grafana', 'Langfuse', 'Eval Harness', 'PostgreSQL', 'ChromaDB', 'RAG', 'FastAPI', 'Python'],
        github: 'https://github.com/nxu22/salespilot-multi-agent',
        live: 'https://salespilot-multi-agent.onrender.com/',
      },
      {
        title: 'CaseFlow MB — Multi-Tenant AI Case Management',
        description:
          'A multi-tenant case management system where each firm\'s data is isolated at the database level, not in application code. The application sets a per-request tenant GUC, and PostgreSQL Row Level Security policies filter every query to that firm\'s rows — so even a compromised or malformed query cannot leak another firm\'s records. Covered by 36 cross-tenant isolation tests.\n\nThe reason isolation lives in the database rather than in a WHERE clause: application-level tenancy is one forgotten filter away from a breach, and legal case data is exactly the kind of data where that is unrecoverable. Pushing the boundary into RLS means the guarantee holds even when the code above it is wrong.\n\nThe core feature is a human-in-the-loop AI intake agent built with LangGraph: extracting document details, looking up real HTA statutes, retrieving similar past cases, and drafting a legal memo — then pausing for lawyer review before any DB write. The AI never acts unilaterally on legal work.\n\nAgent state is persisted with PostgresSaver on AWS RDS, surviving server restarts across Gunicorn workers. Also ships an MCP server (FastMCP) exposing case data as agent tools for Claude Desktop, and a public demo endpoint with server-side API key proxying and per-IP rate limiting. Deployment is fully automated through GitHub Actions: every push to main triggers an SSH deploy to AWS EC2, rebuilding the stack via Docker Compose with zero downtime and no manual server access required.',
        tags: ['Multi-Tenancy', 'PostgreSQL RLS', 'LangGraph', 'MCP', 'Human-in-the-loop', 'AWS', 'Docker', 'GitHub Actions', 'CI/CD', 'Next.js', 'TypeScript', 'FastAPI'],
        github: 'https://github.com/nxu22/CaseFlow-MB',
        live: 'https://caseflowmb.site',
        videoLink: 'https://www.youtube.com/watch?v=cLSdcHbBs-o',
      },
    ],
  },
  {
    label: 'Real-Time Voice',
    nav: 'Voice',
    thesis: 'I moved one layer down, twice, on purpose — each time to see what the layer above had been hiding.',
    progression: true,
    projects: [
      {
        title: 'Riverstone Pet Clinic — Voice Booking Agent',
        stage: 'Managed',
        description:
          'A real-time inbound voice agent that answers the phone at a veterinary clinic, handles caller questions about services and hours, and books appointments — without a human receptionist. Callers speak naturally; River responds in under a second and confirms the booking before hanging up.\n\nOrchestration is Retell — a managed platform that streams audio in and out, manages turn-taking, and calls the FastAPI backend over signature-verified webhooks so no unauthenticated request can trigger a booking. ElevenLabs provides the voice, and Claude Haiku drives the conversation: it reads available slots from SQLite, reasons about the caller\'s preferred time, and either confirms or offers alternatives.\n\nThe hardest part was latency. The webhook pipeline had to complete — verify signature, query availability, write the booking, return a response — inside the window Retell allows before the caller hears dead air. SQLite\'s single-file reads made query time negligible, and keeping the Claude prompt tight (no chain-of-thought, structured output only) kept inference fast.\n\nPost-call automation runs through n8n: once a booking is written, a workflow fires a confirmation email and pushes the appointment into the CRM.\n\nWhat this project could not tell me: why a call felt slow when it did. That question is what led to Togo.',
        tags: ['Retell', 'ElevenLabs', 'Claude API', 'Voice AI', 'FastAPI', 'Python', 'SQLite', 'n8n', 'Webhooks'],
        videoLink: 'https://streamable.com/wrv0mb',
        image: '/riverstone.png',
      },
      {
        title: 'Togo Voice Intake — Self-Hosted Real-Time Voice Agent',
        stage: 'Self-hosted',
        description:
          'A production inbound voice agent you can actually call. I built it because I wanted to understand what Retell had been doing for me. Riverstone shipped fast on a managed platform, but when a call felt slow I could not see why — transport, turn-taking, and the latency budget were all behind someone else\'s abstraction. So I rebuilt the same problem on LiveKit + Deepgram + Cartesia to find out.\n\nWhat I got back was the time budget itself. Transport setup, first STT partial, LLM first token, first audio byte out — each one is now a number I can measure and move, instead of a black box I could only hope was fast.\n\nLiveKit handles the real-time session and audio transport, so the WebRTC lifecycle is mine. Deepgram streams speech-to-text with interim results, which means the agent can begin reacting before the caller finishes a sentence — that is what makes barge-in feel natural rather than rude. Cartesia synthesises the reply with low time-to-first-byte, the number that decides whether a call feels conversational or feels like a phone tree.\n\nThe honest trade: this took considerably longer to build than the managed version, and for a simple booking flow Retell would still be the right commercial choice. What self-hosting bought was not a better demo — it was knowing where every millisecond goes.\n\nDeployed and reachable on a real phone number. Not a demo video, an actual call.',
        tags: ['LiveKit', 'Deepgram', 'Cartesia', 'WebRTC', 'Real-Time Voice', 'Streaming STT', 'Barge-in', 'Python', 'Production'],
        phone: '(431) 830-7788',
      },
      {
        title: 'TTS Gateway — Provider-Agnostic Speech Synthesis Layer',
        stage: 'Provider-agnostic',
        description:
          'Building now. A gateway that pulls the TTS provider out from under the voice agents above — one interface, swappable synthesis backends — so an outage, a price change, or a better model shipping elsewhere is a config edit rather than a rewrite.\n\nThe reason it exists: after running Togo directly on Cartesia, the provider stopped being an implementation detail and started being a dependency. A single vendor sitting on the hot path of a live phone call is a single point of failure, with no fallback and no way to compare alternatives without touching application code.\n\nWhat makes it infrastructure rather than a wrapper is the behaviour around the call, not the call itself: timeout and retry policy, automatic fallback to a secondary provider when the primary fails or stalls, and a measured time-to-first-audio-byte comparison across backends so the choice gets made on data instead of on marketing pages.',
        tags: ['Inference Infrastructure', 'Provider Gateway', 'Failover', 'Streaming', 'Latency Benchmarking', 'Python', 'In Progress'],
        github: 'https://github.com/nxu22/tts-gateway',
      },
    ],
  },
  {
    label: 'Vision',
    nav: 'Vision',
    thesis: 'Getting a non-deterministic model to answer the same way twice.',
    projects: [
      {
        title: 'WildWatch — AI Wildlife Camera Analysis Agent',
        description:
          'An agent that watches wildlife camera footage, identifies species, flags noteworthy behaviour, and suggests a follow-up action. Building it was not the interesting part — making it reproducible was. Early versions returned "goat", "Alpine chamois", and "Chamois" across three runs of the same 30-second clip: three strings for one animal, which made species tracking useless.\n\nI fixed it three ways. Upgrading the vision model returned full scientific names ("Chamois (Rupicapra rupicapra)") instead of generic labels. Multi-frame batching — 3 consecutive frames per call — let the model cross-reference angles instead of guessing from a single frame. An OpenCV motion filter (cv2.absdiff, threshold 5.0) skips static frames entirely, so only active moments reach the model at all.\n\nThe fix is held in place by eval.py: a repeatable script that runs a known clip and scores each criterion. 3/3 on the chamois clip, reproducible via docker exec. A FrameSource ABC keeps the pipeline decoupled from the video source, so a live RTSP stream could be swapped in without touching anything else.',
        tags: ['Claude Vision API', 'Eval Harness', 'OpenCV', 'AI Agent', 'Python', 'FastAPI', 'SQLite', 'Docker'],
        github: 'https://github.com/nxu22/wildwatch',
        live: 'https://wildwatch-eux3.onrender.com/',
        image: '/wildwatch.png',
      },
    ],
  },
]
