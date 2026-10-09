// Armador de currículum: lógica pura (sin DOM). Todo corre en el navegador; no se envía ningún dato.
const limpio = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const lineas = (s) => String(s ?? '').split(/\r?\n/).map((l) => l.replace(/^\s*[-•*·]\s*/, '').trim()).filter(Boolean);
const lista = (s) => String(s ?? '').split(/[\n,;]+/).map((x) => x.trim()).filter(Boolean);

/** Convierte los datos del formulario en bloques simples, en un orden que los ATS leen bien (una sola columna). */
export function construirBloques(d = {}) {
  const b = [];
  if (limpio(d.nombre)) b.push({ k: 'name', t: limpio(d.nombre) });
  if (limpio(d.puesto)) b.push({ k: 'title', t: limpio(d.puesto) });
  const contacto = [d.email, d.tel, d.ciudad, d.enlace].map(limpio).filter(Boolean);
  if (contacto.length) b.push({ k: 'contact', t: contacto.join(' | ') });

  if (limpio(d.resumen)) b.push({ k: 'h2', t: 'Perfil profesional' }, { k: 'p', t: limpio(d.resumen) });

  const exp = (d.exp || []).filter((e) => limpio(e.puesto) || limpio(e.empresa));
  if (exp.length) {
    b.push({ k: 'h2', t: 'Experiencia laboral' });
    for (const e of exp) {
      const fechas = [limpio(e.desde), limpio(e.hasta)].filter(Boolean).join(' – ');
      b.push({ k: 'job', a: [limpio(e.puesto), limpio(e.empresa)].filter(Boolean).join(' – '), b: [limpio(e.lugar), fechas].filter(Boolean).join(' | ') });
      for (const l of lineas(e.logros)) b.push({ k: 'bullet', t: l });
    }
  }

  const edu = (d.edu || []).filter((e) => limpio(e.titulo) || limpio(e.centro));
  if (edu.length) {
    b.push({ k: 'h2', t: 'Educación' });
    for (const e of edu) b.push({ k: 'job', a: [limpio(e.titulo), limpio(e.centro)].filter(Boolean).join(' – '), b: limpio(e.anio) });
  }

  const hab = lista(d.habilidades);
  if (hab.length) b.push({ k: 'h2', t: 'Habilidades' }, { k: 'p', t: hab.join(', ') });
  const idi = lineas(d.idiomas);
  if (idi.length) b.push({ k: 'h2', t: 'Idiomas' }, { k: 'p', t: idi.join(', ') });
  const cer = lineas(d.certs);
  if (cer.length) { b.push({ k: 'h2', t: 'Certificaciones y cursos' }); for (const c of cer) b.push({ k: 'bullet', t: c }); }
  return b;
}

export const nombreArchivo = (d) => 'Curriculum-' + (limpio(d?.nombre).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'TicoBrete');

/* ---------- Word (.docx) sin librerías ---------- */
const xml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const run = (t, o = {}) => `<w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>${o.bold ? '<w:b/>' : ''}${o.color ? `<w:color w:val="${o.color}"/>` : ''}<w:sz w:val="${o.size || 21}"/></w:rPr><w:t xml:space="preserve">${xml(t)}</w:t></w:r>`;
const par = (runs, o = {}) => `<w:p><w:pPr>${o.keep ? '<w:keepNext/>' : ''}${o.border ? '<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="444444"/></w:pBdr>' : ''}<w:spacing w:before="${o.before ?? 0}" w:after="${o.after ?? 60}"/>${o.center ? '<w:jc w:val="center"/>' : ''}${o.indent ? '<w:ind w:left="360" w:hanging="220"/>' : ''}</w:pPr>${runs}</w:p>`;

export function documentoXml(bloques) {
  const cuerpo = bloques.map((x) => {
    switch (x.k) {
      case 'name': return par(run(x.t, { bold: true, size: 36 }), { center: true, after: 40 });
      case 'title': return par(run(x.t, { size: 24 }), { center: true, after: 40 });
      case 'contact': return par(run(x.t, { size: 19 }), { center: true, after: 120 });
      case 'h2': return par(run(x.t.toUpperCase(), { bold: true, size: 22 }), { before: 200, after: 80, border: true, keep: true });
      case 'p': return par(run(x.t));
      case 'job': return par(run(x.a, { bold: true }) + (x.b ? run('   ' + x.b, { size: 19, color: '555555' }) : ''), { before: 100, keep: true });
      case 'bullet': return par(run('• ' + x.t), { indent: true, after: 30 });
      default: return '';
    }
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${cuerpo}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="850" w:right="1000" w:bottom="850" w:left="1000" w:header="0" w:footer="0" w:gutter="0"/></w:sectPr></w:body></w:document>`;
}

let TABLA;
function crc32(bytes) {
  if (!TABLA) TABLA = Uint32Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  let c = 0xffffffff;
  for (const x of bytes) c = TABLA[(c ^ x) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** ZIP sin compresión (método "store"), suficiente para un .docx. */
export function zip(archivos) {
  const enc = new TextEncoder();
  const partes = [];
  const central = [];
  let pos = 0;
  const u16 = (n) => [n & 255, (n >>> 8) & 255];
  const u32 = (n) => [n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255];
  for (const [nombre, texto] of archivos) {
    const n = enc.encode(nombre);
    const datos = enc.encode(texto);
    const crc = crc32(datos);
    const cab = [0x50, 0x4b, 3, 4, ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(crc), ...u32(datos.length), ...u32(datos.length), ...u16(n.length), ...u16(0)];
    partes.push(Uint8Array.from(cab), n, datos);
    central.push(Uint8Array.from([0x50, 0x4b, 1, 2, ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(crc), ...u32(datos.length), ...u32(datos.length), ...u16(n.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(pos)]), n);
    pos += cab.length + n.length + datos.length;
  }
  const tamCentral = central.reduce((a, p) => a + p.length, 0);
  const fin = Uint8Array.from([0x50, 0x4b, 5, 6, ...u16(0), ...u16(0), ...u16(archivos.length), ...u16(archivos.length), ...u32(tamCentral), ...u32(pos), ...u16(0)]);
  const todo = [...partes, ...central, fin];
  const salida = new Uint8Array(todo.reduce((a, p) => a + p.length, 0));
  let o = 0;
  for (const p of todo) { salida.set(p, o); o += p.length; }
  return salida;
}

export function docx(bloques) {
  return zip([
    ['[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'],
    ['_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'],
    ['word/document.xml', documentoXml(bloques)],
  ]);
}

export const EJEMPLO = {
  nombre: 'María Fernández Rojas',
  puesto: 'Asesora de servicio al cliente',
  email: 'maria.fernandez@correo.com',
  tel: '+506 8888-0000',
  ciudad: 'Heredia, Costa Rica',
  enlace: 'linkedin.com/in/mariafernandez',
  resumen: 'Persona orientada al servicio, con 3 años atendiendo clientes por teléfono y chat en español e inglés (B2). Me enfoco en resolver al primer contacto y mantener una calificación de satisfacción alta.',
  exp: [{ puesto: 'Agente de servicio al cliente', empresa: 'Empresa de ejemplo S.A.', lugar: 'Heredia', desde: 'Mar 2023', hasta: 'Actual', logros: 'Atendí en promedio 60 consultas diarias por teléfono y chat\nMantuve una satisfacción del cliente de 94 %\nCapacité a 5 compañeros nuevos en el uso del sistema de tickets' }],
  edu: [{ titulo: 'Bachillerato en Educación Media', centro: 'Colegio de ejemplo', anio: '2021' }],
  habilidades: 'Atención al cliente, Resolución de problemas, Excel, Zendesk, Trabajo en equipo',
  idiomas: 'Español: nativo\nInglés: intermedio alto (B2)',
  certs: 'Curso de servicio al cliente, INA (2022)',
};
