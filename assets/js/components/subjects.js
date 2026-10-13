/**
 * COMPONENTE · Tabla interactiva de materias aprobadas.
 *
 * Estado: { query, type, sort } → se filtra, se ordena y se vuelve a dibujar.
 * La estructura estática (buscador, botones, select, <tbody>) está en index.html;
 * acá solo se enlazan los eventos y se renderizan las filas.
 */
(function (P) {
  'use strict';

  const { h, qs, qsa } = P.dom;
  const { formatDate, formatNumber, normalizeText } = P.core.format;

  const TYPE_LABEL = { promocion: 'Promoción', examen: 'Examen final' };

  const SORTERS = {
    'date-desc': (a, b) => b.date.localeCompare(a.date),
    'date-asc': (a, b) => a.date.localeCompare(b.date),
    'grade-desc': (a, b) => b.grade - a.grade || b.date.localeCompare(a.date),
    'name-asc': (a, b) => a.name.localeCompare(b.name, 'es')
  };

  function row(subject) {
    return h(
      'tr',
      null,
      h(
        'td',
        { class: 'subjects__name' },
        h('span', { class: 'subject-name' }, subject.name),
        h('span', { class: 'subject-code' }, 'Cód. ' + subject.code)
      ),
      h('td', { class: 'subjects__date' }, h('time', { datetime: subject.date }, formatDate(subject.date))),
      h(
        'td',
        { class: 'subjects__type' },
        h('span', { class: 'badge' + (subject.type === 'promocion' ? ' badge--teal' : '') }, TYPE_LABEL[subject.type])
      ),
      h(
        'td',
        { class: 'subjects__grade-cell' },
        h('span', { class: 'grade', 'data-tier': P.core.academic.gradeTier(subject.grade), 'aria-label': `Nota ${subject.grade}` }, subject.grade)
      )
    );
  }

  function init() {
    const body = qs('#subject-rows');
    if (!body) return;

    const search = qs('#subject-search');
    const sort = qs('#subject-sort');
    const count = qs('#subject-count');
    const empty = qs('#subject-empty');
    const filterButtons = qsa('[data-subject-filter]');
    const education = P.data.education;
    const all = education.subjects;
    const state = { query: '', type: 'all', sort: sort ? sort.value : 'date-desc' };

    const sourceLine = qs('#subjects-source');
    if (sourceLine) {
      sourceLine.textContent = `Fuente: ${education.source} · actualizado el ${formatDate(education.updatedAt)}`;
    }

    function visibleSubjects() {
      const query = normalizeText(state.query);
      return all
        .filter((s) => state.type === 'all' || s.type === state.type)
        .filter((s) => !query || normalizeText(s.name).includes(query) || s.code.toLowerCase().includes(query))
        .sort(SORTERS[state.sort]);
    }

    function render() {
      const list = visibleSubjects();
      body.replaceChildren(...list.map(row));
      empty.hidden = list.length > 0;

      const average = list.length ? list.reduce((sum, s) => sum + s.grade, 0) / list.length : 0;
      count.textContent = list.length
        ? `Mostrando ${list.length} de ${all.length} · promedio de la selección: ${formatNumber(average, 2)}`
        : `Mostrando 0 de ${all.length}`;
    }

    search.addEventListener('input', () => {
      state.query = search.value;
      render();
    });

    sort.addEventListener('change', () => {
      state.sort = sort.value;
      render();
    });

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        state.type = button.dataset.subjectFilter;
        filterButtons.forEach((b) => {
          const active = b === button;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        render();
      });
    });

    render();
  }

  P.components.subjects = { init };
})(window.Portfolio);
