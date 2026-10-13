/**
 * DATOS · Experiencia laboral (ordenar de la más reciente a la más antigua).
 *   start / end: 'AAAA-MM'. Si es un trabajo actual, poné end: null (se muestra "Actualidad").
 * La duración de cada puesto y los años totales de experiencia se calculan solos.
 */
window.Portfolio.data.experience = {
  jobs: [
    {
      role: 'Vendedor',
      company: 'Swim Concept',
      start: '2025-03',
      end: '2026-01',
      points: [
        'Asesoramiento técnico a clientes.',
        'Gestión de stock.',
        'Resolución de reclamos.'
      ]
    },
    {
      role: 'Vendedor',
      company: 'Narrow',
      start: '2024-01',
      end: '2025-02',
      points: [
        'Atención al cliente.',
        'Manejo de caja.',
        'Cumplimiento de objetivos de venta en equipo.'
      ]
    }
  ],

  /** Habilidades transversales que aporta esta experiencia. */
  softSkills: {
    title: 'Lo que me llevo',
    intro: 'Más allá del código, estas experiencias me dieron hábitos que llevo a cualquier equipo:',
    items: [
      'Comunicación con clientes',
      'Trabajo en equipo',
      'Orientación a objetivos',
      'Resolución de reclamos',
      'Gestión de stock',
      'Responsabilidad (manejo de caja)'
    ]
  }
};
