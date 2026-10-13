/**
 * FEATURE · Copiar al portapapeles.
 * Cualquier botón con data-copy="texto" copia ese texto y muestra un aviso (toast).
 * Usa delegación de eventos: funciona con botones creados dinámicamente.
 */
(function (P) {
  'use strict';

  const { qs, icon } = P.dom;
  const TOAST_MS = 2200;
  const BUTTON_MS = 1600;

  let toastTimer;

  function showToast(message) {
    const toast = qs('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), TOAST_MS);
  }

  /** Intenta la API moderna y cae a execCommand (por ejemplo al abrir el archivo con file://). */
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.append(area);
      area.select();
      let ok = false;
      try {
        ok = document.execCommand('copy');
      } catch (e) {
        ok = false;
      }
      area.remove();
      return ok;
    }
  }

  function init() {
    document.addEventListener('click', async (event) => {
      const button = event.target.closest('[data-copy]');
      if (!button) return;

      const ok = await copyText(button.dataset.copy);
      showToast(ok ? `${button.dataset.copyLabel || 'Texto'} copiado` : 'No pude copiar, hacelo manualmente');
      if (!ok) return;

      button.classList.add('is-copied');
      button.replaceChildren(icon('check'));
      setTimeout(() => {
        button.classList.remove('is-copied');
        button.replaceChildren(icon('copy'));
      }, BUTTON_MS);
    });
  }

  P.features.clipboard = { init };
})(window.Portfolio);
