import { test } from 'node:test';
import assert from 'node:assert/strict';
import { construirCarta, fechaLarga, textoPlano, docx } from '../site/assets/carta-core.js';

test('fecha larga en español sin zonas horarias', () => {
  assert.equal(fechaLarga('2026-11-15'), '15 de noviembre de 2026');
  assert.equal(fechaLarga('2026-09-03'), '3 de setiembre de 2026');
  assert.equal(fechaLarga(''), '');
});

test('carta completa y con datos faltantes entre corchetes', () => {
  const d = { nombre: 'Ana Rojas', cedula: '1-2345-6789', puesto: 'Cajera', empresa: 'Tienda S.A.', ciudad: 'Heredia', fecha: '2026-11-15', ultimo: '2026-12-15', ingreso: '2024-01-10' };
  const t = textoPlano(construirCarta(d));
  assert.ok(t.startsWith('Heredia, 15 de noviembre de 2026'));
  assert.ok(t.includes('Ana Rojas, cédula de identidad 1-2345-6789'));
  assert.ok(t.includes('desde el 10 de enero de 2024'));
  assert.ok(t.includes('a partir del 15 de diciembre de 2026, cumpliendo con el preaviso'));
  assert.ok(!t.includes('['));
  assert.ok(textoPlano(construirCarta({})).includes('[tu nombre completo]'));
});

test('opciones: sin agradecimiento ni solicitudes, preaviso acordado', () => {
  const t = textoPlano(construirCarta({ nombre: 'A', preaviso: 'acuerdo', agradecimiento: false, traspaso: false, liquidacion: false, constancia: false }));
  assert.ok(t.includes('según lo acordado con ustedes'));
  assert.ok(!t.includes('Agradezco') && !t.includes('Solicito'));
  assert.ok(textoPlano(construirCarta({ traspaso: true, agradecimiento: false })).includes('Quedo en la mejor disposición'));
});

test('docx de la carta es un zip', () => {
  const b = docx(construirCarta({ nombre: 'Ana' }));
  assert.equal(b[0], 0x50);
});
