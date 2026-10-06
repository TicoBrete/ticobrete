import { createHash } from 'node:crypto';

export const UA = 'Mozilla/5.0 (compatible; TicoBreteBot/1.0; bolsa de empleo gratuita de Costa Rica)';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function request(url, { method = 'GET', headers = {}, body, timeout = 25000, retries = 2 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method,
        body,
        headers: { 'User-Agent': UA, 'Accept-Language': 'es-CR,es;q=0.9,en;q=0.5', ...headers },
        signal: AbortSignal.timeout(timeout),
        redirect: 'follow',
      });
      if (res.ok) return res;
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      throw Object.assign(new Error(`HTTP ${res.status} en ${url}`), { fatal: true });
    } catch (err) {
      lastErr = err;
      if (err.fatal || attempt === retries) break;
      await sleep(800 * 2 ** attempt);
    }
  }
  throw lastErr;
}

export const getText = async (url, opts) => (await request(url, opts)).text();
export const getJson = async (url, opts) =>
  (await request(url, { ...opts, headers: { Accept: 'application/json', ...opts?.headers } })).json();
export const postJson = async (url, data, opts = {}) =>
  (
    await request(url, {
      ...opts,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...opts.headers },
      body: JSON.stringify(data),
    })
  ).json();

export async function pool(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      try {
        results[i] = await fn(items[i], i);
      } catch (err) {
        results[i] = { error: err };
      }
    }
  });
  await Promise.all(workers);
  return results;
}

const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', bull: '•' };

export function decodeEntities(s = '') {
  return String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') {
      const code = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : '';
    }
    return NAMED[e.toLowerCase()] ?? m;
  });
}

// Caracteres invisibles o de control que se usan para engañar (bidi, ancho cero, etc.)
const INVISIBLE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2060-\u2069\uFEFF]/g;

export function cleanText(s = '', max = 0) {
  let t = String(s ?? '').replace(INVISIBLE, '').replace(/[ \t\u00A0]+/g, ' ').replace(/\s*\n\s*/g, ' ').trim();
  if (max && t.length > max) t = truncate(t, max);
  return t;
}

export function htmlToText(html = '') {
  let t = String(html ?? '');
  t = t.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ');
  t = t.replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|li|h[1-6]|tr)>/gi, '\n');
  t = t.replace(/<[^>]*>/g, ' ');
  t = decodeEntities(decodeEntities(t));
  return t.replace(INVISIBLE, '').replace(/[ \t\u00A0]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

export function truncate(s, max) {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const i = cut.lastIndexOf(' ');
  return (i > max * 0.6 ? cut.slice(0, i) : cut).replace(/[\s,;:.\-–]+$/, '') + '…';
}

export const hash = (s, n = 12) => createHash('sha1').update(String(s)).digest('hex').slice(0, n);

export const fold = (s = '') =>
  String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export const slug = (s = '') => fold(s).replace(/[^a-z0-9]+/g, ' ').trim();

const TRACKING = /^(utm_|fbclid|gclid|mc_|ref$|refId$|trackingId$|trk|source$|src$|lipi$|midToken$|midSig$|eBP$|trackingid$)/i;

export function safeUrl(u) {
  try {
    const url = new URL(String(u).trim());
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    if (url.username || url.password) return null;
    for (const k of [...url.searchParams.keys()]) if (TRACKING.test(k)) url.searchParams.delete(k);
    url.hash = '';
    const out = url.toString();
    return out.length <= 700 ? out : null;
  } catch {
    return null;
  }
}

export function daysAgo(n, now = new Date()) {
  return new Date(now.getTime() - n * 86400000).toISOString();
}

export function toIso(v) {
  if (v == null || v === '') return null;
  const d = typeof v === 'number' ? new Date(v < 1e12 ? v * 1000 : v) : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

const LOWER_WORDS = new Set(['de', 'del', 'la', 'las', 'el', 'los', 'y', 'e', 'o', 'en', 'para', 'a', 'con', 'por', 'al', 'un', 'una']);

/** Convierte TEXTO EN MAYÚSCULAS a "Texto en Mayúsculas" sin dañar siglas cortas (TI, B2, SAP). */
export function smartCase(s = '') {
  const str = String(s).trim();
  const letters = str.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g, '');
  if (letters.length < 4 || letters !== letters.toUpperCase()) return str;
  const words = str.split(/(\s+)/);
  return words
    .map((w, i) => {
      if (/^\s+$/.test(w) || !w) return w;
      const bare = w.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]/g, '');
      const low = w.toLowerCase();
      if (i > 0 && LOWER_WORDS.has(bare.toLowerCase())) return low;
      if (/\d/.test(bare) || (bare.length <= 2 && i > 0)) return w;
      if (words.filter((x) => x.trim()).length === 1 && bare.length <= 5) return w;
      return low.replace(/^(\W*)(\p{L})/u, (_, p, c) => p + c.toUpperCase());
    })
    .join('');
}
