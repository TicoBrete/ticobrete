import https from 'node:https';
import tls from 'node:tls';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodeEntities, htmlToText, UA } from '../lib/util.mjs';
import { makeJob } from '../lib/job.mjs';

const CA_FILE = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'certs', 'digicert-g2-tls-rsa-sha256-2020-ca1.pem');
const HOME = 'https://vacantes.dgsc.go.cr/';

// El servidor no envía su certificado intermedio (DigiCert); lo agregamos a las autoridades confiables en vez de desactivar la verificación.
function getWithCa(url) {
  const ca = [...tls.rootCertificates, readFileSync(CA_FILE, 'utf8')];
  return new Promise((resolve, reject) => {
    const req = https.get(url, { ca, headers: { 'User-Agent': UA, Accept: 'text/html' }, timeout: 60000 }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} en ${url}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
    req.on('timeout', () => req.destroy(new Error('Tiempo de espera agotado')));
    req.on('error', reject);
  });
}

const attr = (block, name) => decodeEntities(block.match(new RegExp(`data-${name}="([^"]*)"`))?.[1] ?? '').trim();

/** Puestos vacantes vigentes del Régimen de Servicio Civil (Dirección General de Servicio Civil). */
export function parseDgsc(html) {
  const out = [];
  const modals = new Map();
  for (const m of html.matchAll(/id="Modal_(\d+)"[\s\S]*?<div class="modal-body"[^>]*>([\s\S]*?)<div class="modal-footer"/g)) modals.set(m[1], m[2]);

  for (const chunk of html.split('<div class="jb-card"').slice(1)) {
    if (attr(chunk, 'tab') !== 'vigente') continue;
    const id = chunk.match(/data-target="#Modal_(\d+)"/)?.[1];
    const clase = attr(chunk, 'clase');
    if (!id || !clase) continue;
    const body = htmlToText(modals.get(id) || '');
    const salary = body.match(/Salario global:\s*([^\n]+?)\.?\s*(?:\n|$)/i)?.[1]?.replace(/^¢/, '₡') ?? null;
    const deadline = attr(chunk, 'fecha');
    const place = [attr(chunk, 'provincia'), attr(chunk, 'canton'), attr(chunk, 'distrito')].filter(Boolean).join(', ');
    const esp = attr(chunk, 'esp');
    const details = body.replace(/^Estimadas personas oferentes:\s*/i, '').replace(/\n+/g, ' ');
    out.push({
      id,
      title: clase,
      company: attr(chunk, 'institucion'),
      location: place || 'Costa Rica',
      provinceHint: attr(chunk, 'provincia'),
      salary,
      deadline,
      excerpt: `Concurso del Servicio Civil${esp ? ` · ${esp}` : ''}. Fecha límite de registro: ${deadline.split('-').reverse().join('/')}. ${details}`,
    });
  }
  return out;
}

export async function fetchDgsc(cfg, ctx) {
  const html = await getWithCa(HOME);
  return parseDgsc(html)
    .map((p) =>
      makeJob(
        {
          sourceId: cfg.id,
          source: cfg.name,
          kind: 'estado',
          title: p.title,
          company: p.company,
          location: p.location,
          provinceHint: p.provinceHint,
          salary: p.salary,
          url: `${HOME}?vacante=${p.id}`,
          excerpt: p.excerpt,
        },
        ctx,
      ),
    )
    .filter(Boolean);
}
