# Capítulo 21 — Web Components

## Introducción

Los **Web Components** son un conjunto de estándares nativos del navegador que permiten crear **componentes reutilizables y encapsulados** sin necesidad de frameworks.

Existen desde hace años, pero solo recientemente todos los navegadores modernos los soportan completamente. Hoy son una alternativa real a React, Vue o Svelte para ciertos casos.

## Los cuatro pilares

Los Web Components se construyen sobre cuatro especificaciones:

| Especificación | Qué hace |
|---|---|
| **Custom Elements** | Definir nuevas etiquetas HTML |
| **Shadow DOM** | Encapsular estilos y estructura |
| **HTML Templates** | Definir plantillas reutilizables |
| **ES Modules** | Cargar los componentes como módulos |

## Custom Elements

Puedes definir tus propias etiquetas HTML:

```javascript
class MiBoton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<button>Púlsame</button>';
  }
}

customElements.define('mi-boton', MiBoton);
```

Uso:

```html
<mi-boton></mi-boton>
```

Reglas:

- El nombre debe contener **un guion** (`mi-boton`, no `miboton`).
- No puede colisionar con etiquetas HTML estándar.
- Puede extender `HTMLElement` o clases más específicas (`HTMLButtonElement`, etc.).

## Ciclo de vida

Los Custom Elements tienen varios métodos que se ejecutan en momentos clave:

```javascript
class MiComponente extends HTMLElement {
  constructor() {
    super();
    // Se ejecuta al crear el elemento
    // NO accedas al DOM aquí todavía
  }

  connectedCallback() {
    // Se añade al DOM
    // Aquí SÍ puedes manipular
  }

  disconnectedCallback() {
    // Se quita del DOM
    // Limpia timers, listeners, etc.
  }

  attributeChangedCallback(nombre, viejo, nuevo) {
    // Un atributo observado cambia
  }

  static get observedAttributes() {
    return ['color', 'tamaño'];
  }
}
```

## Shadow DOM

El **Shadow DOM** encapsula la estructura y los estilos. Lo que pasa dentro no afecta al exterior, y viceversa.

```javascript
class Tarjeta extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .card {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1rem;
          font-family: system-ui, sans-serif;
        }
      </style>
      <div class="card">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('mi-tarjeta', Tarjeta);
```

Uso:

```html
<mi-tarjeta>
  <h2>Hola</h2>
  <p>Contenido dentro de la tarjeta.</p>
</mi-tarjeta>
```

!!! tip "Shadow DOM: open vs closed"
    - `mode: 'open'`: puedes acceder con `elemento.shadowRoot` desde fuera.
    - `mode: 'closed'`: `shadowRoot` es `null` desde fuera. Útil para encapsulación total, pero raro.

### Slots

`<slot>` permite inyectar contenido externo dentro del Shadow DOM.

```html
<div class="card">
  <header><slot name="titulo"></slot></header>
  <main><slot></slot></main>
  <footer><slot name="pie"></slot></footer>
</div>
```

Uso:

```html
<mi-tarjeta>
  <h2 slot="titulo">Mi título</h2>
  <p>Contenido principal.</p>
  <small slot="pie">2026</small>
</mi-tarjeta>
```

### Estilos de slots

```css
::slotted(h2) {
  color: #6a5acd;
  margin: 0;
}
```

## HTML Templates

Los `<template>` contienen HTML que **no se renderiza** hasta que se clona explícitamente. Perfecto para estructuras complejas.

```html
<template id="tarjeta-template">
  <style>
    .card {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 1rem;
    }
  </style>
  <div class="card">
    <h3 class="titulo"></h3>
    <p class="contenido"></p>
  </div>
</template>
```

```javascript
class Tarjeta extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('tarjeta-template');
    const clone = template.content.cloneNode(true);
    this.attachShadow({ mode: 'open' }).appendChild(clone);
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.titulo').textContent =
      this.getAttribute('titulo') || 'Sin título';
  }
}
```

## Atributos y propiedades

### Leer atributos

```javascript
connectedCallback() {
  this.color = this.getAttribute('color') || '#6a5acd';
}

static get observedAttributes() {
  return ['color'];
}

attributeChangedCallback(nombre, viejo, nuevo) {
  if (nombre === 'color') this.actualizarColor(nuevo);
}
```

### Propiedades con getters/setters

```javascript
class Contador extends HTMLElement {
  #valor = 0;

  get valor() { return this.#valor; }
  set valor(v) {
    this.#valor = v;
    this.actualizar();
  }
}
```

## Eventos personalizados

Los componentes pueden emitir eventos que el exterior escucha.

```javascript
class MiBoton extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('mi-boton-click', {
        detail: { id: this.dataset.id },
        bubbles: true,
        composed: true, // atraviesa el Shadow DOM
      }));
    });
  }
}
```

Uso:

```html
<mi-boton data-id="42"></mi-boton>
<script>
  document.querySelector('mi-boton').addEventListener('mi-boton-click', (e) => {
    console.log('Clic en', e.detail.id);
  });
</script>
```

!!! warning "bubbles y composed"
    - `bubbles: true` → el evento sube por el DOM.
    - `composed: true` → el evento atraviesa el Shadow DOM.
    
    Sin `composed`, los eventos no salen del shadow root.

## Ejemplo completo: contador reutilizable

```javascript
class Contador extends HTMLElement {
  #valor = 0;
  #step = 1;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: system-ui, sans-serif;
        }
        button {
          background: #6a5acd;
          color: white;
          border: none;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1rem;
        }
        button:hover { background: #5b4bc4; }
        .valor {
          min-width: 2ch;
          text-align: center;
          font-weight: 700;
          font-size: 1.25rem;
        }
      </style>
      <button id="menos" aria-label="Decrementar">−</button>
      <span class="valor">${this.#valor}</span>
      <button id="mas" aria-label="Incrementar">+</button>
    `;

    this.shadowRoot.getElementById('mas')
      .addEventListener('click', () => this.#cambiar(this.#step));
    this.shadowRoot.getElementById('menos')
      .addEventListener('click', () => this.#cambiar(-this.#step));
  }

  get valor() { return this.#valor; }
  set valor(v) {
    this.#valor = v;
    this.#render();
  }

  #cambiar(delta) {
    this.#valor += delta;
    this.#render();
    this.dispatchEvent(new CustomEvent('cambio', {
      detail: { valor: this.#valor },
      bubbles: true,
      composed: true,
    }));
  }

  #render() {
    this.shadowRoot.querySelector('.valor').textContent = this.#valor;
  }
}

customElements.define('mi-contador', Contador);
```

Uso:

```html
<mi-contador></mi-contador>
<mi-contador></mi-contador>
<script>
  document.querySelectorAll('mi-contador').forEach(c => {
    c.addEventListener('cambio', (e) => console.log('Nuevo valor:', e.detail.valor));
  });
</script>
```

## Cuándo usar Web Components

### ✅ Úsalos cuando

- Necesitas componentes **reutilizables entre frameworks**.
- Diseñas una **librería de UI** que otros consumirán.
- Quieres **encapsulación real** sin dependencias externas.
- Construyes un **widget embebible** en webs de terceros.

### ❌ Evítalos cuando

- Trabajas con un framework que ya tiene su propio sistema de componentes.
- Necesitas SSR (server-side rendering) complejo.
- Requieres reactividad automática (prueba Lit o Stencil).

## Librerías recomendadas

- **[Lit](https://lit.dev/)** — la más popular, minimalista, con reactividad.
- **[Stencil](https://stenciljs.com/)** — compilador que genera Web Components optimizados.
- **[FAST](https://www.fast.design/)** — de Microsoft.
- **[Shoelace](https://shoelace.style/)** — librería de componentes ya hecha.

### Ejemplo con Lit

```javascript
import { LitElement, html, css } from 'lit';

class MiTarjeta extends LitElement {
  static properties = {
    titulo: { type: String },
  };

  static styles = css`
    .card {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 1rem;
    }
  `;

  render() {
    return html`
      <div class="card">
        <h3>${this.titulo}</h3>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('mi-tarjeta', MiTarjeta);
```

## Buenas prácticas

- **Prefijo en el nombre** para evitar colisiones: `urukais-boton`.
- **Documenta atributos y eventos** de cada componente.
- **Usa Shadow DOM** para encapsular estilos.
- **Emite eventos con `composed: true`** si quieres que salgan.
- **Limpia en `disconnectedCallback`** (timers, observers, listeners).
- **Usa Lit** si necesitas reactividad.
- **Publica como módulos ES** para que otros puedan importarlos.
- **Testea con `@open-wc/testing`**.

## Ejercicios

1. Crea un Web Component `<mi-saludo nombre="Urukais">` que muestre "Hola, Urukais".
2. Añade un `<slot>` y pruébalo con contenido externo.
3. Implementa un contador con botones y evento `cambio`.
4. Crea una tarjeta con Shadow DOM y estilos encapsulados.
5. Añade `observedAttributes` y reacciona a cambios de atributos.
6. Convierte un componente Vue/React en Web Component.
7. Publica tus componentes como módulo ES en npm.

---

⬅️ [Capítulo 20 — DevOps para frontend](20-devops.md) | ➡️ [Capítulo 22 — Progressive Web Apps](22-pwa.md)
---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz-container" data-correct="b">
  <p class="quiz-question">¿Qué API del navegador permite encapsular estilos y estructura en un componente?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) Web Workers</button>
    <button class="quiz-option" data-option="b">B) Shadow DOM</button>
    <button class="quiz-option" data-option="c">C) Service Workers</button>
  </div>
  <div class="quiz-feedback"></div>
</div>

<div class="quiz-container" data-correct="c">
  <p class="quiz-question">¿Qué método se usa para definir una nueva etiqueta HTML personalizada?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) document.createElement()</button>
    <button class="quiz-option" data-option="b">B) HTMLElement.register()</button>
    <button class="quiz-option" data-option="c">C) customElements.define()</button>
  </div>
  <div class="quiz-feedback"></div>
</div>