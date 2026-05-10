export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  category: string;
  status: "Live" | "Prototype" | "Case study" | "In progress";
  role: string;
  year: string;
  priority: number;
  featured: boolean;
  stack: string[];
  problem: string;
  solution: string;
  outcome: string;
  features: string[];
  architecture: string[];
  challenges: string[];
  nextSteps: string[];
  metrics: ProjectMetric[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "savr",
    title: "SAVR · Context-Aware Dining Platform",
    shortTitle: "SAVR",
    summary:
      "A full-stack recommendation platform that helps people choose restaurants based on taste, budget, atmosphere, group context, and the kind of night they want.",
    category: "Full-stack product",
    status: "In progress",
    role: "Product direction, backend API, frontend flows, recommendation logic",
    year: "2026",
    priority: 1,
    featured: true,
    stack: ["FastAPI", "React", "TypeScript", "PostgreSQL", "JWT Auth", "Recommendation Logic"],
    problem:
      "Restaurant discovery is usually generic. It ignores the social context of the night, the user's mood, dietary needs, budget, and atmosphere preferences.",
    solution:
      "SAVR models the dining decision as a context problem. Users can describe their night, build it through guided blocks, or use a surprise flow to receive explainable recommendations.",
    outcome:
      "The platform is becoming a polished case study in applied recommendation systems, onboarding design, and practical full-stack architecture.",
    features: [
      "Describe Your Night free-form recommendation flow",
      "Build Your Night guided preference builder",
      "Surprise Me fast recommendation path",
      "Restaurant and experience metadata model",
      "Authentication, onboarding, and saved user context",
    ],
    architecture: [
      "React and TypeScript frontend with reusable recommendation components",
      "FastAPI backend with modular routes for auth, restaurants, experiences, and recommendations",
      "PostgreSQL-ready data model for users, preferences, restaurants, and recommendation signals",
      "Explainable ranking layer that connects user context to venue metadata",
    ],
    challenges: [
      "Balancing rich preference capture with low-friction onboarding",
      "Keeping recommendation logic understandable instead of black-box",
      "Designing flexible data structures for restaurants, events, dishes, and atmosphere tags",
    ],
    nextSteps: [
      "Add real screenshots and deployment link",
      "Expand venue dataset and event-aware ranking",
      "Add dish-level recommendation explanations",
    ],
    metrics: [
      { label: "Core flows", value: "3" },
      { label: "Stack layers", value: "Full-stack" },
      { label: "Focus", value: "Recs" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/jpss2004-bot/context-aware-dining-platform-1" },
    ],
  },
  {
    slug: "er-triage-queue-manager",
    title: "ER Triage & Queue Manager",
    shortTitle: "ER Triage",
    summary:
      "A clinical workflow prototype for patient intake, nurse vitals, automated priority scoring, queue visibility, and treatment progression.",
    category: "Workflow system",
    status: "Prototype",
    role: "System design, Python implementation, data model, testing workflow",
    year: "2025",
    priority: 2,
    featured: true,
    stack: ["Python", "NiceGUI", "SQLite", "Testing", "Workflow Modeling"],
    problem:
      "Emergency room teams need clear shared visibility into patient status, triage priority, room assignment, and treatment progression.",
    solution:
      "The system centralizes intake, vitals, priority scoring, queue management, and status history into one operational interface.",
    outcome:
      "A working prototype that demonstrates how structured data and focused UI can reduce communication friction in a high-pressure workflow.",
    features: [
      "Patient intake workflow",
      "Nurse vitals entry interface",
      "Automated triage priority scoring",
      "Real-time queue dashboard",
      "Patient status history and treatment progression",
    ],
    architecture: [
      "NiceGUI interface organized around user roles and clinical steps",
      "SQLite persistence for patient records and status history",
      "Priority scoring logic connected to symptoms and vitals",
      "Queue dashboard views derived from live patient state",
    ],
    challenges: [
      "Representing a complex medical workflow without overcomplicating the UI",
      "Keeping status transitions traceable",
      "Designing a prototype that communicates clearly in a class/demo setting",
    ],
    nextSteps: [
      "Add screenshots of each workflow screen",
      "Document the scoring algorithm",
      "Prepare a concise demo video",
    ],
    metrics: [
      { label: "Stages", value: "5" },
      { label: "Database", value: "SQLite" },
      { label: "UI", value: "Dashboard" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/jpsamanosuarez/ER-Tirage-System-COMP-2663-FINAL" },
    ],
  },
  {
    slug: "family-phrase-game",
    title: "Family Phrase Game",
    shortTitle: "Phrase Game",
    summary:
      "A personalized Catchphrase-style web game that uses family-submitted inside jokes and phrases collected through a Google Forms workflow.",
    category: "Deployed web app",
    status: "Live",
    role: "Full-stack implementation, deployment, game flow design",
    year: "2026",
    priority: 3,
    featured: true,
    stack: ["Python", "Flask", "HTML", "CSS", "JavaScript", "Render"],
    problem:
      "Generic party games are fun, but personalized family phrases make the game more emotional, funny, and memorable.",
    solution:
      "The app imports custom phrases, displays one phrase at a time, supports team guessing, and keeps the experience simple enough to run during a family gathering.",
    outcome:
      "A practical deployed project that shows fast execution from idea to working web app.",
    features: [
      "Custom phrase dataset",
      "Game-ready random phrase display",
      "Family-friendly rules and simple scoring flow",
      "Render deployment path",
    ],
    architecture: [
      "Flask backend serving a lightweight web interface",
      "Static frontend for the game experience",
      "Phrase data prepared from Google Forms responses",
    ],
    challenges: [
      "Making the game simple enough to use without instructions",
      "Turning a one-day family idea into a deployable app",
      "Balancing nostalgic party-game feel with a web interface",
    ],
    nextSteps: [
      "Add screenshots and the public Render link",
      "Add import/export tools for phrase lists",
      "Improve mobile play mode",
    ],
    metrics: [
      { label: "Build", value: "MVP" },
      { label: "Deploy", value: "Render" },
      { label: "Input", value: "Forms" },
    ],
    links: [
      { label: "Live app", href: "https://family-phrase-game.onrender.com/" },
    ],
  },
  {
    slug: "adaptive-traffic-ai",
    title: "Adaptive Traffic AI System",
    shortTitle: "Traffic AI",
    summary:
      "A concept for a city-wide AI-driven traffic light system that starts in simulation before attempting real-world traffic optimization.",
    category: "AI systems concept",
    status: "Case study",
    role: "Research direction, system map, simulation-first strategy",
    year: "2025",
    priority: 4,
    featured: false,
    stack: ["Python", "Simulation", "AI Planning", "Data Modeling", "Systems Design"],
    problem:
      "Urban traffic systems often operate as disconnected intersections, which makes congestion difficult to prevent at the city scale.",
    solution:
      "The project proposes a simulation-first environment where an AI system can learn traffic patterns, reason about bottlenecks, and coordinate signal timing across a city map.",
    outcome:
      "A strong systems-thinking case study that connects AI, data collection, simulation, and public infrastructure constraints.",
    features: [
      "Synthetic city traffic simulation plan",
      "Real-time congestion signal model",
      "Predictive bottleneck detection concept",
      "Traffic-light coordination strategy",
    ],
    architecture: [
      "Simulation environment for synthetic vehicle flow",
      "Data collection layer for traffic states and congestion signals",
      "AI reasoning layer for timing recommendations",
      "Dashboard layer for monitoring intersections and interventions",
    ],
    challenges: [
      "Avoiding unrealistic claims before simulation validation",
      "Separating predictive maintenance from adaptive reasoning",
      "Designing safe boundaries for infrastructure automation",
    ],
    nextSteps: [
      "Build a minimal traffic grid simulation",
      "Define traffic state features",
      "Prototype an evaluation dashboard",
    ],
    metrics: [
      { label: "Mode", value: "Sim" },
      { label: "Domain", value: "Mobility" },
      { label: "Scope", value: "City" },
    ],
    links: [],
  },
  {
    slug: "cyber-reporting-assistant",
    title: "Cyber Harassment Reporting Assistant",
    shortTitle: "Cyber Reporting",
    summary:
      "A product concept for helping people document suspicious calls or cyberharassment incidents and generate structured reporting material.",
    category: "Cybersecurity product",
    status: "Case study",
    role: "Product concept, risk classification flow, reporting workflow design",
    year: "2025",
    priority: 5,
    featured: false,
    stack: ["Python", "AI Classification", "Security UX", "Product Design", "Reporting Workflows"],
    problem:
      "People experiencing suspicious calls, extortion attempts, or harassment often do not know how to document evidence clearly or escalate it safely.",
    solution:
      "The assistant concept focuses on organizing incident details, classifying risk level, and generating a structured report that can help the user take safer next steps.",
    outcome:
      "A thoughtful cybersecurity product direction focused on safety, clarity, and responsible automation.",
    features: [
      "Incident detail collection flow",
      "Risk classification concept",
      "Structured report generation",
      "Privacy and consent-aware design assumptions",
    ],
    architecture: [
      "User-facing reporting interface",
      "Classification layer for risk signals",
      "Report generator for structured summaries",
      "Secure storage and deletion policy design",
    ],
    challenges: [
      "Designing with privacy and safety constraints",
      "Avoiding overclaiming legal or emergency capabilities",
      "Making the flow useful without making it intimidating",
    ],
    nextSteps: [
      "Define ethical boundaries and disclaimers",
      "Prototype the report-generation flow",
      "Create a technical architecture diagram",
    ],
    metrics: [
      { label: "Domain", value: "Cyber" },
      { label: "Focus", value: "Safety" },
      { label: "Output", value: "Report" },
    ],
    links: [],
  },
];

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured).sort((a, b) => a.priority - b.priority);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
