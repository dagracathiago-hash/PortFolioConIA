/**
 * Namespace global del portfolio.
 *
 * Todo el código cuelga de `window.Portfolio` para evitar variables globales sueltas:
 *   Portfolio.core        → utilidades compartidas (DOM, formato, cálculos)
 *   Portfolio.data        → contenido editable (perfil, materias, proyectos…)
 *   Portfolio.components  → piezas que renderizan secciones a partir de los datos
 *   Portfolio.features    → comportamientos (tema, navegación, animaciones…)
 */
window.Portfolio = window.Portfolio || {
  core: {},
  data: {},
  components: {},
  features: {}
};
