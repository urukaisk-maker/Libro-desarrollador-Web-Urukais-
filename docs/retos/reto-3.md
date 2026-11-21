---
description: "Reto 3: Contador de clics. Practica tus habilidades de desarrollo web con este desafío del Libro del Desarrollador Web."
---
# 🎯 Reto #3: Contador de clics

!!! quote "Reto de nivel principiante"
    Un contador que persiste en localStorage, con botones para incrementar, decrementar y resetear. Ideal para practicar estado y persistencia.

---

## 🎯 Objetivo

Crea un contador con:

1. Botón **+1** y botón **-1**.
2. Botón de **reset**.
3. Persistencia con **localStorage**.
4. Que no baje de 0.

## 🧠 Conceptos

- Variables y estado
- localStorage
- Eventos

## 🖥️ Editor

<div class="playground-ejercicio" data-ejercicio="reto-3">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" data-lang="html" spellcheck="false"><h2 id="numero">0</h2>
<button id="mas">+1</button>
<button id="menos">−1</button>
<button id="reset">Reset</button></textarea>
<textarea class="playground__textarea is-hidden" data-lang="css" spellcheck="false">body { font-family: system-ui; padding: 1.5rem; text-align: center; }
h2 { font-size: 4rem; color: #6a5acd; margin: 0 0 1rem; }
button { padding: .75rem 1.5rem; font-size: 1rem; margin: .25rem; border: none; border-radius: 6px; cursor: pointer; background: #6a5acd; color: #fff; }
#reset { background: #dc3545; }</textarea>
<textarea class="playground__textarea is-hidden" data-lang="js" spellcheck="false">// Tu código aquí
</textarea>
<div class="playground__actions">
<button class="md-button md-button--primary" data-run>▶ Ejecutar</button>
</div>
</div>
<div class="playground__output">
<iframe data-output sandbox="allow-scripts allow-modals"></iframe>
</div>
</div>

## 💡 Pistas progresivas


??? tip "Pista 1 — Hidrata el estado desde `localStorage`"

    Al cargar el script, lee la clave guardada en `localStorage` (convirtiéndola con `Number(...)` y con valor por defecto `0`) y muestra ese número en `#numero`.


??? tip "Pista 2 — Protege el límite inferior en `-1`"

    Antes de restar en `#menos`, comprueba `if (count > 0)` para que el contador nunca baje de `0`, y en `#reset` devuelve el contador a `0`.


??? tip "Pista 3 — Guarda cada cambio en `localStorage`"

    Cada vez que cambie `count` (`+1`, `-1` o `reset`), actualiza `#numero.textContent` y guarda el nuevo valor en `localStorage.setItem(...)`.

## ✅ Checklist de comprobación


- [ ] Los botones `+1`, `-1` y `Reset` actualizan `#numero` y persisten el valor en `localStorage` al recargar.

- [ ] El contador nunca baja de `0` al pulsar `-1`.

- [ ] No hay errores en consola y el estado inicial se carga de forma fiable.
