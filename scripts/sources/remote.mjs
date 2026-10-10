import { decodeEntities, getJson, getText, htmlToText } from '../lib/util.mjs';
import { makeJob } from '../lib/job.mjs';

// Solo dejamos puestos remotos que una persona en Costa Rica pueda tomar de verdad.
const OPEN_TO_CR = /(worldwide|anywhere|global|latam|latin america|latinoam|costa rica|central america|americas|north,? ?central|south america|remote - ?(latam|americas))/i;
const NOT_FOR_CR = /(usa only|us only|u\.s\. only|united states only|us residents|uk only|eu only|europe only|canada only|must reside in the (us|united states))/i;

const eligible = (loc) => OPEN_TO_CR.test(loc || '') && !NOT_FOR_CR.test(loc || '');

// Muchas bolsas dicen "Anywhere" pero el texto del anuncio limita la contratacion a otros paises.
const PLACE = 'us|u\\.s\\.|usa|united states|canada|uk|u\\.k\\.|united kingdom|europe|european union|eu|emea|india|germany|ireland|portugal|spain|netherlands|france|poland|australia|new zealand|north america|philippines|south africa|israel';
const GEO_LOCK = [
  new RegExp(`\\b(must|need to|required to|have to)\\s+(be\\s+)?(located|based|reside|residing|live|living|resident)\\s+(in|within)\\s+(the\\s+)?(${PLACE})\\b`, 'i'),
  new RegExp(`\\b(candidates|applicants|employees|people|talent)\\s+(who are\\s+)?(based|located|residing|living)\\s+(in|within)\\s+(the\\s+)?(${PLACE})\\b`, 'i'),
  new RegExp(`\\b(hire|hiring)\\s+(candidates\\s+|people\\s+)?(based|located|residing|living)\\s+(in|within)\\s+(the\\s+)?(${PLACE})\\b`, 'i'),
  new RegExp(`\\b(${PLACE})[- ](based|only|residents)\\b`, 'i'),
  new RegExp(`\\bauthori[sz]ed to work (in|within) (the\\s+)?(${PLACE})\\b`, 'i'),
  /\b(canada|united states|usa|us)\s*[-\u2013]\s*remote\s*\(/i,
  /\bremote\s*[-\u2013(]\s*(us|usa|canada|uk|eu|europe)\b/i,
];
const HQ_OPEN = /(worldwide|anywhere|global|latam|latin america|latinoam|costa rica|central america|americas|south america)/i;
const HQ_PLACE = new RegExp(`\\b(${PLACE})\\b`, 'i');
const TITLE_US_CITY = /\([^)]*,\s*[A-Z]{2}\)\s*$/;

export function geoLocked(title = '', text = '') {
  const t = `${title}\n${text}`;
  if (HQ_OPEN.test(text.slice(0, 600)) && !/\bonly\b/i.test(text.slice(0, 200))) return false;
  if (GEO_LOCK.some((re) => re.test(t))) return true;
  if (TITLE_US_CITY.test(title)) return true;
  const hq = text.match(/headquarters:\s*([^\n]{0,160})/i)?.[1] || '';
  return !!hq && !HQ_OPEN.test(hq) && HQ_PLACE.test(hq);
}

const base = (cfg) => ({ kind: 'remoto', remote: true, modality: 'remoto', location: 'Remoto desde Costa Rica', ...cfg });

const SOURCES = {
  async jobicy(ctx) {
    const d = await getJson('https://jobicy.com/api/v2/remote-jobs?count=50&geo=costa-rica');
    return (d.jobs || [])
      .filter((j) => eligible(j.jobGeo) || /latam|anywhere/i.test(j.jobGeo || ''))
      .filter((j) => !geoLocked(j.jobTitle, htmlToText(j.jobDescription || j.jobExcerpt || '')))
      .map((j) =>
        makeJob(
          base({
            sourceId: 'rm-jobicy',
            source: 'Jobicy',
            title: j.jobTitle,
            company: j.companyName,
            url: j.url,
            postedAt: j.pubDate,
            excerpt: htmlToText(j.jobExcerpt || ''),
            tagHint: (j.jobType || []).join(' '),
            salary: j.annualSalaryMin ? `${j.salaryCurrency || '$'} ${j.annualSalaryMin}–${j.annualSalaryMax}` : null,
          }),
          ctx,
        ),
      );
  },

  async remotive(ctx) {
    const d = await getJson('https://remotive.com/api/remote-jobs');
    return (d.jobs || [])
      .filter((j) => eligible(j.candidate_required_location))
      .filter((j) => !geoLocked(j.title, htmlToText(j.description || '')))
      .map((j) =>
        makeJob(
          base({
            sourceId: 'rm-remotive',
            source: 'Remotive',
            title: j.title,
            company: j.company_name,
            url: j.url,
            postedAt: j.publication_date,
            excerpt: htmlToText(j.description || ''),
            tagHint: j.job_type,
            salary: j.salary || null,
          }),
          ctx,
        ),
      );
  },

  async himalayas(ctx) {
    const out = [];
    let cursor = null;
    for (let page = 0; page < 12; page++) {
      const d = await getJson(`https://himalayas.app/jobs/api?limit=20${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`);
      for (const j of d.jobs || []) {
        const r = j.locationRestrictions || [];
        const ok = r.length === 0 || r.some((x) => /^costa rica$/i.test(x));
        if (!ok) continue;
        if (geoLocked(j.title, htmlToText(j.description || j.excerpt || ''))) continue;
        out.push(
          makeJob(
            base({
              sourceId: 'rm-himalayas',
              source: 'Himalayas',
              title: j.title,
              company: j.companyName,
              url: j.applicationLink || j.guid,
              postedAt: j.pubDate,
              excerpt: j.excerpt || htmlToText(j.description || ''),
              tagHint: j.employmentType,
              salary: j.minSalary ? `${j.currency || '$'} ${j.minSalary}–${j.maxSalary} / ${j.salaryPeriod || 'año'}` : null,
            }),
            ctx,
          ),
        );
      }
      cursor = d.nextCursor;
      if (!cursor) break;
    }
    return out;
  },

  async remoteok(ctx) {
    const d = await getJson('https://remoteok.com/api');
    return d
      .filter((j) => j && j.position && eligible(j.location) && !geoLocked(j.position, htmlToText(j.description || '')))
      .map((j) =>
        makeJob(
          base({
            sourceId: 'rm-remoteok',
            source: 'Remote OK',
            title: j.position,
            company: j.company,
            url: j.url || j.apply_url,
            postedAt: j.date,
            excerpt: htmlToText(j.description || ''),
            salary: j.salary_min ? `$${j.salary_min}–$${j.salary_max}` : null,
          }),
          ctx,
        ),
      );
  },

  async weworkremotely(ctx) {
    const xml = await getText('https://weworkremotely.com/remote-jobs.rss');
    const out = [];
    for (const item of xml.split('<item>').slice(1)) {
      const tag = (n) => decodeEntities(item.match(new RegExp(`<${n}>([\\s\\S]*?)</${n}>`))?.[1] ?? '').replace(/<!\[CDATA\[|\]\]>/g, '').trim();
      const region = `${tag('region')} ${tag('country')}`;
      if (!eligible(region)) continue;
      if (geoLocked(tag('title'), htmlToText(tag('description')))) continue;
      const full = tag('title');
      const [company, ...rest] = full.split(': ');
      out.push(
        makeJob(
          base({
            sourceId: 'rm-wwr',
            source: 'We Work Remotely',
            title: rest.join(': ') || full,
            company: rest.length ? company : null,
            url: tag('link') || item.match(/<guid[^>]*>([^<]+)</)?.[1],
            postedAt: tag('pubDate'),
            excerpt: htmlToText(tag('description')),
            tagHint: tag('type'),
          }),
          ctx,
        ),
      );
    }
    return out;
  },
};

export const REMOTE_SOURCES = Object.keys(SOURCES);

export async function fetchRemote(name, ctx) {
  const jobs = await SOURCES[name](ctx);
  return jobs.filter(Boolean).slice(0, 150);
}
