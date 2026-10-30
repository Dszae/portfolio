# Website Entity Signals Audit

**Date:** 2026-10-30  
**Domain:** `https://www.dipeshsapkota7.com.np/`  
**Framework Detected:** Next.js 16.3.8 (App Router), React 19.2.8, Tailwind CSS 4

---

## 1. What Already Works (Verified Implementations)

1. **Homepage Metadata:**
   - `<title>`: `Dipesh Sapkota | Computer Engineering Student & AI/ML Enthusiast`
   - Canonical URL: `https://www.dipeshsapkota7.com.np/` (normalized with trailing slash).
   - Description clearly establishes student status at IOE Thapathali Campus.
2. **Robots.txt & Crawl Accessibility:**
   - Explicit `Allow: /` for Googlebot, Googlebot-Image, Bingbot, etc.
   - Verified HTTP 200 returned directly to Googlebot user-agent without blocks, captchas, or intermediate redirects.
   - XML Sitemap actively exposed and returning 16 valid routes.
3. **Structured Data Implementation:**
   - `Person` schema with unique `@id`: `https://www.dipeshsapkota7.com.np/#author`.
   - `disambiguatingDescription`: Accurately states `"Computer Engineering Student · AI/ML Enthusiast · Motion Designer at IOE Thapathali Campus in Nepal; creator of IOE Admission Hub, Sportivo, and Git Visualizer; known online as dszae."`
   - `ImageObject` with `@id`: `https://www.dipeshsapkota7.com.np/#primary-image` and direct binding to Wikimedia Commons portrait `https://commons.wikimedia.org/wiki/File:Dipesh_Sapkota.jpg`.
   - `alumniOf` and `affiliation` correctly reference IOE Thapathali Campus and Tribhuvan University with their corresponding Wikipedia and Wikidata entity IDs.
   - Dynamic `dateModified` in `ProfilePage` schema.
4. **Specific `sameAs` Links:**
   - All profile URLs point to specific user handles (`/in/dszae`, `@dszae`, `dszae`), avoiding generic root domains.
   - Correct Wikidata entity `Q141595522` is included.

---

## 2. What Is Demonstrably Incorrect or Questionable

1. **`worksFor: Clamphook Academy` in Person Schema:**
   - `components/JsonLdSchema.jsx` line 107–110 defines `worksFor: { '@type': 'Organization', name: 'Clamphook Academy' }`.
   - In earlier ChatGPT search checks, this association caused the search engine to extract photos from Clamphook Academy ceremonies. If Dipesh is an independent undergraduate student and freelance motion designer rather than an active employee of Clamphook Academy, this schema attribute creates an entity misattribution anchor.
2. **Reported QID Inconsistency:**
   - The user query referenced `Q131333792` (Fernand Clavaud). The codebase correctly links `Q141595522`. Linking `Q131333792` would have corrupted the entity graph.

---

## 3. What Remains Unverified

1. **Google Rendering of Client-Side React Chunks:**
   - Next.js emits RSC stream data. While the initial HTML contains the `<script type="application/ld+json">` tag server-rendered, Search Console URL inspection is needed to confirm Googlebot's post-render parsing state.
2. **Individual Profile Inbound Link Equity:**
   - External profiles (GitHub, LinkedIn, DEV, Hashnode, ORCID) link back to `dipeshsapkota7.com.np`, but their reciprocal indexing state in Google cache cannot be definitively confirmed without private webmaster data.

---

## 4. Are Any Code Changes Actually Necessary?

- The core metadataBase and trailing slash fixes were implemented and deployed in commit `eedef72`.
- The remaining candidate for cleanup is verifying whether `worksFor` (Clamphook Academy) should be removed from `components/JsonLdSchema.jsx` and `lib/seoEngine.js` to eliminate ambiguity.
