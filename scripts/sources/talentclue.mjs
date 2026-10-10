import { decodeEntities, getText, htmlToText } from '../lib/util.mjs';
import { makeJob } from '../lib/job.mjs';

const clean = (s) => htmlToText(s).replace(/\s+/g, ' ').trim();

/** "09/10/2026" -> ISO */
function parseDmy(s = '') {
  const m = s.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  return m ? new Date(Date.UTC(Number(m[3]), Number(m[2]) - 1, Number(m[1]), 12)).toISOString() : null;
}

/** Filas de la lista de ofertas de Talent Clue (el widget público que las empresas incrustan en su sitio de empleo). */
export function parseTalentClue(html) {
  const out = [];
  for (const row of html.match(/<tr[^>]*>[\s\S]*?<\/tr>/g) || []) {
    const a = row.match(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
    if (!a) continue;
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => clean(c[1]));
    // columnas: logo, puesto, negocio, localidad, provincia, fecha
    out.push({
      href: decodeEntities(a[1]),
      title: clean(a[2]),
      business: cells[2] || '',
      canton: cells[3] || '',
      province: cells[4] || '',
      date: cells[5] || '',
    });
  }
  return out;
}

export async function fetchTalentClue(cfg, ctx) {
  const html = await getText(`https://careers.talentclue.com/es/company/${cfg.company}/jsoffers`, { timeout: 40000 });
  return parseTalentClue(html)
    .map((r) =>
      makeJob(
        {
          sourceId: cfg.id,
          source: cfg.name,
          kind: cfg.kind || 'empresa',
          title: r.title,
          company: r.business || cfg.name,
          location: [r.canton, r.province, 'Costa Rica'].filter(Boolean).join(', '),
          provinceHint: r.province,
          url: r.href,
          postedAt: parseDmy(r.date),
        },
        ctx,
      ),
    )
    .filter(Boolean);
}