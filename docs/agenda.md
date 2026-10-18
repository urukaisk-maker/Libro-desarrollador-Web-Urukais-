# 📅 Agenda de Eventos

Próximamente habrá talleres, directos y charlas sobre desarrollo web. Todo el contenido será gratuito y en español.

## 🗓️ Calendario

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.10/index.global.min.css">
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.10/index.global.min.js"></script>

<div id="calendar" style="background: var(--md-default-bg-color); padding: 1rem; border-radius: 12px; border: 1px solid var(--md-default-fg-color--lightest);"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  if (!calendarEl) return;
  
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listWeek'
    },
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      list: 'Lista'
    },
    events: [
      { title: 'Taller: Tu primer portfolio', date: '2026-11-15', color: '#a78bfa' },
      { title: 'Directo: Entrevistas técnicas', date: '2026-12-20', color: '#22d3ee' },
      { title: 'Charla: Introducción al desarrollo web', date: '2026-10-01', color: '#16a34a' },
      { title: 'Reto Semanal #1', date: '2026-10-18', color: '#f59e0b' },
      { title: 'Reto Semanal #2', date: '2026-10-25', color: '#f59e0b' },
      { title: 'Reto Semanal #3', date: '2026-11-01', color: '#f59e0b' },
      { title: 'Reto Semanal #4', date: '2026-11-08', color: '#f59e0b' },
      { title: 'Reto Semanal #5', date: '2026-11-15', color: '#f59e0b' }
    ]
  });
  calendar.render();
});
</script>

## 🎓 Tipos de eventos

- 🟣 **Talleres** — Sesiones prácticas de 1-2 horas.
- 🔵 **Charlas** — Conversaciones sobre temas específicos.
- 🟢 **Directos** — Emisiones en vivo con preguntas y respuestas.
- 🟠 **Retos** — Desafíos semanales de código.

!!! tip "¿Quieres proponer un tema?"
    Si tienes una idea para un taller o quieres que hable de algo en concreto, escríbeme a través de la página de [contacto](contacto.md).