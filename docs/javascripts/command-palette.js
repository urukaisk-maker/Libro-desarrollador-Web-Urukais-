// command-palette.js — Buscador rápido tipo VSCode (Ctrl+K / Cmd+K)
document.addEventListener('DOMContentLoaded', () => {
  // Evitar duplicados si el script se carga dos veces
  if (document.getElementById('cmd-palette-overlay')) return;

  // Construir lista de páginas desde los enlaces del sidebar
  const pages = [];
  document.querySelectorAll('.md-nav__link[href]').forEach(link => {
    const href = link.getAttribute('href');
    const label = link.textContent.trim();
    if (!href || !label || href.startsWith('#') || href.startsWith('javascript:')) return;
    if (!pages.some(p => p.href === href)) {
      pages.push({ href, label });
    }
  });

  // Crear el HTML del palette
  const overlay = document.createElement('div');
  overlay.id = 'cmd-palette-overlay';
  overlay.className = 'command-palette-overlay';
  overlay.innerHTML = `
    <div class="command-palette">
      <input type="text" class="command-input" placeholder="Buscar página… (Esc para cerrar)" autofocus>
      <ul class="command-list"></ul>
    </div>
  `;
  document.body.appendChild(overlay);

  const input = overlay.querySelector('.command-input');
  const list = overlay.querySelector('.command-list');
  let selectedIndex = 0;
  let filtered = pages;

  const render = () => {
    if (!filtered.length) {
      list.innerHTML = '<li class="command-empty">Sin resultados</li>';
      return;
    }
    list.innerHTML = filtered.map((p, i) => `
      <li class="command-item ${i === selectedIndex ? 'selected' : ''}" data-href="${p.href}">
        <span class="icon">📄</span>
        <span class="label">${p.label}</span>
      </li>
    `).join('');
  };

  const filter = (query) => {
    const q = query.toLowerCase().trim();
    filtered = q ? pages.filter(p => p.label.toLowerCase().includes(q)) : pages;
    selectedIndex = 0;
    render();
  };

  const open = () => {
    overlay.classList.add('active');
    input.value = '';
    filter('');
    setTimeout(() => input.focus(), 50);
  };

  const close = () => overlay.classList.remove('active');

  const go = (href) => {
    if (href) window.location.href = href;
  };

  // Eventos
  input.addEventListener('input', (e) => filter(e.target.value));

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, filtered.length - 1);
      render();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      render();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) go(filtered[selectedIndex].href);
    } else if (e.key === 'Escape') {
      close();
    }
  });

  list.addEventListener('click', (e) => {
    const item = e.target.closest('.command-item');
    if (item) go(item.dataset.href);
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  // Atajos globales: Ctrl+K / Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('active')) close();
      else open();
    }
    if (e.key === 'Escape' && overlay.classList.contains('active')) close();
  });

  // Botón visible en el header
  const searchInner = document.querySelector('.md-search');
  if (searchInner && searchInner.parentNode) {
    const btn = document.createElement('button');
    btn.className = 'cmd-k-trigger';
    btn.type = 'button';
    btn.innerHTML = '🔍 Buscar <kbd>Ctrl K</kbd>';
    btn.addEventListener('click', open);
    searchInner.parentNode.insertBefore(btn, searchInner);
  }
});