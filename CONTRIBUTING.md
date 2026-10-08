# Contributing

Thanks for your interest in improving this portfolio repository.

## Before You Start

- Check existing issues/PRs to avoid duplicate work.
- Keep changes focused and minimal.
- Do not commit secrets, generated build output, or dependency folders.

## Local Setup

```bash
git clone https://github.com/Dszae/portfolio.git
cd portfolio
npm install
```

## Development Workflow

1. Create a feature branch.
2. Make small, reviewable commits.
3. Run checks before opening a PR:

```bash
npm run lint
npm run build
```

4. Update documentation when behavior or usage changes.

## Pull Request Guidelines

- Explain **what** changed and **why**.
- Include screenshots/GIFs for visible UI updates when relevant.
- Keep PR scope limited to one concern.
- Ensure CI passes.

## Code Style

- Follow existing Next.js + React patterns.
- Keep component and route naming consistent with current structure.
- Avoid unrelated refactors in the same PR.
