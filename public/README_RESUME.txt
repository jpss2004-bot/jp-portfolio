Resume file targets for Signal Atlas V1:

Current compatibility path used by the existing homepage:
- public/resume.pdf

Future bilingual paths for Phase 2 and beyond:
- public/resume/jp-samano-resume-en.pdf
- public/resume/jp-samano-resume-es.pdf

English resume source:
- docs/resume/jp-samano-resume-en.docx
- scripts/build_resume_docx.py        (python-docx; rendered to PDF via LibreOffice)

Spanish resume source:
- docs/resume/jp-samano-resume-es.docx
- scripts/build_resume_es.py          (single source -> reportlab PDF + python-docx DOCX)

Both resumes are one page, text-extractable (ATS-friendly), and use the
github.com/jpss2004-bot handle. The Spanish CV is fully translated and mirrors
the English structure (it is no longer a duplicate of the English PDF).

Toolchain to rebuild locally (pure-Python, no LibreOffice required for ES):
    python3 -m venv ~/.venvs/jp-resume
    ~/.venvs/jp-resume/bin/pip install reportlab python-docx
    ~/.venvs/jp-resume/bin/python scripts/build_resume_es.py
