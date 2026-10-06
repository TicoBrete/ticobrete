import { daysAgo, pool } from './lib/util.mjs';
import { dedupe } from './lib/job.mjs';
import { fetchWorkday } from './sources/workday.mjs';
import { fetchGreenhouse, fetchLever } from './sources/ats.mjs';
import { fetchTelegram } from './sources/telegram.mjs';
import { fetchRemote } from './sources/remote.mjs';
import { fetchJooble } from './sources/jooble.mjs';

const SECRETS = () => ['JOOBLE_API_KEY'].map((k) => process.env[k]).filter(Boolean);
const redact = (msg) => SECRETS().reduce((m, s) => m.split(s).join('***'), String(msg)).slice(0, 160);

function buildTasks(config, ctx) {
  const tasks = [];
  for (const c of config.workday || []) tasks.push({ id: c.id, name: c.name, authoritative: true, run: () => fetchWorkday(c, ctx) });
  for (const c of config.greenhouse || []) tasks.push({ id: c.id, name: c.name, authoritative: true, run: () => fetchGreenhouse(c, ctx) });
  for (const c of config.lever || []) tasks.push({ id: c.id, name: c.name, authoritative: true, run: () => fetchLever(c, ctx) });
  for (const c of config.telegram || []) tasks.push({ id: c.id, name: c.label, authoritative: false, run: () => fetchTelegram(c, ctx) });
  for (const n of config.remote || []) {
    const id = { jobicy: 'rm-jobicy', remotive: 'rm-remotive', himalayas: 'rm-himalayas', remoteok: 'rm-remoteok', weworkremotely: 'rm-wwr' }[n];
    tasks.push({ id, name: n, authoritative: true, run: () => fetchRemote(n, ctx) });
  }
  if (config.jooble) tasks.push({ id: 'agg-jooble', name: 'Jooble', authoritative: false, run: () => fetchJooble(config.jooble, ctx) });
  return tasks;
}

/**
 * Recorre todas las fuentes y mezcla el resultado con lo que ya estaba publicado.
 * Regla de oro: si una fuente falla, NO se pierden sus puestos anteriores.
 */
export async function collect({ prev, config, now = new Date(), log = console.log }) {
  const prevJobs = prev?.jobs ?? [];
  const maxAgeDays = config.maxAgeDays ?? 45;
  const ctx = {
    now,
    maxAgeDays,
    state: structuredClone(prev?.meta?.state ?? {}),
    stats: {},
    prevByUrl: new Map(prevJobs.map((j) => [j.url, j])),
  };
  const prevById = new Map(prevJobs.map((j) => [j.id, j]));
  const prevBySource = new Map();
  for (const j of prevJobs) (prevBySource.get(j.s) ?? prevBySource.set(j.s, []).get(j.s)).push(j);

  const tasks = buildTasks(config, ctx);
  const report = [];
  const merged = [];
  const knownSources = new Set(tasks.map((t) => t.id));

  const results = await pool(tasks, 4, async (task) => {
    const t0 = Date.now();
    try {
      const jobs = await task.run();
      return { task, jobs, ms: Date.now() - t0 };
    } catch (err) {
      return { task, error: redact(err?.message || err), ms: Date.now() - t0 };
    }
  });

  const cutoff = daysAgo(maxAgeDays, now);
  const fresh = (j) => (j.postedAt ?? j.firstSeen) >= cutoff;

  for (const r of results) {
    const { task } = r;
    const before = prevBySource.get(task.id) ?? [];
    let kept;
    let status;
    if (r.error) {
      kept = before.filter(fresh);
      status = { ok: false, error: r.error };
      log(`  ✗ ${task.name}: ${r.error} (se conservan ${kept.length} anteriores)`);
    } else if (task.authoritative && r.jobs?.length === 0 && before.length >= 3) {
      kept = before.filter(fresh);
      status = { ok: false, error: 'La fuente respondió vacía; se conservan los puestos anteriores' };
      log(`  ✗ ${task.name}: respuesta vacía sospechosa (se conservan ${kept.length} anteriores)`);
    } else if (r.jobs == null) {
      kept = before.filter(fresh);
      status = { ok: true, skipped: true };
      log(`  – ${task.name}: omitida (sin configuración)`);
    } else {
      const incoming = r.jobs.map((j) => {
        const old = prevById.get(j.id);
        if (!old) return j;
        // Algunas fuentes solo dicen "publicado hoy": nos quedamos con la fecha más antigua para que no se reinicie en cada corrida.
        const postedAt = [j.postedAt, old.postedAt].filter(Boolean).sort()[0] ?? null;
        return { ...j, firstSeen: old.firstSeen, postedAt, excerpt: j.excerpt ?? old.excerpt };
      });
      kept = task.authoritative
        ? incoming
        : [...incoming, ...before.filter((o) => !incoming.some((n) => n.id === o.id))];
      kept = kept.filter(fresh);
      status = { ok: true };
      log(`  ✓ ${task.name}: ${r.jobs.length} puestos (${(r.ms / 1000).toFixed(1)}s)`);
    }
    merged.push(...kept);
    report.push({ id: task.id, name: task.name, count: kept.length, ...status });
  }

  // Fuentes que ya no están en la configuración se descartan.
  for (const [id] of prevBySource) if (!knownSources.has(id)) log(`  ⚠ fuente retirada: ${id}`);

  for (const j of merged) j.postedAt ??= j.firstSeen;

  const jobs = dedupe(merged)
    .sort((a, b) => (b.postedAt > a.postedAt ? 1 : b.postedAt < a.postedAt ? -1 : a.id.localeCompare(b.id)))
    .slice(0, config.maxJobs ?? 4000);

  const dayAgo = daysAgo(1, now);
  const meta = {
    updatedAt: now.toISOString(),
    total: jobs.length,
    last24h: jobs.filter((j) => j.postedAt >= dayAgo).length,
    companies: new Set(jobs.map((j) => (j.company || '').toLowerCase()).filter(Boolean)).size,
    blocked: ctx.stats.blocked || 0,
    sources: report,
    state: ctx.state,
  };
  return { meta, jobs };
}
