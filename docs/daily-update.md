# Daily deal update (no API)

A scheduled Claude Code session runs this every day. It finds renewable energy deals published
since the last update, reads each article, writes the records by hand and publishes them. Nothing
here calls the Claude API.

## Rules

- Only facts stated in the article you fetched and read. Never use search-result snippets as facts,
  and never infer technology, location, value or parties. If an article can't be read, skip it.
- Summary, details and context in our own words, never copied. Explain jargon in plain words.
  Report company claims as claims.
- Values are full amounts (145000000, not 145). Keep the currency the article uses.
- Respect robots.txt, paywalls, Cloudflare and 403s. Never work around them. Skip PV Tech (403).
  Don't fetch renewables.digital or pv-magazine.
- User agent for scripts: `PerpetualDataBot/0.1 (open data import)`.
- Node fetch needs `NODE_USE_ENV_PROXY=1` in cloud sessions.
- Only deals from the last five years count. Real transactions only: M&A, project finance, equity
  raises, PPAs, IPOs, fund closes, joint ventures, refinancings, development finance. Not tenders,
  plans or MoUs without money or capacity committed.

## Steps

1. `git pull`. Find the newest deal date:
   `node -e "console.log(require('./data/deals-news.json').map(d=>d.date).sort().pop())"`
2. Collect candidates since that date:
   - `python3 scripts/collect-deal-news.py /tmp/c1.json /tmp/prn 1` (PR Newswire)
   - `python3 scripts/collect-news-sitemaps.py /tmp/c2.json /tmp/sm 1` (news sites)
   - Web searches, e.g. "renewable energy acquisition", "solar project financing", "wind farm
     financial close", "battery storage financing", "power purchase agreement signed",
     "green hydrogen investment", "renewable fund close", for the days since the last update.
     Include company newsrooms, lenders (IFC, EBRD, ADB, AfDB, EIB, KfW) and regional news.
3. Drop anything already on the site: search `data/deals-news.json` and `data/deals-curated.ts`
   for the URL and for the companies involved.
4. Fetch and read each remaining article. Write the deals to `/tmp/new-deals.json` in the format
   described at the top of `scripts/add-deals-by-hand.mjs`.
5. `node scripts/add-deals-by-hand.mjs /tmp/new-deals.json`, then `node scripts/prune-old-data.mjs`.
6. In `data/meta.ts`, set `DATA_AS_OF` to today and bump `DATA_VERSION` (`YYYY.MM.N`).
7. `npm run build` must pass.
8. Commit to `main` as "Daily update: N deals, DATE to DATE" and push. With no new deals, change
   nothing and don't commit.
