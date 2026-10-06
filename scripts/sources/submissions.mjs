import { getText, smartCase, fold, toIso } from '../lib/util.mjs';
import { parseCsv, pick, toObjects } from '../lib/csv.mjs';
import { makeJob } from '../lib/job.mjs';

const SHORTENERS = /(^|\.)(bit\.ly|tinyurl\.com|t\.co|cutt\.ly|goo\.gl|is\.gd|rb\.gy|shorturl\.at|ow\.ly|buff\.ly|tiny\.cc|rebrand\.ly|lnkd\.in)$/i;
const YES = /^(si|sí|yes|ok|x|aprobado|true|1|listo)$/i;

/** Google guarda la fecha según el idioma de la hoja; casi siempre es día/mes/año en Costa Rica. */
export function parseSheetDate(s) {
  const m = String(s || '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:[ ,]+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(a\.?\s?m\.?|p\.?\s?m\.?)?)?/i);
  if (!m) return toIso(s);
  let [, a, b, y, hh = '0', mm = '0', ss = '0', ap] = m;
  a = Number(a); b = Number(b);
  let day = a, month = b;
  if (b > 12) { day = b; month = a; }
  let hour = Number(hh);
  if (ap && /p/i.test(ap) && hour < 12) hour += 12;
  if (ap && /a/i.test(ap) && hour === 12) hour = 0;
  const d = new Date(Date.UTC(Number(y), month - 1, day, hour + 6, Number(mm), Number(ss))); // Costa Rica = UTC-6
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

/** Acepta un enlace web o un número de WhatsApp de Costa Rica. Devuelve una URL https segura o null. */
export function applyLink(raw, title) {
  const s = String(raw || '').trim();
  if (!s) return null;
  const digits = s.replace(/\D/g, '');
  const looksPhone = /^[+\d\s().-]{8,18}$/.test(s);
  if (looksPhone) {
    const local = digits.startsWith('506') && digits.length === 11 ? digits.slice(3) : digits;
    if (local.length !== 8 || !/^[2-9]/.test(local)) return null;
    const text = encodeURIComponent(`Hola, vi el brete de "${String(title).slice(0, 60)}" en TicoBrete.`);
    return `https://wa.me/506${local}?text=${text}`;
  }
  const withProto = /^https?:\/\//i.test(s) ? s : /^[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(s) ? `https://${s}` : null;
  if (!withProto) return null;
  try {
    const u = new URL(withProto);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    if (SHORTENERS.test(u.hostname)) return null;
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(u.hostname) || !u.hostname.includes('.')) return null;
    u.protocol = 'https:';
    return u.toString();
  } catch {
    return null;
  }
}

/** Convierte las filas de la hoja en empleos. Es una función pura para poder probarla. */
export function rowsToJobs(rows, cfg, ctx) {
  const jobs = [];
  const perCompany = new Map();
  const max = cfg.maxPerCompany ?? 8;

  for (const row of rows.slice().reverse()) {
    const blocked = pick(row, 'bloquead');
    if (blocked && !/^(no|false|0)$/i.test(blocked)) continue;
    if (cfg.requireApproval && !YES.test(pick(row, 'aprobad'))) continue;

    const title = smartCase(pick(row, 'puesto', 'cargo', 'titulo', 'vacante'));
    const company = smartCase(pick(row, 'empresa', 'negocio', 'organizacion'));
    if (title.length < 4) continue;

    const url = applyLink(pick(row, 'como aplicar', 'aplicar', 'contacto', 'enlace', 'whatsapp', 'link'), title);
    if (!url) continue;

    const key = fold(company || url);
    const n = perCompany.get(key) ?? 0;
    if (n >= max) continue;
    perCompany.set(key, n + 1);

    const place = pick(row, 'lugar', 'ubicacion', 'canton', 'distrito', 'zona');
    const province = pick(row, 'provincia');
    const job = makeJob(
      {
        sourceId: 'sub-form',
        source: 'TicoBrete',
        via: 'publicación directa',
        kind: 'publicado',
        title,
        company: company || null,
        location: [place, province].filter(Boolean).join(', ') || 'Costa Rica',
        provinceHint: province,
        freeform: true,
        modalityHint: pick(row, 'modalidad', 'tipo de trabajo'),
        url,
        postedAt: parseSheetDate(pick(row, 'marca temporal', 'timestamp', 'fecha')),
        excerpt: pick(row, 'descripcion', 'detalle', 'requisitos') || null,
        salary: pick(row, 'salario', 'pago'),
        tagHint: pick(row, 'jornada', 'tipo de contrato'),
      },
      ctx,
    );
    if (job) jobs.push(job);
  }
  return jobs;
}

/**
 * Bretes publicados por empleadores desde un Google Form.
 * Se activa solo si existe SUBMISSIONS_CSV_URL (enlace "publicar en la web" de la hoja, en formato CSV).
 */
export async function fetchSubmissions(cfg, ctx) {
  const url = process.env.SUBMISSIONS_CSV_URL;
  if (!url) return null;
  if (!/^https:\/\/docs\.google\.com\//.test(url)) throw new Error('SUBMISSIONS_CSV_URL debe ser un enlace publicado de Google Sheets');
  const text = await getText(url, { timeout: 30000, retries: 2 });
  if (/<html/i.test(text.slice(0, 300))) throw new Error('La hoja no está publicada como CSV');
  return rowsToJobs(toObjects(parseCsv(text)), cfg, ctx).slice(0, cfg.maxTotal ?? 300);
}
