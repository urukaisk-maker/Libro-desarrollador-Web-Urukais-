// logros-page.js — Sincroniza el anillo circular con el progreso de logros.js
document.addEventListener('DOMContentLoaded', () => {
  const ring = document.getElementById('logros-ring-fill');
  const percentEl = document.getElementById('logros-ring-percent');
  const legacyFill = document.getElementById('logros-progreso-fill');

  if (!ring || !percentEl) return;

  // Radio = 70, circunferencia = 2 * PI * 70 = 439.82
  const CIRCUMFERENCE = 439.82;

  function updateRing() {
    // Leer el % desde la barra legacy (que logros.js actualiza)
    const width = legacyFill ? parseFloat(legacyFill.style.width) || 0 : 0;
    const percent = Math.min(width, 100);

    // Actualizar el anillo
    const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
    ring.style.strokeDashoffset = offset;

    // Actualizar el % del centro
    percentEl.textContent = `${Math.round(percent)}%`;
  }

  // Actualizar cada vez que logros.js cambie el ancho de la barra legacy
  if (legacyFill) {
    const observer = new MutationObserver(updateRing);
    observer.observe(legacyFill, { attributes: true, attributeFilter: ['style'] });
  }

  // Actualización inicial
  setTimeout(updateRing, 100);

  // Actualizar también al volver a la pestaña (por si se desbloqueó un logro en otra página)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateRing();
  });
});