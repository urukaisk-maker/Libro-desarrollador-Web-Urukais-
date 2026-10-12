# Ejercicios resueltos — Capítulo 13

[Volver al índice](index.md) · [Capítulo original](../capitulos/13-modulos-bundlers.md)

## Ejercicio 1: Crear un proyecto con Vite

> Crea un proyecto con `npm create vite@latest` y añade un módulo propio.

### Solución

```bash
npm create vite@latest mi-app -- --template vanilla
cd mi-app
npm install
npm run dev
```

Crea `src/saludo.js`:

```javascript
export function saludar(nombre) {
  return `Hola, ${nombre}`;
}
```

Y en `src/main.js`:

```javascript
import { saludar } from './saludo.js';
document.querySelector('#app').innerHTML = `<h1>${saludar('Urukais')}</h1>`;
```

---

## Ejercicio 2: Named exports

> Exporta dos funciones y un valor con named exports.

### Solución

```javascript
// utilidades.js
export const VERSION = '1.0.0';

export function sumar(a, b) {
  return a + b;
}

export function restar(a, b) {
  return a - b;
}
```

```javascript
// main.js
import { VERSION, sumar, restar } from './utilidades.js';

console.log(VERSION); // '1.0.0'
console.log(sumar(2, 3)); // 5
console.log(restar(5, 2)); // 3
```

---

## Ejercicio 3: Import dinámico

> Usa import dinámico para cargar un módulo solo al pulsar un botón.

### Solución

```html
<button id="btn">Abrir modal</button>

<script>
  document.getElementById('btn').addEventListener('click', async () => {
    const { abrirModal } = await import('./modal.js');
    abrirModal('¡Hola desde el modal!');
  });
</script>
```

```javascript
// modal.js
export function abrirModal(mensaje) {
  const div = document.createElement('div');
  div.className = 'modal';
  div.innerHTML = `
    <div class="modal-content">
      <p>${mensaje}</p>
      <button onclick="this.closest('.modal').remove()">Cerrar</button>
    </div>
  `;
  document.body.appendChild(div);
}
```

---

## Ejercicio 4: Instalar dependencias

> Añade `axios` como dependencia y `vitest` como dev-dependency.

### Solución

```bash
npm install axios
npm install -D vitest
```

Comprueba el `package.json`:

```json
{
  "dependencies": {
    "axios": "^1.7.0"
  },
  "devDependencies": {
    "vitest": "^2.0.0"
  }
}
```

Añade script:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

---

## Ejercicio 5: Alias `@/`

> Configura un alias `@/` que apunte a `src/`.

### Solución

`vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

Uso:

```javascript
// Antes
import { algo } from '../../utils/algo.js';

// Ahora
import { algo } from '@/utils/algo.js';
```

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/13-modulos-bundlers.md)
