// music-search.js — Buscador de música con iTunes + proxy + reproductor custom
// + ecualizador + historial de búsquedas
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('music-search-input');
  const results = document.getElementById('music-search-results');
  const player = document.getElementById('music-search-player');
  const playerBox = document.getElementById('music-player');
  const artwork = document.getElementById('player-artwork');
  const title = document.getElementById('player-title');
  const artist = document.getElementById('player-artist');
  const btnPrev = document.getElementById('player-prev');
  const btnPlay = document.getElementById('player-play');
  const btnNext = document.getElementById('player-next');
  const seek = document.getElementById('player-seek');
  const timeCurrent = document.getElementById('player-current');
  const timeDuration = document.getElementById('player-duration');
  const historyEl = document.getElementById('music-history');

  if (!input || !results || !player) return;

  const AUDIO_PROXY = 'https://urukais-ai-proxy.urukaisk.workers.dev/audio-proxy';
  const HISTORY_KEY = 'uru-music-history';
  const HISTORY_MAX = 6;

  let timeout = null;
  let playlist = [];
  let currentIndex = -1;

  // ---------- Historial de búsquedas ----------
  function getHistory() {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  function saveHistory(query) {
    const q = query.trim();
    if (!q) return;
    const history = getHistory().filter(item => item.toLowerCase() !== q.toLowerCase());
    history.unshift(q);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, HISTORY_MAX)));
    renderHistory();
  }

  function clearHistory() {
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
  }

  function renderHistory() {
    if (!historyEl) return;
    const history = getHistory();
    if (!history.length) {
      historyEl.innerHTML = '';
      return;
    }
    historyEl.innerHTML = `
      <span class="music-history__label">Recientes:</span>
      ${history.map(q => `<button class="music-history__chip" data-history="${q.replace(/"/g, '&quot;')}">${q}</button>`).join('')}
      <button class="music-history__clear" data-clear-history>Limpiar</button>
    `;
  }

  if (historyEl) {
    historyEl.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-history]');
      if (chip) {
        input.value = chip.dataset.history;
        input.dispatchEvent(new Event('input'));
        return;
      }
      if (e.target.closest('[data-clear-history]')) {
        clearHistory();
      }
    });
    renderHistory();
  }

  // ---------- Utilidades ----------
  const fmt = (s) => {
    if (!isFinite(s) || s < 0) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  // ---------- Buscar ----------
  input.addEventListener('input', () => {
    clearTimeout(timeout);
    const q = input.value.trim();
    if (q.length < 2) {
      results.innerHTML = '';
      playlist = [];
      currentIndex = -1;
      return;
    }
    timeout = setTimeout(() => searchiTunes(q), 400);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      clearTimeout(timeout);
      const q = input.value.trim();
      if (q.length >= 2) {
        saveHistory(q);
        searchiTunes(q);
      }
    }
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

      playlist = tracks.map(t => ({
        preview: `${AUDIO_PROXY}?url=${encodeURIComponent(t.previewUrl)}`,
        title: t.trackName,
        artist: t.artistName,
        artwork: t.artworkUrl100 || t.artworkUrl60
      }));
      currentIndex = -1;

      results.innerHTML = tracks.map((t, i) => `
        <div class="music-result" data-track-index="${i}">
          <img src="${t.artworkUrl60}" alt="" width="40" height="40" style="border-radius:6px;">
          <div class="music-result__info">
            <strong>${t.trackName}</strong>
            <span>${t.artistName}</span>
          </div>
          <button class="md-button md-button--primary" data-index="${i}">▶ Escuchar</button>
        </div>
      `).join('');
    } catch (e) {
      console.error('[music] error búsqueda:', e);
      results.innerHTML = '<p>Error al buscar. Inténtalo de nuevo.</p>';
    }
  }

  // ---------- Reproducir ----------
  function playTrack(index) {
    if (index < 0 || index >= playlist.length) return;
    currentIndex = index;
    const track = playlist[index];

    player.src = track.preview;
    player.load();
    player.play().catch(err => {
      console.error('[music] error reproducción:', err);
    });

    title.textContent = track.title;
    artist.textContent = track.artist;
    artwork.src = track.artwork;
    artwork.alt = track.title;
    playerBox.classList.add('is-playing');
    highlightTrack(index);
  }

  function highlightTrack(index) {
    document.querySelectorAll('.music-result').forEach((el, i) => {
      el.classList.toggle('is-playing', i === index);
    });
  }

  // ---------- Controles ----------
  btnPlay.addEventListener('click', () => {
    if (currentIndex === -1 && playlist.length) {
      playTrack(0);
      return;
    }
    if (player.paused) player.play();
    else player.pause();
  });

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) playTrack(currentIndex - 1);
    else if (currentIndex === 0) playTrack(0);
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < playlist.length - 1) playTrack(currentIndex + 1);
  });

  // ---------- Eventos del <audio> ----------
  player.addEventListener('play', () => {
    btnPlay.textContent = '⏸';
    playerBox.classList.add('is-playing');
  });

  player.addEventListener('pause', () => {
    btnPlay.textContent = '▶';
    playerBox.classList.remove('is-playing');
  });

  player.addEventListener('loadedmetadata', () => {
    timeDuration.textContent = fmt(player.duration);
    seek.max = player.duration || 100;
  });

  player.addEventListener('timeupdate', () => {
    timeCurrent.textContent = fmt(player.currentTime);
    if (!seek.matches(':active')) {
      seek.value = player.currentTime;
    }
  });

  player.addEventListener('ended', () => {
    const next = currentIndex + 1;
    if (next < playlist.length) playTrack(next);
    else {
      highlightTrack(-1);
      currentIndex = -1;
      btnPlay.textContent = '▶';
      playerBox.classList.remove('is-playing');
    }
  });

  // Seek
  seek.addEventListener('input', () => {
    if (player.duration) player.currentTime = parseFloat(seek.value);
  });

  // Click en resultado
  results.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-index]');
    if (!btn) return;
    const index = parseInt(btn.dataset.index, 10);
    if (!isNaN(index)) playTrack(index);
  });
});