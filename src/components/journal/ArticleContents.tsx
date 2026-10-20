import type { ReactNode } from "react";
import styles from "./Journal.module.css";

export function ArticleContents({ label, children }: { label: string; children: ReactNode }) {
  return <>
    <nav className={styles.contents} aria-label={label}><strong>{label}</strong>{children}</nav>
    <details className={styles.mobileContents}><summary>{label}</summary><nav aria-label={label}>{children}</nav></details>
  </>;
}
