import { test } from 'node:test';
import assert from 'node:assert/strict';
import { construirPresentacion, textoPresentacion, docx } from '../site/assets/presentacion-core.js';

test('carta de presentación completa', () => {
  const d = { nombre: 'Ana Rojas', email: 'ana@correo.com', tel: '8888-0000', ciudad: 'Heredia', fecha: '2026-11-02', puesto: 'Asesora de servicio al cliente', empresa: 'Empresa S.A.', presentacion: 'Soy asesora con 3 años de experiencia', logros: '- Atendí 60 consultas diarias\n• Satisfacción de 94 %', motivo: 'valoro su capacitación', disponibilidad: 'quince' };
  const b = construirPresentacion(d);
  const t = textoPresentacion(b);
  assert.ok(t.startsWith('Ana Rojas\n\nana@correo.com | 8888-0000 | Heredia\n\n2 de noviembre de 2026'));
  assert.ok(t.includes('Asunto: Postulación al puesto de Asesora de servicio al cliente'));
  assert.ok(t.includes('en Empresa S.A. Soy asesora con 3 años de experiencia.'));
  assert.equal(b.filter((x) => x.k === 'bullet').length, 2);
  assert.ok(t.includes('• Atendí 60 consultas diarias'));
  assert.ok(t.includes('porque valoro su capacitación.'));
  assert.ok(t.includes('en 15 días'));
  assert.ok(!t.includes('['));
});

test('carta vacía deja marcadores y el docx es un zip', () => {
  const t = textoPresentacion(construirPresentacion({}));
  assert.ok(t.includes('[tu nombre completo]') && t.includes('[tu logro o fortaleza 1]') && t.includes('disponibilidad inmediata'));
  assert.equal(docx(construirPresentacion({ nombre: 'A' }))[0], 0x50);
});
