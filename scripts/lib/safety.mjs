import { fold } from './util.mjs';

// Señales claras de estafa o de "trabajos" que no son trabajos. Preferimos bloquear de más que dejar pasar una estafa.
const SCAM = [
  /piramide|multinivel|\bmlm\b|network marketing|marketing de red/,
  /forex|criptomoned|bitcoin|binance|trading (de|en|online)|inversion (garantizada|segura)|duplica(r)? tu (dinero|inversion)|rendimientos? garantizados?/,
  /(gan[ae]|ganar|ganancias?|ingres[oa]s?) (hasta )?(\$|us\$|usd|₡|colones|dolares)? ?\d[\d.,]* ?(\$|usd|dolares|diarios|al dia|por dia|semanal)/,
  /ingresos? (extra|ilimitados|pasivos)|dinero (facil|rapido)|gana(r)? (dinero|plata) (facil|rapido|desde (tu )?(casa|celular))/,
  /(dar|dando) (likes?|me gusta)|ver videos? (y )?(gana|pagad)|resenas? (pagadas|remuneradas)|trabaja desde tu celular/,
  /(pag[ao]|deposit[ao]|inscripcion|cuota|membresia|kit|capacitacion|curso|uniforme) (de|por)? ?[\$₡]?\s?\d* ?(es )?(obligatori[oa]|previo|antes|para (empezar|iniciar|comenzar|trabajar|aplicar|ingresar))/,
  /(envia|enviar|transferir|depositar) (dinero|plata|\$|dolares)/,
  /sin (entrevista|experiencia) (y )?(gana|ingres|pago garantizado)|contratacion inmediata sin|garantizado 100/,
  /western union para (recibir|pagar)|gift ?cards?|tarjetas de regalo|cheque (falso|de gerencia) para/,
];

export function looksLikeScam(...texts) {
  const t = fold(texts.filter(Boolean).join(' | '));
  return SCAM.some((re) => re.test(t));
}

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PHONE = /(?:\+?506[\s-]?)?\b\d{4}[\s-]?\d{4}\b/g;

// Quitamos correos y teléfonos de los textos: la persona los ve en el anuncio original.
export function stripContacts(s = '') {
  return String(s).replace(EMAIL, '').replace(PHONE, '').replace(/\s{2,}/g, ' ').trim();
}
