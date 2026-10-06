import { fold } from './util.mjs';

export const PROVINCES = {
  'san-jose': 'San José',
  alajuela: 'Alajuela',
  cartago: 'Cartago',
  heredia: 'Heredia',
  guanacaste: 'Guanacaste',
  puntarenas: 'Puntarenas',
  limon: 'Limón',
};

// Lugares de Costa Rica (sin tildes, minúscula). Cantones y zonas donde hay muchos bretes.
const PLACES = {
  heredia: ['heredia', 'belen', 'la aurora', 'la ribera', 'san rafael de heredia', 'flores', 'barva', 'santo domingo', 'ulloa', 'san pablo de heredia', 'san isidro de heredia', 'santa barbara', 'sarapiqui', 'cariari', 'la valencia', 'zona franca ultra park', 'ultrapark'],
  alajuela: ['alajuela', 'coyol', 'san ramon', 'grecia', 'atenas', 'naranjo', 'la garita', 'ciudad quesada', 'san carlos', 'zarcero', 'palmares', 'poas', 'valverde vega', 'sarchi', 'upala', 'los chiles', 'la fortuna', 'el coyol', 'san mateo', 'orotina', 'guatuso', 'tuetal', 'el carmen de alajuela'],
  cartago: ['cartago', 'paraiso', 'tres rios', 'turrialba', 'oreamuno', 'la union', 'el guarco', 'jimenez', 'alvarado', 'cot de oreamuno', 'cervantes'],
  guanacaste: ['guanacaste', 'liberia', 'nicoya', 'tamarindo', 'santa cruz', 'canas', 'tilaran', 'playas del coco', 'papagayo', 'flamingo', 'samara', 'nosara', 'bagaces', 'carrillo', 'la cruz', 'abangares', 'hojancha', 'playa hermosa', 'brasilito', 'conchal'],
  puntarenas: ['puntarenas', 'jaco', 'quepos', 'manuel antonio', 'golfito', 'uvita', 'monteverde', 'esparza', 'osa', 'corredores', 'parrita', 'garabito', 'montes de oro', 'coto brus', 'buenos aires de puntarenas', 'puerto jimenez', 'dominical', 'paquera', 'santa elena', 'ciudad neily', 'cobano', 'montezuma', 'san vito'],
  limon: ['limon', 'puerto viejo', 'guapiles', 'siquirres', 'cahuita', 'pococi', 'matina', 'talamanca', 'guacimo', 'bribri', 'sixaola', 'moin', 'cariari de pococi', 'rio frio', 'la rita'],
  'san-jose': ['san jose', 'escazu', 'santa ana', 'curridabat', 'pavas', 'sabana', 'desamparados', 'tibas', 'moravia', 'goicoechea', 'la uruca', 'zapote', 'alajuelita', 'aserri', 'mora', 'coronado', 'montes de oca', 'san pedro', 'heredia san jose', 'rohrmoser', 'escazu', 'piedades', 'lindora', 'guachipelin', 'multiplaza', 'barrio escalante', 'hatillo', 'purral', 'puriscal', 'perez zeledon', 'san isidro de el general', 'ciudad colon', 'turrubares', 'dota', 'tarrazu', 'leon cortes', 'acosta'],
};

// Lugares que solo existen (o casi solo) en Costa Rica: sirven para reconocer un puesto aunque no diga "Costa Rica".
const CR_ONLY = /(alajuela|heredia|escazu|coyol|la aurora|guanacaste|puntarenas|curridabat|pavas|tibas|moravia|goicoechea|la uruca|alajuelita|desamparados|tres rios|turrialba|guapiles|liberia|tamarindo|jaco|quepos|ultrapark|ultra park|la garita|belen|san ramon|grecia|zona franca|cartago|perez zeledon|sabana norte|lindora)/;

const FOREIGN_SAN_JOSE = /(california|\bca\b|usa|\bus\b|united states|philippines|mexico|silicon|bay area|santa clara|\bnj\b|illinois|texas|\bin\b ?\d)/;
const FOREIGN_CONTEXT = /(colombia|spain|espana|argentina|chile|mexico|peru|ecuador|panama|guatemala|nicaragua|honduras|el salvador|greece|grecia, greece|brazil|united states|usa|canada|puerto rico|dominican|uruguay|bolivia|paraguay|venezuela|venezuela|filipinas|philippines|india|poland)/;

export function isCostaRica(text = '') {
  const t = fold(text);
  if (!t) return false;
  if (/costa ?rica|\bcri\b|\bcr\b|\(cr\)|\bc\.r\.?\b/.test(t)) return true;
  if (FOREIGN_CONTEXT.test(t)) return false;
  if (/san jose/.test(t) && !FOREIGN_SAN_JOSE.test(t)) return true;
  return CR_ONLY.test(t);
}

export function detectProvince(...texts) {
  const t = ' ' + fold(texts.filter(Boolean).join(' | ')).replace(/[^a-z0-9|]+/g, ' ') + ' ';
  const order = ['heredia', 'alajuela', 'cartago', 'guanacaste', 'puntarenas', 'limon', 'san-jose'];
  let best = null;
  for (const prov of order) {
    for (const place of PLACES[prov]) {
      const idx = t.indexOf(` ${place} `);
      if (idx === -1) continue;
      // Gana el lugar que aparece primero en el texto; desempata el más específico (más largo).
      if (!best || idx < best.idx || (idx === best.idx && place.length > best.len)) best = { prov, idx, len: place.length };
    }
  }
  return best?.prov ?? null;
}

export function detectModality(...texts) {
  const t = fold(texts.filter(Boolean).join(' | '));
  if (/h[ií]brid|hybrid|semi.?presencial/.test(t)) return 'hibrido';
  if (/\bremot[eo]\b|teletrabajo|home ?office|work from home|trabajo desde casa|desde casa|\bwfh\b|100% virtual|\bvirtual\b/.test(t)) return 'remoto';
  if (/on.?site|presencial|in.?person|en sitio/.test(t)) return 'presencial';
  return null;
}
