import { decodeEntities, fold, getText, smartCase } from '../lib/util.mjs';
import { makeJob } from '../lib/job.mjs';

const BASE = 'https://www.ane.cr/Puesto';
const PROV_ID = { 'san-jose': 1, alajuela: 2, cartago: 3, heredia: 4, guanacaste: 5, puntarenas: 6, limon: 7 };
const PROV_BY_NAME = { 'san jose': 'san-jose', alajuela: 'alajuela', cartago: 'cartago', heredia: 'heredia', guanacaste: 'guanacaste', puntarenas: 'puntarenas', limon: 'limon' };
const MONTHS = { enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5, julio: 6, agosto: 7, septiembre: 8, setiembre: 8, octubre: 9, noviembre: 10, diciembre: 11 };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const text = (s = '') => decodeEntities(String(s).replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

/** "martes, 06 de octubre del 2026" -> ISO (mediodía de Costa Rica) */
export function parseAneDate(s) {
  const m = fold(s).match(/(\d{1,2}) de ([a-z]+) del? (\d{4})/);
  if (!m || !(m[2] in MONTHS)) return null;
  return new Date(Date.UTC(Number(m[3]), MONTHS[m[2]], Number(m[1]), 18, 0, 0)).toISOString();
}

/** Lee las tarjetas de una página de resultados del ANE. */
export function parseAnePage(html) {
  const cards = [];
  for (const chunk of String(html).split('<div class="job-listing">').slice(1)) {
    const title = text(chunk.match(/class="job-listing-title[^"]*"[^>]*>([\s\S]*?)<\/h3>/)?.[1]);
    if (!title) continue;
    const company = text(chunk.match(/class="job-listing-company[^"]*"[^>]*>([\s\S]*?)<\/h4>/)?.[1]);
    const occupation = text(chunk.match(/<h4 class="job-listing-description">([\s\S]*?)<\/h4>/)?.[1]);
    const plazas = Number(chunk.match(/Plazas:\s*(\d+)/)?.[1] ?? 0) || null;
    const date = parseAneDate(chunk.match(/Publicado el ([^<]*)</)?.[1]);
    const places = [];
    for (const li of chunk.split('<ul>').slice(1).join('<ul>').split('</ul>')[0].matchAll(/<li>([\s\S]*?)<\/li>/g)) {
      const parts = text(li[1]).split(',').map((p) => p.trim()).filter(Boolean);
      const prov = PROV_BY_NAME[fold(parts[parts.length - 1] || '')];
      if (prov) places.push({ canton: parts.length > 1 ? parts[0] : '', prov });
    }
    cards.push({ title, company, occupation, plazas, date, places });
  }
  return cards;
}

/** Un brete por provincia (máximo 3), con enlace a la búsqueda del ANE ya filtrada. */
export function aneJobs(cards, ctx) {
  const jobs = [];
  for (const c of cards) {
    const byProv = new Map();
    for (const p of c.places) {
      const list = byProv.get(p.prov) ?? byProv.set(p.prov, new Set()).get(p.prov);
      if (p.canton) list.add(p.canton);
    }
    if (!byProv.size) continue;
    for (const [prov, cantons] of [...byProv].slice(0, 3)) {
      const names = [...cantons].slice(0, 3);
      const extra = cantons.size - names.length;
      const location = `${names.join(', ')}${extra > 0 ? ` y ${extra} más` : ''}${names.length ? ', ' : ''}${{ 'san-jose': 'San José', alajuela: 'Alajuela', cartago: 'Cartago', heredia: 'Heredia', guanacaste: 'Guanacaste', puntarenas: 'Puntarenas', limon: 'Limón' }[prov]}`;
      const job = makeJob(
        {
          sourceId: 'ane',
          source: 'ANE (Estado)',
          kind: 'estado',
          title: smartCase(c.title),
          company: c.company ? smartCase(c.company) : null,
          location,
          province: prov,
          url: `${BASE}?Empleos=${encodeURIComponent(c.title)}&Prov=${PROV_ID[prov]}`,
          postedAt: c.date,
          excerpt: [c.occupation && `Puesto: ${c.occupation}.`, c.plazas && `${c.plazas} ${c.plazas === 1 ? 'plaza' : 'plazas'}.`, 'Para postularte hay que registrarte gratis en el ANE.'].filter(Boolean).join(' '),
          freeform: true,
        },
        ctx,
      );
      if (job) jobs.push(job);
    }
  }
  return jobs;
}

/**
 * Agencia Nacional de Empleo (MTSS). Los resultados vienen ordenados del más nuevo al más viejo,
 * así que solo leemos las primeras páginas, una a la vez y con pausa para no cargar su servidor.
 */
export async function fetchAne(cfg, ctx) {
  const cutoff = new Date(ctx.now.getTime() - ctx.maxAgeDays * 86400000).toISOString();
  const cards = [];
  for (let page = 1; page <= (cfg.maxPages ?? 60); page++) {
    const html = await getText(`${BASE}?Pagina=${page}`, { retries: 2, timeout: 30000 });
    const batch = parseAnePage(html);
    if (!batch.length) break;
    cards.push(...batch);
    const dates = batch.map((c) => c.date).filter(Boolean);
    if (dates.length && dates.every((d) => d < cutoff)) break;
    await sleep(cfg.delayMs ?? 900);
  }
  return aneJobs(cards, ctx);
}
