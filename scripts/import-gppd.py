"""Operating renewable plants >= 10 MW from the WRI Global Power Plant Database v1.3 (CC BY 4.0) -> data/projects-gppd.json"""
import csv, json, re, unicodedata, sys
S = "/tmp/claude-0/-home-user-perpetual/58f3493b-6d28-5e8e-9f3b-b32badb20eaa/scratchpad/gppd"
R = "/home/user/perpetual"
iso3 = json.load(open(f"{S}/iso3.json")); region = json.load(open(f"{S}/region.json"))
TECH = {"Solar": "solar", "Wind": "wind", "Hydro": "hydro", "Geothermal": "geothermal", "Biomass": "bioenergy", "Wave and Tidal": "marine", "Storage": "storage"}
MIN_MW = 10
def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")[:70].strip("-")
GENERIC = r"\b(solar|wind|farm|park|power|plant|station|project|energy|pv|photovoltaic|hydro|hydroelectric|electric|centre|center|facility|bess|offshore|onshore|the|of|and|i|ii|iii|iv|\d+)\b"
norm = lambda s: re.sub(r"\s+", " ", re.sub(GENERIC, " ", re.sub(r"[^a-z0-9 ]", " ", unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()))).strip()

existing = json.load(open(f"{R}/data/projects-news.json"))
cur = open(f"{R}/data/projects.ts").read(); cur = json.loads(cur[cur.index("= [") + 2:cur.rindex("]") + 1])
taken = {p["slug"] for p in existing + cur}
known = {(p["country"], p["technology"], norm(p["name"])) for p in existing + cur if norm(p["name"])}

out, dup, skipped = [], 0, 0
for r in csv.DictReader(open(f"{S}/x/global_power_plant_database.csv", encoding="utf-8")):
    t = TECH.get(r["primary_fuel"])
    if not t: continue
    mw = float(r["capacity_mw"] or 0)
    cc = iso3.get(r["country"])
    if mw < MIN_MW or not cc or not r["latitude"]: skipped += 1; continue
    name = r["name"].strip()
    if (cc, t, norm(name)) in known and norm(name): dup += 1; continue
    base = f"{slug(name) or slug(r['gppd_idnr'])}-{cc.lower()}"; sl = base; i = 2
    while sl in taken: sl = f"{base}-{i}"; i += 1
    taken.add(sl)
    yr = r["commissioning_year"][:4] if r["commissioning_year"] else ""
    desc = f"A {mw:,.0f} MW {t if t != 'bioenergy' else 'biomass'} plant in {r['country_long']}, listed as operating in the WRI Global Power Plant Database (2021)."
    if yr and yr.isdigit(): desc += f" Commissioned in {yr} according to the database."
    src = [{"publisher": "World Resources Institute, Global Power Plant Database v1.3", "title": f"{name} ({r['gppd_idnr']})",
            "url": "https://datasets.wri.org/dataset/globalpowerplantdatabase", "retrievedAt": "2026-11-12"}]
    if r["url"].startswith("http") and r["source"]:
        src.append({"publisher": r["source"], "title": f"{name}: original record", "url": r["url"], "retrievedAt": "2026-11-12"})
    rec = {"id": f"prj-g-{r['gppd_idnr']}", "slug": sl, "name": name, "isSample": False, "technology": t, "capacityMW": round(mw, 2),
           "country": cc, "region": region.get(cc, r["country_long"]), "lat": round(float(r["latitude"]), 4), "lng": round(float(r["longitude"]), 4),
           "locationPrecision": "site", "status": "operating", "dates": {}, "description": desc, "sources": src,
           "lastUpdated": "2021-06-02", "dataVersion": "gppd-1.3"}
    if r["owner"].strip(): rec["owners"] = [{"name": r["owner"].strip()[:120]}]
    out.append(rec)
json.dump(out, open(f"{R}/data/projects-gppd.json", "w"), ensure_ascii=False, separators=(",", ":"))
print(len(out), "plants;", dup, "duplicates of existing records;", skipped, "below", MIN_MW, "MW or unmapped")
import collections; print(collections.Counter(x["technology"] for x in out)); print(sum(x["capacityMW"] for x in out)/1000, "GW")
