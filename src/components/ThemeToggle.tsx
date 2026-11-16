"use client";

/** Switches between light and dark and remembers the choice on this device. */
export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const current = root.dataset.theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { window.localStorage.setItem("theme", next); } catch { /* The choice still applies for this visit. */ }
  };
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      <svg className="theme-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      <svg className="theme-moon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
    </button>
  );
}
