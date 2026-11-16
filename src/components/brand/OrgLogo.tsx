import Image from "next/image";
import styles from "./OrgLogo.module.css";

type Org = "legalshelf" | "acadia";

const logos: Record<Org, { light: string; dark: string; width: number; height: number; alt: string }> = {
  legalshelf: { light: "/brand/legalshelf-logo.svg", dark: "/brand/legalshelf-logo-white.svg", width: 240, height: 37, alt: "LegalShelf" },
  acadia: { light: "/brand/acadia-logo.svg", dark: "/brand/acadia-logo-white.svg", width: 648, height: 152, alt: "Acadia University" },
};

/** An organisation's real logo, with its reverse version in dark mode. */
export function OrgLogo({ org, className = "", decorative = false }: { org: Org; className?: string; decorative?: boolean }) {
  const logo = logos[org];
  const alt = decorative ? "" : logo.alt;
  return (
    <span className={`${styles.logo} ${styles[org]} ${className}`}>
      <Image className={styles.light} src={logo.light} alt={alt} width={logo.width} height={logo.height} unoptimized />
      <Image className={styles.dark} src={logo.dark} alt="" aria-hidden="true" width={logo.width} height={logo.height} unoptimized />
    </span>
  );
}

/** The LegalShelf isotype on its own. */
export function LegalShelfMark({ className = "" }: { className?: string }) {
  return <Image className={className} src="/brand/legalshelf-mark.svg" alt="" width={32} height={32} unoptimized />;
}
