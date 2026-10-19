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
// CALENDARIO (FULLCALENDAR) - CON EVENTOS LOCALES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl || typeof FullCalendar === 'undefined') return;

  // Eventos oficiales del libro
  const eventosOficiales = [
    { title: 'Taller: Tu primer portfolio', date: '2026-11-15', color: '#a78bfa' },
    { title: 'Directo: Entrevistas técnicas', date: '2026-12-20', color: '#22d3ee' },
    { title: 'Charla: Introducción', date: '2026-10-01', color: '#16a34a' },
    { title: 'Reto Semanal #1', date: '2026-10-18', color: '#f59e0b' },
    { title: 'Reto Semanal #2', date: '2026-10-25', color: '#f59e0b' },
    { title: 'Reto Semanal #3', date: '2026-11-01', color: '#f59e0b' },
    { title: 'Reto Semanal #4', date: '2026-11-08', color: '#f59e0b' },
    { title: 'Reto Semanal #5', date: '2026-11-15', color: '#f59e0b' }
  ];

  // Cargar eventos guardados por el usuario
  let eventosUsuario = JSON.parse(localStorage.getItem('mis_eventos_urukais') || '[]');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    selectable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listWeek'
    },
    buttonText: { today: 'Hoy', month: 'Mes', week: 'Semana', list: 'Lista' },
    events: [...eventosOficiales, ...eventosUsuario],

    // Añadir evento al hacer clic en un día
    dateClick: (info) => {
      const titulo = prompt(`📌 Añadir evento para el ${info.dateStr}:\n(Escribe el título o deja vacío para cancelar)`);
      if (!titulo || titulo.trim() === '') return;

      const nuevoEvento = {
        id: 'user_' + Date.now(),
        title: '📌 ' + titulo.trim(),
        start: info.dateStr,
        color: '#16a34a',
        allDay: true
      };

      eventosUsuario.push(nuevoEvento);
      localStorage.setItem('mis_eventos_urukais', JSON.stringify(eventosUsuario));
      calendar.addEvent(nuevoEvento);
    },

    // Eliminar evento al hacer clic (solo los del usuario)
    eventClick: (info) => {
      const id = info.event.id;
      if (id && id.startsWith('user_')) {
        if (confirm(`¿Eliminar "${info.event.title}"?`)) {
          info.event.remove();
          eventosUsuario = eventosUsuario.filter(e => e.id !== id);
          localStorage.setItem('mis_eventos_urukais', JSON.stringify(eventosUsuario));
        }
      } else {
        alert(`${info.event.title}\n📅 ${info.event.startStr}`);
      }
    }
  });

  calendar.render();

  // Botón para limpiar todos los eventos del usuario
  const btnClear = document.getElementById('clearEvents');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (confirm('¿Seguro que quieres borrar todos tus eventos?')) {
        localStorage.removeItem('mis_eventos_urukais');
        eventosUsuario = [];
        calendar.getEvents().forEach(e => {
          if (e.id && e.id.startsWith('user_')) e.remove();
        });
      }
    });
  }
});// ============================================
// CALENDARIO (FULLCALENDAR) - CON EVENTOS LOCALES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl || typeof FullCalendar === 'undefined') return;

  // Eventos oficiales del libro
  const eventosOficiales = [
    { title: 'Taller: Tu primer portfolio', date: '2026-11-15', color: '#a78bfa' },
    { title: 'Directo: Entrevistas técnicas', date: '2026-12-20', color: '#22d3ee' },
    { title: 'Charla: Introducción', date: '2026-10-01', color: '#16a34a' },
    { title: 'Reto Semanal #1', date: '2026-10-18', color: '#f59e0b' },
    { title: 'Reto Semanal #2', date: '2026-10-25', color: '#f59e0b' },
    { title: 'Reto Semanal #3', date: '2026-11-01', color: '#f59e0b' },
    { title: 'Reto Semanal #4', date: '2026-11-08', color: '#f59e0b' },
    { title: 'Reto Semanal #5', date: '2026-11-15', color: '#f59e0b' }
  ];

  // Cargar eventos guardados por el usuario
  let eventosUsuario = JSON.parse(localStorage.getItem('mis_eventos_urukais') || '[]');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    selectable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listWeek'
    },
    buttonText: { today: 'Hoy', month: 'Mes', week: 'Semana', list: 'Lista' },
    events: [...eventosOficiales, ...eventosUsuario],

    // Añadir evento al hacer clic en un día
    dateClick: (info) => {
      const titulo = prompt(`📌 Añadir evento para el ${info.dateStr}:\n(Escribe el título o deja vacío para cancelar)`);
      if (!titulo || titulo.trim() === '') return;

      const nuevoEvento = {
        id: 'user_' + Date.now(),
        title: '📌 ' + titulo.trim(),
        start: info.dateStr,
        color: '#16a34a',
        allDay: true
      };

      eventosUsuario.push(nuevoEvento);
      localStorage.setItem('mis_eventos_urukais', JSON.stringify(eventosUsuario));
      calendar.addEvent(nuevoEvento);
    },

    // Eliminar evento al hacer clic (solo los del usuario)
    eventClick: (info) => {
      const id = info.event.id;
      if (id && id.startsWith('user_')) {
        if (confirm(`¿Eliminar "${info.event.title}"?`)) {
          info.event.remove();
          eventosUsuario = eventosUsuario.filter(e => e.id !== id);
          localStorage.setItem('mis_eventos_urukais', JSON.stringify(eventosUsuario));
        }
      } else {
        alert(`${info.event.title}\n📅 ${info.event.startStr}`);
      }
    }
  });

  calendar.render();

  // Botón para limpiar todos los eventos del usuario
  const btnClear = document.getElementById('clearEvents');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (confirm('¿Seguro que quieres borrar todos tus eventos?')) {
        localStorage.removeItem('mis_eventos_urukais');
        eventosUsuario = [];
        calendar.getEvents().forEach(e => {
          if (e.id && e.id.startsWith('user_')) e.remove();
        });
      }
    });
  }
});// ============================================
// CALENDARIO (FULLCALENDAR) - CON EVENTOS LOCALES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl || typeof FullCalendar === 'undefined') return;

  // Eventos oficiales del libro
  const eventosOficiales = [
    { title: 'Taller: Tu primer portfolio', date: '2026-11-15', color: '#a78bfa' },
    { title: 'Directo: Entrevistas técnicas', date: '2026-12-20', color: '#22d3ee' },
    { title: 'Charla: Introducción', date: '2026-10-01', color: '#16a34a' },
    { title: 'Reto Semanal #1', date: '2026-10-18', color: '#f59e0b' },
    { title: 'Reto Semanal #2', date: '2026-10-25', color: '#f59e0b' },
    { title: 'Reto Semanal #3', date: '2026-11-01', color: '#f59e0b' },
    { title: 'Reto Semanal #4', date: '2026-11-08', color: '#f59e0b' },
    { title: 'Reto Semanal #5', date: '2026-11-15', color: '#f59e0b' }
  ];

  // Cargar eventos guardados por el usuario
  let eventosUsuario = JSON.parse(localStorage.getItem('mis_eventos_urukais') || '[]');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    selectable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listWeek'
    },
    buttonText: { today: 'Hoy', month: 'Mes', week: 'Semana', list: 'Lista' },
    events: [...eventosOficiales, ...eventosUsuario],

    // Añadir evento al hacer clic en un día
    dateClick: (info) => {
      const titulo = prompt(`📌 Añadir evento para el ${info.dateStr}:\n(Escribe el título o deja vacío para cancelar)`);
      if (!titulo || titulo.trim() === '') return;

      const nuevoEvento = {
        id: 'user_' + Date.now(),
        title: '📌 ' + titulo.trim(),
        start: info.dateStr,
        color: '#16a34a',
        allDay: true
      };

      eventosUsuario.push(nuevoEvento);
      localStorage.setItem('mis_eventos_urukais', JSON.stringify(eventosUsuario));
      calendar.addEvent(nuevoEvento);
    },

    // Eliminar evento al hacer clic (solo los del usuario)
    eventClick: (info) => {
      const id = info.event.id;
      if (id && id.startsWith('user_')) {
        if (confirm(`¿Eliminar "${info.event.title}"?`)) {
          info.event.remove();
          eventosUsuario = eventosUsuario.filter(e => e.id !== id);
          localStorage.setItem('mis_eventos_urukais', JSON.stringify(eventosUsuario));
        }
      } else {
        alert(`${info.event.title}\n📅 ${info.event.startStr}`);
      }
    }
  });

  calendar.render();

  // Botón para limpiar todos los eventos del usuario
  const btnClear = document.getElementById('clearEvents');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (confirm('¿Seguro que quieres borrar todos tus eventos?')) {
        localStorage.removeItem('mis_eventos_urukais');
        eventosUsuario = [];
        calendar.getEvents().forEach(e => {
          if (e.id && e.id.startsWith('user_')) e.remove();
        });
      }
    });
  }
});

// ============================================
// COMMAND PALETTE (Ctrl+K)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const palette = document.getElementById('commandPalette');
  const input = document.getElementById('commandInput');
  const list = document.getElementById('commandList');
  if (!palette || !input || !list) return;

  const comandos = [
    { nombre: 'Ir al Inicio', icono: '🏠', accion: () => window.location.href = '/' },
    { nombre: 'Empezar a leer (Capítulo 1)', icono: '📖', accion: () => window.location.href = '/capitulos/01-introduccion/' },
    { nombre: 'Ir al Playground', icono: '🧪', accion: () => window.location.href = '/playground/' },
    { nombre: 'Ir a los Retos', icono: '🔥', accion: () => window.location.href = '/ejercicios-playground/' },
    { nombre: 'Ir a Mis Logros', icono: '🏆', accion: () => window.location.href = '/logros/' },
    { nombre: 'Ir al Certificado', icono: '🎓', accion: () => window.location.href = '/certificado/' },
    { nombre: 'Ir a Mis Proyectos', icono: '🚀', accion: () => window.location.href = '/proyectos-lectores/' },
    { nombre: 'Ir a Preguntas de Entrevista', icono: '💼', accion: () => window.location.href = '/entrevistas/' },
    { nombre: 'Cambiar Tema (Claro/Oscuro)', icono: '🌓', accion: () => {
      const current = document.body.getAttribute('data-md-color-scheme') || 'default';
      const newTheme = current === 'slate' ? 'default' : 'slate';
      document.body.setAttribute('data-md-color-scheme', newTheme);
      localStorage.setItem('__palette', newTheme);
    }},
    { nombre: 'Ver el GitHub del Proyecto', icono: '💻', accion: () => window.open('https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-', '_blank') },
    { nombre: 'Apoyar el Proyecto', icono: '☕', accion: () => window.location.href = '/apoya/' },
  ];

  let filtered = [...comandos];
  let selectedIndex = 0;

  function render() {
    list.innerHTML = filtered.map((cmd, i) => `
      <li class="command-item ${i === selectedIndex ? 'selected' : ''}" data-index="${i}">
        <span class="icon">${cmd.icono}</span>
        <span>${cmd.nombre}</span>
      </li>
    `).join('');
  }

  function openPalette() {
    palette.classList.add('active');
    input.value = '';
    filtered = [...comandos];
    selectedIndex = 0;
    render();
    setTimeout(() => input.focus(), 100);
  }

  function closePalette() {
    palette.classList.remove('active');
  }

  function ejecutarComando(index) {
    if (filtered[index]) {
      closePalette();
      filtered[index].accion();
    }
  }

  // Atajo Ctrl+K / Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (palette.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    }
    if (e.key === 'Escape' && palette.classList.contains('active')) {
      closePalette();
    }
    if (e.key === 'ArrowDown' && palette.classList.contains('active')) {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, filtered.length - 1);
      render();
    }
    if (e.key === 'ArrowUp' && palette.classList.contains('active')) {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      render();
    }
    if (e.key === 'Enter' && palette.classList.contains('active')) {
      e.preventDefault();
      ejecutarComando(selectedIndex);
    }
  });

  // Filtrar al escribir
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    filtered = comandos.filter(c => c.nombre.toLowerCase().includes(q));
    selectedIndex = 0;
    render();
  });

  // Clic en un comando
  list.addEventListener('click', (e) => {
    const item = e.target.closest('.command-item');
    if (item) {
      ejecutarComando(parseInt(item.dataset.index));
    }
  });

  // Cerrar al hacer clic fuera
  palette.addEventListener('click', (e) => {
    if (e.target === palette) closePalette();
  });
});

// ============================================
// TEXT-TO-SPEECH (TTS)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('ttsButton');
  if (!btn) return;

  // Mostrar el botón en TODAS las páginas (no solo capítulos)
  // if (!window.location.pathname.includes('/capitulos/')) {
  //   btn.style.display = 'none';
  //   return;
  // }

  let utterance = null;
  let isPlaying = false;

  btn.addEventListener('click', () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      isPlaying = false;
      btn.textContent = '🔊 Escuchar página';
      btn.classList.remove('playing');
      return;
    }

    // Verificar que el navegador soporta TTS
    if (!('speechSynthesis' in window)) {
      alert('❌ Tu navegador no soporta la síntesis de voz.');
      return;
    }

    const contenido = document.querySelector('.md-content__inner');
    if (!contenido) {
      alert('❌ No se encontró contenido para leer.');
      return;
    }

    // Extraer solo el texto (sin código, sin botones)
    const clone = contenido.cloneNode(true);
    clone.querySelectorAll('script, style, pre, code, button, nav, .quiz-container, .share-buttons, .tts-button, .ai-explain-btn, .command-palette-overlay').forEach(el => el.remove());
    const texto = clone.textContent.replace(/\s+/g, ' ').trim();

    if (!texto || texto.length < 10) {
      alert('❌ No hay suficiente texto para leer.');
      return;
    }

    // Cancelar cualquier lectura anterior
    window.speechSynthesis.cancel();

    utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Seleccionar una voz en español si está disponible
    const voces = window.speechSynthesis.getVoices();
    const vozEspanol = voces.find(v => v.lang.startsWith('es'));
    if (vozEspanol) utterance.voice = vozEspanol;

    utterance.onend = () => {
      isPlaying = false;
      btn.textContent = '🔊 Escuchar página';
      btn.classList.remove('playing');
    };

    utterance.onerror = (e) => {
      console.error('Error TTS:', e);
      isPlaying = false;
      btn.textContent = '🔊 Escuchar página';
      btn.classList.remove('playing');
    };

    window.speechSynthesis.speak(utterance);
    isPlaying = true;
    btn.textContent = '⏹️ Detener lectura';
    btn.classList.add('playing');
  });
});

// ============================================
// EXPLICACIÓN DE CÓDIGO CON IA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Solo en páginas de capítulos
  if (!window.location.pathname.includes('/capitulos/')) return;

  // Añadir botón a cada bloque de código
  document.querySelectorAll('.highlight').forEach((block) => {
    if (block.querySelector('.ai-explain-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'ai-explain-btn';
    btn.textContent = '✨ Explícame';
    btn.title = 'Explicar este código con IA';
    btn.style.cssText = 'position: absolute; top: 0.5rem; right: 0.5rem; background: linear-gradient(135deg, #a78bfa, #22d3ee); color: #0f172a; border: none; padding: 0.3rem 0.7rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; z-index: 10; opacity: 0.9;';
    block.style.position = 'relative';
    block.appendChild(btn);

    btn.addEventListener('click', async () => {
      // Pedir API Key si no está guardada
      let apiKey = localStorage.getItem('openai_api_key');
      if (!apiKey) {
        apiKey = prompt('Para usar la IA, pega tu API Key de OpenAI (sk-...). Se guardará solo en tu navegador:');
        if (!apiKey) return;
        localStorage.setItem('openai_api_key', apiKey);
      }

      const codigo = block.querySelector('code')?.textContent || '';
      if (!codigo.trim()) return;

      btn.textContent = '⏳ Pensando...';
      btn.disabled = true;

      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'Eres un profesor de desarrollo web. Explica el código de forma clara, breve y en español. Usa analogías si ayuda.' },
              { role: 'user', content: `Explica este código:\n\n${codigo}` }
            ],
            max_tokens: 400
          })
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error?.message || 'Error en la API');
        }

        const data = await res.json();
        const explicacion = data.choices[0].message.content;

        alert('✨ Explicación:\n\n' + explicacion);
        btn.textContent = '✨ Explícame';
        btn.disabled = false;

      } catch (error) {
        alert('❌ Error: ' + error.message);
        btn.textContent = '✨ Explícame';
        btn.disabled = false;
      }
    });
  });
});
