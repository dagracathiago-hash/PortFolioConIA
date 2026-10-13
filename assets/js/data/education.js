/**
 * DATOS · Formación académica.
 *
 * Fuente: historia académica y certificados del SIU Guaraní (UNLa), al 13/10/2026.
 *
 * Para sumar una materia aprobada, agregá una línea a `subjects`.
 * El promedio, los contadores y el gráfico de notas se recalculan solos.
 *   type: 'promocion' | 'examen'      date: 'AAAA-MM-DD'
 */
window.Portfolio.data.education = {
  institution: {
    name: 'Universidad Nacional de Lanús',
    short: 'UNLa',
    program: 'Licenciatura en Sistemas',
    period: '2024 – actualidad',
    currentYear: '3.º año',
    expectedGraduation: '2028'
  },

  /** Avance por título (certificados del SIU Guaraní). `progress` va de 0 a 100. */
  degrees: [
    { id: 'lic', title: 'Licenciatura en Sistemas', kind: 'Título de grado', progress: 45 },
    { id: 'apu', title: 'Analista Programador Universitario', kind: 'Título intermedio', progress: 78.26 }
  ],

  /** Promedio que informa el SIU Guaraní (el promedio mostrado como principal se calcula desde `subjects`). */
  officialAverage: { withFailures: 7.89, withoutFailures: 8.22 },

  updatedAt: '2026-10-13',
  source: 'SIU Guaraní · UNLa',

  subjects: [
    { code: '11508', name: 'Algoritmos y Estructuras de Datos', date: '2025-07-15', type: 'examen', grade: 10 },
    { code: '11504', name: 'Arquitectura de Computadoras', date: '2024-11-11', type: 'promocion', grade: 7 },
    { code: '11502', name: 'Elementos de Matemática', date: '2024-07-16', type: 'examen', grade: 5 },
    { code: '11500', name: 'Expresión de Problemas y Algoritmos', date: '2024-10-03', type: 'examen', grade: 8 },
    { code: '11506', name: 'Ingeniería de Software I', date: '2025-06-27', type: 'promocion', grade: 7 },
    { code: '11516', name: 'Ingeniería de Software II', date: '2026-07-16', type: 'examen', grade: 7 },
    { code: '11507', name: 'Introducción a las Bases de Datos', date: '2025-06-27', type: 'promocion', grade: 10 },
    { code: '11511', name: 'Introducción a los Sistemas Operativos', date: '2025-11-09', type: 'promocion', grade: 9 },
    { code: '11512', name: 'Matemática Discreta', date: '2025-12-03', type: 'examen', grade: 10 },
    { code: '11501', name: 'Organización de Computadoras', date: '2024-06-28', type: 'promocion', grade: 9 },
    { code: '11513', name: 'Orientación a Objetos I', date: '2026-07-15', type: 'examen', grade: 8 },
    { code: '11503', name: 'Programación', date: '2024-12-04', type: 'examen', grade: 10 },
    { code: '11515', name: 'Programación Concurrente', date: '2026-07-28', type: 'examen', grade: 8 },
    { code: '11510', name: 'Seminario de Lenguajes', date: '2025-11-04', type: 'promocion', grade: 8 },
    { code: 'A10', name: 'Seminario de Pensamiento Nacional Latinoamericano', date: '2025-06-25', type: 'promocion', grade: 8 },
    { code: '11505', name: 'Taller de Inglés I', date: '2024-11-15', type: 'promocion', grade: 8 },
    { code: '11509', name: 'Taller de Inglés II', date: '2025-11-13', type: 'promocion', grade: 7 },
    { code: '11514', name: 'Taller de Inglés III', date: '2026-06-22', type: 'promocion', grade: 9 }
  ]
};
