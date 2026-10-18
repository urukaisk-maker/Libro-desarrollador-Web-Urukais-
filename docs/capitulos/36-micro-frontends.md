# Capítulo 36 — Micro-frontends

## Introducción

Los **micro-frontends** aplican las ideas de microservicios al frontend: dividir una aplicación grande en **aplicaciones más pequeñas e independientes**, cada una mantenida por un equipo distinto, que se integran para formar un producto coherente.

Si has trabajado en una app enorme donde un cambio de un equipo rompe el trabajo de otro, sabes por qué existen.

## El problema que resuelven

Imagina una aplicación enterprise con:

- 5 equipos trabajando en paralelo.
- 300.000 líneas de código.
- Un build de 15 minutos.
- Un despliegue al día, que falla una vez de cada tres.

**Micro-frontends** permiten que cada equipo despliegue **su parte** cuando quiera, sin bloquear a los demás.

## ¿Qué es un micro-frontend?

Una aplicación frontend **autónoma** que:

- Se desarrolla en su propio repositorio.
- Se despliega en su propia URL o CDN.
- Se integra en una "aplicación contenedor" (shell).
- Puede usar **cualquier tecnología** (React, Vue, Svelte...).

Ejemplo: una tienda online dividida en:

- `header` (React).
- `productos` (Vue).
- `carrito` (Svelte).
- `checkout` (React).

Todo se ve como una sola app.

## Formas de integrar micro-frontends

### 1. Iframes (la más antigua)

Cada micro-frontend vive en su `<iframe>`.

✅ Aislamiento total.
❌ Pésima experiencia: no compartes estado, CSS, ni rutas.

### 2. Web Components

Cada micro-frontend expone un **Custom Element** (`<mi-productos>`).

✅ Estándar nativo, aislamiento real.
❌ Requiere aprender Shadow DOM, eventos personalizados.

### 3. Module Federation (el más moderno)

Webpack 5 (y Vite con plugins) permite compartir módulos entre aplicaciones en tiempo de ejecución.

### 4. Composición en build time

Un monorepo con todas las partes que se construyen juntas.

## Module Federation con Webpack

### Aplicación remota (`productos`)

```javascript
// webpack.config.js
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'productos',
      filename: 'remoteEntry.js',
      exposes: {
        './ListaProductos': './src/ListaProductos',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
  ],
};
```

### Aplicación contenedora (`shell`)

```javascript
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        productos: 'productos@https://productos.miapp.com/remoteEntry.js',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
  ],
};
```

Uso:

```jsx
import React, { Suspense } from 'react';

const ListaProductos = React.lazy(() => import('productos/ListaProductos'));

function App() {
  return (
    <Suspense fallback={<p>Cargando productos...</p>}>
      <ListaProductos />
    </Suspense>
  );
}
```

## Module Federation con Vite

```bash
npm install -D @originjs/vite-plugin-federation
```

`vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      name: 'productos',
      filename: 'remoteEntry.js',
      exposes: {
        './ListaProductos': './src/ListaProductos.jsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
});
```

## Ventajas

- **Despliegues independientes** por equipo.
- **Equipos autónomos**: eligen su stack.
- **Escalabilidad organizacional**: puedes añadir equipos sin bloquear.
- **Builds más rápidos**: cada micro-frontend compila solo lo suyo.
- **Migraciones graduales**: puedes reescribir una parte sin tocar el resto.

## Desventajas

- **Complejidad de integración**: no es trivial.
- **Duplicación de dependencias**: cada micro-frontend puede traer React.
- **Consistencia de diseño**: hay que coordinar un design system.
- **Depuración más difícil**: el bug puede estar en cualquier parte.
- **Rendimiento**: múltiples bundles, más peticiones.

## El rol del design system

En micro-frontends es **obligatorio** tener un **design system compartido**:

- Tokens de diseño (colores, tipografía, espaciados).
- Componentes base (`Button`, `Input`, `Modal`).
- Guías de estilo documentadas.

Sin esto, cada equipo hará su propia versión del botón y la app parecerá un Frankenstein.

## Comunicación entre micro-frontends

No deben acoplarse directamente. Opciones:

### 1. Custom Events

```javascript
// Micro-frontend A
window.dispatchEvent(new CustomEvent('carrito:add', { detail: producto }));

// Micro-frontend B
window.addEventListener('carrito:add', (e) => {
  actualizarContador(e.detail);
});
```

### 2. Estado compartido en el shell

El contenedor expone un store global (Zustand, Redux) y los micro-frontends lo consumen.

### 3. URL y query params

La más simple: el estado vive en la URL.

### 4. Event bus compartido

Una librería pequeña que actúa como mediador.

## ¿Cuándo usar micro-frontends?

### ✅ Úsalos si...

- Tienes **múltiples equipos** trabajando en paralelo.
- La app es **muy grande** y el monolito se vuelve lento.
- Necesitas **despliegues independientes**.
- Estás migrando tecnología **gradualmente**.

### ❌ Evítalos si...

- Eres **un solo equipo pequeño**.
- La app es **pequeña o mediana**.
- No tienes un design system maduro.
- No tienes experiencia con arquitecturas distribuidas.

!!! warning "La regla más importante"
    **No empieces con micro-frontends**. Empieza con un monolito modular bien organizado. Cuando el dolor sea real (equipos bloqueándose, builds de 20 minutos), migra. Los micro-frontends resuelven un problema **organizacional**, no técnico.

## Buenas prácticas

- **Empieza con un monolito** y migra solo si es necesario.
- **Design system compartido** obligatorio.
- **Contratos claros** entre shell y micro-frontends.
- **Versiona los `remoteEntry.js`** para evitar roturas.
- **Observabilidad**: logs, métricas y errores centralizados.
- **Rendimiento**: lazy loading, prefetch inteligente.
- **CI/CD independiente** por micro-frontend.
- **Mide el coste**: la complejidad debe estar justificada.

## El futuro

Los micro-frontends son **una solución organizacional**. Funcionan muy bien en empresas grandes (Spotify, IKEA, Zalando) pero son **overkill** para la mayoría de proyectos.

La tendencia actual es:

- **Monolitos modulares** para equipos pequeños.
- **Server Components** para reducir JavaScript.
- **Micro-frontends** solo donde el tamaño lo exige.

## Ejercicios

1. Piensa en una app grande que conozcas. ¿Cómo la dividirías en micro-frontends?
2. Crea dos apps pequeñas con Vite + Module Federation e intégralas.
3. Diseña un contrato de comunicación entre shell y micro-frontend usando Custom Events.
4. Explica qué es el "problema del CSS global" en micro-frontends y cómo lo resuelve Shadow DOM.
5. Lee el post original de [Martin Fowler sobre micro-frontends](https://martinfowler.com/articles/micro-frontends.html) y saca 3 conclusiones.

---

⬅️ [Capítulo 35 — GraphQL](35-graphql.md) | ➡️ [Apéndices](../apendices/index.md)

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz-container" data-correct="c">
  <p class="quiz-question">¿Cuándo tiene sentido usar micro-frontends?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) Siempre, es la mejor arquitectura</button>
    <button class="quiz-option" data-option="b">B) Cuando el proyecto es pequeño</button>
    <button class="quiz-option" data-option="c">C) Cuando hay múltiples equipos trabajando en una app grande</button>
  </div>
  <div class="quiz-feedback"></div>
</div>