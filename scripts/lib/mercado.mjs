import { shareHtml } from './share.mjs';

const MODALIDADES = { remoto: 'Remoto', hibrido: 'Híbrido', presencial: 'Presencial' };

/** Página de estadísticas del mercado laboral, generada con las ofertas de cada compilación. */
export function construirMercado(ctx) {
  const { jobs, meta, CATEGORIES, PROVINCES, esc, json, fill, write, rootFor, SITE_URL, articleTpl, verifyMeta, fmtDate } = ctx;
  const total = jobs.length;
  const ahora = Date.parse(meta.updatedAt);
  const dias = (n) => jobs.filter((j) => ahora - Date.parse(j.postedAt) < n * 86400000).length;
  const nuevos7 = dias(7);
  const nuevos1 = dias(1);
  const pct = (n) => (total ? `${((n * 100) / total).toFixed(1).replace('.', ',')} %` : '0 %');
  const num = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const conteo = (fn) => {
    const m = new Map();
    for (const j of jobs) {
      const k = fn(j);
      if (k) m.set(k, (m.get(k) || 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  };

  const porCat = conteo((j) => j.category).filter(([k]) => CATEGORIES[k]);
  const porProv = conteo((j) => j.province).filter(([k]) => PROVINCES[k]);
  const porMod = conteo((j) => j.modality).filter(([k]) => MODALIDADES[k]);
  const sinProv = total - porProv.reduce((a, [, n]) => a + n, 0);
  const empresas = conteo((j) => (j.company || '').trim()).filter(([, n]) => n >= 2).slice(0, 15);
  const nEmpresas = new Set(jobs.map((j) => (j.company || '').trim().toLowerCase()).filter(Boolean)).size;
  const remotas = (porMod.find(([k]) => k === 'remoto') || [0, 0])[1];
  const sinMod = total - porMod.reduce((a, [, n]) => a + n, 0);

  const link = (txt, path, n) => (n >= 5 && !/\/otros\//.test(path) ? `<a href="{ROOT}${path}">${esc(txt)}</a>` : esc(txt));
  const tabla = (titulo1, filas) => `<table class="data-table"><thead><tr><th>${titulo1}</th><th>Ofertas</th><th>Del total</th></tr></thead><tbody>${filas.map(([a, n]) => `<tr><td>${a}</td><td>${num(n)}</td><td>${pct(n)}</td></tr>`).join('')}</tbody></table>`;

  const topCat = porCat.slice(0, 3).map(([k]) => CATEGORIES[k].toLowerCase());
  const topProv = porProv.slice(0, 2).map(([k]) => PROVINCES[k]);
  const fecha = fmtDate(meta.updatedAt);

  const body = `
<p class="resumen"><strong>Datos al ${esc(fecha)}:</strong> hoy hay <strong>${num(total)} ofertas</strong> activas de ${num(nEmpresas)} empresas distintas${nuevos7 ? `, y <strong>${num(nuevos7)}</strong> se publicaron en los últimos 7 días` : ''}. ${topCat.length ? `Las áreas con más ofertas son ${esc(topCat.join(', '))}` : ''}${topProv.length ? ` y las provincias con más movimiento son ${esc(topProv.join(' y '))}` : ''}.</p>

<h2>Resumen en números</h2>
<table class="data-table">
  <tbody>
    <tr><td>Ofertas activas</td><td><strong>${num(total)}</strong></td></tr>
    <tr><td>Publicadas en las últimas 24 horas</td><td>${num(nuevos1)}</td></tr>
    <tr><td>Publicadas en los últimos 7 días</td><td>${num(nuevos7)}</td></tr>
    <tr><td>Empresas con ofertas</td><td>${num(nEmpresas)}</td></tr>
    <tr><td>Ofertas remotas</td><td>${num(remotas)} (${pct(remotas)})</td></tr>
  </tbody>
</table>

<h2>Ofertas por categoría</h2>
${tabla('Categoría', porCat.map(([k, n]) => [link(CATEGORIES[k], `empleos/${k}/`, n), n]))}

<h2>Ofertas por provincia</h2>
${tabla('Provincia', porProv.map(([k, n]) => [link(`Empleos en ${PROVINCES[k]}`, `empleos/${k}/`, n), n]))}
${sinProv > 0 ? `<p class="muted">${num(sinProv)} ofertas no indican una provincia concreta (por ejemplo, las remotas o las de alcance nacional).</p>` : ''}

<h2>Ofertas por modalidad</h2>
${tabla('Modalidad', porMod.map(([k, n]) => [k === 'remoto' ? link(MODALIDADES[k], 'empleos/remoto/', n) : esc(MODALIDADES[k]), n]))}
${sinMod > 0 ? `<p class="muted">${num(sinMod)} ofertas no indican la modalidad en su anuncio original.</p>` : ''}

${empresas.length ? `<h2>Empresas con más ofertas</h2>
${tabla('Empresa', empresas.map(([e, n]) => [esc(e), n]))}
<p class="muted">Solo se listan empresas con al menos dos ofertas activas.</p>` : ''}

<h2>Cómo se calculan estos datos</h2>
<p>TicoBrete reúne ofertas de fuentes públicas (empresas, la Agencia Nacional de Empleo, comunidades y bolsas remotas) y las actualiza varias veces al día. Estas cifras se calculan con las ofertas que tenemos <strong>en este momento</strong> y se renuevan solas con cada actualización.</p>
<p><strong>Importante:</strong> no representan todo el mercado laboral del país. Solo cuentan las ofertas que publican las fuentes que leemos, y una misma oferta puede publicarse en varios sitios (quitamos duplicados cuando podemos). Usalas como una referencia, no como una estadística oficial. Para cifras oficiales de empleo, consultá al INEC.</p>

<h2>Cómo usar esta información</h2>
<ul>
  <li><strong>Si buscás trabajo:</strong> enfocá tu búsqueda en las categorías y provincias con más ofertas, y mirá los <a href="{ROOT}">bretes más recientes</a>.</li>
  <li><strong>Para mejorar tus chances:</strong> armá tu <a href="{ROOT}herramientas/armador-de-curriculum/">currículum</a> y revisá la guía de <a href="{ROOT}guias/como-buscar-trabajo-en-costa-rica/">cómo buscar trabajo</a>.</li>
  <li><strong>Si vas a negociar:</strong> comparás tu oferta con el <a href="{ROOT}guias/salario-minimo-por-ocupacion-costa-rica/">salario mínimo por ocupación</a> y la <a href="{ROOT}guias/calculadora-salario-neto-costa-rica/">calculadora de salario neto</a>.</li>
  <li><strong>Para evitar estafas:</strong> usá el <a href="{ROOT}herramientas/verificador-de-ofertas-falsas/">verificador de ofertas</a>.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Cada cuánto se actualizan estos números?</h3>
<p>Cada vez que TicoBrete actualiza las ofertas, que es varias veces al día. En esta página los datos corresponden al ${esc(fecha)}.</p>
<h3>¿Son cifras oficiales?</h3>
<p>No. Son un reflejo de las ofertas que leen nuestras fuentes públicas. Para estadísticas oficiales, consultá al INEC o al MTSS.</p>
<h3>¿Por qué algunas ofertas no tienen provincia?</h3>
<p>Porque la fuente no la indica o porque son ofertas remotas o de alcance nacional.</p>
`;

  const path = 'mercado-laboral/';
  const canonical = `${SITE_URL}/${path}`;
  const title = 'Mercado laboral en Costa Rica: empleos por provincia y categoría';
  const description = 'Estadísticas actualizadas de empleos en Costa Rica: ofertas por provincia, categoría y modalidad, y las empresas que más contratan. Se renuevan solas.';
  const h1 = 'Mercado laboral en Costa Rica: empleos en cifras';
  const lead = 'Cuántas ofertas hay, dónde y en qué áreas. Los números se recalculan solos con cada actualización de TicoBrete.';
  const raiz = rootFor(path);
  const mig = [['Mercado laboral', path]];
  const crumbs = `<nav class="crumbs" aria-label="Ruta"><a href="{ROOT}">Inicio</a> <i aria-hidden="true">›</i> <span aria-current="page">Mercado laboral</span></nav>`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${canonical}#page`, url: canonical, name: h1, description, inLanguage: 'es-CR', dateModified: meta.updatedAt, isPartOf: { '@type': 'WebSite', url: `${SITE_URL}/`, name: 'TicoBrete' } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` }, ...mig.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 2, name: n, item: `${SITE_URL}/${p}` }))] },
    ],
  };
  const meta2 = `<p class="article-meta"><span>Datos automáticos</span><span>Actualizado el <time datetime="${esc(meta.updatedAt)}">${esc(fecha)}</time></span><span>Equipo TicoBrete</span></p>`;
  const html = fill(articleTpl, {
    ROOT: raiz, TITLE: esc(title), DESCRIPTION: esc(description), CANONICAL: esc(canonical), SITE_URL: esc(SITE_URL), VERIFY: verifyMeta(),
    H1: esc(h1), LEAD: esc(lead), META_LINE: meta2, CRUMBS: crumbs, BODY: body, SHARE: shareHtml(h1, canonical), SCRIPTS: '', OGTYPE: 'website',
    JSONLD: `<script type="application/ld+json">${json(ld)}</script>`,
  }).replace(/\{ROOT\}/g, raiz);
  write(path, html);
  return [[path, meta.updatedAt.slice(0, 10), '0.7', 'daily']];
}
