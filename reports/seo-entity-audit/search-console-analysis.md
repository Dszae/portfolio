# Search Console Analysis
**Subject:** Dipesh Sapkota  
**Audit Date:** 2026-10-30

---

> [!IMPORTANT]
> Google Search Console access was not available during this audit. The property is verified (googlee83ab4f98a91a8c2.html file exists in public/) but no authenticated data export was provided. All findings in this report are based on public evidence only.

---

## Data Not Available Without GSC Access

### Performance → Search Results
- Impressions for "dipesh sapkota" and related queries
- Average SERP position over time
- Click-through rate
- Country and device breakdown
- Which URLs are receiving organic traffic

### Indexing → Pages
- Total pages confirmed indexed by Google
- Pages excluded and reasons (duplicate, noindex, crawl anomaly)
- Canonical-related exclusions
- "Crawled but not indexed" list
- "Discovered but not indexed" list

### URL Inspection
- Last crawl timestamp for homepage, /about, /profile
- Google's rendered HTML (to confirm JSON-LD is visible post-JS rendering)
- Whether Google's indexed version matches live content

### Sitemaps
- Submission confirmation
- Discovered URL count vs submitted count
- Parsing errors

---

## What the Owner Must Do in GSC

1. **Sign in** to Google Search Console at https://search.google.com/search-console/
2. **Confirm property** `https://www.dipeshsapkota7.com.np/` is verified (file `googlee83ab4f98a91a8c2.html` is already in public/).
3. **Export the following reports** and share them for follow-up analysis:
   - Performance → Last 3 months → Filter by Query: "dipesh sapkota"
   - Indexing → Pages → All tabs (indexed, not indexed)
   - Sitemaps → Status of https://www.dipeshsapkota7.com.np/sitemap.xml
   - URL Inspection on: `/`, `/about`, `/profile`

---

## Reasonable Inferences From Public Evidence

| Inference | Basis | Confidence |
| --- | --- | --- |
| Site is crawlable | robots.txt correct, sitemap 200, pages 200 | High |
| og:image is accessible to crawlers | HTTP 200, correct MIME type | High |
| JSON-LD is present in HTML | Confirmed in live fetch | High |
| JSON-LD is visible post-render | Uncertain — Next.js RSC may affect timing | Medium |
| All 16 sitemap pages are indexed | Unverified without GSC | Unknown |
| No manual actions | No evidence of spam or policy violations | Medium |
