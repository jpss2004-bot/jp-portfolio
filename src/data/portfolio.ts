export type ProjectStatus = "Live" | "Prototype" | "Case Study" | "In Progress";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  shortName: string;
  type: string;
  status: ProjectStatus;
  year: string;
  role: string;
  oneLiner: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  proof: string[];
  stack: string[];
  features: string[];
  architecture: string[];
  challenges: string[];
  next: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  links: ProjectLink[];
};

export const profile = {
  name: "JP Samano",
  fullName: "Jose Pablo Samano Suarez",
  title: "Computer Science student building full-stack systems, AI-assisted products, and workflow tools.",
  location: "Nova Scotia, Canada / Mexico City",
  email: "jpss2004@icloud.com",
  github: "https://github.com/jpss2004-bot",
  linkedin: "https://ca.linkedin.com/in/jose-pablo-samano-suarez",
  resume: "/resume/jp-samano-resume-en.pdf",
  availability: "Open to software internships, junior product engineering roles, and practical build collaborations.",
};

export const operatingPrinciples = [
  "Build real systems, not just demos.",
  "Make technical decisions explainable.",
  "Design the workflow before designing the screen.",
  "Show proof: code, screenshots, demos, architecture, and outcomes.",
];

export const stackLayers = [
  {
    layer: "Interface",
    description: "Product surfaces, responsive UI, interaction design, and portfolio-ready presentation.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "UX flows"],
  },
  {
    layer: "Application",
    description: "Routes, server logic, authentication, validation, and feature implementation.",
    tools: ["Python", "FastAPI", "Flask", "REST APIs", "JWT Auth"],
  },
  {
    layer: "Data",
    description: "Persistence, schemas, seed data, state transitions, and domain modeling.",
    tools: ["PostgreSQL", "SQLite", "SQLAlchemy", "Data modeling", "Testing"],
  },
  {
    layer: "Delivery",
    description: "Version control, deployment, documentation, demos, and project storytelling.",
    tools: ["GitHub", "Vercel", "Render", "README docs", "Case studies"],
  },
];

export const timeline = [
  {
    label: "Now",
    title: "Building a professional project portfolio",
    description:
      "Turning full-stack projects, prototypes, and product ideas into polished case studies with evidence, architecture, and public links.",
  },
  {
    label: "2026",
    title: "SAVR and deployed web apps",
    description:
      "Developing context-aware recommendation systems and fast practical web apps that move from concept to implementation.",
  },
  {
    label: "2025",
    title: "Software engineering and workflow systems",
    description:
      "Building projects around triage workflows, AI traffic concepts, cybersecurity reporting, and software design practices.",
  },
  {
    label: "Foundation",
    title: "Computer Science at Acadia University",
    description:
      "Coursework across software engineering, data structures, discrete math, systems, cybersecurity, and human-machine interaction.",
  },
];

export const projects: Project[] = [
  {
    slug: "savr",
    name: "SAVR - Context-Aware Dining Platform",
    shortName: "SAVR",
    type: "Full-stack product",
    status: "In Progress",
    year: "2026",
    role: "Product direction, backend API, frontend flows, data modeling, recommendation logic",
    oneLiner: "A dining recommendation system that understands context, not just cuisine.",
    summary:
      "SAVR helps people choose restaurants and dining experiences based on taste, budget, atmosphere, group context, dietary needs, and the type of night they want.",
    problem:
      "Restaurant discovery is often generic. It usually filters by location or cuisine, but ignores why someone is going out, who they are with, what mood they want, and what constraints actually matter.",
    solution:
      "SAVR treats the dining decision like a context-aware recommendation problem. Users can describe their night, build their night through guided choices, or use a surprise flow to receive explainable recommendations.",
    impact:
      "This is the flagship portfolio project because it combines product thinking, full-stack implementation, recommendation logic, onboarding, and real-world user experience design.",
    proof: [
      "FastAPI backend route structure",
      "React and TypeScript frontend architecture",
      "Authentication and onboarding direction",
      "Recommendation flows for Describe, Build, and Surprise modes",
    ],
    stack: ["FastAPI", "React", "TypeScript", "PostgreSQL", "JWT Auth", "Recommendation Logic"],
    features: [
      "Describe Your Night recommendation flow",
      "Build Your Night structured preference flow",
      "Surprise Me fast discovery path",
      "Restaurant and experience metadata model",
      "Explainable recommendation output",
    ],
    architecture: [
      "Frontend application handles onboarding, recommendation inputs, and result presentation.",
      "Backend API separates auth, restaurants, experiences, and recommendation routes.",
      "Database model supports user preferences, restaurant metadata, atmosphere tags, and future event signals.",
      "Recommendation layer maps user context to venue attributes and explains why a result fits.",
    ],
    challenges: [
      "Capturing enough user context without making onboarding feel heavy.",
      "Designing recommendation logic that is understandable instead of black-box.",
      "Creating a data model flexible enough for venues, dishes, events, budgets, and atmosphere.",
    ],
    next: [
      "Expand the proof gallery with recommendation-result screenshots and an architecture diagram.",
      "Add a live deployed demo once stable.",
      "Add dish-level explanations and event-aware scoring.",
    ],
    metrics: [
      { label: "Core modes", value: "3" },
      { label: "Architecture", value: "Full-stack" },
      { label: "Focus", value: "Recs" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/jpss2004-bot/context-aware-dining-platform-1" },
    ],
  },
  {
    slug: "er-triage-queue-manager",
    name: "ER Triage & Queue Manager",
    shortName: "ER Triage",
    type: "Workflow system",
    status: "Prototype",
    year: "2025",
    role: "System design, Python implementation, data model, workflow logic",
    oneLiner: "A clinical workflow prototype for intake, triage, queues, and treatment state.",
    summary:
      "A Python-based emergency room workflow prototype for patient intake, nurse vitals, automated priority scoring, real-time queue visibility, and treatment progression.",
    problem:
      "Emergency room workflows depend on clear shared visibility. Intake, vitals, priority, room assignment, and treatment progression can become fragmented if they are not represented in one system.",
    solution:
      "The prototype centralizes patient intake, vitals entry, priority scoring, queue monitoring, patient insight pages, and status history.",
    impact:
      "This project shows workflow modeling, interface structure, data persistence, and the ability to convert a real operational problem into a functioning software prototype.",
    proof: [
      "Python application structure",
      "SQLite database model",
      "Patient state and status history",
      "Queue dashboard and role-based workflow screens",
    ],
    stack: ["Python", "NiceGUI", "SQLite", "Testing", "Workflow Modeling"],
    features: [
      "Patient intake workflow",
      "Nurse vitals interface",
      "Automated triage scoring",
      "Real-time queue dashboard",
      "Patient detail and status history pages",
    ],
    architecture: [
      "NiceGUI UI organizes the app around intake, nurse triage, queue monitoring, and admin views.",
      "SQLite persists patient records, vitals, priority, room assignment, and status history.",
      "Priority logic connects symptoms and vitals to a queue position.",
      "Dashboard views present patient state in a way that can be used during a live demo.",
    ],
    challenges: [
      "Representing a high-pressure medical workflow without overcomplicating the interface.",
      "Making status transitions traceable.",
      "Separating demo clarity from real clinical complexity.",
    ],
    next: [
      "Add screen captures of each core workflow.",
      "Document the scoring algorithm clearly.",
      "Create a short demo video for the case study.",
    ],
    metrics: [
      { label: "Workflow stages", value: "5" },
      { label: "Database", value: "SQLite" },
      { label: "Interface", value: "Dashboard" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/jpss2004-bot/ER-Tirage-System-COMP-2663-FINAL" },
    ],
  },
  {
    slug: "family-phrase-game",
    name: "Family Phrase Game",
    shortName: "Phrase Game",
    type: "Deployed web app",
    status: "Live",
    year: "2026",
    role: "Full-stack implementation, game flow design, deployment",
    oneLiner: "A personalized Catchphrase-style game built around real family inside jokes.",
    summary:
      "A deployed Flask web app that lets a family play a personalized guessing game using custom phrases collected through a Google Forms workflow.",
    problem:
      "Generic party games are fun, but they become more meaningful when the content is personal, familiar, and specific to the people playing.",
    solution:
      "The game uses custom phrases submitted by family members, then displays them in a simple web interface for players to describe and guess.",
    impact:
      "This project shows speed of execution, deployment ability, and a practical user-first approach to building something people can actually use.",
    proof: [
      "Live Render deployment",
      "Python Flask backend",
      "Custom phrase workflow",
      "Simple web gameplay loop",
    ],
    stack: ["Python", "Flask", "HTML", "CSS", "JavaScript", "Render"],
    features: [
      "Custom phrase dataset",
      "Random phrase display",
      "Simple game loop",
      "Family-friendly interaction model",
      "Deployment through Render",
    ],
    architecture: [
      "Flask serves the application and routes.",
      "Static frontend presents the game surface.",
      "Phrase data can be prepared from Google Forms responses.",
      "Deployment makes the game accessible from a browser.",
    ],
    challenges: [
      "Making the game simple enough to run during a family event.",
      "Keeping the gameplay close to the classic party-game feeling.",
      "Moving from idea to deployed MVP quickly.",
    ],
    next: [
      "Add phrase import tools.",
      "Improve mobile mode.",
      "Add team scoring and round controls.",
    ],
    metrics: [
      { label: "Status", value: "Live" },
      { label: "Deploy", value: "Render" },
      { label: "Build", value: "MVP" },
    ],
    links: [
      { label: "Live App", href: "https://family-phrase-game.onrender.com/" },
      { label: "GitHub", href: "https://github.com/jpss2004-bot/family-phrase-game" },
    ],
  },
  {
    slug: "adaptive-traffic-ai",
    name: "Adaptive Traffic AI System",
    shortName: "Traffic AI",
    type: "AI systems concept",
    status: "Case Study",
    year: "2025",
    role: "Research direction, simulation plan, system architecture",
    oneLiner: "A simulation-first AI concept for city-wide adaptive traffic light coordination.",
    summary:
      "A system concept for training and testing an AI-driven traffic light coordination model in a simulated city before exploring real-world use.",
    problem:
      "Urban traffic is often managed intersection by intersection, but congestion forms across networks. A smarter system needs to reason about the city as a connected environment.",
    solution:
      "The project starts with a digital city simulation that can generate synthetic traffic data, test signal strategies, and evaluate adaptive behavior safely.",
    impact:
      "This case study shows systems thinking, AI planning, simulation-first development, and responsible boundaries around infrastructure automation.",
    proof: [
      "Mental model for data collection and preparation",
      "Simulation-first development strategy",
      "AI reasoning system concept",
      "Evaluation and dashboard direction",
    ],
    stack: ["Python", "Simulation", "AI Planning", "Data Modeling", "Systems Design"],
    features: [
      "Synthetic city simulation plan",
      "Traffic state data model",
      "Congestion and bottleneck reasoning",
      "Adaptive signal timing concept",
      "Evaluation dashboard direction",
    ],
    architecture: [
      "Simulation environment creates traffic states and vehicle flow.",
      "Data layer captures intersections, wait times, density, and congestion signals.",
      "AI layer proposes signal adjustments based on network state.",
      "Dashboard layer visualizes intersections, interventions, and outcomes.",
    ],
    challenges: [
      "Avoiding unrealistic claims before simulation validation.",
      "Designing safe constraints for autonomous infrastructure decisions.",
      "Separating predictive analysis from real adaptive control.",
    ],
    next: [
      "Build the first minimal grid simulation.",
      "Define baseline algorithms for comparison.",
      "Create an evaluation dashboard.",
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
    name: "Cyber Harassment Reporting Assistant",
    shortName: "Cyber Reporting",
    type: "Cybersecurity product",
    status: "Case Study",
    year: "2025",
    role: "Product concept, security UX, reporting workflow design",
    oneLiner: "A safety-focused assistant for documenting suspicious calls and cyberharassment reports.",
    summary:
      "A product concept for helping people organize incident details, classify risk signals, and generate structured reporting material for suspicious calls or cyberharassment situations.",
    problem:
      "People facing suspicious calls or online harassment often do not know how to document what happened clearly or what information matters.",
    solution:
      "The assistant guides the user through incident capture, risk classification, and structured report generation while respecting privacy and safety constraints.",
    impact:
      "This case study shows cybersecurity product thinking, safety-aware UX, and practical reporting workflow design.",
    proof: [
      "Incident collection flow concept",
      "Risk classification model direction",
      "Structured report generation idea",
      "Privacy-aware system boundaries",
    ],
    stack: ["Python", "AI Classification", "Security UX", "Product Design", "Reporting Workflows"],
    features: [
      "Incident intake flow",
      "Risk signal classification",
      "Structured report generation",
      "Privacy and consent assumptions",
      "Safety-focused user guidance",
    ],
    architecture: [
      "User interface collects incident details in a structured way.",
      "Classification layer identifies urgency and risk signals.",
      "Report generator converts details into organized documentation.",
      "Storage rules define deletion, privacy, and access boundaries.",
    ],
    challenges: [
      "Designing responsibly around sensitive situations.",
      "Avoiding overclaiming legal or emergency capabilities.",
      "Making the tool helpful without making it intimidating.",
    ],
    next: [
      "Prototype the report flow.",
      "Define ethical and legal boundaries.",
      "Create architecture diagrams and sample outputs.",
    ],
    metrics: [
      { label: "Domain", value: "Cyber" },
      { label: "Focus", value: "Safety" },
      { label: "Output", value: "Report" },
    ],
    links: [],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.slice(0, 3);
}
