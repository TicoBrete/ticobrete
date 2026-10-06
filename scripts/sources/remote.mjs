import { decodeEntities, getJson, getText, htmlToText } from '../lib/util.mjs';
import { makeJob } from '../lib/job.mjs';

// Solo dejamos puestos remotos que una persona en Costa Rica pueda tomar de verdad.
const OPEN_TO_CR = /(worldwide|anywhere|global|latam|latin america|latinoam|costa rica|central america|americas|north,? ?central|south america|remote - ?(latam|americas))/i;
const NOT_FOR_CR = /(usa only|us only|u\.s\. only|united states only|us residents|uk only|eu only|europe only|canada only|must reside in the (us|united states))/i;

const eligible = (loc) => OPEN_TO_CR.test(loc || '') && !NOT_FOR_CR.test(loc || '');

const base = (cfg) => ({ kind: 'remoto', remote: true, modality: 'remoto', location: 'Remoto desde Costa Rica', ...cfg });

const SOURCES = {
  async jobicy(ctx) {
    const d = await getJson('https://jobicy.com/api/v2/remote-jobs?count=50&geo=costa-rica');
    return (d.jobs || [])
      .filter((j) => eligible(j.jobGeo) || /latam|anywhere/i.test(j.jobGeo || ''))
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
      .filter((j) => j && j.position && eligible(j.location))
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
