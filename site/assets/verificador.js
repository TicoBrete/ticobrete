// Verificador de ofertas sospechosas: pantalla. No se guarda ni se envía nada.
import { evaluar } from './verificador-core.js';

const form = document.getElementById('ver-form');
const out = document.getElementById('ver-resultado');

function pintar() {
  const ids = [...form.querySelectorAll('input[type="checkbox"]:checked')].map((c) => c.value);
  const r = evaluar(ids);
  out.className = `ver-resultado ver-${r.clase}`;
  out.replaceChildren();
  const h = document.createElement('h2');
  h.textContent = r.titulo;
  const p = document.createElement('p');
  p.textContent = r.texto;
  out.append(h, p);
  if (r.marcadas.length) {
    const ul = document.createElement('ul');
    for (const s of r.marcadas) {
      const li = document.createElement('li');
      li.textContent = s.texto;
      ul.append(li);
    }
    out.append(ul);
  }
}

if (form && out) {
  pintar();
  form.addEventListener('change', pintar);
  form.addEventListener('submit', (e) => e.preventDefault());
  form.addEventListener('reset', () => setTimeout(pintar, 0));
}
