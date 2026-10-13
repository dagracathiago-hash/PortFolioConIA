/**
 * COMPONENTE · Ventana de código del hero.
 *
 * Muestra una clase Java con datos reales de Thiago (promedio, materias, contacto…)
 * y la "escribe" línea por línea. Con prefers-reduced-motion aparece completa de una vez.
 */
(function (P) {
  'use strict';

  const { h, qs } = P.dom;
  const LINE_DELAY_MS = 140;

  // Un "token" es un trozo de texto con tipo de sintaxis: kw, type, str, num, fn, com
  const t = (type, text) => h('span', { class: 'tok-' + type }, text);
  const plain = (text) => document.createTextNode(text);

  function buildLines() {
    const { average, count } = P.core.academic.compute();
    const { role } = P.data.profile;
    const { email } = P.data.contact;
    const avg = average.toFixed(2);

    return [
      [t('kw', 'public class '), t('type', 'Thiago '), t('kw', 'implements '), t('type', 'Developer '), plain('{')],
      [],
      [plain('  '), t('type', 'String '), plain('rol = '), t('str', `"${role}"`), plain(';')],
      [plain('  '), t('type', 'String '), plain('uni = '), t('str', '"UNLa · Sistemas"'), plain(';')],
      [plain('  '), t('kw', 'double '), plain('promedio = '), t('num', avg), plain(';')],
      [plain('  '), t('kw', 'int '), plain('aprobadas = '), t('num', String(count)), plain(';')],
      [plain('  '), t('type', 'String'), plain('[] stack = {'), t('str', '"Java"'), plain(', '), t('str', '"C++"'), plain(', '), t('str', '"SQL"'), plain('};')],
      [plain('  '), t('kw', 'boolean '), plain('disponible = '), t('kw', 'true'), plain(';')],
      [],
      [plain('  '), t('kw', 'void '), t('fn', 'contactar'), plain('() {')],
      [plain('    '), t('com', `// ${email}`)],
      [plain('  }')],
      [plain('}')]
    ];
  }

  function init() {
    const code = qs('#hero-code');
    if (!code) return;

    const lines = buildLines().map((tokens) => h('span', { class: 'code-line' }, ...tokens));
    code.replaceChildren(...lines);

    const caret = h('span', { class: 'code-caret' });

    if (P.core.prefersReducedMotion()) {
      lines.forEach((line) => line.classList.add('is-shown'));
      lines[lines.length - 1].append(caret);
      return;
    }

    // Revela una línea por vez moviendo el cursor parpadeante
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('is-shown');
        line.append(caret);
      }, 500 + index * LINE_DELAY_MS);
    });
  }

  P.components.heroCode = { init };
})(window.Portfolio);
