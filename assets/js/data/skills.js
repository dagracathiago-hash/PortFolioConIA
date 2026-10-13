/**
 * DATOS · Habilidades técnicas, agrupadas por categoría.
 *   primary: true → resalta la habilidad (la principal)
 *   note: texto chico opcional junto al nombre
 *   icon: nombre de un <symbol id="i-…"> del sprite de index.html
 */
window.Portfolio.data.skills = [
  {
    title: 'Lenguajes',
    icon: 'code',
    description: 'Con Java construí la mayoría de mis proyectos; C/C++ lo uso para concurrencia y sistemas.',
    items: [
      { name: 'Java', primary: true, note: 'principal' },
      { name: 'C / C++' },
      { name: 'Python' },
      { name: 'SQL' }
    ]
  },
  {
    title: 'Backend y datos',
    icon: 'database',
    description: 'Diseño de clases, modelado relacional y programación concurrente.',
    items: [
      { name: 'Programación orientada a objetos' },
      { name: 'Diseño de clases' },
      { name: 'MySQL' },
      { name: 'Modelado y normalización' },
      { name: 'Programación concurrente' },
      { name: 'Semáforos y mutex' },
      { name: 'Prevención de deadlocks' }
    ]
  },
  {
    title: 'Herramientas',
    icon: 'git-branch',
    description: 'Flujo de trabajo colaborativo con control de versiones.',
    items: [
      { name: 'Git y GitHub', note: 'ramas · pull requests' },
      { name: 'Linux' },
      { name: 'Windows' },
      { name: 'IntelliJ' },
      { name: 'Code::Blocks' }
    ]
  },
  {
    title: 'Idiomas',
    icon: 'globe',
    description: 'Puedo leer documentación técnica y comunicarme en un entorno profesional en inglés.',
    items: [
      { name: 'Español', note: 'nativo' },
      { name: 'Inglés', note: 'B2+' }
    ]
  }
];
