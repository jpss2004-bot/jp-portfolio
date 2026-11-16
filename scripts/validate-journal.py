"""Check Journal pages, citations, publication metadata, feed and downloadable assets."""
import argparse
import json
from pathlib import Path
import re
import runpy
from urllib.request import urlopen
from urllib.error import HTTPError
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://jpsamanosuarez.com"
Page = runpy.run_path(str(ROOT / "scripts/validate-structured-data.py"))["Page"]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--origin", default="http://127.0.0.1:3100")
parser.add_argument("--output", default="output/qa/journal/local-validation.json")
args = parser.parse_args()

def get(route, expected=200):
    try:
        with urlopen(args.origin.rstrip("/") + route) as response:
            body, status, headers = response.read(), response.status, {k.lower(): v for k, v in response.headers.items()}
    except HTTPError as error:
        body, status, headers = error.read(), error.code, {k.lower(): v for k, v in error.headers.items()}
    assert status == expected, (route, status, expected)
    return body, headers

entries = [json.loads(p.read_text()) for p in (ROOT / "content/journal").glob("*.json")]
published = [entry for entry in entries if entry["status"] == "published"]
sitemap = ET.fromstring(get("/sitemap.xml")[0])
urls = {node.text for node in sitemap.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc")}
feed = ET.fromstring(get("/journal/feed.xml")[0])
items = feed.findall("channel/item")
assert len(items) == len(published)
results = []
for locale in ("en", "es"):
    body, _ = get(f"/{locale}/journal")
    page = Page(body.decode())
    assert page.lang == locale and "noindex" not in page.meta.get("robots", "")
    graph = json.loads(page.scripts[0])["@graph"]
    collection = next(n for n in graph if n["@type"] == "CollectionPage")
    assert collection["url"] == SITE + f"/{locale}/journal"
    assert next(n for n in graph if n["@type"] == "ItemList")["numberOfItems"] == len(published)
    assert SITE + f"/{locale}/journal" in urls
    results.append({"route": f"/{locale}/journal", "valid": True})
for entry in entries:
    route = f'/{entry["language"]}/journal/{entry["slug"]}'
    if entry["status"] == "draft":
        get(route, 404)
        assert SITE + route not in urls
        for asset in ("pdf", "cover"):
            get(f'/journal/assets/{entry["slug"]}/{asset}', 404)
        continue
    body, _ = get(route)
    html = body.decode()
    page = Page(html)
    assert page.lang == entry["language"]
    assert "noindex" not in page.meta.get("robots", "")
    graph = json.loads(page.scripts[0])["@graph"]
    article = next(n for n in graph if n["@type"] in ("Article", "BlogPosting"))
    assert article["headline"] == entry["title"]
    assert article["inLanguage"] == entry["language"]
    assert next(n for n in graph if n["@type"] == "WebPage")["datePublished"] == entry["publishedAt"]
    assert len(article["citation"]) == len(entry["references"])
    assert article["author"]["@id"] == SITE + "/#person"
    assert SITE + route in urls
    assert SITE + route in {i.findtext("link") for i in items}
    for reference in entry["references"]:
        assert f'id="source-{reference["id"]}"' in html
        assert reference["url"].replace("&", "&amp;") in html
    citations = set(re.findall(r'href="#source-([^\"]+)"', html))
    assert citations <= {r["id"] for r in entry["references"]}
    if entry.get("externalPublication"):
        assert entry["externalPublication"]["url"] in html
        assert article["sameAs"] == entry["externalPublication"]["url"]
    for asset in ("pdf", "cover"):
        if entry.get(asset):
            data, headers = get(f'/journal/assets/{entry["slug"]}/{asset}')
            assert data == (ROOT / entry[asset]).read_bytes()
            assert headers.get("content-type", "").startswith("application/pdf" if asset == "pdf" else "image/png")
    translations = entry.get("translations", {})
    if translations:
        assert [v["@id"] for v in article.get("workTranslation", [])] == [f'{SITE}/{l}/journal/{entry["slug"]}#article' for l in translations], route
    for locale in ("en", "es"):
        if locale == entry["language"]:
            continue
        other = f'/{locale}/journal/{entry["slug"]}'
        if locale not in translations:
            get(other, 404)
            assert SITE + other not in urls
            continue
        # A translation: its own page, language, headline and hreflang pair, pointing back at the original.
        tbody, _ = get(other)
        thtml = tbody.decode()
        tpage = Page(thtml)
        assert tpage.lang == locale and "noindex" not in tpage.meta.get("robots", "")
        tgraph = json.loads(tpage.scripts[0])["@graph"]
        tarticle = next(n for n in tgraph if n["@type"] == "BlogPosting")
        assert tarticle["headline"] == translations[locale]["title"]
        assert tarticle["inLanguage"] == locale
        assert tarticle["translationOfWork"]["@id"] == SITE + route + "#article" and tarticle["translationOfWork"]["inLanguage"] == entry["language"]
        assert len(tarticle["citation"]) == len(entry["references"])
        assert f'hreflang="{entry["language"]}" href="{SITE}{route}"' in thtml.lower() and f'hreflang="{locale}" href="{SITE}{other}"' in thtml.lower()
        assert f'hreflang="{locale}" href="{SITE}{other}"' in html.lower()
        assert SITE + other in urls
        for reference in entry["references"]:
            assert f'id="source-{reference["id"]}"' in thtml
        assert set(re.findall(r'href="#source-([^\"]+)"', thtml)) <= {r["id"] for r in entry["references"]}
        results.append({"route": other, "valid": True, "translationOf": route})
    results.append({"route": route, "valid": True, "sources": len(entry["references"]), "assetsByteIdentical": True})
get("/en/journal/no-such-entry", 404)
get("/journal/assets/no-such-entry/pdf", 404)
get("/journal/assets/ai-investment-nova-scotia-trust/not-an-asset", 404)
p = ROOT / args.output
p.parent.mkdir(parents=True, exist_ok=True)
p.write_text(json.dumps({"origin": args.origin, "pages": results, "sitemapUrls": len(urls), "feedItems": len(items)}, indent=2) + "\n")
print(f"PASS: {len(results)} Journal pages; citations, canonical languages, publication metadata, sitemap/RSS, PDF/cover bytes and missing-route privacy")
