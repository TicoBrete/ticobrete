// Verificador de ofertas sospechosas: lógica pura. Todo corre en el navegador; no se envía ningún dato.
// grave: true = señal que por sí sola ya es motivo para no seguir.
export const SENALES = [
  { id: 'dinero', grave: true, texto: 'Te piden dinero (por uniforme, curso, capacitación, equipo, trámite, visa o "reservar" el puesto)' },
  { id: 'datos', grave: true, texto: 'Te piden fotos de tu cédula, datos de tu cuenta bancaria, claves o códigos antes de firmar un contrato' },
  { id: 'reenviar', grave: true, texto: 'Te piden recibir dinero en tu cuenta y reenviarlo, o manejar criptomonedas de otras personas' },
  { id: 'tareas', grave: true, texto: 'El "trabajo" consiste en dar likes, reseñas o hacer tareas simples pagadas por tarea, o te piden "invertir" para ganar más' },
  { id: 'exterior', grave: true, texto: 'Te ofrecen trabajo en el exterior y te cobran pasaje, visa o gestiones' },
  { id: 'whatsapp', puntos: 2, texto: 'Todo el contacto es por WhatsApp o Telegram, sin llamada ni correo de la empresa' },
  { id: 'salario', puntos: 2, texto: 'Pagan mucho más de lo normal para el puesto, sin pedir experiencia ni estudios' },
  { id: 'empresa', puntos: 2, texto: 'No encontrás sitio web, dirección ni información real de la empresa' },
  { id: 'entrevista', puntos: 2, texto: 'La "entrevista" fue solo por chat, o te dijeron que ya estás contratado sin conocerte' },
  { id: 'contrato', puntos: 2, texto: 'No te quieren dar contrato escrito ni decirte con claridad quién es el patrono y cuál es el salario' },
  { id: 'lugar', puntos: 2, texto: 'Te citan en un lugar raro (una casa, una esquina, un parqueo) en vez de la dirección de una empresa' },
  { id: 'correo', puntos: 1, texto: 'Te escriben desde un correo gratuito (gmail, hotmail) en vez del dominio de la empresa' },
  { id: 'urgencia', puntos: 1, texto: 'Te presionan para decidir ya, o dicen que "se acaban los cupos"' },
  { id: 'anuncio', puntos: 1, texto: 'El anuncio es genérico, con errores raros o idéntico a otros que viste con otro nombre de empresa' },
];

export const NIVELES = {
  ninguna: { clase: 'ok', titulo: 'No marcaste señales', texto: 'No ver señales no garantiza que la oferta sea real. Antes de dar datos personales, confirmá que la empresa exista y que el contacto sea quien dice ser.' },
  precaucion: { clase: 'aviso', titulo: 'Precaución', texto: 'Hay señales que conviene aclarar. No des datos ni dinero hasta verificar la empresa por una vía independiente, como su sitio oficial o su teléfono.' },
  medio: { clase: 'medio', titulo: 'Riesgo medio', texto: 'Varias señales juntas son típicas de ofertas falsas. Verificá la empresa por una vía propia y no avances si no podés comprobarla.' },
  alto: { clase: 'alto', titulo: 'Riesgo alto: no sigas', texto: 'Esto coincide con estafas laborales conocidas. No pagues, no envíes datos ni fotos de tu cédula y no hagas transferencias. Guardá las capturas y reportalo.' },
};

export function evaluar(ids = []) {
  const marcadas = SENALES.filter((s) => ids.includes(s.id));
  const graves = marcadas.filter((s) => s.grave);
  const puntos = marcadas.reduce((a, s) => a + (s.puntos || 0), 0);
  let nivel = 'ninguna';
  if (graves.length || puntos >= 6) nivel = 'alto';
  else if (puntos >= 3) nivel = 'medio';
  else if (puntos >= 1) nivel = 'precaucion';
  return { nivel, puntos, graves, marcadas, ...NIVELES[nivel] };
}
