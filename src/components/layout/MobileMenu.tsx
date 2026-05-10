"use client";

import { useState } from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Toggle navigation menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:border-white/25 hover:bg-white/8"
      >
        Menu
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-full border-b border-white/10 bg-[#0b0f14]/98 px-6 py-5 backdrop-blur-xl">
          <nav className="flex flex-col gap-4 text-sm text-zinc-300">
            <a href="#about" onClick={() => setOpen(false)} className="hover:text-white">
              About
            </a>
            <a href="#projects" onClick={() => setOpen(false)} className="hover:text-white">
              Projects
            </a>
            <a href="#skills" onClick={() => setOpen(false)} className="hover:text-white">
              Skills
            </a>
            <a href="#experience" onClick={() => setOpen(false)} className="hover:text-white">
              Highlights
            </a>
            <a href="#resume" onClick={() => setOpen(false)} className="hover:text-white">
              Resume
            </a>
            <a href="#contact" onClick={() => setOpen(false)} className="hover:text-white">
              Contact
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
