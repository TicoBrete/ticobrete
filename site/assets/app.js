const doc = document.documentElement;
const ROOT = doc.dataset.root || './';
const REPO = doc.dataset.repo || '';
const PRESET = doc.dataset.preset || '';
const NS = 'http://www.w3.org/2000/svg';
const PAGE = 24;

const CATS = {
  tecnologia: ['💻', 'Tecnología'],
  'servicio-cliente': ['🎧', 'Servicio al cliente'],
  ventas: ['🛍️', 'Ventas'],
  mercadeo: ['🎨', 'Mercadeo y diseño'],
  finanzas: ['📊', 'Finanzas y administración'],
  logistica: ['🚚', 'Logística y transporte'],
  manufactura: ['🏭', 'Producción y manufactura'],
  ingenieria: ['⚙️', 'Ingeniería'],
  salud: ['🩺', 'Salud'],
  turismo: ['🌴', 'Turismo y restaurantes'],
  educacion: ['📚', 'Educación'],
  construccion: ['🔨', 'Construcción y oficios'],
  servicios: ['🧹', 'Servicios generales'],
  legal: ['⚖️', 'Legal'],
  gerencia: ['🧭', 'Gerencia y especialistas'],
  otros: ['✨', 'Otros'],
};
const PROVS = [
  ['san-jose', 'San José'], ['alajuela', 'Alajuela'], ['heredia', 'Heredia'], ['cartago', 'Cartago'],
  ['guanacaste', 'Guanacaste'], ['puntarenas', 'Puntarenas'], ['limon', 'Limón'],
];
const PROV_NAME = Object.fromEntries(PROVS);
const MODS = { presencial: 'Presencial', hibrido: 'Híbrido', remoto: 'Remoto' };
const ORIGINS = { empresa: 'Empresas directas', comunidad: 'Comunidades y redes', remoto: 'Bolsas de trabajo remoto', agregador: 'Buscadores de empleo' };
const TAGS = { bilingue: 'Inglés o bilingüe', junior: 'Sin experiencia o pasantía', temporal: 'Temporal o medio tiempo' };
const DAYS = [[0, 'Cualquier fecha'], [1, 'Últimas 24 horas'], [3, 'Últimos 3 días'], [7, 'Última semana'], [30, 'Último mes']];
const QUICK = [
  ['🎧 Servicio al cliente', { c: 'servicio-cliente' }], ['🌎 Remoto', { s: 'remote' }], ['🗣️ Bilingüe', { t: 'bilingue' }],
  ['🌱 Sin experiencia', { t: 'junior' }], ['🏭 Operario', { q: 'operario' }], ['💻 Desarrollador', { q: 'developer' }], ['📍 Heredia', { p: 'heredia' }],
];

const $ = (s, el = document) => el.querySelector(s);
const fold = (s = '') => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const nf = new Intl.NumberFormat('es-CR');

function h(tag, props = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  return el;
}
function icon(name, cls = 'ico') {
  const s = document.createElementNS(NS, 'svg');
  s.setAttribute('class', cls);
  s.setAttribute('aria-hidden', 'true');
  const u = document.createElementNS(NS, 'use');
  u.setAttribute('href', `#i-${name}`);
  s.append(u);
  return s;
}
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

function ago(t, now = Date.now()) {
  const m = Math.max(0, Math.round((now - t) / 60000));
  if (m < 2) return 'justo ahora';
  if (m < 60) return `hace ${m} min`;
  const hr = Math.round(m / 60);
  if (hr < 24) return `hace ${hr} h`;
  const d = Math.round(hr / 24);
  if (d === 1) return 'ayer';
  if (d < 14) return `hace ${d} días`;
  if (d < 60) return `hace ${Math.round(d / 7)} sem`;
  return `hace ${Math.round(d / 30)} meses`;
}

function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toast.t);
  toast.t = setTimeout(() => (el.hidden = true), 2400);
}

/* ---------- Estado ---------- */
const DEFAULTS = { q: '', p: '', m: '', c: '', d: 0, s: 'all', o: '', t: [], so: 'recent', g: false };
const state = { ...DEFAULTS };
let ALL = [];
let META = null;
let shown = PAGE;
const saved = (() => {
  try { return JSON.parse(localStorage.getItem('tb.saved') || '{}'); } catch { return {}; }
})();
const persistSaved = () => { try { localStorage.setItem('tb.saved', JSON.stringify(saved)); } catch { /* sin almacenamiento */ } };

function readUrl() {
  const q = new URLSearchParams(location.search);
  const preset = {};
  if (PRESET) { const [k, v] = PRESET.split(':'); preset[{ prov: 'p', scope: 's', cat: 'c' }[k]] = v; }
  const get = (k) => (q.has(k) ? q.get(k) : preset[k]);
  state.q = (q.get('q') || '').slice(0, 80);
  state.p = PROV_NAME[get('p')] ? get('p') : '';
  state.m = MODS[get('m')] ? get('m') : '';
  state.c = CATS[get('c')] ? get('c') : '';
  state.d = DAYS.some(([n]) => n === Number(get('d'))) ? Number(get('d')) : 0;
  state.s = ['all', 'cr', 'remote'].includes(get('s')) ? get('s') : 'all';
  state.o = ORIGINS[get('o')] ? get('o') : '';
  state.t = (get('t') || '').split(',').filter((x) => TAGS[x]);
  state.so = get('so') === 'relevance' ? 'relevance' : 'recent';
  state.g = q.get('g') === '1';
}
function writeUrl() {
  const q = new URLSearchParams();
  const preset = {};
  if (PRESET) { const [k, v] = PRESET.split(':'); preset[{ prov: 'p', scope: 's', cat: 'c' }[k]] = v; }
  const put = (k, v, def) => { const sv = Array.isArray(v) ? v.join(',') : String(v); if (sv !== String(def)) q.set(k, sv); };
  for (const k of ['q', 'p', 'm', 'c', 'd', 's', 'o', 't', 'so']) put(k, state[k], preset[k] ?? (Array.isArray(DEFAULTS[k]) ? '' : DEFAULTS[k]));
  if (state.g) q.set('g', '1');
  const qs = q.toString();
  history.replaceState(null, '', location.pathname + (qs ? `?${qs}` : ''));
}

/* ---------- Filtrado ---------- */
function prepare(j) {
  j._t = Date.parse(j.postedAt) || 0;
  j._hay = fold([j.title, j.company, j.location, CATS[j.category]?.[1], PROV_NAME[j.province], MODS[j.modality], j.excerpt, (j.tags || []).join(' ')].join(' '));
  j._title = fold(j.title);
  j._co = fold(j.company || '');
  const seed = fold(j.company || j.title);
  let hue = 0;
  for (const ch of seed) hue = (hue * 31 + ch.charCodeAt(0)) % 360;
  j._hue = hue;
  j._ini = (j.company || j.title).replace(/[^\p{L}\p{N} ]/gu, '').trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || '·';
  return j;
}

function terms() { return fold(state.q).split(/[\s,]+/).filter(Boolean); }

function pass(j, skip, tq, cutoff) {
  if (skip !== 's') {
    if (state.s === 'cr' && j.kind === 'remoto') return false;
    if (state.s === 'remote' && j.modality !== 'remoto') return false;
  }
  if (skip !== 'p' && state.p && j.province !== state.p) return false;
  if (skip !== 'm' && state.m && j.modality !== state.m) return false;
  if (skip !== 'c' && state.c && j.category !== state.c) return false;
  if (skip !== 'o' && state.o && j.kind !== state.o) return false;
  if (skip !== 'd' && cutoff && j._t < cutoff) return false;
  if (skip !== 't' && state.t.length && !state.t.every((t) => j.tags?.includes(t))) return false;
  if (skip !== 'q' && tq.length && !tq.every((w) => j._hay.includes(w))) return false;
  return true;
}
function score(j, tq) {
  let s = 0;
  for (const w of tq) { if (j._title.includes(w)) s += 3; if (j._co.includes(w)) s += 2; }
  return s;
}
function filtered(skip) {
  const tq = terms();
  const cutoff = state.d ? Date.now() - state.d * 864e5 : 0;
  return ALL.filter((j) => pass(j, skip, tq, cutoff));
}

/* ---------- Render: tarjetas ---------- */
function card(j, i) {
  const isNew = Date.now() - j._t < 36 * 3600e3;
  const isSaved = !!saved[j.id];
  const loc = j.location || (j.province ? PROV_NAME[j.province] : 'Costa Rica');
  const href = /^https?:\/\//.test(j.url) ? j.url : '#';

  const saveBtn = h('button', { class: 'act', type: 'button', 'aria-pressed': String(isSaved), 'aria-label': 'Guardar este brete', title: 'Guardar' }, icon(isSaved ? 'heart-fill' : 'heart'));
  saveBtn.addEventListener('click', () => {
    if (saved[j.id]) { delete saved[j.id]; toast('Quitado de guardados'); } else { saved[j.id] = snap(j); toast('¡Guardado! Lo ves en el corazón de arriba'); }
    persistSaved();
    updateSavedCount();
    if (state.g) render(); else {
      const on = !!saved[j.id];
      saveBtn.setAttribute('aria-pressed', String(on));
      saveBtn.replaceChildren(icon(on ? 'heart-fill' : 'heart'));
    }
  });
  const shareBtn = h('button', { class: 'act', type: 'button', 'aria-label': 'Compartir este brete', title: 'Compartir' }, icon('share'));
  shareBtn.addEventListener('click', async () => {
    const text = `${j.title}${j.company ? ' en ' + j.company : ''} — encontrado en TicoBrete`;
    try {
      if (navigator.share) await navigator.share({ title: j.title, text, url: href });
      else { await navigator.clipboard.writeText(`${text}\n${href}`); toast('Enlace copiado'); }
    } catch { /* cancelado */ }
  });

  const badges = h('div', { class: 'badges' },
    isNew && h('span', { class: 'badge new', text: 'Nuevo' }),
    j.modality && h('span', { class: `badge m-${j.modality}`, text: MODS[j.modality] }),
    h('span', { class: 'badge', text: CATS[j.category]?.[1] || 'Otros' }),
    j.salary && h('span', { class: 'badge salary', text: j.salary }),
    (j.tags || []).includes('junior') && h('span', { class: 'badge', text: 'Sin experiencia' }),
    (j.tags || []).includes('bilingue') && h('span', { class: 'badge', text: 'Inglés' }),
  );

  const avatar = h('div', { class: 'avatar', 'aria-hidden': 'true', text: j._ini });
  avatar.style.setProperty('--h', j._hue);

  return h('article', { class: 'job' },
    avatar,
    h('div', { class: 'job-body' },
      h('h3', { class: 'job-title' }, h('a', { href, target: '_blank', rel: 'noopener noreferrer nofollow ugc', text: j.title })),
      h('div', { class: 'job-meta' },
        j.company && h('span', { class: 'co' }, icon('building'), j.company),
        h('span', {}, icon('pin'), loc),
      ),
      badges,
      j.excerpt && h('p', { class: 'job-excerpt', text: j.excerpt }),
      h('p', { class: 'job-src' }, 'Fuente:', h('b', { text: j.source }), j.via && `· vía ${j.via}`),
    ),
    h('div', { class: 'job-aside' },
      h('span', { class: 'when' }, icon('clock'), ago(j._t)),
      h('div', { class: 'job-actions' }, saveBtn, shareBtn,
        h('a', { class: 'apply', href, target: '_blank', rel: 'noopener noreferrer nofollow ugc' }, 'Ver oferta', icon('ext'))),
    ),
  );
}
function snap(j) { return Object.fromEntries(Object.entries(j).filter(([k]) => !k.startsWith('_'))); }
function withDelay(el, i) { el.style.animationDelay = `${Math.min(i, 12) * 28}ms`; return el; }

/* ---------- Render: filtros ---------- */
const facetRefs = [];
function buildFacet(title, key, options, type) {
  const box = h('fieldset', { class: 'facet' });
  box.append(h('h3', { text: title }));
  const refs = [];
  for (const [value, label] of options) {
    const input = h('input', { type, name: `f-${key}`, value });
    const count = h('span', { class: 'opt-count', text: '0' });
    const el = h('label', { class: 'opt' }, input, h('span', { class: 'opt-label', text: label }), count);
    input.addEventListener('change', () => {
      if (type === 'radio') state[key] = key === 'd' ? Number(value) : value;
      else state[key] = input.checked ? [...state[key], value] : state[key].filter((x) => x !== value);
      shown = PAGE; render();
    });
    box.append(el);
    refs.push({ value, input, count, el });
  }
  facetRefs.push({ key, type, refs });
  return box;
}
function buildFacets() {
  const wrap = $('#facets');
  wrap.append(
    buildFacet('Provincia', 'p', [['', 'Todo el país'], ...PROVS], 'radio'),
    buildFacet('Modalidad', 'm', [['', 'Cualquiera'], ...Object.entries(MODS)], 'radio'),
    buildFacet('Publicado', 'd', DAYS.map(([n, l]) => [String(n), l]), 'radio'),
    buildFacet('Origen', 'o', [['', 'Todos'], ...Object.entries(ORIGINS)], 'radio'),
    buildFacet('Extras', 't', Object.entries(TAGS), 'checkbox'),
  );
}
function updateFacets() {
  for (const f of facetRefs) {
    const base = filtered(f.key);
    for (const r of f.refs) {
      let n;
      if (f.key === 'p') n = r.value ? base.filter((j) => j.province === r.value).length : base.length;
      else if (f.key === 'm') n = r.value ? base.filter((j) => j.modality === r.value).length : base.length;
      else if (f.key === 'o') n = r.value ? base.filter((j) => j.kind === r.value).length : base.length;
      else if (f.key === 't') n = base.filter((j) => j.tags?.includes(r.value)).length;
      else if (f.key === 'd') { const v = Number(r.value); n = v ? base.filter((j) => Date.now() - j._t < v * 864e5).length : base.length; }
      r.count.textContent = nf.format(n);
      r.el.classList.toggle('is-empty', n === 0);
      r.input.checked = f.type === 'radio' ? String(state[f.key]) === r.value : state.t.includes(r.value);
    }
  }
}

function buildRail() {
  const rail = $('#cat-rail');
  for (const [key, [emoji, name]] of Object.entries(CATS)) {
    const count = h('span', { class: 'cat-count', text: '' });
    const btn = h('button', { class: 'cat', type: 'button', 'data-cat': key, 'aria-pressed': 'false' },
      h('span', { class: 'cat-emoji', 'aria-hidden': 'true', text: emoji }),
      h('span', {}, h('span', { class: 'cat-name', text: name }), count));
    btn.addEventListener('click', () => { state.c = state.c === key ? '' : key; shown = PAGE; render(); });
    rail.append(btn);
  }
}
function updateRail() {
  const base = filtered('c');
  const counts = {};
  for (const j of base) counts[j.category] = (counts[j.category] || 0) + 1;
  const rail = $('#cat-rail');
  const items = [...rail.children];
  for (const el of items) {
    const key = el.dataset.cat;
    el.setAttribute('aria-pressed', String(state.c === key));
    el.querySelector('.cat-count').textContent = `${nf.format(counts[key] || 0)} ${counts[key] === 1 ? 'brete' : 'bretes'}`;
    el.hidden = !counts[key] && state.c !== key;
  }
}

function activeChips() {
  const chips = [];
  const add = (label, clear) => chips.push(h('button', { class: 'chip', type: 'button', 'aria-label': `Quitar filtro ${label}`, onclick: () => { clear(); shown = PAGE; render(); } }, label, icon('x')));
  if (state.q) add(`“${state.q}”`, () => { state.q = ''; $('#q').value = ''; });
  if (state.p) add(PROV_NAME[state.p], () => (state.p = ''));
  if (state.m) add(MODS[state.m], () => (state.m = ''));
  if (state.c) add(CATS[state.c][1], () => (state.c = ''));
  if (state.d) add(DAYS.find(([n]) => n === state.d)[1], () => (state.d = 0));
  if (state.o) add(ORIGINS[state.o], () => (state.o = ''));
  for (const t of state.t) add(TAGS[t], () => (state.t = state.t.filter((x) => x !== t)));
  return chips;
}

/* ---------- Render principal ---------- */
function render() {
  const list = state.g ? Object.values(saved).map(prepare) : filtered();
  if (!state.g) {
    const tq = terms();
    list.sort((a, b) => (state.so === 'relevance' && tq.length ? score(b, tq) - score(a, tq) : 0) || b._t - a._t);
  } else list.sort((a, b) => b._t - a._t);

  const jobsEl = $('#jobs');
  jobsEl.setAttribute('aria-busy', 'false');
  jobsEl.replaceChildren();

  const chips = activeChips();
  $('#res-count').textContent = state.g
    ? `Tus bretes guardados (${nf.format(list.length)})`
    : `${nf.format(list.length)} ${list.length === 1 ? 'brete encontrado' : 'bretes encontrados'}`;
  $('#active-chips').replaceChildren(...chips);
  const nFilters = chips.length + (state.s !== 'all' ? 1 : 0);
  const fc = $('#filters-count');
  fc.hidden = !nFilters; fc.textContent = nFilters;

  if (!list.length) {
    jobsEl.append(h('div', { class: 'empty' },
      h('div', { class: 'big-emoji', text: state.g ? '💙' : '🔎' }),
      h('h3', { text: state.g ? 'Todavía no guardaste ninguno' : 'No encontramos bretes con eso' }),
      h('p', { text: state.g ? 'Tocá el corazón en cualquier oferta para guardarla y verla después.' : 'Probá con menos filtros o con otra palabra. Cada pocas horas entran bretes nuevos.' }),
      h('button', { class: 'btn btn-primary', type: 'button', onclick: resetAll }, state.g ? 'Ver todos los bretes' : 'Limpiar filtros')));
  } else {
    list.slice(0, shown).forEach((j, i) => jobsEl.append(withDelay(card(j, i), i)));
  }
  const more = $('#btn-more');
  more.hidden = list.length <= shown;
  more.textContent = `Mostrar más bretes (${nf.format(list.length - shown)} restantes)`;

  for (const b of document.querySelectorAll('#scope button')) b.setAttribute('aria-selected', String(b.dataset.scope === state.s));
  $('#sort').value = state.so;
  $('#prov-select').value = state.p;
  $('#btn-saved').classList.toggle('on', state.g);
  updateFacets();
  updateRail();
  writeUrl();
}
function resetAll() {
  Object.assign(state, { ...DEFAULTS, t: [] });
  $('#q').value = '';
  shown = PAGE;
  render();
}
function updateSavedCount() {
  const n = Object.keys(saved).length;
  const el = $('#saved-count');
  el.hidden = !n; el.textContent = n;
}

/* ---------- Estadísticas y pie ---------- */
function countUp(el, to) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || to < 20) { el.textContent = nf.format(to); return; }
  const t0 = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / 900);
    el.textContent = nf.format(Math.round(to * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
function paintMeta() {
  const live = ALL.filter((j) => j._t >= Date.now() - 864e5).length;
  countUp($('#st-total'), ALL.length);
  countUp($('#st-new'), live);
  countUp($('#st-co'), META.companies || new Set(ALL.map((j) => j.company)).size);
  const upd = Date.parse(META.updatedAt);
  const stale = Date.now() - upd > 24 * 3600e3;
  $('#updated-text').textContent = stale ? `Última revisión ${ago(upd)}` : `Actualizado ${ago(upd)} · se refresca solo`;

  const list = $('#src-list');
  list.replaceChildren();
  for (const s of (META.sources || []).filter((x) => !x.skipped)) {
    list.append(h('li', {}, h('span', { class: `dot${s.ok ? '' : ' bad'}`, 'aria-hidden': 'true' }), s.name, h('small', { text: `${nf.format(s.count)}` })));
  }
}

function buildFooter() {
  const ul = $('#foot-provs');
  for (const [k, name] of PROVS) ul.append(h('li', {}, h('a', { href: `${ROOT}empleos/${k}/`, text: `Empleos en ${name}` })));
  if (REPO) {
    $('#li-suggest').hidden = false;
    $('#a-suggest').href = `${REPO.replace(/\/$/, '')}/issues/new?title=${encodeURIComponent('Sugerencia de fuente: ')}&labels=fuente`;
  }
}
function buildQuick() {
  const box = $('#quick');
  for (const [label, patch] of QUICK) {
    box.append(h('button', { type: 'button', text: label, onclick: () => {
      Object.assign(state, { ...DEFAULTS, t: [] }, patch, patch.t ? { t: [patch.t] } : {});
      $('#q').value = state.q; shown = PAGE; render();
      $('#empleos').scrollIntoView({ behavior: 'smooth' });
    } }));
  }
}

/* ---------- Eventos ---------- */
function bind() {
  const q = $('#q');
  q.addEventListener('input', debounce(() => { state.q = q.value.trim().slice(0, 80); shown = PAGE; render(); }, 160));
  $('#search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    state.q = q.value.trim().slice(0, 80); shown = PAGE; render();
    $('#empleos').scrollIntoView({ behavior: 'smooth' });
  });
  const sel = $('#prov-select');
  for (const [k, name] of PROVS) sel.append(h('option', { value: k, text: name }));
  sel.addEventListener('change', () => { state.p = sel.value; shown = PAGE; render(); });

  for (const b of document.querySelectorAll('#scope button')) b.addEventListener('click', () => { state.s = b.dataset.scope; shown = PAGE; render(); });
  $('#sort').addEventListener('change', (e) => { state.so = e.target.value; render(); });
  $('#btn-more').addEventListener('click', () => { shown += PAGE; render(); });
  $('#btn-reset').addEventListener('click', resetAll);
  $('#btn-saved').addEventListener('click', () => { state.g = !state.g; shown = PAGE; render(); $('#empleos').scrollIntoView({ behavior: 'smooth' }); });
  $('#btn-theme').addEventListener('click', () => {
    const next = doc.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    doc.setAttribute('data-theme', next);
    try { localStorage.setItem('tb.theme', next); } catch { /* ok */ }
  });

  const panel = $('#filters');
  const scrim = $('#scrim');
  const setPanel = (open) => { panel.classList.toggle('open', open); scrim.hidden = !open; document.body.style.overflow = open ? 'hidden' : ''; };
  $('#btn-filters').addEventListener('click', () => setPanel(true));
  for (const id of ['#btn-close-filters', '#btn-apply']) $(id).addEventListener('click', () => setPanel(false));
  scrim.addEventListener('click', () => setPanel(false));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setPanel(false);
    if (e.key === '/' && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); }
  });

  // Carga automática al llegar al final de la lista
  const more = $('#btn-more');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((es) => { if (es[0].isIntersecting && !more.hidden) more.click(); }, { rootMargin: '500px' }).observe(more);
  }
}

/* ---------- Arranque ---------- */
async function init() {
  readUrl();
  buildFacets(); buildRail(); buildQuick(); buildFooter(); bind(); updateSavedCount();
  $('#q').value = state.q;
  try {
    const res = await fetch(`${ROOT}data/jobs.json`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    META = data.meta;
    ALL = data.jobs.map(prepare);
    paintMeta();
    render();
  } catch {
    $('#jobs').setAttribute('aria-busy', 'false');
    $('#jobs').replaceChildren(h('div', { class: 'empty' },
      h('div', { class: 'big-emoji', text: '📡' }),
      h('h3', { text: 'No pudimos cargar los bretes' }),
      h('p', { text: 'Revisá tu conexión e intentá de nuevo.' }),
      h('button', { class: 'btn btn-primary', type: 'button', onclick: () => location.reload() }, 'Reintentar')));
  }
  if ('serviceWorker' in navigator) navigator.serviceWorker.register(`${ROOT}sw.js`).catch(() => {});
}
init();
