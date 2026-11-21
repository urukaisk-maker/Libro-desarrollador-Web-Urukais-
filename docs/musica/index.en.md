# 🎵 Music for Coding

!!! quote "The developer soundtrack"
    Coding with music is a common habit. Some prefer total silence, while many of us find the right **focus zone** in certain genres to get into a flow state.

---

## 🔍 Search music (30s preview)

Type a song or artist name and click **▶ Listen** to play a 30-second preview.

<div id="music-search-widget">

<input type="text" id="music-search-input" placeholder="Search for a song or artist…" class="music-search-input" autocomplete="off">

<div id="music-history" class="music-history"></div>

<div id="music-search-results" class="music-results"></div>

<div class="music-player" id="music-player">
  <div class="music-player__artwork">
    <img id="player-artwork" src="" alt="" width="56" height="56">
  </div>
  <div class="music-player__info">
    <strong id="player-title">Not playing</strong>
    <span id="player-artist">Search for a track to get started</span>
  </div>
  <div class="music-player__equalizer" id="player-equalizer">
    <span></span><span></span><span></span><span></span><span></span>
  </div>
  <div class="music-player__controls">
    <button id="player-prev" class="music-player__btn" aria-label="Previous">⏮</button>
    <button id="player-play" class="music-player__btn music-player__btn--play" aria-label="Play">▶</button>
    <button id="player-next" class="music-player__btn" aria-label="Next">⏭</button>
  </div>
  <div class="music-player__progress">
    <span id="player-current">0:00</span>
    <input type="range" id="player-seek" min="0" max="100" value="0" step="0.1">
    <span id="player-duration">0:00</span>
  </div>
  <audio id="music-search-player" crossorigin="anonymous" preload="metadata"></audio>
</div>

</div>

---

## 🎯 What music to pick by task

| Task | Recommended genre |
| :--- | :--- |
| **Writing new code** | Lo-fi hip hop, jazz |
| **Refactoring** | Synthwave, electronic |
| **Debugging errors** | Silence or white noise |
| **Reading documentation** | Classical, ambient |
| **Designing** | Video game soundtracks |
| **Studying** | Lo-fi, soft piano |

!!! tip "The flow trick"
    Music with **lyrics** can be distracting while reading or writing code. For tasks that demand deep focus, go for **instrumental** music.

---

## 🎧 Community playlists

Have a playlist that works well for you? Share it in [Community Challenges](../retos-comunidad.md) or open an [issue on GitHub](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues).

---

## 📚 Resources

- [Music for Programming (web)](https://musicforprogramming.net/)
- [Focus at Will (focus science)](https://www.focusatwill.com/)
- [Lofi Girl (YouTube)](https://www.youtube.com/@LofiGirl)
- [Synthwave Radio (YouTube)](https://www.youtube.com/@ThePrimeThanatos)

---

## 🧠 Quiz

!!! question "Check what you learned"

    ??? success "1. What kind of music works best for focus?"
        **Instrumental** music (no lyrics). Lyrics compete for attention when you are reading or writing code.

    ??? success "2. Why are video game soundtracks great for coding?"
        Because they are **designed not to distract** the player, who needs to stay focused on the main task. That makes them ideal for cognitive work.

    ??? success "3. What genre is most popular for coding?"
        **Lo-fi hip hop**. Steady rhythm, no vocals, and hours upon hours of tracks available.

---

➡ Back to the [home page](../index.md)
