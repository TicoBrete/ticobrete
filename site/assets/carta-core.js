// Generador de carta de renuncia: lógica pura. Todo corre en el navegador; no se envía ningún dato.
import { docx } from './cv-core.js';

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
const limpio = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();

/** "2026-11-15" -> "15 de noviembre de 2026" (sin usar zonas horarias). */
export function fechaLarga(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
  if (!m) return '';
  const mes = MESES[Number(m[2]) - 1];
  return mes ? `${Number(m[3])} de ${mes} de ${m[1]}` : '';
}

const ph = (v, txt) => (limpio(v) || `[${txt}]`);

export function construirCarta(d = {}) {
  const b = [];
  const p = (t) => b.push({ k: 'p', t });
  const ciudad = limpio(d.ciudad) || 'San José';
  const fecha = fechaLarga(d.fecha) || '[fecha]';
  const dest = limpio(d.destinatario);
  const empresa = ph(d.empresa, 'nombre de la empresa');

  p(`${ciudad}, ${fecha}`);
  p(dest ? `Señor(a) ${dest}` : 'Señores');
  p(empresa);
  p('Presente');
  p(dest ? `Estimado(a) ${dest}:` : 'Estimados señores:');

  const ingreso = fechaLarga(d.ingreso);
  const desde = ingreso ? ` desde el ${ingreso}` : '';
  const ultimo = fechaLarga(d.ultimo) || '[fecha de tu último día]';
  const preaviso = { ley: ', cumpliendo con el preaviso que establece el Código de Trabajo', acuerdo: ', según lo acordado con ustedes', ninguno: '' }[d.preaviso] ?? ', cumpliendo con el preaviso que establece el Código de Trabajo';
  p(`Yo, ${ph(d.nombre, 'tu nombre completo')}, cédula de identidad ${ph(d.cedula, 'número de cédula')}, quien labora como ${ph(d.puesto, 'tu puesto')}${desde}, les comunico mi decisión de renunciar a mi puesto con efecto a partir del ${ultimo}${preaviso}.`);

  const partes = [];
  if (d.agradecimiento !== false) partes.push('Agradezco la oportunidad y el trato recibido durante este tiempo');
  if (d.traspaso !== false) partes.push('quedo en la mejor disposición de colaborar con el traspaso de mis funciones durante este período');
  if (partes.length) p(`${partes.join(', y ')}.`.replace(/^./, (c) => c.toUpperCase()));

  const pide = [];
  if (d.liquidacion !== false) pide.push('el detalle de mi liquidación');
  if (d.constancia !== false) pide.push('una constancia de trabajo');
  if (pide.length) p(`Solicito respetuosamente que se me entregue ${pide.join(' y ')}.`);

  p('Atentamente,');
  p(' ');
  p('______________________');
  p(ph(d.nombre, 'tu nombre completo'));
  p(`Cédula ${ph(d.cedula, 'número de cédula')}`);
  return b;
}

export const textoPlano = (bloques) => bloques.map((x) => x.t).join('\n\n');
export { docx };
export const nombreArchivoCarta = (d) => 'Carta-de-renuncia-' + (limpio(d?.nombre).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'TicoBrete');
