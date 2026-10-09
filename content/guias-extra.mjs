// Guías adicionales: licencias, incapacidades, horas extra, vacaciones, estudio, cuenta propia y oficios.
// Los datos legales vienen de fuentes oficiales (Código de Trabajo, MTSS, CCSS, Ministerio de Salud, Hacienda).
const AVISO = `<aside class="note"><strong>Información general, no asesoría legal.</strong> Las leyes y los montos cambian. Para tu caso concreto, consultá al Ministerio de Trabajo (MTSS), a la CCSS o a una persona abogada. Última revisión de esta guía: 9 de octubre de 2026.</aside>`;

export const GUIAS_EXTRA = [
  {
    slug: 'vacaciones-costa-rica',
    title: 'Vacaciones en Costa Rica: cuántos días te tocan y cómo se pagan',
    description: 'Cuántos días de vacaciones te corresponden en Costa Rica (2 semanas por cada 50 trabajadas), cómo funcionan las vacaciones proporcionales y qué hacer si no te las dan.',
    h1: 'Vacaciones en Costa Rica: cuántos días te tocan',
    lead: 'Las vacaciones son un descanso pagado y un derecho, no un favor del jefe. Así se cuentan, cuándo se pagan en dinero y qué hacer si no te las respetan.',
    date: '2026-10-09',
    html: `
${AVISO}
<h2>Cuántas vacaciones te corresponden</h2>
<p>Según el artículo 153 del Código de Trabajo, tenés derecho a un mínimo de <strong>dos semanas de vacaciones pagadas por cada cincuenta semanas</strong> de trabajo continuo. Eso equivale a unos 14 días naturales cada año. Muchas empresas dan más; ese es el mínimo.</p>
<p>Según el MTSS, tenés derecho a vacaciones <strong>aunque no trabajes todas las horas de la jornada ordinaria ni todos los días de la semana</strong>. O sea, si trabajás medio tiempo, también te corresponden.</p>

<h2>La cuenta se hace en semanas, no en años</h2>
<p>El derecho se gana al cumplir <strong>50 semanas de trabajo</strong>, que son unos 11 meses y medio. No hace falta esperar al primer aniversario exacto. Por eso conviene llevar tu propia cuenta de cuándo cumplís tu período.</p>

<h2>Si tu contrato termina antes de las 50 semanas</h2>
<p>Si dejás el trabajo antes de cumplir las 50 semanas, te corresponden <strong>vacaciones proporcionales: al menos un día por cada mes trabajado</strong>. Esas sí se pagan en dinero en la liquidación. Mirá la <a href="{ROOT}guias/liquidacion-laboral-finiquito-costa-rica/">guía de liquidación laboral</a>.</p>

<h2>¿Se pueden cambiar por plata?</h2>
<p>Como regla general, las vacaciones son <strong>incompensables</strong>: están hechas para que descanses, no para cobrarlas. El Código de Trabajo contempla excepciones, por ejemplo cuando la persona deja de trabajar por cualquier causa. Si tu empleador te propone "pagarte" las vacaciones en lugar de dártelas mientras seguís trabajando, consultá antes al MTSS.</p>

<h2>¿Quién decide cuándo las tomás?</h2>
<p>El empleador suele fijar la época de las vacaciones, pero debe hacerlo de forma razonable, con aviso y sin dejar que se pierdan. Lo ideal es que lo acordés por escrito.</p>

<h2>Calculá las tuyas</h2>
<p>Usá nuestra <a href="{ROOT}guias/calculadora-vacaciones-costa-rica/">calculadora de vacaciones</a> para ver cuántos días llevás y cuánto representan en dinero.</p>

<h2>Qué hacer si no te las dan</h2>
<ol>
  <li>Llevá un registro de tu fecha de ingreso y de tus vacaciones anteriores.</li>
  <li>Pedilas por escrito, con tiempo.</li>
  <li>Si no te las respetan, consultá al MTSS: 800-TRABAJO (800 872 2256). Mirá la <a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">guía para denunciar</a>.</li>
</ol>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.mtss.go.cr/elministerio/marco-legal/documentos/Codigo_Trabajo_RPL.pdf" target="_blank" rel="noopener">Código de Trabajo, arts. 153 a 156 (copia del MTSS)</a></li>
  <li><a href="https://www.mtss.go.cr/temas-laborales/" target="_blank" rel="noopener">MTSS: asuntos laborales</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Las vacaciones incluyen los fines de semana?</h3>
<p>Dependen de cómo se cuenten en tu trabajo. Lo importante es que tu pago por el período sea el de tus días de descanso completos. Preguntá cómo se cuentan y pedilo por escrito.</p>
<h3>¿Puedo juntar las vacaciones de varios años?</h3>
<p>El objetivo de la ley es que descanses cada año. Acordá con tu empleador cómo se programan y no dejés que se acumulen sin control.</p>
<h3>¿Tengo vacaciones si estoy en período de prueba?</h3>
<p>El derecho se va ganando con el tiempo trabajado y, si el contrato termina antes de cumplir las 50 semanas, te pagan las proporcionales.</p>
`,
  },
  {
    slug: 'horas-extra-feriados-costa-rica',
    title: 'Horas extra y feriados en Costa Rica: cómo se pagan',
    description: 'Cómo se pagan las horas extra en Costa Rica (tiempo y medio), qué feriados hay en 2026 y cuánto te pagan si trabajás un feriado.',
    h1: 'Horas extra y feriados en Costa Rica: cómo se pagan',
    lead: 'Quedarte más tiempo o trabajar un feriado tiene un pago especial. Estas son las reglas y cómo calcularlas para no regalar tu trabajo.',
    date: '2026-10-09',
    html: `
${AVISO}
<h2>Primero: cuál es tu jornada ordinaria</h2>
<ul>
  <li><strong>Jornada diurna:</strong> hasta 8 horas al día y 48 a la semana.</li>
  <li><strong>Jornada nocturna:</strong> 6 horas al día y 36 a la semana, según el MTSS.</li>
</ul>
<p>Todo lo que trabajés <strong>fuera de esa jornada</strong> es tiempo extraordinario (horas extra).</p>

<h2>Cómo se pagan las horas extra</h2>
<p>Se pagan con un <strong>50 % adicional</strong> sobre el valor de la hora ordinaria, es decir, a <strong>tiempo y medio</strong>. Además, en general, la suma de la jornada ordinaria y las horas extra no debe pasar de <strong>12 horas al día</strong>.</p>

<h2>Cómo calcular el valor de tu hora</h2>
<p>Si te pagan por mes y trabajás jornada diurna, un cálculo común es:</p>
<p><strong>Valor de la hora ordinaria = salario mensual ÷ 30 ÷ 8</strong></p>
<p>Ejemplo ilustrativo con ₡480.000: ₡480.000 ÷ 30 = ₡16.000 por día; ÷ 8 = <strong>₡2.000 por hora</strong>. Cada hora extra vale ₡2.000 × 1,5 = <strong>₡3.000</strong>. Si hacés 10 horas extra, son ₡30.000. Probalo con tu salario en la <a href="{ROOT}guias/calculadora-horas-extra-costa-rica/">calculadora de horas extra</a>.</p>

<h2>Los feriados en 2026</h2>
<p>Según el MTSS, en 2026 hay <strong>12 feriados oficiales: 9 de pago obligatorio y 3 de pago no obligatorio</strong>.</p>
<ul>
  <li><strong>De pago obligatorio:</strong> 1 de enero, 11 de abril, Jueves y Viernes Santo, 1 de mayo, 25 de julio, 15 de agosto, 15 de setiembre y 25 de diciembre (según el art. 148 del Código de Trabajo).</li>
  <li><strong>De pago no obligatorio:</strong> 2 de agosto, 31 de agosto (Día de la Persona Negra y la Cultura Afrocostarricense) y 1 de diciembre.</li>
</ul>
<p>Algunos feriados se trasladan al lunes en ciertos años. El MTSS publica cada vez un comunicado con cómo debe pagarse el feriado, así que revisalo en su sitio.</p>

<h2>Si trabajás un feriado</h2>
<p>Según los comunicados del MTSS:</p>
<ul>
  <li><strong>Si te pagan por mes o por quincena</strong> (o sos del comercio con pago semanal), tu salario ya incluye el día feriado. Si lo trabajás, te deben <strong>agregar el salario de un día sencillo</strong>, para completar el pago doble.</li>
  <li><strong>Si te pagan por semana</strong> (fuera del comercio) y solo recibís los días que trabajás, si laborás el feriado, se debe agregar el pago de ese día.</li>
  <li><strong>Las horas extra en un feriado</strong> se pagan a <strong>tiempo y medio doble</strong>, o sea, <strong>pago triple</strong>.</li>
</ul>

<h2>Tus derechos el día feriado</h2>
<ul>
  <li><strong>Es un derecho de todas las personas trabajadoras</strong> disfrutar del feriado, sin importar la actividad.</li>
  <li><strong>Aunque la empresa sea internacional</strong>, debe darte el feriado si trabajás en Costa Rica.</li>
  <li><strong>Nadie está obligado a trabajar un feriado</strong> si no quiere, y no pueden sancionarte por negarte. Hay excepciones, como lo dispuesto en los artículos 150 y 152 del Código de Trabajo.</li>
</ul>

<h2>Si no te pagan bien</h2>
<p>Guardá tus horarios, colillas y mensajes. Llevá un registro de las horas que trabajás. Si no se corrige, consultá al MTSS. Mirá la <a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">guía para denunciar</a>.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.mtss.go.cr/prensa/comunicados/2026/agosto/cp_017_2026.html" target="_blank" rel="noopener">MTSS: comunicado sobre el pago del feriado del 31 de agosto de 2026</a></li>
  <li><a href="https://www.mtss.go.cr/temas-laborales/" target="_blank" rel="noopener">MTSS: asuntos laborales</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Puede mi jefe obligarme a hacer horas extra?</h3>
<p>Tienen límites y deben pagarse. Si son frecuentes o no te las pagan, consultá al MTSS.</p>
<h3>¿Cuánto me pagan si trabajo un feriado de pago obligatorio?</h3>
<p>Para quien gana por mes, el feriado ya viene incluido en el salario y, si lo trabajás, se suma un día sencillo (pago doble). Las horas extra ese día se pagan a pago triple.</p>
<h3>¿Las horas extra cuentan para el aguinaldo?</h3>
<p>Sí. El aguinaldo se calcula con los salarios ordinarios y extraordinarios que ganaste en el período. Mirá la <a href="{ROOT}guias/aguinaldo-costa-rica/">guía del aguinaldo</a>.</p>
`,
  },
  {
    slug: 'licencia-maternidad-paternidad-costa-rica',
    title: 'Licencia de maternidad y paternidad en Costa Rica: cuánto dura',
    description: 'Cuánto dura la licencia de maternidad (4 meses) y de paternidad (8 días) en Costa Rica, quién la paga, cómo se pide y qué protecciones tenés.',
    h1: 'Licencia de maternidad y paternidad en Costa Rica',
    lead: 'Tener un hijo no debería ponerte en riesgo de perder el trabajo. Esto es lo que dice la ley sobre licencias, pagos y protecciones.',
    date: '2026-10-09',
    html: `
${AVISO}
<h2>Licencia de maternidad: cuatro meses</h2>
<p>Según el artículo 95 del Código de Trabajo, toda trabajadora embarazada tiene derecho a un descanso remunerado durante <strong>el mes anterior y los tres meses posteriores al parto</strong>. Son <strong>cuatro meses</strong> en total.</p>

<h2>¿Quién paga la licencia?</h2>
<p>La regla general es que el pago se reparte <strong>por partes iguales entre la CCSS y el patrono</strong>: la CCSS cubre el 50 % del salario y el empleador, el otro 50 %. El resultado es que la trabajadora recibe el <strong>equivalente al 100 % de su salario</strong>, según criterios del MTSS. Para eso, el empleador debe reportar a la CCSS el salario real completo.</p>

<h2>Cómo se tramita</h2>
<ol>
  <li><strong>Pedí a tu médico</strong> (en la CCSS o en medicina de empresa) la certificación del embarazo con la fecha probable de parto.</li>
  <li><strong>Avisale a tu empleador</strong> por escrito y entregá el documento.</li>
  <li><strong>Confirmá con Recursos Humanos</strong> las fechas exactas de inicio y fin de la licencia.</li>
</ol>
<p>En casos médicos especiales puede haber ajustes. Preguntá en la CCSS.</p>

<h2>Protección contra el despido</h2>
<p>El Código de Trabajo protege a la trabajadora <strong>embarazada y en período de lactancia</strong>: no puede ser despedida libremente. Para despedirla por falta grave, el empleador debe seguir un procedimiento previo ante la Inspección de Trabajo. Si te despiden estando embarazada o en lactancia, consultá de inmediato al MTSS. Mirá la <a href="{ROOT}guias/despido-cesantia-preaviso-costa-rica/">guía de despido</a>.</p>

<h2>Lactancia en el trabajo</h2>
<p>El Código de Trabajo reconoce a la madre en período de lactancia pausas para alimentar a su hijo: <strong>quince minutos cada tres horas, o media hora dos veces al día</strong>, según se acuerde.</p>

<h2>Licencia de paternidad: 8 días</h2>
<p>El padre biológico tiene derecho a una licencia de paternidad de <strong>dos días por semana, consecutivos o no, durante las primeras cuatro semanas</strong> después del nacimiento, es decir, <strong>8 días en total</strong>. Para pedirla, se presenta una solicitud a la jefatura inmediata con el <strong>certificado de nacimiento</strong> del bebé. La CCSS ha pagado subsidios por estas licencias.</p>
<p>Hay proyectos de ley para ampliarla, así que revisá si la regla cambió desde la fecha de esta guía.</p>

<h2>Consejos prácticos</h2>
<ul>
  <li><strong>Hablá con tiempo</strong> con tu jefatura y Recursos Humanos para planificar tu ausencia.</li>
  <li><strong>Pedí todo por escrito:</strong> fechas, pagos y regreso al trabajo.</li>
  <li><strong>Guardá copias</strong> de la certificación médica y de los comprobantes de pago.</li>
  <li><strong>Al volver</strong>, tenés derecho a tu puesto y a tus condiciones.</li>
</ul>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://sinalevi.go.cr/ResultadosNormativa/Informacion?param1=8045&param2=101952&param3=3&param4=47122" target="_blank" rel="noopener">Código de Trabajo, art. 95 (SINALEVI)</a></li>
  <li><a href="https://www.ccss.sa.cr/" target="_blank" rel="noopener">CCSS</a> y <a href="https://www.mtss.go.cr/temas-laborales/" target="_blank" rel="noopener">MTSS</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿La licencia de maternidad se paga completa?</h3>
<p>La trabajadora debe recibir el equivalente al 100 % de su salario, entre el aporte de la CCSS y el del patrono.</p>
<h3>¿Cuánto dura la licencia por adopción?</h3>
<p>Las reglas para adopción son distintas. Consultá al MTSS o a la CCSS según tu caso.</p>
<h3>¿Me pueden dar menos días de paternidad?</h3>
<p>La ley fija 8 días en el sector privado. Algunas empresas dan más como beneficio adicional.</p>
`,
  },
  {
    slug: 'incapacidades-costa-rica',
    title: 'Incapacidad por enfermedad en Costa Rica: quién paga y cuánto',
    description: 'Cómo funciona una incapacidad en Costa Rica: qué paga el patrono los primeros 3 días, qué paga la CCSS desde el cuarto y qué hacer con el papel.',
    h1: 'Incapacidad por enfermedad en Costa Rica: quién paga',
    lead: 'Enfermarte no debería dejarte sin ingresos. Así funciona el pago de una incapacidad y qué hacer con el papel.',
    date: '2026-10-09',
    html: `
${AVISO}
<h2>¿Qué es una incapacidad?</h2>
<p>Es el documento que emite un médico autorizado (de la CCSS o de medicina de empresa) cuando una enfermedad o un accidente te impide trabajar durante cierto tiempo. Mientras dura, no tenés que ir a trabajar y tenés derecho a un pago, que se reparte entre tu empleador y la CCSS.</p>

<h2>Quién paga y cuánto</h2>
<ul>
  <li><strong>Los primeros tres días</strong> los paga el <strong>patrono</strong>, que debe reconocerte <strong>la mitad (50 %) de tu salario</strong> (Código de Trabajo, art. 79).</li>
  <li><strong>Desde el cuarto día</strong>, el pago pasa a la <strong>CCSS</strong>, que paga un subsidio. Según su Reglamento del Seguro de Salud, el subsidio se otorga a partir del cuarto día y su monto depende de tu salario y de lo que hayas cotizado.</li>
</ul>
<p>La CCSS exige cumplir ciertos requisitos de cotización para pagar el subsidio, y el monto exacto lo define su reglamento. Revisalos en el sitio de la CCSS o preguntando en tu centro de salud.</p>

<h2>Qué hacer con tu incapacidad</h2>
<ol>
  <li><strong>Entregá el original a tu empleador</strong> lo antes posible, o avisale por los canales que use tu empresa.</li>
  <li><strong>Guardá una copia</strong> y fotografiala.</li>
  <li><strong>Respetá el reposo.</strong> Trabajar durante una incapacidad puede traerte problemas.</li>
  <li><strong>Verificá tu pago:</strong> que el empleador pague el 50 % de los primeros tres días y que reporte a la CCSS tu incapacidad.</li>
</ol>

<h2>Si te extienden la incapacidad</h2>
<p>Si la incapacidad se prolonga, el médico emite una extensión. Entregala también a tu empleador. Si una incapacidad se extiende dentro de un plazo corto desde la anterior, el reglamento de la CCSS tiene reglas especiales, así que conservá todos los documentos.</p>

<h2>Cuando es un accidente de trabajo</h2>
<p>Si te enfermás o te lesionás por tu trabajo, es un <strong>riesgo de trabajo</strong>, que se cubre por la póliza del INS que debe tener tu empleador. Es otro trámite, distinto al de una incapacidad común. Avisá de inmediato a tu empleador y pedí que se reporte el accidente.</p>

<h2>Si no te pagan</h2>
<p>Guardá la incapacidad y tus colillas de pago. Hablá con tu empleador por escrito. Si no se corrige, consultá al MTSS. Mirá la <a href="{ROOT}guias/denunciar-patrono-mtss-costa-rica/">guía para denunciar</a>.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.mtss.go.cr/elministerio/estructura/direccion-asuntos-juridicos/pronunciamientos/daj-ae-829-06%20Pago%20de%20los%203%20primeros%20dias-embajada%20de%20Taiwan.pdf" target="_blank" rel="noopener">MTSS: criterio sobre el pago de los tres primeros días</a></li>
  <li><a href="https://sinalevi.go.cr/ResultadosNormativa/Informacion?param1=77408&param2=119676&param3=1&param4=" target="_blank" rel="noopener">CCSS: Reglamento para el otorgamiento de licencias e incapacidades (SINALEVI)</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Me pueden despedir si estoy incapacitado?</h3>
<p>Tu contrato se suspende mientras estás incapacitado. Si te despiden durante ese tiempo, consultá cuanto antes al MTSS.</p>
<h3>¿Las incapacidades cuentan para las vacaciones?</h3>
<p>Dependen de cada caso. Consultá al MTSS o a Recursos Humanos de tu empresa.</p>
<h3>¿Se me rebaja el aguinaldo por una incapacidad?</h3>
<p>El aguinaldo se calcula con los salarios que realmente ganaste en el período. Mirá la <a href="{ROOT}guias/aguinaldo-costa-rica/">guía del aguinaldo</a>.</p>
`,
  },
  {
    slug: 'trabajar-y-estudiar-costa-rica',
    title: 'Trabajar y estudiar en Costa Rica: cómo lograrlo sin quemarte',
    description: 'Cómo combinar trabajo y estudios en Costa Rica: qué trabajos tienen horarios flexibles, tus derechos en medio tiempo y cursos gratuitos del INA.',
    h1: 'Trabajar y estudiar en Costa Rica',
    lead: 'Muchísima gente estudia de noche o los fines de semana y trabaja de día. Es posible, pero requiere organización y escoger bien el tipo de trabajo.',
    date: '2026-10-09',
    html: `
<h2>Qué trabajos se llevan mejor con estudiar</h2>
<ul>
  <li><strong>Servicio al cliente y call centers:</strong> tienen muchos turnos, incluso de noche y fines de semana. Mirá la <a href="{ROOT}guias/trabajar-call-center-costa-rica/">guía de call center</a>.</li>
  <li><strong>Restaurantes y turismo:</strong> turnos rotativos y trabajo de fin de semana. Mirá la <a href="{ROOT}guias/trabajo-cocina-restaurantes-costa-rica/">guía de cocina y restaurantes</a>.</li>
  <li><strong>Ventas y comercio:</strong> a veces hay medio tiempo o turnos de tarde.</li>
  <li><strong>Trabajo remoto:</strong> te ahorra el transporte y da flexibilidad, aunque exige disciplina. Mirá el <a href="{ROOT}empleos/remoto/">trabajo remoto</a>.</li>
  <li><strong>Pasantías y puestos junior</strong> relacionados con tu carrera. Usá el filtro "Sin experiencia o pasantía".</li>
</ul>

<h2>Tus derechos si trabajás medio tiempo</h2>
<ul>
  <li>Tenés derecho a un <strong>salario proporcional</strong> a tus horas, respetando el <a href="{ROOT}guias/salario-minimo-costa-rica/">salario mínimo</a>.</li>
  <li>Tenés <strong>vacaciones y aguinaldo</strong>, proporcionales a lo que trabajás. Según el MTSS, tenés derecho a vacaciones aunque no trabajes todas las horas ni todos los días.</li>
  <li>Tu empleador debe <strong>asegurarte en la CCSS</strong>.</li>
</ul>
<p>Más en la guía de <a href="{ROOT}guias/derechos-laborales-costa-rica/">derechos laborales</a>.</p>

<h2>Cómo negociar tus horarios</h2>
<ol>
  <li><strong>Decí desde la entrevista</strong> que estudiás y cuáles son tus horarios de clase. Es mejor ser claro desde el inicio.</li>
  <li><strong>Pedí el horario por escrito</strong> en tu contrato.</li>
  <li><strong>Evitá prometer más de lo que podés</strong>: es preferible un horario realista.</li>
  <li><strong>Avisá con tiempo</strong> de exámenes y trabajos finales, y propone cómo reponer horas.</li>
</ol>
<p>Recordá los límites de la jornada: 8 horas diarias y 48 semanales en jornada diurna. Más tiempo es tiempo extra y se paga aparte. Mirá la guía de <a href="{ROOT}guias/horas-extra-feriados-costa-rica/">horas extra y feriados</a>.</p>

<h2>Opciones de capacitación gratuita</h2>
<p>El <strong>INA</strong> (Instituto Nacional de Aprendizaje) ofrece cursos y programas técnicos gratuitos en muchas áreas. Son una buena forma de sumar certificados a tu currículum sin pagar. Averiguá requisitos y fechas de matrícula directamente con el INA.</p>

<h2>Consejos para no quemarte</h2>
<ul>
  <li><strong>Planificá tu semana</strong> con horarios de trabajo, clases y descanso.</li>
  <li><strong>No descuides el sueño.</strong> Dormir poco te cobra caro en el estudio y en el trabajo.</li>
  <li><strong>Pedí ayuda</strong> en casa y en el trabajo cuando se junten las entregas.</li>
  <li><strong>Ahorrá un poco</strong> para los meses de exámenes.</li>
  <li><strong>Pensá en el largo plazo.</strong> Sumar estudios te abre la puerta a mejores salarios y a <a href="{ROOT}guias/como-pedir-aumento-costa-rica/">pedir un aumento</a>.</li>
</ul>

<h2>Si sos menor de 18 años</h2>
<p>Las personas menores de edad que trabajan tienen reglas especiales sobre permisos, horarios y tipo de trabajo. Consultá al MTSS y al PANI antes de empezar.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿Mi empleador está obligado a darme permiso para estudiar?</h3>
<p>No hay una regla general que obligue a dar permiso en todos los casos. Lo mejor es acordarlo por escrito desde el inicio o buscar un trabajo con horarios compatibles.</p>
<h3>¿Puedo trabajar de noche y estudiar de día?</h3>
<p>Sí, mucha gente lo hace. Recordá que la jornada nocturna es de 6 horas diarias y 36 semanales.</p>
<h3>¿Hay becas para estudiar?</h3>
<p>Existen programas del Estado, universidades e instituciones. Averiguá directamente en cada institución, porque cambian cada año.</p>
`,
  },
  {
    slug: 'trabajar-por-cuenta-propia-costa-rica',
    title: 'Trabajar por cuenta propia en Costa Rica: pasos para empezar',
    description: 'Cómo trabajar por cuenta propia en Costa Rica: inscripción en Hacienda (RUT), factura electrónica, seguro de la CCSS y tributación simplificada.',
    h1: 'Trabajar por cuenta propia en Costa Rica: pasos para empezar',
    lead: 'Si te vas a independizar, o ya trabajás por tu cuenta sin papeles, estos son los trámites básicos para hacerlo legal y sin sustos.',
    date: '2026-10-09',
    html: `
<aside class="note"><strong>Información general, no asesoría contable ni legal.</strong> Los requisitos, montos y plataformas cambian. Antes de empezar, consultá con una persona contadora y revisá los sitios oficiales. Última revisión: 9 de octubre de 2026.</aside>

<h2>Empleado o independiente: la diferencia</h2>
<p>Si trabajás para una empresa con <strong>horario, órdenes y un jefe</strong>, probablemente sos una persona empleada, con derechos laborales como aguinaldo y vacaciones, aunque te llamen "contratista". Si ofrecés tus servicios a tus propios clientes, con autonomía para decidir cómo y cuándo trabajás, sos <strong>independiente</strong>. Eso te da libertad, pero las responsabilidades (impuestos, seguro y ahorro) pasan a ser tuyas.</p>

<h2>Paso 1: Definí tu actividad</h2>
<p>Pensá qué servicio o producto vas a ofrecer, a quién y a qué precio. Revisá cuánto cobran otras personas por lo mismo. Para trabajos de oficio o profesionales, guardá tu portafolio.</p>

<h2>Paso 2: Inscribite en Hacienda</h2>
<p>Para facturar legalmente tenés que <strong>inscribirte como contribuyente</strong> en el Ministerio de Hacienda, en el Registro Único Tributario (RUT), a través de su portal en línea (TRIBU-CR). Ahí declarás tu actividad económica.</p>

<h2>Paso 3: Facturá de forma electrónica</h2>
<p>Quienes realizan una actividad lucrativa deben emitir <strong>facturas electrónicas</strong> por sus ventas o servicios. Hacienda suele ofrecer opciones gratuitas para eso, y también podés usar sistemas de terceros; revisá cuáles están disponibles hoy. Guardá siempre copia de tus facturas.</p>

<h2>Paso 4: Afiliate a la CCSS como trabajador independiente</h2>
<p>El Reglamento de la CCSS establece que quien califique como trabajador independiente debe <strong>afiliarse a los seguros</strong>. Eso cubre tu salud y tu pensión. Se paga una cuota según el ingreso que declarés. Pedí los requisitos actuales en la CCSS; cambian con el tiempo.</p>

<h2>Paso 5: Entendé tus impuestos</h2>
<p>Dependiendo de tu actividad y tus ingresos, podés estar en el régimen general o en el <strong>Régimen de Tributación Simplificada</strong>, pensado para actividades pequeñas que cumplan ciertos requisitos (por ejemplo, un límite al valor de los activos fijos). Un contador puede decirte cuál te conviene y cuánto debés declarar y pagar. Estar en el régimen simplificado no sustituye tu afiliación a la CCSS.</p>

<h2>Paso 6: Permisos si tenés un local o producís alimentos</h2>
<p>Si vas a vender comida, atender público o tener un local, pueden hacerte falta <strong>patente municipal y permisos de salud</strong>. Consultá en tu municipalidad y en el Ministerio de Salud.</p>

<h2>Paso 7: Cuidá tus finanzas</h2>
<ul>
  <li>Separá tu plata personal de la del negocio.</li>
  <li>Apartá un porcentaje de cada pago para impuestos y CCSS.</li>
  <li>Poné por escrito el trabajo, el precio y la fecha de pago con cada cliente.</li>
  <li>Cobrá a tiempo y no dejés que los pendientes se acumulen.</li>
</ul>

<h2>Si trabajás remoto para una empresa de afuera</h2>
<p>También aplican estas ideas. Mirá la guía de <a href="{ROOT}guias/trabajo-remoto-desde-costa-rica/">trabajo remoto desde Costa Rica</a> y la del <a href="{ROOT}guias/teletrabajo-ley-costa-rica/">teletrabajo según la Ley 9738</a>, para distinguir cuándo hay una relación laboral.</p>

<h2>Fuentes</h2>
<ul>
  <li><a href="https://www.hacienda.go.cr/docs/RequisitosParaOptarPorElRegimenTributacionSimplificada.pdf" target="_blank" rel="noopener">Hacienda: requisitos del Régimen de Tributación Simplificada</a></li>
  <li><a href="https://www.ccss.sa.cr/arc/normativa/18/reglamento_trabajador_independiente.pdf" target="_blank" rel="noopener">CCSS: reglamento del trabajador independiente</a></li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Tengo que inscribirme aunque gane poco?</h3>
<p>Si realizás una actividad lucrativa de forma habitual, consultá a Hacienda o a un contador cuál es tu obligación según tus ingresos.</p>
<h3>¿Puedo seguir con mi empleo y trabajar por mi cuenta?</h3>
<p>En general sí, mientras tu contrato no lo prohíba o no compitás con tu empleador. Revisá tu contrato.</p>
<h3>¿Cuánto cuesta el seguro de la CCSS para independientes?</h3>
<p>Depende del ingreso que declarés y de las reglas vigentes. Consultalo directamente en la CCSS.</p>
`,
  },
  {
    slug: 'trabajo-seguridad-costa-rica',
    title: 'Trabajar como oficial de seguridad en Costa Rica: requisitos',
    description: 'Cómo trabajar como oficial o agente de seguridad en Costa Rica: requisitos de la Ley 8395, curso básico, carné, horarios, derechos y cómo evitar estafas al buscar este brete.',
    h1: 'Trabajar como oficial de seguridad en Costa Rica',
    lead: 'Es uno de los trabajos con más ofertas en el país y puede ser una buena puerta de entrada. Esto es lo que piden y lo que debés cuidar.',
    date: '2026-10-09',
    html: `
<h2>Qué hace un agente de seguridad</h2>
<p>Cuida personas, edificios, comercios, condominios, fábricas o eventos. Controla accesos, hace rondas, vigila cámaras y reporta incidentes. Hay puestos en empresas de seguridad privada y también directamente en comercios o instituciones.</p>

<h2>Lo que dice la ley: Ley 8395</h2>
<p>La Ley 8395, de Servicios de Seguridad Privados, regula esta actividad. Los agentes de seguridad privada deben estar <strong>inscritos y acreditados ante la Dirección de Servicios de Seguridad Privada</strong>, del Ministerio de Seguridad Pública, que emite el carné. Entre los requisitos que establece la ley y su reglamento están:</p>
<ul>
  <li><strong>Ser mayor de edad</strong> y estar en pleno ejercicio de tus derechos.</li>
  <li><strong>No tener antecedentes penales</strong> (se presenta la hoja de delincuencia).</li>
  <li><strong>Aprobar una evaluación psicológica.</strong></li>
  <li><strong>Hacer un curso básico de seguridad</strong>, de una entidad autorizada.</li>
</ul>
<p>Los requisitos exactos y los trámites cambian, así que revisalos en el <a href="https://www.seguridadpublica.go.cr/tramites_servicios/seguridad_privada.aspx" target="_blank" rel="noopener">sitio del Ministerio de Seguridad Pública</a>. Muchas empresas de seguridad se encargan de buena parte del trámite con quien contratan.</p>

<h2>Cómo es el salario</h2>
<p>El salario mínimo depende de la ocupación. Según la lista del MTSS, el agente de seguridad está en las <strong>ocupaciones calificadas</strong>. Confirmá el monto vigente en la <a href="{ROOT}guias/salario-minimo-costa-rica/">guía del salario mínimo</a> y en el sitio del MTSS. Revisá también el pago de horas extra, feriados y trabajo nocturno.</p>

<h2>Horarios</h2>
<p>La seguridad funciona de día y de noche, todos los días del año. Preguntá cuál es tu turno y cómo se pagan las <a href="{ROOT}guias/horas-extra-feriados-costa-rica/">horas extra y los feriados</a>. Por ley, la jornada nocturna es de 6 horas diarias y 36 semanales.</p>

<h2>Cómo aplicar</h2>
<ol>
  <li>Preparate con tu <a href="{ROOT}guias/curriculum-costa-rica/">currículum</a>, tu cédula y tus documentos.</li>
  <li>Sacá la hoja de delincuencia, que se puede pedir en línea con el Poder Judicial.</li>
  <li>Buscá empresas de seguridad registradas y revisá las ofertas en <a href="{ROOT}empleos/servicios/">servicios generales</a>.</li>
  <li>Preparate para la entrevista con la <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">guía de entrevista</a>.</li>
</ol>

<h2>Tus derechos</h2>
<ul>
  <li><strong>Contrato escrito, CCSS y póliza de riesgos de trabajo.</strong></li>
  <li><strong>Uniforme y equipo</strong> necesarios para el trabajo, sin que te los cobren como condición para contratarte.</li>
  <li><strong>Descanso, vacaciones y aguinaldo.</strong> Mirá la guía de <a href="{ROOT}guias/derechos-laborales-costa-rica/">derechos laborales</a>.</li>
</ul>

<h2>Cuidado con las estafas</h2>
<p>En seguridad abundan las ofertas falsas que piden dinero por "uniforme", "curso" o "carné". Una empresa seria no te cobra para contratarte. Leé la <a href="{ROOT}guias/estafas-laborales-costa-rica/">guía de estafas laborales</a>.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿Necesito experiencia para trabajar en seguridad?</h3>
<p>Muchas empresas contratan sin experiencia y capacitan, siempre que cumplas los requisitos legales.</p>
<h3>¿Quién paga el curso y el carné?</h3>
<p>Depende de la empresa y de tu contrato. Pedí que te lo digan por escrito antes de empezar y desconfiá si te exigen pagar para ser contratado.</p>
<h3>¿Puedo portar arma?</h3>
<p>Son otros permisos, con requisitos aparte. Consultalo directamente en el Ministerio de Seguridad Pública.</p>
`,
  },
  {
    slug: 'trabajo-cocina-restaurantes-costa-rica',
    title: 'Trabajar en restaurantes y cocina en Costa Rica: guía práctica',
    description: 'Cómo conseguir trabajo en un restaurante en Costa Rica: puestos (salonero, ayudante de cocina, cocinero, barista), carné de manipulación de alimentos, horarios y consejos.',
    h1: 'Trabajar en restaurantes y cocina en Costa Rica',
    lead: 'La gastronomía y el turismo contratan todo el año. Estos son los puestos, lo que piden y cómo empezar.',
    date: '2026-10-09',
    html: `
<h2>Los puestos más comunes</h2>
<ul>
  <li><strong>Salonero o mesero:</strong> atiende mesas y toma pedidos. En la lista de salarios mínimos del MTSS aparece en las ocupaciones no calificadas.</li>
  <li><strong>Pilero (lavador de platos):</strong> una de las puertas de entrada más comunes a la cocina.</li>
  <li><strong>Ayudante de cocina:</strong> prepara ingredientes y apoya al cocinero. Está en las ocupaciones semicalificadas.</li>
  <li><strong>Cocinero, pizzero, panadero, pastelero, barista y bartender:</strong> están en las ocupaciones calificadas, con un mínimo salarial mayor.</li>
  <li><strong>Cajero, anfitrión y repartidor.</strong></li>
</ul>
<p>Confirmá los montos en la <a href="{ROOT}guias/salario-minimo-costa-rica/">guía del salario mínimo</a>.</p>

<h2>El carné de manipulación de alimentos</h2>
<p>Quien manipula alimentos debe contar con el <strong>carné de manipulación de alimentos</strong>, que emite el <strong>Ministerio de Salud</strong>. El trámite incluye un curso de inocuidad que se ofrece, por ejemplo, a través del <strong>INA</strong>, y el carné actual es digital. Los requisitos, costos y plataformas cambian, así que revisá el <a href="https://www.ministeriodesalud.go.cr/index.php/tramites-personales/88-licencias-y-carnes/81-manipulacion-de-alimentos" target="_blank" rel="noopener">sitio del Ministerio de Salud</a> y el <a href="https://www.ina.ac.cr/alimentos" target="_blank" rel="noopener">curso del INA</a>.</p>
<p>Muchos restaurantes piden el carné al contratar, otros te dan un plazo. Preguntá y pedí que te digan por escrito quién paga el curso.</p>

<h2>Cómo empezar sin experiencia</h2>
<ol>
  <li><strong>Empezá por un puesto de entrada:</strong> pilero, ayudante, salonero o repartidor.</li>
  <li><strong>Sacá tu carné de manipulación</strong> si todavía no lo tenés. Te diferencia de otros candidatos.</li>
  <li><strong>Mostrá actitud:</strong> puntualidad, limpieza y ganas de aprender son lo que más valoran.</li>
  <li><strong>Pedí que te enseñen y avanzá.</strong> Muchas personas llegan a cocineras o a encargadas empezando desde abajo.</li>
  <li><strong>Considerá estudiar</strong> un curso de cocina o servicio en el INA.</li>
</ol>
<p>Mirá las ofertas del sector en <a href="{ROOT}empleos/turismo/">turismo y restaurantes</a>.</p>

<h2>Cómo son los horarios</h2>
<p>Los restaurantes trabajan por turnos, fines de semana y feriados. Es clave preguntar cómo se pagan los <a href="{ROOT}guias/horas-extra-feriados-costa-rica/">feriados y las horas extra</a>, y cuántos días libres te dan por semana. Con turnos rotativos, es una opción compatible con <a href="{ROOT}guias/trabajar-y-estudiar-costa-rica/">estudiar</a>.</p>

<h2>Turismo y zonas de playa</h2>
<p>En zonas turísticas hay mucho trabajo estacional. Las temporadas altas traen más contrataciones, pero revisá bien el contrato, el pago, el hospedaje (si lo ofrecen) y la CCSS.</p>

<h2>Tus derechos</h2>
<ul>
  <li><strong>Contrato, CCSS y póliza de riesgos de trabajo.</strong></li>
  <li><strong>Pago puntual</strong> y claro, con colilla.</li>
  <li><strong>Equipo y uniforme</strong> necesarios para el trabajo.</li>
  <li><strong>Aguinaldo y vacaciones.</strong> Mirá <a href="{ROOT}guias/derechos-laborales-costa-rica/">derechos laborales</a>.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Necesito experiencia para ser salonero?</h3>
<p>No siempre. Muchos restaurantes capacitan. Se valora la buena atención y la puntualidad.</p>
<h3>¿El carné de manipulación lo paga el restaurante?</h3>
<p>Depende del empleador. Preguntalo antes de empezar y pedí la respuesta por escrito.</p>
<h3>¿Se puede trabajar en cocina sin saber cocinar?</h3>
<p>Sí, empezando como pilero o ayudante y aprendiendo en el puesto.</p>
`,
  },
  {
    slug: 'trabajo-bodega-logistica-costa-rica',
    title: 'Trabajar en bodega y logística en Costa Rica: guía práctica',
    description: 'Cómo conseguir trabajo en bodega y logística en Costa Rica: puestos, requisitos, seguridad en el trabajo y cómo mejorar tu salario.',
    h1: 'Trabajar en bodega y logística en Costa Rica',
    lead: 'La logística mueve todo lo que compramos, y siempre necesita gente. Estos son los puestos, los requisitos y cómo crecer.',
    date: '2026-10-09',
    html: `
<h2>Los puestos más comunes</h2>
<ul>
  <li><strong>Peón de bodega y empacador:</strong> reciben, ordenan, etiquetan y empacan mercadería. El MTSS clasifica varios de estos oficios en las ocupaciones no calificadas o semicalificadas.</li>
  <li><strong>Montacarguista (operador de montacargas):</strong> mueve cargas con montacargas. Es una ocupación semicalificada.</li>
  <li><strong>Despachador y encargado de bodega:</strong> controla inventario, entradas y salidas. El encargado de bodega está en las ocupaciones calificadas.</li>
  <li><strong>Cargador, chofer de reparto y auxiliar de logística.</strong></li>
  <li><strong>Puestos de aduanas y comercio exterior:</strong> más especializados y con más estudios.</li>
</ul>
<p>Revisá los montos mínimos vigentes en la <a href="{ROOT}guias/salario-minimo-costa-rica/">guía del salario mínimo</a>.</p>

<h2>Qué suelen pedir</h2>
<ul>
  <li><strong>Colegio terminado</strong> o noveno año, según el puesto.</li>
  <li><strong>Buena condición física</strong> y disposición para trabajar de pie y cargar peso.</li>
  <li><strong>Puntualidad y orden.</strong></li>
  <li><strong>Manejo básico de inventarios o de computadora</strong> para puestos de control.</li>
  <li><strong>Experiencia o certificado de montacargas</strong> para ese puesto. Algunas empresas capacitan a su gente; también hay cursos, por ejemplo en el INA.</li>
</ul>

<h2>Seguridad en el trabajo</h2>
<p>La bodega tiene riesgos: cargas pesadas, estantes altos y equipos en movimiento. Tu empleador debe darte el <strong>equipo de protección necesario</strong> (zapatos, guantes, faja, casco o chaleco, según el caso), capacitarte para operar equipos y tenerte cubierto con la <strong>póliza de riesgos del trabajo</strong>. Si te piden pagar tu propio equipo o operar un montacargas sin capacitación, es una mala señal.</p>

<h2>Horarios y pago</h2>
<p>Muchas bodegas trabajan por turnos, incluso de noche y fines de semana. Preguntá cómo se pagan las <a href="{ROOT}guias/horas-extra-feriados-costa-rica/">horas extra y los feriados</a>. En temporadas altas, como las de fin de año, suele haber más horas extra.</p>

<h2>Cómo conseguir el trabajo</h2>
<ol>
  <li>Armá un <a href="{ROOT}guias/curriculum-costa-rica/">currículum</a> sencillo con tus datos, estudios y cualquier experiencia, incluso informal.</li>
  <li>Revisá a diario las ofertas de <a href="{ROOT}empleos/logistica/">logística y transporte</a>, de <a href="{ROOT}empleos/manufactura/">producción</a> y de la <a href="{ROOT}guias/bolsas-de-empleo-costa-rica/">Agencia Nacional de Empleo</a>.</li>
  <li>Aplicá a varias, y preparate con la <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">guía de entrevista</a>.</li>
</ol>

<h2>Cómo crecer</h2>
<ul>
  <li>Aprendé a operar equipos y obtené certificados.</li>
  <li>Aprendé el sistema de inventarios de la empresa.</li>
  <li>Mostrá orden y responsabilidad: así se llega a encargado o supervisor.</li>
  <li>Estudiá logística o comercio exterior si querés pasar a puestos con más salario. Mirá <a href="{ROOT}guias/trabajar-y-estudiar-costa-rica/">trabajar y estudiar</a>.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Necesito licencia para operar un montacargas?</h3>
<p>Lo habitual es que se pida capacitación o certificación de operación. Pregunta a la empresa cuáles exige.</p>
<h3>¿Se puede empezar sin experiencia?</h3>
<p>Sí, en puestos de peón, empacador y auxiliar. Son de los más abiertos a gente nueva.</p>
<h3>¿Cuánto se gana?</h3>
<p>Depende del puesto y la empresa. El mínimo legal depende de la ocupación; revisalo en la lista del MTSS y compará las ofertas.</p>
`,
  },
  {
    slug: 'trabajo-ventas-costa-rica',
    title: 'Trabajar en ventas en Costa Rica: puestos, comisiones y cómo empezar',
    description: 'Cómo trabajar en ventas en Costa Rica: dependiente, agente de ventas y vendedor por comisión. Qué piden, cómo funcionan las comisiones y tus derechos como vendedor.',
    h1: 'Trabajar en ventas en Costa Rica',
    lead: 'Ventas es una de las áreas con más ofertas y una de las que más permite crecer. Si te gusta tratar con gente, puede ser tu camino.',
    date: '2026-10-09',
    html: `
<h2>Los tipos de trabajo en ventas</h2>
<ul>
  <li><strong>Dependiente de comercio:</strong> atiende a quienes entran a una tienda o supermercado. Está en las ocupaciones semicalificadas del MTSS.</li>
  <li><strong>Agente o ejecutivo de ventas:</strong> busca clientes, hace seguimiento y cierra ventas. Está en las ocupaciones calificadas.</li>
  <li><strong>Cajero y asesor en tienda.</strong></li>
  <li><strong>Vendedor de campo o por rutas:</strong> visita comercios o clientes.</li>
  <li><strong>Ventas por teléfono o en línea</strong> (inside sales, telemercadeo).</li>
  <li><strong>Promotor y demostrador:</strong> promociona productos en puntos de venta.</li>
</ul>
<p>Mirá las ofertas del sector en <a href="{ROOT}empleos/ventas/">ventas</a>.</p>

<h2>Qué piden</h2>
<ul>
  <li><strong>Buen trato y comunicación.</strong></li>
  <li><strong>Buena presentación.</strong></li>
  <li><strong>Manejo básico de computadora</strong> y, a veces, de sistemas de punto de venta.</li>
  <li><strong>Disponibilidad de horario</strong>, incluidos fines de semana y feriados.</li>
  <li><strong>Moto o vehículo</strong> en algunos puestos de calle.</li>
  <li><strong>Inglés</strong> en ventas a clientes del exterior.</li>
</ul>

<h2>Cómo funcionan las comisiones</h2>
<p>Muchos puestos combinan un <strong>salario base</strong> con una <strong>comisión</strong> por ventas. Antes de aceptar, pedí por escrito:</p>
<ul>
  <li>Cuál es el salario base y si es mayor o igual al <a href="{ROOT}guias/salario-minimo-costa-rica/">mínimo de tu ocupación</a>.</li>
  <li>Cuál es el porcentaje de comisión y sobre qué ventas se calcula.</li>
  <li>Cuándo se paga y en qué condiciones.</li>
  <li>Qué pasa si el cliente no paga o devuelve el producto.</li>
</ul>
<p>Las comisiones forman parte de lo que ganás. Se tienen en cuenta, junto con el resto de tus salarios, para calcular tu <a href="{ROOT}guias/aguinaldo-costa-rica/">aguinaldo</a>. Si todo tu ingreso es comisión, desconfiá: lo normal es tener un salario base.</p>

<h2>Cuidado con ventas que no son un empleo</h2>
<p>Algunas "ofertas de ventas" piden que <strong>pagués por un kit, una inscripción o un inventario</strong>, o que reclutés a otras personas. Eso es un modelo de pirámide o multinivel, no un empleo. Leé la <a href="{ROOT}guias/estafas-laborales-costa-rica/">guía de estafas laborales</a>.</p>

<h2>Cómo empezar</h2>
<ol>
  <li>Empezá por un puesto de dependiente o de servicio al cliente. Mirá <a href="{ROOT}guias/trabajos-sin-experiencia-costa-rica/">trabajos sin experiencia</a>.</li>
  <li>Aprendé el producto a fondo: quien conoce lo que vende, vende más.</li>
  <li>Llevá tus números: cuánto vendés, cuántos clientes atendés. Eso sirve para <a href="{ROOT}guias/como-pedir-aumento-costa-rica/">pedir un aumento</a>.</li>
  <li>Prepará la <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">entrevista</a>: en ventas suelen pedirte que "me vendás este lapicero".</li>
</ol>

<h2>Tus derechos como vendedor</h2>
<ul>
  <li>Contrato escrito, CCSS, póliza de riesgos de trabajo, vacaciones y aguinaldo. Mirá <a href="{ROOT}guias/derechos-laborales-costa-rica/">derechos laborales</a>.</li>
  <li>Pago de las horas extra y de los feriados que trabajés. Mirá <a href="{ROOT}guias/horas-extra-feriados-costa-rica/">horas extra y feriados</a>.</li>
</ul>

<h2>Preguntas frecuentes</h2>
<h3>¿Necesito experiencia para trabajar en ventas?</h3>
<p>No siempre. Muchos puestos de dependiente capacitan. Para ventas más técnicas se valora la experiencia.</p>
<h3>¿Puedo ganar solo con comisión?</h3>
<p>Hay trabajos así, pero lo normal es tener un salario base. Si es solo comisión, pedí los términos por escrito y revisá que cumpla la ley.</p>
<h3>¿Me pueden rebajar del salario por una venta no cobrada?</h3>
<p>Las deducciones del salario tienen límites legales. Si te rebajan, consultá al MTSS.</p>
`,
  },
  {
    slug: 'trabajo-conductor-mensajero-costa-rica',
    title: 'Trabajar de conductor o mensajero en Costa Rica: licencias',
    description: 'Cómo trabajar de conductor, mensajero o repartidor en Costa Rica: tipos de licencia (A y B), requisitos, cómo se paga y qué debés revisar antes de aceptar un brete de manejo.',
    h1: 'Trabajar de conductor o mensajero en Costa Rica',
    lead: 'Manejar y repartir es una puerta de entrada con mucha demanda. Estas son las licencias que necesitás y lo que conviene revisar antes de aceptar.',
    date: '2026-10-09',
    html: `
<h2>Los tipos de puesto</h2>
<ul>
  <li><strong>Mensajero:</strong> entrega documentos y paquetes, normalmente en moto. En la lista del MTSS está entre las ocupaciones no calificadas.</li>
  <li><strong>Repartidor y chofer de reparto:</strong> lleva mercadería a comercios o clientes.</li>
  <li><strong>Conductor de vehículo liviano:</strong> semicalificado.</li>
  <li><strong>Conductor de vehículo pesado, bus o tráiler:</strong> calificado o especializado, con licencia de categoría superior.</li>
  <li><strong>Conductor de ambulancia o de servicios especiales.</strong></li>
</ul>
<p>Confirmá los montos mínimos en la <a href="{ROOT}guias/salario-minimo-costa-rica/">guía del salario mínimo</a>.</p>

<h2>La licencia que necesitás</h2>
<ul>
  <li><strong>Licencia A (motocicletas):</strong> A1 permite hasta 125 cc, A2 hasta 500 cc y A3 motos sin límite de cilindrada. Casi todos los puestos de mensajería en moto usan A1 o A2.</li>
  <li><strong>Licencia B1:</strong> vehículos livianos (autos y pick-ups pequeños).</li>
  <li><strong>Licencia B2 y superiores:</strong> camiones y vehículos más grandes, incluidos buses y tráileres, con categorías específicas.</li>
</ul>
<p>Las edades, pruebas y requisitos para sacar o renovar cada licencia los define el COSEVI. Revisalos en su sitio oficial antes de planear el trámite.</p>

<h2>Antes de aceptar el trabajo</h2>
<p>Preguntá y pedí por escrito:</p>
<ul>
  <li><strong>¿La moto o el vehículo es de la empresa o es tuyo?</strong> Si usás el tuyo, aclará quién paga combustible, mantenimiento, marchamo y seguros.</li>
  <li><strong>¿Cómo te pagan?</strong> Salario fijo, por entrega o por ruta. Verificá que cumpla el <a href="{ROOT}guias/salario-minimo-costa-rica/">mínimo</a> y que te paguen las horas extra.</li>
  <li><strong>¿Estás asegurado en la CCSS y con póliza de riesgos de trabajo?</strong> Un accidente en la calle es un riesgo real.</li>
  <li><strong>¿Cuál es el horario y qué pasa en feriados?</strong></li>
</ul>

<h2>Trabajo como independiente en plataformas de entrega</h2>
<p>Algunas plataformas contratan repartidores como independientes. En ese caso, no tenés los mismos beneficios que una persona empleada (aguinaldo, vacaciones, CCSS pagada por la empresa), y tenés que ocuparte de tu propio seguro e impuestos. Leé la guía de <a href="{ROOT}guias/trabajar-por-cuenta-propia-costa-rica/">trabajar por cuenta propia</a> y compará bien antes de decidir.</p>

<h2>Seguridad en el camino</h2>
<ul>
  <li>Usá casco y equipo de protección siempre.</li>
  <li>No manejes cansado ni con prisa excesiva.</li>
  <li>Mantené en orden los documentos del vehículo.</li>
  <li>Guardá copia de tus facturas y comprobantes de entrega.</li>
</ul>

<h2>Cómo encontrar ofertas</h2>
<p>Mirá las ofertas en <a href="{ROOT}empleos/logistica/">logística y transporte</a> y en la <a href="{ROOT}guias/bolsas-de-empleo-costa-rica/">Agencia Nacional de Empleo</a>. Y cuidado con quienes piden dinero para "reservar" una ruta o un vehículo: es una estafa. Mirá la <a href="{ROOT}guias/estafas-laborales-costa-rica/">guía de estafas</a>.</p>

<h2>Preguntas frecuentes</h2>
<h3>¿Puedo trabajar de mensajero sin experiencia?</h3>
<p>Sí, en muchos casos solo piden licencia vigente, buena conducta y conocer la zona.</p>
<h3>¿Tengo que tener mi propia moto?</h3>
<p>Algunas empresas dan el vehículo y otras piden el tuyo. Aclaralo antes de aceptar.</p>
<h3>¿Qué licencia necesito para manejar un microbús?</h3>
<p>Depende del número de pasajeros y del tipo de vehículo. Consultalo en el COSEVI.</p>
`,
  },
];
