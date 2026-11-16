Journal publishing with Codex

Entries live in content/journal/*.json and are registered in src/data/journal.ts.
No CMS account or database is required. Journal types: article, note, resource.

Start a new entry:
  npm run journal:new -- --slug a-clear-slug --title "Your title" --kind article --language en

The command creates and registers a draft. It refuses to overwrite an existing entry.
Use --dry-run to inspect the template without writing files.

Ask Codex to draft or edit the entry, add the English/Spanish summaries and sources,
and preview locally with npm run dev. The content blocks support paragraphs,
headings, quotes, lists, resources and the existing capacity/cooling figures.
Citation markers such as [1] or [2,4] link to the references array. Every reference
needs a unique id, label and http(s) URL. Headers need unique anchor IDs.

Draft rules
- status: draft is the default. Drafts appear in development or JOURNAL_PREVIEW=1.
- Drafts and their downloadable files return 404 in an ordinary production build.
- Drafts never enter the public sitemap or RSS feed. Preview pages are noindex.
- Leave JOURNAL_PREVIEW unset for production releases.

Publish after author approval
- Set status to published and publishedAt to the real ISO publication date.
- Keep writtenAt as the original writing date. Use updatedAt for later revisions.
- Add externalPublication with label and URL when also published elsewhere.
- Keep PDFs and cover images under content/journal/assets; the gated asset route
  serves only registered files belonging to available entries.
- Run npm run build, npm run lint, scripts/validate-journal.py and the portfolio
  structured-data checks. Review the reading view in both themes and on a phone.
- Deploy a staged production build, validate it, then promote it.

Language behavior
Each entry has an original language. Both Journal indexes can list it using their
localized summaries. The reading page exists in the entry's actual language;
the other language link leads to that language's Journal index. No translation
or alternate-language article URL is invented.

Current entry
AI investment should earn Nova Scotia's trust was published by the author on
LinkedIn on 20 October 2026. The website reproduces the English source text,
13 original linked references, the original PDF and adapted explanatory figures.
LinkedIn URL was verified in the owner's Dia profile activity.

Publication dates in structured data
- Keep YYYY-MM-DD when only the day is known. The page, visible date and feed retain it.
- If an exact publication/update time is known, use YYYY-MM-DDTHH:mm:ssZ or an explicit offset such as -03:00. Only verified timestamps with a zone enter Google's Article datePublished/dateModified fields.
- Do not add a made-up midnight or update time to silence a validator warning.
