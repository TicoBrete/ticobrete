// Botón "Copiar enlace". No envía nada a ningún servidor.
const boton = document.querySelector('[data-copiar]');
const aviso = document.querySelector('[data-copiado]');
if (boton && navigator.clipboard) {
  boton.hidden = false;
  boton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href.split('#')[0]);
      aviso.hidden = false;
      setTimeout(() => { aviso.hidden = true; }, 2500);
    } catch { /* sin permiso para copiar */ }
  });
}