# Portfolio · Thiago Da Graca

Landing page one-page hecha solo con **HTML, CSS y JavaScript** (sin frameworks ni dependencias).
Se abre con doble click en `index.html`; no necesita instalar nada.

## Estructura

```
portfolio-thiago/
├─ index.html                  Esqueleto semántico + sprite de íconos + SEO
└─ assets/
   ├─ docs/                    CV en PDF (el botón "Descargar CV" apunta acá)
   ├─ img/                     Imágenes (ej. tu foto)
   ├─ css/
   │  ├─ base/                 tokens (colores, tipografías) · reset · tipografía · layout · print
   │  ├─ components/           piezas reutilizables: botones, badges, cards, barras, formularios…
   │  └─ sections/             un archivo por sección: header, hero, about, skills, education…
   └─ js/
      ├─ core/                 helpers: namespace, DOM, formato de fechas/números, cálculos académicos
      ├─ data/                 ★ EL CONTENIDO: lo único que tenés que editar para actualizar el sitio
      ├─ components/           leen los datos y construyen el HTML de cada sección
      ├─ features/             comportamiento: tema claro/oscuro, navegación, animaciones, copiar
      └─ main.js               punto de entrada
```

**Idea central:** los *datos* están separados de la *presentación*. Para actualizar contenido tocás
`assets/js/data/*.js`; el HTML y el CSS no cambian.

## Cómo actualizar el contenido

| Quiero…                                | Edito                              |
|----------------------------------------|------------------------------------|
| Cambiar mi texto "Sobre mí" o mi foto  | `assets/js/data/profile.js`        |
| Sumar una materia aprobada             | `assets/js/data/education.js` → `subjects` |
| Agregar un proyecto o su link de GitHub| `assets/js/data/projects.js`       |
| Agregar un trabajo                     | `assets/js/data/experience.js`     |
| Cambiar habilidades                    | `assets/js/data/skills.js`         |
| Cambiar email, teléfono o redes        | `assets/js/data/contact.js`        |
| Cambiar colores o tipografías          | `assets/css/base/tokens.css`       |
| Reemplazar el CV                       | pisar `assets/docs/Thiago_DaGraca_CV_ES.pdf` (mismo nombre) |

Al sumar una materia, **el promedio, las estadísticas, el anillo y el gráfico de notas se recalculan solos**.

### Agregar tu foto
1. Guardá la foto en `assets/img/` (por ejemplo `thiago.jpg`, cuadrada, ~400 px).
2. En `assets/js/data/profile.js` poné `photo: 'assets/img/thiago.jpg'`.

### Agregar el link a un repositorio
En `assets/js/data/projects.js`, dentro del proyecto:
```js
links: [{ label: 'Ver repositorio', href: 'https://github.com/dagracathiago-hash/mi-repo' }]
```

### Datos que viven en más de un lugar
El email aparece en `contact.js`, en el bloque `<noscript>` de `index.html` y en el JSON-LD (SEO) de `index.html`.
Si lo cambiás, actualizá los tres.

## Agregar una sección nueva
1. Datos → `assets/js/data/<nombre>.js`
2. Componente → `assets/js/components/<nombre>.js` (exponer `{ init }`, copiar uno existente como guía)
3. Estilos → `assets/css/sections/<nombre>.css`
4. Registrar: sumar los `<link>`/`<script>` en `index.html` y el nombre en la lista `COMPONENTS` de `main.js`.

## Decisiones técnicas
- **Scripts clásicos, no módulos ES:** los módulos no funcionan abriendo el archivo con `file://`. Con el patrón de namespace (`window.Portfolio`) el sitio anda con doble click y también en cualquier hosting.
- **DOM seguro:** el contenido se crea con `createElement`/`textContent`, nunca con `innerHTML`.
- **Accesibilidad:** HTML semántico, skip-link, foco visible, `aria-current` en la navegación, `prefers-reduced-motion` respetado, contraste AA en ambos temas.
- **Tema claro/oscuro:** respeta la preferencia del sistema y recuerda la elección.
- **Sin JavaScript:** el contenido estático se ve y hay un aviso con el link al CV.
- **Impresión:** `print.css` genera una versión limpia al imprimir o guardar como PDF.

## Publicarlo gratis
Es un sitio estático: sirve **GitHub Pages**, **Netlify** o **Vercel**. En GitHub Pages: subí la carpeta a un repo,
*Settings → Pages → Deploy from a branch → main / root*. Una vez publicado, agregá la URL en tu LinkedIn y en tu CV.
