/**
 * COMPONENTE · Franja de estadísticas del hero.
 * Todos los valores se calculan desde los archivos de datos (nada hardcodeado).
 * El elemento con data-counter lo anima features/counters.js al entrar en pantalla.
 */
(function (P) {
  'use strict';

  const { h, qs } = P.dom;
  const { formatNumber, monthsBetween } = P.core.format;

  function stat({ value, decimals = 0, suffix = '', label, hint }) {
    return h(
      'li',
      { class: 'stat', dataset: { reveal: '' } },
      h(
        'span',
        {
          class: 'stat__value',
          dataset: { counter: '', to: value, decimals, suffix }
        },
        formatNumber(value, decimals),
        suffix && h('small', null, suffix)
      ),
      h('span', { class: 'stat__label' }, label),
      h('span', { class: 'stat__hint' }, hint)
    );
  }

  function init() {
    const root = qs('#stats');
    if (!root) return;

    const academic = P.core.academic.compute();
    const degree = P.data.education.degrees.find((d) => d.id === 'lic');
    const workMonths = P.data.experience.jobs.reduce(
      (sum, job) => sum + monthsBetween(job.start, job.end),
      0
    );

    const stats = [
      { value: academic.average, decimals: 2, label: 'Promedio general', hint: 'sobre 10, sin aplazos' },
      { value: academic.count, label: 'Materias aprobadas', hint: `${academic.tens.length} con nota 10` },
      { value: degree.progress, suffix: '%', label: 'De la Licenciatura', hint: 'completado' },
      { value: Math.floor(workMonths / 12), suffix: '+', label: 'Años de experiencia', hint: 'atención al cliente' }
    ];

    root.replaceChildren(
      ...stats.map((s, i) => {
        const node = stat(s);
        node.dataset.revealDelay = i * 90;
        return node;
      })
    );
  }

  P.components.stats = { init };
})(window.Portfolio);
