import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDgsc } from '../scripts/sources/dgsc.mjs';
import { parseBancoPopular, parsePoderJudicial } from '../scripts/sources/publico.mjs';
import { parseSfDate, parseSfRows } from '../scripts/sources/successfactors.mjs';
import { parseTalentClue } from '../scripts/sources/talentclue.mjs';
import { mapProcomerJob } from '../scripts/sources/procomer.mjs';

test('SuccessFactors: fechas en español e inglés', () => {
  assert.equal(parseSfDate('21 sept 2026 ').slice(0, 10), '2026-09-21');
  assert.equal(parseSfDate('Oct 7, 2026').slice(0, 10), '2026-10-07');
  assert.equal(parseSfDate('texto raro'), null);
});

test('SuccessFactors: filas de resultados', () => {
  const html = `<table><tr class="data-row"><td class="colTitle"><span class="jobTitle hidden-phone"><a href="/job/Valuador/123/" class="jobTitle-link">Valuador de Vehiculos</a></span></td><td class="colLocation"><span class="jobLocation"> Cartago, Costa Rica, CR </span></td><td><span class="jobDepartment">Ventas</span></td><td><span class="jobDate">21 sept 2026 </span></td></tr></table>`;
  const [r] = parseSfRows(html);
  assert.equal(r.title, 'Valuador de Vehiculos');
  assert.equal(r.href, '/job/Valuador/123/');
  assert.equal(r.location, 'Cartago, Costa Rica, CR');
  assert.equal(r.department, 'Ventas');
});

test('Servicio Civil: solo vacantes vigentes, con salario y fecha límite', () => {
  const card = (tab, id) => `<div class="jb-card" data-tab="${tab}" data-provincia="San Jos&#xE9;" data-canton="San Jos&#xE9;" data-distrito="Catedral" data-institucion="Ministerio de Hacienda " data-clase="Profesional 3" data-esp="Econom&#xED;a" data-fecha="2026-10-13"><button data-target="#Modal_${id}"></button></div>`;
  const modal = (id) => `<div class="modal fade" id="Modal_${id}"><div class="modal-body"><p><b>Salario global:</b> <span>¢1.598.450.</span></p></div><div class="modal-footer">`;
  const html = card('vigente', 1) + card('historico', 2) + modal(1) + modal(2);
  const jobs = parseDgsc(html);
  assert.equal(jobs.length, 1);
  assert.equal(jobs[0].title, 'Profesional 3');
  assert.equal(jobs[0].salary, '₡1.598.450');
  assert.match(jobs[0].excerpt, /13\/10\/2026/);
});

test('Poder Judicial y Banco Popular', () => {
  const pj = `<div class="pd-float"><a class="" href="/index.php/x?download=674:rp-0003-2026" >RP-0003-2026 -Puestos varios</a></div>`;
  const [a] = parsePoderJudicial(pj, 'https://example.go.cr/index.php/y');
  assert.equal(a.url, 'https://example.go.cr/index.php/x?download=674:rp-0003-2026');
  const bp = `<style>.elementor-heading-title{}</style><h2 class="elementor-heading-title elementor-size-default">BP-39-2026-Banco Popular-Científico(a) de Datos-GGC </h2><a class="elementor-button" href="http://www.bancopopular.fi.cr/wp-content/uploads/a.pdf"> <span class="c"> <span class="t">VER OFERTA</span>`;
  const [b] = parseBancoPopular(bp);
  assert.equal(b.title, 'Científico(a) de Datos');
  assert.equal(b.url, 'https://www.bancopopular.fi.cr/wp-content/uploads/a.pdf');
});

test('Talent Clue: filas de ofertas', () => {
  const html = `<table><tbody><tr class="odd"><td><img src="x"></td><td><a href="https://careers.talentclue.com/es/node/1/4590" external="1">Gondolero/a Auto Mercado Yoses</a></td><td>Auto Mercado</td><td>Montes de Oca</td><td>San José</td><td>09/10/2026</td></tr></tbody></table>`;
  const [r] = parseTalentClue(html);
  assert.equal(r.title, 'Gondolero/a Auto Mercado Yoses');
  assert.equal(r.province, 'San José');
  assert.equal(r.href, 'https://careers.talentclue.com/es/node/1/4590');
});
test('Talent Costa Rica: solo ofertas públicas y vigentes', () => {
  const base = { id: 7, name: 'Cajero/a', description: '<p>Atender clientes</p>', requirements: '<p>Noveno año</p>', organization_name: 'Multivex', provincia: 'San José', canton: 'Santa Ana', distrito: 'Santa Ana', workplace: 'on-site', publish_date: '2026-10-01', published_until: '2026-12-01', is_published: true, external_visibility: 'public', draft: 0 };
  const now = new Date('2026-10-10');
  const j = mapProcomerJob(base, now);
  assert.equal(j.company, 'Multivex');
  assert.equal(j.modality, 'presencial');
  assert.equal(j.location, 'Santa Ana, San José, Costa Rica');
  assert.match(j.excerpt, /Requisitos: Noveno año/);
  assert.equal(mapProcomerJob({ ...base, published_until: '2026-09-01' }, now), null);
  assert.equal(mapProcomerJob({ ...base, external_visibility: 'private' }, now), null);
  assert.equal(mapProcomerJob({ ...base, anonymous_name: 'Confidencial' }, now).company, null);
});