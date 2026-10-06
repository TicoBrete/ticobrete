import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv, toObjects } from '../scripts/lib/csv.mjs';
import { applyLink, parseSheetDate, rowsToJobs } from '../scripts/sources/submissions.mjs';
import { dedupe } from '../scripts/lib/job.mjs';

const CSV = `Marca temporal,Puesto,Empresa,Provincia,Lugar,Modalidad,Salario,Descripción,Cómo aplicar (enlace o WhatsApp),Aprobado,Bloqueado
5/10/2026 14:32:10,"MESERO(A)",Soda La Esquina,Heredia,"San Rafael, cerca del parque",Presencial,"₡450.000","Turno de noche, ""buen ambiente"", llamar al 8888-1234",8888-1234,,
6/10/2026 08:00:00,Desarrollador Web,Pixel CR,San José,Escazú,Remoto,,Stack: React y Node,pixelcr.com/trabajo,,
6/10/2026 09:00:00,Gana $500 diarios dando likes,Fast Money,Alajuela,,Remoto,,Sin experiencia,https://fastmoney.example/join,,
6/10/2026 10:00:00,Cajero,Super X,Cartago,,Presencial,,,https://bit.ly/abc123,,
6/10/2026 11:00:00,Bodeguero,Bodega Y,Limón,Guápiles,Presencial,,,50622223333,,sí
`;

test('CSV: comillas, comas y saltos de línea', () => {
  const rows = parseCsv('a,b\n"x, y","li""nea\ndos"\n');
  assert.deepEqual(rows, [['a', 'b'], ['x, y', 'li"nea\ndos']]);
  const objs = toObjects(parseCsv(CSV));
  assert.equal(objs.length, 5);
  assert.equal(objs[0]['puesto'], 'MESERO(A)');
});

test('applyLink: WhatsApp, web y rechazos', () => {
  assert.match(applyLink('8888-1234', 'Mesero'), /^https:\/\/wa\.me\/50688881234\?text=/);
  assert.match(applyLink('+506 2222 3333', 'X'), /wa\.me\/50622223333/);
  assert.equal(applyLink('pixelcr.com/trabajo', 'X'), 'https://pixelcr.com/trabajo');
  assert.equal(applyLink('https://bit.ly/abc', 'X'), null);
  assert.equal(applyLink('javascript:alert(1)', 'X'), null);
  assert.equal(applyLink('http://192.168.1.1/x', 'X'), null);
  assert.equal(applyLink('12345', 'X'), null);
  assert.equal(applyLink('', 'X'), null);
});

test('fechas de Google Sheets (día/mes/año, hora de Costa Rica)', () => {
  assert.equal(parseSheetDate('5/10/2026 14:32:10'), '2026-10-05T20:32:10.000Z');
  assert.equal(parseSheetDate('10/25/2026 08:00:00'), '2026-10-25T14:00:00.000Z');
  assert.equal(parseSheetDate('2026-10-05T10:00:00Z'), '2026-10-05T10:00:00.000Z');
});

test('rowsToJobs: publica lo bueno, bloquea estafas, acortadores y bloqueados', () => {
  const ctx = { now: new Date('2026-10-07T00:00:00Z'), stats: {} };
  const jobs = rowsToJobs(toObjects(parseCsv(CSV)), { maxPerCompany: 8 }, ctx);
  const titles = jobs.map((j) => j.title).sort();
  assert.deepEqual(titles, ['Desarrollador Web', 'Mesero(a)']);
  const mesero = jobs.find((j) => j.title === 'Mesero(a)');
  assert.equal(mesero.kind, 'publicado');
  assert.equal(mesero.province, 'heredia');
  assert.equal(mesero.modality, 'presencial');
  assert.equal(mesero.category, 'turismo');
  assert.equal(mesero.salary, '₡450.000');
  assert.ok(!/8888/.test(mesero.excerpt), 'el teléfono se quita del extracto');
  assert.match(mesero.url, /wa\.me\/50688881234/);
  const dev = jobs.find((j) => j.title === 'Desarrollador Web');
  assert.equal(dev.modality, 'remoto');
  assert.equal(dev.category, 'tecnologia');
  assert.equal(ctx.stats.blocked, 1);
});

test('rowsToJobs: con aprobación obligatoria solo sale lo marcado', () => {
  const ctx = () => ({ now: new Date('2026-10-07T00:00:00Z'), stats: {} });
  assert.equal(rowsToJobs(toObjects(parseCsv(CSV)), { requireApproval: true }, ctx()).length, 0);
  const approved = 'Puesto,Empresa,Cómo aplicar,Aprobado\nCajero,Super Z,8888-1234,Sí\nChofer,Super Z,8888-1234,\n';
  const jobs = rowsToJobs(toObjects(parseCsv(approved)), { requireApproval: true }, ctx());
  assert.deepEqual(jobs.map((j) => j.title), ['Cajero']);
});

test('rowsToJobs: límite por empresa y puestos distintos con el mismo enlace no se pisan', () => {
  const head = 'Puesto,Empresa,Cómo aplicar\n';
  const body = Array.from({ length: 12 }, (_, i) => `Cajero ${i},Mega Tienda,https://megatienda.cr/empleos`).join('\n');
  const jobs = rowsToJobs(toObjects(parseCsv(head + body)), { maxPerCompany: 8 }, { now: new Date(), stats: {} });
  assert.equal(jobs.length, 8);
  assert.equal(new Set(jobs.map((j) => j.id)).size, 8);
  assert.equal(dedupe(jobs).length, 8);
});
