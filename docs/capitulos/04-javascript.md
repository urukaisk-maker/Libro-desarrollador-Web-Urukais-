# Capítulo 4 — JavaScript esencial

## ¿Qué es JavaScript?

JavaScript es el lenguaje de programación que da **vida** a la web. Mientras HTML define la estructura y CSS la presentación, JavaScript se encarga del **comportamiento**: responder a clics, validar formularios, cargar datos, animar elementos…

!!! info "JavaScript no es Java"
    A pesar del nombre, JavaScript y Java son lenguajes completamente distintos. El nombre fue una jugada de marketing de los años 90.

## Cómo incluir JavaScript en HTML

### Opción 1: En línea (no recomendado)

```html
<button onclick="alert('¡Hola!')">Pulsa</button>
```

### Opción 2: En el `<head>` o `<body>`

```html
<script>
  console.log('Hola desde JS');
</script>
```

### Opción 3: Archivo externo (recomendado)

```html
<script src="app.js" defer></script>
```

## Variables

```javascript
let nombre = "Urukais";     // puede cambiar
const PI = 3.1416;          // no puede cambiar
var viejo = "evita var";    // forma antigua
```

!!! tip "Buena práctica"
    Usa `const` por defecto. Solo usa `let` cuando sepas que el valor va a cambiar. Evita `var`.

## Tipos de datos

| Tipo | Ejemplo |
|---|---|
| String | `"Hola"` |
| Number | `42`, `3.14` |
| Boolean | `true`, `false` |
| Array | `[1, 2, 3]` |
| Object | `{ nombre: "Urukais" }` |
| null / undefined | `null`, `undefined` |

## Funciones

### Función declarada

```javascript
function saludar(nombre) {
  return `Hola, ${nombre}`;
}
```

### Función flecha (ES6+)

```javascript
const saludar = (nombre) => `Hola, ${nombre}`;
```

## Manipular el DOM

El DOM (*Document Object Model*) es la representación del HTML en memoria. JavaScript puede leerlo y modificarlo.

```javascript
const titulo = document.querySelector('h1');
titulo.textContent = 'Nuevo título';
titulo.style.color = 'purple';
```

## Eventos

```javascript
const boton = document.querySelector('button');
boton.addEventListener('click', () => {
  alert('¡Has pulsado!');
});
```

## Ejemplo práctico

Ver [ejemplos/04-javascript/ejemplo.html](../ejemplos/04-javascript/ejemplo.html).

### 🎮 Editor en Vivo: Prueba JavaScript

Este es el ejemplo del contador interactivo. Pulsa el botón para ver cómo JavaScript modifica el HTML en tiempo real.

<iframe src="../ejemplos/04-javascript/ejemplo.html" class="live-sandbox" style="width: 100%; height: 350px; border-radius: 12px; border: 1px solid var(--md-default-fg-color--lightest); background: white;"></iframe>

### 🌐 Abrir en un Playground externo

Si quieres experimentar en tu propio editor, puedes abrir este ejemplo en:

- [CodePen](https://codepen.io/pen/?template=html-basico){ .md-button target="_blank" }
- [StackBlitz](https://stackblitz.com/edit/html-basico){ .md-button target="_blank" }

## Ejercicios

1. Crea un botón que cambie el color de fondo del `body`.
2. Muestra un mensaje con el nombre del usuario usando `prompt()`.
3. Recorre un array de números y muestra la suma en consola.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz-container" data-correct="b">
  <p class="quiz-question">¿Qué palabra clave se usa para declarar una constante en JavaScript?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) let</button>
    <button class="quiz-option" data-option="b">B) const</button>
    <button class="quiz-option" data-option="c">C) var</button>
  </div>
  <div class="quiz-feedback"></div>
</div>

<div class="quiz-container" data-correct="a">
  <p class="quiz-question">¿Qué método se usa para seleccionar un elemento del DOM por su ID?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) document.getElementById()</button>
    <button class="quiz-option" data-option="b">B) document.querySelector()</button>
    <button class="quiz-option" data-option="c">C) document.getElementByClass()</button>
  </div>
  <div class="quiz-feedback"></div>
</div>

---

### 🏋️ Practica con retos

Pon a prueba todo lo que has aprendido en este capítulo con ejercicios con validación automática.

[:material-pencil-ruler: Ir a los retos de JavaScript](../ejercicios-playground/#reto-1-suma-de-dos-numeros){ .md-button .md-button--primary }

---

⬅️ [Capítulo 3 — CSS básico](03-css-basico.md) | ➡️ [Capítulo 5 — Diseño responsive](05-responsive.md)
