// Calculadoras laborales de TicoBrete. Todo corre en el navegador: no se envía ningún dato a ningún servidor.
// Las reglas siguen al Código de Trabajo y a las publicaciones del MTSS (preaviso, cesantía, aguinaldo, horas extra y feriados).

// Días de salario de cesantía por cada año de trabajo, según el MTSS. Del año 13 en adelante son 20.
export const TABLA_CESANTIA = [19.5, 20, 20.5, 21, 21.24, 21.5, 22, 22, 22, 21.5, 21, 20.5, 20];

export const colones = (n) => '₡' + Math.round(Number.isFinite(n) ? n : 0).toLocaleString('es-CR');
const num = (v) => {
  const n = Number(String(v ?? '').replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : 0;
};

/** Aguinaldo = (salarios ordinarios y extraordinarios del período) ÷ 12. El período va del 1 de diciembre al 30 de noviembre. */
export function aguinaldo({ mensual, meses = 12, extras = 0 }) {
  const m = Math.min(12, num(meses));
  const total = num(mensual) * m + num(extras);
  return { total, aguinaldo: total / 12, meses: m };
}

/** Meses (con fracción) entre dos fechas. */
export function mesesEntre(inicio, fin) {
  if (!(inicio instanceof Date) || !(fin instanceof Date) || Number.isNaN(+inicio) || Number.isNaN(+fin) || fin < inicio) return 0;
  const m = (fin.getFullYear() - inicio.getFullYear()) * 12 + (fin.getMonth() - inicio.getMonth()) + (fin.getDate() - inicio.getDate()) / 30;
  return Math.max(0, m);
}

/** Preaviso en días: menos de 3 meses no hay; 3 a 6 meses, 1 semana; 6 a 12 meses, 15 días; más de un año, 1 mes. */
export function diasPreaviso(meses) {
  if (meses < 3) return 0;
  if (meses < 6) return 7;
  if (meses < 12) return 15;
  return 30;
}

/** Cesantía en días de salario, según la tabla del MTSS (máximo los últimos 8 años). */
export function diasCesantia(meses) {
  if (meses < 3) return 0;
  if (meses < 6) return 7;
  if (meses < 12) return 14;
  const completos = Math.floor(meses / 12);
  const fraccion = meses - completos * 12;
  const anios = completos + (fraccion > 6 ? 1 : 0);
  let dias = 0;
  for (let i = Math.max(1, anios - 7); i <= anios; i++) dias += TABLA_CESANTIA[Math.min(i, 13) - 1];
  return dias;
}

export function inicioPeriodoAguinaldo(fin) {
  const anio = fin.getMonth() === 11 ? fin.getFullYear() : fin.getFullYear() - 1;
  return new Date(anio, 11, 1);
}

/** Vacaciones en días: 2 semanas (14 días) si ya se cumplieron 50 semanas; si no, al menos un día por mes trabajado. */
export function diasVacaciones(meses) {
  if (meses * 4.345 >= 50) return 14;
  return Math.floor(meses);
}

export function liquidacion({ salario, inicio, fin, causa = 'despido', preavisoDado = false, mesesVacaciones = 0 }) {
  const sal = num(salario);
  const dia = sal / 30;
  const meses = mesesEntre(inicio, fin);
  const lineas = [];
  const notas = [];

  const periodo = inicioPeriodoAguinaldo(fin);
  const mesesAguinaldo = Math.min(12, mesesEntre(inicio > periodo ? inicio : periodo, fin));
  lineas.push({ rubro: 'Aguinaldo proporcional', detalle: `${mesesAguinaldo.toFixed(1)} meses del período ÷ 12`, monto: (sal * mesesAguinaldo) / 12 });

  const dv = diasVacaciones(num(mesesVacaciones));
  lineas.push({ rubro: 'Vacaciones pendientes o proporcionales', detalle: `${dv} día(s) × valor de un día`, monto: dv * dia });

  if (causa === 'despido') {
    const dp = diasPreaviso(meses);
    if (dp > 0 && !preavisoDado) lineas.push({ rubro: 'Preaviso (no se dio en tiempo)', detalle: `${dp} día(s) de salario`, monto: dp * dia });
    else if (dp > 0) notas.push('Como te dieron el preaviso, no se paga en dinero.');
    const dc = diasCesantia(meses);
    if (dc > 0) lineas.push({ rubro: 'Cesantía', detalle: `${dc.toLocaleString('es-CR')} día(s) de salario`, monto: dc * dia });
    else notas.push('Con menos de 3 meses de trabajo no hay cesantía ni preaviso.');
  } else if (causa === 'renuncia') {
    const dp = diasPreaviso(meses);
    if (dp > 0 && !preavisoDado) notas.push(`Al renunciar debías dar ${dp} día(s) de preaviso. Según el MTSS, el empleador no puede rebajarlo de tus prestaciones; solo podría reclamarlo por la vía judicial.`);
    notas.push('Al renunciar, normalmente no corresponde cesantía.');
  } else {
    notas.push('Con despido por justa causa, normalmente no corresponden preaviso ni cesantía. Revisá que la causa sea real y esté demostrada.');
  }

  const total = lineas.reduce((a, l) => a + l.monto, 0);
  return { meses, lineas, notas, total };
}

/** Horas extra: tiempo y medio. En feriado, las horas extra se pagan a tiempo y medio doble (triple). */
export function horasExtra({ mensual, jornada = 'diurna', extras = 0, extrasFeriado = 0, feriados = 0 }) {
  const horasDia = jornada === 'nocturna' ? 6 : 8;
  const dia = num(mensual) / 30;
  const hora = dia / horasDia;
  const pagoExtras = num(extras) * hora * 1.5;
  const pagoExtrasFeriado = num(extrasFeriado) * hora * 3;
  const pagoFeriado = num(feriados) * dia;
  return { dia, hora, horaExtra: hora * 1.5, horaExtraFeriado: hora * 3, pagoExtras, pagoExtrasFeriado, pagoFeriado, total: pagoExtras + pagoExtrasFeriado + pagoFeriado };
}

export function vacaciones({ semanas, salario }) {
  const s = num(semanas);
  const meses = s / 4.345;
  const dias = diasVacaciones(meses);
  const dia = num(salario) / 30;
  return { semanas: s, dias, dia, monto: dias * dia, faltan: Math.max(0, 50 - s) };
}

/* ---------- Pantalla ---------- */
const $ = (root, sel) => root.querySelector(sel);

function fila(rubro, detalle, monto) {
  const tr = document.createElement('tr');
  for (const [txt, cls] of [[rubro], [detalle, 'muted'], [monto, 'monto']]) {
    const td = document.createElement('td');
    td.textContent = txt;
    if (cls) td.className = cls;
    tr.append(td);
  }
  return tr;
}

function tabla(filas, totalTxt) {
  const t = document.createElement('table');
  t.className = 'data-table calc-table';
  const tb = document.createElement('tbody');
  for (const f of filas) tb.append(fila(...f));
  t.append(tb);
  if (totalTxt) {
    const tr = fila('Total aproximado', '', totalTxt);
    tr.className = 'total';
    tb.append(tr);
  }
  return t;
}

function parrafo(texto, cls) {
  const p = document.createElement('p');
  p.textContent = texto;
  if (cls) p.className = cls;
  return p;
}

const val = (form, name) => form.elements[name]?.value;

const RENDER = {
  aguinaldo(form) {
    const r = aguinaldo({ mensual: val(form, 'mensual'), meses: val(form, 'meses') || 12, extras: val(form, 'extras') });
    if (!r.total) return [parrafo('Escribí tu salario mensual para calcular.', 'muted')];
    return [
      tabla([
        ['Salarios del período', `${colones(num(val(form, 'mensual')))} × ${r.meses} meses + extras`, colones(r.total)],
        ['Dividido entre 12', 'Fórmula del aguinaldo', colones(r.aguinaldo)],
      ], colones(r.aguinaldo)),
      parrafo('Si tu salario cambió durante el año o ganás comisiones, sumá todo lo que realmente ganaste entre el 1 de diciembre y el 30 de noviembre y dividilo entre 12.', 'muted'),
    ];
  },
  liquidacion(form) {
    const inicio = new Date(val(form, 'inicio'));
    const fin = new Date(val(form, 'fin'));
    if (!num(val(form, 'salario')) || Number.isNaN(+inicio) || Number.isNaN(+fin)) return [parrafo('Completá el salario y las dos fechas para calcular.', 'muted')];
    if (fin < inicio) return [parrafo('La fecha de salida debe ser posterior a la de ingreso.', 'muted')];
    const r = liquidacion({ salario: val(form, 'salario'), inicio, fin, causa: val(form, 'causa'), preavisoDado: form.elements.preaviso?.checked, mesesVacaciones: val(form, 'mesesVac') });
    const anios = Math.floor(r.meses / 12);
    const m = Math.floor(r.meses - anios * 12);
    return [
      parrafo(`Tiempo de servicio: ${anios} año(s) y ${m} mes(es).`),
      tabla(r.lineas.map((l) => [l.rubro, l.detalle, colones(l.monto)]), colones(r.total)),
      ...r.notas.map((n) => parrafo(n, 'muted')),
      parrafo('No incluye salarios ni horas extra pendientes. Es un cálculo de referencia: el real usa el promedio de tus salarios de los últimos seis meses.', 'muted'),
    ];
  },
  horas(form) {
    const r = horasExtra({ mensual: val(form, 'mensual'), jornada: val(form, 'jornada'), extras: val(form, 'extras'), extrasFeriado: val(form, 'extrasFeriado'), feriados: val(form, 'feriados') });
    if (!r.dia) return [parrafo('Escribí tu salario mensual para calcular.', 'muted')];
    const filas = [
      ['Valor de un día', 'Salario mensual ÷ 30', colones(r.dia)],
      ['Valor de una hora ordinaria', `Día ÷ ${val(form, 'jornada') === 'nocturna' ? 6 : 8} horas`, colones(r.hora)],
      ['Valor de una hora extra', 'Hora × 1,5 (tiempo y medio)', colones(r.horaExtra)],
    ];
    if (num(val(form, 'extras'))) filas.push(['Pago por horas extra', `${num(val(form, 'extras'))} hora(s) × ${colones(r.horaExtra)}`, colones(r.pagoExtras)]);
    if (num(val(form, 'extrasFeriado'))) filas.push(['Horas extra en feriado', `${num(val(form, 'extrasFeriado'))} hora(s) × ${colones(r.horaExtraFeriado)} (pago triple)`, colones(r.pagoExtrasFeriado)]);
    if (num(val(form, 'feriados'))) filas.push(['Feriados trabajados', `${num(val(form, 'feriados'))} día(s) × un día sencillo adicional`, colones(r.pagoFeriado)]);
    return [tabla(filas, colones(r.total)), parrafo('Para personas con pago mensual o quincenal. Si te pagan por semana o por día, las reglas del feriado cambian: revisá el comunicado del MTSS.', 'muted')];
  },
  vacaciones(form) {
    const r = vacaciones({ semanas: val(form, 'semanas'), salario: val(form, 'salario') });
    if (!r.semanas) return [parrafo('Escribí cuántas semanas llevás trabajando para calcular.', 'muted')];
    const filas = [
      ['Semanas trabajadas', 'Desde tu ingreso o tus últimas vacaciones', String(r.semanas)],
      ['Días de vacaciones', r.semanas >= 50 ? 'Ya cumpliste 50 semanas: 2 semanas (14 días)' : 'Mínimo legal: 1 día por mes trabajado', String(r.dias)],
    ];
    if (num(val(form, 'salario'))) filas.push(['Valor aproximado', `${r.dias} día(s) × ${colones(r.dia)}`, colones(r.monto)]);
    return [tabla(filas), parrafo(r.faltan > 0 ? `Te faltan ${r.faltan.toFixed(0)} semanas para cumplir las 50 y llegar a las dos semanas completas.` : 'Ya tenés derecho a tus dos semanas completas.', 'muted')];
  },
};

export function iniciar(doc = document) {
  for (const form of doc.querySelectorAll('form[data-calc]')) {
    const render = RENDER[form.dataset.calc];
    const out = form.parentElement.querySelector('[data-resultado]');
    if (!render || !out) continue;
    const pintar = () => {
      out.replaceChildren(...render(form));
      out.hidden = false;
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      pintar();
      out.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
    form.addEventListener('input', () => { if (!out.hidden) pintar(); });
    form.addEventListener('reset', () => setTimeout(() => { out.hidden = true; out.replaceChildren(); }, 0));
  }
}

if (typeof document !== 'undefined' && document.querySelector('form[data-calc]')) iniciar();
