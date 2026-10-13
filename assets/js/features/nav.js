/**
 * FEATURE · Navegación.
 *   1. Header con efecto "vidrio" al hacer scroll.
 *   2. Menú hamburguesa en móvil (se cierra con Esc, al elegir un link o al agrandar la pantalla).
 *   3. Scroll-spy: marca con aria-current el link de la sección visible.
 */
(function (P) {
  'use strict';

  const { qs, qsa } = P.dom;
  const DESKTOP_QUERY = '(min-width: 960px)';

  function initScrolledState(header) {
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initMobileMenu(header) {
    const toggle = qs('[data-nav-toggle]', header);
    if (!toggle) return;

    function setOpen(open) {
      header.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    }

    toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));

    qsa('[data-nav-link], .site-header__cta, .brand', header).forEach((link) =>
      link.addEventListener('click', () => setOpen(false))
    );

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && header.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    window.matchMedia(DESKTOP_QUERY).addEventListener('change', (event) => {
      if (event.matches) setOpen(false);
    });
  }

  function initScrollSpy() {
    const links = qsa('[data-nav-link]');
    const sections = links.map((link) => qs(link.getAttribute('href'))).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;

    function setActive(id) {
      links.forEach((link) => {
        const active = link.getAttribute('href') === '#' + id;
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }

    // La "línea de lectura" está al 40% de la altura de la ventana
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((section) => observer.observe(section));

    // Al llegar al final de la página, la última sección queda activa
    window.addEventListener(
      'scroll',
      () => {
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (atBottom) setActive(sections[sections.length - 1].id);
      },
      { passive: true }
    );

    // En el hero (arriba de todo) no hay ninguna sección activa
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY < 80) links.forEach((link) => link.removeAttribute('aria-current'));
      },
      { passive: true }
    );
  }

  function init() {
    const header = qs('[data-header]');
    if (!header) return;
    initScrolledState(header);
    initMobileMenu(header);
    initScrollSpy();
  }

  P.features.nav = { init };
})(window.Portfolio);
