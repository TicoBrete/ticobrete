import { getJson, htmlToText } from '../lib/util.mjs';
import { isCostaRica } from '../lib/geo.mjs';
import { makeJob } from '../lib/job.mjs';

const PAGE = 50;
const MAX_PAGES = 8;

/** Oracle Recruiting Cloud (HCM): el mismo servicio REST que usa la página pública de empleos de la empresa. */
export async function fetchOracle(cfg, ctx) {
  const root = `https://${cfg.host}`;
  const out = [];
  for (let page = 0; page < MAX_PAGES; page++) {
    const keyword = cfg.keyword ? `,keyword=${encodeURIComponent(cfg.keyword)}` : '';
    const finder = `findReqs;siteNumber=${cfg.site},limit=${PAGE},offset=${page * PAGE},sortBy=POSTING_DATES_DESC${keyword}`;
    const url = `${root}/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList.secondaryLocations&finder=${finder}`;
    const data = await getJson(url, { timeout: 45000, headers: { Accept: 'application/json' } });
    const list = data.items?.[0]?.requisitionList || [];
    for (const j of list) {
      const loc = j.PrimaryLocation || '';
      if (j.PrimaryLocationCountry !== 'CR' && !isCostaRica(loc)) continue;
      const job = makeJob(
        {
          sourceId: cfg.id,
          source: cfg.name,
          kind: cfg.kind || 'empresa',
          title: j.Title,
          company: cfg.name,
          location: loc.replace(/^\d+\//, ''),
          url: `${root}/hcmUI/CandidateExperience/${cfg.lang || 'es'}/sites/${cfg.site}/job/${j.Id}`,
          postedAt: j.PostedDate,
          excerpt: htmlToText(j.ShortDescriptionStr || ''),
          modalityHint: j.WorkplaceType,
        },
        ctx,
      );
      if (job) out.push(job);
    }
    if (list.length < PAGE) break;
  }
  return out;
}
