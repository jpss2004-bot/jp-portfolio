# Résumé

`resume-en.html` is the source of the English résumé and `resume-es.html` its faithful Spanish translation. Maintain the same facts, section order, and emphasis in both. Both share `resume.css`.

Edit the HTML, then run:

    python3 scripts/resume/build.py

Requires ReportLab and pypdf. The builder prints `public/resume/jp-samano-resume-en.pdf` and `-es.pdf` without a browser or network requests. It fails if either résumé exceeds one Letter page or loses a required project. Public PDFs deliberately omit the phone number.

Both languages share the same classic single-column format: centered identity and contact details, education first for internship recruiting, thin section rules, right-aligned dates and 10.5-point body text. Liberation Serif is embedded from `fonts/` with its SIL Open Font License, ensuring accents and bold/italic weights render consistently. `resume.css` mirrors that layout for the HTML preview. `print.sh` is an optional older Chrome export workflow; the public PDFs use the Python builder.

## Content refresh — 2 October 2026

- Added the Research Assistant role at Acadia AIoT Research Hub (AARH), beginning September 2026. Acadia's [team listing](https://aarh.acadiau.ca/team.html) confirms the role and organization. The owner's LinkedIn announcement, visible in an indexed [public reaction feed](https://mx.linkedin.com/in/franme/en), describes experimentation, testing, and validation of connected systems. September onboarding correspondence corroborates the start month. This is a new role: do not add completed research outcomes without evidence.
- Updated CheckWise to Next.js 16 and current product scope. The portfolio's `src/data/content.ts` documents the business metrics, portals, live SAT checks, and 33-lesson academy; these business figures are a September 11 snapshot. September 30 release evidence in the owner's CheckWise workspace records 9,941 backend and 4,773 frontend tests passing. These are dated test-run counts, not coverage percentages or user metrics.
- Prioritized current experience, selected projects, education/training, and skills. Removed the repeated profile, 2023 data-entry role, and smaller projects to make room for larger body text and clearer spacing on one Letter page. Retained Trinity College School (Port Hope, ON, 2023) at the owner's request.
- Coursework labeled CompTIA Security+ and CySA+ remains training, not a claim of certification. Public contact details have clickable email, portfolio, LinkedIn, and GitHub links.

After printing, verify both PDFs have one page, matching font sizes, intact accents, and working links. Render and visually inspect both pages; do not rely on page count alone.

## Content refresh — 20 October 2026

- The owner clarified that his Acadia contribution is frontend, UX and visual-design leadership and implementation. This supersedes the generic contribution wording in the October 2 note above; preserve the formal Research Assistant role.
- Feature CheckWise, Neyvu and Verifaid in both languages. Neyvu is a working pilot onboarding users; do not invent adoption or revenue figures.
- Keep CheckWise business figures explicitly dated to September and the 9,941/4,773 test baseline dated to September 2026. Describe the October 19 contract work separately.
- Distinguish implemented Verifaid PDF issuance from electronic signing, and the completed LegalShelf site from platform/AI work still in progress.
- `build.py` verifies a single Letter page, required project names and required project names. Render both pages and inspect links after editing. The older DOCX files in docs/resume are historical exports, not the maintained sources of the current public PDFs.

## Format research — 20 October 2026

Compared the July 13 (`3ea6e77`), September 11 (`8c4234b`) and October 2 (`214f755`) public PDFs. July used a centered identity and clear section rules; October used a large left-aligned sans-serif header and denser body copy.

The current layout restores the earlier structure while increasing the body text to 10.5 points. References:

- Harvard MCS [technology example](https://careerservices.fas.harvard.edu/resources/harvard-college-resume-example-tech/) and its current [July 2026 PDF](https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2026/07/Harvard-College-CS-Resume-Example.pdf): centered identity, education near the top, simple single column, dates at right, specific contributions.
- Harvard MCS [bullet-point template](https://careerservices.fas.harvard.edu/resources/bullet-point-resume-template/): conventional headings and concise accomplishment bullets.
- MIT CAPD [résumé toolkit](https://cdn.uconnectlabs.com/wp-content/uploads/sites/123/2025/01/MIT-CAPDs-Career-Toolkit-Crafting-an-effective-resume.pdf): legible body text and consistent margins.

These are career-center references, not evidence of a universally highest-converting template. No ATS score or interview guarantee is claimed.

The owner confirmed Trinity College School was his high school: football captain for two years, back-to-back Lineman of the Year awards, and the Leadership Award in his final year. Keep these honors in both languages without inventing seasons or additional award names.
