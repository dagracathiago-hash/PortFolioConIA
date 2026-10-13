/**
 * DATOS · Proyectos.
 *
 * Para agregar uno, copiá un bloque y completalo. Campos:
 *   featured : true → ocupa todo el ancho (usalo para el más importante)
 *   icon     : nombre de un <symbol id="i-…"> del sprite de index.html
 *   context  : dónde/por qué se hizo (materia, trabajo, personal…)
 *   points   : lista de logros o decisiones técnicas
 *   tags     : tecnologías usadas
 *   links    : [{ label, href }] → ej. repositorio en GitHub o demo. Si no hay, dejalo vacío.
 *
 * Cuando tengas el repositorio de cada proyecto, agregalo en `links`, por ejemplo:
 *   links: [{ label: 'Ver repositorio', href: 'https://github.com/dagracathiago-hash/epicentro-gourmet' }]
 */
window.Portfolio.data.projects = [
  {
    title: 'Sistema de gestión "Epicentro Gourmet"',
    context: 'Proyecto grupal · Orientación a Objetos · UNLa',
    featured: true,
    icon: 'users',
    summary: 'Sistema de gestión para un local gastronómico, desarrollado en un equipo de 3 personas con un flujo de trabajo profesional sobre Git.',
    points: [
      'Repositorio compartido con **ramas por funcionalidad** y **pull requests**.',
      'Mi responsabilidad: **implementación de casos de uso** y **estructura inicial del proyecto**.',
      'Diseño de clases, persistencia y validaciones.'
    ],
    tags: ['Java', 'POO', 'Git', 'GitHub'],
    links: []
  },
  {
    title: 'Programación concurrente en C++',
    context: 'Trabajos prácticos · Sistemas Operativos y Concurrencia',
    icon: 'cpu',
    summary: 'Implementación de patrones clásicos de sincronización entre hilos.',
    points: [
      'Problema **productor-consumidor** resuelto con semáforos.',
      'Locks con prioridad para evitar **inanición** y **deadlocks**.'
    ],
    tags: ['C++', 'Semáforos', 'Mutex', 'Concurrencia'],
    links: []
  },
  {
    title: 'Aplicaciones de gestión en Java',
    context: 'Trabajos prácticos · Orientación a Objetos',
    icon: 'database',
    summary: 'Sistema de gestión de stock y sistema de facturación de servicios.',
    points: [
      'Uso de **herencia**, **polimorfismo** y colecciones.',
      'Identificadores autoincrementales y base de datos MySQL.'
    ],
    tags: ['Java', 'MySQL', 'POO'],
    links: []
  },
  {
    title: 'GreenFlow',
    context: 'Ingeniería de Software II · UNLa',
    icon: 'layers',
    summary: 'Diseño de la arquitectura de un sistema municipal de créditos por reciclaje.',
    points: [
      'Arquitectura **modular en cuatro capas**.',
      'Aplicación de **modularidad** y **ocultamiento de información**.'
    ],
    tags: ['Arquitectura de software', 'Diseño modular', 'Capas'],
    links: []
  }
];
