/**
 * FEATURE · Tema claro / oscuro.
 *
 * El tema inicial lo resuelve el script inline del <head> (para evitar parpadeos).
 * Acá solo se maneja el botón y se persiste la elección en localStorage
 * (envuelto en try/catch: puede no estar disponible en modo privado).
 */
(function (P) {
  'use strict';

  const { qs } = P.dom;
  const STORAGE_KEY = 'portfolio-theme';
  const THEME_COLORS = { dark: '#0a0e14', light: '#f7f4ed' };

  const root = document.documentElement;

  function current() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function apply(theme, button) {
    root.setAttribute('data-theme', theme);

    const meta = qs('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLORS[theme]);

    if (button) {
      button.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    }
  }

  function init() {
    const button = qs('[data-theme-toggle]');
    if (!button) return;

    apply(current(), button);

    button.addEventListener('click', () => {
      const next = current() === 'dark' ? 'light' : 'dark';
      apply(next, button);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* sin persistencia: el tema igual cambia en esta visita */
      }
    });
  }

  P.features.theme = { init };
})(window.Portfolio);
