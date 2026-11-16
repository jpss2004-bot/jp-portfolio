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


def validate_graph(page, vocabulary):
    route = getattr(page, "route", "graph")
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
    return typed


def validate(route, html, vocabulary):
    page = Page(html)
    page.route = route
    typed = validate_graph(page, vocabulary)
    person = next(n for n in typed if n["@type"] == "Person")
    assert sum(n["@type"] == "Person" for n in typed) == 1
    assert person["@id"] == SITE + "/#person"
    assert person["alumniOf"]["@type"] == "HighSchool"
    assert person["alumniOf"]["name"] == "Trinity College School"
    locale = route.split("/")[1]
    assert "https://www.linkedin.com/in/jose-pablo-samano-suarez-717349291/" in person["sameAs"]
    webpage = next(n for n in typed if n["@type"] in ("ProfilePage", "WebPage", "CollectionPage"))
    assert webpage["url"] == SITE + route
    assert webpage["inLanguage"] == page.lang == locale
    assert webpage["description"] == page.meta["description"]
    assert "noindex" not in page.meta.get("robots", "")
    assert any(l.get("rel") == "canonical" and l.get("href") == webpage["url"] for l in page.links)
    languages = entry_locales(next(e for e in published_entries() if e["slug"] == route.split("/")[-1])) if "/journal/" in route else ("en", "es")
    for language in languages:
        alternate = SITE + "/" + language + route[3:]
        assert any(l.get("hreflang") == language and l.get("href") == alternate for l in page.links)
    if "/journal" in route:
        validate_journal(route, page, typed, webpage, person)
    elif route.endswith("/system"):
        # A project's system map: a WebPage about the project, one level below the case study.
        case_url = SITE + route[: -len("/system")]
        assert webpage["@type"] == "WebPage"
        assert webpage["about"]["@type"] == "CreativeWork" and webpage["about"]["url"] == case_url
        assert webpage["name"] == normalized(" ".join(page.headings[:1]))
        crumb = next(n for n in typed if n["@type"] == "BreadcrumbList")
        assert [i["item"] for i in crumb["itemListElement"]] == [SITE + "/" + locale, case_url, SITE + route]
    elif "/projects/" in route:
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
        assert len(webpage["mentions"]) == 8  # three featured projects and the first five in the index
        assert {n["name"] for n in webpage["mentions"]} >= {"CheckWise", "Neyvu", "Verifaid"}
        assert all(n["name"] in " ".join(page.text) for n in webpage["mentions"])
        published = published_entries()
        if published:
            assert SITE + f"/{locale}/journal" in webpage["relatedLink"]
            assert any(entry_url(entry, locale) in webpage["relatedLink"] for entry in published)
    return {"route": route, "valid": True, "typedEntities": len(typed)}



def published_entries():
    return [entry for path in (ROOT / "content/journal").glob("*.json") if (entry := json.loads(path.read_text()))["status"] == "published"]


def entry_locales(entry):
    """The original language first, then any translations."""
    return [entry["language"], *[l for l in entry.get("translations", {}) if l != entry["language"]]]


def entry_url(entry, locale):
    """The article in `locale` when that version exists, otherwise the original."""
    return SITE + f'/{locale if locale in entry_locales(entry) else entry["language"]}/journal/{entry["slug"]}'


def validate_journal(route, page, typed, webpage, person):
    locale = page.lang
    blog = next(n for n in typed if n["@type"] == "Blog")
    assert blog["author"] == blog["publisher"] == {"@id": person["@id"]}
    crumb = next(n for n in typed if n["@type"] == "BreadcrumbList")
    expected_urls = [SITE + "/" + locale, SITE + f"/{locale}/journal"]
    assert webpage["breadcrumb"] == {"@id": crumb["@id"]}
    assert webpage["about"] == {"@id": blog["@id"]}
    if route.count("/") == 2:
        assert webpage["@type"] == "CollectionPage"
        listing = next(n for n in typed if n["@type"] == "ItemList")
        assert webpage["mainEntity"] == {"@id": listing["@id"]}
        entries = published_entries()
        expected = {entry_url(entry, locale) for entry in entries}
        assert listing["numberOfItems"] == len(entries)
        assert {item["url"] for item in listing["itemListElement"]} == expected
        assert [item["position"] for item in listing["itemListElement"]] == list(range(1, len(entries) + 1))
    else:
        entry = next(e for e in published_entries() if e["slug"] == route.split("/")[-1])
        article = next(n for n in typed if n["@type"] == "BlogPosting")
        translated = locale != entry["language"]
        title = entry["translations"][locale]["title"] if translated else entry["title"]
        assert article["headline"] == normalized(" ".join(page.headings)) == title
        assert article["inLanguage"] == locale and locale in entry_locales(entry)
        version = lambda l: {"@type": "BlogPosting", "@id": entry_url(entry, l) + "#article", "url": entry_url(entry, l), "inLanguage": l}
        if translated:
            assert article["translationOfWork"] == version(entry["language"])
        elif len(entry_locales(entry)) > 1:
            assert article["workTranslation"] == [version(l) for l in entry_locales(entry)[1:]]
        assert webpage["datePublished"] == entry["publishedAt"]
        assert article["dateCreated"] == entry["writtenAt"]
        for key, source in (("datePublished", "publishedAt"), ("dateModified", "updatedAt")):
            value = entry.get(source, "")
            zoned = bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})", value))
            assert article.get(key) == (value if zoned else None), (route, key, article.get(key))
        assert article["author"] == article["publisher"] == {"@id": person["@id"]}
        assert article["isPartOf"] == {"@id": blog["@id"]}
        assert blog["blogPost"] == webpage["mainEntity"] == {"@id": article["@id"]}
        assert article["mainEntityOfPage"] == {"@id": webpage["@id"]}
        assert article["isAccessibleForFree"] is True
        assert {c["url"] for c in article["citation"]} == {r["url"] for r in entry["references"]}
        image = next(n for n in typed if n["@type"] == "ImageObject")
        assert article["image"] == webpage["primaryImageOfPage"] == {"@id": image["@id"]}
        cover = SITE + f'/journal/assets/{entry["slug"]}/cover' if entry.get("cover") else SITE + f'/share/{locale}/article-{entry["slug"]}'
        assert image["contentUrl"] == image["url"] == cover
        if entry.get("pdf"):
            assert article["encoding"]["contentUrl"] == SITE + f'/journal/assets/{entry["slug"]}/pdf'
            assert article["encoding"]["encodingFormat"] == "application/pdf"
        else:
            assert "encoding" not in article
        if entry.get("externalPublication"):
            assert article["sameAs"] == entry["externalPublication"]["url"]
        else:
            assert "sameAs" not in article
        expected_urls.append(SITE + route)
    assert [item["position"] for item in crumb["itemListElement"]] == list(range(1, len(expected_urls) + 1))
    assert [item["item"] for item in crumb["itemListElement"]] == expected_urls


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
    files = sorted(p for p in (ROOT / ".next/server/app").rglob("*.html") if re.match(r"(?:en|es)(?:/projects/|/journal(?:/|\.html)|\.html)", str(p.relative_to(ROOT / ".next/server/app"))))
    system_maps = len(re.findall(r'^  "?[a-z0-9-]+"?: \{$', (ROOT / "src/data/systems.ts").read_text(), re.M))
    expected_count = 32 + 2 * system_maps + (2 + sum(len(entry_locales(e)) for e in published_entries()) if published_entries() else 0)
    assert len(files) == expected_count, f"Expected {expected_count} localized pages, found {len(files)}"

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
