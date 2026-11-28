"""Compact authoring for Policy Review country files.

    python3 research/policy/mk.py research/policy/batch_01.py

Each batch file defines COUNTRIES, a list of dicts made with c(...). Writes
content/policy/countries/<iso>.json. Ratings: S supportive, M mixed, U unsupportive, N not rated.
Confidence: h, m, l. Direction: i improving, s stable, w worsening.
"""
import json, os, runpy, sys
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
R = {"S": "supportive", "M": "mixed", "U": "unsupportive", "N": "not_rated"}
CF = {"h": "high", "m": "medium", "l": "low", None: None}
D = {"i": "improving", "s": "stable", "w": "worsening"}
Q = ["access", "terms", "buyer", "ownership", "build", "stability"]
TODAY = "2026-11-28"

def rating(t):
    code, conf, reason, src = (t + (None, None, []))[:4] if t[0] == "N" else t
    e = {"rating": R[code], "sources": src or []}
    if code != "N":
        e["confidence"] = CF[conf]; e["reason"] = reason
    elif reason:
        e["reason"] = reason
    return e

def seg(rs, d):
    assert len(rs) == 6, rs
    return {"ratings": dict(zip(Q, [rating(x) for x in rs])), "direction": {"value": D[d[0]], "reason": d[1], "sources": d[2]}}

def ev(x):
    d, k, e, ti, sg, so = x
    # "2025" or "2025-04" mark a year or month; stored as the first day with its precision.
    prec = "year" if len(d) == 4 else "month" if len(d) == 7 else "day"
    date = d + "-01-01" if prec == "year" else d + "-01" if prec == "month" else d
    return {"date": date, "precision": prec, "kind": k, "effect": e, "title": ti, "segments": sg, "sources": so}

def c(iso, summary, U, Ud, C, Cd, sources, flags=(), events=(), gaps=None, status="reviewed"):
    srcs = []
    for s in sources:
        sid, title, pub, url, published, kind = s[:6]
        x = {"id": sid, "title": title, "publisher": pub, "url": url, "accessed": TODAY, "kind": {"p": "primary", "s": "secondary"}[kind]}
        if published: x["published"] = published
        if len(s) > 6 and s[6]: x["language"] = s[6]
        if len(s) > 7 and s[7]: x["originalTitle"] = s[7]
        srcs.append(x)
    out = {
        "country": iso, "status": status, "basis": "desk", "lastReviewed": TODAY, "reviewer": "Perpetual",
        "summary": summary, "segments": {"utility": seg(U, Ud), "ci": seg(C, Cd)},
        "redFlags": [{"type": t, "status": st, "segments": sg, "reason": r, "sources": so} for t, st, sg, r, so in flags],
        "events": [ev(x) for x in events],
        "log": [], "sources": srcs,
    }
    if gaps: out["gaps"] = gaps
    return out


def L5(iso, name, firm, slug, mod="2026-06-11"):
    return (f"l5{iso}", f"Renewable Energy, {name} (comparative guide)", f"Legal 500 ({firm})", f"https://www.legal500.com/guides/chapter/{slug}-renewable-energy/", mod, "s")
def CMS(iso, name, slug, pub="2024-02-22"):
    return (f"cms{iso}", f"Renewable energy in {name}", "CMS Expert Guides", f"https://cms.law/en/int/expert-guides/cms-expert-guide-to-renewable-energy/{slug}", pub, "s")
def TG(iso, name, slug, page, title, pub):
    return (f"tg{iso}{page[:2]}", f"{name} Country Commercial Guide, {title}", "US International Trade Administration", f"https://www.trade.gov/country-commercial-guides/{slug}-{page}", pub, "s")

if __name__ == "__main__":
    ns = runpy.run_path(sys.argv[1], init_globals={"c": c, "L5": L5, "CMS": CMS, "TG": TG})
    for x in ns["COUNTRIES"]:
        p = os.path.join(ROOT, "content", "policy", "countries", f"{x['country'].lower()}.json")
        json.dump(x, open(p, "w"), indent=2, ensure_ascii=False); open(p, "a").write("\n")
        print("wrote", p)
