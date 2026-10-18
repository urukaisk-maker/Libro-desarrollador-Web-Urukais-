// ============================================
// GAMIFICACIÓN: CAPÍTULOS COMPLETADOS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log("🎮 Script de gamificación cargado");

  // Solo ejecutar en páginas de capítulos
  const path = window.location.pathname;
  if (!path.includes('/capitulos/')) return;

  // Esperar un poco a que Material cargue el DOM
  setTimeout(() => {
    const content = document.querySelector('.md-content__inner');
    if (!content) {
      console.log("❌ No se encontró .md-content__inner");
      return;
    }

    // Crear el contenedor del botón
    const wrapper = document.createElement('div');
    wrapper.className = 'chapter-complete-wrapper';
    
    const btn = document.createElement('button');
    btn.className = 'chapter-complete-btn';
    
    // Comprobar si ya está completado en localStorage
    const completedChapters = JSON.parse(localStorage.getItem('completed_chapters') || '[]');
    const isCompleted = completedChapters.includes(path);

    if (isCompleted) {
      btn.classList.add('completed');
      btn.innerHTML = '✅ Capítulo completado';
      btn.disabled = true;
    } else {
      btn.innerHTML = '🎯 Marcar como completado';
    }

    // Insertar al final del contenido (antes de la navegación si es posible)
    const navFooter = document.querySelector('.md-footer__inner');
    if (navFooter) {
      navFooter.parentNode.insertBefore(wrapper, navFooter);
    } else {
      content.appendChild(wrapper);
    }
    wrapper.appendChild(btn);

    // Lógica al hacer clic
    btn.addEventListener('click', () => {
      if (btn.classList.contains('completed')) return;

      completedChapters.push(path);
      localStorage.setItem('completed_chapters', JSON.stringify(completedChapters));

      btn.classList.add('completed');
      btn.innerHTML = '✅ Capítulo completado';
      btn.disabled = true;

      mostrarToastInsignia(completedChapters.length);
    });
  }, 500); // Esperar 500ms para asegurar que Material ha renderizado
});

function mostrarToastInsignia(total) {
  const toast = document.createElement('div');
  toast.className = 'badge-toast';
  toast.innerHTML = `
    <div class="badge-toast__icon">🏆</div>
    <div>
      <div style="font-weight: 700;">¡Logro desbloqueado!</div>
      <div style="font-size: 0.85rem; color: #cbd5e1;">Has completado ${total} capítulo${total > 1 ? 's' : ''}</div>
    </div>
  `;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}