import { htmlToText, postJson, pool } from '../lib/util.mjs';
import { isCostaRica } from '../lib/geo.mjs';
import { makeJob } from '../lib/job.mjs';

/**
 * Jooble (opcional): agregador con API gratuita que sí incluye bolsas locales de Costa Rica.
 * Solo se activa si existe el secreto JOOBLE_API_KEY. Cada puesto enlaza a la oferta original.
 */
export async function fetchJooble(cfg, ctx) {
  const key = process.env.JOOBLE_API_KEY;
  if (!key) return null;

  const queries = [];
  for (const keywords of cfg.keywords) for (let page = 1; page <= (cfg.pages || 1); page++) queries.push({ keywords, page });

  const results = await pool(queries, 3, async ({ keywords, page }) => {
    const d = await postJson(`https://jooble.org/api/${key}`, { keywords, location: 'Costa Rica', page: String(page) }, { retries: 1 });
    return d.jobs || [];
  });

  const jobs = [];
  for (const r of results) {
    if (!Array.isArray(r)) continue;
    for (const j of r) {
      if (j.location && !isCostaRica(j.location) && !/costa rica/i.test(j.location)) continue;
      const job = makeJob(
        {
          sourceId: 'agg-jooble',
          source: j.source ? String(j.source).slice(0, 40) : 'Jooble',
          via: 'Jooble',
          kind: 'agregador',
          title: j.title,
          company: j.company,
          location: j.location || 'Costa Rica',
          url: j.link,
          postedAt: j.updated,
          excerpt: htmlToText(j.snippet || ''),
          salary: j.salary || null,
          tagHint: j.type,
        },
        ctx,
      );
      if (job) jobs.push(job);
    }
  }
  return jobs;
}
