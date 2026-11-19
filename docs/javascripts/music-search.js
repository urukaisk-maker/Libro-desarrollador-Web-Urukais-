// music-search.js — Buscador de música con iTunes Search API + proxy de audio
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('music-search-input');
  const results = document.getElementById('music-search-results');
  const player = document.getElementById('music-search-player');
  if (!input || !results || !player) return;

  const AUDIO_PROXY = 'https://urukais-ai-proxy.urukaisk.workers.dev/audio-proxy';

  let timeout = null;

  input.addEventListener('input', () => {
    clearTimeout(timeout);
    const query = input.value.trim();
    if (query.length < 2) {
      results.innerHTML = '';
      return;
    }
    timeout = setTimeout(() => searchiTunes(query), 400);
  });

  async function searchiTunes(query) {
    results.innerHTML = '<p>Buscando…</p>';
    try {
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=8`;
      const res = await fetch(url);
      const data = await res.json();
      const tracks = data.results.filter(t => t.previewUrl);
      if (!tracks.length) {
        results.innerHTML = '<p>Sin resultados con preview disponible.</p>';
        return;
      }
      results.innerHTML = tracks.map(t => {
        const proxied = `${AUDIO_PROXY}?url=${encodeURIComponent(t.previewUrl)}`;
        return `
        <div class="music-result">
          <img src="${t.artworkUrl60}" alt="" width="40" height="40" style="border-radius:6px;">
          <div class="music-result__info">
            <strong>${t.trackName}</strong>
            <span>${t.artistName}</span>
          </div>
          <button class="md-button md-button--primary" data-preview="${proxied}">
            ▶ Escuchar
          </button>
        </div>`;
      }).join('');
    } catch (e) {
      console.error('[music] error búsqueda:', e);
      results.innerHTML = '<p>Error al buscar. Inténtalo de nuevo.</p>';
    }
  }

  results.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-preview]');
    if (!btn) return;
    player.src = btn.dataset.preview;
    player.load();
    player.play().catch(err => {
      console.error('[music] error reproducción:', err);
    });
  });
});