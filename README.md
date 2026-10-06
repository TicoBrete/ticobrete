# TicoBrete 🇨🇷

La bolsa de empleo automática de Costa Rica. Sin servidores, sin base de datos, sin mantenimiento y gratis.

Un robot (GitHub Actions) corre **cada 3 horas**, junta los empleos de varias fuentes públicas, quita repetidos, vencidos y estafas, y vuelve a publicar el sitio solo.

## Cómo funciona

```
 cada 3 horas ─► scripts/build.mjs
                   ├─ lee los datos anteriores del propio sitio publicado
                   ├─ consulta las fuentes (config/sources.json)
                   ├─ limpia: sin HTML, sin estafas, sin duplicados, sin vencidos
                   └─ genera dist/ (sitio + data/jobs.json + RSS + sitemap + páginas por provincia)
                 ─► GitHub Pages publica dist/
```

- **Sin base de datos:** el estado vive en `data/jobs.json`, que el robot lee del sitio ya publicado.
- **Si una fuente se cae**, se conservan sus puestos anteriores y las demás siguen. Si TODO se cae, no se publica nada nuevo y el sitio sigue como estaba.
- **Si una fuente devuelve vacío por error** o los puestos caen más de 70%, se cancela esa publicación.

## Fuentes incluidas

| Tipo | Fuentes | Cómo se leen |
|---|---|---|
| Empresas directas | Medtronic, Abbott, Stryker, Intel, Philips, Baxter, P&G, Unisys, Johnson Controls, Pfizer, Equifax, Kyndryl, HP, Kimberly-Clark, 3M, Citi, Unilever, Amgen, Mastercard, MSD, Analog Devices (Workday), Elastic y Encora (Greenhouse), 3Pillar (Lever) | APIs JSON públicas de sus páginas de empleo |
| Comunidades | Telegram @STEMJobsCR, @empleos506cr, @STEMJobsLATAM | Vista pública `t.me/s/canal` |
| Trabajo remoto para ticos | Jobicy, Remotive, Himalayas, Remote OK, We Work Remotely | APIs/RSS públicos, solo puestos abiertos a Costa Rica o Latinoamérica |
| Buscador (opcional) | Jooble | API gratuita con llave (ver abajo) |

Siempre se enlaza a la oferta original y se muestra de dónde viene. No se copian descripciones completas.

### Lo que NO se hace (a propósito)
- **No se lee Facebook, Instagram, WhatsApp, LinkedIn, Indeed ni Computrabajo directamente.** Sus términos lo prohíben y bloquean a los robots. Hacerlo pondría el proyecto en riesgo legal y se rompería a cada rato. Parte de ese contenido llega de forma legítima porque los canales de Telegram lo recopilan y enlazan.
- Para sumar más bolsas locales de forma legal use **Jooble** (abajo) o pida permiso a la bolsa para leer su feed.

## Publicarlo (una sola vez, unos 10 minutos)

1. Cree una cuenta gratis en <https://github.com> y un repositorio **público** llamado `ticobrete`.
2. Suba esta carpeta (desde ella):
   ```
   git remote add origin https://github.com/SU_USUARIO/ticobrete.git
   git branch -M main
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. En la pestaña **Actions**, abra "Actualizar TicoBrete" y pulse **Run workflow**.
5. En 2-3 minutos el sitio queda en `https://SU_USUARIO.github.io/ticobrete/`. Desde ahí se actualiza solo.

### Dominio propio (opcional, ~₡8 000 al año)
Compre `ticobrete.com` o `ticobrete.cr`, configúrelo en **Settings → Pages → Custom domain** y cree la variable de repositorio **Settings → Secrets and variables → Actions → Variables → `SITE_URL`** con `https://ticobrete.com` (sin `/` al final).

### Activar Jooble (opcional, más empleos locales)
1. Pida una llave gratis en <https://jooble.org/api/about>.
2. **Settings → Secrets and variables → Actions → Secrets → New secret**: nombre `JOOBLE_API_KEY`.
3. Listo: en la próxima corrida aparecen los resultados de Jooble. La llave nunca llega al sitio público.

## Que los negocios publiquen sus bretes (gratis, sin cuenta)

Los negocios llenan un **Google Form**; sus respuestas llegan a una hoja de Google y el robot las lee en cada corrida. Salen en el sitio con el mismo formato que los demás (categoría, provincia y modalidad se detectan solos), con la etiqueta "Publicados por negocios" y un enlace "Reportar". Pasan por los mismos filtros anti-estafa.

**Configurarlo (una vez, ~10 minutos):**
1. Cree un Google Form con estas preguntas (el orden da igual; lo que cuenta es que el título **contenga** estas palabras):

   | Pregunta | Tipo | Obligatoria |
   |---|---|---|
   | Puesto | Respuesta corta | Sí |
   | Empresa | Respuesta corta | Sí |
   | Provincia | Lista desplegable (las 7 provincias) | Sí |
   | Lugar (cantón o distrito) | Respuesta corta | No |
   | Modalidad | Lista: Presencial / Híbrido / Remoto | Sí |
   | Salario | Respuesta corta | No |
   | Descripción | Párrafo (máx. 500 caracteres) | No |
   | Cómo aplicar (enlace o WhatsApp) | Respuesta corta | Sí |

   Ponga un texto de ayuda: "No se permiten cobros a quien aplica ni ofertas de inversión o dinero fácil".
2. En el Form: **Respuestas → Vincular con Hojas de cálculo**.
3. En la hoja: **Archivo → Compartir → Publicar en la web**, elija la pestaña de respuestas, formato **Valores separados por comas (.csv)** y copie el enlace.
4. En GitHub: **Settings → Secrets and variables → Actions → Secrets → `SUBMISSIONS_CSV_URL`** = ese enlace.
5. En GitHub: **Variables → `SUBMIT_URL`** = el enlace público del formulario (botón "Enviar" del Form).

Con eso aparecen los botones "Publicar un brete" en el sitio. Sin `SUBMIT_URL` los botones quedan ocultos.

**Control (opcional, 5 segundos por brete):** en la hoja agregue las columnas `Bloqueado` (escriba "sí" para quitar un brete) y `Aprobado`. Si quiere que **solo salga lo que usted apruebe**, ponga `"requireApproval": true` en `submissions` de `config/sources.json`.

Protecciones automáticas: solo se aceptan enlaces web o números de WhatsApp de Costa Rica (se convierten en un enlace `wa.me`), se rechazan acortadores (bit.ly, etc.) y direcciones IP, un negocio puede tener máximo 8 bretes, y todo vence a los 45 días.

## Agregar o quitar fuentes
Todo está en `config/sources.json`.
- **Otra multinacional en Workday:** copie un bloque de `workday`. Los datos salen de la URL `https://EMPRESA.wdX.myworkdayjobs.com/SITIO`.
- **Greenhouse / Lever:** `token` o `slug` de la empresa en su URL de empleos.
- **Otro canal público de Telegram:** agregue su nombre (formato `estructurado` o `busca`).

Cada fuente falla por separado: nada se rompe si una cambia.

## Seguridad
- Sitio 100% estático: no hay servidor ni base de datos que atacar, no hay cuentas ni contraseñas.
- El texto de terceros se limpia al recopilar (sin HTML, sin caracteres invisibles) y en el navegador se inserta solo como texto.
- Política de seguridad de contenido (CSP) estricta: solo scripts, estilos y fuentes propios.
- Enlaces externos con `noopener noreferrer nofollow ugc`; solo `http(s)`.
- Correos y teléfonos se quitan de los extractos; la persona los ve en el anuncio original.
- Filtro anti-estafas (pirámides, "ganá $500 diarios", pagos para trabajar, etc.).
- Las llaves van en GitHub Secrets, no en el código.
- Sin cookies ni rastreadores; las preferencias (tema, guardados) viven solo en su navegador.

## Mantenimiento
Ninguno, con una excepción de la que ya se ocupa el proyecto: GitHub pausa los programadores de repos inactivos 60 días, así que el robot hace un commit de latido cada ~45 días.

Lo único que puede pasar con el tiempo es que una empresa cambie su sistema de empleo; esa fuente deja de aportar y el resto sigue. La sección "De dónde salen los bretes" del sitio muestra el estado de cada una.

## Desarrollo local
```
node scripts/build.mjs    # recopila y genera dist/
node scripts/serve.mjs    # http://localhost:4173
node --test test/*.test.mjs
```
Requiere Node 20+. No hay dependencias que instalar. Con `?still&theme=dark` en la URL se desactivan animaciones y se fuerza el tema (útil para capturas).

## Créditos
Tipografías [Inter](https://rsms.me/inter/) y [Bricolage Grotesque](https://github.com/ateliertriay/bricolage) (licencia OFL, incluidas en `site/assets/fonts/`).
Los empleos pertenecen a sus empresas y a las fuentes citadas. Remotive, Jobicy, Remote OK y otros piden enlazar a su sitio: se hace en cada oferta.
