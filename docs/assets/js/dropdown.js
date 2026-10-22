(function () {
  'use strict';
  console.log('[DD] Loaded (mega-menu v3 header-inline)');

  var EMOJI_RE = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu;
  var TOP_EMOJI = {
    'Inicio': '🏠', 'Mis Logros': '🏆', 'Agenda': '📅', 'Diario': '📰',
    'Retos': '🎯', 'Mis Proyectos': '📁', 'Proyectos Guiados': '🧭',
    'Playground': '🎮', 'Ejercicios Playground': '🏋️', 'Certificado': '🎓',
    'Preguntas de Entrevista': '💼', 'Apoya el Proyecto': '❤️',
    'Hall of Fame': '🏅', 'Filosofía': '💭', 'Introducción': '📖',
    'Nivel principiante': '🟢', 'Nivel intermedio': '🟡', 'Nivel avanzado': '🟠',
    'Nivel profesional': '🔴', 'Nivel experto': '🟣', 'Nivel élite': '🔵',
    'Nivel vanguardia': '🚀', 'Diagramas': '📊', 'Ejercicios resueltos': '✅',
    'Recursos': '📚', 'Música para programar': '🎵', 'Roadmap': '🗺️',
    'Changelog': '📝', 'Contribuir': '🤝', 'Sobre el autor': '👤',
    'Contacto': '✉️', 'FAQ': '❓', 'Agradecimientos': '🙏',
    'Prensa': '📢', 'Apéndices': '📎', 'Versión imprimible': '🖨️'
  };

  function norm(s) {
    return (s || '').replace(EMOJI_RE, '').replace(/[▾▸◂◃→←↑↓¶#]/g, '').replace(/\s+/g, ' ').trim();
  }
  function hasEmoji(s) {
    return /^[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u.test((s || '').trim());
  }
  function deco(title) {
    var t = (title || '').trim();
    if (hasEmoji(t)) return t;
    var e = TOP_EMOJI[norm(t)];
    return e ? e + ' ' + t : t;
  }

  function isCurrent(href) {
    if (!href) return false;
    try {
      var u = new URL(href, location.href);
      return u.pathname === location.pathname;
    } catch (e) { return false; }
  }

  function readNav() {
    var drawer = document.querySelector('.md-sidebar--primary .md-nav--primary') ||
                 document.querySelector('.md-nav--primary');
    if (!drawer) return null;
    var list = drawer.querySelector(':scope > .md-nav__list');
    if (!list) return null;

    var out = [];
    list.querySelectorAll(':scope > .md-nav__item').forEach(function (li) {
      var a = li.querySelector(':scope > a.md-nav__link');
      var lbl = li.querySelector(':scope > label.md-nav__link');
      var title = a ? a.textContent : (lbl ? lbl.textContent : null);
      if (!title) return;
      title = title.replace(/\s+/g, ' ').trim();

      var entry = { title: title, href: a ? a.getAttribute('href') : null, children: [] };
      var subList = li.querySelector(':scope > nav.md-nav > .md-nav__list');
      if (subList) {
        subList.querySelectorAll(':scope > .md-nav__item').forEach(function (child) {
          var ca = child.querySelector(':scope > a.md-nav__link');
          var cl = child.querySelector(':scope > label.md-nav__link');
          var ct = ca ? ca.textContent : (cl ? cl.textContent : null);
          if (!ct) return;
          entry.children.push({
            title: ct.replace(/\s+/g, ' ').trim(),
            href: ca ? ca.getAttribute('href') : null
          });
        });
      }
      out.push(entry);
    });
    return out;
  }

  function buildSection(item) {
    var section = document.createElement('div');
    section.className = 'dd-mega-section';
    section.dataset.search = (item.title + ' ' + item.children.map(function(c){return c.title;}).join(' ')).toLowerCase();

    var titleEl = document.createElement(item.href ? 'a' : 'div');
    titleEl.className = 'dd-mega-title';
    titleEl.textContent = deco(item.title);
    if (item.href) {
      titleEl.href = item.href;
      if (isCurrent(item.href)) titleEl.classList.add('is-current');
    }
    section.appendChild(titleEl);

    if (item.children.length) {
      var ul = document.createElement('ul');
      ul.className = 'dd-mega-sub';
      item.children.forEach(function (c) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.textContent = c.title;
        a.href = c.href || '#';
        if (isCurrent(c.href)) a.classList.add('is-current');
        li.appendChild(a);
        ul.appendChild(li);
      });
      section.appendChild(ul);
    }
    return section;
  }

  function buildPanel(navData) {
    var panel = document.createElement('div');
    panel.className = 'dd-mega-panel';
    panel.setAttribute('role', 'menu');

    // --- Header del panel ---
    var header = document.createElement('div');
    header.className = 'dd-mega-header';

    var titleBar = document.createElement('div');
    titleBar.className = 'dd-mega-title-bar';
    titleBar.textContent = '🗂️ Explorar';
    header.appendChild(titleBar);

    var searchWrap = document.createElement('div');
    searchWrap.className = 'dd-mega-search-wrap';
    var searchIcon = document.createElement('span');
    searchIcon.className = 'dd-mega-search-icon';
    searchIcon.textContent = '🔍';
    var search = document.createElement('input');
    search.type = 'search';
    search.className = 'dd-mega-search';
    search.placeholder = 'Buscar sección o capítulo…';
    search.setAttribute('aria-label', 'Buscar en el menú');
    searchWrap.appendChild(searchIcon);
    searchWrap.appendChild(search);
    header.appendChild(searchWrap);

    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'dd-mega-close';
    closeBtn.setAttribute('aria-label', 'Cerrar menú');
    closeBtn.textContent = '✕';
    header.appendChild(closeBtn);

    panel.appendChild(header);

    // --- Grid de secciones ---
    var grid = document.createElement('div');
    grid.className = 'dd-mega-grid';
    navData.forEach(function (item) { grid.appendChild(buildSection(item)); });

    var empty = document.createElement('div');
    empty.className = 'dd-mega-empty';
    empty.textContent = 'Sin resultados 😕';
    empty.style.display = 'none';
    grid.appendChild(empty);

    panel.appendChild(grid);

    // --- Filtro en vivo ---
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      var visible = 0;
      grid.querySelectorAll('.dd-mega-section').forEach(function (sec) {
        var match = !q || sec.dataset.search.indexOf(q) !== -1;
        sec.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      empty.style.display = visible === 0 ? '' : 'none';
    });

    return { panel: panel, search: search, closeBtn: closeBtn };
  }

  function init() {
    if (window.innerWidth < 1220) return true;

    // El botón se inserta en el header, no en las tabs
    var headerInner = document.querySelector('.md-header__inner');
    if (!headerInner) return false;
    if (headerInner.dataset.megaReady) return true;

    var navData = readNav();
    if (!navData || !navData.length) return false;

    headerInner.dataset.megaReady = '1';

    // Ocultar el bloque de tabs horizontal completo (para que no ocupe espacio)
    var tabsBar = document.querySelector('.md-tabs');
    if (tabsBar) tabsBar.style.display = 'none';

    // Crear el botón "Explorar"
    var button = document.createElement('button');
    button.className = 'dd-menu-button';
    button.type = 'button';
    button.innerHTML = '<span class="dd-menu-icon">🗂️</span> Explorar <span class="dd-menu-arrow">▾</span>';

    // Insertar ANTES del buscador (si existe)
    var searchBox = headerInner.querySelector('.md-search');
    if (searchBox) {
      headerInner.insertBefore(button, searchBox);
    } else {
      headerInner.appendChild(button);
    }

    // Construir y añadir el panel al body
    var built = buildPanel(navData);
    var panel = built.panel;
    document.body.appendChild(panel);

    function position() {
      var r = button.getBoundingClientRect();
      var w = Math.min(window.innerWidth * 0.94, 1280);
      var left = Math.max(8, (window.innerWidth - w) / 2);
      panel.style.top = (r.bottom + 6) + 'px';
      panel.style.left = left + 'px';
      panel.style.width = w + 'px';
    }

    var timer;
    function show() {
      clearTimeout(timer);
      position();
      panel.classList.add('is-open');
      button.classList.add('is-active');
      setTimeout(function () { built.search.focus(); }, 100);
    }
    function hide() {
      timer = setTimeout(function () {
        panel.classList.remove('is-open');
        button.classList.remove('is-active');
      }, 150);
    }

    button.addEventListener('mouseenter', show);
    button.addEventListener('mouseleave', hide);
    panel.addEventListener('mouseenter', function () { clearTimeout(timer); });
    panel.addEventListener('mouseleave', hide);
    button.addEventListener('click', function (e) {
      e.preventDefault();
      if (panel.classList.contains('is-open')) {
        panel.classList.remove('is-open');
        button.classList.remove('is-active');
      } else {
        show();
      }
    });

    built.closeBtn.addEventListener('click', function () {
      panel.classList.remove('is-open');
      button.classList.remove('is-active');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) {
        panel.classList.remove('is-open');
        button.classList.remove('is-active');
        button.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!panel.contains(e.target) && !button.contains(e.target)) {
        panel.classList.remove('is-open');
        button.classList.remove('is-active');
      }
    });

    console.log('[DD] Mega-menú v3 listo con', navData.length, 'secciones');
    return true;
  }

  var attempts = 0;
  function loop() {
    attempts++;
    if (init()) return;
    if (attempts > 60) return;
    setTimeout(loop, 200);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loop);
  } else {
    loop();
  }

  // Recarga al cambiar entre escritorio y móvil
  var lastW = window.innerWidth;
  window.addEventListener('resize', function () {
    var w = window.innerWidth;
    if ((lastW >= 1220) !== (w >= 1220)) {
      location.reload();
    }
    lastW = w;
  });
})();