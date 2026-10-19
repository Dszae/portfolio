# Dipesh Sapkota Portfolio — Production AI Agent Architecture & Guide

This document provides a comprehensive reference for the LLM-powered AI agent integrated into **Dipesh Sapkota's** official portfolio website ([dipeshsapkota7.com.np](https://www.dipeshsapkota7.com.np)).

---

## 1. System Architecture

```
                    ┌─────────────────────────┐
                    │   Visitor Browser UI    │
                    │ (AiAssistantLauncher &  │
                    │    AiAssistantPanel)    │
                    └────────────┬────────────┘
                                 │ HTTP POST /api/chat (SSE Stream)
                                 ▼
                    ┌─────────────────────────┐
                    │  Rate Limiter & Zod     │
                    │ (Sliding Window: 20/5m) │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   Agent Orchestrator    │
                    │  (Bounded Tool Loop)    │
                    └──────┬────────────┬─────┘
                           │            │
            OpenAI Tool    │            │ RAG & Tool Execution
            Call Requests  │            │
                           ▼            ▼
               ┌──────────────┐   ┌───────────────────────────┐
               │ OpenAI Model │   │       Tool Registry       │
               │ (gpt-4o-mini │   │  - search_projects        │
               │   / gpt-4o)  │   │  - get_project_details    │
               └──────────────┘   │  - get_project_demo       │
                                  │  - search_articles        │
                                  │  - get_profile_info       │
                                  │  - get_github_repository  │
                                  │  - get_repository_readme  │
                                  │  - get_contact_links      │
                                  └─────────────┬─────────────┘
                                                │
                                                ▼
                                  ┌───────────────────────────┐
                                  │   Portfolio RAG System    │
                                  │ (Projects, Skills, Bio,   │
                                  │  Articles, Certificates)  │
                                  └───────────────────────────┘
```

---

## 2. Environment Variables & Configuration

The agent reads configuration securely from server-side environment variables (`.env.local` or Vercel Environment Variables). **No secrets or keys are ever exposed to the client.**

| Variable | Description | Default / Example | Required |
|---|---|---|---|
| `OPENAI_API_KEY` | Official OpenAI API Secret Key (`sk-...`) | `sk-...` | Optional (Agent runs in deterministic grounded fallback mode if absent) |
| `OPENAI_MODEL` | OpenAI Model for chat and tool evaluation | `gpt-4o-mini` (or `gpt-4o`) | Optional |
| `SUPABASE_URL` | Supabase Project Database Endpoint | `https://tihkvcybdvvovmnvkdrx.supabase.co` | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Private Supabase Server Key for database sync | `eyJ...` | Yes |

### Fallback Mode:
If `OPENAI_API_KEY` is not present, the agent automatically runs the **Deterministic Grounded Fallback Engine**, executing RAG and tool lookups directly so visitors can always explore projects, demos, technical articles, and contact info without service interruptions.

---

## 3. Tool Registry Reference

The LLM decides dynamically when to invoke tools. All parameters are strictly validated using Zod:

1. **`search_projects({ query, technology, category })`**:
   - Searches and filters projects by tech stack (e.g. `Next.js`, `Python`, `C++`, `React`, `Tailwind CSS`) or category (`dev`, `media`, `exp`).
2. **`get_project_details({ project_id })`**:
   - Fetches architecture, tech stack, feature overview, GitHub link, and demo URL for any project (e.g. `sportivo`, `git-visualizer`, `ioe-admission-guide`, `555-flasher`).
3. **`get_project_demo({ project_id })`**:
   - Retrieves active live demo URLs or interactive playground links.
4. **`search_articles({ query })`**:
   - Searches technical engineering articles and tutorials (e.g. Git DAG state modeling, 555 astable multivibrators).
5. **`get_profile_information({ section })`**:
   - Returns verified biographical details, academic education at IOE Thapathali Campus (2022-2026), and freelance video editing experience (4+ years, 50+ clients).
6. **`get_github_repository({ owner, repo })`**:
   - Safely queries GitHub REST API for stars, forks, language, open issues, and repository status (default owner `dszae`).
7. **`get_repository_readme({ owner, repo })`**:
   - Fetches public `README.md` documentation for in-depth repository grounding.
8. **`get_contact_links()`**:
   - Returns direct email, LinkedIn, GitHub, Twitter/X, and Instagram links.

---

## 4. Security & Safety Controls

- **Sliding Window Rate Limiter**: Maximum 20 requests per 5 minutes per client IP to safeguard against abuse and token exhaustion.
- **Bounded Tool Loop**: Maximum 5 tool-calling iterations to prevent runaway loops.
- **Strict Grounding Instructions**: System prompt prevents fabricating personal degrees, technologies, or achievements.
- **Safe Markdown Rendering**: Strips raw HTML scripts, validates URLs, and opens external links safely in new tabs.
- **Input Sanitization**: Request bodies validated against `ChatRequestSchema` with strict limits on message length (max 8,000 characters per message, max 20 messages per session).

---

## 5. Verification & Testing

Run the automated test suite locally:
```bash
node --env-file=.env.local tests/agent.test.js
```

### Test Coverage (13/13 Passed):
- Knowledge base indexing across all portfolio sectors.
- Keyword and hybrid RAG retrieval.
- Category filtering.
- Tool execution: project searching by technology (`Next.js`).
- Tool execution: detailed architecture lookup for `sportivo`.
- Tool execution: error handling for missing project slugs.
- Tool execution: demo retrieval for `git-visualizer`.
- Tool execution: profile and education verification.
- Tool execution: contact links verification.
- Tool execution: safe handling of non-existent or rate-limited GitHub repositories.
- Request payload schema validation with Zod.
- Rate limiter sliding window and quota decrement.
- Abusive request blocking when budget is exceeded.
