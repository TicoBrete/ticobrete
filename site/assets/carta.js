// Generador de carta de renuncia: pantalla. No se guarda ni se envía nada (la carta lleva la cédula).
import { construirCarta, docx, nombreArchivoCarta, textoPlano } from './carta-core.js';

const form = document.getElementById('carta-form');
const papel = document.getElementById('carta-preview');
const aviso = document.getElementById('carta-aviso');

function leer() {
  const d = {};
  for (const el of form.querySelectorAll('[data-k]')) d[el.dataset.k] = el.type === 'checkbox' ? el.checked : el.value;
  return d;
}

function pintar() {
  papel.replaceChildren();
  for (const x of construirCarta(leer())) {
    const p = document.createElement('p');
    p.textContent = x.t;
    papel.append(p);
  }
}

function mensaje(txt) {
  aviso.textContent = txt;
  aviso.hidden = false;
}

if (form && papel) {
  const hoy = new Date();
  const iso = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  form.querySelector('[data-k="fecha"]').value = iso(hoy);
  pintar();
  form.addEventListener('input', pintar);
  form.addEventListener('change', pintar);
  form.addEventListener('submit', (e) => e.preventDefault());

  document.getElementById('carta-word').addEventListener('click', () => {
    const d = leer();
    const bytes = docx(construirCarta(d));
    const url = URL.createObjectURL(new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${nombreArchivoCarta(d)}.docx`;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    mensaje('Listo: se descargó tu carta en Word. Imprimila en dos copias y pedí que firmen la tuya como recibida.');
  });

  document.getElementById('carta-copiar').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(textoPlano(construirCarta(leer())));
      mensaje('Texto copiado. Pegalo en un correo o en un documento.');
    } catch {
      mensaje('No pudimos copiar automáticamente. Seleccioná el texto de la vista previa y copialo.');
    }
  });

  document.getElementById('carta-borrar').addEventListener('click', () => {
    form.reset();
    form.querySelector('[data-k="fecha"]').value = iso(new Date());
    pintar();
    aviso.hidden = true;
  });
}
