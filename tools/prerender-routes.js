#!/usr/bin/env node
/**
 * GitHub Pages serves static files only — it has no SPA rewrite. A client-side
 * route like /Portfolio/en therefore returns HTTP 404, which is what made the
 * portfolio URL printed on the CV look like a dead link to Google and to
 * LinkedIn's link preview.
 *
 * This writes a real index.html for every known route so each one answers 200,
 * with the correct lang/dir/canonical baked in. 404.html stays as the fallback
 * for anything genuinely unknown.
 */
const fs = require('fs');
const path = require('path');

const DIST = process.argv[2] || 'dist/ahmed-mobasher-portfolio';
const ORIGIN = 'https://mobasherahmed.github.io/Portfolio';

const ROUTES = [
  { dir: 'en',          lang: 'en', dirAttr: 'ltr' },
  { dir: 'ar',          lang: 'ar', dirAttr: 'rtl' },
  { dir: 'en/projects', lang: 'en', dirAttr: 'ltr' },
  { dir: 'ar/projects', lang: 'ar', dirAttr: 'rtl' },
  { dir: 'projects',    lang: 'en', dirAttr: 'ltr' },
];

const indexPath = path.join(DIST, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error(`✗ ${indexPath} not found — run the production build first.`);
  process.exit(1);
}
const index = fs.readFileSync(indexPath, 'utf8');

for (const route of ROUTES) {
  const html = index
    .replace(/<html lang="[^"]*" dir="[^"]*">/, `<html lang="${route.lang}" dir="${route.dirAttr}">`)
    .replace(
      /<link rel="canonical" href="[^"]*">/,
      `<link rel="canonical" href="${ORIGIN}/${route.dir}">`
    );

  const outDir = path.join(DIST, route.dir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  console.log(`✓ /${route.dir}/index.html`);
}

// Fallback for unknown paths; Angular's wildcard route redirects to home.
fs.writeFileSync(path.join(DIST, '404.html'), index);
console.log('✓ 404.html (fallback)');

// GitHub Pages otherwise runs the output through Jekyll and drops _-prefixed files.
fs.writeFileSync(path.join(DIST, '.nojekyll'), '');
console.log('✓ .nojekyll');
