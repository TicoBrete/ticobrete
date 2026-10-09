import { fold } from './util.mjs';

const palabras = (html) => html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const slugify = (s) => fold(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** Valida el contenido y calcula lo que necesita cada guía (tiempo de lectura, índice, etc.). */
export function prepararGuias(todas, TEMAS, META, DESTACADAS) {
  const slugs = new Set();
  for (const g of todas) {
    if (slugs.has(g.slug)) throw new Error(`Hay dos guías con el slug "${g.slug}"`);
    slugs.add(g.slug);
    if (!META[g.slug]) throw new Error(`La guía "${g.slug}" no tiene ficha en content/guias-meta.mjs`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(g.date || '')) throw new Error(`La guía "${g.slug}" necesita una fecha AAAA-MM-DD`);
    for (const k of ['title', 'description', 'h1', 'lead', 'html']) if (!g[k]) throw new Error(`La guía "${g.slug}" no tiene "${k}"`);
  }
  for (const s of Object.keys(META)) if (!slugs.has(s)) throw new Error(`content/guias-meta.mjs menciona "${s}", que no existe`);
  for (const s of DESTACADAS) if (!slugs.has(s)) throw new Error(`La guía destacada "${s}" no existe`);
  const temaIds = new Set(TEMAS.map((t) => t.id));
  if (temaIds.size !== TEMAS.length) throw new Error('Hay temas repetidos');

  const preparadas = todas.map((g) => {
    const meta = META[g.slug];
    if (!temaIds.has(meta.tema)) throw new Error(`La guía "${g.slug}" usa el tema "${meta.tema}", que no existe`);
    const usados = new Set();
    const secciones = [];
    const html = g.html.replace(/<h2>([^<]+)<\/h2>/g, (_, txt) => {
      let id = slugify(txt) || 'seccion';
      while (usados.has(id)) id += '-2';
      usados.add(id);
      secciones.push({ id, txt });
      return `<h2 id="${id}">${txt}</h2>`;
    });
    const words = palabras(g.html);
    return { ...g, ...meta, tipo: g.tipo || 'guia', html, secciones, words, minutos: Math.max(1, Math.round(words / 200)) };
  });

  const orden = [...DESTACADAS.map((s) => preparadas.find((g) => g.slug === s)), ...TEMAS.flatMap((t) => preparadas.filter((g) => g.tema === t.id && !DESTACADAS.includes(g.slug)))];
  const temas = TEMAS.map((t) => ({ ...t, guias: orden.filter((g) => g.tema === t.id) }));
  for (const t of temas) if (!t.guias.length) throw new Error(`El tema "${t.id}" no tiene guías`);
  return { guias: orden, temas };
}

export function relacionadas(g, guias, n = 6) {
  const mismoTema = guias.filter((x) => x.slug !== g.slug && x.tema === g.tema);
  const afines = guias
    .filter((x) => x.slug !== g.slug && x.tema !== g.tema)
    .map((x) => ({ x, p: x.etiquetas.filter((e) => g.etiquetas.includes(e)).length }))
    .filter((o) => o.p > 0)
    .sort((a, b) => b.p - a.p)
    .map((o) => o.x);
  return [...new Set([...mismoTema, ...afines, ...guias.slice(0, 6)])].filter((x) => x.slug !== g.slug).slice(0, n);
}

export function construirGuias(ctx) {
  const { guias, temas, esc, json, fill, write, rootFor, SITE_URL, articleTpl, verifyMeta, fmtDate, jobsTotal } = ctx;
  const urls = [];
  const porTema = Object.fromEntries(temas.map((t) => [t.id, t]));
  const orgRef = { '@type': 'Organization', name: 'TicoBrete', url: `${SITE_URL}/`, logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/icon-512.png` } };
  const fechaMax = guias.map((g) => g.date).sort().pop();

  const pagina = (path, v) => {
    const raiz = rootFor(path);
    const canonical = `${SITE_URL}/${path}`;
    const html = fill(articleTpl, {
      ROOT: raiz, TITLE: esc(v.title), DESCRIPTION: esc(v.description), CANONICAL: esc(canonical), SITE_URL: esc(SITE_URL),
      VERIFY: verifyMeta(), H1: esc(v.h1), LEAD: esc(v.lead || v.description), META_LINE: v.metaLine || '', CRUMBS: v.crumbs, BODY: v.body,
      SCRIPTS: v.scripts || '', OGTYPE: v.ogtype || 'website',
      JSONLD: `<script type="application/ld+json">${json(v.ld(canonical))}</script>`,
    }).replace(/\{ROOT\}/g, raiz);
    write(path, html);
  };

  const migas = (items) => {
    const partes = ['<a href="{ROOT}">Inicio</a>', ...items.map(([n, p], i) => (i === items.length - 1 ? `<span aria-current="page">${esc(n)}</span>` : `<a href="{ROOT}${p}">${esc(n)}</a>`))];
    return `<nav class="crumbs" aria-label="Ruta">${partes.join(' <i aria-hidden="true">›</i> ')}</nav>`;
  };
  const listaMigas = (items) => ({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` }, ...items.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 2, name: n, item: `${SITE_URL}/${p}` }))] });

  const tarjeta = (g) => {
    const t = porTema[g.tema];
    const etiqueta = g.tipo === 'calculadora' ? '🧮 Calculadora' : `${t.emoji} ${t.nombre}`;
    const buscable = fold([g.title, g.h1, g.description, g.etiquetas.join(' '), t.nombre].join(' '));
    return `<li data-busqueda="${esc(buscable)}"><a href="{ROOT}guias/${g.slug}/"><span class="card-tema">${esc(etiqueta)}</span><h3>${esc(g.h1)}</h3><p>${esc(g.description)}</p><span class="card-meta">${g.tipo === 'calculadora' ? 'Gratis, en tu navegador' : `${g.minutos} min de lectura`}</span></a></li>`;
  };
  const lista = (gs) => `<ul class="guide-list">${gs.map(tarjeta).join('')}</ul>`;
  const fichas = (gs) => `<ul class="guide-list guide-list-compact">${gs.map(tarjeta).join('')}</ul>`;

  // ---- Guías y calculadoras ----
  for (const g of guias) {
    const t = porTema[g.tema];
    const path = `guias/${g.slug}/`;
    const mig = [['Guías', 'guias/'], [t.nombre, `guias/temas/${t.id}/`], [g.h1, path]];
    const toc = g.secciones.length >= 4 ? `<nav class="toc" aria-label="En esta guía"><p class="toc-title">En esta guía</p><ol>${g.secciones.map((s) => `<li><a href="#${s.id}">${s.txt}</a></li>`).join('')}</ol></nav>` : '';
    const resumen = `<p class="resumen"><strong>En pocas palabras:</strong> ${esc(g.description)}</p>`;
    const [ctaTxt, ctaPath] = g.cta;
    const cta = `<aside class="article-cta"><h2>Buscá tu próximo brete</h2><p>Más de ${Math.floor(jobsTotal / 100) * 100} ofertas de trabajo en Costa Rica, actualizadas todos los días y sin registro.</p><a class="btn btn-primary" href="{ROOT}${ctaPath}">${esc(ctaTxt)}</a></aside>`;
    const rel = relacionadas(g, guias);
    const relHtml = `<nav class="related-guides" aria-label="Guías relacionadas"><h2>Guías relacionadas</h2>${fichas(rel)}<p class="ver-todas"><a href="{ROOT}guias/temas/${t.id}/">Ver todo en ${esc(t.nombre)} →</a> · <a href="{ROOT}guias/">Todas las guías</a></p></nav>`;
    const meta = `<p class="article-meta"><a href="{ROOT}guias/temas/${t.id}/">${t.emoji} ${esc(t.nombre)}</a><span>${g.tipo === 'calculadora' ? 'Calculadora gratuita' : `${g.minutos} min de lectura`}</span><span>Revisada el <time datetime="${g.date}">${esc(fmtDate(`${g.date}T18:00:00Z`))}</time></span><span>Equipo TicoBrete</span></p>`;
    pagina(path, {
      title: g.title.length > 48 ? g.title : `${g.title} | TicoBrete`, description: g.description, h1: g.h1, lead: g.lead, metaLine: meta,
      crumbs: migas(mig), body: `${resumen}${toc}${g.html}${cta}${relHtml}`, ogtype: 'article',
      scripts: g.tipo === 'calculadora' ? '<script type="module" src="{ROOT}assets/calc.js"></script>' : '',
      ld: (canonical) => ({
        '@context': 'https://schema.org',
        '@graph': [
          g.tipo === 'calculadora'
            ? { '@type': 'WebApplication', '@id': `${canonical}#app`, name: g.h1, url: canonical, description: g.description, applicationCategory: 'FinanceApplication', operatingSystem: 'Any', inLanguage: 'es-CR', isAccessibleForFree: true, offers: { '@type': 'Offer', price: 0, priceCurrency: 'CRC' }, publisher: orgRef }
            : { '@type': 'Article', '@id': `${canonical}#article`, headline: g.h1, description: g.description, inLanguage: 'es-CR', datePublished: g.date, dateModified: g.date, articleSection: t.nombre, wordCount: g.words, mainEntityOfPage: canonical, image: `${SITE_URL}/assets/og-image.png`, author: orgRef, publisher: orgRef },
          listaMigas(mig),
        ],
      }),
    });
    urls.push([path, g.date, g.slug === 'aguinaldo-costa-rica' || g.slug === 'salario-minimo-costa-rica' ? '0.8' : '0.6', 'monthly']);
  }

  // ---- Páginas centro por tema ----
  for (const t of temas) {
    const path = `guias/temas/${t.id}/`;
    const mig = [['Guías', 'guias/'], [t.nombre, path]];
    const otros = temas.filter((x) => x.id !== t.id);
    const body = `<div class="hub-intro">${t.intro}</div>${lista(t.guias)}<nav class="related-guides" aria-label="Otros temas"><h2>Otros temas</h2><ul class="chips">${otros.map((o) => `<li><a href="{ROOT}guias/temas/${o.id}/">${o.emoji} ${esc(o.nombre)}</a></li>`).join('')}</ul></nav>`;
    pagina(path, {
      title: t.title, description: t.description, h1: t.h1, lead: t.description, crumbs: migas(mig), body,
      ld: (canonical) => ({
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'CollectionPage', '@id': `${canonical}#page`, url: canonical, name: t.h1, description: t.description, inLanguage: 'es-CR', isPartOf: { '@type': 'WebSite', url: `${SITE_URL}/`, name: 'TicoBrete' }, mainEntity: { '@type': 'ItemList', itemListElement: t.guias.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/guias/${g.slug}/`, name: g.h1 })) } },
          listaMigas(mig),
        ],
      }),
    });
    urls.push([path, t.guias.map((g) => g.date).sort().pop(), '0.7', 'weekly']);
  }

  // ---- Índice de /guias/ ----
  const destacadas = guias.filter((g) => ctx.DESTACADAS.includes(g.slug));
  const calculadoras = guias.filter((g) => g.tipo === 'calculadora');
  const buscador = `<div class="guide-search"><label for="guias-buscar" class="sr">Buscar una guía</label><input id="guias-buscar" type="search" placeholder="Buscá una guía: aguinaldo, cesantía, currículum, call center…" autocomplete="off" enterkeyhint="search"><p id="guias-contador" class="muted" aria-live="polite" hidden></p></div>`;
  const chips = `<nav aria-label="Temas"><ul class="chips chips-grandes">${temas.map((t) => `<li><a href="{ROOT}guias/temas/${t.id}/">${t.emoji} ${esc(t.nombre)} <span>${t.guias.length}</span></a></li>`).join('')}</ul></nav>`;
  const secciones = temas
    .filter((t) => t.id !== 'calculadoras')
    .map((t) => `<section class="guide-group" data-grupo><h2 class="guide-group-title"><a href="{ROOT}guias/temas/${t.id}/">${t.emoji} ${esc(t.nombre)}</a></h2>${lista(t.guias)}</section>`)
    .join('');
  const body = `${buscador}${chips}<p id="guias-vacio" class="empty-note" hidden>No encontramos guías con eso. Probá con otra palabra o mirá los temas de arriba.</p><div id="guias-contenido"><section class="guide-group" data-grupo><h2 class="guide-group-title">⭐ Las más leídas</h2>${lista(destacadas)}</section><section class="guide-group" data-grupo><h2 class="guide-group-title"><a href="{ROOT}guias/temas/calculadoras/">🧮 Calculadoras laborales</a></h2>${lista(calculadoras)}</section>${secciones}</div>`;
  const pathIdx = 'guias/';
  pagina(pathIdx, {
    title: 'Guías para buscar trabajo en Costa Rica | TicoBrete', h1: 'Guías para buscar trabajo en Costa Rica',
    description: `${guias.length} guías y calculadoras gratuitas sobre trabajo en Costa Rica: buscar empleo, currículum, derechos laborales, aguinaldo, salario mínimo y estafas.`,
    lead: 'Consejos claros y verificados para encontrar trabajo, conocer tus derechos y cuidarte de estafas. Buscá lo que necesitás o explorá por tema.',
    crumbs: migas([['Guías', pathIdx]]), body, scripts: '<script type="module" src="{ROOT}assets/guias.js"></script>',
    ld: (canonical) => ({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'CollectionPage', '@id': `${canonical}#page`, url: canonical, name: 'Guías para buscar trabajo en Costa Rica', inLanguage: 'es-CR', isPartOf: { '@type': 'WebSite', url: `${SITE_URL}/`, name: 'TicoBrete' }, mainEntity: { '@type': 'ItemList', itemListElement: guias.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/guias/${g.slug}/`, name: g.h1 })) } },
        listaMigas([['Guías', pathIdx]]),
      ],
    }),
  });
  urls.push([pathIdx, fechaMax, '0.8', 'weekly']);
  return urls;
}
