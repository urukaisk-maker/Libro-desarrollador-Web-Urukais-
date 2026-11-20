---
description: "Chapter 21 of the Web Developer's Book: 21 — Web Components. Learn step by step with examples, exercises, and quizzes."
---
# 21 — Web Components

!!! abstract "What you will learn"
    - What Web Components are and why they exist.
    - Custom Elements: creating your own tags.
    - Shadow DOM: encapsulating styles and markup.
    - Templates and slots.
    - Component lifecycle.

---

## 🧩 What are Web Components?

**Web Components** are a set of native browser standards that let you create **reusable components** without needing frameworks. They work in all modern browsers.

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

!!! quote "Components without a framework"
    Web Components are the foundation of what React, Vue, or Svelte do, but native. They don't need a build step, dependencies, or updates.

---

## 🏷 Custom Elements

**Custom Elements** let you define custom HTML tags. The name must include a hyphen (`mi-componente`, `mi-boton`, `user-card`).

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

**Shadow DOM** encapsulates a component's markup and styles. What happens inside doesn't affect outside, and vice versa.

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

!!! tip "Benefits of Shadow DOM"
    - Styles don't leak out.
    - Outside styles don't affect the inside.
    - The component is completely encapsulated and reusable.

---

## 🔄 Lifecycle

| Method | When it runs |
| :--- | :--- |
| `constructor()` | When the element is created |
| `connectedCallback()` | When added to the DOM |
| `disconnectedCallback()` | When removed from the DOM |
| `attributeChangedCallback()` | When an attribute changes |
| `adoptedCallback()` | When moved to another document |

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

**Templates** let you define markup that is not rendered until cloned.

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

## 🕳 Slots

**Slots** let you inject content from outside the component.

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

## ✅ Best Practices

- ✅ Use **Shadow DOM** to encapsulate styles.
- ✅ Define **observed attributes** only for the ones you need.
- ✅ Use **slots** to allow customization.
- ✅ Document the component's attributes and events.
- ✅ Test the component in isolation.
- ❌ Don't overuse Web Components for everything: if it's simple, use native HTML.

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-21">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What must a Custom Element name include?</p>
<button class="quiz-option" data-opt="a">A) It must start with an uppercase letter</button>
<button class="quiz-option" data-opt="b">B) It must contain a hyphen</button>
<button class="quiz-option" data-opt="c">C) It must end with -element</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> What does Shadow DOM encapsulate?</p>
<button class="quiz-option" data-opt="a">A) The component's styles and markup</button>
<button class="quiz-option" data-opt="b">B) Only the styles</button>
<button class="quiz-option" data-opt="c">C) Only the scripts</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Which element lets you inject external content?</p>
<button class="quiz-option" data-opt="a">A) &lt;inject&gt;</button>
<button class="quiz-option" data-opt="b">B) &lt;content&gt;</button>
<button class="quiz-option" data-opt="c">C) &lt;slot&gt;</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2021%3A%20Web%20Components&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F21-web-components%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F21-web-components%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2021%3A%20Web%20Components%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F21-web-components%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/21-web-components/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 22 — Progressive Web Apps (PWA)](22-pwa.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }