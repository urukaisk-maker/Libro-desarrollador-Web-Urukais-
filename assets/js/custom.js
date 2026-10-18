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