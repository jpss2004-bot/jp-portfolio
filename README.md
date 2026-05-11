# JP Samano - Signal Atlas Portfolio

Production portfolio for JP Samano, built as a bilingual software systems portfolio around the **Signal Atlas** direction: routes, nodes, proof, and technical decisions.

Live site: https://jp-portfolio-beta.vercel.app  
Repository: https://github.com/jpss2004-bot/jp-portfolio

## Purpose

This site is designed for internships, recruiters, technical opportunities, and professional networking. It presents JP's strongest software work through selected projects, case-study pages, resume access, bilingual navigation, and proof-oriented technical storytelling.

## Current Direction

The portfolio follows these principles:

- **Recruiter-first:** resume, contact, selected work, and technical focus are easy to find.
- **Bilingual:** English and Spanish routes are supported through `/en` and `/es`.
- **Proof-first:** projects are structured around problem, role, architecture, decisions, results, and next steps.
- **Systems-oriented:** the design emphasizes workflows, backend/product thinking, and practical implementation.
- **Controlled motion:** visual effects should support Signal Atlas routes/nodes, not become random dashboard decoration.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel deployment

## Routes

```text
/
 /en
 /es
 /en/projects/[slug]
 /es/projects/[slug]
 /projects/[slug] -> redirects to /en/projects/[slug]
 /sitemap.xml
 /robots.txt
```

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000/en
http://localhost:3000/es
```

## Verification

Run before every commit:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Recommended manual checks:

```text
/en
/es
/en/projects/savr
/es/projects/savr
/projects/savr
/sitemap.xml
/robots.txt
resume view/download
mobile navigation
keyboard tab order
```

## Deployment Notes

Set this environment variable in Vercel for Production and Preview:

```text
NEXT_PUBLIC_SITE_URL=https://jp-portfolio-beta.vercel.app
```

The app uses this value for metadata, sitemap, robots, and canonical URL generation.

## Project Proof Roadmap

The next major improvement is expanding project proof media with additional screenshots, diagrams, and demo artifacts:

- SAVR recommendation-flow screenshots and architecture diagram.
- ER Triage queue/dashboard screenshots and triage scoring explanation.
- Family Phrase Game gameplay screenshot and live-app proof.
- Concept projects clearly labeled with diagrams and honest implementation status.

## Current Status

The portfolio is currently in a strong beta state.

Completed work includes:

- Phase 1A-1C: credibility cleanup, resume assets, Spanish encoding/localization cleanup, and repo hygiene.
- Phase 2B: resume-aligned homepage and project content foundation.
- Phase 2C: case-study decision rewrite using tradeoff, decision, and outcome logic.
- Phase 2D: project proof/results and next-iteration rewrite.
- Phase 2 Recovery: repaired broken case-study data and removed old patch clutter.
- Phase 2E: recruiter-polished case-study layout.
- Phase 2F: homepage/case-study consistency attempt, followed by repair of unsafe broad CSS.
- Phase 3B: targeted visual polish using exact component classes.
- Phase 3D: screenshot-based visual QA fixes.
- Phase 3E: final mobile polish pass.

The next meaningful upgrade is Phase 4B - Proof Asset Pack.

The site already has strong structure and visual direction. It now needs more concrete evidence:

- SAVR screenshots and architecture flow.
- ER Triage screenshots and state/priority explanation.
- Family Phrase Game gameplay and mobile proof.
- Honest diagrams for concept projects where live demos do not exist.

