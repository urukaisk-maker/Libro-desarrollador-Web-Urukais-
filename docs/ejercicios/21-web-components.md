# Ejercicios resueltos — Capítulo 21

[Volver al índice](index.md) · [Capítulo original](../capitulos/21-web-components.md)

## Ejercicio 1: `<mi-saludo>`

> Crea un Web Component `<mi-saludo nombre="Urukais">`.

### Solución

```javascript
class MiSaludo extends HTMLElement {
  connectedCallback() {
    const nombre = this.getAttribute('nombre') || 'mundo';
    this.textContent = `Hola, ${nombre}`;
  }
}

customElements.define('mi-saludo', MiSaludo);
```

```html
<mi-saludo nombre="Urukais"></mi-saludo>
```

---

## Ejercicio 2: Añadir `<slot>`

> Añade un `<slot>` y pruébalo con contenido externo.

### Solución

```javascript
class MiTarjeta extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .card {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1rem;
        }
        header { font-weight: 700; color: #6a5acd; }
      </style>
      <div class="card">
        <header><slot name="titulo"></slot></header>
        <main><slot></slot></main>
      </div>
    `;
  }
}

customElements.define('mi-tarjeta', MiTarjeta);
```

```html
<mi-tarjeta>
  <h2 slot="titulo">Título</h2>
  <p>Contenido principal.</p>
</mi-tarjeta>
```

---

## Ejercicio 3: Contador con evento `cambio`

> Implementa un contador con botones y evento `cambio`.

### Solución

```javascript
class MiContador extends HTMLElement {
  #valor = 0;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-flex; align-items: center; gap: 0.5rem; font-family: system-ui; }
        button { width: 2rem; height: 2rem; border: none; border-radius: 50%; background: #6a5acd; color: white; cursor: pointer; }
        span { font-weight: 700; min-width: 2ch; text-align: center; }
      </style>
      <button id="menos">−</button>
      <span id="valor">0</span>
      <button id="mas">+</button>
    `;

    this.shadowRoot.getElementById('mas').addEventListener('click', () => this.#cambiar(1));
    this.shadowRoot.getElementById('menos').addEventListener('click', () => this.#cambiar(-1));
  }

  #cambiar(delta) {
    this.#valor += delta;
    this.shadowRoot.getElementById('valor').textContent = this.#valor;
    this.dispatchEvent(new CustomEvent('cambio', {
      detail: { valor: this.#valor },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('mi-contador', MiContador);
```

```html
<mi-contador></mi-contador>
<script>
  document.querySelector('mi-contador').addEventListener('cambio', (e) => {
    console.log('Nuevo valor:', e.detail.valor);
  });
</script>
```

---

## Ejercicio 4: Tarjeta con Shadow DOM encapsulado

> Crea una tarjeta con estilos encapsulados.

### Solución

```javascript
class MiCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        /* Estos estilos NO afectan al exterior */
        .card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          font-family: system-ui, sans-serif;
        }
        h3 { margin: 0 0 0.5rem; color: #6a5acd; }
      </style>
      <div class="card">
        <h3><slot name="titulo">Sin título</slot></h3>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('mi-card', MiCard);
```

---

## Ejercicio 5: `observedAttributes`

> Añade `observedAttributes` y reacciona a cambios de atributos.

### Solución

```javascript
class MiCaja extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'size'];
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<div class="box"><slot></slot></div>`;
    this.#aplicar();
  }

  attributeChangedCallback(nombre, viejo, nuevo) {
    if (viejo !== nuevo && this.shadowRoot) this.#aplicar();
  }

  #aplicar() {
    const color = this.getAttribute('color') || '#6a5acd';
    const size = this.getAttribute('size') || '1rem';
    const box = this.shadowRoot.querySelector('.box');
    box.style.border = `2px solid ${color}`;
    box.style.padding = size;
    box.style.borderRadius = '8px';
  }
}

customElements.define('mi-caja', MiCaja);
```

```html
<mi-caja color="#22d3ee" size="1.5rem">Contenido</mi-caja>
```

Cambia el atributo desde devtools y verás que se actualiza solo.

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/21-web-components.md)
