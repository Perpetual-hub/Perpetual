"""Merge news-sourced policy events into country files.

    python3 research/policy/addev.py research/policy/news_01_apac.py

The file defines EVENTS = [(iso, date, kind, effect, title, segments, source)], where source is
(id, title, publisher, url, published, "s"|"p"[, language, originalTitle]). Events older than the
rolling five-year window are refused. Existing events with the same title are left alone.
"""
import json, os, runpy, sys
from datetime import date, timedelta
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TODAY = "2026-11-28"
CUTOFF = "2021-11-28"
ns = runpy.run_path(sys.argv[1])
added = 0
for iso, d, kind, effect, title, segs, src in ns["EVENTS"]:
    assert d >= CUTOFF[: len(d)] or d[:4] > CUTOFF[:4], (iso, d, title)
    p = os.path.join(ROOT, "content", "policy", "countries", f"{iso.lower()}.json")
    c = json.load(open(p))
    if any(e["title"] == title for e in c["events"]):
        continue
    sid = src[0]
    if not any(s["id"] == sid for s in c["sources"]):
        x = {"id": sid, "title": src[1], "publisher": src[2], "url": src[3], "accessed": TODAY, "kind": {"p": "primary", "s": "secondary"}[src[5]]}
        if src[4]: x["published"] = src[4]
        if len(src) > 6 and src[6]: x["language"] = src[6]
        if len(src) > 7 and src[7]: x["originalTitle"] = src[7]
        c["sources"].append(x)
    prec = "year" if len(d) == 4 else "month" if len(d) == 7 else "day"
    full = d + "-01-01" if prec == "year" else d + "-01" if prec == "month" else d
    c["events"].append({"date": full, "precision": prec, "kind": kind, "effect": effect, "title": title, "segments": segs, "sources": [sid]})
    c["events"].sort(key=lambda e: e["date"], reverse=True)
    json.dump(c, open(p, "w"), indent=2, ensure_ascii=False); open(p, "a").write("\n")
    added += 1
print(f"added {added} events")
