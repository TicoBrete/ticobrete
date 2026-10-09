// Buscador de guías: filtra las tarjetas mientras escribís. No envía nada a ningún servidor.
const caja = document.getElementById('guias-buscar');
const contenido = document.getElementById('guias-contenido');
const vacio = document.getElementById('guias-vacio');
const contador = document.getElementById('guias-contador');

if (caja && contenido) {
  const fold = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const items = [...contenido.querySelectorAll('li[data-busqueda]')];
  const grupos = [...contenido.querySelectorAll('[data-grupo]')];

  const filtrar = () => {
    const palabras = fold(caja.value).split(/\s+/).filter(Boolean);
    let visibles = 0;
    const vistos = new Set();
    for (const li of items) {
      const ok = palabras.every((p) => li.dataset.busqueda.includes(p));
      li.hidden = !ok;
      if (ok) {
        const href = li.querySelector('a')?.getAttribute('href');
        if (!vistos.has(href)) { vistos.add(href); visibles++; }
      }
    }
    for (const g of grupos) g.hidden = !g.querySelector('li:not([hidden])');
    vacio.hidden = visibles > 0 || palabras.length === 0;
    contador.hidden = palabras.length === 0 || visibles === 0;
    contador.textContent = `${visibles} ${visibles === 1 ? 'guía encontrada' : 'guías encontradas'}`;
  };

  caja.addEventListener('input', filtrar);
  const q = new URLSearchParams(location.search).get('q');
  if (q) { caja.value = q.slice(0, 60); filtrar(); }
}
