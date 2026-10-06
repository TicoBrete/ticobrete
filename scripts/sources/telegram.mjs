import { decodeEntities, getText, safeUrl, daysAgo, smartCase } from '../lib/util.mjs';
import { isCostaRica } from '../lib/geo.mjs';
import { makeJob } from '../lib/job.mjs';

const MAX_PAGES_FIRST_RUN = 12;
const MAX_PAGES = 6;

export function parseMessages(html) {
  const out = [];
  for (const chunk of html.split('tgme_widget_message_wrap').slice(1)) {
    const post = chunk.match(/data-post="([^"]+)"/)?.[1];
    const date = chunk.match(/<time[^>]*datetime="([^"]+)"/)?.[1];
    const body = chunk.match(/tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/)?.[1];
    if (!post || !body) continue;
    const id = Number(post.split('/')[1]);
    const links = [...body.matchAll(/<a [^>]*href="([^"]+)"/g)]
      .map((m) => decodeEntities(m[1]))
      .filter((h) => /^https?:/i.test(h));
    const text = decodeEntities(
      body
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<i class="emoji"[^>]*>[\s\S]*?<\/i>/g, '')
        .replace(/<[^>]+>/g, ''),
    );
    out.push({ id, post, date, text, links });
  }
  return out;
}

function hostLabel(url) {
  try {
    const h = new URL(url).hostname.replace(/^www\./, '');
    if (h.includes('linkedin')) return 'LinkedIn';
    if (h.includes('elempleo')) return 'Elempleo';
    if (h.includes('computrabajo')) return 'Computrabajo';
    if (h.includes('indeed')) return 'Indeed';
    if (h.includes('myworkdayjobs')) return 'Workday';
    if (h.includes('greenhouse')) return 'Greenhouse';
    if (h.includes('lever.co')) return 'Lever';
    if (h.includes('facebook')) return 'Facebook';
    return h.split('.').slice(-2, -1)[0].replace(/^./, (c) => c.toUpperCase());
  } catch {
    return 'Web';
  }
}

function field(text, ...names) {
  for (const n of names) {
    const m = text.match(new RegExp(`^\\s*${n}\\s*:\\s*(.+)$`, 'im'));
    if (m) return m[1].trim();
  }
  return null;
}

export function parseStructured(msg, cfg) {
  const first = msg.text.split('\n').find((l) => l.includes('|')) || '';
  const title = first.split('|').slice(1).join('|').trim();
  const company = field(msg.text, 'Empresa', 'Company');
  const location = field(msg.text, 'Ubicaci\u00f3n', 'Ubicacion', 'Location');
  const salary = field(msg.text, 'Salario', 'Salary');
  const url = msg.links.find((l) => !/[?&]q=%23/.test(l) && !/t\.me\//.test(l));
  if (!title || !url) return null;
  if (!cfg.remote && !isCostaRica(location || '')) return null;
  return {
    title,
    company,
    location: cfg.remote ? location || 'Remoto (LATAM)' : location,
    salary,
    url,
    source: hostLabel(url),
    via: cfg.label,
    modality: cfg.remote ? 'remoto' : undefined,
  };
}

// Formato comunitario: EMPRESA busca "PUESTO", Lugar.
export function parseBusca(msg, cfg) {
  const flat = msg.text.replace(/#\S+/g, ' ').replace(/\s+/g, ' ').trim();
  const m = flat.match(
    /^(.*?)\s*\b(?:busca|solicita|requiere|necesita|contrata|ocupa)\b\s*(?:personal para|para)?\s*["\u201c\u00ab]\s*(.+?)\s*["\u201d\u00bb]\s*,?\s*(.*)$/i,
  );
  if (!m) return null;
  const company = smartCase(m[1].replace(/^se$/i, '').trim()) || null;
  const title = smartCase(m[2].replace(/\s+/g, ' '));
  const location = m[3].replace(/[.\s]+$/, '').trim();
  const tagLoc = [...msg.text.matchAll(/#([A-Za-z\u00c1\u00c9\u00cd\u00d3\u00da\u00d1\u00e1\u00e9\u00ed\u00f3\u00fa\u00f1]+)/g)]
    .map((x) => x[1])
    .filter((x) => !/empleos?506cr/i.test(x))
    .join(' ');
  return {
    title,
    company,
    location: location || 'Costa Rica',
    provinceHint: tagLoc,
    url: `https://t.me/${msg.post}`,
    source: 'Telegram',
    via: cfg.label,
    freeform: true,
  };
}

export async function fetchTelegram(cfg, ctx) {
  const lastSeen = ctx.state.telegram?.[cfg.channel] ?? 0;
  const maxPages = lastSeen ? MAX_PAGES : MAX_PAGES_FIRST_RUN;
  const cutoff = daysAgo(ctx.maxAgeDays, ctx.now);
  const jobs = [];
  let before = null;
  let newest = lastSeen;

  for (let page = 0; page < maxPages; page++) {
    const html = await getText(`https://t.me/s/${cfg.channel}${before ? `?before=${before}` : ''}`);
    const msgs = parseMessages(html);
    if (!msgs.length) break;
    let reachedKnown = false;
    for (const msg of msgs) {
      newest = Math.max(newest, msg.id);
      if (msg.id <= lastSeen) reachedKnown = true;
      if (msg.date && msg.date < cutoff) continue;
      const parsed = cfg.format === 'busca' ? parseBusca(msg, cfg) : parseStructured(msg, cfg);
      if (!parsed || !safeUrl(parsed.url)) continue;
      const job = makeJob({ sourceId: cfg.id, kind: cfg.kind, postedAt: msg.date, ...parsed }, ctx);
      if (job) jobs.push(job);
    }
    const minId = Math.min(...msgs.map((m) => m.id));
    const oldestDate = msgs.map((m) => m.date).filter(Boolean).sort()[0];
    if (reachedKnown || (oldestDate && oldestDate < cutoff) || minId <= 1) break;
    before = minId;
  }

  ctx.state.telegram = { ...(ctx.state.telegram || {}), [cfg.channel]: newest };
  return jobs;
}
