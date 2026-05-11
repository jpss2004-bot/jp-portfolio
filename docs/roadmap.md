# JP Portfolio Roadmap - Signal Atlas V1

## Current phase

- Phase 1: Foundation, Audit, and Stabilization

## Signal Atlas V1 phases

1. Foundation, Audit, and Stabilization
   - Verify clean install, lint, TypeScript, and build.
   - Fix broken resume path handling.
   - Preserve working behavior.
   - Remove obvious stale Portfolio OS labels.

2. Content Model, Localization, and Site Architecture
   - Add route-level locale structure.
   - Move from a client-side language toggle to /en and /es routes.
   - Upgrade project content into proof-first case-study data.

3. Visual System and Global Shell
   - Add Signal Atlas tokens, typography, layout shell, header, accessible navigation, and reduced-motion rules.

4. Homepage Signal Atlas Experience
   - Build HeroAtlas, proof strip, featured systems, project proof grid, resume panel, and contact CTA.

5. Case Studies, Polish, QA, and V1 Readiness
   - Build localized case-study pages, galleries, decision logs, metadata, Open Graph, performance checks, and final QA.

## Guardrails

- Do not push to GitHub unless explicitly requested.
- Do not deploy unless explicitly requested.
- Prefer safe incremental patches.
- Run verification after each phase.
- Preserve working behavior before visual polish.