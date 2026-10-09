// Revisión de SEO sobre el sitio ya construido (dist/). Uso: node test/seo.check.mjs
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const pages = walk(DIST).filter((f) => f.endsWith('.html') && !f.endsWith('404.html') && !/google[a-f0-9]{16}\.html$/.test(f));
const problems = [];
let noindexCount = 0;
const titles = new Map();
const descs = new Map();
const warn = (p, msg) => problems.push(`${relative(DIST, p)}: ${msg}`);
const attr = (html, re) => html.match(re)?.[1];

for (const p of pages) {
  const html = readFileSync(p, 'utf8');
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const h1s = (html.match(/<h1[ >]/g) || []).length;
  if (!title) warn(p, 'sin <title>');
  else {
    if (title.length > 70) warn(p, `título largo (${title.length}): ${title}`);
    if (titles.has(title)) warn(p, `título repetido con ${titles.get(title)}`);
    titles.set(title, relative(DIST, p));
  }
  if (!desc) warn(p, 'sin meta description');
  else {
    if (desc.length > 175) warn(p, `descripción larga (${desc.length})`);
    if (desc.length < 70) warn(p, `descripción corta (${desc.length})`);
    if (descs.has(desc)) warn(p, `descripción repetida con ${descs.get(desc)}`);
    descs.set(desc, relative(DIST, p));
  }
  if (!canonical || !canonical.startsWith('http')) warn(p, 'canonical inválido');
  if (h1s !== 1) warn(p, `debe haber 1 <h1> y hay ${h1s}`);
  const noindex = /name="robots" content="noindex/.test(html);
  if (!noindex && !/name="robots" content="index/.test(html)) warn(p, 'sin robots index');
  if (noindex) noindexCount++;
  if (/style="/.test(html)) warn(p, 'atributo style (rompe la CSP)');
  if (/<script(?![^>]*(src=|type="application\/ld\+json"))[^>]*>/.test(html)) warn(p, 'script en línea (rompe la CSP)');
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { warn(p, 'JSON-LD inválido'); }
  }
  // Enlaces internos
  for (const m of html.matchAll(/(?:href|src)="([^"#?]+)(?:[#?][^"]*)?"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|data:|\/\/)/.test(u)) continue;
    const target = resolve(dirname(p), u);
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    if (!ok && !existsSync(target + '.html')) warn(p, `enlace roto: ${u}`);
  }
  const imgNoAlt = (html.match(/<img(?![^>]*alt=)[^>]*>/g) || []).length;
  if (imgNoAlt) warn(p, `${imgNoAlt} imagen(es) sin alt`);
}

const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log(`Páginas HTML: ${pages.length} | URLs en el sitemap: ${locs.length}`);
if (locs.length !== pages.length - noindexCount) problems.push(`El sitemap tiene ${locs.length} URLs y hay ${pages.length - noindexCount} páginas indexables`);
if (/Disallow: \/data/.test(readFileSync(join(DIST, 'robots.txt'), 'utf8'))) problems.push('robots.txt bloquea /data/ (Google necesita leerlo para dibujar la página)');

if (problems.length) {
  console.log(`\n${problems.length} problema(s):`);
  for (const x of problems.slice(0, 40)) console.log(' - ' + x);
  process.exit(1);
}
console.log('SEO OK: títulos y descripciones únicos, 1 H1 por página, JSON-LD válido, sin enlaces rotos.');
