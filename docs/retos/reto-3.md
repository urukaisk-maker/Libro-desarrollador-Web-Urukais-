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

??? success "Solución"
    \`\`\`javascript
    let count = Number(localStorage.getItem('reto3') || 0);
    const num = document.getElementById('numero');
    num.textContent = count;

    document.getElementById('mas').addEventListener('click', () => {
      count++;
      num.textContent = count;
      localStorage.setItem('reto3', count);
    });

    document.getElementById('menos').addEventListener('click', () => {
      if (count > 0) count--;
      num.textContent = count;
      localStorage.setItem('reto3', count);
    });

    document.getElementById('reset').addEventListener('click', () => {
      count = 0;
      num.textContent = count;
      localStorage.setItem('reto3', count);
    });
    \`\`\`

## 🚀 Retos extra

- [ ] Que el número cambie de **color** según sea positivo, negativo o cero.
- [ ] Que se pueda **escribir** un número directamente en un input.
- [ ] Que haya un **historial** de cambios.

---

[← Volver a retos](../retos.md){ .md-button }
[🎯 Ir al Reto #4](reto-4.md){ .md-button .md-button--primary }
