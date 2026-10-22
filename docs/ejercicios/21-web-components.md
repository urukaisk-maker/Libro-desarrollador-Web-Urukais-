# 21 — Web Components

!!! quote "Ejercicio resuelto"
    Crea un componente nativo con Custom Elements y Shadow DOM.

---

## 🎯 Objetivo

Crea un componente \`<mi-tarjeta>\` que:

1. Use Shadow DOM para encapsular estilos.
2. Reciba un atributo \`titulo\`.
3. Use un \`<slot>\` para el contenido.

---

## 💡 Solución

\`\`\`javascript
class MiTarjeta extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = \`
      <style>
        .card {
          background: #6a5acd;
          color: white;
          padding: 1rem;
          border-radius: 8px;
        }
      </style>
      <div class="card">
        <h3>${this.getAttribute('titulo') || 'Tarjeta'}</h3>
        <slot></slot>
      </div>
    \`;
  }
}

customElements.define('mi-tarjeta', MiTarjeta);
\`\`\`

\`\`\`html
<mi-tarjeta titulo="Hola">Contenido del slot</mi-tarjeta>
\`\`\`

---

## 🧠 Conceptos clave

- \`attachShadow({ mode: 'open' })\`: crea el Shadow DOM.
- \`<slot>\`: inyecta contenido externo.
- \`customElements.define()\`: registra el componente.
- Los estilos del Shadow DOM no se filtran fuera.

---

## 🚀 Retos extra

- [ ] Añade un atributo observado con \`observedAttributes\`.
- [ ] Añade un evento personalizado al hacer clic.
- [ ] Usa un \`<template>\` para el markup.

---

[← Ejercicio 20](20-devops.md){ .md-button }
[Ir al ejercicio 22 →](22-pwa.md){ .md-button .md-button--primary }
