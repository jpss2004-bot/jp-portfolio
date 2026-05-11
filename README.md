# JP Samano â€” Signal Atlas Portfolio

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

The next major improvement is replacing temporary project visuals with real proof media:

- SAVR recommendation-flow screenshots and architecture diagram.
- ER Triage queue/dashboard screenshots and triage scoring explanation.
- Family Phrase Game gameplay screenshot and live-app proof.
- Concept projects clearly labeled with diagrams and honest implementation status.

## Patch Status

- Patch A: Critical encoding, metadata, sitemap, robots, and README cleanup.
- Patch B: Visual clarity pass for hero, header, spacing, card alignment, readability, and responsive layout.
- Patch C: Proof and case-study upgrade with proof gallery structure, architecture placeholders, and contrast safeguards.
- Patch D.1: Redesigned cohesive Signal Atlas motion system, integrated background, desktop journey rail, and restrained 3D depth.
- Next: Patch E will handle final QA, recruiter readiness, SEO/social preview, mobile checks, and repository cleanup.



