import { fold } from './util.mjs';

export const CATEGORIES = {
  tecnologia: 'Tecnología',
  'servicio-cliente': 'Servicio al cliente',
  ventas: 'Ventas',
  mercadeo: 'Mercadeo y diseño',
  finanzas: 'Finanzas y administración',
  logistica: 'Logística y transporte',
  manufactura: 'Producción y manufactura',
  ingenieria: 'Ingeniería',
  salud: 'Salud',
  turismo: 'Turismo y restaurantes',
  educacion: 'Educación',
  construccion: 'Construcción y oficios',
  servicios: 'Servicios generales',
  legal: 'Legal',
  gerencia: 'Gerencia y especialistas',
  otros: 'Otros',
};

// El orden importa: la primera categoría que coincide gana.
const RULES = [
  ['tecnologia', /(software|developer|desarrollador|programador|devops|full ?stack|front ?end|back ?end|\bqa\b|tester|\bux\b|\bui\b|data (engineer|analyst|scien|architect)|ingeniero de datos|analista de datos|cloud|cyber|ciberseguridad|seguridad (de la )?informacion|infosec|sysadmin|administrador de (sistemas|redes|bases)|soporte (t[eé]cnico|ti\b|de ti)|it support|help ?desk|service ?desk|technical support|desktop support|equipos? de c[oó]mputo|\bsap\b|\bsql\b|\bjava\b|python|\.net|\breact\b|angular|node\.?js|machine learning|\bia\b|\bai\b|inteligencia artificial|\bredes\b(?! sociales)|network (engineer|admin)|infraestructura (ti|tecnol)|\brpa\b|database|\bdba\b|scrum|product owner|salesforce|servicenow|power ?bi|tableau|\berp\b|\bcrm\b|ibm ace|mainframe|cobol|kubernetes|\baws\b|azure|\bgcp\b|sistemas|inform[aá]tic|tecnolog[ií]a de (la )?informaci|\bti\b|\bit\b (analyst|specialist|manager|engineer|infrastructure)|application (architect|support|developer)|solutions? architect|embedded|firmware|\bfpga\b|ciencia de datos)/],
  ['legal', /(abogad|\blegal\b|attorney|notari|paralegal|compliance|cumplimiento normativo|litigio|counsel)/],
  ['salud', /(enfermer|nurse|medic[oa]\b|m[eé]dic|doctor|farmac|pharm|cl[ií]nic|odont|dental|paramed|laboratorio|fisioterap|psicolog|nutricion|veterin|\bsalud\b|healthcare|cuidador|terapeuta|radiolog|regente)/],
  ['educacion', /(profesor|docente|teacher|maestr[oa]|tutor|instructor|educaci[oó]n|academia|capacitador|lecturer|catedr)/],
  ['servicio-cliente', /(customer (service|support|care|experience|success)|servicio al cliente|call ?center|contact ?center|agente|agent\b|atenci[oó]n al cliente|soporte al cliente|telemarketing|telemercadeo|representante de (servicio|atenci)|bilingual|biling[uü]e|sac\b|customer|cliente|collections|cobro|back ?office|chat support|live chat|asesor(a)? de servicio)/],
  ['ventas', /(ventas|\bsales\b|vendedor|ejecutivo (comercial|de cuenta)|account (executive|manager)|business development|asesor(a)? comercial|promotor|merchandis|key account|cuentas clave|comercial|\bbdr\b|\bsdr\b)/],
  ['mercadeo', /(marketing|mercadeo|community manager|redes sociales|social media|content|contenido|\bseo\b|dise[nñ]ador|designer|graphic|gr[aá]fic|copywriter|publicidad|\bbrand|comunicaci[oó]n|periodis|fot[oó]graf|video|editor|creative|creativ)/],
  ['finanzas', /(accountant|contador|contab|financ|auditor|payroll|planilla|tesorer|billing|facturaci|administrativ|secretar|recepcion|recursos humanos|\brrhh\b|human resources|talent acquisition|recruiter|reclut|compras|procurement|buyer|credito|bank|banc|cajero|oficinista|digitador|data entry|controller|\btax\b|impuestos|accounts (payable|receivable)|cuentas por|treasury|tesoreria|analista de (cuentas|credit)|\bfp&a\b|finance|accounting|asistente (administrativ|contable)|office manager|seguros|insurance|actuari|underwriter|\bhr\b|people operations|nomina|benefits)/],
  ['logistica', /(log[ií]stic|bodega|warehouse|chofer|conductor|driver|mensajer|repartidor|delivery|transport|supply chain|cadena de suministro|inventari|montacargas|forklift|despach|aduan|customs|freight|importaci|exportaci|courier|cargador|pe[oó]n de bodega|picker|shipping|receiving|dispatcher|trafico|trade compliance|demand planner|planeamiento)/],
  ['turismo', /(hotel|hospitality|mesero|waiter|waitress|cocin|chef\b|barista|bartender|housekeep|camarer|\btour|gu[ií]a tur|restaurante|restaurant|salonero|turismo|resort|concierge|front desk|steward|panader|pizzer|reposter|sushi|surf|snorkel|villa|hostal|hostel|guest)/],
  ['construccion', /(construcc|alba[nñ]il|maestro de obra|electricista|plomero|fontaner|soldador|carpinter|pintor|jardiner|ayudante general|topograf|arquitect|\barchitect\b|\bbim\b|obra civil|inspector de obra|operario de construcci|techos?\b|aire acondicionado|refrigeraci)/],
  ['servicios', /(oficial de seguridad|guarda\b|security guard|vigilante|seguridad f[ií]sica|conserje|limpieza|misc[eé]laneo|janitor|cleaning|ama de llaves|ni[nñ]era|dom[eé]stic|lavander|oficios varios|lavacarros|peon|servicios generales|mantenimiento (de )?(edificio|general|locativo)|salvavidas)/],
  ['ingenieria', /(engineer|ingenier|\bcad\b|research|r&d|investigaci[oó]n y desarrollo|designer?\b.*(mechanical|electrical)|scientist|cient[ií]fic)/],
  ['manufactura', /(operario|operador|operator|production|producci[oó]n|manufactur|ensambl|assembler|assembly|t[eé]cnico|technician|mec[aá]nico|machinist|molding|calidad|quality|mantenimiento|maintenance|planta|sierrero|empaque|packag|inspector|proceso|process (tech|oper)|clean ?room|electromec|supervisor de|line lead|team lead operations|metrolog|cnc|soldadura)/],
  ['gerencia', /(manager|gerente|director|jefe|coordinador|l[ií]der|\blead\b|head of|project manager|supervisor|administrador|encargado|chief|\bvp\b|vice president|program manager|analyst|analista|specialist|especialista|consultor|consultant|assistant|asistente|auxiliar)/],
];

export function classify(title = '', extra = '') {
  const t = fold(title);
  for (const [cat, re] of RULES) if (re.test(t)) return cat;
  if (extra) {
    const x = fold(extra).slice(0, 240);
    for (const [cat, re] of RULES) if (cat !== 'gerencia' && re.test(x)) return cat;
  }
  return 'otros';
}

export function detectTags(...texts) {
  const t = fold(texts.filter(Boolean).join(' | '));
  const tags = [];
  if (/biling|bilingual|english|ingles|\bfrench\b|frances|portugu|german|aleman|italian|\bidiomas\b/.test(t)) tags.push('bilingue');
  if (/\bintern\b|internship|pasant[ií]a|practicante|trainee|\bjunior\b|\bjr\b|entry.?level|sin experiencia|aprendiz|\btrabajo de verano\b|graduate|recien graduado|ayudante|co-?op/.test(t)) tags.push('junior');
  if (/temporal|temporary|\bcontract\b|por contrato|plazo fijo|tiempo parcial|part.?time|medio tiempo|freelance|por horas/.test(t)) tags.push('temporal');
  return tags;
}
