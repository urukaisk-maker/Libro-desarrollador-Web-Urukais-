# 21 — Web Components

!!! abstract "Qué vas a aprender"
    - Qué son los Web Components y por qué existen.
    - Custom Elements: crear etiquetas propias.
    - Shadow DOM: encapsular estilos y markup.
    - Templates y slots.
    - Ciclo de vida de un componente.

---

## 🧩 ¿Qué son los Web Components?

Los **Web Components** son un conjunto de estándares nativos del navegador que permiten crear **componentes reutilizables** sin necesidad de frameworks. Funcionan en todos los navegadores modernos.

```javascript
class MiBoton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button>${this.textContent}</button>`;
  }
}
customElements.define("mi-boton", MiBoton);
```

```html
<mi-boton>Haz clic</mi-boton>
```

!!! quote "Componentes sin framework"
    Los Web Components son la base de lo que hacen React, Vue o Svelte, pero nativos. No necesitan build, ni dependencias, ni actualizaciones.

---

## 🏷️ Custom Elements

Los **Custom Elements** permiten definir etiquetas HTML propias. El nombre debe llevar un guion (`mi-componente`, `mi-boton`, `user-card`).

```javascript
class UserCard extends HTMLElement {
  connectedCallback() {
    const nombre = this.getAttribute("nombre") || "Anónimo";
    this.innerHTML = `
      <div class="card">
        <h3>${nombre}</h3>
        <p>Usuario</p>
      </div>
    `;
  }
}

customElements.define("user-card", UserCard);
```

```html
<user-card nombre="Ana"></user-card>
<user-card nombre="Luis"></user-card>
```

---

## 🌑 Shadow DOM

El **Shadow DOM** encapsula el markup y los estilos de un componente. Lo que pasa dentro no afecta fuera, y viceversa.

```javascript
class MiTarjeta extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        .card {
          background: #6a5acd;
          color: white;
          padding: 1rem;
          border-radius: 8px;
        }
      </style>
      <div class="card">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("mi-tarjeta", MiTarjeta);
```

```html
<mi-tarjeta>Contenido dentro del slot</mi-tarjeta>
```

!!! tip "Ventajas del Shadow DOM"
    - Los estilos no se filtran fuera.
    - Los estilos de fuera no afectan dentro.
    - El componente es completamente encapsulado y reutilizable.

---

## 🔄 Ciclo de vida

| Método | Cuándo se ejecuta |
| :--- | :--- |
| `constructor()` | Al crear el elemento |
| `connectedCallback()` | Al añadirse al DOM |
| `disconnectedCallback()` | Al quitarse del DOM |
| `attributeChangedCallback()` | Al cambiar un atributo |
| `adoptedCallback()` | Al moverse a otro documento |

```javascript
class MiComponente extends HTMLElement {
  static get observedAttributes() {
    return ["nombre"];
  }

  connectedCallback() {
    console.log("Montado");
  }

  disconnectedCallback() {
    console.log("Desmontado");
  }

  attributeChangedCallback(nombre, viejo, nuevo) {
    console.log(`Atributo ${nombre}: ${viejo} -> ${nuevo}`);
  }
}
```

---

## 📄 Templates

Los **templates** permiten definir markup que no se renderiza hasta que se clona.

```html
<template id="mi-template">
  <style>
    .card { padding: 1rem; background: #6a5acd; color: white; }
  </style>
  <div class="card">
    <h3>Tarjeta</h3>
  </div>
</template>
```

```javascript
class MiTarjeta extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById("mi-template");
    const clone = template.content.cloneNode(true);
    this.attachShadow({ mode: "open" }).appendChild(clone);
  }
}
customElements.define("mi-tarjeta", MiTarjeta);
```

---

## 🕳️ Slots

Los **slots** permiten inyectar contenido desde fuera del componente.

```html
<template id="card-template">
  <div class="card">
    <header><slot name="titulo">Título por defecto</slot></header>
    <main><slot>Contenido por defecto</slot></main>
  </div>
</template>

<mi-card>
  <span slot="titulo">Mi título</span>
  <p>Contenido personalizado</p>
</mi-card>
```

---

## ✅ Buenas prácticas

- ✅ Usa **Shadow DOM** para encapsular estilos.
- ✅ Define **atributos observados** solo para los que necesites.
- ✅ Usa **slots** para permitir personalización.
- ✅ Documenta los atributos y eventos del componente.
- ✅ Prueba el componente en aislamiento.
- ❌ No abuses de Web Components para todo: si es simple, HTML nativo.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-21">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué nombre debe tener un Custom Element?</p>
<button class="quiz-option" data-opt="a">A) Debe empezar por mayúscula</button>
<button class="quiz-option" data-opt="b">B) Debe contener un guion</button>
<button class="quiz-option" data-opt="c">C) Debe terminar en -element</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué encapsula el Shadow DOM?</p>
<button class="quiz-option" data-opt="a">A) Estilos y markup del componente</button>
<button class="quiz-option" data-opt="b">B) Solo los estilos</button>
<button class="quiz-option" data-opt="c">C) Solo los scripts</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué elemento permite inyectar contenido externo?</p>
<button class="quiz-option" data-opt="a">A) &lt;inject&gt;</button>
<button class="quiz-option" data-opt="b">B) &lt;content&gt;</button>
<button class="quiz-option" data-opt="c">C) &lt;slot&gt;</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2021%3A%20Web%20Components&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F21-web-components%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F21-web-components%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2021%3A%20Web%20Components%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F21-web-components%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/21-web-components/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 22 — Progressive Web Apps (PWA)](22-pwa.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
