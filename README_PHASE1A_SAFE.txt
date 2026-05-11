PHASE 1A SAFE PORTFOLIO PATCH

Run from your jp-portfolio-site project root in PowerShell:

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
.\phase1a_portfolio_polish_SAFE.ps1

This safe version avoids non-ASCII characters inside the PowerShell wrapper, which prevents Windows PowerShell from misreading UTF-8 text.
