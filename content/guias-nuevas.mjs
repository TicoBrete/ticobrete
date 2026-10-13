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
<p>Si no das el preaviso completo, el empleador podría reclamarlo. Hay criterios distintos sobre si puede descontarlo directamente de tu liquidación, así que si te lo quieren rebajar, consultá antes al MTSS.</p>

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
  <li><strong>Pedí tu constancia de trabajo</strong> y, si querés, una carta de recomendación.</li>
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
<p>Tu empleador podría reclamarlo. Si te quieren rebajar dinero, consultá al MTSS antes de firmar.</p>
<h3>¿Me pueden negar la renuncia?</h3>
<p>No. Es un derecho tuyo terminar el contrato avisando como corresponde.</p>
<h3>¿Puedo renunciar por WhatsApp?</h3>
<p>Mejor por escrito y con firma de recibido, o por correo con confirmación. Es la prueba de la fecha en que avisaste.</p>
`,
  },
];
