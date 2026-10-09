// Guías sobre derechos y vida laboral. Los datos legales vienen de fuentes oficiales (MTSS y Código de Trabajo).
// Si una ley cambia, hay que revisar y actualizar la fecha de la guía.
const AVISO = `<aside class="note"><strong>Información general, no asesoría legal.</strong> Las leyes y los montos cambian. Para tu caso concreto, consultá al Ministerio de Trabajo (MTSS) o a una persona abogada. Última revisión de esta guía: 9 de octubre de 2026.</aside>`;

const LINK_MTSS = 'https://www.mtss.go.cr/';

export const GUIAS_LABORALES = [
  {
    slug: 'derechos-laborales-costa-rica',
    title: 'Derechos laborales en Costa Rica: lo básico',
    description: 'Los derechos laborales básicos en Costa Rica explicados sin enredos: jornada, horas extra, vacaciones, aguinaldo, CCSS, despido y dónde reclamar si no te los respetan.',
    h1: 'Derechos laborales en Costa Rica: lo básico que tenés que saber',
    lead: 'Muchas personas no reclaman lo que les corresponde porque no saben que existe. Esta es una guía simple de tus derechos más importantes como persona trabajadora.',
    date: '2026-10-09',
    html: `
${AVISO}
<h2>1. El contrato y el período de prueba</h2>
<p>Siempre pedí que las condiciones de tu trabajo queden <strong>por escrito</strong>: puesto, salario, horario y fecha de inicio. Si tu contrato es por tiempo indefinido, los primeros <strong>tres meses</strong> son período de prueba: durante ese tiempo no hay obligación de preaviso, según el Ministerio de Trabajo.</p>

<h2>2. El salario</h2>
<p>El salario no puede ser menor al <strong>salario mínimo</strong>, que se fija por decreto y cambia según la ocupación y el tipo de trabajo. Como los montos se actualizan, revisá siempre la lista vigente en el sitio del <a href="${LINK_MTSS}" target="_blank" rel="noopener">MTSS</a> en vez de fiarte de lo que te digan de palabra.</p>

<h2>3. La jornada de trabajo</h2>
<ul>
  <li><strong>Jornada diurna:</strong> hasta 8 horas al día y 48 horas por semana (Código de Trabajo, art. 136). Hay excepciones en trabajos que no sean insalubres ni peligrosos, pero sin pasar de 48 horas semanales.</li>
  <li><strong>Jornada nocturna:</strong> 6 horas al día y 36 a la semana, según el MTSS.</li>
  <li>Existe también la jornada mixta, que tiene sus propias reglas.</li>
</ul>

<h2>4. Horas extra</h2>
<p>El trabajo fuera de tu jornada ordinaria se paga con un <strong>50% adicional</strong> sobre el valor de la hora normal (tiempo y medio). En general, la suma de la jornada ordinaria y las horas extra no debe pasar de 12 horas al día. Si tu empleador te pide quedarte más tiempo "sin pago", eso no es correcto.</p>

<h2>5. Descanso, feriados y vacaciones</h2>
<ul>
  <li><strong>Un día de descanso</strong> después de cada semana de trabajo (Código de Trabajo, art. 152).</li>
  <li><strong>Feriados:</strong> hay feriados de pago obligatorio y otros que no lo son. Si tu trabajo cae en un feriado, revisá cómo te lo deben pagar.</li>
  <li><strong>Vacaciones:</strong> mínimo <strong>dos semanas por cada cincuenta semanas</strong> de trabajo continuo, pagadas (art. 153). No es un favor: es un derecho.</li>
</ul>

<h2>6. Aguinaldo</h2>
<p>Se paga una vez al año en el sector privado, a más tardar el 20 de diciembre. Todo el detalle, con la fórmula y ejemplos, está en nuestra <a href="{ROOT}guias/aguinaldo-costa-rica/">guía del aguinaldo</a>.</p>

<h2>7. Seguro social (CCSS)</h2>
<p>Tu empleador debe <strong>asegurarte en la CCSS</strong> y reportar tu salario real. Preguntá cómo te van a inscribir antes de aceptar un trabajo. Si te dicen que "no hace falta" o que te pagan "más" a cambio de no asegurarte, desconfiá: tu seguro cubre tu salud y tu pensión.</p>

<h2>8. Embarazo y maternidad</h2>
<p>Las trabajadoras tienen <strong>licencia de maternidad de cuatro meses</strong>. Además, una trabajadora embarazada o en período de lactancia no puede ser despedida libremente: el empleador necesita seguir un procedimiento especial.</p>

<h2>9. Despido, preaviso y cesantía</h2>
<p>Si te despiden sin justa causa, tenés derecho a preaviso y a cesantía, según el tiempo que llevás trabajando. Mirá nuestra <a href="{ROOT}guias/despido-cesantia-preaviso-costa-rica/">guía de despido, preaviso y cesantía</a>.</p>

<h2>10. Acoso en el trabajo</h2>
<p>El acoso u hostigamiento sexual en el trabajo está prohibido por ley, incluye conductas verbales, escritas, gestuales o físicas, y una sola vez puede bastar si es grave. Los centros de trabajo deben tener una política y un procedimiento para denunciarlo. Guardá pruebas, anotá fechas y lugares, y buscá apoyo.</p>

<h2>Dónde reclamar si no te cumplen</h2>
<ul>
  <li><strong>El MTSS</strong> atiende consultas y denuncias. Su línea gratuita es el <strong>800-TRABAJO (800 872 2256)</strong>, según sus publicaciones oficiales. También tiene oficinas regionales.</li>
  <li><strong>Los juzgados de trabajo</strong>, si el caso necesita ir a la vía judicial. Hay plazos para reclamar, así que no esperés demasiado.</li>
  <li><strong>Guardá todo</strong>: contrato, comprobantes de pago, mensajes, horarios y nombres de testigos.</li>
</ul>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.mtss.go.cr/temas-laborales/" target="_blank" rel="noopener">MTSS: asuntos laborales y preguntas frecuentes</a></li>
  <li><a href="https://www.mtss.go.cr/elministerio/marco-legal/documentos/Codigo_Trabajo_RPL.pdf" target="_blank" rel="noopener">Código de Trabajo (copia publicada por el MTSS)</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Me pueden pagar menos del salario mínimo si firmo un contrato?</h3>
<p>No. Los derechos laborales mínimos son irrenunciables: aunque firmes, el empleador no puede pagarte menos del mínimo ni quitarte derechos básicos.</p>
<h3>¿Tengo derechos si trabajo sin contrato por escrito?</h3>
<p>Sí. Aunque no haya papel, si hay una relación de trabajo (horario, órdenes y pago), tenés derechos. Por eso conviene guardar pruebas como mensajes y comprobantes.</p>
<h3>¿Qué hago si no me pagan las horas extra?</h3>
<p>Llevá un registro de las horas que trabajás, guardá los mensajes en que te piden quedarte y consultá al MTSS.</p>
`,
  },
  {
    slug: 'aguinaldo-costa-rica',
    title: 'Aguinaldo en Costa Rica: fecha, cálculo y qué hacer si no te pagan',
    description: 'Cómo se calcula el aguinaldo en Costa Rica, cuándo se paga (a más tardar el 20 de diciembre), ejemplos con números y cómo denunciar ante el MTSS si no te lo pagan.',
    h1: 'Aguinaldo en Costa Rica: cuándo se paga y cómo se calcula',
    lead: 'El aguinaldo es un derecho y no depende de la voluntad del jefe. Así se calcula, cuándo debe llegar y qué hacer si no te lo pagan.',
    date: '2026-10-09',
    html: `
${AVISO}
<h2>¿Qué es el aguinaldo?</h2>
<p>Es un pago extra que recibe cada año la persona trabajadora del sector privado, regulado por la Ley 2412. Es un <strong>derecho irrenunciable</strong>. Si trabajás en el sector público, la fecha y las reglas pueden variar, así que preguntá en tu institución.</p>

<h2>¿Cuándo se paga?</h2>
<p>Dentro de los <strong>primeros veinte días de diciembre</strong>; el sector privado debe pagarlo a más tardar el <strong>20 de diciembre</strong>. Tu empleador puede pagarlo antes, pero no después.</p>

<h2>¿Cómo se calcula?</h2>
<p>El período del aguinaldo va del <strong>1 de diciembre del año anterior al 30 de noviembre</strong> del año en curso. La fórmula es:</p>
<p><strong>Aguinaldo = (todos los salarios ordinarios y extraordinarios de ese período) ÷ 12</strong></p>
<p>Los salarios extraordinarios incluyen, por ejemplo, las <strong>horas extra</strong>. Este año el período va del 1 de diciembre de 2025 al 30 de noviembre de 2026.</p>

<h2>Ejemplos con números</h2>
<p>Los siguientes montos son solo ilustrativos.</p>
<ul>
  <li><strong>Si trabajaste todo el año con el mismo salario</strong> de ₡400.000 al mes: ₡400.000 × 12 = ₡4.800.000, entre 12 = <strong>₡400.000</strong> de aguinaldo. Es decir, un mes de salario.</li>
  <li><strong>Si entraste a trabajar en mayo</strong> y ganaste ₡400.000 durante 7 meses: ₡400.000 × 7 = ₡2.800.000, entre 12 = <strong>₡233.333</strong>. Se llama aguinaldo proporcional.</li>
  <li><strong>Si tu salario subió o hiciste horas extra</strong>, se suma todo lo que realmente ganaste en el período y se divide entre 12.</li>
</ul>

<h2>Calculadora oficial</h2>
<p>El Ministerio de Trabajo tiene una <a href="https://www.mtss.go.cr/buscador/Aguinaldo.aspx" target="_blank" rel="noopener">calculadora de aguinaldo</a> para el sector privado. Usala para confirmar tu monto.</p>

<h2>¿Y si renuncio o me despiden?</h2>
<p>También te corresponde la parte <strong>proporcional</strong> del aguinaldo por el tiempo que trabajaste, aunque no hayas completado el año. Pedí que te lo incluyan en la liquidación.</p>

<h2>Qué hacer si no te lo pagan o te pagan menos</h2>
<ol>
  <li><strong>Revisá tu cálculo</strong> con la calculadora oficial y guardá tus colillas de pago.</li>
  <li><strong>Hablá con tu empleador</strong> por escrito (correo o mensaje) para que quede constancia.</li>
  <li><strong>Denunciá ante el MTSS.</strong> Según su campaña de aguinaldo, el formulario en línea para denunciar el no pago o el pago parcial se habilita a partir del <strong>21 de diciembre</strong>. También atienden de forma presencial en sus oficinas (San José, Heredia, Cartago, Alajuela, Puntarenas, Liberia, Limón, San Carlos y Pérez Zeledón), normalmente de 8 a. m. a 4 p. m. Revisá fechas y horarios vigentes en su sitio.</li>
  <li><strong>Línea gratuita:</strong> 800-TRABAJO (800 872 2256), según las publicaciones del MTSS.</li>
</ol>

<h2>Consejos para cuidar tu aguinaldo</h2>
<ul>
  <li>Hacé tu propio cálculo con tiempo, antes de diciembre.</li>
  <li>Si cambiás de trabajo, pedí tu liquidación con el aguinaldo proporcional.</li>
  <li>Desconfiá de ofertas de "inversión" que prometen multiplicar tu aguinaldo: en diciembre aumentan las estafas. Leé nuestra <a href="{ROOT}guias/estafas-laborales-costa-rica/">guía de estafas</a>.</li>
</ul>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.mtss.go.cr/temas-laborales/aguinaldo/aguinaldo.html" target="_blank" rel="noopener">MTSS: aguinaldo en el sector privado</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Si trabajé solo unos meses me corresponde aguinaldo?</h3>
<p>Sí, de forma proporcional a lo que trabajaste.</p>
<h3>¿Las horas extra y las comisiones cuentan?</h3>
<p>Sí. Se calcula con los salarios ordinarios y extraordinarios que realmente ganaste en el período.</p>
<h3>¿Mi empleador puede pagarlo en cuotas?</h3>
<p>La regla general es pagarlo a más tardar el 20 de diciembre. Si te proponen otra forma de pago, consultá antes al MTSS.</p>
`,
  },
  {
    slug: 'despido-cesantia-preaviso-costa-rica',
    title: 'Despido en Costa Rica: preaviso y cesantía, cuánto te toca',
    description: 'Qué te corresponde si te despiden en Costa Rica: preaviso según tu antigüedad, tabla de días de cesantía, cómo se calcula y cuánto tiempo tenés para reclamar.',
    h1: 'Despido en Costa Rica: preaviso y cesantía',
    lead: 'Si te despiden sin justa causa, no te quedás con las manos vacías. Estas son las reglas según el Ministerio de Trabajo, explicadas con calma.',
    date: '2026-10-09',
    html: `
${AVISO}
<h2>Dos conceptos que se confunden</h2>
<ul>
  <li><strong>Preaviso:</strong> el aviso con tiempo que debe darse cuando alguien renuncia o cuando el empleador despide sin justa causa.</li>
  <li><strong>Cesantía:</strong> la indemnización que se paga cuando la relación de trabajo termina con responsabilidad del empleador. El MTSS la compara con el seguro de desempleo de otros países: te da una cantidad mínima para mantenerte mientras encontrás otro trabajo.</li>
</ul>

<h2>Preaviso: cuánto tiempo</h2>
<p>El preaviso aplica en los <strong>contratos por tiempo indefinido</strong>:</p>
<ul>
  <li><strong>Menos de 3 meses:</strong> no hay preaviso (es el período de prueba).</li>
  <li><strong>Más de 3 y menos de 6 meses:</strong> 1 semana.</li>
  <li><strong>Más de 6 meses y menos de 1 año:</strong> 15 días.</li>
  <li><strong>Más de 1 año:</strong> 1 mes.</li>
</ul>
<p>El preaviso debe darse <strong>en tiempo</strong>, y solo en casos especiales puede darse en dinero. Si no se da en tiempo, quien incumple debe pagar ese tiempo en dinero.</p>

<h2>El día de asueto durante el preaviso</h2>
<p>Mientras estás en preaviso, ya sea por renuncia o por despido injustificado, tenés derecho a <strong>un día por semana con goce de salario</strong> para buscar trabajo. El día se acuerda con tu empleador. Si no te lo dan, podés cobrarlo al terminar el preaviso.</p>

<h2>Cesantía: cuántos días te corresponden</h2>
<ul>
  <li><strong>Entre 3 y 6 meses de trabajo continuo:</strong> 7 días de salario.</li>
  <li><strong>Entre 6 meses y 1 año:</strong> 14 días de salario.</li>
  <li><strong>Más de 1 año:</strong> días de salario por año laborado, según esta tabla del MTSS:</li>
</ul>
<table class="data-table">
  <thead><tr><th>Año de trabajo</th><th>Días de salario por año</th></tr></thead>
  <tbody>
    <tr><td>Año 1</td><td>19,5</td></tr>
    <tr><td>Año 2</td><td>20</td></tr>
    <tr><td>Año 3</td><td>20,5</td></tr>
    <tr><td>Año 4</td><td>21</td></tr>
    <tr><td>Año 5</td><td>21,24</td></tr>
    <tr><td>Año 6</td><td>21,5</td></tr>
    <tr><td>Años 7, 8 y 9</td><td>22</td></tr>
    <tr><td>Año 10</td><td>21,5</td></tr>
    <tr><td>Año 11</td><td>21</td></tr>
    <tr><td>Año 12</td><td>20,5</td></tr>
    <tr><td>Año 13 y siguientes</td><td>20</td></tr>
  </tbody>
</table>
<p>Desde el segundo año, también se paga la <strong>fracción superior a seis meses</strong>. En ningún caso se indemnizan más de los <strong>últimos ocho años</strong> de trabajo. Y la cesantía se paga aunque pases enseguida a trabajar con otro patrono.</p>

<h2>¿Cómo se calcula el salario base?</h2>
<p>Se toma el <strong>promedio de los salarios ordinarios y extraordinarios de los últimos seis meses</strong> (se suman y se divide entre 6). Para pago mensual, ese monto se divide entre 30 para obtener el valor de un día. No cuentan los períodos de incapacidad por enfermedad, y si hubo licencia de maternidad, sí se incluye.</p>
<p>Al pago de la cesantía <strong>no se le aplica ninguna deducción por cargas sociales</strong>, según el MTSS.</p>

<h2>Un ejemplo ilustrativo</h2>
<p>Imaginá a alguien con 2 años de trabajo y un salario promedio de ₡450.000 al mes (valor de un día: ₡15.000). Siguiendo la tabla: 19,5 días el primer año + 20 días el segundo = 39,5 días × ₡15.000 = <strong>₡592.500</strong> de cesantía, además de su preaviso (1 mes si no se lo dieron en tiempo), sus vacaciones y su aguinaldo proporcional. El número es solo un ejemplo: el cálculo real depende de tus salarios.</p>

<h2>¿Cuánto tiempo tengo para reclamar?</h2>
<p>El MTSS indica que el empleador debe liquidar las prestaciones <strong>el mismo día</strong> en que termina la relación laboral. Si no lo hace, el derecho a reclamar se ha interpretado hasta <strong>un año</strong> después del último día de trabajo. No esperés al límite.</p>

<h2>Qué hacer si te despiden</h2>
<ol>
  <li><strong>Pedí la carta de despido</strong> y que indique la causa.</li>
  <li><strong>No firmes un finiquito</strong> sin revisar que incluya preaviso, cesantía, vacaciones y aguinaldo proporcional.</li>
  <li><strong>Calculá lo que te corresponde</strong> con esta guía y guardá tus colillas de pago.</li>
  <li><strong>Consultá al MTSS:</strong> 800-TRABAJO (800 872 2256), según sus publicaciones oficiales.</li>
  <li><strong>Mientras tanto, buscá brete</strong> con calma: tenés un día libre por semana durante el preaviso para hacerlo. Empezá por los <a href="{ROOT}">bretes más recientes</a> y por la <a href="{ROOT}guias/como-buscar-trabajo-en-costa-rica/">guía para buscar trabajo</a>.</li>
</ol>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://mtss.hermes-soft.com/temas-laborales/07_Preaviso_cesantia_ind.pdf" target="_blank" rel="noopener">MTSS: Preaviso y cesantía (publicación oficial)</a>. Normativa citada: Constitución Política, art. 63; Código de Trabajo, arts. 28, 29 y 30; Ley 7983, art. 88.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Si renuncio me corresponde cesantía?</h3>
<p>La cesantía es para cuando la relación termina con responsabilidad del empleador, por ejemplo un despido sin justa causa. Si renunciás, igual debés dar preaviso. Consultá tu caso al MTSS.</p>
<h3>¿Me pueden despedir sin pagarme nada?</h3>
<p>Solo si hay una causa justa de despido, que debe poder demostrarse. Si no, te corresponden preaviso y cesantía.</p>
<h3>¿Qué pasa si tengo contrato por tiempo definido?</h3>
<p>El preaviso y la cesantía que aquí se explican aplican a contratos por tiempo indefinido. Para otros tipos de contrato, consultá al MTSS.</p>
`,
  },
  {
    slug: 'primer-empleo-costa-rica',
    title: 'Primer empleo en Costa Rica: cómo conseguirlo sin experiencia',
    description: 'Guía para conseguir tu primer trabajo en Costa Rica: dónde buscar, cómo armar un currículum sin experiencia, qué esperar del contrato y cómo evitar estafas.',
    h1: 'Primer empleo en Costa Rica: cómo conseguirlo sin experiencia',
    lead: 'Todo el mundo empezó sin experiencia. Lo difícil es que nadie te da brete sin experiencia y nadie te da experiencia sin brete. Así se rompe ese círculo.',
    date: '2026-10-09',
    html: `
<h2>1. Cambiá la pregunta</h2>
<p>En vez de "no tengo experiencia", pensá <strong>"qué sí tengo"</strong>: estudios, cursos, trabajos informales, ayudar en un negocio familiar, voluntariados, proyectos propios. Todo eso cuenta, y muchas empresas contratan por actitud y ganas de aprender.</p>

<h2>2. Dónde buscar un primer brete</h2>
<ul>
  <li>Usá el filtro <strong>"Sin experiencia o pasantía"</strong> en <a href="{ROOT}">TicoBrete</a> para ver solo ofertas pensadas para empezar.</li>
  <li><strong>Servicio al cliente y call centers:</strong> muchas empresas capacitan y a veces piden inglés. Mirá los <a href="{ROOT}empleos/servicio-cliente/">bretes de servicio al cliente</a>.</li>
  <li><strong>Producción, bodega, ventas y logística:</strong> son puestos donde se aprende haciendo.</li>
  <li><strong>La Agencia Nacional de Empleo (ANE)</strong> del Ministerio de Trabajo es gratuita y tiene muchas ofertas, aunque tenés que registrarte.</li>
  <li><strong>Capacitación gratuita:</strong> el INA ofrece cursos técnicos que te dan un certificado y mejoran mucho tu currículum.</li>
</ul>

<h2>3. Tu currículum sin experiencia</h2>
<p>No necesitás inventar nada. Destacá lo que tenés y mantenelo en una página. Tenemos una guía completa de <a href="{ROOT}guias/curriculum-costa-rica/">cómo hacer un currículum</a>. Un truco: poné primero tus estudios, cursos y habilidades, y después cualquier experiencia, aunque sea informal.</p>

<h2>4. Aplicá a muchos, pero con cuidado</h2>
<p>Lo normal es mandar bastantes solicitudes antes de que te llamen, y eso no es un fracaso. Ajustá un poco tu currículum para cada puesto y respondé rápido cuando te escriban. Cuando te llamen a entrevista, preparate con nuestra <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">guía de entrevista</a>.</p>

<h2>5. Qué esperar de tu primer trabajo</h2>
<ul>
  <li><strong>Período de prueba:</strong> si tu contrato es por tiempo indefinido, los primeros tres meses son de prueba.</li>
  <li><strong>CCSS:</strong> tu empleador debe asegurarte. Preguntá cómo te inscriben.</li>
  <li><strong>Salario, horario y funciones</strong> por escrito, antes de empezar.</li>
  <li><strong>Aguinaldo y vacaciones</strong> desde tu primer año. Mirá nuestra <a href="{ROOT}guias/derechos-laborales-costa-rica/">guía de derechos laborales</a>.</li>
</ul>
<p>Si tenés menos de 18 años, existen reglas especiales sobre permisos y horarios. Consultá al MTSS antes de empezar.</p>

<h2>6. Cuidado con las estafas a quien busca su primer brete</h2>
<p>Las personas sin experiencia son el blanco favorito. Si te piden plata para contratarte, dar un curso obligatorio o depositar "para reservar tu puesto", es una estafa. Leé nuestra <a href="{ROOT}guias/estafas-laborales-costa-rica/">guía de estafas laborales</a>.</p>

<h2>7. Aprendé desde el primer día</h2>
<p>Tu primer brete puede no ser el de tus sueños, y está bien: es el primer escalón. Hacé bien tu trabajo, pedí retroalimentación, aprendé las herramientas y guardá logros que luego pongás en tu currículum. Después de un año, ya vas a tener experiencia para pedir más, incluso un <a href="{ROOT}guias/como-pedir-aumento-costa-rica/">aumento</a>.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿Puedo conseguir trabajo sin terminar el colegio?</h3>
<p>Sí, hay puestos de producción, ventas, limpieza, logística y servicio. Terminar los estudios o sacar cursos técnicos te abre más puertas.</p>
<h3>¿Cuánto debería tardar en conseguir mi primer trabajo?</h3>
<p>Varía mucho. Aplicar a muchos puestos, tener el currículum listo y responder rápido ayuda a acortarlo.</p>
<h3>¿Vale la pena una pasantía?</h3>
<p>Sí, si te enseña algo real y te da una referencia. Revisá siempre que no te cobren y que te expliquen qué vas a hacer.</p>
`,
  },
  {
    slug: 'como-pedir-aumento-costa-rica',
    title: 'Cómo pedir un aumento de salario en Costa Rica',
    description: 'Cómo prepararte y pedir un aumento de salario en Costa Rica: cuándo hacerlo, cómo investigar cuánto pedir, qué decir y qué hacer si te dicen que no.',
    h1: 'Cómo pedir un aumento de salario en Costa Rica',
    lead: 'Pedir plata incomoda a casi todo el mundo, pero quien no pregunta rara vez recibe. Con preparación, la conversación se vuelve mucho más fácil.',
    date: '2026-10-09',
    html: `
<h2>1. Elegí el momento</h2>
<ul>
  <li>Después de <strong>un logro claro</strong>: un proyecto terminado, una meta superada, un cliente que te felicitó.</li>
  <li>Cuando tus <strong>responsabilidades crecieron</strong> y ya hacés más de lo que decía tu puesto.</li>
  <li>En las <strong>evaluaciones o revisiones</strong> de tu empresa, si las hay.</li>
  <li>Evitá pedirlo en un momento tenso para el negocio, o cuando tu jefe esté apurado.</li>
</ul>

<h2>2. Investigá cuánto pedir</h2>
<p>No pidás un número "a ojo". Compará con lo que se paga por puestos parecidos al tuyo: revisá ofertas similares, hablá con colegas de confianza y mirá si tu empresa tiene escalas salariales. En <a href="{ROOT}">TicoBrete</a> algunas ofertas muestran el salario, lo que te da una referencia. Si tenés los números, tu pedido pesa más.</p>
<p>Ojo: el <strong>salario mínimo</strong> que fija el Estado es un piso, no una meta. Podés consultarlo en el sitio del <a href="https://www.mtss.go.cr/" target="_blank" rel="noopener">MTSS</a>.</p>

<h2>3. Prepará tus pruebas</h2>
<p>Escribí una lista corta con <strong>resultados concretos</strong>, no solo "trabajo duro":</p>
<ul>
  <li>Lo que lograste (con números si podés: ventas, tiempo ahorrado, clientes atendidos).</li>
  <li>Responsabilidades nuevas que asumiste.</li>
  <li>Capacitaciones o certificaciones que sacaste.</li>
  <li>Comentarios positivos de clientes o jefes.</li>
</ul>

<h2>4. Pedí una reunión</h2>
<p>No lo pidás de pasada en el pasillo. Escribile a tu jefatura algo como: <em>"Me gustaría reunirme unos minutos para conversar sobre mi desempeño y mi salario. ¿Cuándo le queda bien?"</em> Así tu jefe se prepara y la conversación se toma en serio.</p>

<h2>5. Qué decir en la reunión</h2>
<ol>
  <li><strong>Empezá agradeciendo</strong> y mostrando que querés seguir creciendo en la empresa.</li>
  <li><strong>Presentá tus logros</strong> y las responsabilidades nuevas.</li>
  <li><strong>Decí tu propuesta con claridad:</strong> <em>"Por lo que he aportado y lo que se paga por este tipo de puesto, me gustaría solicitar un ajuste a ₡X."</em></li>
  <li><strong>Escuchá.</strong> Quizás necesiten tiempo para analizarlo.</li>
</ol>

<h2>6. Si te dicen que sí</h2>
<p>Pedí que quede <strong>por escrito</strong>: el nuevo monto y desde cuándo rige. Y agradecé.</p>

<h2>7. Si te dicen que no, o "todavía no"</h2>
<ul>
  <li><strong>Preguntá qué necesitarías lograr</strong> para recibirlo y en qué plazo se puede volver a hablar.</li>
  <li><strong>Pedí alternativas:</strong> más vacaciones, teletrabajo, horario flexible, bonos por resultados o capacitaciones pagadas.</li>
  <li><strong>Anotá lo acordado</strong> y retomalo en la fecha prometida.</li>
  <li>Si pasa el tiempo y no hay avance, <strong>evaluá tus opciones</strong>. Mirá qué hay en el mercado y prepará tu currículum con nuestra <a href="{ROOT}guias/curriculum-costa-rica/">guía</a>. A veces cambiar de trabajo es la forma más rápida de subir el salario, y para eso te ayuda la <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">guía de entrevista</a>.</li>
</ul>

<h2>Errores comunes</h2>
<ul>
  <li><strong>Pedir por necesidad personal</strong> ("es que todo está caro") en vez de por tu aporte. Es cierto, pero convence menos.</li>
  <li><strong>Amenazar con renunciar</strong> si no lo pensás hacer de verdad.</li>
  <li><strong>Compararte con compañeros por chisme.</strong> Usá datos del mercado, no rumores.</li>
  <li><strong>Esperar que lo noten solos.</strong> Casi nadie lo hace; hay que pedirlo.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Cada cuánto puedo pedir un aumento?</h3>
<p>No hay una regla única. Muchas personas lo piden una vez al año o cuando cambian sus responsabilidades.</p>
<h3>¿Cuánto debería pedir?</h3>
<p>Depende de tu puesto, tu aporte y el mercado. Investigá antes y pedí un monto que puedas justificar con datos.</p>
<h3>¿Y si mi empresa no puede subir salarios?</h3>
<p>Preguntá por beneficios: horario flexible, días libres, capacitación o ascensos. Y definí si esas condiciones te sirven a largo plazo.</p>
`,
  },
];
