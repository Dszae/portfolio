# Implementation Log
**Subject:** Dipesh Sapkota  
**Audit Date:** 2026-10-30

---

## Changes Implemented

### IMPL-001 — metadataBase Trailing Slash (P1-A)
- **File:** `app/layout.jsx` line 31
- **Change:** `new URL('https://www.dipeshsapkota7.com.np')` → `new URL('https://www.dipeshsapkota7.com.np/')`
- **Reason:** Ensures canonical URL emitted by Next.js metadata matches the served URL with trailing slash.
- **Status:** Applied, build in progress.

### IMPL-002 — dateModified Dynamic Timestamp (P2-B)
- **File:** `components/JsonLdSchema.jsx` line 298
- **Change:** Static `'2026-10-11T00:00:00+05:45'` → `new Date().toISOString()`
- **Reason:** Signals freshly maintained content to Googlebot on each build.
- **Status:** Applied, build in progress.

---

## Changes Not Implemented (With Reason)

| Item | Reason Not Implemented |
| --- | --- |
| worksFor Clamphook removal | Requires owner confirmation on current employment status |
| DEV.to / Hashnode articles | Requires owner writing effort |
| ORCID website field | Requires owner to log into orcid.org |
| External profile website links | Requires owner to log into each platform |
| Wikipedia re-submission | Blocked until independent press coverage published |
| Google People Profile | Requires owner to visit g.co/people and check availability |

---

## No-Change Confirmations (Already Correct)

- robots.txt: No changes needed
- Sitemap: No changes needed
- og:image: No changes needed (HTTP 200 confirmed)
- Person JSON-LD: No changes needed (comprehensive, correct)
- sameAs profiles: No changes needed (all 14 return HTTP 200)
- Wikidata entity: No changes needed (properties already set)

