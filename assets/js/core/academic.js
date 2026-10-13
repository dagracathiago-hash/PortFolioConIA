/**
 * Cálculos académicos derivados de la lista de materias.
 *
 * El promedio y los contadores NO se escriben a mano: se calculan desde
 * `Portfolio.data.education.subjects`. Así, al agregar una materia nueva
 * todo el sitio (estadísticas, anillo, gráfico) se actualiza solo.
 */
(function (P) {
  'use strict';

  const MIN_GRADE = 5;
  const MAX_GRADE = 10;

  let cache = null;

  function compute() {
    if (cache) return cache;

    const subjects = P.data.education.subjects;
    const count = subjects.length;
    const total = subjects.reduce((sum, s) => sum + s.grade, 0);

    // Distribución: { 10: 4, 9: 3, … 5: 1 } (incluye notas con 0 materias para que la escala sea completa)
    const distribution = [];
    for (let grade = MAX_GRADE; grade >= MIN_GRADE; grade--) {
      distribution.push({ grade, count: subjects.filter((s) => s.grade === grade).length });
    }

    cache = {
      count,
      average: count ? total / count : 0,
      distribution,
      maxCount: Math.max(...distribution.map((d) => d.count), 1),
      tens: subjects.filter((s) => s.grade === MAX_GRADE),
      byType: {
        promocion: subjects.filter((s) => s.type === 'promocion').length,
        examen: subjects.filter((s) => s.type === 'examen').length
      }
    };
    return cache;
  }

  /** Rango visual de una nota (lo usa el CSS vía data-tier). */
  function gradeTier(grade) {
    if (grade >= 10) return 'perfect';
    if (grade >= 9) return 'high';
    if (grade >= 8) return 'good';
    return 'base';
  }

  P.core.academic = { compute, gradeTier, MAX_GRADE };
})(window.Portfolio);
