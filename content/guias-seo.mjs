// Guías pensadas para responder lo que la gente busca en Google sobre trabajo en Costa Rica.
// Los datos legales vienen de fuentes oficiales (MTSS, Código de Trabajo, Ley 9738). Revisar cada año los montos.
const AVISO = `<aside class="note"><strong>Información general, no asesoría legal.</strong> Las leyes y los montos cambian. Para tu caso concreto, consultá al Ministerio de Trabajo (MTSS) o a una persona abogada. Última revisión de esta guía: 9 de octubre de 2026.</aside>`;

export const GUIAS_SEO = [
  {
    slug: 'salario-minimo-costa-rica',
    title: 'Salario mínimo en Costa Rica 2026: cuánto es y cómo se aplica',
    description: 'Cuánto es el salario mínimo en Costa Rica en 2026, cómo se define según la ocupación, cuánto subió (1,63 %), cómo calcular tu pago por hora y qué hacer si te pagan menos.',
    h1: 'Salario mínimo en Costa Rica 2026',
    lead: 'No existe un solo salario mínimo: depende de la ocupación. Así funciona, cuánto subió este año y cómo revisar que te estén pagando lo que corresponde.',
    date: '2026-10-09',
    html: `
${AVISO}
<h2>¿Cuánto es el salario mínimo en 2026?</h2>
<p>Desde el <strong>1 de enero de 2026</strong> rige un aumento general de <strong>1,63 %</strong> a los salarios mínimos del sector privado (Decreto Ejecutivo 45303-MTSS). Para la ocupación <strong>no calificada</strong>, el mínimo ronda los <strong>₡373.092 al mes</strong>, o unos <strong>₡12.436 por día</strong> de jornada ordinaria.</p>
<p>Ese es el punto de partida más bajo. Otras ocupaciones tienen un mínimo mayor, y el <strong>trabajo doméstico</strong> recibió un ajuste mayor que el general.</p>

<h2>¿Por qué no hay un solo salario mínimo?</h2>
<p>El Consejo Nacional de Salarios define el mínimo por <strong>tipo de ocupación</strong>, y cada año se publica una lista oficial. Las ocupaciones se agrupan en:</p>
<ul>
  <li><strong>No calificadas:</strong> por ejemplo peón de construcción, misceláneo, empacador o salonero.</li>
  <li><strong>Semicalificadas:</strong> por ejemplo dependiente, ayudante de cocina o montacarguista.</li>
  <li><strong>Calificadas:</strong> por ejemplo cajero, agente de seguridad, electricista o cocinero.</li>
  <li><strong>Especializadas y técnicas.</strong></li>
  <li><strong>Profesionales</strong> con título universitario, y <strong>servicio doméstico</strong>.</li>
</ul>
<p>Buscá tu ocupación en la <a href="https://www.mtss.go.cr/temas-laborales/salarios/salario_minimo.html" target="_blank" rel="noopener">lista oficial de salarios mínimos del MTSS</a>. Es la única fuente que vale al reclamar.</p>

<h2>¿Cuánto es por hora?</h2>
<p>Como ejemplo ilustrativo: si el mínimo diario de una ocupación es ₡12.436 y trabajás una jornada diurna de 8 horas, cada hora ordinaria vale unos <strong>₡1.555</strong>. Si hacés horas extra, cada una se paga con un 50 % adicional, o sea, unos <strong>₡2.332</strong> en este ejemplo. Calculá con el monto de tu ocupación, no con este.</p>

<h2>¿El salario mínimo incluye aguinaldo, vacaciones y CCSS?</h2>
<p>No. El salario mínimo es lo que te pagan por trabajar. Además te corresponden el <a href="{ROOT}guias/aguinaldo-costa-rica/">aguinaldo</a>, las <a href="{ROOT}guias/derechos-laborales-costa-rica/">vacaciones</a> y el seguro de la CCSS, que tu empleador debe pagar y reportar con tu salario real.</p>

<h2>¿Y si me pagan menos?</h2>
<ol>
  <li><strong>Revisá tu ocupación</strong> en la lista oficial y comparala con tu colilla de pago.</li>
  <li><strong>Guardá pruebas:</strong> contrato, colillas, mensajes y comprobantes.</li>
  <li><strong>Hablá con tu empleador</strong> por escrito, con calma.</li>
  <li><strong>Denunciá ante el MTSS</strong> si no se corrige. Mirá nuestra <a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">guía para denunciar</a>.</li>
</ol>
<p>El mínimo es un derecho irrenunciable: aunque firmés aceptando menos, no es válido.</p>

<h2>El mínimo es un piso, no una meta</h2>
<p>Muchas ofertas pagan más que el mínimo, sobre todo en puestos con inglés, tecnología o experiencia. Antes de aceptar, compará con ofertas parecidas y, cuando llegue el momento, usá esa información para <a href="{ROOT}guias/como-pedir-aumento-costa-rica/">pedir un aumento</a>.</p>

<h2>Un aviso importante</h2>
<p>Los salarios mínimos se actualizan cada año, normalmente a inicios de enero. Si lees esta guía en otro año, confirmá los montos nuevos en el sitio del MTSS. Si trabajás en el sector público, tu salario se rige por otras escalas.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.mtss.go.cr/temas-laborales/salarios/salario_minimo.html" target="_blank" rel="noopener">MTSS: salarios mínimos</a></li>
  <li>Decreto Ejecutivo 45303-MTSS (salarios mínimos 2026).</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Cuál es el salario mínimo de un misceláneo o conserje?</h3>
<p>Aparecen en la ocupación no calificada, con un mínimo cercano a los ₡373.092 mensuales en 2026. Confirmá el monto exacto en la lista del MTSS.</p>
<h3>¿Quién fija el salario mínimo?</h3>
<p>El Consejo Nacional de Salarios, y se oficializa por decreto.</p>
<h3>¿Un trabajo de medio tiempo también tiene salario mínimo?</h3>
<p>Sí, proporcional a las horas que trabajás.</p>
`,
  },
  {
    slug: 'teletrabajo-ley-costa-rica',
    title: 'Teletrabajo en Costa Rica: qué dice la Ley 9738',
    description: 'Qué dice la ley de teletrabajo de Costa Rica (Ley 9738): es voluntario, contrato o adenda, quién paga el equipo y la luz, jornada, riesgos de trabajo y obligaciones.',
    h1: 'Teletrabajo en Costa Rica: tus derechos según la Ley 9738',
    lead: 'Trabajar desde casa no te quita derechos. Esto es lo que dice la ley sobre equipo, horario, contrato y qué pasa si algo falla.',
    date: '2026-10-09',
    html: `
${AVISO}
<h2>¿Qué es el teletrabajo según la ley?</h2>
<p>La Ley 9738 lo define como la modalidad de trabajo que se realiza <strong>fuera de las instalaciones del empleador</strong>, usando tecnologías de la información y comunicación. Puede ser <strong>domiciliario</strong> (desde tu casa), <strong>móvil</strong> (trabajo itinerante con equipos portátiles) o en un <strong>telecentro</strong>. Aplica al sector privado y a todo el sector público.</p>

<h2>Es voluntario</h2>
<p>El teletrabajo es <strong>voluntario para la persona trabajadora y para la empleadora</strong>. Puede acordarse desde el inicio o después.</p>
<ul>
  <li>Si lo acordaron <strong>después</strong> de empezar a trabajar, quien lo pidió puede pedir la revocatoria con al menos <strong>10 días naturales de anticipación</strong>, de forma justificada y siguiendo el procedimiento del centro de trabajo.</li>
  <li>Si el teletrabajo era una condición <strong>desde el inicio</strong> de la relación laboral, no podés exigir después trabajar en las instalaciones, salvo que ambas partes lo acuerden.</li>
</ul>

<h2>Tu contrato o adenda</h2>
<p>Para que el teletrabajo tenga el respaldo de la ley, debe firmarse un <strong>contrato de teletrabajo</strong> (o una <strong>adenda</strong> a tu contrato actual). Ahí deben quedar claras, por escrito, las condiciones: cómo se hará el trabajo, y los derechos, obligaciones y responsabilidades de cada parte. Si te ofrecen "teletrabajo" sin nada firmado, pedí que lo escriban.</p>

<h2>Los mismos derechos que en la oficina</h2>
<p>El teletrabajo cambia solo <strong>la organización y la forma</strong> de trabajar. Mantenés los mismos beneficios y obligaciones que alguien con funciones parecidas en las instalaciones. Además:</p>
<ul>
  <li>Ningún acuerdo puede <strong>contradecir el Código de Trabajo en la jornada laboral</strong>.</li>
  <li>El horario puede ser <strong>flexible</strong> dentro de esos límites, si lo acordás con tu jefatura.</li>
  <li>Los criterios de evaluación deben definirse de antemano y ser <strong>proporcionales</strong> a los del centro de trabajo.</li>
  <li>No se puede usar el teletrabajo para <strong>discriminar</strong>. Tenés el mismo acceso a capacitación y a oportunidades de crecimiento.</li>
</ul>

<h2>¿Quién pone el equipo, la luz y el internet?</h2>
<p>La ley obliga a la persona empleadora a <strong>proveer y dar mantenimiento</strong> a los equipos y programas, a reconocer el <strong>valor de la energía</strong> (según una forma de medición acordada) y los <strong>viáticos</strong>, si el trabajo los requiere. También debe <strong>capacitarte</strong> para usar los equipos e <strong>informarte</strong> sobre salud ocupacional y prevención de riesgos.</p>
<p>La excepción: si vos pedís por voluntad propia usar tu <strong>equipo personal</strong> y el empleador acepta, debe quedar claro en el contrato. En ese caso, el empleador puede acceder a la información de la empresa que esté en tu equipo, en tu presencia y respetando tu intimidad.</p>

<h2>Si algo falla, ¿me pagan igual?</h2>
<p>Sí, en estos casos la empresa debe <strong>reconocerte el salario</strong> aunque no puedas teletrabajar:</p>
<ul>
  <li>No te dieron las herramientas, los programas o el trabajo necesarios.</li>
  <li>Tu equipo se dañó y lo reportaste en <strong>24 horas o menos</strong>.</li>
  <li>Los sistemas de la empresa no te dejan trabajar y lo reportaste en <strong>24 horas o menos</strong>.</li>
</ul>
<p>Por eso es importante <strong>avisar rápido y por escrito</strong>.</p>

<h2>Tus obligaciones</h2>
<ul>
  <li>Cumplir los criterios de medición y las políticas de la empresa, incluida la <strong>confidencialidad</strong>.</li>
  <li>Avisar en <strong>24 horas</strong> si no podés trabajar o si tu equipo se daña, se pierde o es robado.</li>
  <li><strong>Cumplir tu jornada y estar disponible</strong> en el horario acordado. La ley dice que incumplirlo puede considerarse <strong>abandono de trabajo</strong>.</li>
</ul>
<p>No sos responsable por imprevistos del equipo, salvo que se demuestre, con un procedimiento, que fueron intencionales o por negligencia.</p>

<h2>Accidentes y riesgos de trabajo</h2>
<p>Se aplican las <strong>mismas pólizas</strong> que en el trabajo presencial. Los accidentes y enfermedades que ocurran con ocasión del teletrabajo, de forma subordinada y remunerada, se consideran riesgos de trabajo.</p>

<h2>¿Y si trabajo remoto para una empresa de otro país?</h2>
<p>La Ley 9738 regula el teletrabajo dentro de una <strong>relación laboral en Costa Rica</strong>. Muchas personas trabajan para empresas del exterior como <strong>independientes</strong>, con otras condiciones, impuestos y seguro. Para eso mirá la <a href="{ROOT}guias/trabajo-remoto-desde-costa-rica/">guía de trabajo remoto desde Costa Rica</a> y consultá con un contador. Podés ver las ofertas actuales en <a href="{ROOT}empleos/remoto/">trabajo remoto</a>.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.mtss.go.cr/elministerio/marco-legal/documentos/9738.pdf" target="_blank" rel="noopener">Ley 9738, Ley para Regular el Teletrabajo (texto publicado por el MTSS)</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Me pueden obligar a teletrabajar?</h3>
<p>No de forma unilateral: la ley dice que es voluntario para ambas partes.</p>
<h3>¿Mi empresa debe pagarme el internet?</h3>
<p>La ley habla de equipos, programas, energía y viáticos. Lo relacionado con el internet debe quedar claro en el contrato o adenda. Preguntalo antes de firmar.</p>
<h3>¿Puedo teletrabajar desde otro lugar que no sea mi casa?</h3>
<p>Depende de lo que diga tu contrato. Si cambiás de lugar de trabajo, avisá y pedí que quede por escrito.</p>
`,
  },
  {
    slug: 'liquidacion-laboral-finiquito-costa-rica',
    title: 'Liquidación laboral en Costa Rica: qué incluye y cómo calcularla',
    description: 'Qué incluye la liquidación laboral en Costa Rica (finiquito): preaviso, cesantía, vacaciones, aguinaldo y salarios pendientes. Con un ejemplo de cálculo paso a paso.',
    h1: 'Liquidación laboral en Costa Rica: qué te tienen que pagar',
    lead: 'Cuando termina un trabajo, tu empleador debe pagarte todo lo pendiente. Esta guía te ayuda a revisar cada rubro antes de firmar.',
    date: '2026-10-09',
    html: `
${AVISO}
<h2>¿Qué es la liquidación?</h2>
<p>También se le llama <strong>finiquito</strong>. Es el pago de todo lo que te corresponde cuando termina tu relación de trabajo. Según el MTSS, el empleador debe liquidar las prestaciones <strong>el mismo día</strong> en que termina la relación laboral.</p>

<h2>¿Qué debe incluir?</h2>
<table class="data-table">
  <thead><tr><th>Rubro</th><th>¿Cuándo aplica?</th></tr></thead>
  <tbody>
    <tr><td><strong>Salarios pendientes</strong> y horas extra</td><td>Siempre, si quedó algo sin pagar.</td></tr>
    <tr><td><strong>Vacaciones</strong> pendientes o proporcionales</td><td>Siempre. Si el contrato termina antes de cumplir 50 semanas, te corresponde al menos un día de vacaciones por cada mes trabajado.</td></tr>
    <tr><td><strong>Aguinaldo proporcional</strong></td><td>Siempre. Es la parte del aguinaldo por el tiempo trabajado en el período.</td></tr>
    <tr><td><strong>Preaviso</strong></td><td>Si te despiden sin justa causa y no te lo dieron en tiempo (contratos por tiempo indefinido).</td></tr>
    <tr><td><strong>Cesantía</strong></td><td>Si la relación termina con responsabilidad del empleador, por ejemplo un despido sin justa causa.</td></tr>
  </tbody>
</table>
<p>Los detalles de los dos últimos rubros, con las tablas oficiales, están en nuestra guía de <a href="{ROOT}guias/despido-cesantia-preaviso-costa-rica/">despido, preaviso y cesantía</a>. El aguinaldo está explicado en la <a href="{ROOT}guias/aguinaldo-costa-rica/">guía del aguinaldo</a>.</p>

<h2>Un ejemplo paso a paso (ilustrativo)</h2>
<p>Imaginá a una persona con <strong>2 años de trabajo</strong>, un salario de <strong>₡500.000 al mes</strong> (₡16.667 por día), que es despedida sin justa causa y sin preaviso:</p>
<ol>
  <li><strong>Cesantía:</strong> año 1 (19,5 días) + año 2 (20 días) = 39,5 días × ₡16.667 = <strong>₡658.333</strong>.</li>
  <li><strong>Preaviso:</strong> más de un año de trabajo equivale a 1 mes, que se paga en dinero si no se dio en tiempo: <strong>₡500.000</strong>.</li>
  <li><strong>Vacaciones proporcionales:</strong> si lleva 5 meses desde sus últimas vacaciones, 5 días × ₡16.667 = <strong>₡83.333</strong>.</li>
  <li><strong>Aguinaldo proporcional:</strong> si desde el 1 de diciembre ganó ₡500.000 durante 10 meses = ₡5.000.000, entre 12 = <strong>₡416.667</strong>.</li>
</ol>
<p><strong>Total aproximado: ₡1.658.333</strong>, más los salarios u horas extra que se le deban. Es solo un ejemplo: el cálculo real usa el promedio de tus salarios de los últimos seis meses y tu tiempo exacto de trabajo.</p>

<h2>Si renuncio, ¿qué me corresponde?</h2>
<p>Normalmente: salarios pendientes, vacaciones, aguinaldo proporcional y, si tenés más de tres meses en un contrato por tiempo indefinido, <strong>dar preaviso</strong>. La cesantía es para terminaciones con responsabilidad del empleador, así que consultá tu caso al MTSS.</p>

<h2>Antes de firmar el finiquito</h2>
<ul>
  <li><strong>Pedí el desglose por escrito</strong> de cada rubro y cómo lo calcularon.</li>
  <li><strong>Compará con tu propio cálculo</strong> y tus últimas colillas de pago.</li>
  <li><strong>No firmes bajo presión.</strong> Pedí tiempo para revisarlo.</li>
  <li><strong>Guardá copia</strong> de todo.</li>
  <li>Si algo no cuadra, consultá al MTSS: 800-TRABAJO (800 872 2256), según sus publicaciones oficiales.</li>
</ul>

<h2>Cuánto tiempo tengo para reclamar</h2>
<p>El MTSS indica que el derecho a reclamar la cesantía se ha interpretado hasta <strong>un año</strong> después de terminada la relación. Los plazos varían según el rubro, así que no esperés.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://mtss.hermes-soft.com/temas-laborales/07_Preaviso_cesantia_ind.pdf" target="_blank" rel="noopener">MTSS: Preaviso y cesantía</a></li>
  <li><a href="https://www.mtss.go.cr/temas-laborales/aguinaldo/aguinaldo.html" target="_blank" rel="noopener">MTSS: aguinaldo</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Se le rebajan cargas sociales a la cesantía?</h3>
<p>Según el MTSS, al pago de la cesantía no se le aplica ninguna deducción por cargas sociales.</p>
<h3>¿Qué pasa si mi empleador no me paga la liquidación?</h3>
<p>Podés reclamar ante el MTSS o por la vía judicial. Mirá nuestra <a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">guía para denunciar</a>.</p>
`,
  },
  {
    slug: 'denunciar-patrono-mtss-costa-rica',
    title: 'Cómo denunciar a tu patrono ante el Ministerio de Trabajo',
    description: 'Cómo presentar una denuncia laboral en Costa Rica ante el MTSS: qué pruebas reunir, dónde ir, por qué canales y qué esperar. Guía práctica sin tecnicismos.',
    h1: 'Cómo denunciar a tu patrono ante el MTSS',
    lead: 'Si tu empleador no te paga, no te respeta el horario o te trata mal, tenés dónde reclamar. Así se prepara y presenta una denuncia.',
    date: '2026-10-09',
    html: `
${AVISO}
<h2>¿Quién recibe las denuncias laborales?</h2>
<p>La <strong>Dirección Nacional de Inspección de Trabajo</strong>, del Ministerio de Trabajo y Seguridad Social (MTSS), es la que atiende denuncias sobre incumplimientos de derechos laborales, incluidas las <strong>prácticas laborales desleales</strong> y el <strong>hostigamiento sexual</strong> en el empleo.</p>

<h2>Cuándo conviene denunciar</h2>
<ul>
  <li>No te pagan el salario o te pagan menos del <a href="{ROOT}guias/salario-minimo-costa-rica/">mínimo</a>.</li>
  <li>No te pagan las horas extra, las vacaciones o el <a href="{ROOT}guias/aguinaldo-costa-rica/">aguinaldo</a>.</li>
  <li>No te aseguran en la CCSS o lo hacen con un salario menor al real.</li>
  <li>No te pagan la <a href="{ROOT}guias/liquidacion-laboral-finiquito-costa-rica/">liquidación</a> al terminar.</li>
  <li>Sufrís acoso u hostigamiento, o represalias por reclamar tus derechos.</li>
</ul>

<h2>Paso 1: Reuní tus pruebas</h2>
<p>Una denuncia con datos y pruebas avanza mucho más rápido. Juntá:</p>
<ul>
  <li><strong>Datos del empleador:</strong> nombre de la empresa o persona, dirección y nombre de la persona que te supervisa.</li>
  <li><strong>Tus datos del trabajo:</strong> puesto, fecha de inicio, horario y salario acordado.</li>
  <li><strong>Pruebas:</strong> contrato, colillas de pago, comprobantes de transferencia, mensajes, correos, fotos de horarios, nombres de compañeros que puedan confirmar los hechos.</li>
  <li><strong>Una línea de tiempo corta:</strong> qué pasó, cuándo y quién lo hizo.</li>
</ul>
<p>Como referencia, el MTSS pide en sus denuncias por prácticas desleales que incluyan los hechos específicos, el nombre de las personas afectadas, el nombre o puesto de quien se presume responsable y la prueba. Si falta información, el inspector puede darte un plazo corto para completarla, y si no se completa, la denuncia se archiva.</p>

<h2>Paso 2: Elegí por dónde presentarla</h2>
<ul>
  <li><strong>En persona</strong>, en una oficina del MTSS. Hay un <a href="https://www.mtss.go.cr/contactenos/mapa-oficinas.html" target="_blank" rel="noopener">mapa de oficinas</a> en su sitio.</li>
  <li><strong>Por el chat</strong> de las salas de atención del MTSS, según el catálogo de trámites del propio ministerio.</li>
  <li><strong>Por teléfono, para consultas:</strong> 800-TRABAJO (800 872 2256).</li>
  <li><strong>Formularios en línea</strong> para temas específicos. Por ejemplo, para el no pago del aguinaldo hay un formulario que se habilita cada año a partir del 21 de diciembre.</li>
</ul>
<p>Los canales cambian, así que revisá en <a href="https://www.mtss.go.cr/" target="_blank" rel="noopener">mtss.go.cr</a> cuál está disponible hoy.</p>

<h2>Paso 3: Después de presentar la denuncia</h2>
<ul>
  <li>Pedí un <strong>comprobante</strong> o número de seguimiento.</li>
  <li>Estate pendiente de llamadas, correos o citaciones del inspector.</li>
  <li>Seguí guardando pruebas nuevas.</li>
  <li>Si el MTSS no puede resolverlo, existe la <strong>vía judicial</strong>, en los juzgados de trabajo. Puede ayudarte una persona abogada o un sindicato.</li>
</ul>

<h2>¿Y si me despiden por denunciar?</h2>
<p>Las represalias por reclamar derechos pueden constituir una práctica laboral desleal y tienen su propia ruta de denuncia ante el MTSS. Si te despiden, mirá nuestra <a href="{ROOT}guias/despido-cesantia-preaviso-costa-rica/">guía de despido, preaviso y cesantía</a> y consultá cuanto antes.</p>

<h2>Consejos</h2>
<ul>
  <li><strong>Mantené la calma y los modales</strong> por escrito: eso te ayuda si el caso llega a un juez.</li>
  <li><strong>No borres mensajes.</strong> Hacé copias de seguridad.</li>
  <li><strong>No esperés meses.</strong> Hay plazos para reclamar.</li>
  <li><strong>Pedí ayuda:</strong> una persona de confianza, un sindicato o una persona abogada.</li>
</ul>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.mtss.go.cr/tramites-servicios/catalogo-tramites/denuncias.html" target="_blank" rel="noopener">MTSS: catálogo de trámites, denuncias</a></li>
  <li><a href="https://www.mtss.go.cr/temas-laborales/" target="_blank" rel="noopener">MTSS: asuntos laborales</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Puedo denunciar sin identificarme?</h3>
<p>Para que la denuncia avance, normalmente necesitan tus datos y los de la empresa. Preguntá en el MTSS cómo se maneja tu caso.</p>
<h3>¿Cuánto cuesta denunciar ante el MTSS?</h3>
<p>Presentar una denuncia ante el MTSS no tiene costo.</p>
<h3>¿Necesito una persona abogada?</h3>
<p>No es obligatorio para denunciar ante el MTSS, pero puede ayudarte, sobre todo si el caso llega a un juzgado.</p>
`,
  },
  {
    slug: 'trabajos-sin-experiencia-costa-rica',
    title: 'Trabajos sin experiencia en Costa Rica: 10 opciones reales',
    description: 'Los trabajos sin experiencia que más se contratan en Costa Rica: servicio al cliente, producción, bodega, ventas, limpieza, restaurantes y más. Qué piden y cómo aplicar.',
    h1: 'Trabajos sin experiencia en Costa Rica: 10 opciones reales',
    lead: 'No necesitás experiencia previa para empezar. Estos son los tipos de trabajo donde más se contrata a gente nueva, y qué suelen pedir.',
    date: '2026-10-09',
    html: `
<p>En TicoBrete podés ver las ofertas que hay hoy con el filtro <a href="{ROOT}">"Sin experiencia o pasantía"</a>. Estas son las áreas donde más se repiten.</p>

<h2>1. Servicio al cliente y call center</h2>
<p>Atender llamadas, chats o clientes en tienda. Muchas empresas <strong>capacitan</strong> a quien entra. Algunos puestos piden inglés. Mirá los <a href="{ROOT}empleos/servicio-cliente/">bretes de servicio al cliente</a> y nuestra guía de <a href="{ROOT}guias/trabajar-call-center-costa-rica/">cómo trabajar en un call center</a>.</p>

<h2>2. Operario de producción y manufactura</h2>
<p>Armar, empacar o revisar productos en plantas y zonas francas. Suelen pedir colegio terminado, disponibilidad de horarios por turnos y ganas de aprender. Hay muchas ofertas en Heredia, Alajuela y Cartago. Mirá los <a href="{ROOT}empleos/manufactura/">bretes de producción y manufactura</a>.</p>

<h2>3. Bodega y logística</h2>
<p>Recibir, ordenar y despachar mercadería. Algunos puestos requieren licencia para montacargas, que luego se puede sacar. Mirá los <a href="{ROOT}empleos/logistica/">bretes de logística y transporte</a>.</p>

<h2>4. Ventas y dependiente de comercio</h2>
<p>Atender clientes en tiendas y supermercados, o vender por comisión. Piden buena presentación y trato amable. Mirá los <a href="{ROOT}empleos/ventas/">bretes de ventas</a>.</p>

<h2>5. Restaurantes y turismo</h2>
<p>Salonero, ayudante de cocina, pilero, barista, recepción en hotel. Es una buena puerta de entrada, sobre todo en zonas turísticas. Mirá los <a href="{ROOT}empleos/turismo/">bretes de turismo y restaurantes</a>.</p>

<h2>6. Limpieza y servicios generales</h2>
<p>Misceláneo, conserje, limpieza de oficinas o de edificios. Suelen pedir responsabilidad y puntualidad. Mirá los <a href="{ROOT}empleos/servicios/">bretes de servicios generales</a>.</p>

<h2>7. Seguridad</h2>
<p>Oficial de seguridad. Normalmente las empresas piden mayoría de edad, buena presencia y pasar una investigación. Varias capacitan a quien entra.</p>

<h2>8. Construcción y oficios</h2>
<p>Peón o ayudante de construcción, jardinería, mantenimiento. Se aprende en el trabajo. Mirá los <a href="{ROOT}empleos/construccion/">bretes de construcción y oficios</a>.</p>

<h2>9. Mensajería y reparto</h2>
<p>Entregar paquetes y documentos. Algunos puestos piden moto o licencia, otros dan el vehículo.</p>

<h2>10. Digitador y oficinista</h2>
<p>Ingresar datos, ordenar archivos y apoyar en oficinas. Piden manejo básico de computadora.</p>

<h2>Cómo aplicar si no tenés experiencia</h2>
<ul>
  <li><strong>Armá un currículum claro</strong> con estudios, cursos y habilidades. Seguí nuestra <a href="{ROOT}guias/curriculum-costa-rica/">guía de currículum</a>.</li>
  <li><strong>Aplicá a varios puestos</strong>, no solo a uno.</li>
  <li><strong>Respondé rápido</strong> cuando te escriban.</li>
  <li><strong>Prepará la entrevista</strong> con la <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">guía de entrevista</a>.</li>
  <li><strong>Revisá el salario mínimo</strong> de tu ocupación en la <a href="{ROOT}guias/salario-minimo-costa-rica/">guía del salario mínimo</a>.</li>
  <li><strong>Desconfiá de quien te cobre</strong>. Leé la <a href="{ROOT}guias/estafas-laborales-costa-rica/">guía de estafas</a>.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Cuál es el trabajo más fácil de conseguir sin experiencia?</h3>
<p>Los de producción, bodega, servicio al cliente, ventas y servicios generales suelen tener más ofertas abiertas a gente nueva.</p>
<h3>¿Puedo conseguir trabajo sin estudios completos?</h3>
<p>Sí, en muchos puestos de producción, limpieza, construcción y servicio. Pero terminar el colegio o hacer un curso técnico del INA te abre más opciones.</p>
<h3>¿Se puede trabajar desde casa sin experiencia?</h3>
<p>Algunos puestos de atención al cliente lo permiten, pero desconfiá de las ofertas que prometen mucho dinero por poco esfuerzo.</p>
`,
  },
  {
    slug: 'trabajar-call-center-costa-rica',
    title: 'Cómo trabajar en un call center en Costa Rica: requisitos',
    description: 'Requisitos para trabajar en un call center en Costa Rica: inglés, pruebas, horarios, proceso de selección y consejos para que te contraten. Guía práctica.',
    h1: 'Cómo trabajar en un call center en Costa Rica',
    lead: 'Los call centers y centros de servicio son de los mayores empleadores del país. Esto es lo que suelen pedir y cómo prepararte.',
    date: '2026-10-09',
    html: `
<h2>¿Qué hace una persona en un call center?</h2>
<p>Atiende clientes por <strong>teléfono, chat o correo</strong>: resuelve dudas, hace ventas, da soporte técnico o gestiona cobros. En Costa Rica hay muchos centros de servicio para empresas del exterior, por eso el inglés pesa tanto. También hay puestos en español para empresas locales y de la región.</p>

<h2>Requisitos más comunes</h2>
<ul>
  <li><strong>Inglés intermedio o avanzado</strong>, oral y escrito, en los puestos bilingües. Algunos aceptan inglés básico con capacitación; otros no piden inglés.</li>
  <li><strong>Colegio terminado</strong> (bachillerato) en la mayoría de ofertas.</li>
  <li><strong>Disponibilidad de horario</strong>, incluidos turnos rotativos, nocturnos y fines de semana.</li>
  <li><strong>Buena comunicación y paciencia</strong> para tratar con personas molestas o apuradas.</li>
  <li><strong>Manejo básico de computadora</strong> y escribir con rapidez.</li>
</ul>

<h2>Cómo es el proceso de selección</h2>
<ol>
  <li><strong>Aplicás</strong> en línea con tu currículum.</li>
  <li><strong>Prueba de idioma y de escritura</strong>, en los puestos bilingües.</li>
  <li><strong>Entrevista</strong> con reclutamiento, a veces en inglés y con simulaciones de llamadas.</li>
  <li><strong>Capacitación inicial</strong>, que en muchas empresas es paga.</li>
  <li><strong>Período de prueba</strong> de los primeros tres meses.</li>
</ol>
<p>Practicá con nuestra guía de <a href="{ROOT}guias/entrevista-en-ingles-costa-rica/">entrevista en inglés</a>.</p>

<h2>Horarios: lo que debés saber</h2>
<p>Los centros de servicio suelen operar de noche o 24 horas. Por ley, la <strong>jornada nocturna</strong> es de 6 horas diarias y 36 semanales, y la diurna, de 8 horas diarias y 48 semanales. Preguntá cuál es la tuya y cómo se pagan las horas extra. Más detalle en la guía de <a href="{ROOT}guias/derechos-laborales-costa-rica/">derechos laborales</a>.</p>

<h2>Ventajas y desventajas</h2>
<ul>
  <li><strong>A favor:</strong> muchas vacantes, capacitación, poca exigencia de experiencia previa, oportunidades de ascenso y, en puestos bilingües, salarios por encima de otros puestos de entrada.</li>
  <li><strong>En contra:</strong> turnos nocturnos o rotativos, metas de desempeño y el estrés de atender personas molestas.</li>
</ul>

<h2>Consejos para que te contraten</h2>
<ul>
  <li><strong>Mejorá tu inglés</strong> con práctica diaria: series, podcasts y conversación.</li>
  <li><strong>Prepará tu currículum</strong> destacando idiomas y habilidades de servicio. Seguí la <a href="{ROOT}guias/curriculum-costa-rica/">guía de currículum</a>.</li>
  <li><strong>Hablá con claridad y calma</strong> en la entrevista.</li>
  <li><strong>Preguntá por el horario, el salario y los beneficios</strong> antes de aceptar.</li>
  <li><strong>Nunca pagués</strong> para que te contraten: ni cursos, ni uniformes ni "reservar puesto".</li>
</ul>

<h2>Dónde ver ofertas</h2>
<p>Revisá los <a href="{ROOT}empleos/servicio-cliente/">bretes de servicio al cliente</a> en TicoBrete, y filtrá por tu provincia: hay ofertas en <a href="{ROOT}empleos/heredia/">Heredia</a>, <a href="{ROOT}empleos/san-jose/">San José</a>, <a href="{ROOT}empleos/alajuela/">Alajuela</a> y <a href="{ROOT}empleos/cartago/">Cartago</a>, además de <a href="{ROOT}empleos/remoto/">trabajo remoto</a>.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿Cuánto inglés necesito?</h3>
<p>Depende del puesto. En los bilingües piden conversación fluida; en otros basta con inglés básico o ninguno. Leé siempre los requisitos de la oferta.</p>
<h3>¿Se puede trabajar en un call center sin experiencia?</h3>
<p>Sí. Muchas empresas capacitan, y es una de las mejores puertas de entrada.</p>
<h3>¿Puedo estudiar y trabajar en un call center?</h3>
<p>Muchas personas lo hacen, aprovechando turnos. Preguntá por la flexibilidad de horario.</p>
`,
  },
  {
    slug: 'carta-de-presentacion-costa-rica',
    title: 'Carta de presentación para trabajo: cómo escribirla (con ejemplo)',
    description: 'Cómo escribir una carta de presentación para aplicar a un trabajo en Costa Rica: estructura, qué decir, errores comunes y un ejemplo listo para adaptar.',
    h1: 'Carta de presentación para trabajo: cómo escribirla',
    lead: 'La carta de presentación es tu oportunidad de explicar por qué sos la persona indicada, con tus propias palabras. Corta, clara y a la medida.',
    date: '2026-10-09',
    html: `
<h2>¿Qué es y cuándo sirve?</h2>
<p>Es un texto breve que acompaña tu <a href="{ROOT}guias/curriculum-costa-rica/">currículum</a> y explica por qué te interesa ese puesto. No siempre la piden, pero cuando la pedís o la ofrecés, te distingue de quienes solo mandan el currículum. A veces se pega directamente en el correo o en el formulario de aplicación.</p>

<h2>La estructura en 4 párrafos cortos</h2>
<ol>
  <li><strong>Saludo y puesto:</strong> a quién le escribís y a qué puesto aplicás.</li>
  <li><strong>Quién sos:</strong> en 2 o 3 líneas, tu experiencia o estudios más relevantes para el puesto.</li>
  <li><strong>Por qué ese puesto y esa empresa:</strong> mostrá que leíste la oferta y sabés qué hace la empresa.</li>
  <li><strong>Cierre:</strong> agradecé, decí que estás disponible para una entrevista y dejá tu contacto.</li>
</ol>

<h2>Ejemplo para adaptar</h2>
<aside class="note"><p><strong>Asunto:</strong> Aplicación al puesto de Asistente de Servicio al Cliente</p>
<p>Estimado equipo de Reclutamiento:</p>
<p>Me llamo [Tu nombre] y les escribo para aplicar al puesto de Asistente de Servicio al Cliente que vi publicado en TicoBrete.</p>
<p>Tengo [X] años de experiencia atendiendo clientes en [lugar o tipo de trabajo], donde aprendí a resolver consultas con paciencia y a trabajar bajo metas. También cuento con [estudios o curso] y manejo de [herramientas o idioma].</p>
<p>Me interesa trabajar en [empresa] porque [razón concreta: su reputación, su tipo de servicio, la oportunidad de capacitación]. Creo que puedo aportar responsabilidad, buena comunicación y ganas de aprender.</p>
<p>Quedo disponible para una entrevista cuando ustedes dispongan. Mi teléfono es [número] y mi correo es [correo]. Muchas gracias por su tiempo.</p>
<p>Saludos cordiales,<br>[Tu nombre completo]</p></aside>

<h2>Si no tenés experiencia</h2>
<p>Cambiá el segundo párrafo por lo que sí tenés: estudios, cursos, voluntariados, trabajos informales o proyectos. Por ejemplo: <em>"Aunque este sería mi primer trabajo formal, ayudé en el negocio de mi familia durante dos años, donde atendía clientes y manejaba la caja."</em> Más ideas en la guía de <a href="{ROOT}guias/primer-empleo-costa-rica/">primer empleo</a>.</p>

<h2>Consejos</h2>
<ul>
  <li><strong>Máximo una página</strong>, o unas 150 a 250 palabras si va en el cuerpo de un correo.</li>
  <li><strong>Escribí una carta distinta para cada puesto.</strong> Cambiá el nombre del puesto y la empresa.</li>
  <li><strong>Evitá frases vacías</strong> como "soy una persona proactiva" sin ejemplos.</li>
  <li><strong>Revisá la ortografía.</strong> Pedile a alguien que la lea.</li>
  <li><strong>Usá un tono respetuoso y natural</strong>, sin exagerar.</li>
  <li><strong>Mandá todo en PDF</strong> y con un nombre claro del archivo.</li>
</ul>

<h2>Errores comunes</h2>
<ul>
  <li>Repetir el currículum palabra por palabra.</li>
  <li>Hablar solo de lo que vos querés, y no de lo que podés aportar.</li>
  <li>Dejar un correo poco serio o información de contacto incorrecta.</li>
  <li>Olvidar cambiar el nombre de la empresa cuando reutilizás la carta.</li>
</ul>

<h2>Después de enviar</h2>
<p>Si pasan unos días sin respuesta, podés escribir con respeto para preguntar cómo va el proceso. Mientras tanto, seguí aplicando a otras ofertas desde los <a href="{ROOT}">bretes más recientes</a> y prepará la <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">entrevista</a>.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿Es obligatoria la carta de presentación?</h3>
<p>No siempre. Si la oferta la pide, hacela. Si no la pide pero hay espacio, puede darte ventaja.</p>
<h3>¿Cuánto debe medir?</h3>
<p>Corta: entre 150 y 250 palabras es suficiente.</p>
<h3>¿Va en el cuerpo del correo o adjunta?</h3>
<p>Ambas opciones sirven. Una versión breve en el cuerpo del correo y el currículum adjunto en PDF funciona bien.</p>
`,
  },
  {
    slug: 'bolsas-de-empleo-costa-rica',
    title: 'Dónde buscar trabajo en Costa Rica: bolsas de empleo y páginas',
    description: 'Las mejores páginas y bolsas de empleo para buscar trabajo en Costa Rica: la Agencia Nacional de Empleo, LinkedIn, Indeed, Computrabajo, empresas, grupos y trabajo remoto.',
    h1: 'Dónde buscar trabajo en Costa Rica: páginas y bolsas de empleo',
    lead: 'No hay una sola página con todos los bretes. Esta es una guía honesta de dónde mirar, qué ofrece cada opción y cómo combinarlas.',
    date: '2026-10-09',
    html: `
<aside class="note">Las páginas mencionadas son de terceros y no están afiliadas a TicoBrete. Los servicios y condiciones pueden cambiar, así que revisá cada sitio.</aside>

<h2>1. Agencia Nacional de Empleo (ANE)</h2>
<p>Es el servicio <strong>gratuito del Ministerio de Trabajo</strong> que conecta a personas que buscan empleo con empresas. Tiene muchas ofertas de producción, seguridad, limpieza, ventas y servicio al cliente. Tenés que <strong>registrarte</strong> para postularte. Parte de sus bretes se muestran también en TicoBrete, con un enlace a su búsqueda.</p>

<h2>2. LinkedIn</h2>
<p>Muy usado para <strong>puestos profesionales, técnicos y corporativos</strong>. Sirve mucho tener un perfil completo, con foto, resumen y experiencia, porque los reclutadores buscan candidatos ahí. También te permite seguir empresas y contactar a reclutadores.</p>

<h2>3. Buscadores y bolsas generales</h2>
<p>Plataformas como <strong>Indeed, Computrabajo y Elempleo</strong> reúnen ofertas de muchos sectores. Te dejan crear alertas por correo y guardar tu currículum. Compará siempre varias y desconfiá de las ofertas que piden dinero.</p>

<h2>4. Las páginas de empleo de las empresas</h2>
<p>Las empresas grandes, sobre todo en zonas francas (dispositivos médicos, tecnología, servicios compartidos), publican sus puestos en sus propias páginas de carreras. TicoBrete lee varias de ellas y te lleva directo a la oferta original.</p>

<h2>5. Grupos y canales en redes</h2>
<p>En <strong>Facebook, WhatsApp y Telegram</strong> hay grupos donde se comparten bretes locales: comercios, restaurantes, talleres y negocios pequeños. Sirven mucho para oficios y puestos de la comunidad, pero también circulan estafas. Verificá siempre y leé nuestra guía de <a href="{ROOT}guias/ofertas-de-trabajo-falsas-whatsapp-facebook/">ofertas falsas por WhatsApp y Facebook</a>.</p>

<h2>6. Plataformas de trabajo remoto</h2>
<p>Si querés trabajar desde casa para empresas del exterior, hay plataformas especializadas. En TicoBrete reunimos ofertas de varias en la página de <a href="{ROOT}empleos/remoto/">trabajo remoto</a>, y solo incluimos las abiertas a Costa Rica o Latinoamérica.</p>

<h2>7. TicoBrete</h2>
<p>TicoBrete es un buscador gratuito que <strong>junta ofertas de varias de estas fuentes</strong> en un solo lugar: empresas, la ANE y trabajo remoto. Podés filtrar por <a href="{ROOT}empleos/san-jose/">provincia</a>, categoría, modalidad y fecha, y siempre te llevamos al anuncio original. No pedimos registro.</p>

<h2>8. Tu red de contactos</h2>
<p>Mucha gente encuentra su brete por recomendación. Contale a tus conocidos, ex compañeros y familia que estás buscando y qué tipo de trabajo querés.</p>

<h2>Cómo combinar todo sin volverte loco</h2>
<ol>
  <li><strong>Dejá listo tu currículum</strong> con nuestra <a href="{ROOT}guias/curriculum-costa-rica/">guía</a>.</li>
  <li><strong>Revisá TicoBrete una vez al día</strong> con el filtro de las últimas 24 horas.</li>
  <li><strong>Creá alertas</strong> en una o dos bolsas generales y tené tu perfil de LinkedIn al día.</li>
  <li><strong>Anotá a dónde aplicaste</strong> para no perder el rastro.</li>
  <li><strong>Prepará las entrevistas</strong> con la <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">guía</a>.</li>
</ol>

<h2>Señales de una buena bolsa de empleo</h2>
<ul>
  <li>No te cobra por postularte.</li>
  <li>Muestra el nombre de la empresa y los detalles del puesto.</li>
  <li>Tiene una forma clara de reportar ofertas sospechosas.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Cuál es la mejor página para buscar trabajo en Costa Rica?</h3>
<p>Depende del tipo de trabajo. Para oficios y puestos operativos, la ANE y los grupos locales son muy útiles; para puestos profesionales, LinkedIn; y para ver varias fuentes a la vez, TicoBrete.</p>
<h3>¿Es seguro subir mi currículum a una página de empleo?</h3>
<p>Subilo solo a sitios conocidos y evitá poner datos sensibles como tu número de cédula o tus datos bancarios.</p>
<h3>¿Cuánto cuesta buscar trabajo en estas páginas?</h3>
<p>Para quien busca, deberían ser gratuitas. Si alguien te cobra por conseguirte trabajo, desconfiá.</p>
`,
  },
  {
    slug: 'entrevista-en-ingles-costa-rica',
    title: 'Entrevista de trabajo en inglés: preguntas y respuestas de ejemplo',
    description: 'Preguntas frecuentes de una entrevista de trabajo en inglés para call centers y empresas en Costa Rica, con respuestas de ejemplo, frases útiles y consejos de práctica.',
    h1: 'Entrevista de trabajo en inglés: preguntas y respuestas',
    lead: 'Si el puesto pide inglés, la entrevista casi seguro será en ese idioma. Estas son las preguntas más comunes y cómo responderlas sin quedarte en blanco.',
    date: '2026-10-09',
    html: `
<h2>Antes que nada: qué evalúan</h2>
<p>En una entrevista en inglés, las empresas miran tres cosas: que <strong>te entiendan</strong>, que <strong>entendás</strong> lo que te preguntan y que <strong>te comuniqués con claridad y confianza</strong>. No necesitás hablar perfecto: se valora la claridad, no el acento.</p>

<h2>Las preguntas más comunes (con ejemplos)</h2>
<h3>1. "Tell me about yourself."</h3>
<p><em>"My name is María. I live in Heredia and I have two years of experience in customer service. I enjoy helping people and I learn quickly. I'm looking for an opportunity to grow in a bilingual role."</em></p>

<h3>2. "Why do you want to work here?"</h3>
<p><em>"I'm interested in this company because it offers training and growth opportunities. I like working with people and I want to improve my English every day."</em></p>

<h3>3. "What are your strengths?"</h3>
<p><em>"I'm patient, responsible and I communicate clearly. For example, in my last job I handled difficult customers calmly and solved their problems."</em></p>

<h3>4. "What is your biggest weakness?"</h3>
<p><em>"Sometimes I get nervous speaking English, but I practice every day by watching series and talking with friends. I'm improving a lot."</em></p>

<h3>5. "Tell me about a time you solved a problem."</h3>
<p><em>"Once a customer was angry because his order was late. I listened carefully, apologized, and found a solution quickly. He was happy in the end."</em></p>

<h3>6. "Are you available to work night shifts or weekends?"</h3>
<p><em>"Yes, I'm available to work rotating shifts, including nights and weekends."</em> (Respondé con honestidad: no digás que sí si no podés.)</p>

<h3>7. "What are your salary expectations?"</h3>
<p><em>"I would like a salary in line with the market for this position. Could you tell me the range for this role?"</em></p>

<h3>8. "Where do you see yourself in five years?"</h3>
<p><em>"I see myself growing in this company, learning new skills and maybe leading a team."</em></p>

<h3>9. "Do you have any questions for us?"</h3>
<p><em>"Yes. What does the training process look like? And what does a typical day look like in this role?"</em></p>

<h2>Frases útiles cuando no entendés</h2>
<ul>
  <li><em>"Could you repeat that, please?"</em>: ¿Podría repetirlo, por favor?</li>
  <li><em>"Could you speak a little slower?"</em>: ¿Podría hablar un poco más despacio?</li>
  <li><em>"Let me think for a moment."</em>: Déjeme pensar un momento.</li>
  <li><em>"What I mean is..."</em>: Lo que quiero decir es…</li>
  <li><em>"I'm sorry, I didn't understand the question."</em>: Disculpe, no entendí la pregunta.</li>
</ul>
<p>Pedir que repitan es mucho mejor que contestar algo que no era.</p>

<h2>Cómo practicar</h2>
<ol>
  <li><strong>Escribí tus respuestas</strong> a las preguntas de arriba, con tus datos reales, y leelas en voz alta.</li>
  <li><strong>Grabate</strong> con el celular y escuchate. Es incómodo, pero funciona.</li>
  <li><strong>Practicá con alguien</strong> que te haga preguntas por sorpresa.</li>
  <li><strong>Escuchá inglés todos los días</strong>: series, podcasts y música con subtítulos.</li>
  <li><strong>Aprendé vocabulario del puesto</strong>: customer, order, refund, account, schedule.</li>
</ol>

<h2>Consejos para el día de la entrevista</h2>
<ul>
  <li><strong>Hablá con calma y sonreí</strong>, aunque sea por teléfono: se nota en la voz.</li>
  <li><strong>Respondé con frases completas</strong>, no solo "yes" o "no".</li>
  <li><strong>Sé honesto con tu nivel.</strong> Si decís que sos avanzado y no, se nota enseguida.</li>
  <li><strong>Si es por llamada o video</strong>, buscá un lugar sin ruido y con buena señal.</li>
</ul>

<h2>Más preparación</h2>
<p>Complementá con la guía general de <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">entrevista de trabajo</a> y con la de <a href="{ROOT}guias/trabajar-call-center-costa-rica/">call center</a>. Y mirá los <a href="{ROOT}empleos/servicio-cliente/">bretes de servicio al cliente</a> que piden inglés.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿Qué nivel de inglés necesito para un call center?</h3>
<p>Depende de la oferta. Los puestos bilingües suelen pedir un nivel intermedio-avanzado. Leé los requisitos.</p>
<h3>¿Hay una prueba escrita además de la entrevista?</h3>
<p>Es común. Algunas empresas piden una prueba de escritura, comprensión o una llamada simulada.</p>
<h3>¿Qué hago si me bloqueo en medio de una respuesta?</h3>
<p>Respirá, pedí un momento y retomá con una frase sencilla. Es mejor una respuesta corta y clara que una larga y confusa.</p>
`,
  },
  {
    slug: 'ofertas-de-trabajo-falsas-whatsapp-facebook',
    title: 'Ofertas de trabajo falsas en WhatsApp y Facebook: cómo detectarlas',
    description: 'Cómo reconocer ofertas de trabajo falsas en WhatsApp, Facebook y Telegram en Costa Rica: mensajes típicos, banderas rojas, cómo verificar y a dónde reportar.',
    h1: 'Ofertas de trabajo falsas en WhatsApp y Facebook',
    lead: 'Los estafadores usan las redes porque ahí está la gente buscando brete. Estos son los mensajes más comunes y cómo cuidarte.',
    date: '2026-10-09',
    html: `
<h2>Por qué las redes son terreno fértil</h2>
<p>En WhatsApp, Facebook y Telegram es fácil crear una cuenta falsa, copiar el logo de una empresa conocida y mandar el mismo mensaje a miles de personas. Además, la gente comparte las ofertas sin verificar. Por eso conviene sospechar primero y confiar después.</p>

<h2>Los mensajes más típicos</h2>
<ul>
  <li><strong>"Trabajo desde casa, ganá $X al día":</strong> promete mucho dinero con tareas simples, como dar likes, ver videos o reseñar productos.</li>
  <li><strong>"Te contratamos hoy, sin entrevista":</strong> el proceso es un chat rápido y ya sos "seleccionado".</li>
  <li><strong>"Pagá la inscripción, el uniforme o el kit":</strong> te piden un depósito antes de empezar.</li>
  <li><strong>"Invertí para empezar a ganar":</strong> es una pirámide o una estafa de criptomonedas disfrazada de empleo.</li>
  <li><strong>"Necesito tu cédula y fotos de tu tarjeta para registrarte":</strong> buscan robar tus datos.</li>
  <li><strong>"Recibí un pago y reenvía una parte":</strong> es una forma de lavar dinero o de usarte como intermediario.</li>
  <li><strong>"Una empresa famosa te escribe":</strong> pero desde un número personal, un perfil nuevo o un correo gratuito.</li>
</ul>

<h2>Banderas rojas</h2>
<ul>
  <li>Te escriben <strong>primero</strong>, sin que hayas aplicado.</li>
  <li>Piden <strong>dinero o datos financieros</strong>.</li>
  <li><strong>Presionan</strong>: "quedan pocos cupos", "tenés que decidir hoy".</li>
  <li><strong>Mala ortografía</strong> o textos copiados y pegados.</li>
  <li><strong>Enlaces acortados</strong> o páginas que imitan a una empresa real.</li>
  <li>La página o el perfil es <strong>nuevo</strong>, con pocos seguidores o sin historial.</li>
  <li>No hay <strong>dirección, sitio web o nombre de contacto</strong> verificable.</li>
</ul>

<h2>Cómo verificar una oferta</h2>
<ol>
  <li><strong>Buscá la oferta en el sitio oficial de la empresa.</strong> Si es real, casi siempre aparece ahí.</li>
  <li><strong>Revisá el perfil o la página:</strong> antigüedad, publicaciones y comentarios.</li>
  <li><strong>Buscá el nombre de la empresa junto a la palabra "estafa".</strong></li>
  <li><strong>Preguntá cómo te van a asegurar en la CCSS</strong> y qué contrato te darán.</li>
  <li><strong>Pedí una entrevista en persona o por videollamada</strong> con una persona identificable.</li>
</ol>
<p>Con la <a href="{ROOT}guias/estafas-laborales-costa-rica/">guía de estafas laborales</a> vas a encontrar más señales y qué hacer si ya caíste.</p>

<h2>Qué hacer si te escriben una oferta sospechosa</h2>
<ul>
  <li><strong>No respondás con datos personales</strong> ni mandés dinero.</li>
  <li><strong>Hacé una captura de pantalla</strong> del mensaje y del perfil.</li>
  <li><strong>Bloqueá y reportá</strong> la cuenta en la propia red.</li>
  <li><strong>Avisales a tus conocidos</strong> si compartieron la oferta, para que no caigan.</li>
  <li>Si perdiste dinero o diste datos, seguí los pasos de la guía de estafas y <strong>denunciá ante el OIJ</strong>.</li>
</ul>

<h2>Cómo buscar con más seguridad</h2>
<ul>
  <li>Usá <strong>fuentes reconocidas</strong>. En TicoBrete mostramos de dónde sale cada oferta y bloqueamos las que tienen señales típicas de estafa.</li>
  <li>Tocá <strong>"Reportar"</strong> si ves un brete sospechoso: nos ayuda a mejorar el filtro.</li>
  <li>Un trabajo real <strong>nunca te cobra</strong> para contratarte.</li>
</ul>
<p>Si querés volver a buscar con calma, mirá la <a href="{ROOT}guias/bolsas-de-empleo-costa-rica/">lista de dónde buscar trabajo</a>.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿Una oferta compartida por un amigo es segura?</h3>
<p>No necesariamente. Muchas personas comparten ofertas falsas sin darse cuenta. Verificá siempre.</p>
<h3>¿Qué hago si ya mandé mi cédula?</h3>
<p>Estate atento a movimientos extraños, avisá a tu banco si compartiste datos financieros y considerá denunciar. Nunca mandés más información.</p>
<h3>¿Cómo sé si el perfil de una empresa es el oficial?</h3>
<p>Entrá desde el enlace del sitio web oficial de la empresa. Los perfiles oficiales suelen tener verificación, historial y muchos seguidores.</p>
`,
  },
];
