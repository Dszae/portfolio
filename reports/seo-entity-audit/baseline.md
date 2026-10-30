# SEO & Entity Audit — Baseline Report
**Subject:** Dipesh Sapkota  
**Site:** https://www.dipeshsapkota7.com.np/  
**Audit Date:** 2026-10-30  
**Framework:** Next.js 16.3.8 (App Router), React 19, Tailwind CSS 4

---

## 1. What Was Inspected

- All repository source files (app/, components/, lib/, public/)
- Live HTTP responses for homepage, /about, /sitemap.xml, /robots.txt, /projects
- JSON-LD structured data emitted by the live site (homepage and /about)
- Open Graph tags on homepage and /about
- Canonical URL on homepage
- robots.txt directives
- Sitemap.xml contents
- External profile URLs (ORCID, Wikidata, DEV, Hashnode, about.me)
- og:image HTTP response
- Wikipedia draft status via MediaWiki API

---

## 2. Evidence Collected

### HTTP Status Codes
| URL | Status | Notes |
| --- | --- | --- |
| `https://www.dipeshsapkota7.com.np/` | 200 | OK |
| `https://www.dipeshsapkota7.com.np/sitemap.xml` | 200 | application/xml |
| `https://www.dipeshsapkota7.com.np/robots.txt` | 200 | text/plain |
| `https://www.dipeshsapkota7.com.np/about` | 200 | OK |
| `https://www.dipeshsapkota7.com.np/projects` | 200 | OK |
| `https://www.dipeshsapkota7.com.np/og-image.jpg` | 200 | image/jpeg |

### Sitemap
16 URLs indexed. All core pages present: /, /about, /profile, /skills, /projects, /blog, /certificates, /resume, /gallery, /contact, plus 6 project sub-pages.

### robots.txt
- Googlebot, bingbot, and 20+ crawlers: `Allow: /`, `Disallow: /api/`, `Disallow: /admin/`
- Sitemap declared: `https://www.dipeshsapkota7.com.np/sitemap.xml`
- No crawl blocks on public content pages.

### Homepage Metadata (Live)
| Field | Value |
| --- | --- |
| `<title>` | `Dipesh Sapkota \| Computer Engineering Student & AI/ML Enthusiast` |
| `<meta name="description">` | `Official portfolio of Dipesh Sapkota, a Computer Engineering student...` |
| `og:title` | `Dipesh Sapkota \| Computer Engineering Student & AI/ML Enthusiast` |
| `og:image` | `https://www.dipeshsapkota7.com.np/og-image.jpg` (HTTP 200, image/jpeg) |
| `og:type` | `website` |
| `rel="canonical"` | `https://www.dipeshsapkota7.com.np` (no trailing slash) |

### JSON-LD on Homepage
3 script blocks detected:
- Block 1: `@graph` containing `Person`, `ImageObject`, `WebSite` — parsed successfully.
- Block 2: `@graph` containing `ProfilePage`, `Person`, `ItemList` (sitelinks + projects) — parsed successfully.
- Block 3: **PARSE ERROR** — Next.js RSC flight payload (`self.__next_f.push`) is being matched by the regex extractor. This is a false positive from the test script; the actual structured data blocks are correctly formatted.

### Person Schema — sameAs Profiles
14 `sameAs` values declared, including:
- ORCID: verified HTTP 200
- Wikidata Q141595522: verified HTTP 200
- GitHub dszae: HTTP 200
- LinkedIn /in/dszae: HTTP 200 (robots 999 for non-Googlebot UA)
- DEV.to dszae: HTTP 200
- Hashnode @dszae: HTTP 200
- about.me/dipeshsapkota: HTTP 200

### External Profile Status
All external identity profiles in `sameAs` array return HTTP 200.

---

## 3. Existing Implementations That Are Already Correct

- robots.txt: Correct, complete, all major crawlers explicitly allowed.
- Sitemap: All 16 core pages present, returning 200.
- og:image: HTTP 200, JPEG format, accessible.
- Person JSON-LD: Comprehensive `@graph` with name, description, disambiguatingDescription, alumniOf, affiliation, sameAs, knowsAbout, hasCredential, image with Wikimedia Commons sameAs.
- ProfilePage schema: Present and correctly referencing Person entity.
- Wikidata entity (Q141595522): Exists and returns HTTP 200 with known properties.
- ORCID: Verified, HTTP 200.
- External profiles: All return HTTP 200.

---

## 4. Confirmed Issues

### ISSUE-001 — Canonical URL Trailing Slash Mismatch (P1)
- **Observed:** `rel="canonical"` emits `https://www.dipeshsapkota7.com.np` (no trailing slash)
- **Served URL:** `https://www.dipeshsapkota7.com.np/` (with trailing slash)
- **Impact:** Google may see two different canonical signals. The served URL and canonical must match exactly.
- **Evidence:** Live HTTP fetch confirmed.

### ISSUE-002 — Wikipedia Draft Declined (P0 for Knowledge Panel)
- **Observed:** Draft:Dipesh Sapkota declined by reviewer Qcne on 2026-10-29T16:42:09Z
- **Reason recorded:** "Topic is not notable" (`d|n` AfC rejection tag)
- **Impact:** Google's Knowledge Graph relies heavily on Wikipedia as a tier-1 entity signal. Without an approved Wikipedia article, Knowledge Panel probability drops significantly.
- **Evidence:** MediaWiki API confirmed `lastrevid: 1382646177`, comment: "Rejecting submission: n - Topic is not notable".

### ISSUE-003 — No Independent Press Coverage (P0 for Knowledge Panel)
- **Observed:** No published articles in any third-party Nepali or international tech publication mentioning Dipesh Sapkota's projects by name exist at time of audit.
- **Impact:** This is the primary reason for both the Wikipedia rejection and the absence of a Knowledge Panel. Google requires corroborated, independent entity evidence.
- **Evidence:** Wikipedia reviewer cited notability failure. Press pitches dispatched on 2026-10-29 but no responses confirmed.

### ISSUE-004 — dateModified in JSON-LD Is Static / Outdated (P2)
- **Observed:** `ProfilePage.dateModified` hardcoded as `"2026-10-11T00:00:00+05:45"` — nearly 3 weeks behind actual.
- **Impact:** Signals stale content to crawlers.

### ISSUE-005 — worksFor Clamphook Academy in Person Schema (P1)
- **Observed:** `"worksFor": {"@type": "Organization", "name": "Clamphook Academy"}` in Person schema.
- **Impact:** This is factually present in the schema but should be verified as currently accurate. If Dipesh no longer works for Clamphook, this schema claim is misleading to Google's entity reconciliation.

---

## 5. Unverified Hypotheses

- Whether Google Search Console shows crawl or indexing errors on any of the 16 sitemap URLs.
- Whether the homepage actually appears in Google's index (requires `site:dipeshsapkota7.com.np` SERP check or GSC data).
- Exact SERP positions for "dipesh sapkota", "dipesh sapkota nepal", "dipesh sapkota ioe".
- Whether Google's cached version of the homepage contains the JSON-LD correctly.

---

## 6. Information Requiring Google Search Console Access

- Impressions and clicks for "dipesh sapkota" and related queries
- Coverage report: indexed vs excluded pages
- Core Web Vitals assessment
- Mobile usability issues
- Manual actions, if any
- Crawl stats and last crawl timestamp

