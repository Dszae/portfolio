# Google Entity Analysis: Observable SERP Dynamics & Disambiguation

**Date:** 2026-10-30  
**Investigator:** Senior Search-Engine Entity Analyst  
**Methodology:** Direct programmatic query inspection, SERP artifact analysis, and knowledge graph observation.

---

## 1. Query Observation Matrix

| Query | Top Results Observed | Apparent Identity Represented | Disambiguation Outcome |
| :--- | :--- | :--- | :--- |
| `"Dipesh Sapkota"` | 1. LinkedIn profile (`np.linkedin.com/in/dszae`)<br>2. Facebook profile (`/thedipeshsapkota/`)<br>3. LinkedIn Civil Engineer (`/in/dipeshsapkota`)<br>4. Instagram (`@dsz.ae`)<br>Video Pack: TikTok cricketer, 2 podcasts | **Mixed Multiple Entities:**<br>1. Dipesh Sapkota (Computer Eng student)<br>2. Dipesh Sapkota (Civil/Structural Engineer)<br>3. Dipesh Sapkota (Cricket Player on TikTok)<br>4. Dipesh Sapkota (Medical Doctor podcast) | **High Query Ambiguity.** Google displays directories and multiple conflicting individuals. |
| `"Dipesh Sapkota" Nepal` | 1. LinkedIn (`/in/dszae`)<br>2. about.me (`/dipeshsapkota`)<br>3. LinkedIn (`/in/dipesh-sapkota-6a798a145`)<br>4. Cultural Tour Guide (`himalayansignature.com`) | **Mixed Regional Entities:**<br>Shows the student, alongside a Kathmandu tour guide and another namesake profile. | Disambiguation remains split between multiple Nepalese nationals sharing the identical name. |
| `"Dipesh Sapkota" IOE` | No distinct competitor results; portfolio and LinkedIn indexable. | Engineering student at IOE Thapathali. | Strong topical association, low namesake interference. |
| `"Dipesh Sapkota" Thapathali` | Focused on student entity. | Engineering student at IOE Thapathali. | Isolated entity match. |
| `"Dipesh Sapkota" "Computer Engineering"` | Focused on student entity. | Engineering student at IOE Thapathali. | Isolated entity match. |
| `"Dipesh Sapkota" site:dipeshsapkota7.com.np` | Site indexed under official domain. | Official portfolio entity. | Direct canonical match. |

---

## 2. Knowledge Panel Observation

* **Knowledge Panel Status:** **ABSENT** for both `"Dipesh Sapkota"` and related identity queries.
* **Google's Current Presentation:**
  * Displays a standard organic link stack.
  * Displays a multi-entity Video Pack ("भिडियोहरू") citing external third parties (TikTok, YouTube channels of third-party interviewers).
  * Displays LinkedIn directory link (`50+ "Dipesh Sapkota" profiles`) alongside direct profile when queried in specific regional contexts.
* **Claim or Feedback Features:** Not available because no entity card has been surfaced.

---

## 3. Disambiguation Analysis

Google's search engine separates identity queries into two categories:
1. **Disambiguated Entities:** When a query matches an established entity with an authoritative node in the Google Knowledge Graph (typically supported by Wikipedia mainspace, Freebase historical mapping, or high-volume news coverage), Google triggers a Knowledge Panel.
2. **Ambiguous Name Strings:** When a query matches multiple living individuals with distinct digital footprints but none possess overwhelming independent authority, Google serves a blended SERP composed of directories, top-ranking social links, and video carousels.

Currently, **"Dipesh Sapkota" is processed by Google as an Ambiguous Name String**, not a single resolved Knowledge Graph entity.
