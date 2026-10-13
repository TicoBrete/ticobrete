// Guías de octubre 2026: deducciones del salario, feriados 2027, salario mínimo por ocupación y renuncia.
// Datos verificados contra: CCSS (cuotas 2026), Decreto 45333-H (renta 2026), Decreto 45303-MTSS y lista de salarios mínimos 2026 (MTSS), Código de Trabajo arts. 28 y 148.
const AVISO = `<aside class="note"><strong>Información general, no asesoría legal ni contable.</strong> Las tarifas y los montos cambian cada año. Para tu caso concreto, consultá al MTSS, a la CCSS, a Hacienda o a una persona profesional. Última revisión de esta guía: 13 de octubre de 2026.</aside>`;

export const GUIAS_NUEVAS = [
  {
    slug: 'salario-bruto-neto-deducciones-costa-rica',
    title: 'Salario bruto y neto en Costa Rica: deducciones CCSS y renta 2026',
    description: 'Qué te rebajan del salario en Costa Rica en 2026: CCSS (10,83 %) e impuesto sobre la renta, con tramos, créditos fiscales y ejemplos de salario neto.',
    h1: 'Salario bruto y neto en Costa Rica: qué te rebajan en 2026',
    lead: 'Te ofrecen un salario y a fin de mes te llega menos. Así se calcula la diferencia entre el salario bruto y el neto, con las tarifas vigentes en 2026.',
    date: '2026-10-13',
    html: `
${AVISO}
<h2>Bruto y neto: la diferencia</h2>
<p>El <strong>salario bruto</strong> es el monto pactado antes de descuentos. El <strong>salario neto</strong> es lo que realmente te depositan después de las deducciones de ley. Cuando una oferta dice "₡600.000", casi siempre es el bruto. Podés calcular el tuyo con la <a href="{ROOT}guias/calculadora-salario-neto-costa-rica/">calculadora de salario neto</a>.</p>

<h2>Lo que te descuentan a vos: la CCSS</h2>
<p>Desde el 1 de enero de 2026, las personas trabajadoras asalariadas aportan un <strong>10,83 %</strong> de su salario bruto:</p>
<table class="data-table">
  <thead><tr><th>Concepto</th><th>Porcentaje</th></tr></thead>
  <tbody>
    <tr><td>Seguro de Salud y Maternidad (SEM)</td><td>5,50 %</td></tr>
    <tr><td>Invalidez, Vejez y Muerte (IVM)</td><td>4,33 %</td></tr>
    <tr><td>Banco Popular (Ley de Protección al Trabajador)</td><td>1,00 %</td></tr>
    <tr><td><strong>Total</strong></td><td><strong>10,83 %</strong></td></tr>
  </tbody>
</table>
<p>El aporte al IVM subió de 4,17 % a 4,33 % en 2026, y según la CCSS esa tarifa rige hasta el 31 de diciembre de 2028. Este dinero financia tu seguro de salud y tu pensión.</p>

<h2>El impuesto sobre el salario</h2>
<p>Además de la CCSS, si ganás más de cierto monto se te retiene impuesto sobre la renta. Según el Decreto 45333-H, los tramos mensuales para 2026 son:</p>
<table class="data-table">
  <thead><tr><th>Salario bruto mensual</th><th>Tarifa</th></tr></thead>
  <tbody>
    <tr><td>Hasta ₡918.000</td><td>Exento</td></tr>
    <tr><td>De ₡918.000 a ₡1.347.000</td><td>10 %</td></tr>
    <tr><td>De ₡1.347.000 a ₡2.364.000</td><td>15 %</td></tr>
    <tr><td>De ₡2.364.000 a ₡4.727.000</td><td>20 %</td></tr>
    <tr><td>Más de ₡4.727.000</td><td>25 %</td></tr>
  </tbody>
</table>
<p>La tarifa se aplica <strong>solo al pedazo de salario que cae en cada tramo</strong>, no a todo el salario. Si ganás ₡1.000.000, solo se grava lo que pasa de ₡918.000.</p>

<h2>Créditos fiscales: lo que te podés restar</h2>
<p>Si tenés cónyuge o hijos a cargo, podés pedirle a tu patrono que te aplique <strong>créditos fiscales</strong>, que se restan directamente del impuesto ya calculado (no del salario):</p>
<ul>
  <li><strong>₡1.710 al mes por cada hijo.</strong></li>
  <li><strong>₡2.590 al mes por el cónyuge.</strong></li>
</ul>
<p>Para pedirlos, normalmente hay que presentar una declaración o formulario a tu patrono. Consultalo con Recursos Humanos o en el sitio de Hacienda.</p>

<h2>Ejemplos de salario neto</h2>
<p>Sin créditos fiscales y con las tarifas de 2026:</p>
<table class="data-table">
  <thead><tr><th>Salario bruto</th><th>CCSS (10,83 %)</th><th>Impuesto</th><th>Salario neto</th></tr></thead>
  <tbody>
    <tr><td>₡500.000</td><td>₡54.150</td><td>₡0</td><td>₡445.850</td></tr>
    <tr><td>₡800.000</td><td>₡86.640</td><td>₡0</td><td>₡713.360</td></tr>
    <tr><td>₡1.000.000</td><td>₡108.300</td><td>₡8.200</td><td>₡883.500</td></tr>
    <tr><td>₡2.000.000</td><td>₡216.600</td><td>₡140.850</td><td>₡1.642.550</td></tr>
  </tbody>
</table>
<p>Los resultados son aproximados y pueden variar unos colones según cómo redondee tu patrono.</p>

<h2>Lo que paga tu patrono (y no se te rebaja)</h2>
<p>Tu patrono paga aparte unas cargas sociales de <strong>26,83 %</strong> sobre tu salario (CCSS, FODESAF, INA, IMAS, Banco Popular, pensión complementaria, entre otras). Ese dinero <strong>no sale de tu sueldo</strong>: es un costo de la empresa que financia, por ejemplo, tu pensión complementaria. Si te quieren pagar "por fuera" para no pagar esas cargas, perdés cotización para tu pensión y tu seguro.</p>

<h2>Salarios muy bajos y la base mínima contributiva</h2>
<p>La CCSS usa una base mínima para calcular las cuotas: para salarios menores a ₡346.789 en el seguro de salud (SEM) y a ₡324.590 en pensión (IVM), la cuota se calcula sobre esos montos, salvo algunas excepciones (por ejemplo, ingreso o salida a mitad de mes, o trabajar con varios patronos). Si ganás poco, revisá tu colilla y consultá a la CCSS.</p>

<h2>Qué hacer si lo que te rebajan no cuadra</h2>
<ol>
  <li>Pedí tu <strong>colilla de pago</strong> y revisá que cada rebajo tenga nombre y monto.</li>
  <li>Verificá en la <strong>CCSS</strong> (Oficina Virtual o en una sucursal) que tu patrono te reporte con el salario real.</li>
  <li>Si te rebajan por otras razones (préstamos, multas, uniformes), recordá que las deducciones del salario tienen límites legales. Consultá al MTSS.</li>
  <li>Si no te reportan o te reportan menos, mirá la <a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">guía para denunciar</a>.</li>
</ol>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.ccss.sa.cr/patronos" target="_blank" rel="noopener">CCSS: cuotas obrero-patronales y base mínima contributiva</a></li>
  <li><a href="https://sinalevi.go.cr/ResultadosNormativa/Informacion?param1=105834&param2=148657&param3=1&param4=" target="_blank" rel="noopener">Decreto Ejecutivo 45333-H: tramos de renta y créditos fiscales 2026 (SINALEVI)</a></li>
  <li><a href="https://www.hacienda.go.cr/docs/TramosRenta2026.pdf" target="_blank" rel="noopener">Hacienda: tramos de renta 2026</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿La CCSS se rebaja antes o después del impuesto?</h3>
<p>Los tramos de renta de salarios se aplican sobre el salario bruto. Por eso la CCSS no reduce la base del impuesto, y el ejemplo de arriba lo calcula así.</p>
<h3>¿Las horas extra y las comisiones también tienen rebajos?</h3>
<p>Sí. Todo lo que forma parte de tu salario (incluidas horas extra y comisiones) suma al salario bruto del mes. Mirá la guía de <a href="{ROOT}guias/horas-extra-feriados-costa-rica/">horas extra y feriados</a>.</p>
<h3>¿El aguinaldo tiene rebajos?</h3>
<p>El aguinaldo está exento de cargas sociales y de impuesto sobre la renta. Mirá la <a href="{ROOT}guias/aguinaldo-costa-rica/">guía del aguinaldo</a>.</p>
<h3>¿Cambian estas tarifas cada año?</h3>
<p>Los tramos de renta se actualizan cada enero. La CCSS ya programó aumentos al IVM hasta 2028 y otro cambio en 2029. Por eso esta guía se revisa cada año.</p>
`,
  },
  {
    slug: 'feriados-2027-costa-rica',
    title: 'Feriados 2027 en Costa Rica: lista y cómo se pagan',
    description: 'Calendario de feriados 2027 en Costa Rica: 12 fechas, cuáles son de pago obligatorio y no obligatorio, y cuánto te pagan si trabajás ese día.',
    h1: 'Feriados 2027 en Costa Rica',
    lead: 'La lista completa de feriados del próximo año, qué día cae cada uno y cómo se pagan si te toca trabajar.',
    date: '2026-10-13',
    html: `
${AVISO}
<h2>Calendario de feriados 2027</h2>
<p>Según el artículo 148 del Código de Trabajo, Costa Rica tiene <strong>12 feriados al año</strong>: 9 de pago obligatorio y 3 de pago no obligatorio. En 2027 caen así:</p>
<table class="data-table">
  <thead><tr><th>Fecha</th><th>Día</th><th>Feriado</th><th>Pago</th></tr></thead>
  <tbody>
    <tr><td>1 de enero</td><td>Viernes</td><td>Año Nuevo</td><td>Obligatorio</td></tr>
    <tr><td>25 de marzo</td><td>Jueves</td><td>Jueves Santo</td><td>Obligatorio</td></tr>
    <tr><td>26 de marzo</td><td>Viernes</td><td>Viernes Santo</td><td>Obligatorio</td></tr>
    <tr><td>11 de abril</td><td>Domingo</td><td>Día de Juan Santamaría</td><td>Obligatorio</td></tr>
    <tr><td>1 de mayo</td><td>Sábado</td><td>Día Internacional del Trabajo</td><td>Obligatorio</td></tr>
    <tr><td>25 de julio</td><td>Domingo</td><td>Anexión del Partido de Nicoya</td><td>Obligatorio</td></tr>
    <tr><td>2 de agosto</td><td>Lunes</td><td>Día de la Virgen de los Ángeles</td><td>No obligatorio</td></tr>
    <tr><td>15 de agosto</td><td>Domingo</td><td>Día de la Madre</td><td>Obligatorio</td></tr>
    <tr><td>31 de agosto</td><td>Martes</td><td>Día de la Persona Negra y la Cultura Afrocostarricense</td><td>No obligatorio</td></tr>
    <tr><td>15 de setiembre</td><td>Miércoles</td><td>Día de la Independencia</td><td>Obligatorio</td></tr>
    <tr><td>1 de diciembre</td><td>Miércoles</td><td>Día de la Abolición del Ejército</td><td>No obligatorio</td></tr>
    <tr><td>25 de diciembre</td><td>Sábado</td><td>Navidad</td><td>Obligatorio</td></tr>
  </tbody>
</table>
<p>Pasar una fecha a otro día depende de la ley vigente: <strong>hoy los feriados se disfrutan en su fecha</strong>. Hubo una ley de traslados a los lunes entre 2020 y 2024 que ya terminó. Si se aprueba una nueva, actualizaremos esta guía, así que revisá los comunicados del MTSS cuando se acerque cada fecha.</p>

<h2>Fines de semana largos en 2027</h2>
<ul>
  <li><strong>Año Nuevo:</strong> viernes 1 de enero (viernes a domingo).</li>
  <li><strong>Semana Santa:</strong> jueves 25 y viernes 26 de marzo (jueves a domingo).</li>
  <li><strong>2 de agosto:</strong> lunes (sábado a lunes).</li>
</ul>
<p>Varios feriados caen en fin de semana (11 de abril, 1 de mayo, 25 de julio, 15 de agosto y 25 de diciembre), así que no generan día libre adicional entre semana.</p>

<h2>Pago obligatorio y no obligatorio: la diferencia</h2>
<ul>
  <li><strong>De pago obligatorio:</strong> el empleador debe pagarlo aunque no se trabaje. Si trabajás ese día, te corresponde pago doble.</li>
  <li><strong>De pago no obligatorio:</strong> si no lo trabajás, el empleador no está obligado a pagarlo (salvo que tu contrato diga otra cosa o te paguen por mes). Si lo trabajás, se paga como un día normal.</li>
</ul>
<p>Para quienes cobran por mes o por quincena, el feriado normalmente ya está incluido en el salario. El detalle de cómo se paga cada caso, con ejemplos y cálculo, está en la guía de <a href="{ROOT}guias/horas-extra-feriados-costa-rica/">horas extra y feriados</a> y en la <a href="{ROOT}guias/calculadora-horas-extra-costa-rica/">calculadora de horas extra y feriados</a>.</p>

<h2>Derechos que no cambian</h2>
<ul>
  <li><strong>Es un derecho de todas las personas trabajadoras</strong> disfrutar del feriado, según el MTSS, sin importar la actividad.</li>
  <li><strong>Nadie está obligado a trabajar un feriado</strong> salvo las excepciones que prevé el Código de Trabajo (por ejemplo, servicios que no pueden interrumpirse).</li>
  <li><strong>El MTSS publica un comunicado</strong> antes de cada feriado explicando cómo se paga. Es la mejor referencia si tenés dudas.</li>
</ul>

<h2>Cómo planear tus vacaciones con los feriados</h2>
<p>Con 2027 ya a la vuelta, conviene pensar en tus vacaciones: unir el Jueves y Viernes Santo con unos días extra, o el 2 de agosto, te da más días libres con menos vacaciones. Recordá que son un derecho: mirá la guía de <a href="{ROOT}guias/vacaciones-costa-rica/">vacaciones</a>.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="http://www.pgrweb.go.cr/DOCS/NORMAS/1/NOVIGEN/L/1940-1949/1940-1944/1943/1F6D/149416.HTML" target="_blank" rel="noopener">Código de Trabajo, art. 148 (PGR)</a></li>
  <li><a href="https://www.mtss.go.cr/temas-laborales/feriados/feriados_calendario_2026.pdf" target="_blank" rel="noopener">MTSS: calendario de feriados (2026, como referencia del formato oficial)</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Cuántos feriados hay en 2027?</h3>
<p>12: nueve de pago obligatorio y tres de pago no obligatorio.</p>
<h3>¿Se trasladan al lunes?</h3>
<p>No, según la ley vigente se disfrutan en su fecha. Hay proyectos de ley sobre traslados, pero no están aprobados. Si cambia, lo actualizamos.</p>
<h3>¿Cuánto me pagan si trabajo el 25 de diciembre?</h3>
<p>Es un feriado de pago obligatorio: si lo trabajás, te corresponde pago doble. Mirá la guía de <a href="{ROOT}guias/horas-extra-feriados-costa-rica/">horas extra y feriados</a>.</p>
<h3>¿El 2 de agosto, el 31 de agosto y el 1 de diciembre se pagan?</h3>
<p>Son de pago no obligatorio. Quien cobra por mes ya lo tiene dentro de su salario.</p>
`,
  },
  {
    slug: 'salario-minimo-por-ocupacion-costa-rica',
    title: 'Salario mínimo por ocupación en Costa Rica 2026: lista',
    description: 'Lista de salarios mínimos 2026 por ocupación en Costa Rica: salonero, cocinero, seguridad, ventas, bodega, conductor y más, con el monto oficial del MTSS.',
    h1: 'Salario mínimo por ocupación en Costa Rica (2026)',
    lead: 'En Costa Rica no hay un solo salario mínimo: depende de la ocupación. Acá tenés los montos oficiales de los oficios más comunes y cómo leerlos.',
    date: '2026-10-13',
    html: `
${AVISO}
<h2>Cómo leer la lista oficial</h2>
<p>El Consejo Nacional de Salarios fija cada año los mínimos para el sector privado, y el decreto (en 2026, el <strong>Decreto 45303-MTSS</strong>) los clasifica en niveles: <strong>no calificada, semicalificada, calificada y especializada</strong>, y también por estudios (técnico, diplomado, bachiller y licenciatura). Rige desde el 1 de enero de 2026, con un aumento general de 1,63 %.</p>
<p>La lista del MTSS indica, para cada puesto, si el mínimo es <strong>por día</strong> (los montos sin asterisco) o <strong>por mes</strong> (los marcados con asterisco).</p>

<h2>Montos por nivel de ocupación</h2>
<table class="data-table">
  <thead><tr><th>Nivel</th><th>Por jornada (día)</th><th>Por mes (genérico)</th></tr></thead>
  <tbody>
    <tr><td>No calificada</td><td>₡12.436,41</td><td>₡373.092,30</td></tr>
    <tr><td>Semicalificada</td><td>₡13.523,69</td><td>₡405.710,70</td></tr>
    <tr><td>Calificada</td><td>₡13.991,86</td><td>₡419.755,80</td></tr>
    <tr><td>Especializada</td><td>₡16.244,50</td><td>₡487.335,00</td></tr>
  </tbody>
</table>

<h2>Por nivel de estudios (mensual)</h2>
<table class="data-table">
  <thead><tr><th>Nivel</th><th>Mínimo mensual</th></tr></thead>
  <tbody>
    <tr><td>Técnico medio de educación diversificada</td><td>₡496.838,17</td></tr>
    <tr><td>Técnico de educación superior</td><td>₡542.096,58</td></tr>
    <tr><td>Diplomado universitario</td><td>₡585.484,58</td></tr>
    <tr><td>Bachiller universitario</td><td>₡664.078,07</td></tr>
    <tr><td>Licenciado universitario</td><td>₡796.921,00</td></tr>
  </tbody>
</table>

<h2>Puestos comunes: servicios, ventas y oficina</h2>
<table class="data-table">
  <thead><tr><th>Puesto</th><th>Nivel</th><th>Mínimo</th></tr></thead>
  <tbody>
    <tr><td>Salonero (mesero)</td><td>No calificada</td><td>₡12.436,41 por día</td></tr>
    <tr><td>Pilero (lavador de platos)</td><td>No calificada</td><td>₡12.436,41 por día</td></tr>
    <tr><td>Ayudante de cocina</td><td>Semicalificada</td><td>₡13.523,69 por día</td></tr>
    <tr><td>Cocinero</td><td>Calificada</td><td>₡13.991,86 por día</td></tr>
    <tr><td>Barista</td><td>Calificada</td><td>₡13.991,86 por día</td></tr>
    <tr><td>Chef</td><td>Especializada</td><td>₡16.244,50 por día</td></tr>
    <tr><td>Dependiente</td><td>Semicalificada</td><td>₡13.523,69 por día</td></tr>
    <tr><td>Cajero</td><td>Calificada</td><td>₡419.755,80 por mes</td></tr>
    <tr><td>Agente de ventas</td><td>Calificada</td><td>₡419.755,80 por mes</td></tr>
    <tr><td>Recepcionista</td><td>Semicalificada</td><td>₡405.710,70 por mes</td></tr>
    <tr><td>Telefonista</td><td>Semicalificada</td><td>₡405.710,70 por mes</td></tr>
    <tr><td>Oficinista (general)</td><td>Semicalificada</td><td>₡405.710,70 por mes</td></tr>
    <tr><td>Digitador</td><td>Calificada</td><td>₡13.991,86 por día</td></tr>
    <tr><td>Conserje</td><td>No calificada</td><td>₡373.092,30 por mes</td></tr>
  </tbody>
</table>

<h2>Seguridad, bodega y transporte</h2>
<table class="data-table">
  <thead><tr><th>Puesto</th><th>Nivel</th><th>Mínimo</th></tr></thead>
  <tbody>
    <tr><td>Agente de seguridad</td><td>Semicalificada</td><td>₡405.710,70 por mes</td></tr>
    <tr><td>Monitoreador de cámaras</td><td>Semicalificada</td><td>₡405.710,70 por mes</td></tr>
    <tr><td>Bodeguero (peón)</td><td>No calificada</td><td>₡373.092,30 por mes</td></tr>
    <tr><td>Bodeguero (encargado)</td><td>Semicalificada</td><td>₡405.710,70 por mes</td></tr>
    <tr><td>Montacarguista</td><td>Semicalificada</td><td>₡13.523,69 por día</td></tr>
    <tr><td>Empacador o etiquetador (manual)</td><td>No calificada</td><td>₡12.436,41 por día</td></tr>
    <tr><td>Peón de carga y descarga</td><td>No calificada</td><td>₡12.436,41 por día</td></tr>
    <tr><td>Mensajero</td><td>No calificada</td><td>₡373.092,30 por mes</td></tr>
    <tr><td>Conductor de vehículo liviano</td><td>Semicalificada</td><td>₡13.523,69 por día</td></tr>
    <tr><td>Conductor de vehículo pesado</td><td>Calificada</td><td>₡13.991,86 por día</td></tr>
    <tr><td>Conductor de tráiler</td><td>Especializada</td><td>₡16.244,50 por día</td></tr>
  </tbody>
</table>

<h2>Construcción y oficios</h2>
<table class="data-table">
  <thead><tr><th>Puesto</th><th>Nivel</th><th>Mínimo por día</th></tr></thead>
  <tbody>
    <tr><td>Peón de construcción</td><td>No calificada</td><td>₡12.436,41</td></tr>
    <tr><td>Albañil</td><td>Calificada</td><td>₡13.991,86</td></tr>
    <tr><td>Electricista</td><td>Calificada</td><td>₡13.991,86</td></tr>
    <tr><td>Soldador (en general)</td><td>Calificada</td><td>₡13.991,86</td></tr>
    <tr><td>Pintor de brocha gorda</td><td>Calificada</td><td>₡13.991,86</td></tr>
    <tr><td>Mecánico general</td><td>Calificada</td><td>₡13.991,86</td></tr>
  </tbody>
</table>

<h2>Trabajo doméstico</h2>
<p>El trabajo doméstico tiene su propio mínimo: <strong>₡268.731,31 al mes</strong>, que seguirá subiendo por encima del aumento general para igualarse con los demás, según el Consejo Nacional de Salarios.</p>

<h2>Cosas que conviene saber</h2>
<ul>
  <li><strong>Son montos brutos</strong>, antes de las deducciones de la CCSS y del impuesto. Mirá la guía de <a href="{ROOT}guias/salario-bruto-neto-deducciones-costa-rica/">salario bruto y neto</a>.</li>
  <li><strong>Son mínimos:</strong> tu empleador puede pagar más, pero no menos.</li>
  <li><strong>La clasificación depende de las tareas reales</strong>, no solo del nombre del puesto. La propia lista del MTSS aclara que es una guía ilustrativa y que un puesto puede clasificarse distinto según sus responsabilidades.</li>
  <li><strong>Si trabajás medio tiempo</strong>, el salario es proporcional a las horas.</li>
  <li><strong>El MTSS puede ajustar un nivel a mitad de año</strong>, así que si pasa el tiempo, confirmá en el sitio oficial.</li>
</ul>

<h2>Si te pagan menos del mínimo</h2>
<p>Guardá tu contrato o mensajes, tus colillas y registros de horario, y consultá al MTSS: 800-TRABAJO (800 872 2256). Mirá la <a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">guía para denunciar</a> y la de <a href="{ROOT}guias/salario-minimo-costa-rica/">salario mínimo</a> en general.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.mtss.go.cr/temas-laborales/salarios/lista_salarios_minimos_2026.pdf" target="_blank" rel="noopener">MTSS: lista de salarios mínimos por ocupación 2026</a></li>
  <li><a href="https://www.mtss.go.cr/temas-laborales/salarios/salario_minimo.html" target="_blank" rel="noopener">MTSS: salarios mínimos</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Cuál es el salario mínimo más bajo en Costa Rica?</h3>
<p>El del trabajo doméstico (₡268.731,31 al mes) es una categoría especial. Para el resto, el piso es la ocupación no calificada: ₡12.436,41 por día o ₡373.092,30 al mes.</p>
<h3>¿Cuándo cambia el salario mínimo?</h3>
<p>Cada año el Consejo Nacional de Salarios define el aumento, y el decreto rige desde el 1 de enero. El de 2027 se conoce hacia finales de 2026.</p>
<h3>¿Mi puesto no aparece en la lista?</h3>
<p>La lista no incluye todos los puestos. Se clasifica según las tareas. Consultalo en el MTSS.</p>
`,
  },
  {
    slug: 'como-renunciar-carta-renuncia-costa-rica',
    title: 'Cómo renunciar en Costa Rica: carta, preaviso y qué te pagan',
    description: 'Cómo renunciar bien en Costa Rica: carta de renuncia con ejemplo, preaviso, qué te deben pagar (vacaciones y aguinaldo) y por qué normalmente no hay cesantía.',
    h1: 'Cómo renunciar en Costa Rica: carta, preaviso y pago',
    lead: 'Renunciar bien te cuida el bolsillo y la reputación. Esto es lo que tenés que hacer, lo que te deben pagar y un modelo de carta.',
    date: '2026-10-13',
    html: `
${AVISO}
<h2>Antes de renunciar</h2>
<ol>
  <li><strong>Revisá tu contrato</strong>: puede tener condiciones sobre el aviso o sobre pactos de confidencialidad o de no competencia.</li>
  <li><strong>Calculá lo que te corresponde</strong> con la <a href="{ROOT}guias/calculadora-liquidacion-laboral-costa-rica/">calculadora de liquidación</a>.</li>
  <li><strong>Pensá en el momento</strong>: el aguinaldo se paga en diciembre, y si renunciás antes de recibirlo te pagan el proporcional.</li>
  <li><strong>Asegurá tu siguiente trabajo</strong> si podés, antes de dejar el actual.</li>
</ol>

<h2>El preaviso: avisar con tiempo</h2>
<p>El artículo 28 del Código de Trabajo establece que cuando una persona trabajadora decide terminar su contrato, debe dar <strong>preaviso por escrito</strong>, y los plazos son los mismos que se exigen al empleador:</p>
<table class="data-table">
  <thead><tr><th>Tiempo trabajado</th><th>Preaviso</th></tr></thead>
  <tbody>
    <tr><td>Menos de 3 meses</td><td>No hay preaviso</td></tr>
    <tr><td>De 3 a 6 meses</td><td>1 semana</td></tr>
    <tr><td>De 6 meses a 1 año</td><td>15 días</td></tr>
    <tr><td>Más de 1 año</td><td>1 mes</td></tr>
  </tbody>
</table>
<p>Durante el preaviso la relación laboral sigue normalmente: seguís trabajando y cobrando. Según criterios del MTSS, también tenés derecho a un <strong>día libre por semana</strong> durante el preaviso para buscar otro trabajo.</p>
<p>El mismo artículo 28 dice que el aviso puede omitirse <strong>pagándole a la otra parte una cantidad igual al salario</strong> de esos plazos. O sea: si no avisás, el empleador podría reclamarte ese monto. Pero según el artículo 32, el patrono pierde ese derecho si <strong>no lo reclama dentro de los 30 días</strong> siguientes a que terminó tu contrato. Si te lo quieren rebajar de tu liquidación, consultá antes al MTSS.</p>

<h2>Cómo escribir la carta de renuncia</h2>
<p>Una carta corta y respetuosa es suficiente. No necesitás explicar tus razones. Incluí tu nombre y cédula, el puesto, la fecha de la carta, el último día de trabajo y tu firma. Hacela <strong>en dos copias</strong> y pedí que firmen y fechen la tuya como recibida.</p>
<blockquote>
<p>San José, 15 de noviembre de 2026</p>
<p>Señores<br>[Nombre de la empresa]<br>Presente</p>
<p>Estimados señores:</p>
<p>Yo, [nombre completo], cédula de identidad [número], quien labora como [puesto] desde el [fecha de ingreso], les comunico mi decisión de renunciar a mi puesto a partir del [fecha del último día], cumpliendo con el preaviso de ley.</p>
<p>Agradezco la oportunidad y el trato recibido, y quedo en la mejor disposición de colaborar con el traspaso de mis funciones durante este período. Solicito que se me entregue el detalle de mi liquidación y la constancia de trabajo.</p>
<p>Atentamente,<br>[Firma]<br>[Nombre completo]</p>
</blockquote>

<h2>Qué te deben pagar al renunciar</h2>
<p>Al renunciar, normalmente te corresponde:</p>
<ul>
  <li><strong>Salario pendiente</strong> hasta tu último día, incluidas horas extra.</li>
  <li><strong>Vacaciones pendientes o proporcionales.</strong> Mirá la guía de <a href="{ROOT}guias/vacaciones-costa-rica/">vacaciones</a>.</li>
  <li><strong>Aguinaldo proporcional</strong> del período en curso (del 1 de diciembre hasta tu salida). Mirá la <a href="{ROOT}guias/aguinaldo-costa-rica/">guía del aguinaldo</a>.</li>
</ul>
<p>La <strong>cesantía</strong> se paga cuando el empleador termina el contrato sin justa causa; <strong>al renunciar, normalmente no te corresponde</strong>. Hay excepciones, como cuando la renuncia se da por causas atribuibles al empleador, o cuando tu contrato o convención colectiva lo dispone. Mirá la guía de <a href="{ROOT}guias/despido-cesantia-preaviso-costa-rica/">despido, preaviso y cesantía</a>.</p>

<h2>Después de renunciar</h2>
<ol>
  <li><strong>Revisá el finiquito antes de firmar</strong> y pedí el desglose por escrito. Mirá la guía de <a href="{ROOT}guias/liquidacion-laboral-finiquito-costa-rica/">liquidación laboral</a>.</li>
  <li><strong>Pedí tu constancia de trabajo.</strong> El artículo 35 del Código dice que el patrono debe darte, si la pedís, un certificado con la fecha de entrada y salida y la clase de trabajo que hiciste.</li>
  <li><strong>Verificá con la CCSS</strong> que te hayan reportado hasta tu último día.</li>
  <li><strong>Devolvé lo que sea de la empresa</strong> (equipo, carné, llaves) y pedí constancia de que lo entregaste.</li>
</ol>

<h2>Si no te pagan lo que corresponde</h2>
<p>Guardá la carta con la firma de recibido, tus colillas y el detalle de tu liquidación, y consultá al MTSS: 800-TRABAJO (800 872 2256). Mirá la <a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">guía para denunciar</a>.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://mtss.hermes-soft.com/temas-laborales/07_Preaviso_cesantia_ind.pdf" target="_blank" rel="noopener">MTSS: preaviso y cesantía</a></li>
  <li><a href="https://escuelajudicialpj.poder-judicial.go.cr/Archivos/bibliotecaVirtual/otrasPublicaciones/brochures/Preaviso%20y%20Cesantia.pdf" target="_blank" rel="noopener">Poder Judicial: preaviso y cesantía</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Tengo que explicar por qué renuncio?</h3>
<p>No. Una carta breve, sin motivos, es suficiente.</p>
<h3>¿Qué pasa si no doy el preaviso?</h3>
<p>Tu empleador podría reclamarte el salario de esos días, pero pierde ese derecho si no lo reclama en 30 días. Si te quieren rebajar dinero, consultá al MTSS antes de firmar.</p>
<h3>¿Me pueden negar la renuncia?</h3>
<p>No. Es un derecho tuyo terminar el contrato avisando como corresponde.</p>
<h3>¿Puedo renunciar por WhatsApp?</h3>
<p>Mejor por escrito y con firma de recibido, o por correo con confirmación. Es la prueba de la fecha en que avisaste.</p>
`,
  },
  {
    slug: 'tipos-de-contrato-periodo-de-prueba-costa-rica',
    title: 'Tipos de contrato y período de prueba en Costa Rica',
    description: 'Contrato indefinido, a plazo fijo y por obra en Costa Rica: qué dice el Código de Trabajo, cuándo debe ser escrito, el período de prueba y qué revisar antes de firmar.',
    h1: 'Tipos de contrato y período de prueba en Costa Rica',
    lead: 'Antes de firmar conviene saber qué tipo de contrato te ofrecen y qué derechos tenés desde el primer día, incluso en el período de prueba.',
    date: '2026-10-13',
    html: `
${AVISO}
<h2>Qué es un contrato de trabajo</h2>
<p>Según el artículo 18 del Código de Trabajo, hay contrato de trabajo cuando una persona presta servicios a otra <strong>bajo su dependencia permanente y dirección</strong>, a cambio de una remuneración. Además, la ley <strong>presume que existe</strong> ese contrato entre quien trabaja y quien recibe el servicio. Si trabajás con horario, órdenes y un jefe, tenés una relación laboral aunque te digan "contratista" o "por servicios profesionales".</p>

<h2>¿Tiene que ser por escrito?</h2>
<p>Como regla general, sí. El artículo 23 dice que, salvo excepciones, el contrato debe hacerse <strong>por escrito en tres copias</strong>: una para cada parte y otra que el patrono hace llegar al Ministerio de Trabajo. Puede ser verbal en casos como las labores agrícolas o ganaderas y los trabajos accidentales o temporales de hasta 90 días (en ese caso el patrono debe darte, cada 30 días y si lo pedís, una constancia por escrito de los días trabajados y lo pagado).</p>
<p>Si no hay contrato escrito cuando debería haberlo, <strong>la falta se le imputa al patrono</strong> (art. 25). Aun sin papel, tus derechos existen: el contrato verbal se prueba con testigos, mensajes, colillas o depósitos. Guardá todo.</p>

<h2>Qué debe decir el contrato</h2>
<p>Según el artículo 24, el contrato escrito incluye al menos:</p>
<ul>
  <li>Los datos de las dos partes.</li>
  <li>Si es <strong>por tiempo indefinido, a plazo fijo o para obra determinada</strong>.</li>
  <li>La <strong>jornada y el horario</strong>.</li>
  <li>El <strong>salario</strong>, cómo se calcula y cuándo y dónde se paga.</li>
  <li>El <strong>lugar</strong> donde se trabaja, la fecha y las firmas.</li>
</ul>

<h2>Los tipos de contrato</h2>
<h3>Por tiempo indefinido</h3>
<p>Es la regla general: no tiene fecha de fin. Termina por renuncia, despido, mutuo acuerdo u otra causa legal. Si te despiden sin justa causa, tenés derecho a preaviso y cesantía. Mirá la guía de <a href="{ROOT}guias/despido-cesantia-preaviso-costa-rica/">despido, preaviso y cesantía</a>.</p>
<h3>A plazo fijo</h3>
<p>Solo se puede pactar a plazo fijo <strong>cuando lo exige la naturaleza del servicio</strong> (por ejemplo, sustituir a alguien o un proyecto con fin claro), según el artículo 26. Tiene límites:</p>
<ul>
  <li>No puede pactarse por <strong>más de un año</strong> en perjuicio de la persona trabajadora, o hasta cinco años si el servicio requiere preparación técnica especial (art. 27).</li>
  <li>Se puede prorrogar de forma expresa o tácita: si seguís trabajando con conocimiento del patrono, se prorroga.</li>
  <li>Si al vencer el plazo siguen las razones que le dieron origen al trabajo, <strong>se considera por tiempo indefinido</strong> en lo que beneficie a quien trabaja.</li>
</ul>
<h3>Para obra determinada</h3>
<p>Dura hasta que se termine la obra o el trabajo concreto. Aplican las mismas ideas del plazo fijo.</p>

<h2>Si te terminan el contrato antes de tiempo</h2>
<p>En los contratos a plazo fijo y por obra, cualquiera de las partes puede terminarlos sin justa causa antes del plazo, pero debe pagarle a la otra los <strong>daños y perjuicios</strong> que se demuestren (art. 31). Si lo hace el patrono, además debe pagar <strong>un día de salario por cada siete días trabajados</strong> (nunca menos de tres días), y <strong>no menos de 22 días de salario</strong> si el contrato era de seis meses o más.</p>

<h2>El período de prueba</h2>
<p>El Código no tiene un artículo con ese nombre, pero por cómo funcionan el preaviso y la cesantía (que empiezan después de <strong>tres meses</strong> de trabajo continuo, arts. 28 y 29), en la práctica <strong>los primeros tres meses se tratan como período de prueba</strong>: en ese tiempo cualquiera de las partes puede terminar la relación sin preaviso ni cesantía.</p>
<p>Pero el período de prueba <strong>no te quita derechos</strong>. Desde el primer día tenés:</p>
<ul>
  <li>Salario completo, al menos el <a href="{ROOT}guias/salario-minimo-por-ocupacion-costa-rica/">mínimo de tu ocupación</a>.</li>
  <li>Seguro de la CCSS y póliza de riesgos del trabajo.</li>
  <li>Pago de horas extra y feriados que trabajés.</li>
  <li><strong>Vacaciones y aguinaldo proporcionales</strong> a lo trabajado.</li>
</ul>
<p>Hay situaciones en que un despido no es libre ni siquiera en prueba (por ejemplo, el embarazo o la lactancia, o represalias). Si te pasa, consultá de inmediato al MTSS.</p>

<h2>Antes de firmar, revisá</h2>
<ol>
  <li><strong>Que diga el tipo de contrato</strong> y, si es a plazo fijo, la razón y la fecha de fin.</li>
  <li><strong>Que el salario, el horario y el lugar</strong> coincidan con lo que te ofrecieron.</li>
  <li><strong>Cláusulas raras:</strong> pagos "por fuera", renuncias a derechos o pactos que interrumpan la continuidad (el art. 30 declara nula la cláusula que interrumpa la continuidad de tus servicios).</li>
  <li><strong>Que te den tu copia firmada.</strong></li>
  <li><strong>Que te asegure la CCSS</strong> con tu salario real.</li>
</ol>
<p>Al terminar, el patrono debe darte a pedido una <strong>constancia de trabajo</strong> con fechas y tipo de trabajo (art. 35).</p>

<h2>"Servicios profesionales" o relación laboral</h2>
<p>Si facturás de verdad como independiente, con tus propios clientes y autonomía, es otra cosa: mirá <a href="{ROOT}guias/trabajar-por-cuenta-propia-costa-rica/">trabajar por cuenta propia</a>. Pero si te piden factura y a la vez horario y órdenes de un jefe, puede ser una relación laboral disfrazada. Consultá al MTSS.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.mtss.go.cr/elministerio/marco-legal/documentos/Codigo_Trabajo_RPL.pdf" target="_blank" rel="noopener">Código de Trabajo, arts. 18 a 35 (copia del MTSS)</a></li>
  <li><a href="https://es.wikisource.org/wiki/C%C3%B3digo_de_Trabajo,_de_27_de_agosto_de_1943,_(cr):_T%C3%ADtulo_2._Cap%C3%ADtulo_1" target="_blank" rel="noopener">Código de Trabajo, Título 2, Capítulo 1 (texto)</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Cuánto dura el período de prueba?</h3>
<p>En la práctica, tres meses. Pasado ese tiempo, un despido sin justa causa da derecho a preaviso y cesantía.</p>
<h3>¿Pueden renovarme muchas veces un contrato a plazo fijo?</h3>
<p>Si siguen existiendo las causas que le dieron origen al trabajo, el contrato se considera por tiempo indefinido en lo que te beneficie. Si te los renuevan una y otra vez para el mismo trabajo, consultá al MTSS.</p>
<h3>¿Me pueden contratar sin contrato escrito?</h3>
<p>En ciertos casos, sí (por ejemplo, labores agrícolas o trabajos temporales de hasta 90 días). En los demás, debe ser por escrito, y la falta se le imputa al patrono.</p>
`,
  },
  {
    slug: 'rebajos-salario-ilegales-costa-rica',
    title: 'Rebajos del salario en Costa Rica: qué te pueden descontar',
    description: 'Qué descuentos del salario permite el Código de Trabajo en Costa Rica, qué límites tienen los adelantos y los embargos, y qué hacer si te rebajan de más.',
    h1: 'Rebajos del salario: qué te pueden descontar y qué no',
    lead: 'Que te rebajen plata del sueldo no siempre es legal. Estas son las reglas del Código de Trabajo sobre el pago completo, los adelantos y los embargos.',
    date: '2026-10-13',
    html: `
${AVISO}
<h2>La regla: el salario se paga completo</h2>
<p>El artículo 169 del Código de Trabajo dice que el salario <strong>debe liquidarse completo en cada período de pago</strong>, y que "salario completo" incluye lo ganado en jornada ordinaria y extraordinaria. El artículo 171 agrega que se paga directamente a la persona trabajadora <strong>"una vez hechas las deducciones y retenciones autorizadas"</strong> por el Código y sus leyes conexas. O sea: solo se puede rebajar lo que la ley autoriza.</p>

<h2>Lo que sí te rebajan por ley</h2>
<ul>
  <li><strong>Cuotas de la CCSS y Banco Popular</strong> (10,83 % en 2026). Mirá <a href="{ROOT}guias/salario-bruto-neto-deducciones-costa-rica/">salario bruto y neto</a>.</li>
  <li><strong>Impuesto sobre el salario</strong>, si ganás más del mínimo exento.</li>
  <li><strong>Pensión alimentaria</strong>, cuando hay una orden judicial.</li>
  <li><strong>Embargos judiciales</strong>, con los límites que explicamos abajo.</li>
  <li><strong>Deducciones que vos autorizaste</strong> con instituciones o cooperativas legalmente constituidas (por ejemplo, cuotas de una cooperativa o asociación solidarista). El art. 174 permite ceder o gravar el salario solo en la proporción en que es embargable, y deja a salvo las operaciones con cooperativas e instituciones de crédito.</li>
</ul>

<h2>Adelantos y deudas con el patrono</h2>
<ul>
  <li>Un <strong>anticipo para inducirte a aceptar el empleo</strong> no puede pasar de la cuarta parte del salario mensual; lo que exceda ese límite es legalmente incobrable (art. 173).</li>
  <li>Las deudas por <strong>anticipos o pagos hechos de más</strong> se amortizan en un mínimo de <strong>cuatro períodos de pago</strong> y <strong>no generan intereses</strong>.</li>
  <li>Las deudas con el patrono solo se pueden compensar en la proporción en que el salario es embargable (art. 36).</li>
</ul>

<h2>Límites de los embargos</h2>
<p>Según el artículo 172:</p>
<ul>
  <li>Los salarios que no pasen del <strong>menor salario mínimo mensual</strong> son inembargables.</li>
  <li>Lo que exceda se embarga hasta en <strong>una octava parte</strong> de la porción hasta tres veces ese mínimo, y <strong>una cuarta parte</strong> del resto.</li>
  <li>Por pensión alimentaria, el salario puede embargarse <strong>hasta un 50 %</strong>.</li>
  <li>Se calcula sobre el salario líquido, ya descontadas las cuotas obligatorias.</li>
</ul>

<h2>Rebajos que deberías cuestionar</h2>
<p>El Código <strong>no contiene una autorización general</strong> para que el patrono descuente por su cuenta cosas como estas, así que si te las rebajan, conviene preguntar en qué ley se basan y consultar al MTSS:</p>
<ul>
  <li><strong>Uniformes, herramientas o equipo</strong> de trabajo. En el trabajo por unidad de obra, el art. 24 prohíbe expresamente cobrar el desgaste natural de la herramienta.</li>
  <li><strong>Faltantes de caja o de inventario</strong> sin un procedimiento claro y sin respetar los límites de arriba.</li>
  <li><strong>"Multas"</strong> por llegadas tardías u otras sanciones inventadas por la empresa.</li>
  <li><strong>Pagos en vales, fichas, cupones o mercadería</strong> en lugar de dinero: el artículo 165 lo prohíbe.</li>
  <li><strong>Pagarte menos de lo pactado</strong> o menos del <a href="{ROOT}guias/salario-minimo-por-ocupacion-costa-rica/">salario mínimo</a>.</li>
  <li><strong>Rebajar tu liquidación</strong>: el preaviso y la cesantía no se pueden compensar, vender ni ceder (art. 30), salvo la mitad por pensión alimentaria.</li>
</ul>

<h2>Qué hacer si te rebajan de más</h2>
<ol>
  <li><strong>Pedí tu colilla de pago</strong> con el detalle de cada rebajo.</li>
  <li><strong>Preguntá por escrito</strong> en qué se basa cada descuento.</li>
  <li><strong>No firmes</strong> autorizaciones de descuento sin leerlas y sin copia.</li>
  <li><strong>Guardá</strong> contrato, colillas, mensajes y comprobantes de pago.</li>
  <li><strong>Consultá al MTSS</strong>: 800-TRABAJO (800 872 2256). Mirá la <a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">guía para denunciar</a>.</li>
</ol>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://es.wikisource.org/wiki/C%C3%B3digo_de_Trabajo,_de_27_de_agosto_de_1943,_(cr):_T%C3%ADtulo_3._Cap%C3%ADtulo_4" target="_blank" rel="noopener">Código de Trabajo, arts. 162 a 176: del salario y las medidas que lo protegen</a></li>
  <li><a href="https://www.mtss.go.cr/elministerio/marco-legal/documentos/Codigo_Trabajo_RPL.pdf" target="_blank" rel="noopener">Código de Trabajo (copia del MTSS)</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Me pueden descontar el uniforme?</h3>
<p>El Código no autoriza un descuento general por uniformes o herramientas. Si te lo rebajan, pedí por escrito el fundamento y consultá al MTSS.</p>
<h3>¿Pueden descontarme por un faltante de caja?</h3>
<p>No pueden rebajarte lo que quieran: solo lo que la ley autoriza y, en deudas, respetando los límites de embargo. Consultá antes de aceptar cualquier descuento.</p>
<h3>¿Cuánto me pueden embargar?</h3>
<p>Nada si ganás hasta el menor salario mínimo mensual. Sobre lo que exceda, una octava parte hasta tres veces ese mínimo y una cuarta del resto (hasta el 50 % por pensión alimentaria).</p>
`,
  },
  {
    slug: 'pretension-salarial-cuanto-pedir-costa-rica',
    title: 'Pretensión salarial: cómo responder cuánto querés ganar',
    description: 'Cómo contestar la pregunta de pretensión salarial en una entrevista en Costa Rica: cómo investigar, qué rango decir, ejemplos de respuesta y cómo negociar.',
    h1: 'Pretensión salarial: cómo responder "¿cuánto querés ganar?"',
    lead: 'Es la pregunta que más incomoda en una entrevista. Con un poco de preparación podés contestarla con seguridad y sin quedarte corto.',
    date: '2026-10-13',
    html: `
<h2>Qué es la pretensión salarial</h2>
<p>Es el monto que esperás ganar por el puesto. Suelen preguntarlo en la primera llamada, en el formulario de la oferta o al final de la entrevista. Responder mal tiene dos riesgos: pedir tan poco que te dejés plata sobre la mesa, o pedir tan alto que te descarten sin conversar.</p>

<h2>Paso 1: Investigá el rango del puesto</h2>
<ul>
  <li>Mirá el <a href="{ROOT}guias/salario-minimo-por-ocupacion-costa-rica/">salario mínimo de tu ocupación</a>: es el piso legal, no una meta.</li>
  <li>Revisá <strong>ofertas parecidas</strong> en <a href="{ROOT}">TicoBrete</a> y en otras bolsas: algunas publican el salario.</li>
  <li>Preguntale a <strong>gente que trabaja en lo mismo</strong>.</li>
  <li>Considerá tu <strong>experiencia, estudios, idiomas y zona</strong>: un puesto en San José y uno en una zona rural pueden pagar distinto.</li>
</ul>

<h2>Paso 2: Pensá en tu salario neto</h2>
<p>Los números de las ofertas suelen ser brutos. Con la <a href="{ROOT}guias/calculadora-salario-neto-costa-rica/">calculadora de salario neto</a> mirá cuánto te queda realmente, para saber cuál es tu mínimo aceptable.</p>

<h2>Paso 3: Definí tu rango</h2>
<ul>
  <li><strong>Piso:</strong> lo mínimo con lo que aceptarías.</li>
  <li><strong>Meta:</strong> lo que realmente querés.</li>
  <li><strong>Techo:</strong> lo que sería una muy buena oferta.</li>
</ul>
<p>Al responder, dá un <strong>rango</strong> cuyo punto más bajo sea cómodo para vos. Si el piso es ₡500.000 y tu meta ₡600.000, decí "entre ₡550.000 y ₡650.000 brutos".</p>

<h2>Cómo responder, con ejemplos</h2>
<p><strong>Si te piden un número:</strong></p>
<blockquote><p>"Según lo que he visto para este puesto y mi experiencia, mi expectativa está entre ₡550.000 y ₡650.000 brutos al mes, y estoy abierto a conversar según las responsabilidades y los beneficios."</p></blockquote>
<p><strong>Si preferís que ellos digan primero:</strong></p>
<blockquote><p>"Me gustaría conocer el rango que tienen para este puesto para ver si encajamos."</p></blockquote>
<p><strong>Si insisten y aún no conocés el puesto bien:</strong></p>
<blockquote><p>"Prefiero entender mejor las funciones antes de dar una cifra, pero para que tengan una idea, estoy buscando algo en el rango de ₡X a ₡Y."</p></blockquote>
<p><strong>En un formulario que pide un solo número:</strong> poné el punto medio de tu rango o un monto un poco arriba de tu meta, para tener espacio de negociar.</p>

<h2>Más allá del salario base</h2>
<p>Preguntá por todo lo que suma:</p>
<ul>
  <li>Comisiones o bonos, y cómo se calculan.</li>
  <li>Seguro médico privado, alimentación, transporte o teletrabajo.</li>
  <li>Días de vacaciones por encima del mínimo legal.</li>
  <li>Capacitación y posibilidades de crecer o de pedir un <a href="{ROOT}guias/como-pedir-aumento-costa-rica/">aumento</a> más adelante.</li>
</ul>

<h2>Errores comunes</h2>
<ul>
  <li><strong>Decir "lo que ustedes me ofrezcan":</strong> da toda la ventaja a la otra parte.</li>
  <li><strong>Comparar bruto con neto</strong> sin darte cuenta.</li>
  <li><strong>Mentir sobre cuánto ganás ahora:</strong> si lo verifican, pierde confianza.</li>
  <li><strong>Aceptar en el momento:</strong> está bien pedir un día para pensarlo.</li>
  <li><strong>Pedir sin conocer el mercado.</strong></li>
</ul>

<h2>Si la oferta es menor a lo que esperabas</h2>
<ol>
  <li>Agradecé y pedí la oferta por escrito.</li>
  <li>Explicá con calma por qué tu perfil vale más (logros, idiomas, experiencia).</li>
  <li>Proponé una revisión a los tres o seis meses, con metas claras.</li>
  <li>Compará con otras ofertas: sabé cuál es tu alternativa.</li>
</ol>
<p>Más preparación en la guía de <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">entrevista de trabajo</a> y en las <a href="{ROOT}guias/preguntas-entrevista-por-puesto-costa-rica/">preguntas de entrevista por puesto</a>.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿Debo decir un número o un rango?</h3>
<p>Un rango suele funcionar mejor, siempre que su punto más bajo sea un monto con el que estarías cómodo.</p>
<h3>¿Digo salario bruto o neto?</h3>
<p>Casi siempre se habla de bruto. Aclaralo en tu respuesta ("brutos al mes") para evitar malentendidos.</p>
<h3>¿Qué pasa si me ofrecen menos del mínimo?</h3>
<p>El salario no puede ser menor al mínimo de la ocupación. Mirá la guía de <a href="{ROOT}guias/salario-minimo-por-ocupacion-costa-rica/">salario mínimo por ocupación</a> y, si no se cumple, consultá al MTSS.</p>
`,
  },
  {
    slug: 'preguntas-entrevista-por-puesto-costa-rica',
    title: 'Preguntas de entrevista por puesto en Costa Rica',
    description: 'Preguntas frecuentes de entrevista y cómo responderlas para call center, ventas, restaurantes, seguridad y bodega en Costa Rica, con ejemplos de respuesta.',
    h1: 'Preguntas de entrevista por puesto en Costa Rica',
    lead: 'Cada tipo de trabajo tiene sus preguntas típicas. Preparate con estas, para call center, ventas, restaurantes, seguridad y bodega.',
    date: '2026-10-13',
    html: `
<h2>Preguntas que casi siempre te hacen</h2>
<ul>
  <li><strong>"Hablame de vos."</strong> Respondé en un minuto: quién sos, qué hacés bien y por qué te interesa el puesto.</li>
  <li><strong>"¿Por qué querés trabajar acá?"</strong> Mencioná algo concreto de la empresa o del puesto, no solo "necesito trabajar".</li>
  <li><strong>"¿Cuál es tu mayor fortaleza?"</strong> Elegí una útil para el puesto y dá un ejemplo.</li>
  <li><strong>"¿Cuál es tu punto débil?"</strong> Nombrá algo real y cómo lo estás mejorando.</li>
  <li><strong>"¿Cuándo podrías empezar?"</strong> Sé claro con tu disponibilidad.</li>
</ul>
<p>Más ideas en la guía general de <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">entrevista de trabajo</a>. Y si te preguntan cuánto querés ganar, mirá cómo responder la <a href="{ROOT}guias/pretension-salarial-cuanto-pedir-costa-rica/">pretensión salarial</a>.</p>

<h2>Call center y servicio al cliente</h2>
<ul>
  <li><strong>"Contame de una vez que tuviste que calmar a una persona molesta."</strong> Contá la situación, qué hiciste (escuchar, disculparte, buscar solución) y cómo terminó.</li>
  <li><strong>"¿Cómo manejás un día con muchas llamadas seguidas?"</strong> Hablá de organización, pausas y de mantener el buen trato.</li>
  <li><strong>"¿Podés trabajar en turnos rotativos, fines de semana o feriados?"</strong> Sé honesto: te lo van a exigir.</li>
  <li><strong>"Presentate en inglés."</strong> Practicá un párrafo corto. Mirá la guía de <a href="{ROOT}guias/entrevista-en-ingles-costa-rica/">entrevista en inglés</a>.</li>
  <li><strong>Qué buscan:</strong> paciencia, buena comunicación, rapidez para aprender un sistema. Más en <a href="{ROOT}guias/trabajar-call-center-costa-rica/">trabajar en call center</a>.</li>
</ul>

<h2>Ventas</h2>
<ul>
  <li><strong>"Véndeme este lapicero."</strong> Preguntá primero qué necesita la persona, luego conectá el producto con esa necesidad.</li>
  <li><strong>"¿Cómo manejás un "no"?"</strong> Con calma: preguntás qué lo frenó y aprendés para la próxima.</li>
  <li><strong>"¿Cuál fue tu mejor venta?"</strong> Contá un resultado con números, si podés.</li>
  <li><strong>"¿Te sentís cómodo trabajando con comisión?"</strong> Preguntá cómo se calcula y qué parte es salario base.</li>
  <li><strong>Qué buscan:</strong> trato amable, constancia y resultados. Más en <a href="{ROOT}guias/trabajo-ventas-costa-rica/">trabajar en ventas</a>.</li>
</ul>

<h2>Restaurantes y cocina</h2>
<ul>
  <li><strong>"¿Tenés experiencia en servicio o en cocina?"</strong> Si no, hablá de tus ganas de aprender y de otros trabajos con atención al público.</li>
  <li><strong>"¿Tenés el carné de manipulación de alimentos?"</strong> Si no lo tenés, decí que lo sacás y cuándo.</li>
  <li><strong>"¿Cómo reaccionás cuando hay mucho trabajo a la vez?"</strong> Hablá de orden, prioridades y trabajo en equipo.</li>
  <li><strong>"¿Podés trabajar fines de semana y feriados?"</strong></li>
  <li><strong>Qué buscan:</strong> puntualidad, limpieza y buen trato. Más en <a href="{ROOT}guias/trabajo-cocina-restaurantes-costa-rica/">trabajar en restaurantes y cocina</a>.</li>
</ul>

<h2>Seguridad</h2>
<ul>
  <li><strong>"¿Qué harías si ves a alguien sospechoso?"</strong> Respondé con calma: observás, avisás a tu jefatura y seguís el protocolo, sin exponerte.</li>
  <li><strong>"¿Cómo mantenés la atención en un turno largo o de noche?"</strong> Hablá de disciplina, rondas y descanso.</li>
  <li><strong>"¿Tenés antecedentes o requisitos al día?"</strong> Llevá tus documentos. Mirá los requisitos en <a href="{ROOT}guias/trabajo-seguridad-costa-rica/">trabajar como oficial de seguridad</a>.</li>
  <li><strong>Qué buscan:</strong> responsabilidad, honestidad y disponibilidad de horario.</li>
</ul>

<h2>Bodega y logística</h2>
<ul>
  <li><strong>"¿Tenés experiencia con inventarios o con montacargas?"</strong> Si no, decí qué sabés de orden y de herramientas, y que aprendés rápido.</li>
  <li><strong>"¿Podés cargar peso y estar de pie varias horas?"</strong> Sé realista.</li>
  <li><strong>"¿Qué harías si falta un producto en el conteo?"</strong> Revisás, avisás y documentás, sin ocultar el error.</li>
  <li><strong>"¿Podés hacer horas extra en temporada alta?"</strong> Preguntá cómo se pagan: mirá <a href="{ROOT}guias/horas-extra-feriados-costa-rica/">horas extra y feriados</a>.</li>
  <li><strong>Qué buscan:</strong> puntualidad, orden y cuidado con la seguridad. Más en <a href="{ROOT}guias/trabajo-bodega-logistica-costa-rica/">trabajar en bodega y logística</a>.</li>
</ul>

<h2>Preguntas que deberías hacer vos</h2>
<ol>
  <li>¿Cómo es un día típico en este puesto?</li>
  <li>¿Cuál es el horario y cómo se pagan las horas extra y los feriados?</li>
  <li>¿El contrato es por tiempo indefinido o a plazo fijo? Mirá los <a href="{ROOT}guias/tipos-de-contrato-periodo-de-prueba-costa-rica/">tipos de contrato</a>.</li>
  <li>¿Cómo es la capacitación inicial?</li>
  <li>¿Cuáles son los siguientes pasos del proceso?</li>
</ol>

<h2>Antes de la entrevista</h2>
<ul>
  <li>Llevá tu <a href="{ROOT}herramientas/armador-de-curriculum/">currículum</a> impreso, tu cédula y tus documentos.</li>
  <li>Llegá 10 minutos antes y vestite según el puesto.</li>
  <li>Verificá que la oferta sea real: usá el <a href="{ROOT}herramientas/verificador-de-ofertas-falsas/">verificador de ofertas sospechosas</a>.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Qué hago si no tengo experiencia?</h3>
<p>Hablá de tu actitud, de trabajos informales, estudios y cursos, y de tu disposición a aprender. Mirá la guía de <a href="{ROOT}guias/trabajos-sin-experiencia-costa-rica/">trabajos sin experiencia</a>.</p>
<h3>¿Está bien que pregunte por el salario?</h3>
<p>Sí, es normal preguntar por el salario y los beneficios, preferiblemente cuando ya mostraron interés en vos.</p>
<h3>¿Cómo me preparo en una tarde?</h3>
<p>Practicá en voz alta tu presentación de un minuto, dos ejemplos de logros y las preguntas de tu puesto.</p>
`,
  },
  {
    slug: 'accidente-de-trabajo-riesgos-ins-costa-rica',
    title: 'Accidente de trabajo en Costa Rica: qué hacer y qué te cubre',
    description: 'Qué hacer si sufrís un accidente laboral en Costa Rica: aviso al patrono y al INS, atención médica, subsidio del 60 % y qué pasa si tu empresa no tiene póliza.',
    h1: 'Accidente de trabajo en Costa Rica: qué hacer y qué te cubre',
    lead: 'Si te lastimás en el trabajo, lo que hagás en los primeros días importa. Estos son los pasos, quién paga y qué derechos tenés.',
    date: '2026-10-13',
    html: `
${AVISO}
<h2>Qué se considera accidente de trabajo</h2>
<p>Es el que te sucede <strong>por causa de tu labor o como consecuencia de ella</strong>, durante el tiempo y en el lugar de trabajo. También hay <strong>enfermedades del trabajo</strong>, que se desarrollan por las condiciones de tu labor (por ejemplo, por ruido, químicos o movimientos repetitivos). Todo esto lo cubre el <strong>Seguro de Riesgos del Trabajo</strong> del INS, que es distinto del seguro de salud de la CCSS.</p>

<h2>Tu empleador debe tener póliza</h2>
<p>Según el Código de Trabajo, todo patrono está obligado a asegurar a sus personas trabajadoras contra los riesgos del trabajo con el INS. Si tu empleador no tiene póliza o no te reportó, <strong>sigue siendo responsable</strong> de tu atención y de las prestaciones; consultá de inmediato al MTSS.</p>

<h2>Qué hacer si te accidentás</h2>
<ol>
  <li><strong>Atendé tu salud primero.</strong> Si es una emergencia, andá al centro médico más cercano.</li>
  <li><strong>Avisá de inmediato a tu jefatura o al patrono</strong>, preferiblemente por escrito (correo o mensaje) para que quede constancia.</li>
  <li><strong>Pedí que se complete el formulario de aviso.</strong> Es el "Aviso de accidente o enfermedad de trabajo y orden de atención médica": con él el INS autoriza tu atención.</li>
  <li><strong>Guardá pruebas:</strong> fotos del lugar, nombres de testigos, la hora y cómo pasó.</li>
  <li><strong>Seguí el tratamiento y las citas</strong> del INS, y conservá todas las incapacidades.</li>
</ol>

<h2>Plazo del aviso al INS</h2>
<p>El patrono debe reportar el accidente al INS con rapidez; según el Reglamento del Seguro de Riesgos del Trabajo, el patrono debe denunciar el riesgo al INS dentro de los <strong>ocho días hábiles</strong> siguientes a que ocurre. Por eso conviene avisar de inmediato: si se atrasa el reporte, pueden surgir problemas para tu atención.</p>

<h2>Qué cubre el seguro</h2>
<ul>
  <li><strong>Atención médica y hospitalaria</strong>, medicinas, exámenes y rehabilitación relacionados con el accidente.</li>
  <li><strong>Subsidio por incapacidad:</strong> durante la incapacidad temporal, el Código y el reglamento del seguro establecen un subsidio del <strong>60 % de tu salario diario</strong> durante los primeros 45 días. Después de ese plazo el porcentaje y las condiciones varían: consultalo con el INS.</li>
  <li><strong>Indemnización</strong> si queda una incapacidad permanente, y beneficios para la familia en caso de fallecimiento.</li>
</ul>
<p>Esto es distinto de la incapacidad por enfermedad común, que paga la CCSS. Mirá la guía de <a href="{ROOT}guias/incapacidades-costa-rica/">incapacidades</a> y la <a href="{ROOT}guias/calculadora-incapacidad-costa-rica/">calculadora de incapacidad</a>.</p>

<h2>Lo que no te pueden hacer</h2>
<ul>
  <li><strong>Cobrarte la atención</strong> o decirte que "lo arreglás vos" para no reportar el accidente.</li>
  <li><strong>Obligarte a volver a trabajar</strong> antes de que el médico te dé de alta.</li>
  <li><strong>Despedirte como represalia</strong> por reportar. Si pasa, consultá al MTSS: 800-TRABAJO (800 872 2256).</li>
</ul>

<h2>Prevención: lo que debe darte tu empleador</h2>
<p>Tu patrono debe cumplir las medidas de seguridad e higiene: <strong>equipo de protección, capacitación, herramientas en buen estado y un lugar seguro</strong>. Si hay peligro grave para tu seguridad o tu salud, el artículo 83 del Código de Trabajo lo reconoce como una causa justa para que termines el contrato conservando tus derechos. Antes de hacerlo, consultá al MTSS. Mirá también la guía de <a href="{ROOT}guias/trabajo-bodega-logistica-costa-rica/">trabajo en bodega y logística</a>.</p>

<h2>Si no te atienden o no te pagan</h2>
<ol>
  <li>Reclamá por escrito al patrono y al INS, con tu número de caso.</li>
  <li>Guardá el aviso, las incapacidades y los comprobantes.</li>
  <li>Denunciá ante el MTSS o la Inspección de Trabajo. Mirá la <a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">guía para denunciar</a>.</li>
</ol>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.mtss.go.cr/elministerio/marco-legal/documentos/Codigo_Trabajo_RPL.pdf" target="_blank" rel="noopener">Código de Trabajo, Título 4: Riesgos del trabajo (copia del MTSS)</a></li>
  <li><a href="https://sinalevi.go.cr/ResultadosNormativa/Informacion?param1=97626&param2=132011&param3=1&param4=" target="_blank" rel="noopener">Norma Técnica del Seguro Obligatorio de Riesgos del Trabajo (SINALEVI)</a></li>
  <li><a href="https://www.imprentanacional.go.cr/pub/2014/05/07/COMP_07_05_2014.html" target="_blank" rel="noopener">La Gaceta N.° 86 de 2014: Reglamento del Seguro de Riesgos del Trabajo</a></li>
  <li><a href="https://www.grupoins.com/media/jtzivcle/condiciones-generales-riesgos-del-trabajo-2023.pdf" target="_blank" rel="noopener">INS: condiciones generales del seguro de riesgos del trabajo</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Un accidente camino al trabajo cuenta?</h3>
<p>Depende del caso y de cómo lo defina la póliza. Reportalo siempre y dejá que el INS determine la cobertura.</p>
<h3>¿Cuánto tengo para avisar?</h3>
<p>Avisá de inmediato. El patrono tiene un plazo máximo de 8 días hábiles para reportar al INS.</p>
<h3>¿Qué hago si mi empleador no reporta el accidente?</h3>
<p>Pedí atención médica igual, guardá pruebas y consultá al MTSS y al INS. La falta de reporte no te quita tus derechos.</p>
`,
  },
  {
    slug: 'acoso-laboral-hostigamiento-sexual-costa-rica',
    title: 'Acoso laboral y hostigamiento sexual en Costa Rica: qué hacer',
    description: 'Qué es el hostigamiento sexual (Ley 7476) y el acoso laboral en Costa Rica, cómo documentarlos, dónde denunciar, el plazo de dos años y qué derechos tenés.',
    h1: 'Acoso laboral y hostigamiento sexual en Costa Rica',
    lead: 'Nadie debería aguantar maltrato en el trabajo. Esto es lo que dice la ley, cómo juntar pruebas y dónde denunciar.',
    date: '2026-10-13',
    html: `
${AVISO}
<h2>Dos situaciones distintas</h2>
<p>En Costa Rica el <strong>hostigamiento (o acoso) sexual</strong> tiene una ley específica, la <strong>Ley 7476</strong>. El <strong>acoso laboral</strong> (también llamado mobbing o persecución laboral) <strong>no tiene todavía una ley general propia</strong>: existen proyectos de ley, pero hoy se trata con el Código de Trabajo, criterios del MTSS y la jurisprudencia.</p>

<h2>Hostigamiento sexual: qué dice la Ley 7476</h2>
<p>La ley define el acoso sexual como <strong>toda conducta sexual indeseada por quien la recibe, reiterada y que provoque efectos perjudiciales</strong> en tus condiciones de empleo, en tu desempeño o en tu bienestar personal. Entre sus manifestaciones están:</p>
<ul>
  <li>Pedirte favores sexuales a cambio de algo (un ascenso, mantener tu empleo) o con amenazas si te negás.</li>
  <li>Comentarios, gestos, mensajes, fotos o chistes de contenido sexual que te incomodan.</li>
  <li>Acercamientos o contactos corporales que no querés.</li>
  <li>Insistir en invitaciones o contactos después de que dijiste que no.</li>
</ul>
<p>La ley obliga a las empresas y a las instituciones a tener un <strong>procedimiento interno</strong> para recibir y tramitar las denuncias. El procedimiento debe resolverse en un plazo ordenatorio de tres meses desde la denuncia. Si la persona hostigadora es la jefatura o el patrono, o la empresa no actúa, podés acudir a las autoridades externas.</p>

<h2>El plazo para denunciar</h2>
<p>Según la ley, tenés <strong>dos años</strong> para presentar la denuncia, contados desde el último hecho de hostigamiento (o desde que terminó la causa que te impedía denunciar). No esperés: mientras más pronto, más fácil reunir pruebas.</p>

<h2>Acoso laboral: qué cuenta y qué dice la ley</h2>
<p>Es el maltrato repetido y deliberado en el trabajo para humillarte, aislarte o hacerte renunciar: gritos o insultos, burlas, quitarte funciones sin razón, aislarte, asignarte tareas imposibles, amenazas o vigilancia excesiva. El MTSS lo considera un <strong>ejercicio abusivo del poder</strong>.</p>
<p>El Código de Trabajo establece que los patronos deben <strong>guardar a las personas trabajadoras la debida consideración, absteniéndose del maltrato de palabra o de obra</strong> (art. 69, inciso c). Y el artículo 83 reconoce como causa justa para que la persona trabajadora termine el contrato, <strong>con responsabilidad del patrono</strong>, cuando este (o un representante) recurre a <strong>injuria, calumnia o vías de hecho</strong> contra ella.</p>

<h2>Cómo juntar pruebas</h2>
<ol>
  <li><strong>Anotá cada hecho:</strong> fecha, hora, lugar, qué pasó, quién estaba presente.</li>
  <li><strong>Guardá mensajes, correos, audios y capturas</strong> en un lugar fuera del trabajo.</li>
  <li><strong>Buscá testigos</strong> de confianza, o personas a quienes les contaste en ese momento.</li>
  <li><strong>Guardá evaluaciones, horarios y cambios de funciones</strong> que muestren un trato distinto.</li>
  <li><strong>Si el estrés te afecta,</strong> acudí a un médico o psicólogo y pedí un informe.</li>
</ol>

<h2>Dónde denunciar</h2>
<ul>
  <li><strong>Dentro de la empresa:</strong> recursos humanos, la comisión de hostigamiento sexual o el procedimiento interno, siempre por escrito y con copia.</li>
  <li><strong>Ministerio de Trabajo (MTSS):</strong> 800-TRABAJO (800 872 2256). Mirá la <a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">guía para denunciar</a>.</li>
  <li><strong>Autoridades judiciales:</strong> los tribunales de trabajo, y la vía penal cuando hay delito (por ejemplo, agresiones o acoso con amenazas).</li>
  <li><strong>Apoyo:</strong> el INAMU y la Defensoría de los Habitantes pueden orientarte.</li>
</ul>
<p>La ley y los reglamentos prohíben las <strong>represalias</strong> contra quien denuncia o declara como testigo. Si te despiden o te cambian condiciones después de denunciar, documentalo y consultá de inmediato.</p>

<h2>Antes de renunciar</h2>
<p>Si el maltrato es grave, el artículo 84 dice que podés separarte de tu trabajo <strong>conservando tus indemnizaciones y prestaciones</strong> cuando se da una de las causas del artículo 83. Pero si después se discute y se comprueba que dejaste el trabajo sin justa causa, podrías tener que pagar el preaviso. Por eso, <strong>consultá al MTSS o a una persona abogada antes de renunciar</strong>, y no faltés al trabajo sin avisar: ausentarte sin justificación dos días consecutivos o más de dos alternos en un mes puede ser causa de despido (art. 81). Mirá también <a href="{ROOT}guias/como-renunciar-carta-renuncia-costa-rica/">cómo renunciar</a> y <a href="{ROOT}guias/despido-cesantia-preaviso-costa-rica/">despido y cesantía</a>.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.asamblea.go.cr/sd/Documents/BIBLIOTECADIGITAL/DOCUMENTOS/LEYES/Ley%207476%20Ley%20Contra%20el%20Hostigamiento%20Sexual%20en%20el%20Empleo%20y%20la%20Docencia.pdf" target="_blank" rel="noopener">Ley 7476: Ley contra el Hostigamiento Sexual en el Empleo y la Docencia</a></li>
  <li><a href="https://www.mtss.go.cr/elministerio/estructura/direccion-asuntos-juridicos/criterios_juridicos/documetos/OFP-MTSS-DAJ-AER-065-2024.pdf" target="_blank" rel="noopener">MTSS: criterio general sobre acoso laboral (OFP-MTSS-DAJ-AER-065-2024)</a></li>
  <li><a href="https://es.wikisource.org/wiki/C%C3%B3digo_de_Trabajo,_de_27_de_agosto_de_1943,_(cr):_T%C3%ADtulo_2._Cap%C3%ADtulo_6" target="_blank" rel="noopener">Código de Trabajo, arts. 81 a 85</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Un solo comentario ya es hostigamiento?</h3>
<p>La ley habla de una conducta reiterada, pero hechos graves pueden ser denunciados aunque ocurran una sola vez. Guardá pruebas y consultá.</p>
<h3>¿Puedo denunciar si el acosador es mi jefe?</h3>
<p>Sí. Podés acudir a recursos humanos, y si no hay respuesta o el patrono es quien hostiga, al MTSS y a las autoridades externas.</p>
<h3>¿Hay una ley contra el acoso laboral?</h3>
<p>Hoy no hay una ley general específica. Se trata con el Código de Trabajo, criterios del MTSS y jurisprudencia. Hay proyectos de ley en discusión.</p>
<h3>¿Qué pasa si me despiden por denunciar?</h3>
<p>Las represalias están prohibidas. Documentá todo y consultá al MTSS cuanto antes.</p>
`,
  },
  {
    slug: 'permisos-con-goce-de-salario-costa-rica',
    title: 'Permisos con goce de salario en Costa Rica: qué dice la ley',
    description: 'Qué permisos y licencias tenés en el trabajo en Costa Rica: citas médicas, matrimonio, fallecimiento de un familiar, estudios, y cómo pedirlos sin perder tu salario.',
    h1: 'Permisos con goce de salario en Costa Rica',
    lead: 'Matrimonio, un fallecimiento, una cita médica. ¿Tu empresa está obligada a darte el permiso y a pagártelo? Esto es lo que dice la ley y lo que depende de tu contrato.',
    date: '2026-10-13',
    html: `
${AVISO}
<h2>Lo primero: qué fija la ley y qué no</h2>
<p>En Costa Rica, para el <strong>sector privado</strong>, el Código de Trabajo fija algunos descansos y licencias específicos, pero <strong>no tiene una lista general</strong> de permisos con goce de salario para situaciones como matrimonio, fallecimiento de un familiar o citas médicas. Muchas de esas situaciones se regulan por el <strong>contrato, el reglamento interno de la empresa o una convención colectiva</strong>, y por eso cambian de un trabajo a otro. En el sector público hay reglamentos que sí los listan.</p>

<h2>Lo que sí está en la ley</h2>
<ul>
  <li><strong>Vacaciones pagadas:</strong> dos semanas por cada 50 trabajadas. Mirá <a href="{ROOT}guias/vacaciones-costa-rica/">vacaciones</a>.</li>
  <li><strong>Feriados:</strong> el descanso y el pago especial. Mirá <a href="{ROOT}guias/feriados-2027-costa-rica/">feriados 2027</a>.</li>
  <li><strong>Maternidad y paternidad, y pausas de lactancia.</strong> Mirá <a href="{ROOT}guias/licencia-maternidad-paternidad-costa-rica/">licencias de maternidad y paternidad</a>.</li>
  <li><strong>Incapacidades por enfermedad:</strong> mientras estás incapacitado no tenés que trabajar y se paga un subsidio. Mirá <a href="{ROOT}guias/incapacidades-costa-rica/">incapacidades</a> y <a href="{ROOT}guias/accidente-de-trabajo-riesgos-ins-costa-rica/">accidentes de trabajo</a>.</li>
  <li><strong>Un día libre a la semana durante el preaviso</strong>, para buscar otro trabajo (art. 28). Mirá <a href="{ROOT}guias/como-renunciar-carta-renuncia-costa-rica/">cómo renunciar</a>.</li>
</ul>

<h2>Lo que suele depender de tu empresa</h2>
<ul>
  <li><strong>Matrimonio:</strong> muchas empresas dan unos días con goce, pero no es una obligación general en el sector privado.</li>
  <li><strong>Fallecimiento de un familiar cercano:</strong> es común que se conceda, normalmente por unos días. Se pacta o se concede por política interna.</li>
  <li><strong>Citas médicas:</strong> el Código de Trabajo no las regula de forma expresa. Lo habitual es presentar el comprobante de la cita y acordar cómo se justifica la ausencia.</li>
  <li><strong>Trámites, estudios o diligencias personales:</strong> normalmente se acuerdan con tu jefatura, con goce, con rebajo o compensando horas.</li>
</ul>
<p>Revisá tu <strong>contrato, el reglamento interno y, si existe, la convención colectiva</strong>: ahí puede estar el derecho. Lo que tu empresa te haya reconocido por costumbre o por escrito no te lo pueden quitar de un momento a otro sin consecuencias, así que guardá los correos o mensajes en que te lo confirmaron.</p>

<h2>Cómo pedir un permiso</h2>
<ol>
  <li><strong>Pedilo con tiempo</strong> y por escrito (correo o mensaje), con fechas y motivo.</li>
  <li><strong>Adjuntá el comprobante</strong> cuando lo tengas: cita médica, certificado de matrimonio, constancia del fallecimiento.</li>
  <li><strong>Preguntá cómo se paga:</strong> con goce, sin goce, con vacaciones o reponiendo horas.</li>
  <li><strong>Guardá la respuesta</strong> por escrito.</li>
</ol>

<h2>Cuidado con ausentarte sin permiso</h2>
<p>Faltar al trabajo <strong>sin permiso y sin causa justificada</strong> dos días consecutivos, o más de dos días alternos dentro del mismo mes, es una causa justa de despido según el artículo 81. Si tenés una emergencia, <strong>avisá lo antes posible</strong> y justificá después con comprobantes.</p>

<h2>Si te niegan lo que tu contrato o reglamento dice</h2>
<p>Si el permiso está reconocido en tu contrato, reglamento interno o convención y no te lo dan, o te lo rebajan, guardá la prueba y consultá al MTSS: 800-TRABAJO (800 872 2256). Mirá la <a href="{ROOT}guias/rebajos-salario-ilegales-costa-rica/">guía de rebajos del salario</a> y la de <a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">cómo denunciar</a>.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.mtss.go.cr/elministerio/marco-legal/documentos/Codigo_Trabajo_RPL.pdf" target="_blank" rel="noopener">Código de Trabajo (copia del MTSS)</a></li>
  <li><a href="https://es.wikisource.org/wiki/C%C3%B3digo_de_Trabajo,_de_27_de_agosto_de_1943,_(cr):_T%C3%ADtulo_2._Cap%C3%ADtulo_6" target="_blank" rel="noopener">Código de Trabajo, arts. 81 a 85 (texto)</a></li>
  <li><a href="https://godinez-legal.com/citas-medicas-en-horario-laboral-costa-rica/" target="_blank" rel="noopener">Citas médicas en horario laboral (análisis jurídico)</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Me tienen que dar permiso para ir al médico?</h3>
<p>El Código no lo regula de forma expresa. Pedilo por escrito, presentá el comprobante y revisá si tu contrato o reglamento lo contempla.</p>
<h3>¿Me dan días por matrimonio o por un fallecimiento?</h3>
<p>No hay una regla general para el sector privado: depende de tu contrato, reglamento o convención. Preguntalo a Recursos Humanos.</p>
<h3>¿Pueden descontarme el día del permiso?</h3>
<p>Si es sin goce, sí, lo que corresponda. Si te lo prometieron con goce, reclamalo por escrito.</p>
`,
  },
  {
    slug: 'trabajo-informal-derechos-sin-contrato-costa-rica',
    title: 'Trabajo informal en Costa Rica: tus derechos sin contrato escrito',
    description: 'Si trabajás sin contrato escrito en Costa Rica, igual tenés derechos: salario mínimo, aguinaldo, vacaciones y CCSS. Cómo probar tu relación laboral y reclamar.',
    h1: 'Trabajo informal: tus derechos aunque no tengas contrato escrito',
    lead: 'Que no hayas firmado nada no significa que no tengas derechos. Así se prueba una relación laboral y qué podés reclamar.',
    date: '2026-10-13',
    html: `
${AVISO}
<h2>Sin contrato escrito, igual hay relación laboral</h2>
<p>El artículo 18 del Código de Trabajo dice que hay contrato de trabajo cuando alguien presta servicios a otra persona <strong>bajo su dependencia y dirección, a cambio de una remuneración</strong>, y que la ley <strong>presume que existe</strong> ese contrato entre quien trabaja y quien recibe el servicio. El artículo 25 agrega que <strong>la falta de contrato escrito se le imputa al patrono</strong>, y que el contrato verbal se prueba por todos los medios generales de prueba.</p>
<p>O sea: si te dan órdenes, un horario y te pagan, sos una persona trabajadora aunque nunca hayas firmado un papel.</p>

<h2>Cuándo puede ser verbal y cuándo no</h2>
<ul>
  <li>El contrato <strong>puede ser verbal</strong> en labores agrícolas o ganaderas y en trabajos accidentales o temporales de hasta 90 días (art. 22). En esos casos, el patrono debe darte cada 30 días, si lo pedís, una constancia escrita de los días trabajados y lo que te pagó.</li>
  <li>En los demás casos <strong>debe ser escrito</strong>, en tres copias (art. 23). Mirá la guía de <a href="{ROOT}guias/tipos-de-contrato-periodo-de-prueba-costa-rica/">tipos de contrato</a>.</li>
</ul>

<h2>Qué derechos tenés igual</h2>
<ul>
  <li><strong>Salario</strong> al menos igual al <a href="{ROOT}guias/salario-minimo-por-ocupacion-costa-rica/">mínimo de tu ocupación</a>, pagado completo y a tiempo. Mirá <a href="{ROOT}guias/rebajos-salario-ilegales-costa-rica/">rebajos del salario</a>.</li>
  <li><strong>Aguinaldo</strong> y <strong>vacaciones</strong>, proporcionales a lo que trabajaste. Mirá <a href="{ROOT}guias/aguinaldo-costa-rica/">aguinaldo</a> y <a href="{ROOT}guias/vacaciones-costa-rica/">vacaciones</a>.</li>
  <li><strong>Seguro de la CCSS</strong> y póliza de riesgos del trabajo, que tu patrono debe pagar.</li>
  <li><strong>Pago de horas extra y feriados</strong>. Mirá <a href="{ROOT}guias/horas-extra-feriados-costa-rica/">horas extra y feriados</a>.</li>
  <li><strong>Preaviso y cesantía</strong> si te despiden sin justa causa y llevás el tiempo requerido. Mirá <a href="{ROOT}guias/despido-cesantia-preaviso-costa-rica/">despido y cesantía</a>.</li>
</ul>

<h2>Cómo probar que trabajás</h2>
<p>Con contrato verbal, se prueba con cualquier medio. Empezá a juntar pruebas desde ya:</p>
<ol>
  <li><strong>Mensajes y correos</strong> donde te dan instrucciones, horarios o tareas.</li>
  <li><strong>Comprobantes de pago:</strong> depósitos, transferencias, sobres o recibos.</li>
  <li><strong>Fotos, uniforme, carné o ropa de trabajo</strong> y registros de entrada y salida.</li>
  <li><strong>Testigos:</strong> compañeros o clientes que te vean trabajar. El Código pide más testigos cuando son personas al servicio del mismo patrono: tres declarantes conformes, o dos si el patrono ocupa a cuatro personas o menos.</li>
  <li><strong>Un cuaderno</strong> con fechas, horas trabajadas y pagos recibidos.</li>
</ol>

<h2>Si te pagan "por fuera" o sin CCSS</h2>
<p>Muchos patronos pagan una parte sin reportarla para ahorrar cargas sociales. A vos te perjudica: <strong>cotizás menos</strong> para tu pensión, tu incapacidad y tu seguro. Pedí que te reporten el salario real. Si no lo hacen, mirá la guía de <a href="{ROOT}guias/cuotas-ccss-pension-ivm-costa-rica/">cuotas de la CCSS y pensión</a> y la de <a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">cómo denunciar</a>.</p>

<h2>Cómo reclamar</h2>
<ol>
  <li><strong>Hablá con tu patrono</strong> y pedí por escrito lo que te corresponde.</li>
  <li><strong>Consultá al MTSS</strong>: 800-TRABAJO (800 872 2256). La Inspección de Trabajo atiende denuncias aunque no tengas contrato escrito.</li>
  <li><strong>No esperés mucho:</strong> los reclamos laborales tienen plazos de prescripción. En general, el plazo para reclamar derechos del contrato corre desde que termina la relación, así que consultá cuanto antes.</li>
</ol>

<h2>Si trabajás por tu cuenta de verdad</h2>
<p>Si sos independiente de verdad (tenés tus propios clientes y decidís cómo trabajás), las reglas son otras. Mirá <a href="{ROOT}guias/trabajar-por-cuenta-propia-costa-rica/">trabajar por cuenta propia</a> para formalizarte con Hacienda y la CCSS.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://es.wikisource.org/wiki/C%C3%B3digo_de_Trabajo,_de_27_de_agosto_de_1943,_(cr):_T%C3%ADtulo_2._Cap%C3%ADtulo_1" target="_blank" rel="noopener">Código de Trabajo, arts. 18 a 25</a></li>
  <li><a href="https://www.mtss.go.cr/elministerio/marco-legal/documentos/Codigo_Trabajo_RPL.pdf" target="_blank" rel="noopener">Código de Trabajo (copia del MTSS)</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Puedo reclamar si nunca firmé nada?</h3>
<p>Sí. La ley presume la relación laboral y la falta de contrato escrito se imputa al patrono. Lo importante es reunir pruebas.</p>
<h3>¿Me pueden despedir sin pagarme nada?</h3>
<p>No. Tenés derecho al pago de lo trabajado, vacaciones y aguinaldo proporcionales, y, según el caso, a preaviso y cesantía.</p>
<h3>¿Y si me pagan en efectivo?</h3>
<p>Guardá todo lo que muestre que trabajaste y recibiste pago: mensajes, fotos, testigos. Pedí un comprobante cada vez.</p>
`,
  },
  {
    slug: 'trabajar-menor-de-18-anos-costa-rica',
    title: 'Trabajar siendo menor de 18 años en Costa Rica: reglas básicas',
    description: 'Qué dice la ley si querés trabajar siendo menor de edad en Costa Rica: edad mínima de 15 años, jornada de 6 horas, derechos y a quién consultar.',
    h1: 'Trabajar siendo menor de 18 años en Costa Rica',
    lead: 'Si tenés 15, 16 o 17 años y querés trabajar, hay reglas especiales para protegerte. Esto es lo básico y a quién consultar.',
    date: '2026-10-13',
    html: `
${AVISO}
<h2>La edad mínima: 15 años</h2>
<p>El Código de la Niñez y la Adolescencia (art. 92) prohíbe el trabajo de las personas menores de 15 años. Para que una persona menor de edad pueda ser contratada debe ser mayor de 15, según la Escuela Judicial. A partir de los 15 años, el Código de Trabajo reconoce la capacidad de contratar tu trabajo y de cobrar tu salario (art. 46); eso no significa que quedés emancipado.</p>
<p>Entre los 15 y los 17 años se te llama <strong>persona adolescente trabajadora</strong> y tenés una protección reforzada.</p>

<h2>Jornada: máximo 6 horas al día</h2>
<p>La jornada autorizada para las personas adolescentes es de <strong>6 horas diarias y 36 semanales</strong>, según el Poder Judicial. Todo lo que pase de eso no debería aplicarse a vos. Si te piden más tiempo, consultá al MTSS.</p>

<h2>Tus derechos son los mismos que los de cualquiera</h2>
<ul>
  <li><strong>Salario</strong> al menos el mínimo de la ocupación, proporcional a las horas. Mirá <a href="{ROOT}guias/salario-minimo-por-ocupacion-costa-rica/">salario mínimo por ocupación</a>.</li>
  <li><strong>Aguinaldo, vacaciones y seguro de la CCSS</strong>, y póliza de riesgos del trabajo. Mirá <a href="{ROOT}guias/derechos-laborales-costa-rica/">derechos laborales</a>.</li>
  <li><strong>Pago de horas extra y feriados.</strong></li>
  <li><strong>Un contrato claro</strong> y trato digno. Mirá <a href="{ROOT}guias/acoso-laboral-hostigamiento-sexual-costa-rica/">acoso laboral y hostigamiento sexual</a>.</li>
</ul>

<h2>Trabajos que no son para menores</h2>
<p>El trabajo adolescente no puede ser peligroso ni perjudicar tu salud, tu educación o tu desarrollo. El MTSS lo define como el trabajo que es <strong>nocivo para la salud o el desarrollo</strong>. Cosas como cargar mucho peso, manejar maquinaria peligrosa, usar químicos o trabajar en lugares de riesgo suelen estar vedadas. Si tenés dudas sobre un trabajo concreto, consultá antes de aceptarlo.</p>

<h2>Antes de aceptar</h2>
<ol>
  <li><strong>Consultá el permiso:</strong> para que una persona adolescente trabaje pueden exigirse requisitos como la autorización del PANI y el consentimiento de tus padres o tutores. Confirmalo con el PANI y con el MTSS, porque el trámite lo debe gestionar el patrono.</li>
  <li><strong>Pedí que te den un contrato</strong> con el horario y el salario. Mirá <a href="{ROOT}guias/tipos-de-contrato-periodo-de-prueba-costa-rica/">tipos de contrato</a>.</li>
  <li><strong>Que no interfiera con el estudio.</strong> El colegio es parte de tu protección.</li>
  <li><strong>Hablalo con tus padres o encargados.</strong></li>
</ol>

<h2>Opciones para empezar</h2>
<ul>
  <li><strong>Trabajos de medio tiempo</strong> o de fin de semana compatibles con tus estudios. Mirá <a href="{ROOT}guias/trabajar-y-estudiar-costa-rica/">trabajar y estudiar</a>.</li>
  <li><strong>Cursos del INA</strong> para sumar conocimientos. Mirá <a href="{ROOT}guias/cursos-ina-becas-capacitacion-costa-rica/">cursos del INA y becas</a>.</li>
  <li>Cuando cumplás 18, mirá la guía de <a href="{ROOT}guias/primer-empleo-costa-rica/">primer empleo</a>.</li>
</ul>

<h2>Si te sentís en riesgo o no te respetan</h2>
<p>Consultá al MTSS (800-TRABAJO, 800 872 2256) o al PANI. Una persona menor de edad puede acudir a las autoridades. Mirá también <a href="{ROOT}guias/estafas-laborales-costa-rica/">estafas laborales</a>: a los jóvenes les ofrecen "trabajos fáciles" que son engaños.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://escuelajudicialpj.poder-judicial.go.cr/Archivos/bibliotecaVirtual/otrasPublicaciones/brochures/Persona-Trabajadora-Adolescente.pdf" target="_blank" rel="noopener">Poder Judicial: Persona adolescente trabajadora</a></li>
  <li><a href="https://www.mtss.go.cr/seguridad-social/trabajo-infantil/trabajo-infantil/guia_informativa_gobiernos_locales.pdf" target="_blank" rel="noopener">MTSS: guía informativa sobre trabajo infantil y adolescente</a></li>
  <li><a href="https://es.wikisource.org/wiki/C%C3%B3digo_de_Trabajo,_de_27_de_agosto_de_1943,_(cr):_T%C3%ADtulo_2._Cap%C3%ADtulo_1" target="_blank" rel="noopener">Código de Trabajo, arts. 46 y 47</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Puedo trabajar a los 14?</h3>
<p>El trabajo de menores de 15 años está prohibido por el Código de la Niñez y la Adolescencia.</p>
<h3>¿Me pueden pagar menos por ser menor?</h3>
<p>El salario debe respetar el mínimo de la ocupación y se te debe pagar completo. Si te pagan menos, consultá al MTSS.</p>
<h3>¿Puedo trabajar de noche?</h3>
<p>La jornada autorizada para adolescentes es de 6 horas diarias y existen restricciones sobre el trabajo nocturno. Consultalo con el MTSS antes de aceptar un turno de noche.</p>
`,
  },
  {
    slug: 'cuotas-ccss-pension-ivm-costa-rica',
    title: 'Cuotas de la CCSS y pensión IVM: cómo revisar las tuyas',
    description: 'Qué son las cuotas de la CCSS y cómo se llega a la pensión por vejez (IVM): 65 años y 300 cuotas, cómo revisar tus cuotas y qué hacer si tu patrono no te reporta.',
    h1: 'Cuotas de la CCSS y pensión: cómo revisar las tuyas',
    lead: 'Cada mes te rebajan para tu pensión. Revisá que tu patrono las esté reportando bien, porque de eso depende tu pensión futura.',
    date: '2026-10-13',
    html: `
${AVISO}
<h2>Qué son las cuotas</h2>
<p>De tu salario se descuenta un aporte a la <strong>CCSS</strong>: seguro de salud (SEM) y pensión del régimen de <strong>Invalidez, Vejez y Muerte (IVM)</strong>. Tu patrono también aporta. Mirá cuánto se descuenta en la guía de <a href="{ROOT}guias/salario-bruto-neto-deducciones-costa-rica/">salario bruto y neto</a>. Cada mes que tu patrono reporta y paga es una <strong>cuota</strong> que cuenta para tu pensión.</p>

<h2>Cuándo te podés pensionar por vejez</h2>
<p>Según el Reglamento del Seguro de Invalidez, Vejez y Muerte, tiene derecho a la pensión por vejez ordinaria quien alcance los <strong>65 años de edad y haya contribuido con al menos 300 cuotas</strong> (25 años de cotización). El reglamento también contempla otras modalidades (con condiciones distintas), por lo que conviene consultar tu caso en la CCSS. El monto depende de tus salarios reportados y de las cuotas acumuladas.</p>

<h2>Por qué importa que reporten tu salario real</h2>
<ul>
  <li>Una <strong>cuota reportada con menos salario</strong> da una pensión más baja.</li>
  <li>Los meses <strong>sin reportar</strong> no cuentan.</li>
  <li>También afecta tu <strong>incapacidad</strong>: el subsidio se calcula con tus salarios reportados. Mirá la <a href="{ROOT}guias/calculadora-incapacidad-costa-rica/">calculadora de incapacidad</a>.</li>
  <li>Y tu <strong>seguro de salud</strong> y el de tu familia.</li>
</ul>

<h2>Cómo revisar tus cuotas</h2>
<ol>
  <li><strong>Oficina Virtual de la CCSS</strong> (en el sitio oficial ccss.sa.cr): podés consultar tu historial de cotización con tu cédula.</li>
  <li><strong>En una sucursal de la CCSS</strong>: pedí un estado de cuenta o historial de cuotas.</li>
  <li><strong>Revisá tu colilla de pago</strong> y compará el salario con lo que aparece reportado.</li>
</ol>
<p>Hacelo al menos una vez al año, y cada vez que cambiés de trabajo.</p>

<h2>Qué hacer si tu patrono no te reporta o te reporta de menos</h2>
<ol>
  <li><strong>Pedí que lo corrijan por escrito</strong>, con tu colilla y el historial de la CCSS.</li>
  <li><strong>Denunciá en la CCSS</strong> (Inspección) y consultá al MTSS: 800-TRABAJO (800 872 2256). Mirá la <a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">guía para denunciar</a>.</li>
  <li><strong>Guardá pruebas</strong> de que trabajaste y de lo que cobraste. Mirá <a href="{ROOT}guias/trabajo-informal-derechos-sin-contrato-costa-rica/">trabajo informal</a>.</li>
</ol>

<h2>Cómo tramitar la pensión</h2>
<p>Cuando estés por cumplir los requisitos, la CCSS permite iniciar el trámite de pensión por vejez, incluso en línea desde la Oficina Virtual. Conviene empezar con tiempo, con tu cédula y tus documentos. Los pasos exactos y los requisitos cambian: revisalos en el sitio de la CCSS o en la SUPEN.</p>

<h2>Si trabajás por tu cuenta</h2>
<p>Como persona independiente podés afiliarte y cotizar tus propias cuotas. Mirá <a href="{ROOT}guias/trabajar-por-cuenta-propia-costa-rica/">trabajar por cuenta propia</a>.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://sinalevi.go.cr/ResultadosNormativa/Informacion?param1=26485&param2=141400&param3=1&param4=" target="_blank" rel="noopener">Reglamento del Seguro de Invalidez, Vejez y Muerte (SINALEVI)</a></li>
  <li><a href="https://www.ccss.sa.cr/pensionados" target="_blank" rel="noopener">CCSS: pensionados y trámites</a></li>
  <li><a href="https://www.supen.fi.cr/en/tramites-para-pensionarme" target="_blank" rel="noopener">SUPEN: trámites para pensionarme</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Cuántas cuotas necesito?</h3>
<p>Para la pensión por vejez ordinaria, 300 cuotas (25 años) y 65 años de edad. Hay otras modalidades con requisitos distintos.</p>
<h3>¿Cuentan los meses que trabajé sin que me reportaran?</h3>
<p>No cuentan como cuotas mientras no se reporten. Por eso conviene reclamar y denunciar.</p>
<h3>¿La pensión del IVM es lo mismo que la pensión complementaria?</h3>
<p>No. El IVM es el régimen básico de la CCSS. La pensión complementaria es un ahorro adicional que administra una operadora de pensiones.</p>
`,
  },
  {
    slug: 'trabajo-personas-con-discapacidad-costa-rica',
    title: 'Trabajo para personas con discapacidad en Costa Rica: derechos',
    description: 'Derechos laborales de las personas con discapacidad en Costa Rica: Ley 8862 (5 % de plazas en el sector público), Ley 7600, no discriminación y dónde buscar apoyo.',
    h1: 'Trabajo para personas con discapacidad en Costa Rica',
    lead: 'Tenés derecho a un empleo adecuado a tus condiciones y a no ser discriminada o discriminado. Esto es lo que dice la ley y dónde buscar apoyo.',
    date: '2026-10-13',
    html: `
${AVISO}
<h2>Tu derecho a trabajar</h2>
<p>Según la guía del MTSS sobre inclusión laboral, el Estado garantiza a las personas con discapacidad, tanto en zonas rurales como urbanas, el <strong>derecho a un empleo adecuado a sus condiciones y necesidades</strong>. Esto se apoya en la Ley 7600 de Igualdad de Oportunidades para las Personas con Discapacidad y en la Ley 8862 para el sector público.</p>

<h2>Ley 8862: sector público</h2>
<p>La Ley 8862, de Inclusión y Protección Laboral de las Personas con Discapacidad en el Sector Público, establece que las instituciones del Estado deben <strong>reservar al menos el 5 % de sus plazas vacantes</strong> para personas con discapacidad. Su reglamento dice que contratar a una persona sin discapacidad en un puesto reservado es una falta grave. Si te interesa el sector público, mirá las convocatorias de cada institución y consultá al CONAPDIS.</p>

<h2>Sector privado: no discriminación y apoyos</h2>
<p>En el sector privado no se aplica la cuota del 5 %, pero la discriminación en el empleo está prohibida. Tu empleador no debe tratarte distinto, pagarte menos ni despedirte por tu discapacidad, y debe respetar tus derechos como a cualquier persona. Mirá <a href="{ROOT}guias/derechos-laborales-costa-rica/">derechos laborales</a>.</p>
<p>Si necesitás <strong>ajustes en el puesto</strong> (acceso, horario, equipo o apoyos), pedilos por escrito y explicá qué te facilitaría el trabajo. Muchos ajustes son simples y de bajo costo.</p>

<h2>Dónde buscar apoyo para encontrar trabajo</h2>
<ul>
  <li><strong>CONAPDIS</strong> (Consejo Nacional de Personas con Discapacidad): publica oportunidades y orienta sobre derechos.</li>
  <li><strong>MTSS:</strong> tiene programas e información sobre inclusión laboral y la Agencia Nacional de Empleo. Mirá <a href="{ROOT}guias/bolsas-de-empleo-costa-rica/">bolsas de empleo</a>.</li>
  <li><strong>INA:</strong> capacitación gratuita para ampliar tus opciones. Mirá <a href="{ROOT}guias/cursos-ina-becas-capacitacion-costa-rica/">cursos del INA</a>.</li>
  <li><strong>Trabajo remoto:</strong> puede ser una buena opción si el transporte o el lugar son una barrera. Mirá <a href="{ROOT}empleos/remoto/">trabajos remotos</a>.</li>
</ul>

<h2>Cómo prepararte para postular</h2>
<ol>
  <li>Armá tu <a href="{ROOT}herramientas/armador-de-curriculum/">currículum</a> centrado en lo que sabés hacer.</li>
  <li>Decidí cuándo y cómo hablar de tu discapacidad: no estás obligado a contarlo todo, pero si necesitás un ajuste para la entrevista, pedilo con tiempo.</li>
  <li>Preparate con la guía de <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">entrevista</a> y las <a href="{ROOT}guias/preguntas-entrevista-por-puesto-costa-rica/">preguntas por puesto</a>.</li>
  <li>Verificá que la oferta sea real con el <a href="{ROOT}herramientas/verificador-de-ofertas-falsas/">verificador de ofertas</a>.</li>
</ol>

<h2>Si te discriminan</h2>
<p>Guardá pruebas (mensajes, correos, testigos) y consultá al MTSS: 800-TRABAJO (800 872 2256), al CONAPDIS o a la Defensoría de los Habitantes. Mirá la <a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">guía para denunciar</a>.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.mtss.go.cr/seguridad-social/discapacidad/ABC_inclusion_laboral_discapacidad.pdf" target="_blank" rel="noopener">MTSS: ABC de la inclusión laboral de las personas con discapacidad</a></li>
  <li><a href="https://sinalevi.go.cr/ResultadosNormativa/Informacion?param1=69886&param2=&param3=1&param4=" target="_blank" rel="noopener">Reglamento a la Ley 8862 (SINALEVI)</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Las empresas privadas tienen que reservar plazas?</h3>
<p>La reserva del 5 % de la Ley 8862 se aplica al sector público. En el privado rige la prohibición de discriminar.</p>
<h3>¿Tengo que decir mi discapacidad en el currículum?</h3>
<p>No estás obligado. Decidí según tu situación y lo que necesites para el proceso.</p>
<h3>¿Dónde veo plazas reservadas?</h3>
<p>En las convocatorias de cada institución pública y en los avisos del CONAPDIS.</p>
`,
  },
  {
    slug: 'cursos-ina-becas-capacitacion-costa-rica',
    title: 'Cursos del INA gratis y becas para capacitarte en Costa Rica',
    description: 'Cómo inscribirte en los cursos gratuitos del INA en Costa Rica, qué ofrecen, cuándo hay matrícula y otras opciones para capacitarte sin pagar.',
    h1: 'Cursos del INA gratis y opciones de becas en Costa Rica',
    lead: 'Capacitarte sube tus posibilidades de conseguir mejor trabajo y mejor salario. El INA es la puerta más grande y es gratuita.',
    date: '2026-10-13',
    html: `
${AVISO}
<h2>Qué es el INA</h2>
<p>El <strong>Instituto Nacional de Aprendizaje (INA)</strong> ofrece cursos y programas técnicos en todo el país, presenciales y virtuales, en áreas como tecnología, gastronomía, mecánica, redes, turismo y gestión empresarial. Según el propio INA, el acceso a sus programas es libre y gratuito. Algunos programas piden requisitos de escolaridad o de edad; revisalos en la ficha de cada curso.</p>

<h2>Cómo inscribirte</h2>
<ol>
  <li><strong>Entrá a ina.ac.cr</strong> y buscá la sección de cursos o la <strong>búsqueda de cursos</strong>.</li>
  <li><strong>Filtrá</strong> por área, regional (sede) y modalidad (presencial o virtual). Solo se muestran los cursos con fechas de matrícula definidas.</li>
  <li><strong>Revisá los requisitos</strong> del curso: escolaridad, edad, horarios y documentos.</li>
  <li><strong>Inscribite en el período de matrícula.</strong> El INA abre períodos de inscripción en fechas específicas durante el año, así que revisá su calendario y sus redes oficiales.</li>
  <li><strong>Seguí las indicaciones</strong> que te envíen por correo (por ejemplo, la inducción o las pruebas de ingreso).</li>
</ol>
<p>Si tenés dudas, el INA atiende por teléfono y WhatsApp al 2210-6000.</p>

<h2>Qué cursos conviene buscar según el trabajo</h2>
<ul>
  <li><strong>Cocina y restaurantes:</strong> manipulación de alimentos, cocina básica, servicio. Mirá <a href="{ROOT}guias/trabajo-cocina-restaurantes-costa-rica/">trabajar en restaurantes y cocina</a>.</li>
  <li><strong>Logística y bodega:</strong> inventarios, montacargas, seguridad. Mirá <a href="{ROOT}guias/trabajo-bodega-logistica-costa-rica/">bodega y logística</a>.</li>
  <li><strong>Servicio al cliente e inglés:</strong> idiomas y atención. Mirá <a href="{ROOT}guias/trabajar-call-center-costa-rica/">call center</a>.</li>
  <li><strong>Tecnología y oficina:</strong> Excel, programación, soporte técnico.</li>
  <li><strong>Oficios:</strong> electricidad, soldadura, mecánica y construcción.</li>
</ul>

<h2>Otras formas de capacitarte sin pagar</h2>
<ul>
  <li><strong>Programas del Estado y del MTSS</strong> para empleo y capacitación: los programas y requisitos cambian cada año, así que revisá las páginas de MTSS y de la Agencia Nacional de Empleo.</li>
  <li><strong>Becas de estudio</strong> para colegio y universidad (por ejemplo, de FONABE, IMAS y de cada universidad): los requisitos y las fechas varían.</li>
  <li><strong>Cursos en línea gratuitos</strong> de plataformas educativas.</li>
</ul>
<p>Antes de pagar un "curso" que promete trabajo, tené cuidado: un trabajo de verdad no te cobra por contratarte. Mirá la guía de <a href="{ROOT}guias/estafas-laborales-costa-rica/">estafas laborales</a> y el <a href="{ROOT}herramientas/verificador-de-ofertas-falsas/">verificador de ofertas</a>.</p>

<h2>Cómo sacarle provecho</h2>
<ol>
  <li><strong>Escogé según las ofertas reales:</strong> revisá qué piden en los <a href="{ROOT}">bretes de TicoBrete</a> y estudiá lo que más aparece.</li>
  <li><strong>Pedí el certificado</strong> y ponelo en tu <a href="{ROOT}herramientas/armador-de-curriculum/">currículum</a>.</li>
  <li><strong>Combiná estudio y trabajo.</strong> Mirá <a href="{ROOT}guias/trabajar-y-estudiar-costa-rica/">trabajar y estudiar</a>.</li>
  <li>Más adelante, usá lo aprendido para <a href="{ROOT}guias/como-pedir-aumento-costa-rica/">pedir un aumento</a> o para <a href="{ROOT}guias/pretension-salarial-cuanto-pedir-costa-rica/">negociar un mejor salario</a>.</li>
</ol>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.ina.ac.cr/BusquedaCursos" target="_blank" rel="noopener">INA: búsqueda de cursos</a></li>
  <li><a href="https://www.ina.ac.cr/SitePages/Faq.aspx" target="_blank" rel="noopener">INA: preguntas frecuentes</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Los cursos del INA cuestan?</h3>
<p>Según el INA, el acceso a sus programas es libre y gratuito. Algunos pueden pedir materiales o gastos propios, según el curso.</p>
<h3>¿Necesito el colegio terminado?</h3>
<p>Depende del programa. Hay cursos sin requisito de escolaridad y programas técnicos que sí piden estudios previos. Revisá la ficha del curso.</p>
<h3>¿Cuándo es la matrícula?</h3>
<p>El INA abre períodos de inscripción durante el año, con fechas distintas según el servicio. Seguí sus canales oficiales para no perder los plazos.</p>
`,
  },
];