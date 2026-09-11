# Portfolio — Ahmed Mobasher

Personal portfolio and engineering case-study site.
**Live:** https://mobasherahmed.github.io/Portfolio/

Senior Frontend Engineer and Frontend Tech Lead — Angular, TypeScript, Nx monorepos,
micro frontends and design systems.

---

## Stack

| Area | Choice |
|---|---|
| Framework | Angular 13, TypeScript |
| i18n | `@ngx-translate` — English + Arabic with full RTL |
| Styling | SCSS, Bootstrap grid |
| Hosting | GitHub Pages, deployed by GitHub Actions |
| Analytics | Google Analytics 4 |

## Engineering notes

**Content is data, not markup.** Experience entries, case studies and the project
archive all live in `src/assets/i18n/{en,ar}.json` and render through the same
components. Adding a role or a case study is a data change; the English and Arabic
files are key-for-key identical so neither can silently drift.

**Routes are pre-rendered because GitHub Pages has no SPA rewrite.**
A client-side route such as `/Portfolio/en` returns HTTP 404 on Pages — the page
appears to load via the custom 404 document, but crawlers and link checkers see a
dead link. [`tools/prerender-routes.js`](tools/prerender-routes.js) writes a real
`index.html` for every known route after the build, each with its own `lang`, `dir`
and canonical URL, so every route answers 200. CI fails the build if any of them
goes missing.

**RTL is a direction change, not a translation.** `LanguageService` sets `lang` and
`dir` on `<html>`; layout mirrors via logical properties, while Latin technology
names are isolated with `unicode-bidi` so strings like `AG Grid` don't reorder
inside Arabic text.

**Case studies degrade without screenshots.** Most of the strongest work is on
private enterprise repositories, so a case study renders full-width and text-first
when it has no images, rather than leaving an empty media column.

## Local development

```bash
npm install --legacy-peer-deps   # Angular 13 predates current peer-dep resolution
npm start                        # http://localhost:4200
```

## Build

```bash
npm run build-portfolio          # production build + route pre-rendering
```

Output lands in `dist/ahmed-mobasher-portfolio/`. Pushing to `main` builds and
deploys automatically via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Updating the resume

Replace `src/assets/cv/Ahmed-Mobasher-CV.pdf`, keeping the filename. Every download
link resolves through `src/app/services/cv.constants.ts`.

## Credits

The visual design originates from [Brittany Chiang's v4](https://github.com/bchiang7/v4),
by way of the Angular port by [Andrés Hernández](https://github.com/andresjosehr/andresjosehr-portfolio).
Content, architecture, i18n/RTL support, route pre-rendering and deployment pipeline
are my own.
