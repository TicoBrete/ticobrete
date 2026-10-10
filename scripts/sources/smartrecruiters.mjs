import { getJson, htmlToText, pool } from '../lib/util.mjs';
import { isCostaRica } from '../lib/geo.mjs';
import { makeJob } from '../lib/job.mjs';

const MAX_DETAILS_PER_SOURCE = 40;

/** SmartRecruiters: API pública de postings (api.smartrecruiters.com), pensada para publicar empleos en otros sitios. */
export async function fetchSmartRecruiters(cfg, ctx) {
  const base = `https://api.smartrecruiters.com/v1/companies/${cfg.company}/postings`;
  const postings = [];
  for (let offset = 0; offset < 300; offset += 100) {
    const page = await getJson(`${base}?country=cr&limit=100&offset=${offset}`, { timeout: 30000 });
    postings.push(...(page.content || []));
    if (!page.content?.length || postings.length >= (page.totalFound ?? 0)) break;
  }

  let budget = MAX_DETAILS_PER_SOURCE;
  const jobs = await pool(postings, 4, async (p) => {
    const loc = [p.location?.city, p.location?.region, p.location?.country?.toUpperCase() === 'CR' ? 'Costa Rica' : p.location?.country].filter(Boolean).join(', ');
    if (!isCostaRica(loc) && String(p.location?.country).toLowerCase() !== 'cr') return null;
    const url = `https://jobs.smartrecruiters.com/${cfg.company}/${p.id}`;
    const known = ctx.prevByUrl.get(url);
    let description = known?.excerpt ?? null;
    if (description == null && budget > 0) {
      budget--;
      try {
        const d = await getJson(`${base}/${p.id}`, { retries: 1, timeout: 20000 });
        description = htmlToText(d?.jobAd?.sections?.jobDescription?.text || '') || null;
      } catch {
        description = null;
      }
    }
    return makeJob(
      {
        sourceId: cfg.id,
        source: cfg.name,
        kind: 'empresa',
        title: p.name,
        company: cfg.name,
        location: loc || 'Costa Rica',
        url,
        postedAt: p.releasedDate,
        excerpt: description,
        modalityHint: p.location?.remote ? 'remote' : p.location?.hybrid ? 'hybrid' : undefined,
        tagHint: p.typeOfEmployment?.label,
      },
      ctx,
    );
  });
  return jobs.filter(Boolean);
}
