import styles from "./Work.module.css";

export function StageAtmosphere() {
  return <div className={styles.stageWorld} aria-hidden="true"><div className={styles.auraOne} /><div className={styles.auraTwo} /><div className={styles.flowGrid} /><svg className={styles.contours} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" fill="none"><ellipse cx="600" cy="430" rx="590" ry="160" /><ellipse cx="600" cy="430" rx="490" ry="220" /><ellipse cx="600" cy="430" rx="350" ry="300" /><path d="M0 460C210 70 500 80 1200 260M0 560C310 140 650 170 1200 400M0 660C410 290 750 280 1200 540" /></svg><div className={styles.pointerLight} /></div>;
}
