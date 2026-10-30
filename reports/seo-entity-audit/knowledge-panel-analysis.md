# Knowledge Panel Analysis
**Subject:** Dipesh Sapkota  
**Audit Date:** 2026-10-30

---

## 1. The Four Distinct States

| State | Current Status |
| --- | --- |
| Website ranks highly for exact name | Partially — site is live and indexed, position unconfirmed without GSC |
| Google understands the person as a distinct entity | Partial — Wikidata entity exists, schema complete, but Wikipedia declined |
| Person is in Google's Knowledge Graph | Not confirmed |
| Knowledge Panel appears for the query | Not appearing |

---

## 2. Evidence Supporting Entity Recognition

| Signal | Status | Source |
| --- | --- | --- |
| Wikidata entity Q141595522 | Verified HTTP 200 | wikidata.org |
| ORCID 0009-0001-7595-5114 | Verified HTTP 200 | orcid.org |
| Wikimedia Commons portrait | Verified HTTP 200 | commons.wikimedia.org |
| Person JSON-LD with 14 sameAs | Live on site | dipeshsapkota7.com.np |
| ProfilePage + Person schema | Live on site | dipeshsapkota7.com.np |
| disambiguatingDescription in schema | Present | components/JsonLdSchema.jsx |
| YouTube channel @dszae linked in Wikidata P11245 | Confirmed | wikidata.org |
| LinkedIn /in/dszae linked in Wikidata P6634 | Confirmed | wikidata.org |
| GitHub /dszae linked in Wikidata P2037 | Confirmed | wikidata.org |

---

## 3. Evidence Still Missing (Critical Gaps)

### Gap 1 — No Independent Third-Party Coverage (Root Cause)
Google's Knowledge Graph is built from structured entity signals **corroborated by independent sources**. Without at least one published article in an independent publication that:
- Names "Dipesh Sapkota"
- Identifies him as a Computer Engineering student at IOE Thapathali Campus
- Links to or describes his specific projects

Google has no corroboration for the self-asserted schema claims. This is the single most important missing signal.

### Gap 2 — Wikipedia Draft Rejected
The Wikipedia AfC draft was declined on 2026-10-29 with reason: **"Topic is not notable."** Wikipedia is Google's highest-confidence entity source. A declined draft does not contribute positively, and the rejection tag (`{{AfC submission|d|n}}`) is publicly visible to crawlers.

### Gap 3 — No Published Technical Articles Under Own Name
DEV.to (/dszae) and Hashnode (@dszae) profiles exist but contain no published articles at time of audit. Self-authored technical writing attributed to "Dipesh Sapkota" would build entity association.

### Gap 4 — No Google Search Profile Claimed
Google offers a Search profile feature (`g.co/people`) for individuals in certain regions. This is separate from a traditional Knowledge Panel and does not require Wikipedia notability. Availability in Nepal is not confirmed.

---

## 4. Name Disambiguation Issues

**High competition from namesakes:** The name "Dipesh Sapkota" is shared by:
- A person featured in a TikTok video: "Dipesh Sapkota: Nepali Cricket Dreamer Making Waves" (indexed Aug 2025)
- A guest on "The Doers Nepal" YouTube interview (indexed Mar 2021)
- A participant in "१०० रूपैयाँको स्कुल पढेका डाक्टर" Aajako Press podcast (indexed Jul 2025)
- 50+ LinkedIn directory entries

Google's entity disambiguation algorithm requires strong, consistent affiliation signals to resolve which "Dipesh Sapkota" should be associated with which entity. The Wikidata `disambiguatingDescription` and schema `disambiguatingDescription` field partially address this, but without independent corroboration, Google cannot confidently resolve the ambiguity.

---

## 5. Verified Opportunities

| Opportunity | Status | Expected Impact |
| --- | --- | --- |
| TechPana press pitch | Sent 2026-10-29 | High — independent coverage would satisfy GSC and Knowledge Graph |
| ICT Frame press pitch | Sent 2026-10-29 | High |
| DEV.to technical articles | Not written yet | Medium — self-published but indexed by Google |
| Hashnode technical articles | Not written yet | Medium |
| Re-submit Wikipedia when coverage exists | Blocked until sources | High — required for Knowledge Panel |
| Google Search Profile (`g.co/people`) | Unchecked | Medium — region availability unconfirmed |

---

## 6. Recommended Next Steps (Prioritized)

1. **Wait for TechPana or ICT Frame response.** This is the highest-leverage action and requires no code.
2. **Publish 2–3 technical articles on DEV.to under the dszae account.** Articles about the IOE Admission Hub methodology or Git Visualizer internals would create indexed, named, attributed content.
3. **Check Google People profile availability** by visiting `https://g.co/people` while signed in with the Google account associated with `dsz.ae18@gmail.com`.
4. **Fix the canonical trailing slash mismatch** (see baseline.md ISSUE-001).
5. **Update `dateModified`** in JSON-LD to the current date dynamically.
6. **Only re-submit Wikipedia AfC** once at least one independent third-party article is published.

---

## 7. Uncertain Outcomes

- Even with Wikipedia approval and press coverage, Google does not guarantee a Knowledge Panel.
- Knowledge Panels are generated by Google's proprietary algorithms and cannot be directly requested or forced.
- Timeline for any SERP change following new coverage: estimated 4 to 12 weeks.
