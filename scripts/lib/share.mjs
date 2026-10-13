// Bloque para compartir una página (WhatsApp funciona sin JavaScript; el botón de copiar lo activa share.js).
export function shareHtml(titulo, url) {
  const texto = encodeURIComponent(`${titulo} ${url}`);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  return `<aside class="share" aria-label="Compartir esta página"><p class="share-title">¿Te sirvió? Compartila con alguien que la necesite.</p><div class="share-btns"><a class="btn btn-primary share-wa" href="https://wa.me/?text=${esc(texto)}" target="_blank" rel="noopener">Compartir por WhatsApp</a><button type="button" class="btn btn-ghost" data-copiar hidden>Copiar enlace</button><span class="share-ok" role="status" data-copiado hidden>Enlace copiado</span></div></aside>`;
}