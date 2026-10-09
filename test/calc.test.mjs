import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aguinaldo, diasCesantia, diasPreaviso, diasVacaciones, horasExtra, inicioPeriodoAguinaldo, liquidacion, mesesEntre, vacaciones } from '../site/assets/calc.js';

const d = (s) => new Date(`${s}T12:00:00`);

test('aguinaldo: un año completo con el mismo salario es un mes de salario', () => {
  assert.equal(aguinaldo({ mensual: 400000, meses: 12 }).aguinaldo, 400000);
});

test('aguinaldo: proporcional y con horas extra', () => {
  assert.equal(Math.round(aguinaldo({ mensual: 400000, meses: 7 }).aguinaldo), 233333);
  assert.equal(aguinaldo({ mensual: 400000, meses: 12, extras: 120000 }).aguinaldo, 410000);
});

test('aguinaldo: ignora valores raros', () => {
  assert.equal(aguinaldo({ mensual: -5, meses: 99 }).aguinaldo, 0);
  assert.equal(aguinaldo({ mensual: 'abc' }).aguinaldo, 0);
  assert.equal(aguinaldo({ mensual: 120000, meses: 20 }).meses, 12);
});

test('meses entre fechas', () => {
  assert.equal(mesesEntre(d('2024-01-15'), d('2026-01-15')), 24);
  assert.equal(mesesEntre(d('2026-01-01'), d('2025-01-01')), 0);
  assert.equal(Math.round(mesesEntre(d('2025-01-01'), d('2025-07-01'))), 6);
});

test('preaviso según el MTSS', () => {
  assert.equal(diasPreaviso(2), 0);
  assert.equal(diasPreaviso(3), 7);
  assert.equal(diasPreaviso(5.9), 7);
  assert.equal(diasPreaviso(6), 15);
  assert.equal(diasPreaviso(11), 15);
  assert.equal(diasPreaviso(12), 30);
  assert.equal(diasPreaviso(60), 30);
});

test('cesantía según la tabla del MTSS', () => {
  assert.equal(diasCesantia(2), 0);
  assert.equal(diasCesantia(4), 7);
  assert.equal(diasCesantia(8), 14);
  assert.equal(diasCesantia(12), 19.5);
  assert.equal(diasCesantia(15), 19.5); // la fracción de 3 meses no cuenta
  assert.equal(diasCesantia(24), 39.5);
  assert.equal(diasCesantia(20), 39.5); // 1 año y 8 meses: la fracción mayor a 6 meses cuenta como año
  assert.equal(diasCesantia(36), 19.5 + 20 + 20.5);
});

test('cesantía: máximo los últimos 8 años', () => {
  const t = [19.5, 20, 20.5, 21, 21.24, 21.5, 22, 22, 22, 21.5];
  const ocho = t.slice(0, 8).reduce((a, b) => a + b, 0);
  assert.equal(diasCesantia(96), ocho); // 8 años exactos
  const ultimos = t.slice(2, 10).reduce((a, b) => a + b, 0); // años 3 a 10
  assert.ok(Math.abs(diasCesantia(120) - ultimos) < 1e-9); // 10 años
});

test('vacaciones: 14 días con 50 semanas; si no, un día por mes', () => {
  assert.equal(diasVacaciones(12), 14);
  assert.equal(diasVacaciones(11.6), 14);
  assert.equal(diasVacaciones(5.4), 5);
  assert.equal(diasVacaciones(0.5), 0);
  const r = vacaciones({ semanas: 50, salario: 300000 });
  assert.equal(r.dias, 14);
  assert.equal(Math.round(r.monto), 140000);
  assert.equal(vacaciones({ semanas: 20, salario: 300000 }).dias, 4);
});

test('horas extra: tiempo y medio y pago triple en feriado', () => {
  const r = horasExtra({ mensual: 480000, jornada: 'diurna', extras: 10, extrasFeriado: 2, feriados: 1 });
  assert.equal(r.dia, 16000);
  assert.equal(r.hora, 2000);
  assert.equal(r.horaExtra, 3000);
  assert.equal(r.pagoExtras, 30000);
  assert.equal(r.pagoExtrasFeriado, 12000);
  assert.equal(r.pagoFeriado, 16000);
  assert.equal(r.total, 58000);
  assert.equal(horasExtra({ mensual: 480000, jornada: 'nocturna' }).hora, 16000 / 6);
});

test('período del aguinaldo: del 1 de diciembre al 30 de noviembre', () => {
  assert.equal(inicioPeriodoAguinaldo(d('2026-10-09')).toISOString().slice(0, 10), '2025-12-01');
  assert.equal(inicioPeriodoAguinaldo(d('2026-12-10')).toISOString().slice(0, 10), '2026-12-01');
});

test('liquidación del ejemplo de la guía (2 años, despido sin preaviso)', () => {
  const r = liquidacion({ salario: 500000, inicio: d('2024-10-09'), fin: d('2026-10-09'), causa: 'despido', preavisoDado: false, mesesVacaciones: 5 });
  const por = Object.fromEntries(r.lineas.map((l) => [l.rubro, l.monto]));
  assert.equal(Math.round(por['Cesantía']), 658333);
  assert.equal(Math.round(por['Preaviso (no se dio en tiempo)']), 500000);
  assert.equal(Math.round(por['Vacaciones pendientes o proporcionales']), 83333);
  assert.ok(por['Aguinaldo proporcional'] > 0);
});

test('liquidación: renuncia no incluye cesantía y justa causa tampoco', () => {
  const base = { salario: 500000, inicio: d('2023-01-10'), fin: d('2026-10-09'), mesesVacaciones: 3 };
  const ren = liquidacion({ ...base, causa: 'renuncia' });
  assert.ok(!ren.lineas.some((l) => /Cesant/.test(l.rubro)));
  const jc = liquidacion({ ...base, causa: 'justa-causa' });
  assert.ok(!jc.lineas.some((l) => /Cesant|Preaviso/.test(l.rubro)));
  const conPreaviso = liquidacion({ ...base, causa: 'despido', preavisoDado: true });
  assert.ok(!conPreaviso.lineas.some((l) => /Preaviso/.test(l.rubro)));
});
