/**
 * COMPONENTE · Resumen académico: tarjeta de la UNLa + tarjeta de promedio
 * (anillo, distribución de notas y materias con 10).
 * La tabla interactiva de materias vive en subjects.js.
 */
(function (P) {
  'use strict';

  const { h, svg, qs, icon } = P.dom;
  const { formatNumber } = P.core.format;

  const RING_RADIUS = 54;
  const RING_LENGTH = 2 * Math.PI * RING_RADIUS; // = 339.292… (debe coincidir con education.css)

  function degreeProgress(degree) {
    return h(
      'div',
      { class: 'progress', style: { '--value': degree.progress + '%' } },
      h(
        'div',
        { class: 'progress__head' },
        h('span', { class: 'progress__label' }, degree.title, h('span', { class: 'progress__sub' }, degree.kind)),
        h('span', { class: 'progress__value' }, formatNumber(degree.progress, degree.progress % 1 ? 2 : 0) + '%')
      ),
      h(
        'div',
        {
          class: 'progress__track',
          role: 'progressbar',
          'aria-label': `Avance de ${degree.title}`,
          'aria-valuemin': 0,
          'aria-valuemax': 100,
          'aria-valuenow': degree.progress
        },
        h('span', { class: 'progress__fill' })
      )
    );
  }

  function universityCard(education) {
    const { institution, degrees } = education;
    return h(
      'article',
      { class: 'card uni-card', dataset: { reveal: '' } },
      h(
        'header',
        { class: 'uni-card__head' },
        h('span', { class: 'icon-box' }, icon('graduation-cap')),
        h(
          'div',
          null,
          h('h3', { class: 'uni-card__title' }, institution.name),
          h('p', { class: 'uni-card__program' }, institution.program)
        )
      ),
      h(
        'ul',
        { class: 'uni-card__meta' },
        h('li', { class: 'badge badge--accent' }, institution.period),
        h('li', { class: 'badge' }, institution.currentYear + ' en curso'),
        h('li', { class: 'badge' }, 'Egreso estimado ' + institution.expectedGraduation)
      ),
      h('div', { class: 'uni-card__progress' }, ...degrees.map(degreeProgress)),
      h(
        'p',
        { class: 'uni-card__note' },
        'El Analista Programador Universitario es el título intermedio de la misma carrera: se obtiene con el mismo plan de estudios.'
      )
    );
  }

  function ring(average) {
    const offset = RING_LENGTH * (1 - average / P.core.academic.MAX_GRADE);
    return h(
      'div',
      { class: 'ring', role: 'img', 'aria-label': `Promedio ${formatNumber(average, 2)} sobre 10` },
      svg(
        'svg',
        { viewBox: '0 0 120 120', 'aria-hidden': 'true', style: { '--offset': offset.toFixed(2) } },
        svg('circle', { class: 'ring__track', cx: 60, cy: 60, r: RING_RADIUS }),
        svg('circle', { class: 'ring__value', cx: 60, cy: 60, r: RING_RADIUS, style: { '--offset': offset.toFixed(2) } })
      ),
      h(
        'div',
        { class: 'ring__center', 'aria-hidden': 'true' },
        h('span', { class: 'ring__number' }, formatNumber(average, 2)),
        h('span', { class: 'ring__max' }, '/ 10')
      )
    );
  }

  function distributionChart(stats) {
    return h(
      'ol',
      { class: 'meter', 'aria-label': 'Cantidad de materias por nota' },
      ...stats.distribution.map((row) =>
        h(
          'li',
          { class: 'meter__row', 'data-top': row.grade === P.core.academic.MAX_GRADE ? '' : null },
          h('span', { class: 'meter__label' }, row.grade),
          h('span', { class: 'meter__track' }, h('span', { class: 'meter__fill', style: { '--value': (row.count / stats.maxCount) * 100 + '%' } })),
          h('span', { class: 'meter__count' }, row.count)
        )
      )
    );
  }

  function gpaCard(education) {
    const stats = P.core.academic.compute();
    const { withFailures } = education.officialAverage;

    return h(
      'article',
      { class: 'card gpa-card', dataset: { reveal: '', revealDelay: 100 } },
      h(
        'div',
        { class: 'gpa-card__top' },
        ring(stats.average),
        h(
          'div',
          { class: 'gpa-card__legend' },
          h('h3', { class: 'gpa-card__title' }, 'Promedio general'),
          h('p', null, h('strong', null, `${stats.count} materias`), ' aprobadas, sin contar aplazos.'),
          h('p', null, `${formatNumber(withFailures, 2)} contando aplazos.`)
        )
      ),
      h('div', null, h('h4', { class: 'gpa-card__dist-title' }, 'Distribución de notas'), distributionChart(stats)),
      h(
        'div',
        null,
        h('h4', { class: 'gpa-card__tens-title' }, `Materias con ${P.core.academic.MAX_GRADE}`),
        h('ul', { class: 'tag-list' }, ...stats.tens.map((s) => h('li', { class: 'badge badge--accent' }, icon('award'), s.name)))
      )
    );
  }

  function init() {
    const root = qs('#edu-overview');
    if (!root) return;
    const education = P.data.education;
    root.replaceChildren(universityCard(education), gpaCard(education));
  }

  P.components.education = { init };
})(window.Portfolio);
