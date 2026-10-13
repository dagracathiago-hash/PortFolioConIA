/**
 * COMPONENTE · Sección "Habilidades": una tarjeta por categoría.
 */
(function (P) {
  'use strict';

  const { h, qs, icon } = P.dom;

  function chip(item) {
    return h(
      'li',
      { class: 'skill-chip' + (item.primary ? ' skill-chip--primary' : '') },
      item.primary && icon('star'),
      item.name,
      item.note && h('small', null, item.note)
    );
  }

  function group(data, index) {
    return h(
      'article',
      { class: 'card card--hover skill-group', dataset: { reveal: '', revealDelay: index * 80 } },
      h(
        'header',
        { class: 'skill-group__head' },
        h('span', { class: 'icon-box' }, icon(data.icon)),
        h('h3', { class: 'skill-group__title' }, data.title)
      ),
      data.description && h('p', { class: 'skill-group__desc' }, data.description),
      h('ul', { class: 'skill-list' }, ...data.items.map(chip))
    );
  }

  function init() {
    const root = qs('#skills-grid');
    if (!root) return;
    root.replaceChildren(...P.data.skills.map(group));
  }

  P.components.skills = { init };
})(window.Portfolio);
