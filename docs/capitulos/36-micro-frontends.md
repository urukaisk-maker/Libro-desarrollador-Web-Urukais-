# 36 — Micro-frontends

!!! abstract "Qué vas a aprender"
    - Qué son los micro-frontends y cuándo usarlos.
    - Module Federation con Vite.
    - Composición en tiempo de ejecución.
    - Comunicación entre micro-frontends.
    - Ventajas y desventajas.

---

## 🧩 ¿Qué son los micro-frontends?

Los **micro-frontends** dividen una aplicación frontend grande en **aplicaciones más pequeñas e independientes**, que se pueden desarrollar, desplegar y escalar por separado. Es el equivalente frontend de los microservicios.

```
Monolito frontend:  1 app gigante, 1 equipo, 1 despliegue
Micro-frontends:    N apps pequeñas, N equipos, N despliegues
```

!!! quote "Divide y vencerás (también en frontend)"
    Si tienes 50 desarrolladores trabajando en el mismo repositorio, los conflictos son constantes. Los micro-frontends permiten que cada equipo sea dueño de su parte.

---

## 🎯 ¿Cuándo usar micro-frontends?

| Caso | ¿Micro-frontends? |
| :--- | :--- |
| Equipos grandes (10+ devs) | ✅ |
| Múltiples equipos independientes | ✅ |
| Migración incremental de Angular a React | ✅ |
| Múltiples productos en una plataforma | ✅ |
| Proyecto pequeño (1-3 devs) | ❌ |
| MVP o prototipo | ❌ |
| App con mucha interacción entre partes | ❌ |

---

## ⚡ Module Federation

**Module Federation** (Webpack 5, Vite 5+) permite que una app cargue código de otra en **tiempo de ejecución**, sin duplicar dependencias.

### Host (contenedor)

```javascript
// vite.config.js del host
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    federation({
      name: "host",
      remotes: {
        productos: "http://localhost:5001/assets/remoteEntry.js",
        carrito: "http://localhost:5002/assets/remoteEntry.js"
      },
      shared: ["react", "react-dom"]
    })
  ]
});
```

```jsx
import Productos from "productos/Productos";
import Carrito from "carrito/Carrito";

function App() {
  return (
    <div>
      <Productos />
      <Carrito />
    </div>
  );
}
```

### Remote (remoto)

```javascript
// vite.config.js del remote
export default defineConfig({
  plugins: [
    federation({
      name: "productos",
      filename: "remoteEntry.js",
      exposes: {
        "./Productos": "./src/Productos.jsx"
      },
      shared: ["react", "react-dom"]
    })
  ]
});
```

---

## 🔗 Composición en tiempo de ejecución

| Estrategia | Cuándo se compone |
| :--- | :--- |
| **Build time** | Al construir la app (npm packages) |
| **Run time** | Al cargar la app (Module Federation) |
| **Iframes** | Aislamiento total (pero limitado) |
| **Web Components** | Composición nativa |

!!! tip "Empieza simple"
    Si nunca has hecho micro-frontends, empieza con **Web Components** o **iframes**. Module Federation es potente pero complejo.

---

## 📡 Comunicación entre micro-frontends

Los micro-frontends deben comunicarse sin acoplarse. Opciones:

| Estrategia | Cuándo usarla |
| :--- | :--- |
| **Custom Events** | Comunicación simple entre apps |
| **Estado global compartido** | Estado pequeño (usuario, tema) |
| **URL / query params** | Navegación entre apps |
| **Web Components** | Componentes nativos compartidos |
| **Bus de eventos** | Comunicación compleja (EventEmitter) |

```javascript
// App A emite un evento
window.dispatchEvent(new CustomEvent("carrito:add", {
  detail: { productoId: 42 }
}));

// App B lo escucha
window.addEventListener("carrito:add", (e) => {
  console.log("Añadido:", e.detail.productoId);
});
```

!!! warning "Cuidado con el acoplamiento"
    Si dos micro-frontends se comunican mucho, quizá no deberían ser micro-frontends separados. La comunicación excesiva es señal de que el dominio está mal dividido.

---

## ⚖️ Ventajas y desventajas

### Ventajas

- ✅ **Equipos independientes**: cada equipo despliega cuando quiere.
- ✅ **Escalabilidad organizacional**: añadir equipos sin conflictos.
- ✅ **Aislamiento de fallos**: si un micro-frontend cae, los demás siguen.
- ✅ **Migración incremental**: puedes migrar una parte sin reescribir todo.
- ✅ **Tecnologías distintas**: un equipo puede usar React, otro Vue.

### Desventajas

- ❌ **Complejidad**: más repos, más pipelines, más despliegues.
- ❌ **Duplicación**: cada app carga sus dependencias.
- ❌ **Consistencia visual**: hay que compartir el design system.
- ❌ **Rendimiento**: más peticiones, más JS.
- ❌ **Debugging**: más difícil seguir un flujo entre apps.
- ❌ **Testing E2E**: más complejo de automatizar.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-36">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué son los micro-frontends?</p>
<button class="quiz-option" data-opt="a">A) Pequeños componentes de React</button>
<button class="quiz-option" data-opt="b">B) Apps frontend independientes que se componen</button>
<button class="quiz-option" data-opt="c">C) Microservicios en el backend</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué herramienta permite compartir código en runtime?</p>
<button class="quiz-option" data-opt="a">A) Module Federation</button>
<button class="quiz-option" data-opt="b">B) Webpack</button>
<button class="quiz-option" data-opt="c">C) npm</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Cuándo NO usar micro-frontends?</p>
<button class="quiz-option" data-opt="a">A) En equipos grandes</button>
<button class="quiz-option" data-opt="b">B) En migraciones incrementales</button>
<button class="quiz-option" data-opt="c">C">En proyectos pequeños con 1-3 devs</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2036%3A%20Micro-frontends&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F36-micro-frontends%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F36-micro-frontends%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2036%3A%20Micro-frontends%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F36-micro-frontends%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/36-micro-frontends/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 37 — Introducción a la IA Generativa](37-ia-generativa.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
