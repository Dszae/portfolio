# Remediation Plan
**Subject:** Dipesh Sapkota  
**Audit Date:** 2026-10-30

---

## Priority Classification

| Class | Definition |
| --- | --- |
| P0 | Blocking issue for Knowledge Panel or ranking |
| P1 | High-confidence fix with confirmed evidence |
| P2 | Evidence-backed improvement |
| P3 | Optional with uncertain impact |

---

## P0 — Knowledge Panel Blockers

### P0-A: Absence of Independent Press Coverage
- **Issue:** No third-party publications have covered Dipesh Sapkota's work.
- **Evidence:** Wikipedia reviewer rejected draft citing `WP:N` (notability). Google Knowledge Graph requires corroboration.
- **Action:** Await response from TechPana (news@techpana.com) and ICT Frame (info@ictframe.com). Pitches dispatched 2026-10-29.
- **Expected Benefit:** Once published, satisfies Wikipedia notability and Google entity corroboration.
- **Confidence:** High that coverage enables re-submission. No guarantee of publication.
- **Timeline:** Weeks to months; outside technical control.
- **Verification:** Search for article URL in Google, then re-check SERP.

### P0-B: Wikipedia Draft in Declined State
- **Issue:** `Draft:Dipesh_Sapkota` carries `{{AfC submission|d|n}}` rejection tag. This is indexed and visible.
- **Evidence:** MediaWiki API confirmed declined status.
- **Action:** Do NOT re-submit until independent press coverage exists. Premature re-submission will result in faster rejection and possible account flag.
- **Confidence:** High.
- **Verification:** Once TechPana/ICT Frame publishes, add ref, re-submit.

---

## P1 — High-Confidence Technical Fixes

### P1-A: Canonical Trailing Slash Mismatch
- **Issue:** Canonical emits `https://www.dipeshsapkota7.com.np` but served URL is `https://www.dipeshsapkota7.com.np/`.
- **Evidence:** Live fetch confirmed.
- **File:** `app/layout.jsx` or Next.js metadata config
- **Action:** Ensure canonical URL ends with trailing slash, matching the served URL.
- **Expected Benefit:** Removes signal ambiguity for Googlebot.
- **Confidence:** High.
- **Risk:** Low.

### P1-B: Verify worksFor Clamphook Academy Accuracy
- **Issue:** `worksFor: {"@type": "Organization", "name": "Clamphook Academy"}` in Person schema.
- **Evidence:** Found in components/JsonLdSchema.jsx line 109.
- **Action:** If no longer currently employed/contracted, remove or update `worksFor`.
- **Expected Benefit:** Accurate entity data; avoids misleading Google's entity graph.
- **Confidence:** High that accuracy matters.

---

## P2 — Evidence-Backed Improvements

### P2-A: Publish Technical Articles on DEV.to and Hashnode
- **Issue:** dszae profiles on DEV.to and Hashnode have no published articles.
- **Evidence:** Profile pages confirmed HTTP 200 but no articles observed.
- **Action:** Write 2–3 technical articles (500+ words each) attributed to "Dipesh Sapkota":
  - How the IOE Admission Hub rank predictor algorithm works
  - How the Git Visualizer DAG engine was built
  - An embedded systems tutorial based on 555 Flasher or Motor Modeling project
- **Expected Benefit:** Creates indexed, named, attributed content across independent platforms.
- **Confidence:** Medium.

### P2-B: Update dateModified in JSON-LD Dynamically
- **Issue:** `ProfilePage.dateModified` is hardcoded as `"2026-10-11T00:00:00+05:45"`.
- **Evidence:** components/JsonLdSchema.jsx line 298.
- **Action:** Replace with `new Date().toISOString()` or a build-time timestamp.
- **Expected Benefit:** Signals fresh, maintained content to crawlers.
- **Confidence:** Medium.

### P2-C: Confirm External Profile Website Links
- **Issue:** ORCID, DEV.to, Hashnode, GitHub, LinkedIn website fields unverified.
- **Action:** Manually confirm each profile has `https://www.dipeshsapkota7.com.np/` set as website.
- **Expected Benefit:** Strengthens entity corroboration across platforms.
- **Confidence:** Medium.

### P2-D: Check Google People Profile
- **Issue:** Google's `g.co/people` search profile feature may be available.
- **Action:** Visit https://g.co/people while signed in as `dsz.ae18@gmail.com` and complete the profile if available.
- **Expected Benefit:** Directly feeds Google's entity graph without Wikipedia dependency.
- **Confidence:** Unknown — availability in Nepal is unconfirmed.

---

## P3 — Optional Enhancements

### P3-A: Add `interactionStatistic` to SoftwareApplication Schemas
- GitHub star counts for dszae repos, if available, can be added to project schemas.
- Requires GitHub API access. Low confirmed impact.

### P3-B: Add `maintainedBy` or `contributor` to project schemas
- Explicitly linking project schemas back to the Person entity.
- Already partially implemented via `author` and `creator`.
