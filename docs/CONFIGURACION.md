# TicoBrete ­ƒç¿­ƒçÀ

La bolsa de empleo autom├ítica de Costa Rica. Sin servidores, sin base de datos, sin mantenimiento y gratis.

Un robot (GitHub Actions) corre **cada 3 horas**, junta los empleos de varias fuentes p├║blicas, quita repetidos, vencidos y estafas, y vuelve a publicar el sitio solo.

## C├│mo funciona

```
 cada 3 horas ÔöÇÔû║ scripts/build.mjs
                   Ôö£ÔöÇ lee los datos anteriores del propio sitio publicado
                   Ôö£ÔöÇ consulta las fuentes (config/sources.json)
                   Ôö£ÔöÇ limpia: sin HTML, sin estafas, sin duplicados, sin vencidos
                   ÔööÔöÇ genera dist/ (sitio + data/jobs.json + RSS + sitemap + p├íginas por provincia)
                 ÔöÇÔû║ GitHub Pages publica dist/
```

- **Sin base de datos:** el estado vive en `data/jobs.json`, que el robot lee del sitio ya publicado.
- **Si una fuente se cae**, se conservan sus puestos anteriores y las dem├ís siguen. Si TODO se cae, no se publica nada nuevo y el sitio sigue como estaba.
- **Si una fuente devuelve vac├¡o por error** o los puestos caen m├ís de 70%, se cancela esa publicaci├│n.

## Fuentes incluidas

| Tipo | Fuentes | C├│mo se leen |
|---|---|---|
| Empresas directas | Medtronic, Abbott, Stryker, Intel, Philips, Baxter, P&G, Unisys, Johnson Controls, Pfizer, Equifax, Kyndryl, HP, Kimberly-Clark, 3M, Citi, Unilever, Amgen, Mastercard, MSD, Analog Devices (Workday), Elastic y Encora (Greenhouse), 3Pillar (Lever) | APIs JSON p├║blicas de sus p├íginas de empleo |
| Estado | ANE, la Agencia Nacional de Empleo del MTSS (ane.cr) | Páginas públicas de resultados, una a la vez y con pausa; el enlace lleva a la búsqueda del ANE ya filtrada |
| Comunidades | Telegram @STEMJobsCR, @empleos506cr, @STEMJobsLATAM | Vista p├║blica `t.me/s/canal` |
| Trabajo remoto para ticos | Jobicy, Remotive, Himalayas, Remote OK, We Work Remotely | APIs/RSS p├║blicos, solo puestos abiertos a Costa Rica o Latinoam├®rica |
| Buscador (opcional) | Jooble | API gratuita con llave (ver abajo) |

Siempre se enlaza a la oferta original y se muestra de d├│nde viene. No se copian descripciones completas.

### Lo que NO se hace (a prop├│sito)
- **No se lee Facebook, Instagram, WhatsApp, LinkedIn, Indeed ni Computrabajo directamente.** Sus t├®rminos lo proh├¡ben y bloquean a los robots. Hacerlo pondr├¡a el proyecto en riesgo legal y se romper├¡a a cada rato. Parte de ese contenido llega de forma leg├¡tima porque los canales de Telegram lo recopilan y enlazan.
- Para sumar m├ís bolsas locales de forma legal use **Jooble** (abajo) o pida permiso a la bolsa para leer su feed.

## Publicarlo (una sola vez, unos 10 minutos)

1. Cree una cuenta gratis en <https://github.com> y un repositorio **p├║blico** llamado `ticobrete`.
2. Suba esta carpeta (desde ella):
   ```
   git remote add origin https://github.com/SU_USUARIO/ticobrete.git
   git branch -M main
   git push -u origin main
   ```
3. En GitHub: **Settings ÔåÆ Pages ÔåÆ Build and deployment ÔåÆ Source: GitHub Actions**.
4. En la pesta├▒a **Actions**, abra "Actualizar TicoBrete" y pulse **Run workflow**.
5. En 2-3 minutos el sitio queda en `https://SU_USUARIO.github.io/ticobrete/`. Desde ah├¡ se actualiza solo.

### Dominio propio (opcional, ~Ôéí8 000 al a├▒o)
Compre `ticobrete.com` o `ticobrete.cr`, config├║relo en **Settings ÔåÆ Pages ÔåÆ Custom domain** y cree la variable de repositorio **Settings ÔåÆ Secrets and variables ÔåÆ Actions ÔåÆ Variables ÔåÆ `SITE_URL`** con `https://ticobrete.com` (sin `/` al final).

### Activar Jooble (opcional, m├ís empleos locales)
1. Pida una llave gratis en <https://jooble.org/api/about>.
2. **Settings ÔåÆ Secrets and variables ÔåÆ Actions ÔåÆ Secrets ÔåÆ New secret**: nombre `JOOBLE_API_KEY`.
3. Listo: en la pr├│xima corrida aparecen los resultados de Jooble. La llave nunca llega al sitio p├║blico.

## Que los negocios publiquen sus bretes (gratis, sin cuenta)

Los negocios llenan un **Google Form**; sus respuestas llegan a una hoja de Google y el robot las lee en cada corrida. Salen en el sitio con el mismo formato que los dem├ís (categor├¡a, provincia y modalidad se detectan solos), con la etiqueta "Publicados por negocios" y un enlace "Reportar". Pasan por los mismos filtros anti-estafa.

**Configurarlo (una vez, ~10 minutos):**
1. Cree un Google Form con estas preguntas (el orden da igual; lo que cuenta es que el t├¡tulo **contenga** estas palabras):

   | Pregunta | Tipo | Obligatoria |
   |---|---|---|
   | Puesto | Respuesta corta | S├¡ |
   | Empresa | Respuesta corta | S├¡ |
   | Provincia | Lista desplegable (las 7 provincias) | S├¡ |
   | Lugar (cant├│n o distrito) | Respuesta corta | No |
   | Modalidad | Lista: Presencial / H├¡brido / Remoto | S├¡ |
   | Salario | Respuesta corta | No |
   | Descripci├│n | P├írrafo (m├íx. 500 caracteres) | No |
   | C├│mo aplicar (enlace o WhatsApp) | Respuesta corta | S├¡ |

   Ponga un texto de ayuda: "No se permiten cobros a quien aplica ni ofertas de inversi├│n o dinero f├ícil".
2. En el Form: **Respuestas ÔåÆ Vincular con Hojas de c├ílculo**.
3. En la hoja: **Archivo ÔåÆ Compartir ÔåÆ Publicar en la web**, elija la pesta├▒a de respuestas, formato **Valores separados por comas (.csv)** y copie el enlace.
4. En GitHub: **Settings ÔåÆ Secrets and variables ÔåÆ Actions ÔåÆ Secrets ÔåÆ `SUBMISSIONS_CSV_URL`** = ese enlace.
5. En GitHub: **Variables ÔåÆ `SUBMIT_URL`** = el enlace p├║blico del formulario (bot├│n "Enviar" del Form).

Con eso aparecen los botones "Publicar un brete" en el sitio. Sin `SUBMIT_URL` los botones quedan ocultos.

**Control (opcional, 5 segundos por brete):** en la hoja agregue las columnas `Bloqueado` (escriba "s├¡" para quitar un brete) y `Aprobado`. Si quiere que **solo salga lo que usted apruebe**, ponga `"requireApproval": true` en `submissions` de `config/sources.json`.

Protecciones autom├íticas: solo se aceptan enlaces web o n├║meros de WhatsApp de Costa Rica (se convierten en un enlace `wa.me`), se rechazan acortadores (bit.ly, etc.) y direcciones IP, un negocio puede tener m├íximo 8 bretes, y todo vence a los 45 d├¡as.

## Reportes y sugerencias (formulario)
Cada brete tiene un enlace **Reportar** y el pie del sitio tiene **Reportar o sugerir una fuente**. Ambos abren un Google Form (sin cuenta de GitHub).
1. Cree el formulario con 3 preguntas: "¿Qué querés hacer?" (opción múltiple), "Enlace o nombre del brete o de la fuente" (respuesta corta) y "Contanos más" (párrafo).
2. Publíquelo y obtenga los identificadores de campo (`entry.NNN`).
3. En GitHub cree la variable **`REPORT_URL`** con este formato (el sitio le agrega al final el enlace del brete):
   ```
   https://docs.google.com/forms/d/e/ID_DEL_FORMULARIO/viewform?usp=pp_url&entry.ID_OPCION=Reportar+un+brete&entry.ID_ENLACE=
   ```
4. Las respuestas llegan a la hoja de respuestas del formulario. Si la variable no existe, los enlaces quedan ocultos.
## Agregar o quitar fuentes
Todo est├í en `config/sources.json`.
- **Otra multinacional en Workday:** copie un bloque de `workday`. Los datos salen de la URL `https://EMPRESA.wdX.myworkdayjobs.com/SITIO`.
- **Greenhouse / Lever:** `token` o `slug` de la empresa en su URL de empleos.
- **Otro canal p├║blico de Telegram:** agregue su nombre (formato `estructurado` o `busca`).

Cada fuente falla por separado: nada se rompe si una cambia.

## Seguridad
- Sitio 100% est├ítico: no hay servidor ni base de datos que atacar, no hay cuentas ni contrase├▒as.
- El texto de terceros se limpia al recopilar (sin HTML, sin caracteres invisibles) y en el navegador se inserta solo como texto.
- Pol├¡tica de seguridad de contenido (CSP) estricta: solo scripts, estilos y fuentes propios.
- Enlaces externos con `noopener noreferrer nofollow ugc`; solo `http(s)`.
- Correos y tel├®fonos se quitan de los extractos; la persona los ve en el anuncio original.
- Filtro anti-estafas (pir├ímides, "gan├í $500 diarios", pagos para trabajar, etc.).
- Las llaves van en GitHub Secrets, no en el c├│digo.
- Sin cookies ni rastreadores; las preferencias (tema, guardados) viven solo en su navegador.

## Mantenimiento
Ninguno, con una excepci├│n de la que ya se ocupa el proyecto: GitHub pausa los programadores de repos inactivos 60 d├¡as, as├¡ que el robot hace un commit de latido cada ~45 d├¡as.

Lo ├║nico que puede pasar con el tiempo es que una empresa cambie su sistema de empleo; esa fuente deja de aportar y el resto sigue. La secci├│n "De d├│nde salen los bretes" del sitio muestra el estado de cada una.

## Desarrollo local
```
node scripts/build.mjs    # recopila y genera dist/
node scripts/serve.mjs    # http://localhost:4173
node --test test/*.test.mjs
```
Requiere Node 20+. No hay dependencias que instalar. Con `?still&theme=dark` en la URL se desactivan animaciones y se fuerza el tema (├║til para capturas).

## Cr├®ditos
Tipograf├¡as [Inter](https://rsms.me/inter/) y [Bricolage Grotesque](https://github.com/ateliertriay/bricolage) (licencia OFL, incluidas en `site/assets/fonts/`).
Los empleos pertenecen a sus empresas y a las fuentes citadas. Remotive, Jobicy, Remote OK y otros piden enlazar a su sitio: se hace en cada oferta.

## SEO (cómo está armado)
- **El HTML ya trae los bretes**: cada página escribe en el HTML los 30 más recientes y un texto propio con datos reales (cantidad, categorías, empresas, fecha). JavaScript después los reemplaza por la versión interactiva.
- **Páginas generadas en cada corrida**: portada, 7 provincias, remoto, categorías (con 3+ bretes) y categoría × provincia (con 5+ bretes, `MIN_COMBO` en `scripts/build.mjs`). Así no se crean páginas vacías.
- **Guías**: el contenido está en `content/guias.mjs`. Para agregar una, se suma un objeto a la lista y se publica. Mantenga fechas reales.
- **Datos estructurados**: Organization, WebSite, CollectionPage/WebPage y BreadcrumbList en las páginas de empleo; Article en las guías. No se usa `JobPosting` porque Google lo exige solo en la página completa de cada puesto, y aquí los bretes se publican en el sitio original.
- **Verificación de buscadores**: `config/site.json` (`googleVerification`, `bingVerification`) más el archivo `site/google*.html`. No los borre o se pierde la verificación.
- **Revisión automática**: `node test/seo.check.mjs` (después de `node scripts/build.mjs`) revisa títulos, descripciones, H1, JSON-LD, enlaces rotos y el mapa del sitio.