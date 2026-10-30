# Google Search Console Findings & Diagnostic Protocol

**Date:** 2026-10-30  
**Investigator:** Technical SEO Auditor  
**Property:** `https://www.dipeshsapkota7.com.np/`

---

## 1. Access & Verification Status

* **Direct API / GSC Access:** Not available in this local sandbox environment.
* **Property Ownership Verification File:** Verified present in web root:
  - File: `public/googlee83ab4f98a91a8c2.html`
  - Content: `google-site-verification: googlee83ab4f98a91a8c2.html`
  - HTTP Status: Returns 200 OK. Google ownership verification is active.

---

## 2. Protocol: Exact Reports and Data Exports Required from Property Owner

To evaluate real-time impressions, click-through rates, and algorithmic crawl states without guessing, the site owner must open Google Search Console and extract the following:

### A. Performance Report (`Search Results` tab)
1. **Date Range:** Last 3 months.
2. **Filters:**
   - Filter Query: `Dipesh Sapkota`
   - Filter Query: `Dipesh`
   - Filter Query: `IOE Admission`
   - Filter Query: `Git Visualizer`
3. **Data to Record:**
   - Total Clicks and Total Impressions.
   - Average Position for exact query `"Dipesh Sapkota"`.
   - Top ranking landing page (Homepage `/` vs `/about` vs `/profile`).
   - Device and Country distribution (Nepal vs International).

### B. Indexing Coverage (`Pages` tab)
1. **Status of Sitemap:**
   - Verify `https://www.dipeshsapkota7.com.np/sitemap.xml` shows status `Success` with 16 discovered URLs.
2. **Page Status Inspection:**
   - Count of "Indexed" pages.
   - Check if any core pages appear under:
     - *Crawled - currently not indexed*
     - *Discovered - currently not indexed*
     - *Duplicate without user-selected canonical*
     - *Page with redirect*

### C. URL Inspection Tool
Execute a live URL inspection on:
1. `https://www.dipeshsapkota7.com.np/`
2. `https://www.dipeshsapkota7.com.np/projects/ioe-admission-guide`
3. `https://www.dipeshsapkota7.com.np/projects/git-visualizer`

**Verify:**
- Is "Google-selected canonical" identical to "User-declared canonical" (`https://www.dipeshsapkota7.com.np/`)?
- Does "Rich Results" indicate valid detection of `Person`, `ProfilePage`, and `WebSite` schemas?

---

## 3. Preliminary Inferences Based on Verified Public Signals

1. **Crawlability:** Fully accessible. `robots.txt` contains no disallow rules for public content; live Googlebot fetch returns HTTP 200 with complete HTML payloads.
2. **Canonical Alignment:** Fixed in recent commit (`metadataBase` with trailing slash); user-declared canonical is now clean and consistent.
3. **Indexability:** All 16 routes in `sitemap.xml` return HTTP 200. There are no `noindex` robots meta tags on the homepage or core pages.
