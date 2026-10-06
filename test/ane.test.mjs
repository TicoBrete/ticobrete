import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { aneJobs, parseAneDate, parseAnePage } from '../scripts/sources/ane.mjs';

const html = readFileSync(new URL('./fixtures/ane.html', import.meta.url), 'utf8');
const ctx = () => ({ now: new Date('2026-10-06T20:00:00Z'), stats: {} });

test('ANE: fechas en español', () => {
  assert.equal(parseAneDate('martes, 06 de octubre del 2026'), '2026-10-06T18:00:00.000Z');
  assert.equal(parseAneDate('miércoles, 05 de agosto del 2020'), '2020-08-05T18:00:00.000Z');
  assert.equal(parseAneDate('texto raro'), null);
});

test('ANE: lee las tarjetas de una página real', () => {
  const cards = parseAnePage(html);
  assert.equal(cards.length, 3);
  assert.equal(cards[0].title, 'OFICIAL DE SEGURIDAD');
  assert.equal(cards[0].company, 'Seguridad G4S');
  assert.equal(cards[0].plazas, 3);
  assert.equal(cards[0].places[0].prov, 'san-jose');
});

test('ANE: crea bretes con enlace filtrado por puesto y provincia', () => {
  const jobs = aneJobs(parseAnePage(html), ctx());
  assert.equal(jobs.length, 3);
  const j = jobs[0];
  assert.equal(j.kind, 'estado');
  assert.equal(j.title, 'Oficial de Seguridad');
  assert.equal(j.province, 'san-jose');
  assert.equal(j.category, 'servicios');
  assert.equal(j.url, 'https://www.ane.cr/Puesto?Empleos=OFICIAL%20DE%20SEGURIDAD&Prov=1');
  assert.match(j.excerpt, /3 plazas/);
});

test('ANE: un brete en varias provincias se separa por provincia (máximo 3)', () => {
  const card = {
    title: 'Técnico', company: 'Acme', occupation: 'Técnico', plazas: 2, date: '2026-10-06T18:00:00.000Z',
    places: [
      { canton: 'San Ramón', prov: 'alajuela' }, { canton: 'Curridabat', prov: 'san-jose' }, { canton: 'Belén', prov: 'heredia' },
      { canton: 'Liberia', prov: 'guanacaste' }, { canton: 'Escazú', prov: 'san-jose' },
    ],
  };
  const jobs = aneJobs([card], ctx());
  assert.equal(jobs.length, 3);
  assert.deepEqual(jobs.map((j) => j.province), ['alajuela', 'san-jose', 'heredia']);
  assert.match(jobs[1].location, /Curridabat, Escazú, San José/);
  assert.equal(new Set(jobs.map((j) => j.id)).size, 3);
});

test('ANE: la protección contra estafas también aplica', () => {
  const card = { title: 'Ganá $500 diarios sin experiencia', company: 'X', occupation: '', plazas: 1, date: null, places: [{ canton: 'Heredia', prov: 'heredia' }] };
  assert.equal(aneJobs([card], ctx()).length, 0);
});
