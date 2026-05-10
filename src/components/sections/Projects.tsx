import { projects } from "@/data/projects";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import ProjectCard from "@/components/ui/ProjectCard";
import SpotlightPanel from "@/components/ui/SpotlightPanel";

export default function Projects() {
  const featuredProjects = projects.filter((project) => project.featured);
  const selectedProjects = projects.filter((project) => !project.featured);

  const filters = [
    "Featured",
    "Backend",
    "AI",
    "Systems Design",
    "Product Thinking",
  ];

  return (
    <section id="projects" className="container-shell py-20 sm:py-24">
      <SectionHeader
        eyebrow="Projects"
        title="Selected systems and product work"
        copy="A curated set of projects and concepts that reflect how I think about software, systems, user context, and real-world applications."
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <Badge key={filter} tone={index === 0 ? "accent" : "neutral"}>
            {filter}
          </Badge>
        ))}
      </div>

      <SpotlightPanel className="p-1">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </SpotlightPanel>

      {selectedProjects.length ? (
        <div className="mt-14">
          <div className="mb-8">
            <p className="section-eyebrow">More Work</p>
            <h3 className="text-2xl font-semibold text-white">Additional concepts and direction</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {selectedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} compact />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
