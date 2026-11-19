// landing.js — Stats animadas con contador al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
  const stats = document.querySelectorAll('.landing-stat__num[data-count]');
  if (!stats.length) return;

  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toString();
    };
    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) {
    // Fallback: pintar el número final directamente
    stats.forEach(el => el.textContent = el.dataset.count);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  stats.forEach(el => observer.observe(el));
});