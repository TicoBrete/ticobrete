import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isCostaRica, detectProvince, detectModality } from '../scripts/lib/geo.mjs';
import { classify, detectTags } from '../scripts/lib/classify.mjs';
import { looksLikeScam, stripContacts } from '../scripts/lib/safety.mjs';
import { dedupe, makeJob } from '../scripts/lib/job.mjs';
import { safeUrl, smartCase, cleanText, htmlToText } from '../scripts/lib/util.mjs';

test('isCostaRica reconoce lugares del país y descarta el resto', () => {
  for (const ok of ['Costa Rica', 'Alajuela Coyol, Alajuela, Costa Rica', 'CRI - Heredia', 'La Aurora, Heredia', 'San José', 'Escazú', 'Heredia, CR']) {
    assert.equal(isCostaRica(ok), true, ok);
  }
  for (const no of ['San Jose, California', 'San Jose, CA, United States', 'Bogota', 'Cartago, Colombia', 'Madrid', '']) {
    assert.equal(isCostaRica(no), false, no);
  }
});

test('detectProvince usa el primer lugar mencionado', () => {
  assert.equal(detectProvince('Alajuela Coyol, Alajuela, Costa Rica'), 'alajuela');
  assert.equal(detectProvince('Ciudad Quesada, San Carlos'), 'alajuela');
  assert.equal(detectProvince('Escazú, San José'), 'san-jose');
  assert.equal(detectProvince('Alajuela', 'Barrio San José de Alajuela'), 'alajuela');
  assert.equal(detectProvince('Tamarindo, Guanacaste'), 'guanacaste');
  assert.equal(detectProvince('Costa Rica'), null);
});

test('detectModality', () => {
  assert.equal(detectModality('Heredia, Costa Rica (Hybrid)'), 'hibrido');
  assert.equal(detectModality('Latin America (Remote)'), 'remoto');
  assert.equal(detectModality('San José (On-site)'), 'presencial');
  assert.equal(detectModality('Heredia'), null);
});

test('classify', () => {
  assert.equal(classify('Senior Software Engineer'), 'tecnologia');
  assert.equal(classify('Especialista en soporte tecnico y redes'), 'tecnologia');
  assert.equal(classify('Community Manager de redes sociales'), 'mercadeo');
  assert.equal(classify('Customer Service Representative - Bilingual'), 'servicio-cliente');
  assert.equal(classify('Operario de producción'), 'manufactura');
  assert.equal(classify('Chófer Lic. B2'), 'logistica');
  assert.equal(classify('Auxiliar de limpieza'), 'servicios');
  assert.equal(classify('Mesero'), 'turismo');
  assert.equal(classify('Senior Quality Engineer'), 'ingenieria');
  assert.equal(classify('Accountant, Global Accounting'), 'finanzas');
});

test('detectTags', () => {
  assert.deepEqual(detectTags('Bilingual agent, internship'), ['bilingue', 'junior']);
  assert.deepEqual(detectTags('Contador senior'), []);
});

test('el filtro de estafas bloquea lo obvio y deja pasar lo normal', () => {
  assert.equal(looksLikeScam('Ganá $500 diarios desde tu celular'), true);
  assert.equal(looksLikeScam('Trabajo dando likes, gana dinero fácil'), true);
  assert.equal(looksLikeScam('Oportunidad de negocio multinivel'), true);
  assert.equal(looksLikeScam('Se requiere pago de inscripción obligatorio para empezar a trabajar'), true);
  assert.equal(looksLikeScam('Operario de producción', 'Abbott', 'Turno B, salario según ley'), false);
  assert.equal(looksLikeScam('Software Engineer', 'Intel', 'Trading systems and market data'), false);
});

test('stripContacts quita teléfonos y correos', () => {
  assert.equal(stripContacts('Llamar al 8888-1234 o escribir a rh@empresa.cr ya'), 'Llamar al o escribir a ya');
});

test('safeUrl solo permite http(s) y limpia rastreadores', () => {
  assert.equal(safeUrl('javascript:alert(1)'), null);
  assert.equal(safeUrl('data:text/html,hola'), null);
  assert.equal(safeUrl('https://user:pw@x.com/a'), null);
  assert.equal(safeUrl('https://x.com/job?id=3&utm_source=a&fbclid=b#frag'), 'https://x.com/job?id=3');
});

test('texto externo se limpia: sin HTML ni caracteres invisibles', () => {
  assert.equal(htmlToText('<p>Hola&nbsp;<b>mundo</b></p><script>x()</script>'), 'Hola mundo');
  assert.equal(cleanText('Hola\u202Emundo\u200B  !'), 'Holamundo !');
  assert.equal(smartCase('JEFE DE PLANTA'), 'Jefe de Planta');
  assert.equal(smartCase('Jefe de planta'), 'Jefe de planta');
});

test('makeJob rechaza URLs peligrosas y estafas', () => {
  const base = { sourceId: 't', kind: 'comunidad', source: 'x', title: 'Cajero', location: 'Heredia' };
  assert.equal(makeJob({ ...base, url: 'javascript:alert(1)' }), null);
  assert.equal(makeJob({ ...base, title: 'Ganá dinero fácil desde casa', url: 'https://a.com/1' }), null);
  const ok = makeJob({ ...base, url: 'https://a.com/1' });
  assert.equal(ok.province, 'heredia');
  assert.equal(ok.title, 'Cajero');
});

test('dedupe prefiere la fuente directa de la empresa', () => {
  const mk = (kind, url) => makeJob({ sourceId: kind, kind, source: kind, title: 'Process Engineer', company: 'Abbott Inc.', location: 'Alajuela, Costa Rica', url });
  const out = dedupe([mk('comunidad', 'https://linkedin.com/jobs/1'), mk('empresa', 'https://abbott.wd5.myworkdayjobs.com/x'), mk('agregador', 'https://jooble.org/2')]);
  assert.equal(out.length, 1);
  assert.equal(out[0].kind, 'empresa');
});

