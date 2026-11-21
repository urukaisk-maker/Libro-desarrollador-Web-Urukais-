(function () {
  'use strict';

  function initProjectMenu() {
    const menu = document.getElementById('uruProjectMenu');
    if (!menu || menu.dataset.init === 'true') return;
    menu.dataset.init = 'true';

    // Inyectar botón trigger en el header (antes del botón de búsqueda)
    const headerInner = document.querySelector('.md-header__inner');
    const searchBtn = headerInner ? headerInner.querySelector('label[for="__search"]') : null;

    if (headerInner && searchBtn && !document.querySelector('.uru-menu-trigger')) {
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'md-header__button md-icon uru-menu-trigger';
      trigger.setAttribute('aria-label', 'Abrir menú del proyecto');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-controls', 'uruProjectMenu');
      trigger.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">' +
        '<path fill="currentColor" d="M16 12a2 2 0 0 1 2-2 2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2' +
        'm-6 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2' +
        'm-6 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2z"/></svg>';
      searchBtn.parentNode.insertBefore(trigger, searchBtn);
    }

    const trigger = document.querySelector('.uru-menu-trigger');
    if (!trigger) return;

    function open() {
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      trigger.classList.add('is-active');
      trigger.setAttribute('aria-expanded', 'true');
    }

    function close() {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      trigger.classList.remove('is-active');
      trigger.setAttribute('aria-expanded', 'false');
    }

    function toggle() {
      menu.classList.contains('is-open') ? close() : open();
    }

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggle();
    });

    // Cerrar al clic fuera
    document.addEventListener('click', (e) => {
      if (menu.classList.contains('is-open') && !menu.contains(e.target) && !trigger.contains(e.target)) {
        close();
      }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
    });
  }

  if (typeof document$ !== 'undefined') {
    document$.subscribe(initProjectMenu);
  } else {
    document.addEventListener('DOMContentLoaded', initProjectMenu);
  }
})();