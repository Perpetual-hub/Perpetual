"""Collect renewable deal leads from energy news sites that allow crawling.

    python3 scripts/collect-news-sitemaps.py OUT.json [CACHE_DIR] [MONTHS]

Reads each site's public XML sitemap (listed in its robots.txt), keeps article
URLs from the last MONTHS months (default 60) whose headline, carried in the
URL, looks like a renewable transaction, and writes them in the same format as
collect-deal-news.py. The articles are then read by extract-deals.mjs, which
records the facts in our own words and cites the article as the source.
Coverage is deliberately weighted to Asia, Africa, Australia, Europe and Latin
America, which the US press-release wires cover less.
"""
import gzip
import json
import re
import sys
import time
import urllib.request
from datetime import date, timedelta
from pathlib import Path

UA = "PerpetualDataBot/0.1 (open data research)"
OUT = Path(sys.argv[1] if len(sys.argv) > 1 else "news-candidates.json")
CACHE = Path(sys.argv[2] if len(sys.argv) > 2 else ".cache/news-sitemaps")
MONTHS = int(sys.argv[3]) if len(sys.argv) > 3 else 60
SINCE = (date.today() - timedelta(days=MONTHS * 30)).isoformat()
CACHE.mkdir(parents=True, exist_ok=True)

SITES = [
    ("SolarQuarter", "https://solarquarter.com/sitemap.xml"),
    ("Energy News Network", "https://energy-news-network.com/sitemap_index.xml"),
    ("Eco-Business", "https://www.eco-business.com/sitemap.xml"),
    ("Asian Power", "https://asian-power.com/sitemap.xml"),
    ("Clean Energy Wire", "https://www.cleanenergywire.org/sitemap.xml"),
    ("Africa Energy", "https://www.africa-energy.com/sitemap.xml"),
    ("Energy Global", "https://www.energyglobal.com/sitemap.xml"),
]

DEAL = re.compile(
    r"-(acquires?|acquisition|acquired|buys|sells|sale-of|divests?|financial-close|financing|refinanc\w*|"
    r"stake|joint-venture|ppa|ppas|power-purchase|tax-equity|loan|bond|invests?|investment|fund|raises)-"
)
RENEW = re.compile(
    r"-(solar|wind|offshore|onshore|storage|bess|battery|renewable|renewables|hydro\w*|geotherm\w*|green-hydrogen|"
    r"biogas|biomass|photovoltaic|pv|mw|mwp|mwac|mwh|gw|gwh)-"
)
NOISE = re.compile(
    r"-(webinar|conference|summit|expo|report|market|forecast|award\w*|appoints|names|q[1-4]|quarter|results|"
    r"earnings|interview|opinion|podcast|video|tender-notice|ev|electric-vehicle|lithium-mine|mining)-"
)
SKIP_SEGMENT = re.compile(r"/(tag|tags|category|author|events?|jobs?|videos?|podcasts?|page|my-homepage)/")


def get(url):
    for i in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=90) as r:
                data = r.read()
            return gzip.decompress(data) if data[:2] == b"\x1f\x8b" else data
        except Exception as e:  # noqa: BLE001
            if i == 3:
                print(f"  skip {url}: {e}", file=sys.stderr)
                return b""
            time.sleep(3 * 2**i)


def entries(xml):
    """(loc, lastmod) pairs from a urlset or sitemapindex."""
    out = []
    for block in re.findall(r"<(?:url|sitemap)>(.*?)</(?:url|sitemap)>", xml, re.S):
        loc = re.search(r"<loc>\s*([^<\s]+)\s*</loc>", block)
        mod = re.search(r"<(?:lastmod|news:publication_date)>\s*([^<\s]+)", block)
        if loc:
            out.append((loc.group(1).replace("&amp;", "&"), mod.group(1)[:10] if mod else ""))
    return out


def crawl(publisher, root, keep, seen, depth=0):
    xml = get(root).decode("utf-8", "ignore")
    time.sleep(1.0)
    is_index = "<sitemapindex" in xml
    for loc, mod in entries(xml):
        if is_index:
            # Skip child sitemaps that cannot hold articles or are older than the window.
            if re.search(r"image|video|page-sitemap|event|author|tag|category", loc, re.I):
                continue
            if mod and mod < SINCE:
                continue
            if depth < 2:
                crawl(publisher, loc, keep, seen, depth + 1)
            continue
        if loc in seen or SKIP_SEGMENT.search(loc) or (mod and mod < SINCE):
            continue
        slug = "-" + re.sub(r"[^a-z0-9]+", "-", loc.rstrip("/").rsplit("/", 1)[-1].lower().rsplit(".", 1)[0]) + "-"
        if DEAL.search(slug) and RENEW.search(slug) and not NOISE.search(slug):
            seen.add(loc)
            keep.append({"url": loc, "slugTitle": slug.strip("-").replace("-", " "), "lastmod": mod, "month": mod[:7], "publisher": publisher})


def main():
    keep, seen = [], set()
    for publisher, root in SITES:
        before = len(keep)
        crawl(publisher, root, keep, seen)
        print(f"{publisher}: {len(keep) - before} candidates", file=sys.stderr)
    keep.sort(key=lambda r: r["lastmod"], reverse=True)
    OUT.write_text(json.dumps(keep, indent=1))
    print(f"Wrote {len(keep)} candidates to {OUT}")


if __name__ == "__main__":
    main()
