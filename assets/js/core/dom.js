/**
 * Helpers de DOM.
 *
 * `h()` crea elementos de forma declarativa y SEGURA (usa textContent, nunca innerHTML),
 * así que ningún dato puede inyectar HTML por accidente.
 *
 *   h('a', { class: 'btn', href: '#x', dataset: { id: 1 } }, 'Texto', h('span', null, 'hijo'))
 */
(function (P) {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function append(parent, children) {
    for (const child of children) {
      if (child == null || child === false) continue;
      if (Array.isArray(child)) append(parent, child);
      else parent.append(child.nodeType ? child : document.createTextNode(String(child)));
    }
  }

  function applyProps(node, props) {
    if (!props) return;
    for (const [key, value] of Object.entries(props)) {
      if (value == null || value === false) continue;
      if (key === 'class') node.setAttribute('class', value);
      else if (key === 'dataset') Object.assign(node.dataset, value);
      else if (key === 'style') {
        for (const [prop, val] of Object.entries(value)) node.style.setProperty(prop, val);
      } else if (key.startsWith('on') && typeof value === 'function') {
        node.addEventListener(key.slice(2).toLowerCase(), value);
      } else node.setAttribute(key, value === true ? '' : value);
    }
  }

  /** Crea un elemento HTML. */
  function h(tag, props, ...children) {
    const node = document.createElement(tag);
    applyProps(node, props);
    append(node, children);
    return node;
  }

  /** Crea un elemento SVG (mismo contrato que `h`). */
  function svg(tag, props, ...children) {
    const node = document.createElementNS(SVG_NS, tag);
    applyProps(node, props);
    append(node, children);
    return node;
  }

  /** Ícono del sprite inline definido en index.html (<symbol id="i-nombre">). */
  function icon(name, extraClass = '') {
    const use = svg('use', { href: '#i-' + name });
    return svg('svg', { class: ('icon ' + extraClass).trim(), 'aria-hidden': 'true' }, use);
  }

  /**
   * Convierte "texto con **negrita**" en nodos (<strong>), sin usar innerHTML.
   * Es lo único de "markdown" que soportan los textos de los archivos de datos.
   */
  function richText(text) {
    return text
      .split('**')
      .map((part, index) => (index % 2 ? h('strong', null, part) : part));
  }

  /** ¿El usuario pidió reducir el movimiento? */
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  P.dom = { qs, qsa, h, svg, icon, richText };
  P.core.prefersReducedMotion = prefersReducedMotion;
})(window.Portfolio);
