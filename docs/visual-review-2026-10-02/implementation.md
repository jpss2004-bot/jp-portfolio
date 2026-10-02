# Visual implementation — 2 October 2026

## Direction

Audience: recruiters and engineers assessing JP's software work. The page should make a working product, an engineering decision, and its evidence easy to find.

Keep the current palette: paper `#f8f9fa`, surface `#ffffff`, ink `#191c23`, secondary ink `#424650`, rules `#dbdee4`, and the existing coral accent. Dark appearance uses the existing corresponding tokens. Product screenshots retain their own colors.

Type: Archivo remains the name's signature; Schibsted Grotesk carries prose and diagram labels; JetBrains Mono carries dates and counts. No new type family.

Layout: one unoccluded artifact beside each project's concise introduction. A small text index replaces the repeated image reel. Screenshots can open at their native resolution. Workflow diagrams use selectable HTML text and stack in reading order on phones.

```
Name + current roles
Project index
Project description | clean screenshot / explicit system diagram
Current experience
Concise method
Summer report
Compact additional work
About + contact
```

The name remains the memorable visual gesture. Evidence supplies the character of the rest: citation requirements, human review, preserved originals, and verified outputs. Avoid fabricated product interfaces, stock object metaphors, and decorative numbering. Numbers appear only where a real process is ordered.

## Scope

1. Replace generated covers and the dimmed CheckWise resting cover. Use labeled authored explanations for confidential systems; retain the real CheckWise recording as an explicitly playable case-study demo.
2. Remove visual duplication and image overlap, shorten the additional-work collection, surface the AARH role, and put adoption ahead of commit totals.
3. Make case-study screenshots inspectable, keep historical figures dated, and align the Summer report's typography, palette, header, and image treatment.
4. Verify EN/ES, desktop/mobile, light/dark, keyboard navigation, reduced motion, asset loading, lint, TypeScript, and the production build. Preserve both one-page résumés, including Trinity College School.

Keep local changes reviewable. Deployment follows the user's production authorization; do not push to GitHub without an explicit request.

## Verification

- Lint, TypeScript and the optimized Next.js build passed. The final source includes a focusable main landmark so the skip link moves keyboard focus.
- 36 Chromium browser views covered both languages, 1440 px desktop and 390 px mobile, light/dark appearance, all seven case studies, and the Summer report. No error overlays, browser errors, broken loaded images or horizontal page overflow. An additional homepage reflow check at 320 px passed.
- 76 internal links/assets returned HTTP 200.
- Header language switching preserves the case-study route. The report's language switch updates the URL, home links and matching resume; work filters and chart mode controls still operate.
- CheckWise video has native playback controls, no autoplay/loop, and decodes at 1280 x 672 after user interaction. Reduced motion disables the name/portrait introduction animations.
- Sampled project prose, status, muted text and captions have contrast ratios of 5.71-8.73 in light appearance and 6.21-10.29 in dark appearance. This is a scoped check, not a whole-site accessibility certification.
- Both resume PDFs are byte-for-byte unchanged, remain one Letter page, and retain Trinity College School. The report's DATA payload is unchanged.
- At the sampled viewport, the English homepage changed from 7,760 to 6,768 px on desktop and from 11,736 to 9,480 px on mobile. The additional AARH experience block is included in these totals.

Browser captures and verification.json accompany this document. All browser verification used Chromium; Safari/iOS was not tested.
