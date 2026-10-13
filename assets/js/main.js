/**
 * PUNTO DE ENTRADA.
 *
 * Orden de arranque:
 *   1. Componentes → leen los datos y construyen el DOM de cada sección.
 *   2. Features    → agregan comportamiento sobre ese DOM ya construido.
 *
 * Cada módulo se inicializa en su propio try/catch: si uno falla, el resto del sitio sigue funcionando.
 *
 * Para agregar una sección nueva:
 *   - datos      → assets/js/data/<nombre>.js
 *   - componente → assets/js/components/<nombre>.js (exponer { init })
 *   - registrarlo en la lista COMPONENTS y cargar los <script> en index.html
 */
(function (P) {
  'use strict';

  const COMPONENTS = [
    'stats',
    'heroCode',
    'about',
    'skills',
    'education',
    'subjects',
    'projects',
    'experience',
    'contact'
  ];

  const FEATURES = ['theme', 'nav', 'reveal', 'counters', 'clipboard'];

  function run(group, names) {
    names.forEach((name) => {
      try {
        if (group[name]) group[name].init();
      } catch (error) {
        console.error(`[portfolio] Falló el módulo "${name}":`, error);
      }
    });
  }

  function start() {
    run(P.components, COMPONENTS);
    run(P.features, FEATURES);

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  }

  // Los scripts usan `defer`, por lo que el DOM ya está listo; el chequeo es una red de seguridad.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})(window.Portfolio);
