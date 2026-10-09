import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collect } from './collect.mjs';
import { CATEGORIES } from './lib/classify.mjs';
import { PROVINCES } from './lib/geo.mjs';
import { getJson } from './lib/util.mjs';
import { GUIAS as GUIAS_BASE } from '../content/guias.mjs';
import { GUIAS_LABORALES } from '../content/guias-laborales.mjs';
import { GUIAS_SEO } from '../content/guias-seo.mjs';
import { GUIAS_EXTRA } from '../content/guias-extra.mjs';
import { GUIAS_CALC } from '../content/guias-calc.mjs';
import { DESTACADAS, META, TEMAS } from '../content/guias-meta.mjs';
import { construirGuias, prepararGuias } from './lib/guias-site.mjs';

// Guías y calculadoras: se validan al construir (cada una necesita su ficha en content/guias-meta.mjs).
const { guias: GUIAS, temas: TEMAS_GUIAS } = prepararGuias([...GUIAS_BASE, ...GUIAS_LABORALES, ...GUIAS_SEO, ...GUIAS_EXTRA, ...GUIAS_CALC], TEMAS, META, DESTACADAS);

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const CACHE = join(ROOT, '.cache', 'jobs.json');

const SITE_URL = (process.env.SITE_URL || 'http://localhost:4173').replace(/\/$/, '');
const SUBMIT_URL = /^https:\/\//.test(process.env.SUBMIT_URL || '') ? process.env.SUBMIT_URL : '';
const REPORT_URL = /^https:\/\/docs\.google\.com\/forms\//.test(process.env.REPORT_URL || '') ? process.env.REPORT_URL : '';
const BASE_PATH = new URL(SITE_URL).pathname.replace(/\/?$/, '/');
const SITE = existsSync(join(ROOT, 'config', 'site.json')) ? JSON.parse(readFileSync(join(ROOT, 'config', 'site.json'), 'utf8')) : {};

const MIN_COMBO = 5; // una página combinada solo existe si tiene contenido real
const STATIC_JOBS = 30; // bretes escritos directo en el HTML para buscadores y personas sin JavaScript

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
const REMOTE_NAMES = { jobicy: 'Jobicy', remotive: 'Remotive', himalayas: 'Himalayas', remoteok: 'Remote OK', weworkremotely: 'We Work Remotely' };
const lc = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const fmtDate = (iso) => new Date(iso).toLocaleDateString('es-CR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Costa_Rica' });
const fmtShort = (iso) => new Date(iso).toLocaleDateString('es-CR', { day: 'numeric', month: 'short', timeZone: 'America/Costa_Rica' });
const plural = (n, one, many) => `${n.toLocaleString('es-CR')} ${n === 1 ? one : many}`;
const list = (items) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`);

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

const fill = (template, v) => template.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in v ? v[k] : ''));

function initials(j) {
  return ((j.company || j.title).replace(/[^\p{L}\p{N} ]/gu, '').trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('') || '·').toUpperCase();
}

function jobCardHtml(j) {
  const mod = { remoto: 'Remoto', hibrido: 'Híbrido', presencial: 'Presencial' }[j.modality];
  return `<article class="job"><div class="avatar" aria-hidden="true">${esc(initials(j))}</div><div class="job-body"><h3 class="job-title"><a href="${esc(j.url)}" target="_blank" rel="noopener noreferrer nofollow ugc">${esc(j.title)}</a></h3><div class="job-meta">${j.company ? `<span class="co">${esc(j.company)}</span>` : ''}<span>${esc(j.location || 'Costa Rica')}</span></div><div class="badges">${mod ? `<span class="badge m-${j.modality}">${mod}</span>` : ''}<span class="badge">${esc(CATEGORIES[j.category] || 'Otros')}</span>${j.salary ? `<span class="badge salary">${esc(j.salary)}</span>` : ''}</div>${j.excerpt ? `<p class="job-excerpt">${esc(j.excerpt)}</p>` : ''}<p class="job-src">Fuente: <b>${esc(j.source)}</b>${j.via ? ` · vía ${esc(j.via)}` : ''}</p></div><div class="job-aside"><span class="when"><time datetime="${esc(j.postedAt)}">${esc(fmtShort(j.postedAt))}</time></span><div class="job-actions"><a class="apply" href="${esc(j.url)}" target="_blank" rel="noopener noreferrer nofollow ugc">Ver oferta</a></div></div></article>`;
}

function top(jobs, fn, n, skip = () => false) {
  const m = new Map();
  for (const j of jobs) {
    const k = fn(j);
    if (!k || skip(k)) continue;
    m.set(k, (m.get(k) || 0) + 1);
  }
  return [...m].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0]))).slice(0, n);
}

const FAQ_COMMON = [
  ['¿Cuesta algo usar TicoBrete?', 'No. TicoBrete es gratis para quien busca trabajo y para los negocios que quieren publicar un brete. Tampoco necesitás crear una cuenta.'],
  ['¿Cómo sé si una oferta es una estafa?', 'Un trabajo de verdad nunca te cobra para contratarte. Si te piden dinero, un depósito o datos de tu tarjeta, no apliqués. Podés leer nuestra guía de estafas laborales y reportar cualquier oferta sospechosa con el enlace "Reportar".'],
];

function buildPageSpecs(jobs, meta, prevPaths = new Set()) {
  const total = jobs.length;
  const day = meta.updatedAt;
  const provNames = PROVINCES;
  const specs = [];
  const countBy = (fn) => jobs.reduce((m, j) => { const k = fn(j); if (k) m.set(k, (m.get(k) || 0) + 1); return m; }, new Map());
  const provCount = countBy((j) => j.province);
  const catCount = countBy((j) => (j.category !== 'otros' ? j.category : null));
  const comboCount = countBy((j) => (j.province && j.category !== 'otros' ? `${j.category}/${j.province}` : null));
  const remote = jobs.filter((j) => j.modality === 'remoto');
  const fresh = (l) => l.filter((j) => Date.now() - Date.parse(j.postedAt) < 86400000 * 2).length;
  const junior = (l) => l.filter((j) => j.tags?.includes('junior')).length;

  const introFor = (l, label, extra = '') => {
    const cats = top(l, (j) => CATEGORIES[j.category], 3, (k) => k === 'Otros');
    const cos = top(l, (j) => j.company, 4);
    const parts = [`Hoy hay <strong>${plural(l.length, 'oferta', 'ofertas')}</strong> de trabajo ${label}.`];
    if (cats.length) parts.push(`Las áreas con más bretes son ${list(cats.map(([c, n]) => `${lc(c)} (${n})`))}.`);
    if (cos.length) parts.push(`Entre las empresas que publican están ${list(cos.map(([c]) => esc(c)))}.`);
    const f = fresh(l);
    if (f) parts.push(`${plural(f, 'brete se publicó', 'bretes se publicaron')} en los últimos dos días.`);
    parts.push(`La lista se actualiza automáticamente varias veces al día (última revisión: ${fmtDate(day)}).`);
    return `<p>${parts.join(' ')}</p>${extra}`;
  };

  // Portada
  const homeCats = top(jobs, (j) => CATEGORIES[j.category], 3, (k) => k === 'Otros').map(([c]) => lc(c));
  specs.push({
    path: '', preset: '', list: jobs, crumbs: [],
    title: 'Empleos en Costa Rica: bretes nuevos cada día | TicoBrete',
    h1: 'Todos los bretes de Costa Rica, <em>en un solo lugar</em>',
    desc: `${total.toLocaleString('es-CR')} ofertas de trabajo en Costa Rica de empresas, del Estado y de comunidades. Filtrá por provincia, remoto o sin experiencia. Gratis y sin registro.`,
    heading: 'Empleos en Costa Rica, actualizados todos los días',
    intro: introFor(jobs, 'en Costa Rica', `<p>En TicoBrete juntamos en un solo lugar ofertas de empresas, de la Agencia Nacional de Empleo y de comunidades, y siempre te llevamos al anuncio original. Hay bretes de ${list(homeCats)}, además de trabajo remoto y puestos sin experiencia.</p>`),
    faq: [
      ['¿Cómo busco trabajo en Costa Rica?', 'Usá los filtros por provincia, categoría, modalidad (presencial, híbrido o remoto) y fecha. Cuando encontrés un brete, tocá "Ver oferta" para ir al anuncio original y aplicar desde ahí. Si querés más consejos, mirá nuestras guías.'],
      ['¿Hay trabajos sin experiencia?', `Sí. Hoy hay ${plural(junior(jobs), 'oferta', 'ofertas')} marcadas como sin experiencia o pasantía. Usá el filtro "Sin experiencia o pasantía".`],
      ['¿Hay trabajo remoto para personas en Costa Rica?', `Sí. Hoy hay ${plural(remote.length, 'oferta', 'ofertas')} remotas abiertas a Costa Rica o Latinoamérica, sobre todo en tecnología y atención al cliente.`],
      ...FAQ_COMMON,
    ],
  });

  // Provincias
  for (const [key, name] of Object.entries(provNames)) {
    const l = jobs.filter((j) => j.province === key);
    specs.push({
      path: `empleos/${key}/`, preset: `prov:${key}`, list: l, crumbs: [[`Empleos en ${name}`, `empleos/${key}/`]],
      title: `Empleos en ${name}, Costa Rica (${l.length}) | TicoBrete`,
      h1: `Empleos en ${esc(name)}, <em>actualizados todos los días</em>`,
      desc: `${plural(l.length, 'oferta', 'ofertas')} de trabajo en ${name}${l.length ? `: ${list(top(l, (j) => CATEGORIES[j.category], 2, (k) => k === 'Otros').map(([c]) => lc(c)))}` : ''}. Actualizado todos los días, gratis y sin registro.`,
      heading: `Trabajo en ${name}`,
      intro: introFor(l, `en ${name}`),
      faq: [
        [`¿Cómo encuentro trabajo en ${name}?`, `Usá los filtros de esta página para elegir categoría, modalidad y fecha. Cuando veás un brete que te sirva, tocá "Ver oferta" y aplicá desde el anuncio original.`],
        [`¿Hay bretes sin experiencia en ${name}?`, `Hoy hay ${plural(junior(l), 'oferta', 'ofertas')} de ${name} marcadas como sin experiencia o pasantía.`],
        ...FAQ_COMMON,
      ],
    });
  }

  // Remoto
  specs.push({
    path: 'empleos/remoto/', preset: 'scope:remote', list: remote, crumbs: [['Trabajo remoto', 'empleos/remoto/']],
    title: `Trabajo remoto desde Costa Rica (${remote.length}) | TicoBrete`,
    h1: 'Trabajo remoto <em>desde Costa Rica</em>',
    desc: `${plural(remote.length, 'oferta', 'ofertas')} de trabajo remoto abiertas a personas en Costa Rica y Latinoamérica. Tecnología, atención al cliente, ventas y más. Actualizado todos los días.`,
    heading: 'Trabajo remoto para personas en Costa Rica',
    intro: introFor(remote, 'remotas abiertas a Costa Rica o Latinoamérica', '<p>Incluimos solo puestos que una persona en Costa Rica pueda tomar. Revisá siempre la moneda, la forma de pago y los requisitos de idioma, y leé nuestra guía de <a href="{ROOT}guias/trabajo-remoto-desde-costa-rica/">trabajo remoto desde Costa Rica</a>.</p>'),
    faq: [
      ['¿Necesito inglés para trabajar remoto?', 'En muchas ofertas sí, al menos nivel intermedio. Hay también puestos en español para empresas de Latinoamérica y España. Usá el filtro de inglés o bilingüe para verlos.'],
      ['¿Cómo me pagan si trabajo remoto para una empresa de afuera?', 'Depende de la empresa: transferencia, plataformas de pago o contratos como independiente. Consultá siempre con un contador sobre impuestos y seguro antes de empezar.'],
      ...FAQ_COMMON,
    ],
  });

  // Categorías y combinaciones
  for (const [key, name] of Object.entries(CATEGORIES)) {
    if (key === 'otros' || ((catCount.get(key) || 0) < 3 && !prevPaths.has(`empleos/${key}/`))) continue;
    const l = jobs.filter((j) => j.category === key);
    specs.push({
      path: `empleos/${key}/`, preset: `cat:${key}`, list: l, crumbs: [[`Empleos de ${lc(name)}`, `empleos/${key}/`]],
      title: `Empleos de ${name} en Costa Rica (${l.length}) | TicoBrete`,
      h1: `Empleos de ${esc(lc(name))}, <em>en Costa Rica</em>`,
      desc: `${plural(l.length, 'oferta', 'ofertas')} de ${lc(name)} en Costa Rica y remoto. Filtrá por provincia y modalidad. Actualizado todos los días, gratis y sin registro.`,
      heading: `Trabajo de ${lc(name)} en Costa Rica`,
      intro: introFor(l, `de ${lc(name)}`, `<p>Por provincia, hay ofertas en ${list(top(l, (j) => provNames[j.province], 4).map(([p]) => p))}${l.some((j) => j.modality === 'remoto') ? ', además de trabajo remoto' : ''}.</p>`),
      faq: [
        [`¿Dónde hay más trabajo de ${lc(name)}?`, `Hoy las provincias con más ofertas de ${lc(name)} son ${list(top(l, (j) => provNames[j.province], 3).map(([p, n]) => `${p} (${n})`)) || 'varias'}.`],
        [`¿Hay bretes de ${lc(name)} sin experiencia?`, `Hoy hay ${plural(junior(l), 'oferta', 'ofertas')} de ${lc(name)} marcadas como sin experiencia o pasantía.`],
        ...FAQ_COMMON,
      ],
    });
    for (const [pk, pn] of Object.entries(provNames)) {
      const n = comboCount.get(`${key}/${pk}`) || 0;
      if (n < MIN_COMBO && !prevPaths.has(`empleos/${key}/${pk}/`)) continue;
      const lc2 = jobs.filter((j) => j.category === key && j.province === pk);
      specs.push({
        path: `empleos/${key}/${pk}/`, preset: `cat:${key},prov:${pk}`, list: lc2, crumbs: [[`Empleos de ${lc(name)}`, `empleos/${key}/`], [pn, `empleos/${key}/${pk}/`]],
        title: `Empleos de ${name} en ${pn} (${lc2.length}) | TicoBrete`,
        h1: `Empleos de ${esc(lc(name))} en ${esc(pn)}`,
        desc: `${plural(lc2.length, 'oferta', 'ofertas')} de ${lc(name)} en ${pn}, Costa Rica. Empresas que contratan hoy, con enlace directo al anuncio. Gratis y sin registro.`,
        heading: `Trabajo de ${lc(name)} en ${pn}`,
        intro: introFor(lc2, `de ${lc(name)} en ${pn}`),
        faq: [
          [`¿Cómo aplico a un brete de ${lc(name)} en ${pn}?`, 'Tocá "Ver oferta" en el brete que te interese: te llevamos al anuncio original, donde se hace la postulación. Preparate con un currículum actualizado.'],
          ...FAQ_COMMON,
        ],
      });
    }
  }
  return specs;
}

function relatedHtml(spec, specs, jobs) {
  const exists = new Set(specs.map((s) => s.path));
  const provLinks = Object.entries(PROVINCES).map(([k, n]) => [`Empleos en ${n}`, `empleos/${k}/`, jobs.filter((j) => j.province === k).length]);
  const catLinks = Object.entries(CATEGORIES).filter(([k]) => exists.has(`empleos/${k}/`)).map(([k, n]) => [n, `empleos/${k}/`, jobs.filter((j) => j.category === k).length]);
  const block = (title, links) => `<div><h3>${esc(title)}</h3><ul>${links.filter(([, p]) => exists.has(p) && p !== spec.path).map(([n, p, c]) => `<li><a href="{ROOT}${p}">${esc(n)}</a> <span>${c}</span></li>`).join('')}</ul></div>`;
  const out = [];
  const m = spec.preset.match(/^cat:(\w[\w-]*)(?:,prov:([\w-]+))?$/);
  if (m && !m[2]) {
    out.push(block(`${CATEGORIES[m[1]]} por provincia`, Object.entries(PROVINCES).map(([pk, pn]) => [pn, `empleos/${m[1]}/${pk}/`, jobs.filter((j) => j.category === m[1] && j.province === pk).length])));
  }
  const p = spec.preset.match(/^prov:([\w-]+)$/);
  if (p) {
    out.push(block(`Empleos en ${PROVINCES[p[1]]} por categoría`, Object.entries(CATEGORIES).map(([ck, cn]) => [cn, `empleos/${ck}/${p[1]}/`, jobs.filter((j) => j.category === ck && j.province === p[1]).length])));
  }
  out.push(block('Por provincia', provLinks), block('Por categoría', catLinks), `<div><h3>Guías</h3><ul>${GUIAS.slice(0, 6).map((g) => `<li><a href="{ROOT}guias/${g.slug}/">${esc(g.h1)}</a></li>`).join('')}<li><a href="{ROOT}guias/">Todas las guías</a></li></ul></div>`);
  return `<nav class="related" aria-label="Más empleos y guías">${out.join('')}</nav>`;
}

function seoBlock(spec, specs, jobs) {
  const faq = spec.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('');
  return `<section class="container seo-text" aria-labelledby="seo-title"><h2 id="seo-title">${esc(spec.heading)}</h2>${spec.intro}<h2>Preguntas frecuentes</h2>${faq}${relatedHtml(spec, specs, jobs)}</section>`;
}

function crumbsHtml(spec) {
  if (!spec.crumbs.length) return '';
  const items = [`<a href="{ROOT}">Inicio</a>`, ...spec.crumbs.map(([n, p], i) => (i === spec.crumbs.length - 1 ? `<span aria-current="page">${esc(n)}</span>` : `<a href="{ROOT}${p}">${esc(n)}</a>`))];
  return `<nav class="crumbs" aria-label="Ruta">${items.join(' <i aria-hidden="true">›</i> ')}</nav>`;
}

function graphFor(spec, canonical, updatedAt) {
  const org = { '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: 'TicoBrete', url: `${SITE_URL}/`, logo: `${SITE_URL}/assets/icon-512.png`, description: 'Bolsa de empleo gratuita y automática de Costa Rica.' };
  const site = { '@type': 'WebSite', '@id': `${SITE_URL}/#site`, url: `${SITE_URL}/`, name: 'TicoBrete', inLanguage: 'es-CR', publisher: { '@id': `${SITE_URL}/#org` }, potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/?q={search_term_string}`, 'query-input': 'required name=search_term_string' } };
  const page = { '@type': spec.path ? 'CollectionPage' : 'WebPage', '@id': `${canonical}#page`, url: canonical, name: spec.title, description: spec.desc, inLanguage: 'es-CR', isPartOf: { '@id': `${SITE_URL}/#site` }, dateModified: updatedAt };
  const graph = [org, site, page];
  if (spec.crumbs.length) {
    graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` }, ...spec.crumbs.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 2, name: n, item: `${SITE_URL}/${p}` }))] });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

const verifyMeta = () => [SITE.googleVerification && `<meta name="google-site-verification" content="${esc(SITE.googleVerification)}">`, SITE.bingVerification && `<meta name="msvalidate.01" content="${esc(SITE.bingVerification)}">`].filter(Boolean).join('\n  ');

function rss(jobs) {
  const items = jobs
    .slice(0, 100)
    .map((j) => `<item><title>${esc(j.title + (j.company ? ' — ' + j.company : ''))}</title><link>${esc(j.url)}</link><guid isPermaLink="false">${j.id}</guid><pubDate>${new Date(j.postedAt).toUTCString()}</pubDate><description>${esc([j.location, j.salary, j.excerpt].filter(Boolean).join(' · '))}</description></item>`)
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
  for (const f of ['article.html']) rmSync(join(DIST, f), { force: true });
  mkdirSync(join(DIST, 'data'), { recursive: true });

  const template = readFileSync(join(ROOT, 'site', 'index.html'), 'utf8');
  const articleTpl = readFileSync(join(ROOT, 'site', 'article.html'), 'utf8');
  // Una página que ya existió no se borra aunque hoy tenga pocos bretes (evita errores 404 en Google); si queda delgada pasa a noindex.
  const specs = buildPageSpecs(jobs, meta, new Set(prev?.meta?.pages || []));
  for (const s of specs) s.thin = s.path !== '' && s.list.length < 3;
  meta.pages = specs.map((s) => s.path);
  const payload = JSON.stringify({ meta, jobs });
  writeFileSync(join(DIST, 'data', 'jobs.json'), payload);
  mkdirSync(dirname(CACHE), { recursive: true });
  writeFileSync(CACHE, payload);
  const guideLinks = GUIAS.slice(0, 6).map((g) => `<li><a href="{ROOT}guias/${g.slug}/">${esc(g.h1)}</a></li>`).join('') + '<li><a href="{ROOT}guias/">Todas las guías</a></li>';
  const day = meta.updatedAt.slice(0, 10);

  const write = (path, html) => {
    const out = join(DIST, path, 'index.html');
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
  };
  const rootFor = (path) => '../'.repeat(path.split('/').filter(Boolean).length);

  for (const s of specs) {
    const rootRel = rootFor(s.path);
    const canonical = `${SITE_URL}/${s.path}`;
    const cards = s.list.slice(0, STATIC_JOBS).map(jobCardHtml).join('');
    const html = fill(template, {
      ROOT: rootRel,
      TITLE: esc(s.title),
      DESCRIPTION: esc(s.desc),
      CANONICAL: esc(canonical),
      SITE_URL: esc(SITE_URL),
      ROBOTS: s.thin ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1',
      VERIFY: verifyMeta(),
      PRESET: esc(s.preset),
      REPORT_URL: esc(REPORT_URL),
      SUBMIT_URL: esc(SUBMIT_URL),
      H1: s.h1,
      CRUMBS: crumbsHtml(s),
      JOBS_STATIC: cards || '<div class="skeleton"></div><div class="skeleton"></div>',
      SEO_BLOCK: seoBlock(s, specs, jobs),
      GUIDE_LINKS: guideLinks,
      JSONLD: `<script type="application/ld+json">${json(graphFor(s, canonical, meta.updatedAt))}</script>`,
    }).replace(/\{ROOT\}/g, rootRel);
    write(s.path, html);
  }

  // Guías, calculadoras y páginas por tema
  const urlsGuias = construirGuias({ guias: GUIAS, temas: TEMAS_GUIAS, DESTACADAS, esc, json, fill, write, rootFor, SITE_URL, articleTpl, verifyMeta, fmtDate, jobsTotal: jobs.length });

  // 404 (fuera del índice de buscadores, con rutas absolutas para que funcione en cualquier URL)
  writeFileSync(
    join(DIST, '404.html'),
    fill(template, { ROOT: BASE_PATH, TITLE: 'Página no encontrada | TicoBrete', DESCRIPTION: 'Esta página no existe, pero hay bretes esperándote.', CANONICAL: `${SITE_URL}/`, SITE_URL: esc(SITE_URL), ROBOTS: 'noindex', VERIFY: '', PRESET: '', REPORT_URL: esc(REPORT_URL), SUBMIT_URL: esc(SUBMIT_URL), H1: 'Esa página no existe, <em>pero los bretes sí</em>', CRUMBS: '', JOBS_STATIC: '', SEO_BLOCK: '', GUIDE_LINKS: guideLinks, JSONLD: '' }).replace(/\{ROOT\}/g, BASE_PATH),
  );

  writeFileSync(join(DIST, 'feed.xml'), rss(jobs));
  const urls = [...specs.filter((s) => !s.thin).map((s) => [s.path, day, s.path ? '0.7' : '1.0', 'daily']), ...urlsGuias];
  writeFileSync(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(([p, d, pr, cf]) => `<url><loc>${SITE_URL}/${p}</loc><lastmod>${d}</lastmod><changefreq>${cf}</changefreq><priority>${pr}</priority></url>`).join('')}</urlset>`,
  );
  writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

  console.log(`\nListo: ${jobs.length} puestos, ${specs.length} páginas de empleo y ${urlsGuias.length} de guías, calculadoras y temas en dist/ (${(payload.length / 1024).toFixed(0)} KB de datos)`);
}

main().catch((err) => {
  console.error('\nERROR:', err.message);
  process.exit(1);
});
