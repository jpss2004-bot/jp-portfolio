import { siteConfig } from "@/data/site";
import SectionHeader from "@/components/ui/SectionHeader";
import ButtonLink from "@/components/ui/ButtonLink";

export default function Contact() {
  return (
    <section id="contact" className="container-shell py-20 sm:py-24">
      <div className="panel rounded-[2rem] p-8 sm:p-10">
        <SectionHeader
          eyebrow="Contact"
          title="Let’s connect and build something thoughtful."
          copy="I’m open to opportunities, collaborations, and conversations about software, systems, and product ideas."
        />

        <div className="mt-2 flex flex-wrap gap-4">
          <ButtonLink href={`mailto:${siteConfig.email}`} variant="primary">
            {siteConfig.email}
          </ButtonLink>
          <ButtonLink href={siteConfig.links.github}>GitHub</ButtonLink>
          <ButtonLink href={siteConfig.links.linkedin}>LinkedIn</ButtonLink>
        </div>
      </div>
    </section>
  );
}
