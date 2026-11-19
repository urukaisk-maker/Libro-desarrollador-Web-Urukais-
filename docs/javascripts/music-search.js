// music-search.js — Buscador de música con iTunes Search API + proxy + autoplay
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('music-search-input');
  const results = document.getElementById('music-search-results');
  const player = document.getElementById('music-search-player');
  if (!input || !results || !player) return;

  const AUDIO_PROXY = 'https://urukais-ai-proxy.urukaisk.workers.dev/audio-proxy';

  let timeout = null;
  let playlist = [];        // URLs proxeadas de las canciones actuales
  let currentIndex = -1;    // Índice de la que está sonando

  input.addEventListener('input', () => {
    clearTimeout(timeout);
    const query = input.value.trim();
    if (query.length < 2) {
      results.innerHTML = '';
      playlist = [];
      currentIndex = -1;
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
        playlist = [];
        currentIndex = -1;
        return;
      }

      // Guardamos la lista de canciones (URLs proxeadas)
      playlist = tracks.map(t => `${AUDIO_PROXY}?url=${encodeURIComponent(t.previewUrl)}`);
      currentIndex = -1;

      results.innerHTML = tracks.map((t, i) => `
        <div class="music-result" data-track-index="${i}">
          <img src="${t.artworkUrl60}" alt="" width="40" height="40" style="border-radius:6px;">
          <div class="music-result__info">
            <strong>${t.trackName}</strong>
            <span>${t.artistName}</span>
          </div>
          <button class="md-button md-button--primary" data-index="${i}">
            ▶ Escuchar
          </button>
        </div>
      `).join('');
    } catch (e) {
      console.error('[music] error búsqueda:', e);
      results.innerHTML = '<p>Error al buscar. Inténtalo de nuevo.</p>';
    }
  }

  // Reproducir una canción por índice
  function playTrack(index) {
    if (index < 0 || index >= playlist.length) return;
    currentIndex = index;
    player.src = playlist[index];
    player.load();
    player.play().catch(err => {
      console.error('[music] error reproducción:', err);
      // Si falla esta canción, saltar a la siguiente
      if (index + 1 < playlist.length) playTrack(index + 1);
    });
    highlightTrack(index);
  }

  // Resaltar visualmente la canción que está sonando
  function highlightTrack(index) {
    document.querySelectorAll('.music-result').forEach((el, i) => {
      el.classList.toggle('is-playing', i === index);
    });
  }

  // Al pulsar "Escuchar"
  results.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-index]');
    if (!btn) return;
    const index = parseInt(btn.dataset.index, 10);
    if (!isNaN(index)) playTrack(index);
  });

  // 🔑 AUTOPLAY: cuando termina una canción, saltar a la siguiente
  player.addEventListener('ended', () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < playlist.length) {
      playTrack(nextIndex);
    } else {
      // Era la última: quitar resaltado
      highlightTrack(-1);
      currentIndex = -1;
    }
  });

  // Si el usuario pausa, quitar resaltado (opcional)
  player.addEventListener('pause', () => {
    if (player.currentTime >= player.duration - 0.5) return; // Ignorar si terminó
    highlightTrack(-1);
    currentIndex = -1;
  });
});