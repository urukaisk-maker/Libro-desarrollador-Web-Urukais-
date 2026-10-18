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

// ============================================
// DASHBOARD DE LOGROS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const dashboard = document.getElementById('achievements-dashboard');
  if (!dashboard) return;

  const completedChapters = JSON.parse(localStorage.getItem('completed_chapters') || '[]');
  const totalChapters = 36;
  const progress = Math.round((completedChapters.length / totalChapters) * 100);

  // Generar HTML del dashboard
  let html = `
    <div style="background: var(--md-default-bg-color); padding: 2rem; border-radius: 16px; border: 1px solid var(--md-default-fg-color--lightest); margin-bottom: 2rem;">
      <h3 style="margin-top: 0; color: var(--md-primary-fg-color);">Tu Progreso</h3>
      <div style="background: #e2e8f0; height: 20px; border-radius: 10px; overflow: hidden; margin: 1rem 0;">
        <div style="background: linear-gradient(90deg, #a78bfa, #22d3ee); height: 100%; width: ${progress}%; transition: width 1s ease-out;"></div>
      </div>
      <p style="margin: 0; font-weight: 600; text-align: right;">${progress}% completado (${completedChapters.length}/${totalChapters} capítulos)</p>
    </div>

    <h3>Capítulos Completados</h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
  `;

  if (completedChapters.length === 0) {
    html += `<p>Aún no has completado ningún capítulo. ¡Empieza por el <a href="../capitulos/01-introduccion/">Capítulo 1</a>!</p>`;
  } else {
    completedChapters.forEach(path => {
      // Extraer el nombre del capítulo de la URL
      const parts = path.split('/');
      const slug = parts[parts.length - 2] || parts[parts.length - 1];
      const nombre = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      html += `
        <div style="background: #dcfce7; color: #166534; padding: 1rem; border-radius: 8px; border: 1px solid #bbf7d0; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 1.2rem;">✅</span> ${nombre}
        </div>
      `;
    });
  }
  html += `</div>`;

  dashboard.innerHTML = html;
});

// ============================================
// LÓGICA DE QUIZZES INTERACTIVOS
// ============================================
document.addEventListener('click', (e) => {
  // Verificar si se ha hecho clic en una opción del quiz
  if (e.target.classList.contains('quiz-option')) {
    const btn = e.target;
    const container = btn.closest('.quiz-container');
    
    // Evitar doble clic si ya se respondió
    if (container.dataset.answered === 'true') return;
    container.dataset.answered = 'true';

    const correcta = container.getAttribute('data-correct');
    const feedback = container.querySelector('.quiz-feedback');
    const opciones = container.querySelectorAll('.quiz-option');

    // Deshabilitar todos los botones visualmente
    opciones.forEach(op => {
      op.style.pointerEvents = 'none';
      op.style.opacity = '0.7';
    });

    // Comprobar respuesta
    const seleccionada = btn.getAttribute('data-option');

    if (seleccionada === correcta) {
      btn.classList.add('correct');
      btn.style.opacity = '1';
      feedback.innerHTML = '✅ ¡Respuesta correcta! Puedes marcar el capítulo como completado.';
      feedback.style.color = '#16a34a';
    } else {
      btn.classList.add('incorrect');
      btn.style.opacity = '1';
      feedback.innerHTML = '❌ Incorrecto. Inténtalo en el siguiente capítulo.';
      feedback.style.color = '#dc2626';
      
      // Mostrar cuál era la correcta
      const btnCorrecto = container.querySelector(`[data-option="${correcta}"]`);
      if (btnCorrecto) {
        btnCorrecto.classList.add('correct');
        btnCorrecto.style.opacity = '1';
      }
    }
  }
});

// ============================================
// ANIMACIONES DE SCROLL (FADE-IN)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Elementos a animar
  const elementsToAnimate = document.querySelectorAll(
    '.md-typeset h2, .md-typeset h3, .grid.cards > ul > li, .quiz-container, .live-sandbox-wrapper'
  );

  // Añadir la clase inicial a todos
  elementsToAnimate.forEach(el => el.classList.add('fade-in-section'));

  // Configurar el observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, {
    threshold: 0.1, // Se activa cuando el 10% del elemento es visible
    rootMargin: '0px 0px -50px 0px'
  });

  // Observar cada elemento
  elementsToAnimate.forEach(el => observer.observe(el));
});

// ============================================
// CALENDARIO (FULLCALENDAR)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');
  
  // Verificamos que el elemento existe y que la librería se ha cargado
  if (calendarEl && typeof FullCalendar !== 'undefined') {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'es',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,listWeek'
      },
      buttonText: {
        today: 'Hoy', month: 'Mes', week: 'Semana', list: 'Lista'
      },
      events: [
        { title: 'Taller: Tu primer portfolio', date: '2026-11-15', color: '#a78bfa' },
        { title: 'Directo: Entrevistas técnicas', date: '2026-12-20', color: '#22d3ee' },
        { title: 'Charla: Introducción', date: '2026-10-01', color: '#16a34a' },
        { title: 'Reto Semanal #1', date: '2026-10-18', color: '#f59e0b' },
        { title: 'Reto Semanal #2', date: '2026-10-25', color: '#f59e0b' },
        { title: 'Reto Semanal #3', date: '2026-11-01', color: '#f59e0b' },
        { title: 'Reto Semanal #4', date: '2026-11-08', color: '#f59e0b' },
        { title: 'Reto Semanal #5', date: '2026-11-15', color: '#f59e0b' }
      ]
    });
    calendar.render();
  }
});