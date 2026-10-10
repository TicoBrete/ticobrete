import { decodeEntities, getText, htmlToText, daysAgo } from '../lib/util.mjs';
import { isCostaRica } from '../lib/geo.mjs';
import { makeJob } from '../lib/job.mjs';

const PAGE = 25;
const MAX_PAGES = 8;
const MONTHS = { ene: 0, jan: 0, feb: 1, mar: 2, abr: 3, apr: 3, may: 4, jun: 5, jul: 6, ago: 7, aug: 7, sep: 8, set: 8, oct: 9, nov: 10, dic: 11, dec: 11 };

/** "21 sept 2026" o "Oct 7, 2026" -> ISO. */
export function parseSfDate(text = '') {
  const t = text.toLowerCase().replace(/\./g, '').trim();
  let m = t.match(/^(\d{1,2})\s+([a-z]{3})[a-z]*\s+(\d{4})/);
  let d, mon, y;
  if (m) [, d, mon, y] = m;
  else if ((m = t.match(/^([a-z]{3})[a-z]*\s+(\d{1,2}),?\s+(\d{4})/))) [, mon, d, y] = m;
  else return null;
  const month = MONTHS[mon];
  return month == null ? null : new Date(Date.UTC(Number(y), month, Number(d), 12)).toISOString();
}

/** Filas de resultados de un sitio de empleo SAP SuccessFactors (el mismo que muestra la página pública). */
export function parseSfRows(html) {
  const rows = [];
  for (const row of html.match(/<tr[^>]*class="[^"]*data-row[^"]*"[\s\S]*?<\/tr>/g) || []) {
    const a = row.match(/<a [^>]*href="([^"]+)"[^>]*class="jobTitle-link"[^>]*>([\s\S]*?)<\/a>/) || row.match(/<a [^>]*class="jobTitle-link"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
    if (!a) continue;
    const field = (cls) => htmlToText(row.match(new RegExp(`<span class="${cls}"[^>]*>([\\s\\S]*?)</span>(?:\\s*</span>)?`))?.[1] ?? '').replace(/\+\d+ more…?|\+\d+ more\.\.\./gi, '').replace(/\s+/g, ' ').trim();
    rows.push({
      href: decodeEntities(a[1]),
      title: htmlToText(a[2]).replace(/\s+/g, ' ').trim(),
      location: field('jobLocation'),
      department: field('jobDepartment') || field('jobFacility'),
      date: field('jobDate'),
    });
  }
  return rows;
}

export async function fetchSuccessFactors(cfg, ctx) {
  const root = new URL(cfg.url).origin;
  const seen = new Set();
  const out = [];
  for (let page = 0; page < MAX_PAGES; page++) {
    const offset = page * PAGE;
    const url = cfg.url.includes('/search/') ? `${cfg.url}${cfg.url.includes('?') ? '&' : '?'}startrow=${offset}` : offset ? `${cfg.url.replace(/\/$/, '')}/${offset}/` : cfg.url;
    const rows = parseSfRows(await getText(url, { timeout: 40000 }));
    const fresh = rows.filter((r) => !seen.has(r.href));
    if (!fresh.length) break;
    for (const r of fresh) {
      seen.add(r.href);
      if (!cfg.trusted && !isCostaRica(r.location) && !/\bCR\b/.test(r.location)) continue;
      const job = makeJob(
        {
          sourceId: cfg.id,
          source: cfg.name,
          kind: cfg.kind || 'empresa',
          title: r.title,
          company: cfg.name,
          location: r.location.replace(/,?\s*\bCR\b$/, '').trim() || 'Costa Rica',
          url: new URL(r.href, root).toString(),
          postedAt: parseSfDate(r.date) ?? ctx.now.toISOString(),
          excerpt: r.department ? `Área: ${r.department}.` : null,
        },
        ctx,
      );
      if (job) out.push(job);
    }
    if (rows.length < PAGE) break;
  }
  return out;
}
