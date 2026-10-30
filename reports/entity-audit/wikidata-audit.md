# Wikidata Audit Report: Item Verification & Sourcing Analysis

**Date:** 2026-10-30  
**Investigator:** Senior Entity Analyst & Technical Auditor  
**Primary Focus:** Verification of Reported QID vs Actual Item on Wikidata

---

## 1. Discrepancy & Item Identity Verification

### A. Reported Item: `Q131333792`
* **Status:** Verified on Wikidata API.
* **Actual Subject:** **Fernand Clavaud** (French archivist/historian).
* **Claims:** Instance of human (Q5), sex or gender male (Q21), FranceArchives authority ID (P4724), FMD authority ID (P9058).
* **Conclusion:** `Q131333792` is **NOT** Dipesh Sapkota. Linking to or treating `Q131333792` as Dipesh Sapkota is a critical factual error.

### B. True Item for Dipesh Sapkota: `Q141595522`
* **Status:** Verified on Wikidata API (`Special:EntityData/Q141595522.json`).
* **Title:** Dipesh Sapkota
* **Label (en):** `Dipesh Sapkota`
* **Description (en):** `Computer engineering student from Nepa` (Note: minor typo in description "Nepa" instead of "Nepal").
* **Aliases:** `Dipesh Sapkota`

---

## 2. Statement & Reference Audit for `Q141595522`

| Property | Property Label | Claim Value | Reference Count | Reference Details | Sourcing Assessment |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P31** | instance of | human (Q5) | 1 | URL reference: `https://www.dipeshsapkota7.com.np/` | Self-published source (primary) |
| **P27** | country of citizenship | Nepal (Q837) | 1 | URL reference: `https://www.dipeshsapkota7.com.np/` | Self-published source |
| **P106** | occupation | computer engineering student (Q7042855) | 1 | URL reference: `https://www.dipeshsapkota7.com.np/` | Self-published source |
| **P69** | educated at | Thapathali Campus (Q7710687) | 1 | URL reference: `https://www.dipeshsapkota7.com.np/` | Self-published source |
| **P856** | official website | `https://www.dipeshsapkota7.com.np/` | 1 | URL reference: `https://www.dipeshsapkota7.com.np/` | Self-referential |
| **P2037** | GitHub username | `dszae` | 0 | None | Unreferenced |
| **P2002** | X username | `DszAe18` | 0 | None | Unreferenced |
| **P6634** | LinkedIn personal profile ID | `dszae` | 0 | None | Unreferenced |
| **P2003** | Instagram username | `dsz.ae` | 0 | None | Unreferenced |
| **P2013** | Facebook user ID | `dsz.ae` | 0 | None | Unreferenced |
| **P496** | ORCID iD | `0009-0001-7595-5114` | 0 | None | Unreferenced |
| **P18** | image | `Dipesh Sapkota.jpg` | 0 | None | Wikimedia Commons link (valid file) |
| **P11245** | YouTube handle | `dszae` | 0 | None | Unreferenced |

---

## 3. Wikidata Policy & Structural Deficiencies

1. **Circular / Self-Published Sourcing:**
   - Statements with references (P31, P27, P106, P69, P856) cite only `https://www.dipeshsapkota7.com.np/`.
   - Under Wikidata's Verifiability policy, self-published personal websites are acceptable for basic identifiers but cannot substantiate general biographical claims or withstand notability challenges.
2. **Missing Identifiers & Statements:**
   - The English description contains a spelling defect (`Nepa` instead of `Nepal`).
   - Sourcing is absent for external identifier claims (P496 ORCID, P6634 LinkedIn, P2037 GitHub). While identifier properties frequently exist without references on Wikidata, adding ORCID's direct link strengthens trust.
3. **Notability & Deletion Risk:**
   - Wikidata has a Notability guideline (`Wikidata:Notability`). Entities that fail to cite independent reliable sources or do not have corresponding items/sitelinks are susceptible to deletion requests (`Wikidata:Requests for deletions`).

---

## 4. Key Takeaways

- The portfolio codebase correctly referenced `Q141595522` in `sameAs` arrays (e.g. `https://www.wikidata.org/wiki/Q141595522`).
- The prompt's reference to `Q131333792` is completely erroneous. Under no circumstances should `Q131333792` be introduced into the portfolio schema.
