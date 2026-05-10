export const siteConfig = {
  name: "JP Samano",
  shortName: "JP",
  title: "JP Samano | Full-Stack Systems Portfolio",
  description:
    "A command-center portfolio for JP Samano: full-stack software systems, AI product thinking, and real-world workflow tools.",
  url: "http://localhost:3000",
  location: "Nova Scotia, Canada · Mexico City",
  status: "Open to software internships, product engineering opportunities, and technical collaborations.",
  email: "jpss2004@icloud.com",
  links: {
    github: "https://github.com/jpsamanosuarez",
    linkedin: "https://ca.linkedin.com/in/jose-pablo-samano-suarez",
    resume: "/resume.pdf",
  },
  hero: {
    eyebrow: "JP Samano · Software Builder · Systems Thinker",
    headline: "I turn messy real-world workflows into clear, usable software systems.",
    supporting:
      "Computer Science student building full-stack applications, AI-assisted products, and workflow tools with strong technical foundations and polished user experience.",
    command: "Inspect JP's project systems",
    highlights: [
      "Full-stack engineering",
      "AI product thinking",
      "Workflow automation",
      "Human-centered interfaces",
    ],
  },
  nav: [
    { label: "Projects", href: "#projects" },
    { label: "Stack", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
