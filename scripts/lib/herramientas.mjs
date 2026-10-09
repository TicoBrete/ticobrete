const DATE = '2026-10-09';

const campo = (k, etiqueta, extra = '') => `<label class="field"><span>${etiqueta}</span><input data-k="${k}" ${extra}></label>`;

const FORM = `
<div class="cv-app">
  <form id="cv-form" class="cv-form" autocomplete="off" novalidate>
    <fieldset><legend>1. Tus datos</legend>
      <div class="calc-grid">
        ${campo('nombre', 'Nombre completo', 'type="text" maxlength="80"')}
        ${campo('puesto', 'Puesto al que aplicás', 'type="text" maxlength="80"')}
        ${campo('email', 'Correo', 'type="email" maxlength="80"')}
        ${campo('tel', 'Teléfono', 'type="tel" maxlength="30"')}
        ${campo('ciudad', 'Provincia o cantón', 'type="text" maxlength="60"')}
        ${campo('enlace', 'LinkedIn o portafolio (opcional)', 'type="text" maxlength="100"')}
      </div>
    </fieldset>
    <fieldset><legend>2. Perfil profesional</legend>
      <label class="field wide"><span>Resumen en 2 o 3 líneas: quién sos, qué sabés hacer y qué buscás</span><textarea data-k="resumen" rows="4" maxlength="600"></textarea></label>
    </fieldset>
    <fieldset><legend>3. Experiencia laboral</legend>
      <div data-lista="exp"></div>
      <button type="button" class="btn btn-ghost" data-agregar="exp">+ Agregar otro trabajo</button>
    </fieldset>
    <fieldset><legend>4. Educación</legend>
      <div data-lista="edu"></div>
      <button type="button" class="btn btn-ghost" data-agregar="edu">+ Agregar estudio</button>
    </fieldset>
    <fieldset><legend>5. Habilidades, idiomas y cursos</legend>
      <label class="field wide"><span>Habilidades (separadas por coma)</span><textarea data-k="habilidades" rows="2" maxlength="500"></textarea></label>
      <label class="field wide"><span>Idiomas (uno por línea, ej. “Inglés: B2”)</span><textarea data-k="idiomas" rows="2" maxlength="300"></textarea></label>
      <label class="field wide"><span>Certificaciones y cursos (uno por línea)</span><textarea data-k="certs" rows="3" maxlength="600"></textarea></label>
    </fieldset>
  </form>
  <section class="cv-side" aria-label="Vista previa y descargas">
    <div class="cv-actions">
      <button type="button" class="btn btn-primary" id="cv-pdf">Descargar PDF</button>
      <button type="button" class="btn btn-primary" id="cv-word">Descargar Word</button>
      <button type="button" class="btn btn-ghost" id="cv-ejemplo">Ver un ejemplo</button>
      <button type="button" class="btn btn-ghost" id="cv-borrar">Borrar todo</button>
    </div>
    <p id="cv-aviso" class="muted" role="status" hidden></p>
    <div id="cv-preview" class="cv-paper" aria-live="polite"></div>
  </section>
</div>
<p class="muted cv-priv">🔒 Tus datos no salen de tu dispositivo: no hay servidor, ni cuenta, ni anuncios. Se guardan solo en este navegador para que no los pierdas; podés borrarlos con el botón “Borrar todo”.</p>`;

const CV = {
  slug: 'armador-de-curriculum',
  title: 'Armador de currículum gratis para ATS en PDF y Word',
  description: 'Creá tu currículum gratis en PDF o Word, en formato compatible con ATS. Corre en tu navegador y no envía tus datos a ningún lado.',
  h1: 'Armador de currículum gratis (PDF y Word)',
  lead: 'Llená tus datos y descargá un currículum limpio, de una sola columna y compatible con los sistemas ATS que usan las empresas. Sin registro y sin enviar nada a internet.',
  body: `${FORM}
<h2>Qué es un currículum compatible con ATS</h2>
<p>Muchas empresas usan un <strong>ATS</strong> (sistema de seguimiento de candidatos) que lee tu currículum antes que una persona. Si el archivo tiene columnas, tablas, íconos o fotos, el sistema puede mezclar el orden o no leer partes. Este armador genera un formato <strong>sencillo, de una sola columna, con texto real</strong> y títulos estándar (Experiencia laboral, Educación, Habilidades), que es lo que esos sistemas entienden mejor.</p>

<h2>Cómo usarlo</h2>
<ol>
  <li>Llená tus datos. A la derecha ves cómo va quedando.</li>
  <li>Descargá el <strong>PDF</strong> (en la ventana de impresión elegí “Guardar como PDF”) o el <strong>Word</strong> (.docx) si querés seguir editándolo.</li>
  <li>Adaptá el resumen y las habilidades a cada oferta, usando las palabras que aparecen en el anuncio.</li>
</ol>

<h2>Consejos para que funcione</h2>
<ul>
  <li><strong>Usá logros, no solo funciones:</strong> “Atendí 60 consultas diarias con 94 % de satisfacción” dice más que “atención al cliente”.</li>
  <li><strong>Poné primero lo más reciente</strong> en experiencia y estudios.</li>
  <li><strong>Una página</strong> es suficiente si estás empezando; máximo dos con mucha experiencia.</li>
  <li><strong>Sin foto, cédula ni datos que no hacen falta.</strong> Basta con correo, teléfono y zona donde vivís.</li>
  <li><strong>Mandalo en PDF</strong> salvo que la oferta pida Word.</li>
</ul>
<p>Más ayuda en la guía de <a href="{ROOT}guias/curriculum-costa-rica/">cómo hacer un currículum</a>, la <a href="{ROOT}guias/carta-de-presentacion-costa-rica/">carta de presentación</a> y la <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">entrevista de trabajo</a>.</p>

<aside class="article-cta"><h2>¿Ya tenés tu currículum?</h2><p>Buscá ofertas actualizadas todos los días, sin registro.</p><a class="btn btn-primary" href="{ROOT}">Ver los bretes más recientes</a></aside>

<h2>Preguntas frecuentes</h2>
<h3>¿Es gratis de verdad?</h3>
<p>Sí. No hay cuenta, marca de agua ni pagos.</p>
<h3>¿Guardan mis datos?</h3>
<p>No. Todo se procesa en tu navegador. Lo que escribís se guarda solo en tu equipo, para que no lo pierdas si cerrás la página.</p>
<h3>¿El PDF se puede leer por un ATS?</h3>
<p>Sí: se genera con texto seleccionable, sin imágenes ni columnas. Probá abrirlo y seleccionar el texto para comprobarlo.</p>
<h3>¿Funciona en el celular?</h3>
<p>Sí. El PDF se genera con la opción de imprimir de tu navegador; el Word se descarga como archivo .docx.</p>`,
};

export function construirHerramientas(ctx) {
  const { guias, esc, json, fill, write, rootFor, SITE_URL, articleTpl, verifyMeta, fmtDate } = ctx;
  const urls = [];
  const calcs = guias.filter((g) => g.tipo === 'calculadora');
  const orgRef = { '@type': 'Organization', name: 'TicoBrete', url: `${SITE_URL}/` };

  const pagina = (path, v) => {
    const raiz = rootFor(path);
    const canonical = `${SITE_URL}/${path}`;
    const html = fill(articleTpl, {
      ROOT: raiz, TITLE: esc(v.title), DESCRIPTION: esc(v.description), CANONICAL: esc(canonical), SITE_URL: esc(SITE_URL), VERIFY: verifyMeta(),
      H1: esc(v.h1), LEAD: esc(v.lead), META_LINE: v.meta || '', CRUMBS: v.crumbs, BODY: v.body, SCRIPTS: v.scripts || '', OGTYPE: 'website',
      JSONLD: `<script type="application/ld+json">${json(v.ld(canonical))}</script>`,
    }).replace(/\{ROOT\}/g, raiz);
    write(path, html);
  };
  const crumbs = (items) => `<nav class="crumbs" aria-label="Ruta"><a href="{ROOT}">Inicio</a> <i aria-hidden="true">›</i> ${items.map(([n, p], i) => (i === items.length - 1 ? `<span aria-current="page">${esc(n)}</span>` : `<a href="{ROOT}${p}">${esc(n)}</a>`)).join(' <i aria-hidden="true">›</i> ')}</nav>`;
  const bc = (items) => ({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` }, ...items.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 2, name: n, item: `${SITE_URL}/${p}` }))] });

  // Armador de currículum
  const pathCv = `herramientas/${CV.slug}/`;
  const migCv = [['Herramientas', 'herramientas/'], ['Armador de currículum', pathCv]];
  pagina(pathCv, {
    ...CV, crumbs: crumbs(migCv), body: CV.body,
    scripts: '<script type="module" src="{ROOT}assets/cv.js"></script>',
    meta: `<p class="article-meta"><span>Herramienta gratuita</span><span>Sin registro</span><span>Actualizada el <time datetime="${DATE}">${esc(fmtDate(`${DATE}T18:00:00Z`))}</time></span></p>`,
    ld: (c) => ({ '@context': 'https://schema.org', '@graph': [{ '@type': 'WebApplication', '@id': `${c}#app`, name: 'Armador de currículum de TicoBrete', url: c, description: CV.description, applicationCategory: 'BusinessApplication', operatingSystem: 'Any', inLanguage: 'es-CR', isAccessibleForFree: true, offers: { '@type': 'Offer', price: 0, priceCurrency: 'CRC' }, publisher: orgRef }, bc(migCv)] }),
  });
  urls.push([pathCv, DATE, '0.8', 'monthly']);

  // Página de herramientas
  const tarjeta = (href, tema, h, p, meta) => `<li><a href="{ROOT}${href}"><span class="card-tema">${esc(tema)}</span><h3>${esc(h)}</h3><p>${esc(p)}</p><span class="card-meta">${esc(meta)}</span></a></li>`;
  const lista = [
    tarjeta(pathCv, '📄 Currículum', CV.h1, CV.description, 'Gratis, sin registro'),
    ...calcs.map((g) => tarjeta(`guias/${g.slug}/`, '🧮 Calculadora', g.h1, g.description, 'Gratis, en tu navegador')),
  ];
  const mig = [['Herramientas', 'herramientas/']];
  const desc = 'Herramientas gratuitas para buscar trabajo en Costa Rica: armador de currículum para ATS y calculadoras de aguinaldo, liquidación, horas extra y vacaciones.';
  pagina('herramientas/', {
    title: 'Herramientas gratis para buscar trabajo en Costa Rica | TicoBrete', description: desc, h1: 'Herramientas para tu búsqueda de trabajo',
    lead: 'Todo gratis, sin registro y sin enviar tus datos a ningún servidor: corre directamente en tu navegador.', crumbs: crumbs(mig),
    body: `<ul class="guide-list">${lista.join('')}</ul><p class="muted">¿Te falta alguna herramienta? Escribinos desde el enlace “Sugerir” del sitio principal.</p><p>También tenemos <a href="{ROOT}guias/">guías laborales</a> con información verificada.</p>`,
    ld: (c) => ({ '@context': 'https://schema.org', '@graph': [{ '@type': 'CollectionPage', '@id': `${c}#page`, url: c, name: 'Herramientas de TicoBrete', inLanguage: 'es-CR', description: desc, mainEntity: { '@type': 'ItemList', itemListElement: [[CV.h1, pathCv], ...calcs.map((g) => [g.h1, `guias/${g.slug}/`])].map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, url: `${SITE_URL}/${p}` })) } }, bc(mig)] }),
  });
  urls.push(['herramientas/', DATE, '0.8', 'weekly']);
  return urls;
}
