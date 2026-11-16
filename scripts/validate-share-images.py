"""Verify share metadata and the actual image response for every localized page."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json
from pathlib import Path
import struct
from urllib.request import Request, urlopen
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--origin', default='http://127.0.0.1:3100')
parser.add_argument('--output', default='output/qa/mobile/share-validation.json')
args = parser.parse_args()

def fetch(path, agent='facebookexternalhit/1.1'):
    with urlopen(Request(args.origin.rstrip('/') + path, headers={'User-Agent': agent}), timeout=30) as response:
        return response.read(), response.headers

class Meta(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.values = {}
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'meta':
            self.values[a.get('property', a.get('name'))] = a.get('content')

sitemap = ET.fromstring(fetch('/sitemap.xml')[0])
routes = [urlsplit(node.text).path for node in sitemap.findall('{*}url/{*}loc') if node.text and urlsplit(node.text).path.startswith(('/en', '/es'))]

def check(route):
    page = Meta(fetch(route)[0].decode()).values
    image = page['og:image']
    assert image.startswith('https://jpsamanosuarez.com/share/'), (route, image)
    assert page['og:image:width'] == '1200' and page['og:image:height'] == '630'
    assert page['og:image:alt'] and page['twitter:image'] == image
    assert page['twitter:card'] == 'summary_large_image'
    data, headers = fetch(urlsplit(image).path)
    assert headers['Content-Type'].startswith('image/png')
    assert data[:8] == b'\x89PNG\r\n\x1a\n' and struct.unpack('>II', data[16:24]) == (1200, 630)
    assert 2000 < len(data) < 300000, (route, len(data))
    return {'route': route, 'image': image, 'bytes': len(data), 'valid': True}

with ThreadPoolExecutor(max_workers=6) as pool:
    results = list(pool.map(check, routes))
for agent in ('Twitterbot/1.0', 'WhatsApp/2.0'):
    page = Meta(fetch('/en', agent)[0].decode()).values
    assert '/share/en/home' in page['og:image']
Path(args.output).parent.mkdir(parents=True, exist_ok=True)
Path(args.output).write_text(json.dumps({'origin': args.origin, 'pages': results, 'crawlerAgents': ['facebookexternalhit', 'Twitterbot', 'WhatsApp']}, indent=2) + '\n')
print(f'PASS: {len(results)} pages; absolute OG/Twitter images, alt text, PNG type/dimensions, image size and crawler metadata')
