"use client";

import { createContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Locale } from "@/data/i18n";
import styles from "./Work.module.css";

export const MotionPause = createContext(false);

/** Scroll and pointer updates share one frame; continuous loops stay in CSS. */
export function WorkMotion({ children, locale, className = "", showControls = true }: { children: ReactNode; locale: Locale; className?: string; showControls?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const plates = [...root.querySelectorAll<HTMLElement>("[data-work-plate]")];
    const scenes = root.querySelectorAll("[data-motion-scene]");
    if (!plates.length && !scenes.length) return;
    let frame = 0;
    let pointer: { plate: HTMLElement; x: number; y: number } | null = null;
    const draw = () => {
      frame = 0;
      if (paused || media.matches || document.hidden) return;
      const height = window.innerHeight;
      const reads = plates.map(plate => ({plate,rect:plate.getBoundingClientRect()}));
      reads.forEach(({plate,rect}) => {
        const progress = Math.max(0,Math.min(1,(height-rect.top)/(height*.72)));
        plate.style.setProperty("--work-progress",String(progress));
        plate.style.setProperty("--scene-drift",`${Math.max(-1,Math.min(1,(height/2-rect.top-rect.height/2)/height))*34}px`);
        const x = pointer?.plate===plate ? (pointer.x-rect.left)/rect.width-.5 : 0;
        const y = pointer?.plate===plate ? (pointer.y-rect.top)/rect.height-.5 : 0;
        plate.style.setProperty("--tilt-x",`${-y*3}deg`);
        plate.style.setProperty("--tilt-y",`${x*4}deg`);
        plate.style.setProperty("--light-x",`${(x+.5)*100}%`);
        plate.style.setProperty("--light-y",`${(y+.5)*100}%`);
      });
    };
    const schedule = () => { if (!frame && !paused && !media.matches && !document.hidden) frame=requestAnimationFrame(draw); };
    const preference = () => { root.dataset.motion=paused||media.matches||document.hidden?"off":"on"; schedule(); };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || paused || media.matches) return;
      const plate = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-work-plate]") : null;
      pointer=plate?{plate,x:event.clientX,y:event.clientY}:null;
      schedule();
    };
    const leave = () => { pointer=null; schedule(); };
    const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{(entry.target as HTMLElement).dataset.inView=String(entry.isIntersecting);}),{rootMargin:"100px"});
    scenes.forEach(scene=>observer.observe(scene));
    preference();
    window.addEventListener("scroll",schedule,{passive:true});
    window.addEventListener("resize",schedule,{passive:true});
    root.addEventListener("pointermove",move,{passive:true});
    root.addEventListener("pointerleave",leave);
    media.addEventListener("change",preference);
    document.addEventListener("visibilitychange",preference);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);root.removeEventListener("pointermove",move);root.removeEventListener("pointerleave",leave);media.removeEventListener("change",preference);document.removeEventListener("visibilitychange",preference);};
  },[paused]);
  return <MotionPause value={paused}><div ref={ref} className={`${styles.motionRoot} ${className}`}>
    {showControls ? <div className={styles.motionControl}><span>{locale==="es"?"Del producto a la arquitectura":"From the product to the architecture"}</span><button type="button" aria-pressed={paused} onClick={()=>setPaused(value=>!value)}><span aria-hidden="true">{paused?"▶":"Ⅱ"}</span>{locale==="es"?(paused?"Reanudar movimiento":"Pausar movimiento"):(paused?"Resume motion":"Pause motion")}</button></div> : null}
    {children}
  </div></MotionPause>;
}
