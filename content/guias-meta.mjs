// Estructura de /guias/: temas (páginas centro) y la ficha de cada guía.
// Para agregar una guía nueva: escribila en un archivo de content/, y sumá su ficha en META (tema, etiquetas y botón hacia los empleos).
// El sitio no compila si falta alguna.

export const DESTACADAS = [
  'como-buscar-trabajo-en-costa-rica',
  'derechos-laborales-costa-rica',
  'aguinaldo-costa-rica',
  'salario-minimo-costa-rica',
  'estafas-laborales-costa-rica',
  'primer-empleo-costa-rica',
];

export const TEMAS = [
  {
    id: 'buscar-trabajo',
    nombre: 'Buscar trabajo',
    emoji: '🔎',
    title: 'Cómo buscar trabajo en Costa Rica: guías prácticas',
    h1: 'Cómo buscar trabajo en Costa Rica',
    description: 'Guías para buscar trabajo en Costa Rica: dónde mirar, cómo conseguir tu primer empleo, trabajos sin experiencia y cómo combinar el trabajo con los estudios.',
    intro: `<p>Buscar brete cansa cuando las ofertas están regadas en mil páginas, grupos y mensajes. Estas guías te ordenan el camino: <strong>dónde buscar</strong>, qué pedir y cómo no perder el tiempo. Si es tu primera vez, empezá por la guía de <a href="{ROOT}guias/primer-empleo-costa-rica/">primer empleo</a>; si ya tenés experiencia, mirá <a href="{ROOT}guias/bolsas-de-empleo-costa-rica/">dónde buscar trabajo</a> y cómo combinar varias fuentes.</p>
<p>Todo lo que leás acá lo podés poner en práctica de inmediato: en TicoBrete juntamos las ofertas de empresas, de la Agencia Nacional de Empleo y de trabajo remoto, y podés filtrarlas por provincia, categoría y fecha.</p>`,
  },
  {
    id: 'curriculum-entrevistas',
    nombre: 'Currículum y entrevistas',
    emoji: '📝',
    title: 'Currículum, carta de presentación y entrevistas de trabajo',
    h1: 'Currículum, entrevistas y aumentos',
    description: 'Cómo hacer un currículum y una carta de presentación, cómo prepararte para una entrevista de trabajo (también en inglés) y cómo pedir un aumento de salario en Costa Rica.',
    intro: `<p>Conseguir la entrevista es la mitad del camino; salir bien de ella es la otra mitad. Acá encontrás cómo armar un <a href="{ROOT}guias/curriculum-costa-rica/">currículum claro</a>, escribir una <a href="{ROOT}guias/carta-de-presentacion-costa-rica/">carta de presentación</a> y prepararte para la <a href="{ROOT}guias/entrevista-de-trabajo-costa-rica/">entrevista</a>, incluida la <a href="{ROOT}guias/entrevista-en-ingles-costa-rica/">entrevista en inglés</a> que piden en muchos centros de servicio.</p>
<p>Y cuando ya tengas el trabajo, la guía para <a href="{ROOT}guias/como-pedir-aumento-costa-rica/">pedir un aumento</a> te ayuda a prepararte para esa conversación.</p>`,
  },
  {
    id: 'derechos-laborales',
    nombre: 'Derechos laborales',
    emoji: '⚖️',
    title: 'Derechos laborales en Costa Rica: guías claras y verificadas',
    h1: 'Tus derechos laborales en Costa Rica',
    description: 'Guías sobre derechos laborales en Costa Rica: salario mínimo, aguinaldo, vacaciones, horas extra, licencias, despido, liquidación y cómo denunciar.',
    intro: `<p>Mucha gente no reclama lo que le corresponde porque no sabe que existe. Estas guías explican <strong>tus derechos más importantes</strong>, con datos tomados de fuentes oficiales como el Ministerio de Trabajo (MTSS), el Código de Trabajo y la CCSS. Empezá por los <a href="{ROOT}guias/derechos-laborales-costa-rica/">derechos laborales básicos</a>.</p>
<p>Cada guía indica sus fuentes y la fecha de su última revisión. Son información general: para tu caso concreto, consultá siempre al MTSS (800-TRABAJO, 800 872 2256) o a una persona abogada. Y si necesitás hacer cuentas, usá las <a href="{ROOT}guias/temas/calculadoras/">calculadoras</a>.</p>`,
  },
  {
    id: 'oficios',
    nombre: 'Guías por oficio',
    emoji: '🛠️',
    title: 'Guías por oficio: seguridad, cocina, bodega, ventas y más',
    h1: 'Guías por oficio y tipo de trabajo',
    description: 'Cómo trabajar en un call center, de oficial de seguridad, en restaurantes, bodega, ventas o como conductor y mensajero en Costa Rica: requisitos, licencias y consejos.',
    intro: `<p>Cada oficio tiene sus propios requisitos, horarios y trampas. Acá reunimos lo esencial de los trabajos con más ofertas en el país: <a href="{ROOT}guias/trabajar-call-center-costa-rica/">call center</a>, <a href="{ROOT}guias/trabajo-seguridad-costa-rica/">seguridad</a>, <a href="{ROOT}guias/trabajo-cocina-restaurantes-costa-rica/">cocina y restaurantes</a>, <a href="{ROOT}guias/trabajo-bodega-logistica-costa-rica/">bodega y logística</a>, <a href="{ROOT}guias/trabajo-ventas-costa-rica/">ventas</a> y <a href="{ROOT}guias/trabajo-conductor-mensajero-costa-rica/">conducción y mensajería</a>.</p>
<p>Para cada uno te contamos qué piden, qué licencias o carnés hacen falta, cómo se clasifica el salario mínimo y qué revisar antes de aceptar. Si querés ver ofertas de cada área, usá los enlaces de cada guía.</p>`,
  },
  {
    id: 'remoto-independiente',
    nombre: 'Remoto y por cuenta propia',
    emoji: '🏠',
    title: 'Trabajo remoto, teletrabajo y trabajo por cuenta propia',
    h1: 'Trabajo remoto y por cuenta propia',
    description: 'Cómo trabajar remoto desde Costa Rica, qué dice la Ley 9738 de teletrabajo y qué pasos seguir para trabajar por cuenta propia: Hacienda, factura electrónica y CCSS.',
    intro: `<p>Trabajar desde casa o por tu cuenta da libertad, pero también cambia tus derechos y obligaciones. Si te contratan como persona empleada y te piden teletrabajar, la <a href="{ROOT}guias/teletrabajo-ley-costa-rica/">Ley 9738</a> define quién paga el equipo, el horario y qué pasa si algo falla. Si trabajás para empresas de afuera, mirá <a href="{ROOT}guias/trabajo-remoto-desde-costa-rica/">cómo empezar</a>. Y si vas a facturar, los pasos para <a href="{ROOT}guias/trabajar-por-cuenta-propia-costa-rica/">trabajar por cuenta propia</a> te ahorran sustos.</p>`,
  },
  {
    id: 'estafas-seguridad',
    nombre: 'Estafas y seguridad',
    emoji: '🛡️',
    title: 'Estafas laborales y ofertas falsas: cómo cuidarte',
    h1: 'Estafas laborales y seguridad al buscar trabajo',
    description: 'Cómo reconocer estafas laborales y ofertas de trabajo falsas en WhatsApp, Facebook y Telegram en Costa Rica, cómo verificar una empresa y qué hacer si ya caíste.',
    intro: `<p>Cuando uno anda desesperado por brete, es cuando más fácil es caer. Un trabajo de verdad <strong>nunca te cobra</strong> para contratarte. Estas guías te enseñan las <a href="{ROOT}guias/estafas-laborales-costa-rica/">señales de una estafa laboral</a>, cómo detectar <a href="{ROOT}guias/ofertas-de-trabajo-falsas-whatsapp-facebook/">ofertas falsas en redes</a>, cómo verificar una empresa y qué hacer si ya mandaste datos o dinero.</p>`,
  },
  {
    id: 'calculadoras',
    nombre: 'Calculadoras',
    emoji: '🧮',
    title: 'Calculadoras laborales de Costa Rica: aguinaldo, liquidación y más',
    h1: 'Calculadoras laborales',
    description: 'Calculadoras gratuitas para trabajadores en Costa Rica: aguinaldo, liquidación laboral (cesantía y preaviso), horas extra y feriados, y vacaciones. Funcionan en tu navegador.',
    intro: `<p>Estas calculadoras te ayudan a revisar que te paguen lo que corresponde. Usan las reglas del Código de Trabajo y de las publicaciones del MTSS, y <strong>corren en tu navegador</strong>: tus datos no se envían a ningún lado. Son cálculos de referencia: para el monto exacto de tu caso, confirmá con el MTSS.</p>`,
  },
];

const HOME = ['Ver los bretes más recientes', ''];
const JUNIOR = ['Ver bretes sin experiencia', '?t=junior'];
const REMOTO = ['Ver trabajo remoto', 'empleos/remoto/'];

export const META = {
  'como-buscar-trabajo-en-costa-rica': { tema: 'buscar-trabajo', etiquetas: ['buscar trabajo', 'empleo', 'bretes'], cta: HOME },
  'bolsas-de-empleo-costa-rica': { tema: 'buscar-trabajo', etiquetas: ['bolsas de empleo', 'linkedin', 'ane', 'páginas'], cta: HOME },
  'primer-empleo-costa-rica': { tema: 'buscar-trabajo', etiquetas: ['primer empleo', 'sin experiencia', 'jóvenes'], cta: JUNIOR },
  'trabajos-sin-experiencia-costa-rica': { tema: 'buscar-trabajo', etiquetas: ['sin experiencia', 'primer empleo'], cta: JUNIOR },
  'trabajar-y-estudiar-costa-rica': { tema: 'buscar-trabajo', etiquetas: ['estudiar', 'medio tiempo', 'horarios'], cta: REMOTO },

  'curriculum-costa-rica': { tema: 'curriculum-entrevistas', etiquetas: ['currículum', 'cv', 'hoja de vida'], cta: HOME },
  'carta-de-presentacion-costa-rica': { tema: 'curriculum-entrevistas', etiquetas: ['carta', 'presentación'], cta: HOME },
  'entrevista-de-trabajo-costa-rica': { tema: 'curriculum-entrevistas', etiquetas: ['entrevista', 'preguntas'], cta: HOME },
  'entrevista-en-ingles-costa-rica': { tema: 'curriculum-entrevistas', etiquetas: ['inglés', 'entrevista', 'call center', 'bilingüe'], cta: ['Ver bretes de servicio al cliente', 'empleos/servicio-cliente/'] },
  'como-pedir-aumento-costa-rica': { tema: 'curriculum-entrevistas', etiquetas: ['aumento', 'salario', 'negociar'], cta: HOME },

  'derechos-laborales-costa-rica': { tema: 'derechos-laborales', etiquetas: ['derechos', 'código de trabajo', 'mtss'], cta: HOME },
  'salario-minimo-costa-rica': { tema: 'derechos-laborales', etiquetas: ['salario mínimo', 'decreto', '2026'], cta: HOME },
  'aguinaldo-costa-rica': { tema: 'derechos-laborales', etiquetas: ['aguinaldo', 'diciembre', 'cálculo'], cta: HOME },
  'vacaciones-costa-rica': { tema: 'derechos-laborales', etiquetas: ['vacaciones', 'descanso'], cta: HOME },
  'horas-extra-feriados-costa-rica': { tema: 'derechos-laborales', etiquetas: ['horas extra', 'feriados', 'jornada'], cta: HOME },
  'licencia-maternidad-paternidad-costa-rica': { tema: 'derechos-laborales', etiquetas: ['maternidad', 'paternidad', 'embarazo', 'lactancia'], cta: HOME },
  'incapacidades-costa-rica': { tema: 'derechos-laborales', etiquetas: ['incapacidad', 'enfermedad', 'ccss', 'subsidio'], cta: HOME },
  'despido-cesantia-preaviso-costa-rica': { tema: 'derechos-laborales', etiquetas: ['despido', 'cesantía', 'preaviso'], cta: HOME },
  'liquidacion-laboral-finiquito-costa-rica': { tema: 'derechos-laborales', etiquetas: ['liquidación', 'finiquito', 'prestaciones'], cta: HOME },
  'denunciar-patrono-mtss-costa-rica': { tema: 'derechos-laborales', etiquetas: ['denuncia', 'mtss', 'inspección de trabajo'], cta: HOME },

  'trabajar-call-center-costa-rica': { tema: 'oficios', etiquetas: ['call center', 'servicio al cliente', 'inglés'], cta: ['Ver bretes de servicio al cliente', 'empleos/servicio-cliente/'] },
  'trabajo-seguridad-costa-rica': { tema: 'oficios', etiquetas: ['seguridad', 'oficial', 'agente', 'ley 8395'], cta: ['Ver bretes de servicios generales', 'empleos/servicios/'] },
  'trabajo-cocina-restaurantes-costa-rica': { tema: 'oficios', etiquetas: ['cocina', 'restaurante', 'salonero', 'carné de manipulación'], cta: ['Ver bretes de turismo y restaurantes', 'empleos/turismo/'] },
  'trabajo-bodega-logistica-costa-rica': { tema: 'oficios', etiquetas: ['bodega', 'logística', 'montacargas'], cta: ['Ver bretes de logística', 'empleos/logistica/'] },
  'trabajo-ventas-costa-rica': { tema: 'oficios', etiquetas: ['ventas', 'comisiones', 'dependiente'], cta: ['Ver bretes de ventas', 'empleos/ventas/'] },
  'trabajo-conductor-mensajero-costa-rica': { tema: 'oficios', etiquetas: ['conductor', 'mensajero', 'licencia', 'repartidor'], cta: ['Ver bretes de logística', 'empleos/logistica/'] },

  'trabajo-remoto-desde-costa-rica': { tema: 'remoto-independiente', etiquetas: ['remoto', 'desde casa', 'inglés'], cta: REMOTO },
  'teletrabajo-ley-costa-rica': { tema: 'remoto-independiente', etiquetas: ['teletrabajo', 'ley 9738'], cta: REMOTO },
  'trabajar-por-cuenta-propia-costa-rica': { tema: 'remoto-independiente', etiquetas: ['independiente', 'hacienda', 'factura electrónica', 'ccss'], cta: HOME },

  'estafas-laborales-costa-rica': { tema: 'estafas-seguridad', etiquetas: ['estafas', 'seguridad', 'fraude'], cta: HOME },
  'ofertas-de-trabajo-falsas-whatsapp-facebook': { tema: 'estafas-seguridad', etiquetas: ['estafas', 'whatsapp', 'facebook', 'ofertas falsas'], cta: HOME },

  'calculadora-aguinaldo-costa-rica': { tema: 'calculadoras', etiquetas: ['aguinaldo', 'calculadora'], cta: HOME },
  'calculadora-liquidacion-laboral-costa-rica': { tema: 'calculadoras', etiquetas: ['liquidación', 'cesantía', 'preaviso', 'calculadora'], cta: HOME },
  'calculadora-horas-extra-costa-rica': { tema: 'calculadoras', etiquetas: ['horas extra', 'feriados', 'calculadora'], cta: HOME },
  'calculadora-vacaciones-costa-rica': { tema: 'calculadoras', etiquetas: ['vacaciones', 'calculadora'], cta: HOME },
};
