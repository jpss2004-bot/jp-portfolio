Resume file targets for Signal Atlas V1:

Current compatibility path used by the existing homepage:
- public/resume.pdf

Future bilingual paths for Phase 2 and beyond:
- public/resume/jp-samano-resume-en.pdf
- public/resume/jp-samano-resume-es.pdf

Shared resume source and template:
- scripts/resume_template.py          (content + one-page PDF/DOCX template)

English outputs:
- public/resume/jp-samano-resume-en.pdf
- docs/resume/jp-samano-resume-en.docx
- scripts/build_resume_docx.py

Spanish outputs:
- public/resume/jp-samano-resume-es.pdf
- docs/resume/jp-samano-resume-es.docx
- scripts/build_resume_es.py

Both resumes are one page, text-extractable (ATS-friendly), and use the
github.com/jpss2004-bot handle. The Spanish CV is fully translated and mirrors
the English structure (it is no longer a duplicate of the English PDF).

Toolchain to rebuild locally (pure Python; LibreOffice is only needed for DOCX visual QA):
    python3 -m venv ~/.venvs/jp-resume
    ~/.venvs/jp-resume/bin/pip install reportlab python-docx
    ~/.venvs/jp-resume/bin/python scripts/build_resume_docx.py
    ~/.venvs/jp-resume/bin/python scripts/build_resume_es.py
