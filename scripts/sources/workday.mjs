import { daysAgo, getJson, htmlToText, pool, postJson } from '../lib/util.mjs';
import { isCostaRica } from '../lib/geo.mjs';
import { makeJob } from '../lib/job.mjs';

const MAX_RESULTS = 400;
const MAX_DETAILS_PER_SOURCE = 120;

function parsePosted(text, now) {
  const t = String(text || '').toLowerCase();
  if (/today|hoy/.test(t)) return now.toISOString();
  if (/yesterday|ayer/.test(t)) return daysAgo(1, now);
  const m = t.match(/(\d+)\+?\s*(day|d[ií]a)/);
  if (m) return daysAgo(Number(m[1]), now);
  return null;
}

/**
 * Workday publica los puestos de la mayoría de multinacionales con sede en Costa Rica.
 * Usamos el mismo endpoint JSON que usa su propia página de empleos.
 */
export async function fetchWorkday(cfg, ctx) {
  const root = `https://${cfg.tenant}.${cfg.dc}.myworkdayjobs.com`;
  const api = `${root}/wday/cxs/${cfg.tenant}/${cfg.site}`;
  const postings = [];
  let total = Infinity;
  for (let offset = 0; offset < Math.min(total, MAX_RESULTS); offset += 20) {
    const page = await postJson(`${api}/jobs`, { appliedFacets: {}, limit: 20, offset, searchText: 'Costa Rica' });
    if (offset === 0) total = page.total ?? 0;
    if (!page.jobPostings?.length) break;
    postings.push(...page.jobPostings);
  }

  const candidates = [];
  for (const p of postings) {
    if (!p.externalPath || !p.title) continue;
    const loc = p.locationsText || '';
    const multi = /^(\d+\s+(locations?|ubicaciones)|ubicaciones:?\s*\d+)$/i.test(loc.trim());
    if (!multi && !isCostaRica(loc)) continue;
    candidates.push({ p, multi });
  }

  let detailBudget = MAX_DETAILS_PER_SOURCE;
  const jobs = await pool(candidates, 6, async ({ p, multi }) => {
    const url = `${root}/${cfg.site}${p.externalPath}`;
    const known = ctx.prevByUrl.get(url);
    let info = null;
    const needDetail = multi || !known || known.excerpt == null;
    if (needDetail && detailBudget > 0) {
      detailBudget--;
      try {
        info = (await getJson(`${api}${p.externalPath}`, { retries: 1 }))?.jobPostingInfo ?? null;
      } catch {
        info = null;
      }
    }

    let location = p.locationsText;
    if (multi) {
      if (!info) return null;
      const places = [info.location, ...(info.additionalLocations || []), info.country?.descriptor].filter(Boolean);
      const hit = places.find((x) => isCostaRica(x));
      if (!hit) return null;
      location = hit;
    }

    const description = info?.jobDescription ? htmlToText(info.jobDescription) : null;
    return makeJob(
      {
        sourceId: cfg.id,
        source: cfg.name,
        kind: 'empresa',
        title: p.title,
        company: cfg.name,
        location,
        url,
        postedAt: info?.startDate || parsePosted(p.postedOn, ctx.now),
        excerpt: description ?? known?.excerpt ?? null,
        modalityHint: info?.remoteType,
        tagHint: info?.timeType,
      },
      ctx,
    );
  });

  return jobs.filter((j) => j && !j.error);
}
