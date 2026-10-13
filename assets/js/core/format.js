/**
 * Utilidades de formato (fechas, números, texto) en español rioplatense.
 */
(function (P) {
  'use strict';

  const LOCALE = 'es-AR';

  /** "2025-07-15" → Date local (evita el corrimiento de zona horaria de `new Date(iso)`). */
  function parseISODate(iso) {
    const [y, m, d = 1] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  /** "2025-07-15" → "15 jul 2025" */
  function formatDate(iso) {
    return new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'short', year: 'numeric' })
      .format(parseISODate(iso))
      .replace(/\./g, '')
      .replace(/ de /g, ' ');
  }

  /** "2025-03" → "Mar 2025" */
  function formatMonthYear(isoMonth) {
    const text = new Intl.DateTimeFormat(LOCALE, { month: 'short', year: 'numeric' })
      .format(parseISODate(isoMonth))
      .replace(/\./g, '')
      .replace(' de ', ' ');
    return capitalize(text);
  }

  /** Cantidad de meses entre dos "YYYY-MM", ambos inclusive. */
  function monthsBetween(start, end) {
    const a = parseISODate(start);
    const b = end ? parseISODate(end) : new Date();
    return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + 1;
  }

  /** 14 → "1 año y 2 meses" · 11 → "11 meses" */
  function formatDuration(months) {
    const years = Math.floor(months / 12);
    const rest = months % 12;
    const y = years ? `${years} ${years === 1 ? 'año' : 'años'}` : '';
    const m = rest ? `${rest} ${rest === 1 ? 'mes' : 'meses'}` : '';
    return [y, m].filter(Boolean).join(' y ');
  }

  /** 8.2222 → "8,22" */
  function formatNumber(value, decimals = 0) {
    return new Intl.NumberFormat(LOCALE, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  }

  /** Normaliza para buscar sin importar tildes ni mayúsculas ("Matemática" ≈ "matematica"). */
  function normalizeText(text) {
    return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  }

  P.core.format = {
    parseISODate,
    formatDate,
    formatMonthYear,
    monthsBetween,
    formatDuration,
    formatNumber,
    normalizeText
  };
})(window.Portfolio);
