"""Build both public PDFs from the maintained HTML, in a classic single-column format.

Requires reportlab and pypdf. No browser, network fonts or site build is needed.
"""
from html import escape
from html.parser import HTMLParser
from pathlib import Path

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

ROOT = Path(__file__).resolve().parent
OUT = ROOT.parents[1] / "public" / "resume"


class Element:
    def __init__(self, tag="root", attrs=None):
        self.tag, self.attrs, self.children = tag, dict(attrs or []), []

    def find(self, tag=None, cls=None):
        for child in self.children:
            if isinstance(child, Element):
                if (tag is None or child.tag == tag) and (cls is None or cls in child.attrs.get("class", "").split()):
                    return child
                found = child.find(tag, cls)
                if found:
                    return found
        return None

    def all(self, tag):
        return [c for c in self.children if isinstance(c, Element) and c.tag == tag]

    def markup(self):
        text = "".join(escape(c) if isinstance(c, str) else c.markup() for c in self.children)
        if self.tag in ("b", "strong"):
            return f"<b>{text}</b>"
        if self.tag == "a":
            return f'<link href="{escape(self.attrs["href"], quote=True)}">{text}</link>'
        return text


class Source(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.root = Element()
        self.stack = [self.root]
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        node = Element(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in ("meta", "link", "br", "hr", "img", "input"):
            self.stack.append(node)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                self.stack = self.stack[:i]
                break

    def handle_data(self, text):
        self.stack[-1].children.append(text)


# Embed the Times-compatible Liberation Serif so weights and accents render
# identically without relying on a viewer's substitute fonts.
for variant in ("Regular", "Bold", "Italic", "BoldItalic"):
    pdfmetrics.registerFont(TTFont("Resume" + variant, str(ROOT / "fonts" / f"LiberationSerif-{variant}.ttf")))
pdfmetrics.registerFontFamily("ResumeRegular", normal="ResumeRegular", bold="ResumeBold", italic="ResumeItalic", boldItalic="ResumeBoldItalic")
body = ParagraphStyle("body", fontName="ResumeRegular", fontSize=10.5, leading=12.3, textColor=colors.black, spaceAfter=2)
meta = ParagraphStyle("meta", parent=body, fontName="ResumeItalic", fontSize=10, leading=11.5, spaceAfter=2)
contact = ParagraphStyle("contact", parent=body, fontSize=9.5, leading=11.4, alignment=TA_CENTER, spaceAfter=1)
date = ParagraphStyle("date", parent=body, fontSize=10, alignment=TA_RIGHT)
heading = ParagraphStyle("heading", parent=body, fontName="ResumeBold", fontSize=11, leading=13, spaceBefore=7, spaceAfter=2, keepWithNext=True)
title = ParagraphStyle("title", parent=body, fontName="ResumeBold", fontSize=19, leading=23, alignment=TA_CENTER, spaceAfter=3)
bullet = ParagraphStyle("bullet", parent=body, leftIndent=10, firstLineIndent=0, bulletIndent=0, bulletFontName="ResumeRegular", bulletFontSize=9)


def build(locale):
    source = Source((ROOT / f"resume-{locale}.html").read_text()).root
    header = source.find("header")
    story = [Paragraph(header.find("h1").markup(), title)]
    for div in header.all("div"):
        if div.attrs.get("class") == "contact":
            story.append(Paragraph(" · ".join(c.markup() for c in div.all("span")), contact))
        elif div.attrs.get("class") == "auth":
            story.append(Paragraph(div.markup(), contact))
    page_width = letter[0] - 86.4 - 12
    for section in source.find("body").all("section"):
        story.append(Paragraph(section.find("h2").markup(), heading))
        story.append(HRFlowable(width="100%", thickness=.45, color=colors.black, spaceAfter=4, hAlign="LEFT"))
        for div in section.all("div"):
            if div.attrs.get("class") == "skills":
                for row in div.all("div"):
                    # Separate the bold field name from its content.
                    text = row.markup().replace("</b>", "</b>&nbsp;&nbsp;", 1)
                    story.append(Paragraph(text, body))
                continue
            row = div.find(cls="row")
            if row:
                left, right = row.find("b"), row.find("span")
                table = Table([[Paragraph(left.markup(), body), Paragraph(right.markup(), date)]], colWidths=[page_width * .70, page_width * .30], hAlign="LEFT")
                table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
                story.append(table)
            detail = div.find(cls="meta")
            if detail:
                story.append(Paragraph(detail.markup(), meta))
            ul = div.find("ul")
            if ul:
                for li in ul.all("li"):
                    story.append(Paragraph(li.markup(), bullet, bulletText="•"))
            for para in div.all("p"):
                story.append(Paragraph(para.markup(), body))
            story.append(Spacer(1, 3))
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"jp-samano-resume-{locale}.pdf"
    doc = SimpleDocTemplate(str(path), pagesize=letter, leftMargin=43.2, rightMargin=43.2, topMargin=30, bottomMargin=30, title=f"José Pablo Sámano Suárez — {'Résumé' if locale == 'en' else 'CV'}", author="José Pablo Sámano Suárez")
    doc.build(story)
    reader = PdfReader(path)
    if len(reader.pages) != 1:
        raise RuntimeError(f"{path.name}: expected one page, got {len(reader.pages)}; revise content before delivery")
    text = reader.pages[0].extract_text()
    for required in ["Neyvu", "CheckWise", "Verifaid", "Acadia", "Trinity"]:
        if required not in text:
            raise RuntimeError(f"{path.name}: missing {required}")
    print(f"{path}: one page, {len(text.split())} words")


if __name__ == "__main__":
    for language in ("en", "es"):
        build(language)
