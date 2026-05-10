import { projects } from "@/data/projects";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectBentoCard from "@/components/ui/ProjectBentoCard";

export default function Projects() {
  const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);

  return (
    <section id="projects" className="container-shell py-16 sm:py-24">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="Project systems"
          title="Not just assignments — product-shaped builds."
          description="Each project is framed like a real system: problem, architecture, technical decisions, proof of work, and the next iteration."
        />
        <p className="max-w-sm text-sm leading-7 text-zinc-500">
          The next step is adding screenshots and demos. This patch creates the visual structure that will make that evidence look professional.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {sortedProjects.map((project, index) => (
          <ProjectBentoCard key={project.slug} project={project} large={index === 0} />
        ))}
      </div>
    </section>
  );
}
