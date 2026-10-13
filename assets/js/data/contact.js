/**
 * DATOS · Medios de contacto.
 *   copy: true → muestra un botón para copiar el valor al portapapeles
 *   external: true → abre en pestaña nueva
 *   primary: true → se usa para el botón principal "Escribime un email"
 *   social: true → aparece como ícono en el hero
 *
 * Nota: el email también figura en index.html (bloque <noscript> y datos estructurados JSON-LD).
 */
window.Portfolio.data.contact = {
  email: 'dagracathiago@gmail.com',

  links: [
    {
      id: 'email',
      label: 'Email',
      value: 'dagracathiago@gmail.com',
      href: 'mailto:dagracathiago@gmail.com',
      icon: 'mail',
      copy: true,
      primary: true,
      social: true
    },
    {
      id: 'whatsapp',
      label: 'Teléfono · WhatsApp',
      value: '+54 11 2836-8281',
      href: 'https://wa.me/5491128368281',
      icon: 'whatsapp',
      copy: true,
      external: true
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/thiago-da-graca',
      href: 'https://www.linkedin.com/in/thiago-da-graca',
      icon: 'linkedin',
      external: true,
      social: true
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'github.com/dagracathiago-hash',
      href: 'https://github.com/dagracathiago-hash',
      icon: 'github',
      external: true,
      social: true
    },
    {
      id: 'location',
      label: 'Ubicación',
      value: 'Lanús, Buenos Aires, Argentina',
      icon: 'map-pin'
    }
  ]
};
