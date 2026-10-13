// Calculadoras laborales de TicoBrete. Todo corre en el navegador: no se envía ningún dato a ningún servidor.
// Las reglas siguen al Código de Trabajo y a las publicaciones del MTSS (preaviso, cesantía, aguinaldo, horas extra y feriados).

// Días de salario de cesantía por cada año de trabajo, según el MTSS. Del año 13 en adelante son 20.
export const TABLA_CESANTIA = [19.5, 20, 20.5, 21, 21.24, 21.5, 22, 22, 22, 21.5, 21, 20.5, 20];

export const colones = (n) => '₡' + String(Math.round(Number.isFinite(n) ? n : 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
  lineas.push({ rubro: 'Aguinaldo proporcional', detalle: `${mesesAguinaldo.toFixed(1).replace('.', ',')} meses del período ÷ 12`, monto: (sal * mesesAguinaldo) / 12 });

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
    if (dp > 0 && !preavisoDado) notas.push(`Al renunciar debías dar ${dp} día(s) de preaviso. Según el art. 28, tu empleador podría reclamarte ese monto, pero pierde el derecho si no lo reclama en 30 días (art. 32). Si te lo rebajan, consultá al MTSS.`);
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

/** Salario neto 2026: CCSS obrera 10,83 % (SEM 5,50 + IVM 4,33 + Banco Popular 1,00) y renta sobre el salario bruto (Decreto 45333-H). */
export const CCSS_OBRERA = 0.1083;
export const TRAMOS_RENTA = [[918000, 0], [1347000, 0.10], [2364000, 0.15], [4727000, 0.20], [Infinity, 0.25]];
export const CREDITO_HIJO = 1710;
export const CREDITO_CONYUGE = 2590;

export function salarioNeto({ bruto, hijos = 0, conyuge = false }) {
  const b = num(bruto);
  const ccss = b * CCSS_OBRERA;
  let bruta = 0;
  let desde = 0;
  for (const [hasta, tasa] of TRAMOS_RENTA) {
    if (b > desde) bruta += (Math.min(b, hasta) - desde) * tasa;
    desde = hasta;
  }
  const creditos = bruta > 0 ? Math.min(bruta, Math.floor(num(hijos)) * CREDITO_HIJO + (conyuge ? CREDITO_CONYUGE : 0)) : 0;
  const renta = bruta - creditos;
  return { bruto: b, ccss, rentaBruta: bruta, creditos, renta, neto: b - ccss - renta };
}
/** Costo mensual de una persona empleada (para empresas): cargas patronales 2026 y provisiones de aguinaldo y vacaciones. */
export const CARGAS_PATRONALES = 0.2683;
export const CARGAS_PATRONALES_SIN_INA = 0.2533;

export function costoEmpleado({ salario, sinIna = false, aguinaldo = true, vacaciones = true }) {
  const s = num(salario);
  const cargas = s * (sinIna ? CARGAS_PATRONALES_SIN_INA : CARGAS_PATRONALES);
  const ag = aguinaldo ? s / 12 : 0;
  const vac = vacaciones ? s / 24 : 0;
  const total = s + cargas + ag + vac;
  return { salario: s, cargas, aguinaldo: ag, vacaciones: vac, total, anual: total * 12, factor: s ? total / s : 0 };
}
/** Incapacidad por enfermedad común: el patrono paga 50 % de los primeros 3 días y desde el día 4 la CCSS paga un subsidio del 60 % del promedio de los últimos 3 meses. */
export function incapacidad({ salario, dias, cotizo = true, conceptoPatrono = 0.5 }) {
  const s = num(salario);
  const d = Math.floor(num(dias));
  const dia = s / 30;
  const diasPatrono = Math.min(d, 3);
  const diasCcss = Math.max(0, d - 3);
  const patrono = diasPatrono * dia * conceptoPatrono;
  const ccss = cotizo ? diasCcss * dia * 0.6 : 0;
  const normal = d * dia;
  return { dia, dias: d, diasPatrono, diasCcss, patrono, ccss, total: patrono + ccss, normal, diferencia: normal - (patrono + ccss) };
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
  neto(form) {
    const r = salarioNeto({ bruto: val(form, 'bruto'), hijos: val(form, 'hijos'), conyuge: form.elements.conyuge?.checked });
    if (!r.bruto) return [parrafo('Escribí tu salario bruto mensual para calcular.', 'muted')];
    const filas = [
      ['Salario bruto', 'Antes de deducciones', colones(r.bruto)],
      ['CCSS y Banco Popular', '10,83 % (SEM 5,50 + IVM 4,33 + Banco Popular 1,00)', '− ' + colones(r.ccss)],
      ['Impuesto sobre el salario', r.rentaBruta ? (r.creditos ? `Tramos 2026, menos créditos fiscales de ${colones(r.creditos)}` : 'Tramos de renta 2026') : 'Tu salario está en el tramo exento (hasta ₡918.000)', '− ' + colones(r.renta)],
    ];
    return [tabla(filas, null), tabla([['Salario neto aproximado', 'Lo que te depositan al mes', colones(r.neto)]], null), parrafo('No incluye otras deducciones (préstamos, asociaciones, seguros voluntarios ni pensión complementaria voluntaria). Si ganás menos de ₡346.789 la CCSS usa una base mínima; revisá tu colilla.', 'muted')];
  },  costo(form) {
    const r = costoEmpleado({ salario: val(form, 'salario'), sinIna: form.elements.sinIna?.checked, aguinaldo: form.elements.aguinaldo?.checked, vacaciones: form.elements.vacaciones?.checked });
    if (!r.salario) return [parrafo('Escribí el salario bruto mensual para calcular.', 'muted')];
    const filas = [
      ['Salario bruto', 'Lo pactado con la persona', colones(r.salario)],
      ['Cargas sociales patronales', form.elements.sinIna?.checked ? '25,33 % (sin aporte al INA)' : '26,83 %', colones(r.cargas)],
    ];
    if (r.aguinaldo) filas.push(['Provisión de aguinaldo', 'Un mes de salario por año ÷ 12', colones(r.aguinaldo)]);
    if (r.vacaciones) filas.push(['Provisión de vacaciones', 'Referencia: 4,17 % del salario', colones(r.vacaciones)]);
    return [
      tabla(filas, null),
      tabla([['Costo mensual total', `Equivale a ${r.factor.toFixed(2).replace('.', ',')} veces el salario`, colones(r.total)], ['Costo anual aproximado', 'Costo mensual × 12', colones(r.anual)]], null),
      parrafo('No incluye cesantía, incapacidades, horas extra, comisiones, equipo ni otros beneficios. La persona recibe el salario neto, no el costo total.', 'muted'),
    ];
  },  incapacidad(form) {
    const r = incapacidad({ salario: val(form, 'salario'), dias: val(form, 'dias'), cotizo: form.elements.cotizo?.checked });
    if (!r.dia || !r.dias) return [parrafo('Escribí tu salario mensual y los días de incapacidad para calcular.', 'muted')];
    const filas = [['Valor de un día', 'Salario mensual ÷ 30', colones(r.dia)]];
    if (r.diasPatrono) filas.push(['Paga el patrono', `${r.diasPatrono} día(s) al 50 %`, colones(r.patrono)]);
    if (r.diasCcss) filas.push(['Paga la CCSS', form.elements.cotizo?.checked ? `${r.diasCcss} día(s) al 60 %` : 'Sin subsidio: no cumplís el requisito de cotización', colones(r.ccss)]);
    return [
      tabla(filas, colones(r.total)),
      parrafo(`Con salario normal habrías recibido ${colones(r.normal)} por esos días: la diferencia es de ${colones(r.diferencia)}.`),
      parrafo('El subsidio de la CCSS se calcula sobre el promedio de tus últimos 3 meses de salario reportado; usá ese promedio como salario. Algunas empresas completan el pago hasta el 100 %: preguntalo. Si fue un accidente de trabajo, paga el INS (60 % del salario diario durante los primeros 45 días).', 'muted'),
    ];
  },  liquidacion(form) {
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
