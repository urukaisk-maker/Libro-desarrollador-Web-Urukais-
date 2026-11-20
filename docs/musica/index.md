# 🎵 Música para programar

!!! quote "La banda sonora del desarrollador"
    Programar con música es una práctica muy común. Hay quien prefiere silencio absoluto, pero muchos encontramos en ciertos géneros el **foco perfecto** para entrar en estado de flow.

---

## 🔍 Buscar música (preview 30s)

Escribe el nombre de una canción o artista y pulsa **▶ Escuchar** para reproducir un preview de 30 segundos.

<div id="music-search-widget">

<input type="text" id="music-search-input" placeholder="Busca una canción o artista…" class="music-search-input" autocomplete="off">

<div id="music-history" class="music-history"></div>

<div id="music-search-results" class="music-results"></div>

<div class="music-player" id="music-player">
  <div class="music-player__artwork">
    <img id="player-artwork" src="" alt="" width="56" height="56">
  </div>
  <div class="music-player__info">
    <strong id="player-title">Sin reproducción</strong>
    <span id="player-artist">Busca una canción para empezar</span>
  </div>
  <div class="music-player__equalizer" id="player-equalizer">
    <span></span><span></span><span></span><span></span><span></span>
  </div>
  <div class="music-player__controls">
    <button id="player-prev" class="music-player__btn" aria-label="Anterior">⏮</button>
    <button id="player-play" class="music-player__btn music-player__btn--play" aria-label="Reproducir">▶</button>
    <button id="player-next" class="music-player__btn" aria-label="Siguiente">⏭</button>
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

## 🎯 ¿Qué música elegir según la tarea?

| Tarea | Género recomendado |
| :--- | :--- |
| **Escribir código nuevo** | Lo-fi hip hop, jazz |
| **Refactorizar** | Synthwave, electrónica |
| **Depurar errores** | Silencio o ruido blanco |
| **Leer documentación** | Clásica, ambient |
| **Diseñar** | Bandas sonoras de videojuegos |
| **Estudiar** | Lo-fi, piano suave |

!!! tip "El truco del flow"
    La música con **letra** distrae cuando estás leyendo o escribiendo código. Para tareas que requieren concentración profunda, elige música **instrumental**.

---

## 🎧 Playlists de la comunidad

¿Tienes una playlist que te funciona? Compártela en los [Retos de la comunidad](../retos-comunidad.md) o abre un [issue en GitHub](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues).

---

## 📚 Recursos

- [Music for Programming (web)](https://musicforprogramming.net/)
- [Focus at Will (ciencia del focus)](https://www.focusatwill.com/)
- [Lofi Girl (YouTube)](https://www.youtube.com/@LofiGirl)
- [Synthwave Radio (YouTube)](https://www.youtube.com/@ThePrimeThanatos)

---

## 🧠 Quiz

!!! question "Comprueba lo aprendido"

??? success "1. ¿Qué tipo de música es mejor para concentrarse?"
    Música **instrumental** (sin letra). La letra distrae cuando estás leyendo o escribiendo código.

??? success "2. ¿Por qué las bandas sonoras de videojuegos son buenas para programar?"
    Porque están **diseñadas para no distraer** al jugador, que debe concentrarse en la tarea principal. Eso las hace perfectas para el trabajo cognitivo.

??? success "3. ¿Qué género es el más popular para programar?"
    El **lo-fi hip hop**. Ritmo constante, sin voces, y hay infinitas horas de contenido.

---

➡️ Volver a la [portada](../index.md)