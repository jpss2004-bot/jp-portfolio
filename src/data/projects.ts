export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  status: string;
  role: string;
  stack: string[];
  problem: string;
  outcome: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "savr",
    title: "SAVR / Context-Aware Dining Platform",
    summary:
      "A context-aware dining platform designed to personalize restaurant discovery through user preferences, context, recommendation logic, and strong product presentation.",
    category: "Featured",
    status: "In Progress",
    role: "Full-stack product builder",
    stack: ["Python", "React", "Recommendations", "UX/Product"],
    problem:
      "Restaurant discovery is often generic and disconnected from mood, context, budget, and user intent.",
    outcome:
      "Built as a structured product concept and software system with recommendation-focused logic and a strong user-centered direction.",
    featured: true,
  },
  {
    slug: "er-triage-queue-manager",
    title: "ER Triage & Queue Manager",
    summary:
      "A healthcare workflow tool focused on organizing triage visibility, patient flow, and queue management through a structured system design approach.",
    category: "Featured",
    status: "In Progress",
    role: "Backend and systems-focused developer",
    stack: ["Python", "SQLite", "NiceGUI", "System Design"],
    problem:
      "Patient queue visibility and triage workflows can become difficult to manage cleanly without structured system support.",
    outcome:
      "Designed as a modular healthcare operations tool with emphasis on clarity, usability, and maintainable architecture.",
    featured: true,
  },
  {
    slug: "adaptive-traffic-ai",
    title: "Adaptive Traffic AI System",
    summary:
      "A city-scale concept for AI-driven traffic light coordination, focusing on congestion reasoning, system-wide adaptation, and real-time decision support.",
    category: "Featured",
    status: "Concept / Research",
    role: "Systems designer and concept developer",
    stack: ["AI Systems", "Traffic Modeling", "Data Thinking"],
    problem:
      "Urban traffic systems often react locally instead of reasoning globally across the full city network.",
    outcome:
      "Developed as a forward-looking systems concept centered on coordinated intelligence, simulation, and adaptive response.",
    featured: true,
  },
  {
    slug: "cyber-reporting-assistant",
    title: "Cyber Harassment Reporting Assistant",
    summary:
      "A product concept for analyzing suspicious calls, classifying risk, and helping generate structured reporting workflows for users in Mexico City.",
    category: "Selected Work",
    status: "Concept / Product Design",
    role: "Product thinker and technical planner",
    stack: ["AI", "Risk Classification", "Product Design"],
    problem:
      "People facing suspicious calls or cyber-harassment often lack a guided, structured path to analyze and report incidents.",
    outcome:
      "Planned as an applied AI product with civic value, focused on accessibility, reporting flow, and real-world usefulness.",
    featured: false,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
