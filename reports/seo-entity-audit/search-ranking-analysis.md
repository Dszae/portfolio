# Search Ranking Analysis
**Subject:** Dipesh Sapkota  
**Audit Date:** 2026-10-30

---

## 1. Query Landscape

| Query | Expected Competitors | Notes |
| --- | --- | --- |
| "Dipesh Sapkota" | LinkedIn directory (50+), TikTok cricket video, The Doers Nepal YouTube, Aajako Press podcast, Facebook directory | High name ambiguity; multiple individuals |
| "Dipesh Sapkota Nepal" | Subset of above | Slightly narrowed |
| "Dipesh Sapkota IOE" | Portfolio site likely dominant | Strong affiliation signal |
| "Dipesh Sapkota Thapathali Campus" | Portfolio site likely dominant | Very specific, low competition |
| "Dipesh Sapkota Computer Engineering" | Portfolio site likely dominant | Specific field identifier |
| "Dipesh Sapkota portfolio" | dipeshsapkota7.com.np | Direct brand query |

---

## 2. Bottleneck Analysis

### A. Query Ambiguity — HIGH SEVERITY
Google cannot confidently resolve which "Dipesh Sapkota" is the authoritative entity for the bare name query. Without independent third-party sources that specifically name this individual and his projects, Google defaults to showing aggregator pages (LinkedIn directory, Facebook directory) and high-engagement content (TikTok, YouTube podcasts).

**Evidence:** LinkedIn `np.linkedin.com/pub/dir/` directory and Facebook `/public/Dipesh-Sapkota` directory appeared in screenshot provided by user.

### B. Entity Ambiguity — MEDIUM SEVERITY
The Wikidata entity (Q141595522) and schema markup are correctly implemented, but without corroborating third-party sources, Google's entity confidence score remains low. The Wikipedia draft rejection actively signals non-notability.

### C. Search Relevance — LOW SEVERITY
The homepage title, description, and H1 correctly identify the subject. This is not a root cause.

### D. External Recognition — HIGH SEVERITY (Root Cause)
Zero independent publications have covered Dipesh Sapkota's projects at time of audit. This is the primary ranking bottleneck. Google's quality raters and algorithms weight independent recognition heavily for person-entity ranking.

### E. Link Authority — LOW SEVERITY
Wikidata, ORCID, DEV.to, and Hashnode all link to the portfolio. These are low-editorial-weight links (self-created or semi-automated). No editorial links from independent news or educational institutions exist.

### F. Content Quality — LOW SEVERITY
Site content is technically correct and describes real projects. Not a bottleneck.

### G. Indexing — UNVERIFIED
Without GSC data, indexing coverage cannot be confirmed. All 16 sitemap URLs return HTTP 200, which is a necessary but not sufficient condition for indexing.

### H. Search Competition
The TikTok video ("Dipesh Sapkota: Nepali Cricket Dreamer Making Waves") was published August 2025 and has TikTok's strong platform-level domain authority. The Doers Nepal interview from 2021 has 5 years of indexed presence. These are real signals that outweigh a personal portfolio site that lacks editorial inbound links.

---

## 3. Findings Ranked by Impact

| Finding | Evidence Strength | Expected Impact | Confidence | Effort |
| --- | --- | --- | --- | --- |
| No independent press coverage | Direct (Wikipedia rejection, screenshot) | Very High | High | High (requires editorial decision by third party) |
| Wikipedia draft declined | API confirmed | High | High | Medium (requires coverage first) |
| Name disambiguation — many namesakes | SERP screenshot confirmed | High | High | Low (schema already addresses this) |
| Canonical trailing slash mismatch | Code + live fetch confirmed | Low-Medium | High | Low (1 line fix) |
| No DEV.to or Hashnode articles published | Profile check | Medium | Medium | Medium (requires writing) |
| dateModified static in JSON-LD | Code confirmed | Low | High | Low |

---

## 4. What Cannot Be Influenced

- Google's decision to show LinkedIn directory vs individual profile
- Google's video pack composition
- Engagement metrics on third-party competitor videos
- Other individuals' online presence
