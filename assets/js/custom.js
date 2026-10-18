// --- Barra de progreso ---
const bar = document.getElementById('readingProgress');
if (bar) {
  function update() {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const scrollHeight = doc.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

// --- Modal de newsletter ---
const modal = document.getElementById('newsletterModal');
if (modal && sessionStorage.getItem('newsletter_seen') !== '1') {
  setTimeout(() => modal.classList.add('active'), 30000);
  function cerrar() {
    modal.classList.remove('active');
    sessionStorage.setItem('newsletter_seen', '1');
  }
  document.getElementById('closeModal').addEventListener('click', cerrar);
  document.getElementById('skipModal').addEventListener('click', (e) => { e.preventDefault(); cerrar(); });
  modal.addEventListener('click', (e) => { if (e.target === modal) cerrar(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) cerrar();
  });
}

// --- Banner de cookies ---
const banner = document.getElementById('cookieBanner');
if (banner && localStorage.getItem('cookie_consent') !== 'true') {
  setTimeout(() => { banner.style.display = 'flex'; }, 2000);
  document.getElementById('acceptCookies').addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'true');
    banner.style.display = 'none';
  });
}

// --- GAMIFICACIÓN: CAPÍTULOS COMPLETADOS ---
document.addEventListener('DOMContentLoaded', () => {
  // Solo ejecutar en páginas de capítulos
  const path = window.location.pathname;
  if (!path.includes('/capitulos/')) return;

  const content = document.querySelector('.md-content__inner');
  if (!content) return;

  // Crear el botón
  const wrapper = document.createElement('div');
  wrapper.className = 'chapter-complete-wrapper';
  
  const btn = document.createElement('button');
  btn.className = 'chapter-complete-btn';
  
  // Comprobar si ya está completado
  const completedChapters = JSON.parse(localStorage.getItem('completed_chapters') || '[]');
  const isCompleted = completedChapters.includes(path);

  if (isCompleted) {
    btn.classList.add('completed');
    btn.innerHTML = '✅ Capítulo completado';
    btn.disabled = true;
  } else {
    btn.innerHTML = '🎯 Marcar como completado';
  }

  // Insertar antes de los botones de navegación (footer)
  const footer = document.querySelector('.md-footer__inner');
  if (footer) {
    footer.parentNode.insertBefore(wrapper, footer);
  } else {
    content.appendChild(wrapper);
  }
  wrapper.appendChild(btn);

  // Lógica al hacer clic
  btn.addEventListener('click', () => {
    if (btn.classList.contains('completed')) return;

    // Guardar en localStorage
    completedChapters.push(path);
    localStorage.setItem('completed_chapters', JSON.stringify(completedChapters));

    // Cambiar estado del botón
    btn.classList.add('completed');
    btn.innerHTML = '✅ Capítulo completado';
    btn.disabled = true;

    // Mostrar notificación de insignia
    mostrarToastInsignia(completedChapters.length);
  });
});

function mostrarToastInsignia(total) {
  const toast = document.createElement('div');
  toast.className = 'badge-toast';
  toast.innerHTML = `
    <div class="badge-toast__icon">🏆</div>
    <div>
      <div style="font-weight: 700;">¡Logro desbloqueado!</div>
      <div style="font-size: 0.85rem; color: #cbd5e1;">Has completado ${total} capítulos</div>
    </div>
  `;
  document.body.appendChild(toast);

  // Mostrar y ocultar
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}