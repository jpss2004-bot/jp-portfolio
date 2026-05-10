import SectionHeader from "@/components/ui/SectionHeader";
import StackMap from "@/components/ui/StackMap";

export default function Skills() {
  return (
    <section id="skills" className="container-shell py-16 sm:py-24">
      <SectionHeader
        eyebrow="Technical stack"
        title="Skills presented as a system map."
        description="Instead of a generic list of badges, the stack is organized by how software actually gets built: interface, backend, architecture, and deployment."
      />
      <div className="mt-10">
        <StackMap />
      </div>
    </section>
  );
}
