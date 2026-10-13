/**
 * COMPONENTE · Contacto: botón principal, lista de medios y redes del hero.
 * Los botones con [data-copy] los atiende features/clipboard.js.
 */
(function (P) {
  'use strict';

  const { h, qs, icon } = P.dom;

  const externalAttrs = (link) =>
    link.external ? { target: '_blank', rel: 'noopener noreferrer' } : null;

  function contactItem(link) {
    const content = [
      h('span', { class: 'icon-box' }, icon(link.icon)),
      h('span', { class: 'contact__text' }, h('span', { class: 'contact__label' }, link.label), h('span', { class: 'contact__value' }, link.value))
    ];

    return h(
      'li',
      { class: 'contact__item' },
      link.href
        ? h('a', { class: 'contact__link', href: link.href, ...externalAttrs(link) }, content)
        : h('div', { class: 'contact__link' }, content),
      link.copy &&
        h(
          'button',
          { class: 'copy-btn', type: 'button', dataset: { copy: link.value, copyLabel: link.label }, 'aria-label': `Copiar ${link.label.toLowerCase()}` },
          icon('copy')
        )
    );
  }

  function socialItem(link) {
    return h(
      'li',
      null,
      h('a', { class: 'social-link', href: link.href, 'aria-label': link.label, title: link.label, ...externalAttrs(link) }, icon(link.icon))
    );
  }

  function init() {
    const { links } = P.data.contact;

    const list = qs('#contact-list');
    if (list) list.replaceChildren(...links.map(contactItem));

    const social = qs('#hero-social');
    if (social) social.replaceChildren(...links.filter((l) => l.social).map(socialItem));

    // Botón principal del bloque de contacto (se antepone al botón de CV ya presente en el HTML)
    const actions = qs('#contact-actions');
    const primary = links.find((l) => l.primary);
    if (actions && primary) {
      actions.prepend(h('a', { class: 'btn btn--primary', href: primary.href }, 'Escribime un email', icon('arrow-right', 'icon--arrow')));
    }
  }

  P.components.contact = { init };
})(window.Portfolio);
