// Calculadoras laborales. El cálculo corre en el navegador (site/assets/calc.js) y no se envía ningún dato.
const AVISO = `<aside class="note"><strong>Cálculo de referencia, no asesoría legal.</strong> El resultado es aproximado y no sustituye el cálculo que haga tu empleador ni el del MTSS. Tus datos no salen de tu dispositivo. Última revisión: 9 de octubre de 2026.</aside>`;

const campo = (etiqueta, nombre, extra = '', ayuda = '') =>
  `<label class="field"><span>${etiqueta}</span><input name="${nombre}" ${extra}>${ayuda ? `<small>${ayuda}</small>` : ''}</label>`;
const numero = (etiqueta, nombre, ayuda = '', extra = '') => campo(etiqueta, nombre, `type="number" inputmode="decimal" min="0" step="any" ${extra}`, ayuda);
const botones = '<div class="calc-actions"><button class="btn btn-primary" type="submit">Calcular</button><button class="btn btn-ghost" type="reset">Limpiar</button></div>';

export const GUIAS_CALC = [
  {
    slug: 'calculadora-aguinaldo-costa-rica',
    tipo: 'calculadora',
    title: 'Calculadora de aguinaldo en Costa Rica 2026',
    description: 'Calculá tu aguinaldo en Costa Rica con la fórmula del MTSS: los salarios del 1 de diciembre al 30 de noviembre entre 12. Incluye proporcional y horas extra.',
    h1: 'Calculadora de aguinaldo en Costa Rica',
    lead: 'Escribí tu salario y los meses que trabajaste, y te mostramos tu aguinaldo con la fórmula oficial. Sirve también para el aguinaldo proporcional.',
    date: '2026-10-09',
    html: `
${AVISO}
<section class="calc-box">
  <form class="calc" data-calc="aguinaldo" novalidate>
    <div class="calc-grid">
      ${numero('Salario mensual (₡)', 'mensual', 'Si cambió, usá un promedio.', 'required')}
      ${numero('Meses trabajados en el período', 'meses', 'Del 1 de diciembre al 30 de noviembre. Máximo 12.', 'value="12" max="12"')}
      ${numero('Horas extra, comisiones y otros ingresos (₡)', 'extras', 'El total ganado en todo el período. Dejalo en 0 si no tuviste.', 'value="0"')}
    </div>
    ${botones}
  </form>
  <div class="calc-result" data-resultado aria-live="polite" hidden></div>
</section>

<h2>Cómo se calcula</h2>
<p>El aguinaldo se calcula así: <strong>todos los salarios ordinarios y extraordinarios que ganaste del 1 de diciembre al 30 de noviembre, divididos entre 12</strong>. Se paga a más tardar el 20 de diciembre en el sector privado.</p>
<ul>
  <li>Si trabajaste los 12 meses con el mismo salario, tu aguinaldo es <strong>un mes de salario</strong>.</li>
  <li>Si trabajaste menos meses, el aguinaldo es <strong>proporcional</strong>.</li>
  <li>Las <strong>horas extra y las comisiones</strong> también suman.</li>
</ul>

<h2>Ejemplo</h2>
<p>Con un salario de ₡400.000 durante 7 meses (de mayo a noviembre): ₡400.000 × 7 = ₡2.800.000; entre 12 = <strong>₡233.333</strong>.</p>

<h2>También te puede servir</h2>
<ul>
  <li>La <a href="{ROOT}guias/aguinaldo-costa-rica/">guía del aguinaldo</a>: fechas, qué hacer si no te pagan y cómo denunciar.</li>
  <li>La <a href="https://www.mtss.go.cr/buscador/Aguinaldo.aspx" target="_blank" rel="noopener">calculadora oficial del MTSS</a>, para confirmar tu monto.</li>
  <li>La <a href="{ROOT}guias/calculadora-liquidacion-laboral-costa-rica/">calculadora de liquidación</a>, si estás por dejar tu trabajo.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Cuándo me pagan el aguinaldo?</h3>
<p>A más tardar el 20 de diciembre en el sector privado. Si trabajás en el sector público, las fechas y reglas pueden variar.</p>
<h3>¿Cuenta lo que ganó por horas extra?</h3>
<p>Sí. Sumalo en el campo de horas extra, comisiones y otros ingresos.</p>
<h3>¿Y si trabajé solo unos meses?</h3>
<p>Escribí cuántos meses trabajaste en el período y la calculadora te da el monto proporcional.</p>
`,
  },
  {
    slug: 'calculadora-liquidacion-laboral-costa-rica',
    tipo: 'calculadora',
    title: 'Calculadora de liquidación laboral en Costa Rica',
    description: 'Calculá tu liquidación laboral en Costa Rica: cesantía, preaviso, vacaciones y aguinaldo proporcional según las tablas del MTSS.',
    h1: 'Calculadora de liquidación laboral',
    lead: 'Si te despidieron o vas a renunciar, calculá cuánto te corresponde de cesantía, preaviso, vacaciones y aguinaldo proporcional.',
    date: '2026-10-09',
    html: `
${AVISO}
<section class="calc-box">
  <form class="calc" data-calc="liquidacion" novalidate>
    <div class="calc-grid">
      ${numero('Salario mensual promedio (₡)', 'salario', 'El promedio de tus últimos 6 meses, con horas extra y comisiones.', 'required')}
      ${campo('Fecha de ingreso', 'inicio', 'type="date" required')}
      ${campo('Fecha de salida', 'fin', 'type="date" required')}
      <label class="field"><span>¿Cómo terminó tu trabajo?</span>
        <select name="causa">
          <option value="despido">Despido sin justa causa</option>
          <option value="renuncia">Renuncia</option>
          <option value="justa-causa">Despido con justa causa</option>
        </select>
      </label>
      ${numero('Meses desde tus últimas vacaciones', 'mesesVac', 'O desde que ingresaste, si nunca las tomaste.', 'value="0"')}
      <label class="field check"><input type="checkbox" name="preaviso"><span>Me dieron (o di) el preaviso completo, en tiempo</span></label>
    </div>
    ${botones}
  </form>
  <div class="calc-result" data-resultado aria-live="polite" hidden></div>
</section>

<h2>Qué calcula</h2>
<ul>
  <li><strong>Cesantía:</strong> solo si el empleador te despide sin justa causa. Se calcula con la tabla del MTSS, con un máximo de los últimos ocho años.</li>
  <li><strong>Preaviso:</strong> 1 semana (3 a 6 meses), 15 días (6 a 12 meses) o 1 mes (más de un año), si no se dio en tiempo.</li>
  <li><strong>Vacaciones:</strong> al menos un día por mes desde tus últimas vacaciones, o dos semanas si ya cumpliste 50 semanas.</li>
  <li><strong>Aguinaldo proporcional</strong> del período en curso.</li>
</ul>

<h2>Lo que no incluye</h2>
<p>No suma salarios ni horas extra pendientes, ni otros beneficios de tu contrato. El cálculo real usa el promedio de los salarios de los últimos seis meses y tu antigüedad exacta. Usalo como una guía para revisar el finiquito que te presenten.</p>

<h2>Para entender cada rubro</h2>
<ul>
  <li><a href="{ROOT}guias/despido-cesantia-preaviso-costa-rica/">Despido, preaviso y cesantía</a>, con la tabla oficial.</li>
  <li><a href="{ROOT}guias/liquidacion-laboral-finiquito-costa-rica/">Liquidación laboral: qué incluye</a>, con un ejemplo paso a paso.</li>
  <li><a href="{ROOT}guias/vacaciones-costa-rica/">Vacaciones</a> y <a href="{ROOT}guias/aguinaldo-costa-rica/">aguinaldo</a>.</li>
  <li><a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">Cómo denunciar</a> si no te pagan lo que corresponde.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Por qué no sale cesantía si renuncié?</h3>
<p>La cesantía se paga cuando la relación termina con responsabilidad del empleador, como un despido sin justa causa. Consultá tu caso al MTSS.</p>
<h3>¿Qué salario debo usar?</h3>
<p>El promedio de los salarios ordinarios y extraordinarios de tus últimos seis meses.</p>
<h3>¿Puedo firmar el finiquito con este resultado?</h3>
<p>Usalo para comparar. Pedí el desglose por escrito y consultá al MTSS si algo no cuadra: 800-TRABAJO (800 872 2256).</p>
`,
  },
  {
    slug: 'calculadora-horas-extra-costa-rica',
    tipo: 'calculadora',
    title: 'Calculadora de horas extra en Costa Rica',
    description: 'Calculá cuánto te deben pagar por horas extra en Costa Rica (tiempo y medio) y por trabajar un feriado (pago doble y triple). Valor de tu hora, de tu día y total a recibir.',
    h1: 'Calculadora de horas extra y feriados',
    lead: 'Sabé cuánto vale tu hora, cuánto te corresponde por tiempo extra y qué pasa si trabajás un feriado.',
    date: '2026-10-09',
    html: `
${AVISO}
<section class="calc-box">
  <form class="calc" data-calc="horas" novalidate>
    <div class="calc-grid">
      ${numero('Salario mensual (₡)', 'mensual', 'Para pago mensual o quincenal.', 'required')}
      <label class="field"><span>Tu jornada</span>
        <select name="jornada">
          <option value="diurna">Diurna (8 horas al día)</option>
          <option value="nocturna">Nocturna (6 horas al día)</option>
        </select>
      </label>
      ${numero('Horas extra en días normales', 'extras', '', 'value="0"')}
      ${numero('Horas extra trabajadas en un feriado', 'extrasFeriado', 'Se pagan a tiempo y medio doble (pago triple).', 'value="0"')}
      ${numero('Días feriados trabajados', 'feriados', 'Para quien tiene pago mensual o quincenal, se agrega un día sencillo.', 'value="0"')}
    </div>
    ${botones}
  </form>
  <div class="calc-result" data-resultado aria-live="polite" hidden></div>
</section>

<h2>Cómo se calcula</h2>
<ol>
  <li><strong>Valor del día</strong> = salario mensual ÷ 30.</li>
  <li><strong>Valor de la hora ordinaria</strong> = valor del día ÷ horas de tu jornada (8 si es diurna, 6 si es nocturna).</li>
  <li><strong>Hora extra</strong> = hora ordinaria × 1,5 (un 50 % más).</li>
  <li><strong>Hora extra en feriado</strong> = hora ordinaria × 3 (tiempo y medio doble).</li>
  <li><strong>Feriado trabajado</strong>: quien gana por mes ya recibe el feriado en su salario, y si lo trabaja se le agrega el pago de un día sencillo.</li>
</ol>

<h2>Ejemplo</h2>
<p>Con ₡480.000 al mes y jornada diurna: el día vale ₡16.000 y la hora ₡2.000. Cada hora extra vale ₡3.000; 10 horas extra son ₡30.000.</p>

<h2>Más información</h2>
<ul>
  <li><a href="{ROOT}guias/horas-extra-feriados-costa-rica/">Horas extra y feriados: guía completa</a>, con la lista de feriados 2026.</li>
  <li><a href="{ROOT}guias/derechos-laborales-costa-rica/">Derechos laborales básicos</a>.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Cuánto es el máximo de horas extra?</h3>
<p>En general, la jornada ordinaria más las horas extra no debe pasar de 12 horas al día.</p>
<h3>¿Y si me pagan por semana o por día?</h3>
<p>Las reglas para el pago del feriado cambian según cómo te pagan. Revisá los comunicados del MTSS.</p>
`,
  },
  {
    slug: 'calculadora-vacaciones-costa-rica',
    tipo: 'calculadora',
    title: 'Calculadora de vacaciones en Costa Rica',
    description: 'Calculá cuántos días de vacaciones llevás en Costa Rica (2 semanas por cada 50 trabajadas, o un día por mes si todavía no las cumplís) y cuánto representan en dinero.',
    h1: 'Calculadora de vacaciones',
    lead: 'Contá cuántas semanas llevás trabajando y mirá cuántos días de vacaciones te corresponden.',
    date: '2026-10-09',
    html: `
${AVISO}
<section class="calc-box">
  <form class="calc" data-calc="vacaciones" novalidate>
    <div class="calc-grid">
      ${numero('Semanas trabajadas', 'semanas', 'Desde tu ingreso o desde tus últimas vacaciones.', 'required')}
      ${numero('Salario mensual (₡), opcional', 'salario', 'Para calcular cuánto representan en dinero.', '')}
    </div>
    ${botones}
  </form>
  <div class="calc-result" data-resultado aria-live="polite" hidden></div>
</section>

<h2>Cómo se calcula</h2>
<ul>
  <li>Con <strong>50 semanas</strong> de trabajo continuo (unos 11 meses y medio), te corresponden <strong>dos semanas</strong> de vacaciones pagadas (14 días).</li>
  <li>Si dejás el trabajo antes de las 50 semanas, te corresponde <strong>al menos un día por cada mes trabajado</strong>.</li>
  <li>El valor aproximado de un día es tu <strong>salario mensual ÷ 30</strong>.</li>
</ul>

<h2>Más información</h2>
<ul>
  <li><a href="{ROOT}guias/vacaciones-costa-rica/">Vacaciones en Costa Rica: guía completa</a>.</li>
  <li><a href="{ROOT}guias/calculadora-liquidacion-laboral-costa-rica/">Calculadora de liquidación</a>, si estás por dejar tu trabajo.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Cuántos días de vacaciones tengo por año?</h3>
<p>Como mínimo, dos semanas por cada 50 semanas de trabajo continuo. Muchas empresas dan más.</p>
<h3>¿Puedo tomarme las vacaciones por partes?</h3>
<p>Dependen de lo que acordés con tu empleador, siempre respetando el descanso al que tenés derecho.</p>
`,
  },
];
