import { getJson, htmlToText } from '../lib/util.mjs';
import { isCostaRica } from '../lib/geo.mjs';
import { makeJob } from '../lib/job.mjs';

/** Greenhouse: API pública de tableros de empleo (boards-api.greenhouse.io). */
export async function fetchGreenhouse(cfg, ctx) {
  const data = await getJson(`https://boards-api.greenhouse.io/v1/boards/${cfg.token}/jobs?content=true`, { timeout: 45000 });
  const out = [];
  for (const j of data.jobs || []) {
    const loc = j.location?.name || '';
    if (!isCostaRica(loc)) continue;
    const job = makeJob(
      {
        sourceId: cfg.id,
        source: cfg.name,
        kind: 'empresa',
        title: j.title,
        company: cfg.name,
        location: loc,
        url: j.absolute_url,
        postedAt: j.first_published || j.updated_at,
        excerpt: htmlToText(j.content || ''),
      },
      ctx,
    );
    if (job) out.push(job);
  }
  return out;
}

/** Lever: API pública de postings (api.lever.co). */
export async function fetchLever(cfg, ctx) {
  const data = await getJson(`https://api.lever.co/v0/postings/${cfg.slug}?mode=json`, { timeout: 45000 });
  const out = [];
  for (const j of Array.isArray(data) ? data : []) {
    const places = [j.categories?.location, ...(j.categories?.allLocations || []), j.country].filter(Boolean);
    const loc = places.find((p) => isCostaRica(p)) || (j.country === 'CR' ? 'Costa Rica' : null);
    if (!loc) continue;
    const job = makeJob(
      {
        sourceId: cfg.id,
        source: cfg.name,
        kind: 'empresa',
        title: j.text,
        company: cfg.name,
        location: loc,
        url: j.hostedUrl,
        postedAt: j.createdAt,
        excerpt: j.descriptionPlain || htmlToText(j.description || ''),
        modalityHint: j.workplaceType,
        tagHint: j.categories?.commitment,
      },
      ctx,
    );
    if (job) out.push(job);
  }
  return out;
}
