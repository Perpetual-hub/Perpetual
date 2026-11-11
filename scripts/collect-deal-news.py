"""Collect candidate renewable energy deal announcements from PR Newswire.

    python3 scripts/collect-deal-news.py OUT.json [CACHE_DIR] [MONTHS]

PR Newswire welcomes crawlers (robots.txt, llms.txt) and publishes a monthly
sitemap of every release. Each release URL carries its headline, so we filter
the headlines for a renewable transaction (acquisition, financing, PPA, fund
close and so on) over the last MONTHS months (default 60, i.e. five years),
without opening the releases. The output is a queue of candidates; each one is
then read and recorded as a deal in our own words, with the release as source.
"""
import gzip
import json
import re
import sys
import time
import urllib.request
from datetime import date
from pathlib import Path

UA = "PerpetualDataBot/0.1 (open data import)"
OUT = Path(sys.argv[1] if len(sys.argv) > 1 else "deal-candidates.json")
CACHE = Path(sys.argv[2] if len(sys.argv) > 2 else ".cache/prn")
MONTHS = int(sys.argv[3]) if len(sys.argv) > 3 else 60
CACHE.mkdir(parents=True, exist_ok=True)

MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

# Applied to the URL slug (words separated by hyphens).
DEAL = re.compile(
    r"-(acquires?|acquisition|acquired|buys|sells|sale-of|divests?|financial-close|financing|refinanc\w*|closes|"
    r"stake|joint-venture|ppa|power-purchase|tax-equity|final-close|fund-close|invests?|investment|secures)-",
)
RENEW = re.compile(r"-(solar|wind|offshore-wind|storage|bess|battery|renewable|renewables|hydro\w*|geotherm\w*|green-hydrogen|biogas|biomass|photovoltaic|pv|mw|mwac|mwdc|mwh|gw)-")
NOISE = re.compile(
    r"-(webinar|conference|summit|expo|report|market-size|forecast|cagr|award\w*|appoints|names|"
    r"q[1-4]|quarter|results|earnings|dividend|class-action|lawsuit|investor-alert|shareholders?|"
    r"recycling|ev-charging|electric-vehicle|lithium|mining|residential|homeowners?|warranty|launches|unveils)-"
)


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=180) as r:
        return r.read()


def months_back(n):
    y, m = date.today().year, date.today().month
    for _ in range(n):
        m -= 1
        if m == 0:
            y, m = y - 1, 12
        yield y, m


def main():
    keep, seen = [], set()
    for y, m in months_back(MONTHS):
        name = f"Sitemap_Index_{MON[m - 1]}_{y}.xml.gz"
        path = CACHE / name
        if not path.exists():
            try:
                path.write_bytes(get(f"https://www.prnewswire.com/{name}"))
            except Exception as e:  # noqa: BLE001
                print(f"  {name}: {e}", file=sys.stderr)
                continue
            time.sleep(1.5)
        xml = gzip.decompress(path.read_bytes()).decode("utf-8", "ignore")
        n = 0
        for url, lastmod in re.findall(r"<loc>(https://www\.prnewswire\.com/news-releases/[^<]+)</loc>.*?<lastmod>([^<]+)</lastmod>", xml, re.S):
            slug = "-" + url.rsplit("/", 1)[-1].rsplit("-", 1)[0] + "-"
            if url in seen or not DEAL.search(slug) or not RENEW.search(slug) or NOISE.search(slug):
                continue
            seen.add(url)
            title = slug.strip("-").replace("-", " ")
            keep.append({"url": url, "slugTitle": title, "month": f"{y}-{m:02d}", "lastmod": lastmod[:10]})
            n += 1
        print(f"{name}: {n}", file=sys.stderr)
    OUT.write_text(json.dumps(keep, indent=1))
    print(f"Wrote {len(keep)} candidates to {OUT}")


if __name__ == "__main__":
    main()
