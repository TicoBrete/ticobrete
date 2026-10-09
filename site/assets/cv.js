// Armador de currículum: pantalla. Los datos solo se guardan en este navegador (localStorage) y nunca se envían.
import { construirBloques, docx, EJEMPLO, nombreArchivo } from './cv-core.js';

const form = document.getElementById('cv-form');
const papel = document.getElementById('cv-preview');
const CLAVE = 'ticobrete-cv-v1';

const CAMPOS = {
  exp: [['puesto', 'Puesto', 'input'], ['empresa', 'Empresa', 'input'], ['lugar', 'Lugar (opcional)', 'input'], ['desde', 'Desde (ej. Mar 2023)', 'input'], ['hasta', 'Hasta (o “Actual”)', 'input'], ['logros', 'Qué hiciste y lograste (una idea por línea)', 'textarea']],
  edu: [['titulo', 'Título o curso', 'input'], ['centro', 'Institución', 'input'], ['anio', 'Año o período', 'input']],
};

function entrada(lista, valores = {}) {
  const li = document.createElement('div');
  li.className = 'cv-entry';
  for (const [nombre, etiqueta, tipo] of CAMPOS[lista]) {
    const l = document.createElement('label');
    l.className = 'field' + (tipo === 'textarea' ? ' wide' : '');
    const s = document.createElement('span');
    s.textContent = etiqueta;
    const c = document.createElement(tipo);
    c.dataset.f = nombre;
    if (tipo === 'textarea') c.rows = 4;
    c.value = valores[nombre] || '';
    l.append(s, c);
    li.append(l);
  }
  const quitar = document.createElement('button');
  quitar.type = 'button';
  quitar.className = 'btn btn-ghost cv-quitar';
  quitar.textContent = 'Quitar';
  quitar.addEventListener('click', () => { li.remove(); actualizar(); });
  li.append(quitar);
  document.querySelector(`[data-lista="${lista}"]`).append(li);
}

function leer() {
  const d = {};
  for (const el of form.querySelectorAll('[data-k]')) d[el.dataset.k] = el.value;
  for (const lista of Object.keys(CAMPOS)) {
    d[lista] = [...document.querySelectorAll(`[data-lista="${lista}"] .cv-entry`)].map((e) => Object.fromEntries([...e.querySelectorAll('[data-f]')].map((c) => [c.dataset.f, c.value])));
  }
  return d;
}

function poner(d) {
  for (const el of form.querySelectorAll('[data-k]')) el.value = d[el.dataset.k] || '';
  for (const lista of Object.keys(CAMPOS)) {
    document.querySelector(`[data-lista="${lista}"]`).replaceChildren();
    const items = d[lista]?.length ? d[lista] : [{}];
    for (const v of items) entrada(lista, v);
  }
}

function pintar(bloques) {
  papel.replaceChildren();
  if (!bloques.length) {
    const p = document.createElement('p');
    p.className = 'cv-vacio';
    p.textContent = 'Acá vas a ver tu currículum mientras lo llenás.';
    papel.append(p);
    return;
  }
  const mk = (tag, txt, cls) => { const e = document.createElement(tag); e.textContent = txt; if (cls) e.className = cls; return e; };
  let ul = null;
  for (const x of bloques) {
    if (x.k !== 'bullet') ul = null;
    if (x.k === 'name') papel.append(mk('h2', x.t, 'cv-name'));
    else if (x.k === 'title') papel.append(mk('p', x.t, 'cv-title'));
    else if (x.k === 'contact') papel.append(mk('p', x.t, 'cv-contact'));
    else if (x.k === 'h2') papel.append(mk('h3', x.t, 'cv-h'));
    else if (x.k === 'p') papel.append(mk('p', x.t));
    else if (x.k === 'job') {
      const d = document.createElement('div');
      d.className = 'cv-job';
      d.append(mk('strong', x.a));
      if (x.b) d.append(mk('span', x.b));
      papel.append(d);
    } else if (x.k === 'bullet') {
      if (!ul) { ul = document.createElement('ul'); papel.append(ul); }
      ul.append(mk('li', x.t));
    }
  }
}

let t;
function actualizar() {
  const d = leer();
  pintar(construirBloques(d));
  clearTimeout(t);
  t = setTimeout(() => { try { localStorage.setItem(CLAVE, JSON.stringify(d)); } catch { /* sin almacenamiento */ } }, 400);
}

function descargar(bytes, nombre, tipo) {
  const url = URL.createObjectURL(new Blob([bytes], { type: tipo }));
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function aviso(txt) {
  const e = document.getElementById('cv-aviso');
  e.textContent = txt;
  e.hidden = false;
}

if (form && papel) {
  let guardado = null;
  try { guardado = JSON.parse(localStorage.getItem(CLAVE) || 'null'); } catch { /* ignorar */ }
  poner(guardado || {});
  actualizar();

  form.addEventListener('input', actualizar);
  form.addEventListener('submit', (e) => e.preventDefault());
  for (const b of document.querySelectorAll('[data-agregar]')) b.addEventListener('click', () => { entrada(b.dataset.agregar); actualizar(); });

  document.getElementById('cv-pdf').addEventListener('click', () => {
    const d = leer();
    if (!construirBloques(d).length) return aviso('Llená al menos tu nombre para generar el PDF.');
    const antes = document.title;
    document.title = nombreArchivo(d);
    window.print();
    document.title = antes;
    aviso('En la ventana de impresión elegí “Guardar como PDF” como destino.');
  });
  document.getElementById('cv-word').addEventListener('click', () => {
    const d = leer();
    const bloques = construirBloques(d);
    if (!bloques.length) return aviso('Llená al menos tu nombre para generar el Word.');
    descargar(docx(bloques), `${nombreArchivo(d)}.docx`, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    aviso('Listo: se descargó tu archivo .docx. Se abre en Word, Google Docs o LibreOffice.');
  });
  document.getElementById('cv-ejemplo').addEventListener('click', () => { poner(EJEMPLO); actualizar(); });
  document.getElementById('cv-borrar').addEventListener('click', () => {
    if (!confirm('¿Borrar todo lo que escribiste? Esto no se puede deshacer.')) return;
    try { localStorage.removeItem(CLAVE); } catch { /* ignorar */ }
    poner({});
    actualizar();
  });
}
