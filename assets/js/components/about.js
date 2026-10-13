/**
 * COMPONENTE · Sección "Sobre mí": textos + tarjeta de datos rápidos.
 */
(function (P) {
  'use strict';

  const { h, qs, icon } = P.dom;

  function renderText(profile) {
    const root = qs('#about-text');
    if (!root) return;

    root.replaceChildren(
      ...profile.about.map((paragraph, index) =>
        h('p', { class: index === 0 ? 'about__lead' : null, dataset: { reveal: '', revealDelay: index * 80 } }, paragraph)
      )
    );
  }

  function renderCard(profile) {
    const root = qs('#about-card');
    if (!root) return;

    const avatar = profile.photo
      ? h('img', { src: profile.photo, alt: `Foto de ${profile.name}`, width: 76, height: 76 })
      : profile.initials;

    root.replaceChildren(
      h(
        'div',
        { class: 'about__id' },
        h('div', { class: 'about__avatar', 'aria-hidden': profile.photo ? null : 'true' }, avatar),
        h('div', null, h('h3', { class: 'about__name' }, profile.name), h('p', { class: 'about__role' }, profile.role))
      ),
      h(
        'dl',
        { class: 'about__facts' },
        ...profile.facts.map((fact) =>
          h(
            'div',
            { class: 'about__fact' },
            h('span', { class: 'icon-box' }, icon(fact.icon)),
            h('div', null, h('dt', null, fact.label), h('dd', null, fact.value))
          )
        )
      )
    );
  }

  function init() {
    renderText(P.data.profile);
    renderCard(P.data.profile);
  }

  P.components.about = { init };
})(window.Portfolio);
