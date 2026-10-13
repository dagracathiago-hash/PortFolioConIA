/**
 * COMPONENTE · Sección "Experiencia": línea de tiempo + habilidades transversales.
 */
(function (P) {
  'use strict';

  const { h, qs } = P.dom;
  const { formatMonthYear, monthsBetween, formatDuration } = P.core.format;

  function job(data, index) {
    const months = monthsBetween(data.start, data.end);
    const period = `${formatMonthYear(data.start)} – ${data.end ? formatMonthYear(data.end) : 'Actualidad'}`;

    return h(
      'li',
      { class: 'timeline__item', dataset: { reveal: '', revealDelay: index * 100 } },
      h('span', { class: 'timeline__dot', 'aria-hidden': 'true' }),
      h(
        'article',
        { class: 'card' },
        h(
          'header',
          { class: 'timeline__head' },
          h('div', null, h('h3', { class: 'timeline__role' }, data.role), h('p', { class: 'timeline__company' }, data.company)),
          h('div', { class: 'timeline__period' }, h('span', { class: 'badge' }, period), h('span', { class: 'timeline__duration' }, formatDuration(months)))
        ),
        h('ul', { class: 'timeline__points' }, ...data.points.map((point) => h('li', null, point)))
      )
    );
  }

  function softSkills(data) {
    return [
      h('h3', { class: 'experience__skills-title' }, data.title),
      h('p', null, data.intro),
      h('ul', { class: 'skill-list' }, ...data.items.map((item) => h('li', { class: 'skill-chip' }, item)))
    ];
  }

  function init() {
    const { jobs, softSkills: soft } = P.data.experience;

    const timeline = qs('#timeline');
    if (timeline) timeline.replaceChildren(...jobs.map(job));

    const aside = qs('#soft-skills');
    if (aside) aside.replaceChildren(...softSkills(soft));
  }

  P.components.experience = { init };
})(window.Portfolio);
