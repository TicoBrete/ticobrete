import { fold } from './util.mjs';

/** Lector CSV (RFC 4180): soporta comillas, comas y saltos de línea dentro de una celda. */
export function parseCsv(text = '') {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  const src = String(text).replace(/^\uFEFF/, '');
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"') {
        if (src[i + 1] === '"') { cell += '"'; i++; } else quoted = false;
      } else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some((x) => x.trim() !== '')) rows.push(row);
      row = [];
    } else cell += c;
  }
  row.push(cell);
  if (row.some((x) => x.trim() !== '')) rows.push(row);
  return rows;
}

/** Convierte filas en objetos usando la primera fila como encabezados (sin tildes ni mayúsculas). */
export function toObjects(rows) {
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => fold(h).replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim());
  return rows.slice(1).map((r) => Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? '').trim()])));
}

/** Busca el valor de la primera columna cuyo encabezado contenga alguno de los nombres. */
export function pick(obj, ...names) {
  for (const n of names) {
    const key = Object.keys(obj).find((k) => k === n) ?? Object.keys(obj).find((k) => k.includes(n));
    if (key && obj[key]) return obj[key];
  }
  return '';
}
