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

## Ejercicios

1. Crea un botón que cambie el color de fondo del `body`.
2. Muestra un mensaje con el nombre del usuario usando `prompt()`.
3. Recorre un array de números y muestra la suma en consola.

---

⬅️ [Capítulo 3 — CSS básico](03-css-basico.md) | ➡️ [Capítulo 5 — Diseño responsive](05-responsive.md)
