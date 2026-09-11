# Portfolio — Ahmed Mobasher

Personal portfolio and engineering case-study site.

**Live:** https://mobasherahmed.github.io/Portfolio/

Senior Frontend Engineer and Frontend Tech Lead — Angular, TypeScript, Nx
monorepos, micro frontends and design systems.

[![Build & Deploy](https://github.com/mobasherahmed/Portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/mobasherahmed/Portfolio/actions/workflows/deploy.yml)

---

## Stack

| Area | Choice |
|---|---|
| Framework | Angular 13, TypeScript |
| i18n | `@ngx-translate` — English + Arabic, full RTL |
| Styling | SCSS, Bootstrap grid |
| Testing | Karma + Jasmine |
| Hosting | GitHub Pages, deployed by GitHub Actions |
| Analytics | Google Analytics 4 |

## Engineering notes

**Routes are pre-rendered because GitHub Pages has no SPA rewrite.**
A client-side route such as `/Portfolio/en` returns HTTP 404 on Pages — the page
still renders through the custom 404 document, so it looks fine in a browser
while crawlers and link checkers see a dead link.
[`tools/prerender-routes.js`](tools/prerender-routes.js) writes a real
`index.html` for every known route after the build, each carrying its own `lang`,
`dir` and canonical URL, so every route answers 200. CI fails the build if any of
them goes missing.

**Content is data, not markup.** Experience entries, case studies and the project
archive all live in `src/assets/i18n/{en,ar}.json` and render through the same
components, so adding a role or a case study is a data change. The two locale
files are asserted key-for-key identical in
[`src/app/content.spec.ts`](src/app/content.spec.ts), which also pins the
employer list to the CV — neither locale can drift and no stale claim can creep
back in.

**RTL is a direction change, not a translation.** `LanguageService` sets `lang`
and `dir` on `<html>`; layout mirrors through logical properties, while Latin
technology names are isolated with `unicode-bidi` so strings like `AG Grid` keep
their order inside Arabic text.

**Case studies degrade without screenshots.** Most of the strongest work sits on
private enterprise repositories, so a case study renders full-width and text-first
when it has no images rather than leaving an empty media column.

## Local development

```bash
npm install --legacy-peer-deps   # Angular 13 predates current peer-dep resolution
npm start                        # http://localhost:4200
```

## Test

```bash
npm test        # watch mode
npm run test:ci # single run, headless
```

## Build

```bash
npm run build-portfolio   # production build + route pre-rendering
```

Output lands in `dist/ahmed-mobasher-portfolio/`. Pushing to `main` runs the
tests, builds, verifies every pre-rendered route exists, and publishes to GitHub
Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Updating the resume

Replace `src/assets/cv/Ahmed-Mobasher-CV.pdf`, keeping that filename. Every
download link resolves through
[`src/app/services/cv.constants.ts`](src/app/services/cv.constants.ts).

## Credits

Visual design derived from [Brittany Chiang's v4](https://github.com/bchiang7/v4)
(MIT), by way of an Angular port by
[Andrés Hernández](https://github.com/andresjosehr/andresjosehr-portfolio).
Content, architecture, i18n and RTL support, route pre-rendering, test suite and
deployment pipeline are my own.
