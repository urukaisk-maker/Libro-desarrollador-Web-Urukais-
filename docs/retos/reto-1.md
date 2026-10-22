# 🎯 Reto #1: El botón camaleón

!!! quote "Reto de nivel principiante"
    Un botón que cambia de color cada vez que se pulsa, con una animación suave. Ideal para practicar eventos y manipulación de estilos.

---

## 🎯 Objetivo

Crea un botón que:

1. Cambie de color **cada vez que se pulse**.
2. Use una **transición suave** entre colores.
3. Muestre el número de veces que se ha pulsado.

## 🧠 Conceptos

- Eventos en JavaScript (\`addEventListener\`)
- Manipulación de estilos (\`element.style\`)
- Transiciones CSS

## 🖥️ Editor

<div class="playground-ejercicio" data-ejercicio="reto-1">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" data-lang="html" spellcheck="false"><button id="camaleon">¡Púlsame!</button>
<p id="contador">Pulsado 0 veces</p></textarea>
<textarea class="playground__textarea is-hidden" data-lang="css" spellcheck="false">body { font-family: system-ui; padding: 1.5rem; text-align: center; }
button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #6a5acd;
  transition: background .3s;
}
#contador { margin-top: 1rem; color: #666; }</textarea>
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
    let clicks = 0;
    const boton = document.getElementById('camaleon');
    const contador = document.getElementById('contador');

    boton.addEventListener('click', () => {
      clicks++;
      const hue = (clicks * 60) % 360;
      boton.style.background = 'hsl(' + hue + ', 70%, 55%)';
      contador.textContent = 'Pulsado ' + clicks + ' veces';
    });
    \`\`\`

## 🚀 Retos extra

- [ ] Que el color sea **aleatorio** en lugar de secuencial.
- [ ] Que el botón **crezca** ligeramente al pulsarlo.
- [ ] Que el contador se **guarde** en localStorage.

---

[← Volver a retos](../retos.md){ .md-button }
[🎯 Ir al Reto #2](reto-2.md){ .md-button .md-button--primary }
