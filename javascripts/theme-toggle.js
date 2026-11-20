// theme-toggle.js — Cambio de tema con animación circular (View Transitions API)
document.addEventListener('DOMContentLoaded', () => {
  const palette = document.querySelector('[data-md-component="palette"]');
  if (!palette) return;

  // Si el navegador no soporta View Transitions, no hacemos nada
  if (!document.startViewTransition) return;

  const toggle = palette.querySelector('input[type="checkbox"]');
  if (!toggle) return;

  // Añadir clase al body para que el CSS sepa que estamos en transición
  document.documentElement.style.setProperty('--theme-toggle-x', '0px');
  document.documentElement.style.setProperty('--theme-toggle-y', '0px');

  // Capturar la posición del toggle para que el círculo salga de ahí
  palette.addEventListener('click', (e) => {
    const rect = palette.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    document.documentElement.style.setProperty('--theme-toggle-x', `${x}px`);
    document.documentElement.style.setProperty('--theme-toggle-y', `${y}px`);
  });

  toggle.addEventListener('change', (e) => {
    // Cancelar la transición por defecto de Material
    e.preventDefault();
    const x = getComputedStyle(document.documentElement).getPropertyValue('--theme-toggle-x').trim() || '0px';
    const y = getComputedStyle(document.documentElement).getPropertyValue('--theme-toggle-y').trim() || '0px';

    document.startViewTransition(() => {
      // Cambiar el tema manualmente (Material lo hace con el checkbox)
      toggle.checked = !toggle.checked;
      toggle.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
});