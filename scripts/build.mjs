import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collect } from './collect.mjs';
import { CATEGORIES } from './lib/classify.mjs';
import { PROVINCES } from './lib/geo.mjs';
import { getJson } from './lib/util.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const CACHE = join(ROOT, '.cache', 'jobs.json');

const SITE_URL = (process.env.SITE_URL || 'http://localhost:4173').replace(/\/$/, '');
const REPORT_URL = /^https:\/\/docs\.google\.com\/forms\//.test(process.env.REPORT_URL || '') ? process.env.REPORT_URL : '';
const SUBMIT_URL = /^https:\/\//.test(process.env.SUBMIT_URL || '') ? process.env.SUBMIT_URL : '';
const BASE_PATH = new URL(SITE_URL).pathname.replace(/\/?$/, '/');

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

const REMOTE_NAMES = { jobicy: 'Jobicy', remotive: 'Remotive', himalayas: 'Himalayas', remoteok: 'Remote OK', weworkremotely: 'We Work Remotely' };

async function loadPrevious() {
  const url = process.env.PREVIOUS_JOBS_URL;
  if (url) {
    try {
      const data = await getJson(url, { retries: 1, timeout: 20000 });
      if (Array.isArray(data?.jobs)) {
        console.log(`Datos anteriores: ${data.jobs.length} puestos desde ${new URL(url).host}`);
        return data;
      }
    } catch (e) {
      console.log(`No se pudieron leer los datos anteriores (${e.message}). Se empieza de cero.`);
    }
  }
  if (existsSync(CACHE)) {
    try {
      const data = JSON.parse(readFileSync(CACHE, 'utf8'));
      console.log(`Datos anteriores: ${data.jobs.length} puestos desde caché local`);
      return data;
    } catch { /* cache dañado */ }
  }
  return null;
}

function page(template, v) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in v ? v[k] : ''));
}

function noscriptList(jobs) {
  if (!jobs.length) return '';
  const items = jobs
    .slice(0, 40)
    .map((j) => `<li><a href="${esc(j.url)}" rel="noopener noreferrer nofollow ugc">${esc(j.title)}</a>${j.company ? ` — ${esc(j.company)}` : ''}${j.location ? ` (${esc(j.location)})` : ''}</li>`)
    .join('');
  return `<noscript><div class="noscript-list"><h2>Últimos bretes</h2><ul>${items}</ul><p>Activá JavaScript para buscar y filtrar.</p></div></noscript>`;
}

function rss(jobs) {
  const items = jobs
    .slice(0, 100)
    .map(
      (j) => `<item><title>${esc(j.title + (j.company ? ' — ' + j.company : ''))}</title><link>${esc(j.url)}</link><guid isPermaLink="false">${j.id}</guid><pubDate>${new Date(j.postedAt).toUTCString()}</pubDate><description>${esc([j.location, j.salary, j.excerpt].filter(Boolean).join(' · '))}</description></item>`,
    )
    .join('');
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>TicoBrete: bretes nuevos en Costa Rica</title><link>${SITE_URL}/</link><description>Los empleos más recientes de Costa Rica, actualizados automáticamente.</description><language>es-CR</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}</channel></rss>`;
}

async function main() {
  const config = JSON.parse(readFileSync(join(ROOT, 'config', 'sources.json'), 'utf8'));
  console.log('TicoBrete: recopilando…');
  const prev = await loadPrevious();
  const { meta, jobs } = await collect({ prev, config });

  for (const s of meta.sources) if (REMOTE_NAMES[s.name]) s.name = REMOTE_NAMES[s.name];

  if (!jobs.length) throw new Error('No hay ningún puesto. Se cancela para no publicar un sitio vacío.');
  if (prev?.jobs?.length > 50 && jobs.length < prev.jobs.length * 0.3) {
    throw new Error(`Caída sospechosa de ${prev.jobs.length} a ${jobs.length} puestos. Se cancela la publicación.`);
  }

  rmSync(DIST, { recursive: true, force: true });
  cpSync(join(ROOT, 'site'), DIST, { recursive: true });
  mkdirSync(join(DIST, 'data'), { recursive: true });
  const payload = JSON.stringify({ meta, jobs });
  writeFileSync(join(DIST, 'data', 'jobs.json'), payload);
  mkdirSync(dirname(CACHE), { recursive: true });
  writeFileSync(CACHE, payload);

  const template = readFileSync(join(ROOT, 'site', 'index.html'), 'utf8');
  const total = jobs.length;
  const pages = [{ path: '', root: '', preset: '', title: 'TicoBrete: empleos en Costa Rica, todos en un solo lugar', h1: 'Todos los bretes de Costa Rica, <em>en un solo lugar</em>', desc: `${total} empleos activos en Costa Rica de empresas, comunidades y bolsas de trabajo. Se actualiza solo, es gratis y siempre te lleva al anuncio original.`, list: jobs }];

  for (const [key, name] of Object.entries(PROVINCES)) {
    const list = jobs.filter((j) => j.province === key);
    pages.push({ path: `empleos/${key}/`, preset: `prov:${key}`, title: `Empleos en ${name}, Costa Rica (${list.length}) | TicoBrete`, h1: `Empleos en ${esc(name)}, <em>actualizados todos los días</em>`, desc: `${list.length} ofertas de trabajo en ${name}, Costa Rica. Empresas, comunidades y bolsas de empleo en un solo lugar. Gratis y sin registro.`, list });
  }
  const remote = jobs.filter((j) => j.modality === 'remoto');
  pages.push({ path: 'empleos/remoto/', preset: 'scope:remote', title: `Trabajo remoto para ticos (${remote.length}) | TicoBrete`, h1: 'Trabajo remoto <em>desde Costa Rica</em>', desc: `${remote.length} empleos remotos abiertos a personas en Costa Rica y Latinoamérica. Actualizado automáticamente.`, list: remote });
  for (const [key, name] of Object.entries(CATEGORIES)) {
    const list = jobs.filter((j) => j.category === key);
    if (list.length < 3 || key === 'otros') continue;
    pages.push({ path: `empleos/${key}/`, preset: `cat:${key}`, title: `Empleos de ${name} en Costa Rica (${list.length}) | TicoBrete`, h1: `Empleos de ${esc(name.toLowerCase())}, <em>en Costa Rica</em>`, desc: `${list.length} ofertas de ${name.toLowerCase()} en Costa Rica y remoto. Actualizado automáticamente, gratis y sin registro.`, list });
  }

  for (const p of pages) {
    const depth = p.path.split('/').filter(Boolean).length;
    const rootRel = '../'.repeat(depth);
    const canonical = `${SITE_URL}/${p.path}`;
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'TicoBrete',
      url: `${SITE_URL}/`,
      inLanguage: 'es-CR',
      description: p.desc,
      potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
    };
    const html = page(template, {
      ROOT: rootRel,
      TITLE: esc(p.title),
      DESCRIPTION: esc(p.desc),
      CANONICAL: esc(canonical),
      SITE_URL: esc(SITE_URL),
      PRESET: esc(p.preset || ''),
      REPORT_URL: esc(REPORT_URL),
      SUBMIT_URL: esc(SUBMIT_URL),
      H1: p.h1,
      NOSCRIPT: noscriptList(p.list),
      JSONLD: `<script type="application/ld+json">${json(ld)}</script>`,
    });
    const out = join(DIST, p.path, 'index.html');
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
  }

  // 404 con rutas absolutas (funciona desde cualquier URL)
  writeFileSync(
    join(DIST, '404.html'),
    page(template, { ROOT: BASE_PATH, TITLE: 'Página no encontrada | TicoBrete', DESCRIPTION: 'Esta página no existe, pero hay bretes esperándote.', CANONICAL: `${SITE_URL}/`, SITE_URL: esc(SITE_URL), PRESET: '', REPORT_URL: esc(REPORT_URL), SUBMIT_URL: esc(SUBMIT_URL), H1: 'Esa página no existe, <em>pero los bretes sí</em>', NOSCRIPT: '', JSONLD: '' }).replace('<meta charset="utf-8">', '<meta charset="utf-8"><meta name="robots" content="noindex">'),
  );

  writeFileSync(join(DIST, 'feed.xml'), rss(jobs));
  const day = meta.updatedAt.slice(0, 10);
  writeFileSync(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((p) => `<url><loc>${SITE_URL}/${p.path}</loc><lastmod>${day}</lastmod><changefreq>daily</changefreq><priority>${p.path ? '0.7' : '1.0'}</priority></url>`).join('')}</urlset>`,
  );
  writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

  console.log(`\nListo: ${total} puestos, ${pages.length} páginas en dist/ (${(payload.length / 1024).toFixed(0)} KB de datos)`);
}

main().catch((err) => {
  console.error('\nERROR:', err.message);
  process.exit(1);
});
