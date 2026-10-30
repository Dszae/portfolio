# Entity Audit Final Report & Executive Answers

**Project:** Dipesh Sapkota — Existing Entity Reconciliation & Knowledge Panel Investigation  
**Date:** 2026-10-30  
**Investigator:** Senior Technical SEO Auditor, Entity Analyst & Digital Identity Researcher  
**Status:** Investigation Complete — Baseline & Evidence Verified

---

## Direct Answers to the 12 Mandatory Questions

### 1. Was the existing Wikidata item verified?
**Yes.** Programmatic inspection of Wikidata API confirmed that item **`Q141595522`** is the live, active entity representing Dipesh Sapkota. 
*Note on discrepancy:* The prompt referenced `Q131333792`. That item belongs to Fernand Clavaud (a French archivist), not Dipesh Sapkota.

### 2. Is it correctly associated with the intended person?
**Yes.** `Q141595522` has label `Dipesh Sapkota`, describes him as an engineering student from Nepal, links to official site `https://www.dipeshsapkota7.com.np/`, ORCID `0009-0001-7595-5114`, educated at Thapathali Campus (`Q7710687`), and links to GitHub (`dszae`) and LinkedIn (`dszae`).

### 3. Were any existing Wikidata statements demonstrably wrong or unsupported?
**Partially.** 
- The description has a minor spelling defect (`Nepa` instead of `Nepal`).
- All references currently attached cite the subject's own portfolio website. There are zero independent secondary citations.

### 4. Was the website's existing Person schema already correct?
**Yes.** The JSON-LD schema on `https://www.dipeshsapkota7.com.np/` is comprehensive and structurally valid. It defines `Person` with unique IRI `#author`, `ProfilePage`, `ImageObject` bound to Wikimedia Commons, `alumniOf`, `knowsAbout`, and specific social profiles.

### 5. Were the sameAs URLs correct and specific?
**Yes.** All 14 `sameAs` URLs point directly to exact user handles (`/in/dszae`, `@dszae`, `dszae`), avoiding generic root domains.

### 6. Is there evidence of a genuine indexing or canonical issue?
**No.** The canonical URL trailing slash was resolved and verified. Googlebot requests return HTTP 200 without obstruction. All 16 sitemap routes are healthy and returning HTTP 200.

### 7. What can public search results establish about name ambiguity?
**High name ambiguity exists on Google SERP.** Searching `"Dipesh Sapkota"` returns:
- An independent LinkedIn profile for a Civil & Structural Engineer
- A Facebook profile of a namesake
- A TikTok video for a cricket player
- Two podcast interviews (The Doers Nepal, Aajako Press) featuring different individuals
Google currently categorizes the query as ambiguous and displays directories (`50+ profiles`) and blended media rather than a single entity.

### 8. What can Search Console establish about the actual ranking?
Without direct GSC API access, historical impressions and exact position distributions cannot be extracted. However, ownership verification (`googlee83ab4f98a91a8c2.html`) is active, and the protocol to export Performance and Indexing reports is documented in `search-console-findings.md`.

### 9. What is the strongest evidence-based explanation for the missing Knowledge Panel?
**Lack of independent third-party corroboration combined with an unapproved Wikipedia presence.**
Google Knowledge Panels are algorithmic summaries generated when an entity is corroborated across independent, reliable secondary sources (news media, encyclopedic mainspace, books). Because Dipesh Sapkota's credentials and projects are currently self-published and the Wikipedia draft was declined for notability (`WP:N`), Google has not established the entity confidence threshold required to render a Knowledge Panel.

### 10. What is the highest-value remaining action?
**Securing independent media coverage for the IOE Admission Hub or Git Visualizer.**
Pitche emails were dispatched to *TechPana* and *ICT Frame*. A single published article in a credible tech outlet provides the third-party secondary citation needed to satisfy Wikipedia notability and feed Google's Knowledge Graph.

### 11. Which tasks are complete and should not be repeated?
- Do NOT create a duplicate Wikidata item.
- Do NOT rewrite or over-stuff website JSON-LD schema.
- Do NOT resubmit the sitemap or blast indexing requests.
- Do NOT resubmit the Wikipedia AfC draft until independent articles are published.
- Do NOT insert `Q131333792` anywhere (it belongs to Fernand Clavaud).

### 12. Which questions cannot be answered without additional data?
- Historical search query impressions and click-through rates (requires Search Console export).
- Whether Google's internal index has fully processed the latest metadataBase changes (requires Search Console URL Inspection tool).
