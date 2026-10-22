# 🎯 Reto #2: Tarjeta de presentación

!!! quote "Reto de nivel principiante"
    Diseña una tarjeta de presentación personal con HTML y CSS, con modo oscuro y responsive. Ideal para practicar maquetación y variables CSS.

---

## 🎯 Objetivo

Crea una tarjeta de presentación con:

1. Foto de perfil, nombre y puesto.
2. Enlaces a redes sociales.
3. Botón de modo oscuro/claro.
4. Diseño responsive.

## 🧠 Conceptos

- HTML semántico
- CSS Grid o Flexbox
- Variables CSS
- Media queries

## 🖥️ Editor

<div class="playground-ejercicio" data-ejercicio="reto-2">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" data-lang="html" spellcheck="false"><div class="card">
  <div class="avatar">👤</div>
  <h2>Tu nombre</h2>
  <p class="role">Desarrollador frontend</p>
  <div class="social">
    <a href="#">GitHub</a>
    <a href="#">LinkedIn</a>
  </div>
  <button id="tema">🌙 Modo oscuro</button>
</div></textarea>
<textarea class="playground__textarea is-hidden" data-lang="css" spellcheck="false">body { font-family: system-ui; padding: 1.5rem; display: flex; justify-content: center; }
.card {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  max-width: 320px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0,0,0,.1);
}
.avatar { font-size: 4rem; }
h2 { margin: .5rem 0 .25rem; }
.role { color: #666; margin: 0 0 1rem; }
.social { display: flex; gap: 1rem; justify-content: center; margin-bottom: 1rem; }
.social a { color: #6a5acd; text-decoration: none; font-weight: 600; }
button { padding: .5rem 1rem; background: #6a5acd; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
body.dark { background: #1a1726; }
body.dark .card { background: #2a2342; color: #e8e5f5; }</textarea>
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
    document.getElementById('tema').addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
    \`\`\`

## 🚀 Retos extra

- [ ] Que la foto sea una **imagen real** con \`border-radius: 50%\`.
- [ ] Que el modo oscuro se **guarde** en localStorage.
- [ ] Que respete la preferencia del sistema con \`prefers-color-scheme\`.

---

[← Volver a retos](../retos.md){ .md-button }
[🎯 Ir al Reto #3](reto-3.md){ .md-button .md-button--primary }
