import { cleanText, hash, safeUrl, slug, toIso, truncate } from './util.mjs';
import { classify, detectTags } from './classify.mjs';
import { detectModality, detectProvince } from './geo.mjs';
import { looksLikeScam, stripContacts } from './safety.mjs';

const KIND_RANK = { empresa: 0, estado: 1, publicado: 1, remoto: 1, agregador: 2, comunidad: 3 };
export const kindRank = (k) => KIND_RANK[k] ?? 9;

/**
 * Crea un empleo limpio y validado, o devuelve null si no sirve.
 * Todo texto externo pasa por cleanText: nada de HTML llega al sitio.
 */
export function makeJob(raw, ctx) {
  const url = safeUrl(raw.url);
  const title = cleanText(raw.title, 140);
  if (!url || title.length < 3) return null;

  const company = cleanText(raw.company, 80) || null;
  const location = cleanText(raw.location, 90) || null;
  const excerpt = raw.excerpt == null ? null : truncate(stripContacts(cleanText(raw.excerpt)), 260);

  if (looksLikeScam(title, company, excerpt)) {
    ctx?.stats && (ctx.stats.blocked = (ctx.stats.blocked || 0) + 1);
    return null;
  }

  const remoteForced = raw.modality === 'remoto' || raw.remote === true;
  const modality = raw.modality ?? detectModality(title, location, raw.modalityHint);
  const province = remoteForced && !raw.province ? null : raw.province ?? detectProvince(raw.provinceHint, location);

  const now = ctx?.now ?? new Date();
  let postedAt = toIso(raw.postedAt);
  if (postedAt && new Date(postedAt) > now) postedAt = now.toISOString();

  const tags = [...new Set([...(raw.tags || []), ...detectTags(title, excerpt, raw.tagHint)])];

  return {
    id: hash(`${raw.sourceId}|${url}${raw.kind === 'publicado' ? `|${title}` : ''}`),
    s: raw.sourceId,
    title,
    company,
    location,
    province,
    modality: remoteForced ? 'remoto' : modality,
    category: raw.category ?? classify(title, raw.freeform ? excerpt : ''),
    tags,
    salary: raw.salary ? cleanText(raw.salary, 60) : null,
    excerpt,
    url,
    source: cleanText(raw.source, 40),
    via: raw.via ? cleanText(raw.via, 50) : null,
    kind: raw.kind,
    postedAt,
    until: toIso(raw.validUntil)?.slice(0, 10) ?? null,
    firstSeen: now.toISOString(),
  };
}

const COMPANY_NOISE = /\b(inc|llc|ltd|limited|corp|corporation|company|co|sa|s a|de cv|srl|sociedad anonima|costa rica|cr|the|group|grupo|international|latam|latin america|services|servicios)\b/g;

export function dupKey(job) {
  const comp = slug(job.company || '').replace(COMPANY_NOISE, ' ').replace(/\s+/g, ' ').trim();
  const title = slug(job.title).replace(/\b(m|f|h|a|o|remote|remoto|hybrid|hibrido|costa rica|cr)\b/g, ' ').replace(/\s+/g, ' ').trim();
  return `${title}|${comp}`;
}

/** Quita duplicados entre fuentes: gana la fuente más directa (empresa > remoto > agregador > comunidad). */
export function dedupe(jobs) {
  const byUrl = new Map();
  for (const j of jobs) {
    // Un mismo WhatsApp o sitio puede tener varios puestos publicados directamente.
    const key = j.kind === 'publicado' ? `${j.url}#${j.title}` : j.url;
    const prev = byUrl.get(key);
    if (!prev || kindRank(j.kind) < kindRank(prev.kind)) byUrl.set(key, j);
  }
  const unique = [...byUrl.values()];

  const direct = new Set();
  for (const j of unique) if (j.kind === 'empresa') direct.add(dupKey(j));

  const seen = new Map();
  const out = [];
  for (const j of unique.sort((a, b) => kindRank(a.kind) - kindRank(b.kind))) {
    const k = dupKey(j);
    if (j.kind !== 'empresa') {
      if (direct.has(k)) continue;
      const other = seen.get(k + '|' + (j.province || ''));
      if (other) continue;
      seen.set(k + '|' + (j.province || ''), j);
    }
    out.push(j);
  }
  return out;
}
