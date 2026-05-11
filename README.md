# JP Samano Portfolio - Signal Atlas Migration

This is JP Samano's personal portfolio website.

## Current Phase

Phase 1: Foundation, Audit, and Stabilization.

The project is being migrated toward the Signal Atlas V1 direction: a bilingual, proof-first, systems-oriented portfolio organized around routes, nodes, proof, and decisions.

## What Phase 1 Protects

- Keeps the current Next.js app running locally.
- Preserves the existing homepage and project routes.
- Fixes the resume file path mismatch.
- Updates obvious stale Portfolio OS labels to Signal Atlas foundation language.
- Keeps changes small before route-level localization and component extraction.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- motion

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Verification

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Phase 1 Rule

Do not push, deploy, or perform a large visual rewrite from this phase alone. Use this as the clean baseline before Phase 2 localization and content-model work.