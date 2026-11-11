"""Import renewable energy financings published by development finance institutions
in the IATI standard, as real deal records: data/deals-iati.ts.

    python3 scripts/import-iati-deals.py [cache_dir]

Each lender publishes its own IATI files under an open licence (listed below and
on the IATI Registry). We keep activities with a renewable energy sector code
(OECD DAC 2321x-2327x) making up at least 25% of the activity, with a financing
commitment dated 2015 or later. Summaries are generated from the structured
fields in our own words, and every record links to the lender's project page or
the IATI record. Needs no API key.
"""
import json
import re
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = Path(sys.argv[1] if len(sys.argv) > 1 else ROOT / ".cache/iati")
CACHE.mkdir(parents=True, exist_ok=True)
UA = "PerpetualDataBot/0.1 (open data import)"
FROM = "2015-01-01"
MIN_SHARE = 25.0

# Registry organisation -> display name and licence as stated on the IATI Registry.
PUBLISHERS = {
    "asdb": ("Asian Development Bank", "CC BY"),
    "afdb": ("African Development Bank", "CC BY"),
    "ebrd": ("European Bank for Reconstruction and Development", "ODC-BY"),
    "eib": ("European Investment Bank", "attribution licence"),
    "iadb": ("Inter-American Development Bank", "attribution licence"),
    "bii": ("British International Investment", "CC BY"),
    "dfc": ("US International Development Finance Corporation", "CC0"),
    "afd": ("Agence Française de Développement", "open licence"),
    "gcf": ("Green Climate Fund", "CC0"),
}

# OECD DAC 5-digit purpose codes for renewable generation.
DAC = {
    "23210": None,  # renewable sources, multiple technologies
    "23220": "hydro",
    "23230": "solar",
    "23231": "solar",
    "23232": "solar",
    "23240": "wind",
    "23250": "marine",
    "23260": "geothermal",
    "23270": "bioenergy",
}

# EIB publishes its own sector vocabulary (99). Renewable generation codes only.
DAC.update({
    "35112100": "hydro",
    "35112200": "hydro",
    "35113000": None,
    "35113100": "bioenergy",
    "35113300": "solar",
    "35113400": "wind",
    "35113600": "geothermal",
    "35113700": None,
    "35113800": "solar",
})

# Two-letter country codes IATI uses that are not countries.
NOT_COUNTRY = {"XK"}


def get(url, dest=None, tries=4):
    for i in range(tries):
        try:
            url = re.sub(r"^http://", "https://", url).replace(" ", "%20")
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=180) as r:
                data = r.read()
            if dest:
                dest.write_bytes(data)
            return data
        except Exception as e:  # noqa: BLE001
            if i == tries - 1:
                print(f"  skip {url}: {e}", file=sys.stderr)
                return None
            time.sleep(2 * 2**i)


def activity_files(org):
    out, start = [], 0
    while True:
        u = f"https://iatiregistry.org/api/3/action/package_search?fq=organization:{org}&rows=100&start={start}"
        res = json.loads(get(u))["result"]
        for p in res["results"]:
            if p.get("extras") and any(e.get("key") == "filetype" and e.get("value") == "organisation" for e in p["extras"]):
                continue
            if "org" in p["name"].split("-")[-1] or p["name"].endswith("organisation"):
                continue
            for r in p.get("resources", []):
                out.append((p["name"], r["url"]))
        start += 100
        if start >= res["count"]:
            return out


def text(el):
    if el is None:
        return ""
    for n in el.findall("narrative"):
        lang = n.get("{http://www.w3.org/XML/1998/namespace}lang", "en")
        if lang.lower().startswith("en") and n.text:
            return n.text.strip()
    n = el.find("narrative")
    if n is not None and n.text:
        return n.text.strip()
    return (el.text or "").strip()


ACRONYMS = {"PV", "CSP", "EU", "UK", "US", "USA", "BESS", "SPV", "IPP", "EDF", "DFI", "MW", "GW", "II", "III", "IV", "SA", "PLC", "LTD", "SUN"}
SMALL = {"and", "of", "the", "for", "in", "to", "de", "du", "des", "la", "le", "et", "on", "a"}


def tidy_caps(s):
    """Some lenders publish names in capitals. Turn "PROGRAMME WATER AND SUN ALLIANCE" into
    "Programme Water and SUN Alliance": known acronyms stay upper case, small words go lower."""
    if not s or not s.isupper():
        return s
    out = []
    for i, w in enumerate(s.split()):
        core = re.sub(r"[^A-Za-z]", "", w)
        if core in ACRONYMS:
            out.append(w)
        elif i > 0 and core.lower() in SMALL:
            out.append(w.lower())
        else:
            out.append("-".join(p[:1] + p[1:].lower() for p in w.split("-")).replace("'I", "'I"))
    return " ".join(out)


def slugify(s):
    s = re.sub(r"[^a-z0-9]+", "-", s.lower().encode("ascii", "ignore").decode()).strip("-")
    return s[:80].rstrip("-")


def money(n, cur):
    sym = {"USD": "US$", "EUR": "€", "GBP": "£"}.get(cur, f"{cur} ")
    if n >= 1e9:
        return f"{sym}{n / 1e9:,.2f} billion".replace(".00 ", " ")
    if n >= 1e6:
        return f"{sym}{n / 1e6:,.0f} million"
    return f"{sym}{n:,.0f}"


def project_url(org, ident, act):
    for d in act.findall("document-link"):
        u = d.get("url", "")
        if u.startswith("http") and any(h in u for h in ("adb.org/projects", "ebrd.com", "eib.org/en/projects", "afdb.org", "iadb.org/en/project", "dfc.gov", "afd.fr", "greenclimate.fund/project", "bii.co.uk")):
            return u.split("#")[0]
    if org == "asdb":
        m = re.search(r"(\d{5})-\d{3}", ident)
        if m:
            return f"https://www.adb.org/projects/{m.group(0)}/main"
    return f"https://d-portal.org/ctrack.html#view=act&aid={urllib.request.quote(ident, safe='')}"


def long_date(iso):
    y, m, d = iso.split("-")
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return f"{int(d)} {months[int(m) - 1]} {y}"


TECH_WORD = {"solar": "solar", "wind": "wind", "hydro": "hydropower", "geothermal": "geothermal", "bioenergy": "bioenergy", "marine": "marine energy"}


def parse(org, path, today, seen):
    name, licence = PUBLISHERS[org]
    try:
        tree = ET.parse(path)
    except ET.ParseError as e:
        print(f"  bad xml {path.name}: {e}", file=sys.stderr)
        return []
    out = []
    for act in tree.getroot().iter("iati-activity"):
        ident = (act.findtext("iati-identifier") or "").strip()
        if not ident or ident in seen:
            continue
        sectors = [s for s in act.findall("sector") if s.get("vocabulary", "1") in ("1", "2", "99")]
        re_secs = [s for s in sectors if s.get("code") in DAC]
        if not re_secs:
            continue
        share = sum(float(s.get("percentage") or (100 / len(sectors))) for s in re_secs)
        if share < MIN_SHARE:
            continue
        techs = [DAC[s.get("code")] for s in sorted(re_secs, key=lambda s: -float(s.get("percentage") or 0))]
        techs = list(dict.fromkeys(t for t in techs if t)) or ["solar", "wind"][:0]
        if not techs:
            # "Multiple technologies": keep, tagged by what the title says, else skip.
            title_l = text(act.find("title")).lower()
            techs = [t for t, w in (("solar", "solar"), ("wind", "wind"), ("hydro", "hydro"), ("geothermal", "geotherm"), ("bioenergy", "biomass")) if w in title_l]
            if not techs:
                continue
        default_cur = act.get("default-currency", "USD")
        commits = []
        for t in act.findall("transaction"):
            tt = t.find("transaction-type")
            if tt is None or tt.get("code") not in ("2", "C"):
                continue
            v = t.find("value")
            d = (t.find("transaction-date").get("iso-date") if t.find("transaction-date") is not None else None) or (v.get("value-date") if v is not None else None)
            if v is None or not d or not (v.text or "").strip():
                continue
            try:
                amt = float(v.text.strip())
            except ValueError:
                continue
            commits.append((d[:10], amt, v.get("currency", default_cur)))
        if not commits:
            continue
        commits.sort()
        first = commits[0][0]
        if first < FROM:
            continue
        cur = commits[0][2]
        amount = sum(a for _, a, c in commits if c == cur)
        countries = []
        for rc in act.findall("recipient-country"):
            c = (rc.get("code") or "").upper()
            if re.fullmatch(r"[A-Z]{2}", c) and c not in NOT_COUNTRY and c not in countries:
                countries.append(c)
        title = re.sub(r"\s+", " ", text(act.find("title"))).strip()
        title = tidy_caps(title)
        if not title:
            continue
        status_code = act.find("activity-status").get("code") if act.find("activity-status") is not None else ""
        status = {"1": "pipeline", "2": "being implemented", "3": "completed", "4": "completed", "5": "cancelled", "6": "suspended"}.get(status_code, "")
        if status in ("cancelled", "pipeline"):
            continue
        place = ", ".join(countries) if countries else "multiple countries"
        borrowers = [tidy_caps(text(p)) for p in act.findall("participating-org") if p.get("role") == "4" and text(p)]
        word = lambda xs: xs[0] if len(xs) == 1 else ", ".join(xs[:-1]) + " and " + xs[-1]
        summary = " ".join(
            s
            for s in [
                f"{name} committed {money(amount, cur) if amount > 0 else 'financing'} to this project, with the first commitment dated {long_date(first)}, according to its published IATI data.",
                f"Renewable energy ({word([TECH_WORD[t] for t in techs])}) makes up {share:.0f}% of the project's sector allocation.",
                f"Implementing organisation: {borrowers[0]}." if borrowers else "",
                f"Status as reported: {status}." if status else "",
            ]
            if s
        )
        seen.add(ident)
        deal_id = f"iati-{slugify(ident)}"
        out.append({
            "id": deal_id,
            "slug": f"{slugify(title)}-{slugify(ident)[-24:].strip('-')}",
            "isSample": False,
            "date": first,
            "type": "development finance",
            "status": "completed",
            "title": title[:180],
            "technologies": techs,
            "countries": countries,
            "region": "Multi-country" if len(countries) != 1 else "",
            "buyers": [{"name": name, "role": "Lender"}],
            **({"sellers": [{"name": borrowers[0][:120], "role": "Implementing Organisation"}]} if borrowers else {}),
            **({"value": {"amount": round(amount, 2), "currency": cur, **({"usd": round(amount, 2)} if cur == "USD" else {}), "disclosed": True}} if amount > 0 and re.fullmatch(r"[A-Z]{3}", cur) else {}),
            "summary": summary,
            "sources": [{
                "publisher": f"{name} (IATI, {licence})",
                "title": f"{title[:140]} ({ident})",
                "url": project_url(org, ident, act),
                "retrievedAt": today,
            }],
        })
    return out


REGION_DISPLAY = {
    "Africa": "Africa", "Asia": "Asia", "C America + Carib": "Central America and the Caribbean", "Eurasia": "Eurasia",
    "Europe": "Europe", "Middle East": "Middle East", "N America": "North America", "Oceania": "Oceania", "S America": "South America",
}


def irena_regions():
    src = (ROOT / "data/stats/country-capacity.ts").read_text()
    data = json.loads(src[src.index("= {") + 2 : src.rindex(";")])
    return {c["iso2"]: c["region"] for c in data["countries"]}


def main():
    today = date.today().isoformat()
    regions = irena_regions()
    deals, seen = [], set()
    for org in PUBLISHERS:
        files = activity_files(org)
        print(f"{org}: {len(files)} files", file=sys.stderr)
        for pkg, url in files:
            dest = CACHE / f"{pkg}.xml"
            if not dest.exists() and get(url, dest) is None:
                continue
            deals.extend(parse(org, dest, today, seen))
    # Region: the site's region names come from IRENA via the country page, so leave
    # single-country deals to be labelled by the data layer.
    from collections import Counter
    dup = Counter(d["title"] for d in deals)
    for d in deals:
        if dup[d["title"]] > 1:
            ref = d["sources"][0]["title"].rsplit("(", 1)[-1].rstrip(")")
            d["title"] = f"{d['title']} ({ref})"
    slugs = set()
    for d in deals:
        if len(d["countries"]) == 1:
            d["region"] = REGION_DISPLAY.get(regions.get(d["countries"][0], ""), "Other")
        while d["slug"] in slugs:
            d["slug"] += "-x"
        slugs.add(d["slug"])
    deals.sort(key=lambda d: d["date"], reverse=True)
    header = (
        "// GENERATED by scripts/import-iati-deals.py. Do not edit by hand.\n"
        "// Source: IATI data published by each lender (see each record's source). Real records, not samples.\n"
        'import type { Deal } from "@/lib/types";\n\n'
    )
    (ROOT / "data/deals-iati.ts").write_text(header + f"export const iatiDeals: Deal[] = {json.dumps(deals, indent=1, ensure_ascii=False)};\n")
    by = {}
    for d in deals:
        by[d["buyers"][0]["name"]] = by.get(d["buyers"][0]["name"], 0) + 1
    print(f"Wrote {len(deals)} deals, {len({c for d in deals for c in d['countries']})} countries. {by}")


if __name__ == "__main__":
    main()
