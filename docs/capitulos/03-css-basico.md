# Capítulo 3 — CSS básico

## ¿Qué es CSS?

CSS (*Cascading Style Sheets*) es el lenguaje que define **cómo se ve** una página web: colores, tipografías, tamaños, espaciados, disposición de los elementos… Si HTML es el esqueleto, CSS es la piel y la ropa.

## Formas de aplicar CSS

### 1. CSS en línea (inline)

```html
<p style="color: red;">Texto en rojo</p>
```

Rápido pero **no recomendado** para proyectos reales.

### 2. CSS en el `<head>` (interno)

```html
<head>
  <style>
    p { color: red; }
  </style>
</head>
```

Válido para páginas pequeñas.

### 3. CSS en archivo externo (recomendado)

```html
<head>
  <link rel="stylesheet" href="estilos.css">
</head>
```

Es la práctica profesional: separa contenido de presentación.

## Sintaxis de una regla CSS

```css
selector {
  propiedad: valor;
  otra-propiedad: otro-valor;
}
```

Ejemplo:

```css
h1 {
  color: #6a5acd;
  font-size: 2rem;
}
```

## Selectores esenciales

| Selector | Ejemplo | Selecciona |
|---|---|---|
| Etiqueta | `p` | Todos los `<p>` |
| Clase | `.destacado` | Elementos con `class="destacado"` |
| ID | `#principal` | El elemento con `id="principal"` |
| Descendiente | `nav a` | Los `<a>` dentro de `<nav>` |
| Pseudo-clase | `a:hover` | Enlaces al pasar el ratón |

## El modelo de caja

Todo elemento HTML es una **caja** compuesta por:

- **Contenido** — el texto o imagen.
- **Padding** — espacio interior.
- **Border** — borde.
- **Margin** — espacio exterior.

```css
.caja {
  padding: 1rem;
  border: 2px solid #6a5acd;
  margin: 1rem;
}
```

## Ejemplo práctico

Ver [ejemplos/03-css-basico/ejemplo.html](../ejemplos/03-css-basico/ejemplo.html).

### 🎮 Prueba tú mismo

Puedes ver el ejemplo de este capítulo en vivo haciendo clic aquí:

<a href="../ejemplos/03-css-basico/ejemplo.html" target="_blank" class="md-button md-button--primary">Ver ejemplo interactivo en pantalla completa</a>

### 🌐 Abrir en un Playground externo

Si quieres experimentar en tu propio editor, puedes abrir este ejemplo en:

- [CodePen](https://codepen.io/pen/?template=html-basico){ .md-button target="_blank" }
- [StackBlitz](https://stackblitz.com/edit/html-basico){ .md-button target="_blank" }

## Ejercicios

1. Cambia el color de fondo del `body` a un tono claro.
2. Aplica una tipografía distinta a los `h1`.
3. Crea una clase `.destacado` y úsala en un párrafo.
4. Añade `padding` y `border` a un `<div>`.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz-container" data-correct="c">
  <p class="quiz-question">¿Qué significa la sigla CSS?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) Computer Style Sheets</button>
    <button class="quiz-option" data-option="b">B) Creative Style System</button>
    <button class="quiz-option" data-option="c">C) Cascading Style Sheets</button>
  </div>
  <div class="quiz-feedback"></div>
</div>

<div class="quiz-container" data-correct="b">
  <p class="quiz-question">¿Qué propiedad CSS se utiliza para cambiar el color del texto?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) text-color</button>
    <button class="quiz-option" data-option="b">B) color</button>
    <button class="quiz-option" data-option="c">C) font-color</button>
  </div>
  <div class="quiz-feedback"></div>
</div>

---

⬅️ [Capítulo 2 — HTML básico](02-html-basico.md) | ➡️ [Capítulo 4 — JavaScript esencial](04-javascript.md)
