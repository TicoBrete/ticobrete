import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluar, SENALES } from '../site/assets/verificador-core.js';

test('sin señales y señales graves', () => {
  assert.equal(evaluar([]).nivel, 'ninguna');
  assert.equal(evaluar(['dinero']).nivel, 'alto');
  assert.equal(evaluar(['datos']).nivel, 'alto');
  assert.equal(evaluar(['exterior']).nivel, 'alto');
});

test('puntos: precaución, medio y alto', () => {
  assert.equal(evaluar(['correo']).nivel, 'precaucion');
  assert.equal(evaluar(['whatsapp']).nivel, 'precaucion');
  assert.equal(evaluar(['whatsapp', 'correo']).nivel, 'medio');
  assert.equal(evaluar(['whatsapp', 'salario', 'empresa']).nivel, 'alto');
  assert.equal(evaluar(['no-existe']).nivel, 'ninguna');
});

test('ids únicos y cada señal tiene texto', () => {
  assert.equal(new Set(SENALES.map((s) => s.id)).size, SENALES.length);
  for (const s of SENALES) assert.ok(s.texto.length > 10 && (s.grave || s.puntos > 0));
});
