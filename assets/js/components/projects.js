/**
 * COMPONENTE · Sección "Proyectos": una tarjeta por proyecto.
 */
(function (P) {
  'use strict';

  const { h, qs, icon, richText } = P.dom;

  function projectCard(project, index) {
    const classes = ['card', 'card--hover', 'project'];
    if (project.featured) classes.push('project--featured');

    return h(
      'article',
      { class: classes.join(' '), dataset: { reveal: '', revealDelay: (index % 3) * 90 } },
      h(
        'div',
        { class: 'project__main' },
        h(
          'div',
          { class: 'project__top' },
          h('span', { class: 'icon-box' }, icon(project.icon)),
          project.featured && h('span', { class: 'badge badge--accent' }, icon('star'), 'Destacado')
        ),
        h('p', { class: 'eyebrow project__context' }, project.context),
        h('h3', { class: 'project__title' }, project.title),
        h('p', { class: 'project__summary' }, project.summary)
      ),
      h('ul', { class: 'project__points' }, ...project.points.map((point) => h('li', null, richText(point)))),
      h(
        'div',
        { class: 'project__foot' },
        h('ul', { class: 'tag-list', 'aria-label': 'Tecnologías' }, ...project.tags.map((tag) => h('li', { class: 'tag' }, tag))),
        project.links.length > 0 &&
          h(
            'div',
            { class: 'project__links' },
            ...project.links.map((link) =>
              h('a', { class: 'project__link', href: link.href, target: '_blank', rel: 'noopener noreferrer' }, link.label, icon('external'))
            )
          )
      )
    );
  }

  function init() {
    const root = qs('#projects-grid');
    if (!root) return;
    root.replaceChildren(...P.data.projects.map(projectCard));
  }

  P.components.projects = { init };
})(window.Portfolio);
