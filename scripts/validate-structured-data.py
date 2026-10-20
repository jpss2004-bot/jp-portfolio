"""Validate every prerendered locale page; optionally fetch the same routes live.

Checks real HTML, graph references, localized metadata, visible project attribution,
canonical/hreflang links, and Schema.org vocabulary/domain compatibility.
"""
import argparse
import concurrent.futures
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
SCHEMA = "https://schema.org/"
SITE = "https://jpsamanosuarez.com"


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.scripts, self.text, self.headings, self.links, self.meta = [], [], [], [], {}
        self.script, self.heading, self.json_ld = False, False, False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "script":
            self.script = True
            self.json_ld = a.get("type") == "application/ld+json"
            if self.json_ld:
                self.scripts.append("")
        if tag == "h1":
            self.heading = True
        if tag == "link":
            self.links.append(a)
        if tag == "meta" and a.get("name"):
            self.meta[a["name"]] = a.get("content", "")
        if tag == "html":
            self.lang = a.get("lang")

    def handle_endtag(self, tag):
        if tag == "script":
            self.script, self.json_ld = False, False
        if tag == "h1":
            self.heading = False

    def handle_data(self, data):
        if self.json_ld:
            self.scripts[-1] += data
        elif not self.script:
            self.text.append(data)
            if self.heading:
                self.headings.append(data)


def objects(value):
    if isinstance(value, dict):
        yield value
        for child in value.values():
            yield from objects(child)
    elif isinstance(value, list):
        for child in value:
            yield from objects(child)


def values(value):
    return value if isinstance(value, list) else [value]


def normalized(text):
    return " ".join(text.split())


def validate(route, html, vocabulary):
    page = Page(html)
    assert len(page.scripts) == 1, f"{route}: expected one JSON-LD graph"
    data = json.loads(page.scripts[0])
    assert data["@context"] == SCHEMA.rstrip("/")
    nodes = list(objects(data))
    typed = [n for n in nodes if "@type" in n]
    ids = [n["@id"] for n in typed if "@id" in n]
    assert len(ids) == len(set(ids)), f"{route}: duplicate identities"
    for n in nodes:
        if set(n) == {"@id"}:
            assert n["@id"] in ids, f"{route}: unresolved reference {n}"
    for n in typed:
        types = values(n["@type"])
        ancestors = set()
        pending = [SCHEMA + t for t in types]
        while pending:
            current = pending.pop()
            assert current in vocabulary, f"Unknown type: {current}"
            if current in ancestors:
                continue
            ancestors.add(current)
            pending += [p["@id"] for p in values(vocabulary[current].get("rdfs:subClassOf", []))]
        for prop in n:
            if prop.startswith("@"):
                continue
            definition = vocabulary.get(SCHEMA + prop)
            assert definition, f"Unknown property: {prop}"
            domains = {d["@id"] for d in values(definition.get(SCHEMA + "domainIncludes", []))}
            assert not domains or ancestors & domains, f"{types}: invalid property {prop}"
    person = next(n for n in typed if n["@type"] == "Person")
    assert sum(n["@type"] == "Person" for n in typed) == 1
    assert person["@id"] == SITE + "/#person"
    assert person["alumniOf"]["@type"] == "HighSchool"
    assert person["alumniOf"]["name"] == "Trinity College School"
    locale = route.split("/")[1]
    webpage = next(n for n in typed if n["@type"] in ("ProfilePage", "WebPage"))
    assert webpage["url"] == SITE + route
    assert webpage["inLanguage"] == page.lang == locale
    assert webpage["description"] == page.meta["description"]
    assert "noindex" not in page.meta.get("robots", "")
    assert any(l.get("rel") == "canonical" and l.get("href") == webpage["url"] for l in page.links)
    for language in ("en", "es"):
        alternate = SITE + "/" + language + route[3:]
        assert any(l.get("hreflang") == language and l.get("href") == alternate for l in page.links)
    if "/projects/" in route:
        work = next(n for n in typed if n["@type"] == "CreativeWork")
        assert work["name"] == normalized(" ".join(page.headings))
        assert work["description"] == webpage["description"]
        assert work["creditText"] in normalized(" ".join(page.text))
        assert work["creativeWorkStatus"] in normalized(" ".join(page.text))
        assert all(keyword in " ".join(page.text) for keyword in work["keywords"])
        crumb = next(n for n in typed if n["@type"] == "BreadcrumbList")
        assert [i["position"] for i in crumb["itemListElement"]] == [1, 2]
        assert [i["item"] for i in crumb["itemListElement"]] == [SITE + "/" + locale, SITE + route]
        assert webpage["mainEntity"] == {"@id": work["@id"]}
    else:
        assert webpage["@type"] == "ProfilePage"
        assert webpage["mainEntity"] == {"@id": person["@id"]}
        assert len(webpage["mentions"]) == 10
        assert {n["name"] for n in webpage["mentions"]} >= {"CheckWise", "Neyvu", "Verifaid"}
        assert all(n["name"] in " ".join(page.text) for n in webpage["mentions"])
    return {"route": route, "valid": True, "typedEntities": len(typed)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--origin", help="Fetch built routes from this origin instead of .next HTML")
    parser.add_argument("--output", default="output/qa/schema/local-validation.json")
    args = parser.parse_args()
    output = ROOT / args.output
    output.parent.mkdir(parents=True, exist_ok=True)
    vocab_path = ROOT / "output/qa/schema/schemaorg-current-https.jsonld"
    if not vocab_path.exists():
        with urlopen("https://schema.org/version/latest/schemaorg-current-https.jsonld") as response:
            vocab_path.write_bytes(response.read())
    raw = vocab_path.read_text().replace('"schema:', '"https://schema.org/')
    vocabulary = {n["@id"]: n for n in json.loads(raw)["@graph"]}
    files = sorted(p for p in (ROOT / ".next/server/app").rglob("*.html") if re.match(r"(?:en|es)(?:/projects/|\.html)", str(p.relative_to(ROOT / ".next/server/app"))))
    assert len(files) == 22, f"Expected two homepages and twenty project pages, found {len(files)}"

    def check(path):
        route = "/" + str(path.relative_to(ROOT / ".next/server/app"))[:-5]
        if args.origin:
            with urlopen(args.origin.rstrip("/") + route) as response:
                assert response.status == 200
                html = response.read().decode()
        else:
            html = path.read_text()
        page = Page(html)
        (output.parent / (route.strip("/").replace("/", "-") + ".json")).write_text(json.dumps(json.loads(page.scripts[0]), ensure_ascii=False, indent=2) + "\n")
        return validate(route, html, vocabulary)

    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        results = list(pool.map(check, files))
    output.write_text(json.dumps({"origin": args.origin or "built HTML", "vocabulary": "https://schema.org/version/latest/schemaorg-current-https.jsonld", "pages": results}, indent=2) + "\n")
    print(f"PASS: {len(results)} pages; JSON-LD, vocabulary/domain checks, references, localization, canonicals, attribution and breadcrumbs")


if __name__ == "__main__":
    main()
