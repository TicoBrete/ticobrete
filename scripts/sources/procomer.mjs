import { getJson, htmlToText } from '../lib/util.mjs';
import { makeJob } from '../lib/job.mjs';

const API = 'https://talento.procomer.com/api/candidate/jobs';
const MAX_PAGES = 80;

/** Talent Costa Rica (PROCOMER): portal público de empleo donde las empresas publican sus puestos. */
export function mapProcomerJob(j, now = new Date()) {
  if (!j || j.deleted_at || j.draft || !j.is_published || j.external_visibility !== 'public') return null;
  if (j.published_until && new Date(j.published_until) < now) return null;
  const title = j.name || j.translations?.find((t) => t.locale === 'es')?.name;
  if (!title) return null;
  const description = htmlToText(j.description || '');
  const requirements = htmlToText(j.requirements || '');
  return {
    id: j.id,
    title,
    company: j.anonymous_name ? null : j.organization_name || j.organization?.name || null,
    location: [j.canton && j.canton !== 'Central' ? j.canton : j.distrito, j.provincia, 'Costa Rica'].filter(Boolean).join(', '),
    provinceHint: j.provincia,
    modality: { 'on-site': 'presencial', hybrid: 'hibrido', remote: 'remoto' }[j.workplace] ?? undefined,
    tagHint: [j.jornada, j.workday].filter(Boolean).join(' '),
    postedAt: j.publish_date,
    validUntil: j.published_until,
    excerpt: [description, requirements && `Requisitos: ${requirements}`].filter(Boolean).join(' '),
  };
}

export async function fetchProcomer(cfg, ctx) {
  const out = [];
  let last = 1;
  for (let page = 1; page <= Math.min(last, MAX_PAGES); page++) {
    const d = await getJson(`${API}?page=${page}`, { timeout: 40000 });
    const jobs = d?.data?.jobs;
    last = jobs?.last_page ?? 1;
    for (const raw of jobs?.data || []) {
      const j = mapProcomerJob(raw, ctx.now);
      if (!j) continue;
      const job = makeJob(
        {
          sourceId: cfg.id,
          source: cfg.name,
          kind: 'publicado',
          title: j.title,
          company: j.company,
          location: j.location,
          provinceHint: j.provinceHint,
          modality: j.modality,
          modalityHint: undefined,
          tagHint: j.tagHint,
          url: `https://talento.procomer.com/job/${j.id}`,
          postedAt: j.postedAt,
          validUntil: j.validUntil,
          excerpt: j.excerpt,
        },
        ctx,
      );
      if (job) out.push(job);
    }
  }
  return out;
}