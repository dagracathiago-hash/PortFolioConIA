/**
 * FEATURE · Contadores animados.
 * Los elementos [data-counter] cuentan desde 0 hasta data-to cuando entran en pantalla.
 * El valor final ya está escrito en el HTML, así que si algo falla o hay movimiento reducido
 * el número correcto queda visible igual.
 */
(function (P) {
  'use strict';

  const { qsa } = P.dom;
  const { formatNumber } = P.core.format;
  const DURATION_MS = 1400;

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  function animate(element) {
    const target = parseFloat(element.dataset.to);
    const decimals = parseInt(element.dataset.decimals, 10) || 0;
    // El primer nodo es el número; el segundo (si existe) es el sufijo <small>
    const textNode = element.firstChild;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      textNode.nodeValue = formatNumber(target * easeOutCubic(progress), decimals);
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function init() {
    const counters = qsa('[data-counter]');
    if (!counters.length || !('IntersectionObserver' in window) || P.core.prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((counter) => observer.observe(counter));
  }

  P.features.counters = { init };
})(window.Portfolio);
