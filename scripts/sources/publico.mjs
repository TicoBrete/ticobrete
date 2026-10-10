import { decodeEntities, getText, htmlToText } from '../lib/util.mjs';
import { makeJob } from '../lib/job.mjs';

const strip = (s) => htmlToText(s).replace(/\s+/g, ' ').trim();

/** Poder Judicial: concursos vigentes publicados como carteles en PDF (Gestión Humana). */
export function parsePoderJudicial(html, base) {
  const out = [];
  for (const m of html.matchAll(/<div class="pd-float"><a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const title = strip(m[2]);
    if (title.length < 4) continue;
    out.push({ title, url: new URL(decodeEntities(m[1]), base).toString() });
  }
  return out;
}

export async function fetchPoderJudicial(cfg, ctx) {
  const html = await getText(cfg.url);
  return parsePoderJudicial(html, cfg.url)
    .map((p) =>
      makeJob(
        {
          sourceId: cfg.id,
          source: cfg.name,
          kind: 'estado',
          title: p.title.replace(/^RP-\d+-\d{4}\s*[-–]?\s*/i, '') || p.title,
          company: 'Poder Judicial',
          location: 'Costa Rica',
          url: p.url,
          excerpt: `Concurso ${p.title.match(/^RP-\d+-\d{4}/i)?.[0] ?? ''} del Poder Judicial. El cartel con requisitos y fechas está en el enlace (PDF).`.replace(/\s+/g, ' '),
        },
        ctx,
      ),
    )
    .filter(Boolean);
}

/** Banco Popular: cada oferta es un título (BP-39-2026-Banco Popular-Puesto-ÁREA) y un enlace "VER OFERTA" a un PDF. */
export function parseBancoPopular(html) {
  const out = [];
  for (const m of html.matchAll(/<h2 class="elementor-heading-title[^>]*>((?:(?!<\/h2>)[\s\S])*)<\/h2>(?:(?!<h2)[\s\S]){0,2500}?href="([^"]+\.pdf)"[^>]*>\s*<span[^>]*>\s*<span[^>]*>\s*VER OFERTA/gi)) {
    const raw = strip(m[1]);
    const code = raw.match(/^BP-\d+-\d{4}/i)?.[0] ?? '';
    if (!code) continue;
    const title = raw.replace(/^BP-\d+-\d{4}-Banco Popular-/i, '').replace(/-[A-Z]{2,6}\s*$/, '').trim();
    out.push({ title: title || raw, code, url: decodeEntities(m[2]).replace(/^http:/, 'https:') });
  }
  return out;
}

export async function fetchBancoPopular(cfg, ctx) {
  const html = await getText(cfg.url);
  return parseBancoPopular(html)
    .map((p) =>
      makeJob(
        {
          sourceId: cfg.id,
          source: cfg.name,
          kind: 'estado',
          title: p.title,
          company: 'Banco Popular',
          location: 'Costa Rica',
          url: p.url,
          excerpt: `Oferta ${p.code} del Banco Popular. Los requisitos y la forma de aplicar están en el cartel (PDF).`.replace(/\s+/g, ' '),
        },
        ctx,
      ),
    )
    .filter(Boolean);
}
