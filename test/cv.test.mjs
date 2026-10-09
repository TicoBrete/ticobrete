import { test } from 'node:test';
import assert from 'node:assert/strict';
import { construirBloques, docx, documentoXml, EJEMPLO, nombreArchivo } from '../site/assets/cv-core.js';

test('bloques: orden estándar para ATS y sin secciones vacías', () => {
  const t = construirBloques(EJEMPLO).filter((b) => b.k === 'h2').map((b) => b.t);
  assert.deepEqual(t, ['Perfil profesional', 'Experiencia laboral', 'Educación', 'Habilidades', 'Idiomas', 'Certificaciones y cursos']);
  assert.deepEqual(construirBloques({}), []);
  assert.deepEqual(construirBloques({ nombre: 'Ana' }).map((b) => b.k), ['name']);
});

test('docx es un zip válido y escapa caracteres', () => {
  const bytes = docx(construirBloques({ nombre: 'Ana & <Co>', exp: [{ puesto: 'X', logros: '- uno\n• dos' }] }));
  assert.equal(bytes[0], 0x50); assert.equal(bytes[1], 0x4b);
  const txt = Buffer.from(bytes).toString('utf8');
  assert.ok(txt.includes('word/document.xml') && txt.includes('Ana &amp; &lt;Co&gt;') && txt.includes('• uno'));
  assert.ok(documentoXml(construirBloques(EJEMPLO)).startsWith('<?xml'));
});

test('nombre de archivo sin tildes', () => {
  assert.equal(nombreArchivo({ nombre: 'María Fernández' }), 'Curriculum-Maria-Fernandez');
  assert.equal(nombreArchivo({}), 'Curriculum-TicoBrete');
});

