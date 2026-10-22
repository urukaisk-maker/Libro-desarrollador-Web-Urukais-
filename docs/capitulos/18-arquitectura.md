# 18 — Arquitectura frontend

!!! abstract "Qué vas a aprender"
    - Qué es la arquitectura frontend y por qué importa.
    - Estructura de carpetas: feature-first vs layer-first.
    - Patrones de componentes.
    - Gestión de estado.
    - Buenas prácticas para proyectos escalables.

---

## 🏗️ ¿Qué es la arquitectura frontend?

La **arquitectura frontend** es la forma de organizar el código de una aplicación para que sea **mantenible, escalable y comprensible**. No se trata de usar más librerías, sino de tomar decisiones que permitan crecer sin que todo se derrumbe.

!!! quote "El código se lee muchas más veces de las que se escribe"
    Una buena arquitectura hace que el código sea fácil de leer, cambiar y testear. Una mala arquitectura hace que cada cambio sea un infierno.

---

## 📁 Estructura de carpetas

### Layer-first (por capas)

```
src/
├── components/
├── hooks/
├── services/
├── utils/
├── pages/
└── styles/
```

**Ventaja**: fácil de encontrar cosas por tipo. **Desventaja**: cada feature está repartida por 5 carpetas.

### Feature-first (por funcionalidad)

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.js
│   │   └── auth.test.js
│   ├── carrito/
│   └── productos/
├── shared/
│   ├── components/
│   └── utils/
└── app/
    ├── routes.js
    └── layout.js
```

**Ventaja**: cada feature vive junta. **Desventaja**: más carpetas al principio.

!!! tip "Feature-first para proyectos grandes"
    Si el proyecto va a crecer, usa feature-first. Si es pequeño, layer-first es suficiente. Puedes empezar con layer-first y migrar cuando el proyecto crezca.

---

## 🧩 Patrones de componentes

### Componentes de presentación

Solo reciben props y renderizan UI. No tienen lógica de negocio.

```jsx
function Boton({ texto, onClick }) {
  return <button onClick={onClick}>{texto}</button>;
}
```

### Componentes contenedor

Manejan el estado y la lógica, y pasan props a los de presentación.

```jsx
function ListaTareas() {
  const [tareas, setTareas] = useState([]);

  const añadir = (texto) => {
    setTareas([...tareas, { id: Date.now(), texto }]);
  };

  return <ListaTareasUI tareas={tareas} onAñadir={añadir} />;
}
```

!!! quote "Separar lógica y presentación"
    Separar presentación y lógica hace que los componentes sean más fáciles de testear, reutilizar y entender.

---

## 🗃️ Gestión de estado

### Estado local

Para cosas que solo afectan a un componente (un input, un toggle).

```jsx
const [abierto, setAbierto] = useState(false);
```

### Estado compartido

Para cosas que afectan a varios componentes cercanos: se sube al padre común.

### Estado global

Para cosas que afectan a toda la app: tema, usuario autenticado, carrito.

| Herramienta | Cuándo usarla |
| :--- | :--- |
| **Context API** | Estado simple, poca frecuencia de cambio |
| **Zustand** | Estado global sencillo sin boilerplate |
| **Redux Toolkit** | Estado complejo con muchas acciones |
| **TanStack Query** | Estado del servidor (fetch, caché, refetch) |

---

## ✅ Buenas prácticas de arquitectura

- ✅ **Componentes pequeños**: si un componente supera las 200 líneas, divídelo.
- ✅ **Una responsabilidad por archivo**: un componente, un hook, una función.
- ✅ **Nombres descriptivos**: `BotonPrimario` mejor que `Btn1`.
- ✅ **Evita la lógica en el JSX**: extrae funciones auxiliares.
- ✅ **Usa TypeScript**: los tipos documentan la arquitectura.
- ✅ **Tests cerca del código**: `Boton.test.jsx` junto a `Boton.jsx`.
- ✅ **Barrel files con moderación**: los `index.js` que reexportan pueden ralentizar el build.
- ❌ **No abuses del estado global**: si solo lo usa un componente, es local.
- ❌ **No mezcles lógica de negocio con UI**: usa hooks o servicios.

---

## 🧱 Ejemplo de arquitectura completa

```
src/
├── app/
│   ├── App.jsx
│   ├── routes.jsx
│   └── providers.jsx
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   └── LoginForm.test.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── api.js
│   │   └── index.js
│   └── carrito/
│       ├── components/
│       ├── hooks/
│       └── api.js
├── shared/
│   ├── components/
│   │   ├── Button.jsx
│   │   └── Modal.jsx
│   ├── hooks/
│   └── utils/
└── styles/
    └── global.css
```

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-18">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué estructura de carpetas agrupa por funcionalidad?</p>
<button class="quiz-option" data-opt="a">A) Layer-first</button>
<button class="quiz-option" data-opt="b">B) Feature-first</button>
<button class="quiz-option" data-opt="c">C) Flat</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué componente solo recibe props y renderiza UI?</p>
<button class="quiz-option" data-opt="a">A) Componente de presentación</button>
<button class="quiz-option" data-opt="b">B) Componente contenedor</button>
<button class="quiz-option" data-opt="c">C) Componente de orden superior</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué herramienta es ideal para estado del servidor?</p>
<button class="quiz-option" data-opt="a">A) Redux</button>
<button class="quiz-option" data-opt="b">B) Context API</button>
<button class="quiz-option" data-opt="c">C) TanStack Query</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2018%3A%20Arquitectura%20frontend&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F18-arquitectura%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F18-arquitectura%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2018%3A%20Arquitectura%20frontend%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F18-arquitectura%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/18-arquitectura/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## 🏆 ¡Has terminado el Nivel Avanzado!

Si has llegado hasta aquí, ya sabes:

- CSS moderno: variables, container queries, :has()
- JavaScript asíncrono: promesas, async/await, event loop
- Módulos y bundlers: Vite, Webpack, esbuild
- Accesibilidad web: WCAG, ARIA, teclado
- TypeScript: tipos, interfaces, genéricos
- Testing: Vitest, Testing Library, Playwright
- Rendimiento web: Core Web Vitals, lazy loading, optimización
- Arquitectura frontend: estructura, patrones, estado

!!! quote "Enhorabuena"
    Has pasado de saber HTML, CSS y JS a dominar el ecosistema frontend moderno. Ahora toca el **Nivel Profesional**: Full-stack con Node.js y DevOps.

---

## ➡️ Siguiente paso

[Ir al Capítulo 19 — Full-stack con Node.js](19-fullstack-node.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
