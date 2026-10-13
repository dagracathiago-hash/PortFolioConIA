/**
 * FEATURE · Animación de entrada al hacer scroll.
 * Cualquier elemento con [data-reveal] recibe la clase .is-visible al entrar en pantalla
 * (el CSS hace el resto). [data-reveal-delay="120"] escalona la animación en milisegundos.
 */
(function (P) {
  'use strict';

  const { qsa } = P.dom;

  function init() {
    const elements = qsa('[data-reveal]');

    // Sin soporte o con movimiento reducido: mostrar todo de una vez
    if (!('IntersectionObserver' in window) || P.core.prefersReducedMotion()) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // se anima una sola vez
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    elements.forEach((el) => {
      if (el.dataset.revealDelay) el.style.setProperty('--d', el.dataset.revealDelay + 'ms');
      observer.observe(el);
    });
  }

  P.features.reveal = { init };
})(window.Portfolio);
