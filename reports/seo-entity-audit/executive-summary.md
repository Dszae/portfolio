# Executive Summary — SEO & Entity Audit
**Subject:** Dipesh Sapkota  
**Site:** https://www.dipeshsapkota7.com.np/  
**Audit Date:** 2026-10-30  
**Build Result:** Exit code 0, all routes compiled successfully

---

## Direct Answers to the 10 Audit Questions

### 1. Why is the official website not consistently ranking #1 for "Dipesh Sapkota"?

The primary reason is **name ambiguity combined with the absence of independent third-party coverage.** Google's algorithm must choose among multiple individuals named Dipesh Sapkota. When no independent, credible publication has written about this specific individual, Google defaults to high-engagement content (a TikTok video, podcast interviews) and aggregator directory pages (LinkedIn `50+ profiles`, Facebook `/public/`) that have accumulated signals over months and years.

The technical implementation of the portfolio site is not the bottleneck.

---

### 2. Which explanations are supported by evidence?

| Explanation | Evidence |
| --- | --- |
| No independent press coverage exists | Wikipedia reviewer confirmed notability failure; no published articles found |
| Wikipedia draft rejected | MediaWiki API confirmed `d\|n` rejection tag on 2026-10-29 |
| Name shared by multiple individuals | SERP screenshot showed TikTok video, Aajako Press podcast, The Doers Nepal interview |
| LinkedIn directory outranks individual profile | Screenshot confirmed `np.linkedin.com/pub/dir/` appearing |
| Canonical trailing slash mismatch | Live HTTP fetch and source code both confirmed |
| dateModified was static and outdated | Source code confirmed hardcoded date |

---

### 3. Which explanations remain hypotheses?

- Whether Googlebot has successfully rendered and indexed the JSON-LD (requires GSC URL Inspection).
- Whether any of the 16 sitemap pages are excluded from Google's index.
- Whether Core Web Vitals affect ranking for this query specifically.
- Whether the Wikipedia rejection tag is actively depressing entity confidence scores.

---

### 4. Is the current technical SEO implementation actually deficient?

**No, with two minor confirmed exceptions.** The schema, robots.txt, sitemap, og:image, and external profile links are all correctly implemented. The two exceptions — canonical trailing slash mismatch and static dateModified — were both fixed and deployed in this audit.

---

### 5. What is the most important remaining ranking bottleneck?

**The absence of any independent, published, third-party article that names Dipesh Sapkota and describes his engineering work.** This single gap is responsible for:
- The Wikipedia rejection
- The absence of a Knowledge Panel
- Google's inability to confidently resolve which "Dipesh Sapkota" is the entity behind this website

---

### 6. Why might Google not have created a Knowledge Panel?

Three direct reasons:
1. **No Wikipedia mainspace article exists.** Wikipedia is Google's highest-confidence entity source. The draft was declined.
2. **No independent secondary sources corroborate the schema claims.** Google cannot confirm the self-asserted entity data.
3. **Name disambiguation is unresolved.** Multiple individuals share this name with their own online presence.

---

### 7. What evidence of distinct identity and independent recognition exists?

| Signal | Status |
| --- | --- |
| Wikidata entity Q141595522 | Verified |
| ORCID 0009-0001-7595-5114 | Verified |
| Wikimedia Commons portrait | Verified |
| 14 sameAs profiles in schema | Verified |
| YouTube channel @dszae linked in Wikidata | Verified |
| LinkedIn /in/dszae linked in Wikidata | Verified |
| Press pitches sent to TechPana & ICT Frame | Dispatched 2026-10-29, awaiting response |

No independent editorial coverage exists at time of audit.

---

### 8. Which changes have actually been implemented?

| Change | File | Status |
| --- | --- | --- |
| metadataBase trailing slash fix | app/layout.jsx | Deployed |
| dateModified dynamic timestamp | components/JsonLdSchema.jsx | Deployed |
| All 7 audit reports | reports/seo-entity-audit/ | Committed |

Build: exit code 0. All routes compiled. Pushed to `origin/main` at commit `eedef72`.

---

### 9. Which recommendations require the owner's participation?

| Action | Platform | Required |
| --- | --- | --- |
| Write 2–3 technical articles | DEV.to and Hashnode | Owner must write |
| Confirm portfolio link on ORCID | orcid.org | Owner must log in |
| Confirm portfolio link on GitHub, LinkedIn, Hashnode | Each platform | Owner must verify |
| Check Google People Profile | g.co/people | Owner must visit |
| Respond to TechPana/ICT Frame when they reply | Email | Owner must respond |
| Re-submit Wikipedia AfC once coverage exists | en.wikipedia.org | Owner or agent |

---

### 10. What should be measured over the next 30, 60, and 90 days?

**30 days:**
- Check GSC Performance for "dipesh sapkota" query — any impressions appearing?
- Check if TechPana or ICT Frame has published coverage.
- Verify canonical fix is reflected in GSC URL Inspection for homepage.

**60 days:**
- If press coverage published: add citations to Wikipedia draft and re-submit AfC.
- Check if DEV.to or Hashnode articles have been indexed.
- Check if LinkedIn individual profile (`/in/dszae`) has displaced directory page.

**90 days:**
- Re-run full audit. If Wikipedia draft approved: monitor for Knowledge Panel appearance.
- Assess SERP position changes for "dipesh sapkota ioe" and "dipesh sapkota thapathali campus".
- Evaluate whether the video pack has updated to include @dszae project demos.

> [!IMPORTANT]
> No numerical ranking forecasts are made. No Knowledge Panel is promised. The timeline for any SERP change following new coverage is estimated at 4 to 12 weeks from the publication date of any independent article.
