# Résumé

`resume-en.html` is the source of the English résumé and `resume-es.html` its faithful Spanish translation. Maintain the same facts, section order, and emphasis in both. Both share `resume.css`.

Edit the HTML, then run:

    scripts/resume/print.sh

It prints `public/resume/jp-samano-resume-en.pdf` and `-es.pdf` with headless Chrome. Keep each to one page. The public PDFs deliberately omit the phone number.

Both languages use the same locally bundled Libre Franklin fonts and print styles. The contact row wraps inside the Letter page instead of forcing Chrome to shrink each language to a different scale. Fonts live in `fonts/` with their SIL Open Font License, so printing does not depend on a Google Fonts request.

## Content refresh — 2 October 2026

- Added the Research Assistant role at Acadia AIoT Research Hub (AARH), beginning September 2026. Acadia's [team listing](https://aarh.acadiau.ca/team.html) confirms the role and organization. The owner's LinkedIn announcement, visible in an indexed [public reaction feed](https://mx.linkedin.com/in/franme/en), describes experimentation, testing, and validation of connected systems. September onboarding correspondence corroborates the start month. This is a new role: do not add completed research outcomes without evidence.
- Updated CheckWise to Next.js 16 and current product scope. The portfolio's `src/data/content.ts` documents the business metrics, portals, live SAT checks, and 33-lesson academy; these business figures are a September 11 snapshot. September 30 release evidence in the owner's CheckWise workspace records 9,941 backend and 4,773 frontend tests passing. These are dated test-run counts, not coverage percentages or user metrics.
- Prioritized current experience, selected projects, education/training, and skills. Removed the repeated profile, 2023 data-entry role, and smaller projects to make room for larger body text and clearer spacing on one Letter page. Retained Trinity College School (Port Hope, ON, 2023) at the owner's request.
- Coursework labeled CompTIA Security+ and CySA+ remains training, not a claim of certification. Public contact details have clickable email, portfolio, LinkedIn, and GitHub links.

After printing, verify both PDFs have one page, matching font sizes, intact accents, and working links. Render and visually inspect both pages; do not rely on page count alone.
