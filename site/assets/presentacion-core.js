// Generador de carta de presentación: lógica pura. Todo corre en el navegador; no se envía ningún dato.
import { docx, fechaLarga } from './carta-core.js';

const limpio = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const lineas = (s) => String(s ?? '').split(/\r?\n/).map((l) => l.replace(/^\s*[-•*·]\s*/, '').trim()).filter(Boolean);
const ph = (v, txt) => limpio(v) || `[${txt}]`;
const cierre = (t) => (/[.!?]$/.test(t) ? t : `${t}.`);

const DISPONIBILIDAD = {
  inmediata: 'disponibilidad inmediata para incorporarme',
  quince: 'disponibilidad para incorporarme en 15 días',
  mes: 'disponibilidad para incorporarme en un mes',
  conversar: 'flexibilidad para acordar la fecha de ingreso',
};

export function construirPresentacion(d = {}) {
  const b = [];
  const p = (t) => b.push({ k: 'p', t });
  const nombre = ph(d.nombre, 'tu nombre completo');
  const contacto = [d.email, d.tel, d.ciudad].map(limpio).filter(Boolean).join(' | ');
  const empresa = limpio(d.empresa);
  const dest = limpio(d.destinatario);
  const puesto = ph(d.puesto, 'puesto al que aplicás');

  p(nombre);
  p(contacto || '[correo | teléfono | ciudad]');
  p(fechaLarga(d.fecha) || '[fecha]');
  p(dest ? `Señor(a) ${dest}` : 'Señores');
  p(empresa || '[nombre de la empresa]');
  p(`Asunto: Postulación al puesto de ${puesto}`);
  p(dest ? `Estimado(a) ${dest}:` : 'Estimados señores:');

  p(`${cierre(`Me dirijo a ustedes para postularme al puesto de ${puesto}${empresa ? ` en ${empresa}` : ''}`)} ${cierre(ph(d.presentacion, 'presentate en una o dos frases: quién sos, tu experiencia o estudios y qué sabés hacer'))}`);

  p('Entre mis fortalezas y logros destacan:');
  const logros = lineas(d.logros);
  for (const l of (logros.length ? logros : ['[tu logro o fortaleza 1]', '[tu logro o fortaleza 2]'])) b.push({ k: 'bullet', t: l });

  p(`Me interesa formar parte de ${empresa || '[nombre de la empresa]'} porque ${cierre(ph(d.motivo, 'explicá en una frase por qué te interesa esta empresa o este puesto'))}`);

  const disp = DISPONIBILIDAD[d.disponibilidad] || DISPONIBILIDAD.inmediata;
  p(`Tengo ${disp}. Quedo a su disposición para una entrevista cuando lo consideren conveniente, y adjunto mi currículum para su revisión.`);
  p('Muchas gracias por su tiempo y su consideración.');
  p('Atentamente,');
  p(' ');
  p(nombre);
  return b;
}

export const textoPresentacion = (bloques) => bloques.map((x) => (x.k === 'bullet' ? `• ${x.t}` : x.t)).join('\n\n');
export const nombreArchivoPresentacion = (d) => 'Carta-de-presentacion-' + (limpio(d?.nombre).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'TicoBrete');
export { docx };
