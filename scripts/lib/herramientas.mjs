import { shareHtml } from './share.mjs';
import { SENALES } from '../../site/assets/verificador-core.js';
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
  title: 'Armador de currículum gratis para ATS en Word',
  description: 'Creá tu currículum gratis en Word (.docx), en formato compatible con ATS. Corre en tu navegador y no envía tus datos a ningún lado.',
  h1: 'Armador de currículum gratis (Word)',
  lead: 'Llená tus datos y descargá un currículum limpio, de una sola columna y compatible con los sistemas ATS que usan las empresas. Sin registro y sin enviar nada a internet.',
  body: `${FORM}
<h2>Qué es un currículum compatible con ATS</h2>
<p>Muchas empresas usan un <strong>ATS</strong> (sistema de seguimiento de candidatos) que lee tu currículum antes que una persona. Si el archivo tiene columnas, tablas, íconos o fotos, el sistema puede mezclar el orden o no leer partes. Este armador genera un formato <strong>sencillo, de una sola columna, con texto real</strong> y títulos estándar (Experiencia laboral, Educación, Habilidades), que es lo que esos sistemas entienden mejor.</p>

<h2>Cómo usarlo</h2>
<ol>
  <li>Llená tus datos. A la derecha ves cómo va quedando.</li>
  <li>Descargá tu archivo <strong>Word</strong> (.docx). Podés abrirlo en Word, Google Docs o LibreOffice para ajustarlo. Si una oferta pide PDF, abrilo y elegí "Guardar como PDF" o "Descargar como PDF".</li>
  <li>Adaptá el resumen y las habilidades a cada oferta, usando las palabras que aparecen en el anuncio.</li>
</ol>

<h2>Consejos para que funcione</h2>
<ul>
  <li><strong>Usá logros, no solo funciones:</strong> “Atendí 60 consultas diarias con 94 % de satisfacción” dice más que “atención al cliente”.</li>
  <li><strong>Poné primero lo más reciente</strong> en experiencia y estudios.</li>
  <li><strong>Una página</strong> es suficiente si estás empezando; máximo dos con mucha experiencia.</li>
  <li><strong>Sin foto, cédula ni datos que no hacen falta.</strong> Basta con correo, teléfono y zona donde vivís.</li>
  <li><strong>Revisá el formato final</strong> antes de enviarlo; si la oferta no dice nada, un PDF o un Word sirven.</li>
</ul>
<p>Más ayuda en la guía de <a href="{ROOT}guias/curriculum-costa-rica/">cómo hacer un currículum</a>, la <a href="{ROOT}guias/carta-de-presentacion-costa-rica/">carta de presentación</a> y la <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">entrevista de trabajo</a>.</p>

<aside class="article-cta"><h2>¿Ya tenés tu currículum?</h2><p>Buscá ofertas actualizadas todos los días, sin registro.</p><a class="btn btn-primary" href="{ROOT}">Ver los bretes más recientes</a></aside>

<h2>Preguntas frecuentes</h2>
<h3>¿Es gratis de verdad?</h3>
<p>Sí. No hay cuenta, marca de agua ni pagos.</p>
<h3>¿Guardan mis datos?</h3>
<p>No. Todo se procesa en tu navegador. Lo que escribís se guarda solo en tu equipo, para que no lo pierdas si cerrás la página.</p>
<h3>¿El archivo se puede leer por un ATS?</h3>
<p>Sí: el Word se genera con texto real, sin imágenes ni columnas, que es lo que estos sistemas leen mejor.</p>
<h3>¿Funciona en el celular?</h3>
<p>Sí. El archivo .docx se descarga y lo podés abrir con la app de Word o Google Docs.</p>`,
};


const lbl = (k, etiqueta, extra = '') => `<label class="field"><span>${etiqueta}</span><input data-k="${k}" ${extra}></label>`;
const chk = (k, etiqueta) => `<label class="field check"><input type="checkbox" data-k="${k}" checked><span>${etiqueta}</span></label>`;

const CARTA = {
  slug: 'generador-carta-de-renuncia',
  title: 'Generador de carta de renuncia en Costa Rica (Word)',
  description: 'Creá tu carta de renuncia en Costa Rica en minutos y descargala en Word. Gratis, sin registro y sin enviar tus datos a ningún lado.',
  h1: 'Generador de carta de renuncia',
  lead: 'Llená unos datos y descargá tu carta de renuncia lista para firmar, con el preaviso del Código de Trabajo. Corre en tu navegador: no se guarda ni se envía nada.',
  body: `<div class="cv-app">
  <form id="carta-form" class="cv-form" autocomplete="off" novalidate>
    <fieldset><legend>1. Tus datos</legend>
      <div class="calc-grid">
        ${lbl('nombre', 'Nombre completo', 'type="text" maxlength="80"')}
        ${lbl('cedula', 'Número de cédula', 'type="text" maxlength="20"')}
        ${lbl('puesto', 'Tu puesto', 'type="text" maxlength="80"')}
        ${lbl('ingreso', 'Fecha en que ingresaste', 'type="date"')}
      </div>
    </fieldset>
    <fieldset><legend>2. A quién va dirigida</legend>
      <div class="calc-grid">
        ${lbl('empresa', 'Nombre de la empresa', 'type="text" maxlength="100"')}
        ${lbl('destinatario', 'Nombre de tu jefatura o de Recursos Humanos (opcional)', 'type="text" maxlength="80"')}
        ${lbl('ciudad', 'Ciudad', 'type="text" maxlength="40" value="San José"')}
        ${lbl('fecha', 'Fecha de la carta', 'type="date"')}
      </div>
    </fieldset>
    <fieldset><legend>3. Tu salida</legend>
      <div class="calc-grid">
        ${lbl('ultimo', 'Último día de trabajo', 'type="date"')}
        <label class="field"><span>Preaviso</span>
          <select data-k="preaviso">
            <option value="ley">Cumplo el preaviso de ley</option>
            <option value="acuerdo">Acordado con la empresa</option>
            <option value="ninguno">No mencionar el preaviso</option>
          </select>
        </label>
      </div>
      <p class="muted">El preaviso es de 1 semana (3 a 6 meses de trabajo), 15 días (6 a 12 meses) o 1 mes (más de un año). Mirá la <a href="{ROOT}guias/como-renunciar-carta-renuncia-costa-rica/">guía para renunciar</a>.</p>
    </fieldset>
    <fieldset><legend>4. Qué incluir</legend>
      ${chk('agradecimiento', 'Agradecer la oportunidad y el trato recibido')}
      ${chk('traspaso', 'Ofrecer ayuda con el traspaso de funciones')}
      ${chk('liquidacion', 'Pedir el detalle de la liquidación')}
      ${chk('constancia', 'Pedir una constancia de trabajo')}
    </fieldset>
  </form>
  <section class="cv-side" aria-label="Vista previa y descargas">
    <div class="cv-actions">
      <button type="button" class="btn btn-primary" id="carta-word">Descargar Word</button>
      <button type="button" class="btn btn-ghost" id="carta-copiar">Copiar texto</button>
      <button type="button" class="btn btn-ghost" id="carta-borrar">Borrar todo</button>
    </div>
    <p id="carta-aviso" class="muted" role="status" hidden></p>
    <div id="carta-preview" class="cv-paper carta-paper" aria-live="polite"></div>
  </section>
</div>
<p class="muted cv-priv">🔒 Tus datos no salen de tu dispositivo y esta página no los guarda: si recargás, se borran. La carta lleva tu cédula, así que no queda almacenada en ningún lado.</p>

<h2>Cómo usar tu carta</h2>
<ol>
  <li>Revisá la vista previa y completá lo que falte. Las partes entre corchetes son datos que todavía no escribiste.</li>
  <li>Descargá el Word, imprimilo <strong>en dos copias</strong> y firmalas.</li>
  <li>Entregá una a Recursos Humanos o a tu jefatura y pedí que <strong>firmen y fechen la tuya como recibida</strong>. Si la mandás por correo, guardá la confirmación.</li>
  <li>Cumplí el preaviso y revisá tu liquidación antes de firmar el finiquito.</li>
</ol>

<h2>Antes de renunciar</h2>
<ul>
  <li>Calculá lo que te corresponde con la <a href="{ROOT}guias/calculadora-liquidacion-laboral-costa-rica/">calculadora de liquidación</a>.</li>
  <li>Leé la guía de <a href="{ROOT}guias/como-renunciar-carta-renuncia-costa-rica/">cómo renunciar</a>: preaviso, qué te deben pagar y por qué normalmente no hay cesantía.</li>
  <li>Si aún no tenés otro trabajo, <a href="{ROOT}">mirá los bretes más recientes</a> y armá tu <a href="{ROOT}herramientas/armador-de-curriculum/">currículum en Word</a>.</li>
</ul>
<aside class="note"><strong>Modelo general, no asesoría legal.</strong> Si tu contrato tiene condiciones especiales, consultá al MTSS: 800-TRABAJO (800 872 2256).</aside>

<h2>Preguntas frecuentes</h2>
<h3>¿Tengo que explicar por qué renuncio?</h3>
<p>No. Una carta breve, sin motivos, es suficiente.</p>
<h3>¿Es gratis?</h3>
<p>Sí. No hay cuenta, marca de agua ni pagos.</p>
<h3>¿Se guarda mi carta?</h3>
<p>No. Todo se procesa en tu navegador y se borra al cerrar o recargar la página.</p>`,
};
const area = (k, etiqueta, filas, max, ayuda = '') => `<label class="field wide"><span>${etiqueta}</span><textarea data-k="${k}" rows="${filas}" maxlength="${max}"></textarea>${ayuda ? `<small>${ayuda}</small>` : ''}</label>`;

const PRES = {
  slug: 'generador-carta-de-presentacion',
  title: 'Generador de carta de presentación para trabajo (Word)',
  description: 'Armá tu carta de presentación para una oferta de trabajo en Costa Rica y descargala en Word. Gratis, sin registro y sin enviar tus datos.',
  h1: 'Generador de carta de presentación',
  lead: 'Respondé unas preguntas y obtené una carta de presentación clara, lista para adjuntar con tu currículum. Corre en tu navegador: no se guarda ni se envía nada.',
  body: `<div class="cv-app">
  <form id="pres-form" class="cv-form" autocomplete="off" novalidate>
    <fieldset><legend>1. Tus datos</legend>
      <div class="calc-grid">
        ${lbl('nombre', 'Nombre completo', 'type="text" maxlength="80"')}
        ${lbl('email', 'Correo', 'type="email" maxlength="80"')}
        ${lbl('tel', 'Teléfono', 'type="tel" maxlength="30"')}
        ${lbl('ciudad', 'Provincia o cantón', 'type="text" maxlength="60"')}
      </div>
    </fieldset>
    <fieldset><legend>2. El puesto</legend>
      <div class="calc-grid">
        ${lbl('puesto', 'Puesto al que aplicás', 'type="text" maxlength="80"')}
        ${lbl('empresa', 'Nombre de la empresa', 'type="text" maxlength="100"')}
        ${lbl('destinatario', 'Nombre de la persona que recluta (opcional)', 'type="text" maxlength="80"')}
        ${lbl('fecha', 'Fecha', 'type="date"')}
      </div>
    </fieldset>
    <fieldset><legend>3. Tu perfil</legend>
      ${area('presentacion', 'Presentate en una o dos frases', 3, 400, 'Ejemplo: Soy asesora de servicio al cliente con 3 años de experiencia atendiendo por teléfono y chat, y un nivel de inglés B2.')}
      ${area('logros', 'Tus fortalezas y logros (uno por línea)', 4, 600, 'Mejor con números: "Mantuve una satisfacción del cliente de 94 %".')}
      ${area('motivo', 'Por qué te interesa esta empresa o este puesto', 3, 400, 'Ejemplo: valoro su enfoque en capacitar a su gente y quiero crecer en el área de servicio.')}
    </fieldset>
    <fieldset><legend>4. Disponibilidad</legend>
      <label class="field"><span>¿Cuándo podrías empezar?</span>
        <select data-k="disponibilidad">
          <option value="inmediata">Inmediatamente</option>
          <option value="quince">En 15 días</option>
          <option value="mes">En un mes</option>
          <option value="conversar">A convenir</option>
        </select>
      </label>
    </fieldset>
  </form>
  <section class="cv-side" aria-label="Vista previa y descargas">
    <div class="cv-actions">
      <button type="button" class="btn btn-primary" id="pres-word">Descargar Word</button>
      <button type="button" class="btn btn-ghost" id="pres-copiar">Copiar texto</button>
      <button type="button" class="btn btn-ghost" id="pres-borrar">Borrar todo</button>
    </div>
    <p id="pres-aviso" class="muted" role="status" hidden></p>
    <div id="pres-preview" class="cv-paper carta-paper" aria-live="polite"></div>
  </section>
</div>
<p class="muted cv-priv">🔒 Tus datos no salen de tu dispositivo y esta página no los guarda: si recargás, se borran.</p>

<h2>Cómo sacarle provecho a tu carta</h2>
<ol>
  <li><strong>Personalizala para cada oferta.</strong> Cambiá el puesto, la empresa y el motivo; una carta genérica se nota.</li>
  <li><strong>Usá las palabras del anuncio.</strong> Si piden "atención al cliente" o "manejo de Excel" y lo sabés hacer, mencionalo con esas palabras.</li>
  <li><strong>Que quepa en una página</strong>, y que cada línea aporte algo.</li>
  <li><strong>Adjuntala con tu <a href="{ROOT}herramientas/armador-de-curriculum/">currículum</a></strong> y revisá la ortografía antes de enviar.</li>
</ol>

<h2>Qué debe tener una buena carta de presentación</h2>
<ul>
  <li><strong>Quién sos</strong> y a qué puesto aplicás.</li>
  <li><strong>Dos o tres logros o fortalezas</strong> que respondan a lo que piden.</li>
  <li><strong>Por qué esa empresa</strong>, en una frase.</li>
  <li><strong>Tu disponibilidad</strong> y cómo contactarte.</li>
</ul>
<p>Más ideas en la guía de <a href="{ROOT}guias/carta-de-presentacion-costa-rica/">cómo escribir una carta de presentación</a> y en la de <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">entrevista de trabajo</a>.</p>

<aside class="article-cta"><h2>¿Ya tenés tu carta?</h2><p>Buscá ofertas actualizadas todos los días, sin registro.</p><a class="btn btn-primary" href="{ROOT}">Ver los bretes más recientes</a></aside>

<h2>Preguntas frecuentes</h2>
<h3>¿Necesito carta de presentación para todos los trabajos?</h3>
<p>No siempre. Si la oferta no la pide, un mensaje breve en el correo funciona. Pero con ella te diferenciás, sobre todo si tenés poca experiencia.</p>
<h3>¿Es gratis?</h3>
<p>Sí. No hay cuenta, marca de agua ni pagos.</p>
<h3>¿Se guarda mi carta?</h3>
<p>No. Todo se procesa en tu navegador y se borra al cerrar o recargar.</p>`,
};
const VER = {
  slug: 'verificador-de-ofertas-falsas',
  title: 'Verificador de ofertas de trabajo falsas: ¿es una estafa?',
  description: 'Marcá lo que te pidieron o te ofrecieron y mirá el nivel de riesgo de una oferta de trabajo. Gratis, sin registro y sin enviar tus datos.',
  h1: 'Verificador de ofertas de trabajo sospechosas',
  lead: 'Marcá las señales que ves en la oferta y te decimos qué tan riesgosa es. Funciona en tu navegador: no se guarda ni se envía nada.',
  body: `<div class="ver-app">
  <form id="ver-form" class="ver-form" novalidate>
    <fieldset><legend>¿Qué señales ves en la oferta?</legend>
      <ul class="ver-lista">
        ${SENALES.map((s) => `<li><label class="field check"><input type="checkbox" value="${s.id}"><span>${s.texto}</span></label></li>`).join('')}
      </ul>
    </fieldset>
    <div class="calc-actions"><button class="btn btn-ghost" type="reset">Limpiar</button></div>
  </form>
  <div id="ver-resultado" class="ver-resultado" aria-live="polite"></div>
</div>

<h2>Cómo usar el verificador</h2>
<ol>
  <li>Marcá todo lo que se aplique a la oferta o al contacto: el resultado se actualiza solo.</li>
  <li>Si sale <strong>riesgo alto</strong>, cortá la comunicación y no pagues ni mandes datos.</li>
  <li>Si sale <strong>precaución o riesgo medio</strong>, verificá la empresa por tu cuenta: buscá su sitio oficial, llamá a un teléfono que no te hayan dado ellos y preguntá en la dirección que publican.</li>
</ol>

<h2>La regla de oro</h2>
<p><strong>Un trabajo de verdad nunca te cobra para contratarte.</strong> Ni por uniforme, curso, carné, "capacitación" o "reservar" el puesto. Tampoco necesita tus claves, códigos de verificación ni que recibas plata de otras personas.</p>
<p>Además, contratar costarricenses para trabajar en el exterior requiere permiso previo del Ministerio de Trabajo (art. 41 del Código de Trabajo). Si te ofrecen irte a trabajar fuera y te cobran gestiones, desconfiá.</p>

<h2>Si ya enviaste datos o dinero</h2>
<ol>
  <li><strong>Cortá el contacto</strong> y guardá capturas de los mensajes, números y comprobantes.</li>
  <li><strong>Avisá a tu banco</strong> de inmediato si hiciste una transferencia o compartiste datos de tu cuenta.</li>
  <li><strong>Cambiá tus claves</strong> y activá la verificación en dos pasos.</li>
  <li><strong>Denunciá</strong> ante el OIJ. Más pasos en la guía de <a href="{ROOT}guias/estafas-laborales-costa-rica/">estafas laborales</a>.</li>
</ol>

<h2>Para aprender más</h2>
<ul>
  <li><a href="{ROOT}guias/estafas-laborales-costa-rica/">Estafas laborales en Costa Rica: cómo reconocerlas</a>.</li>
  <li><a href="{ROOT}guias/ofertas-de-trabajo-falsas-whatsapp-facebook/">Ofertas falsas en WhatsApp y Facebook</a>.</li>
  <li>En TicoBrete revisamos las ofertas con filtros contra estafas, pero ningún filtro es perfecto: verificá siempre. Mirá <a href="{ROOT}">los bretes más recientes</a>.</li>
</ul>
<aside class="note"><strong>Herramienta de orientación, no un veredicto.</strong> Una oferta sin señales puede ser falsa, y una con señales puede ser mal redactada pero real. Usá tu criterio y verificá siempre.</aside>

<h2>Preguntas frecuentes</h2>
<h3>¿Se guardan las respuestas?</h3>
<p>No. Todo se calcula en tu navegador y no se envía a ningún lado.</p>
<h3>¿Y si la oferta pide experiencia y es de una empresa conocida?</h3>
<p>Aun así verificá que el contacto sea de la empresa: hay estafadores que usan el nombre de empresas reales.</p>
<h3>¿Puedo confiar en las ofertas de TicoBrete?</h3>
<p>Aplicamos filtros contra estafas y solo enlazamos fuentes públicas, pero te recomendamos verificar siempre antes de dar datos.</p>`,
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
      H1: esc(v.h1), LEAD: esc(v.lead), META_LINE: v.meta || '', CRUMBS: v.crumbs, BODY: v.body, SHARE: shareHtml(v.h1, canonical), SCRIPTS: v.scripts || '', OGTYPE: 'website',
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

  // Generador de carta de renuncia
  const pathCarta = `herramientas/${CARTA.slug}/`;
  const migCarta = [['Herramientas', 'herramientas/'], ['Carta de renuncia', pathCarta]];
  pagina(pathCarta, {
    ...CARTA, crumbs: crumbs(migCarta), body: CARTA.body,
    scripts: '<script type="module" src="{ROOT}assets/carta.js"></script>',
    meta: `<p class="article-meta"><span>Herramienta gratuita</span><span>Sin registro</span><span>Actualizada el <time datetime="2026-10-13">${esc(fmtDate('2026-10-13T18:00:00Z'))}</time></span></p>`,
    ld: (c) => ({ '@context': 'https://schema.org', '@graph': [{ '@type': 'WebApplication', '@id': `${c}#app`, name: 'Generador de carta de renuncia de TicoBrete', url: c, description: CARTA.description, applicationCategory: 'BusinessApplication', operatingSystem: 'Any', inLanguage: 'es-CR', isAccessibleForFree: true, offers: { '@type': 'Offer', price: 0, priceCurrency: 'CRC' }, publisher: orgRef }, bc(migCarta)] }),
  });
  urls.push([pathCarta, '2026-10-13', '0.8', 'monthly']);
  // Generador de carta de presentación
  const pathPres = `herramientas/${PRES.slug}/`;
  const migPres = [['Herramientas', 'herramientas/'], ['Carta de presentación', pathPres]];
  pagina(pathPres, {
    ...PRES, crumbs: crumbs(migPres), body: PRES.body,
    scripts: '<script type="module" src="{ROOT}assets/presentacion.js"></script>',
    meta: `<p class="article-meta"><span>Herramienta gratuita</span><span>Sin registro</span><span>Actualizada el <time datetime="2026-10-13">${esc(fmtDate('2026-10-13T18:00:00Z'))}</time></span></p>`,
    ld: (c) => ({ '@context': 'https://schema.org', '@graph': [{ '@type': 'WebApplication', '@id': `${c}#app`, name: 'Generador de carta de presentación de TicoBrete', url: c, description: PRES.description, applicationCategory: 'BusinessApplication', operatingSystem: 'Any', inLanguage: 'es-CR', isAccessibleForFree: true, offers: { '@type': 'Offer', price: 0, priceCurrency: 'CRC' }, publisher: orgRef }, bc(migPres)] }),
  });
  urls.push([pathPres, '2026-10-13', '0.8', 'monthly']);
  // Verificador de ofertas sospechosas
  const pathVer = `herramientas/${VER.slug}/`;
  const migVer = [['Herramientas', 'herramientas/'], ['Verificador de ofertas', pathVer]];
  pagina(pathVer, {
    ...VER, crumbs: crumbs(migVer), body: VER.body,
    scripts: '<script type="module" src="{ROOT}assets/verificador.js"></script>',
    meta: `<p class="article-meta"><span>Herramienta gratuita</span><span>Sin registro</span><span>Actualizada el <time datetime="2026-10-13">${esc(fmtDate('2026-10-13T18:00:00Z'))}</time></span></p>`,
    ld: (c) => ({ '@context': 'https://schema.org', '@graph': [{ '@type': 'WebApplication', '@id': `${c}#app`, name: 'Verificador de ofertas de trabajo sospechosas de TicoBrete', url: c, description: VER.description, applicationCategory: 'SecurityApplication', operatingSystem: 'Any', inLanguage: 'es-CR', isAccessibleForFree: true, offers: { '@type': 'Offer', price: 0, priceCurrency: 'CRC' }, publisher: orgRef }, bc(migVer)] }),
  });
  urls.push([pathVer, '2026-10-13', '0.8', 'monthly']);
  // Página de herramientas
  const tarjeta = (href, tema, h, p, meta) => `<li><a href="{ROOT}${href}"><span class="card-tema">${esc(tema)}</span><h3>${esc(h)}</h3><p>${esc(p)}</p><span class="card-meta">${esc(meta)}</span></a></li>`;
  const lista = [
    tarjeta(pathVer, '🛡️ Seguridad', VER.h1, VER.description, 'Gratis, sin registro'),
    tarjeta(pathCv, '📄 Currículum', CV.h1, CV.description, 'Gratis, sin registro'),
    tarjeta(pathPres, '📝 Carta', PRES.h1, PRES.description, 'Gratis, sin registro'),
    tarjeta(pathCarta, '✉️ Carta', CARTA.h1, CARTA.description, 'Gratis, sin registro'),
    ...calcs.map((g) => tarjeta(`guias/${g.slug}/`, '🧮 Calculadora', g.h1, g.description, 'Gratis, en tu navegador')),
  ];
  const mig = [['Herramientas', 'herramientas/']];
  const desc = 'Herramientas gratis para buscar trabajo en Costa Rica: verificador de estafas, currículum, cartas y calculadoras de aguinaldo, salario neto y liquidación.';
  pagina('herramientas/', {
    title: 'Herramientas gratis para buscar trabajo en Costa Rica | TicoBrete', description: desc, h1: 'Herramientas para tu búsqueda de trabajo',
    lead: 'Todo gratis, sin registro y sin enviar tus datos a ningún servidor: corre directamente en tu navegador.', crumbs: crumbs(mig),
    body: `<ul class="guide-list">${lista.join('')}</ul><p class="muted">¿Te falta alguna herramienta? Escribinos desde el enlace “Sugerir” del sitio principal.</p><p>También tenemos <a href="{ROOT}guias/">guías laborales</a> con información verificada.</p>`,
    ld: (c) => ({ '@context': 'https://schema.org', '@graph': [{ '@type': 'CollectionPage', '@id': `${c}#page`, url: c, name: 'Herramientas de TicoBrete', inLanguage: 'es-CR', description: desc, mainEntity: { '@type': 'ItemList', itemListElement: [[VER.h1, pathVer], [CV.h1, pathCv], [PRES.h1, pathPres], [CARTA.h1, pathCarta], ...calcs.map((g) => [g.h1, `guias/${g.slug}/`])].map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, url: `${SITE_URL}/${p}` })) } }, bc(mig)] }),
  });
  urls.push(['herramientas/', DATE, '0.8', 'weekly']);
  return urls;
}
