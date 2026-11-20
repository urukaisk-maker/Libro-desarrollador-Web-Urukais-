// reading-progress.js — Barra de progreso de lectura en la parte superior
document.addEventListener('DOMContentLoaded', () => {
  // Evitar duplicados
  if (document.getElementById('reading-progress-bar')) return;

  // Solo en páginas de contenido (no en la landing)
  const content = document.querySelector('.md-content__inner');
  if (!content) return;

  // Crear la barra
  const bar = document.createElement('div');
  bar.id = 'reading-progress-bar';
  bar.className = 'reading-progress';
  document.body.appendChild(bar);

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(progress, 100)}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
});