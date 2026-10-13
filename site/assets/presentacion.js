// Generador de carta de presentación: pantalla. No se guarda ni se envía nada.
import { construirPresentacion, docx, nombreArchivoPresentacion, textoPresentacion } from './presentacion-core.js';

const form = document.getElementById('pres-form');
const papel = document.getElementById('pres-preview');
const aviso = document.getElementById('pres-aviso');

const leer = () => Object.fromEntries([...form.querySelectorAll('[data-k]')].map((el) => [el.dataset.k, el.value]));

function pintar() {
  papel.replaceChildren();
  let ul = null;
  for (const x of construirPresentacion(leer())) {
    if (x.k === 'bullet') {
      if (!ul) { ul = document.createElement('ul'); papel.append(ul); }
      const li = document.createElement('li');
      li.textContent = x.t;
      ul.append(li);
    } else {
      ul = null;
      const p = document.createElement('p');
      p.textContent = x.t;
      papel.append(p);
    }
  }
}

const mensaje = (txt) => { aviso.textContent = txt; aviso.hidden = false; };
const iso = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;

if (form && papel) {
  form.querySelector('[data-k="fecha"]').value = iso(new Date());
  pintar();
  form.addEventListener('input', pintar);
  form.addEventListener('change', pintar);
  form.addEventListener('submit', (e) => e.preventDefault());

  document.getElementById('pres-word').addEventListener('click', () => {
    const d = leer();
    const url = URL.createObjectURL(new Blob([docx(construirPresentacion(d))], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${nombreArchivoPresentacion(d)}.docx`;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    mensaje('Listo: se descargó tu carta en Word. Revisala, quitá lo que no aplique y mandala junto con tu currículum.');
  });

  document.getElementById('pres-copiar').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(textoPresentacion(construirPresentacion(leer())));
      mensaje('Texto copiado. Pegalo en el correo o en el formulario de la oferta.');
    } catch {
      mensaje('No pudimos copiar automáticamente. Seleccioná el texto de la vista previa y copialo.');
    }
  });

  document.getElementById('pres-borrar').addEventListener('click', () => {
    form.reset();
    form.querySelector('[data-k="fecha"]').value = iso(new Date());
    pintar();
    aviso.hidden = true;
  });
}
