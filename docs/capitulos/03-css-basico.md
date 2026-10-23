# 03 — CSS básico

!!! abstract "Qué vas a aprender"
    - Qué es CSS y cómo se aplica.
    - Los selectores más importantes.
    - El modelo de caja (box model).
    - Flexbox y Grid para maquetar.
    - Variables CSS y media queries.

---

## 🎨 ¿Qué es CSS?

**CSS** (*Cascading Style Sheets*) es el lenguaje que define la **presentación** de una página web: colores, tipografía, layout, animaciones.

```css
h1 {
  color: #6a5acd;
  font-size: 2rem;
}
```

---

## 🔗 Cómo aplicar CSS

Hay tres formas:

### 1. CSS externo (recomendado)

```html
<link rel="stylesheet" href="styles.css">
```

### 2. CSS interno

```html
<style>
  h1 { color: red; }
</style>
```

### 3. CSS inline

```html
<h1 style="color: red;">Título</h1>
```

!!! tip "Siempre CSS externo"
    El CSS externo separa estructura y presentación, se cachea mejor y se reutiliza.

---

## 🎯 Selectores

```css
p { color: #333; }
.boton { background: #6a5acd; }
#header { padding: 1rem; }
nav a { text-decoration: none; }
ul > li { margin: 0.5rem 0; }
a:hover { color: #00bcd4; }
input[type="text"] { border: 1px solid #ccc; }
```

| Selector | Ejemplo | Uso |
| :--- | :--- | :--- |
| Etiqueta | p | Todos los párrafos |
| Clase | .boton | Elementos con class="boton" |
| ID | #header | Elemento con id="header" |
| Descendiente | nav a | Enlaces dentro de nav |
| Hijo directo | ul > li | li hijos directos de ul |
| Pseudo-clase | a:hover | Enlace al pasar el ratón |

---

## 📦 El modelo de caja

```css
.caja {
  width: 200px;
  height: 100px;
  padding: 16px;
  border: 2px solid #333;
  margin: 8px;
  box-sizing: border-box;
}
```

!!! warning "box-sizing: border-box"
    Por defecto, width no incluye padding ni border. Con box-sizing: border-box, sí. Casi todo el mundo lo pone globalmente:

    ```css
    *, *::before, *::after {
      box-sizing: border-box;
    }
    ```

---

## 🧩 Flexbox

**Flexbox** es un modelo de layout unidimensional.

```css
.contenedor {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.hijo {
  flex: 1 1 auto;
}
```

| Propiedad | Uso |
| :--- | :--- |
| display: flex | Activa Flexbox |
| flex-direction | Dirección (row, column) |
| justify-content | Alineación en el eje principal |
| align-items | Alineación en el eje transversal |
| gap | Espacio entre hijos |

---

## 🔲 Grid

**Grid** es un modelo de layout bidimensional.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.grid__item {
  grid-column: 1 / 3;
  grid-row: 2;
}
```

!!! tip "¿Flexbox o Grid?"
    - **Flexbox**: una dimensión (fila o columna). Menús, barras.
    - **Grid**: dos dimensiones (filas y columnas). Layouts de página, galerías.

---

## 🎨 Variables CSS

```css
:root {
  --primario: #6a5acd;
  --acento: #00bcd4;
  --radio: 8px;
}

.boton {
  background: var(--primario);
  border-radius: var(--radio);
}
```

---

## 📱 Media queries

```css
.elemento { padding: 1rem; }

@media screen and (min-width: 640px) {
  .elemento { padding: 2rem; }
}

@media (prefers-color-scheme: dark) {
  body { background: #1a1726; color: #fff; }
}
```

!!! tip "Mobile first"
    Diseña primero para móvil y luego amplía con min-width.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-3">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué propiedad activa Flexbox en un contenedor?</p>
<button class="quiz-option" data-opt="a">A) display: grid</button>
<button class="quiz-option" data-opt="b">B) display: flex</button>
<button class="quiz-option" data-opt="c">C) flex: 1</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>2.</strong> ¿Qué hace box-sizing: border-box?</p>
<button class="quiz-option" data-opt="a">A) Añade un borde</button>
<button class="quiz-option" data-opt="b">B) Elimina el padding</button>
<button class="quiz-option" data-opt="c">C) El width incluye padding y border</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>3.</strong> ¿Qué modelo de layout es bidimensional?</p>
<button class="quiz-option" data-opt="a">A) Grid</button>
<button class="quiz-option" data-opt="b">B) Flexbox</button>
<button class="quiz-option" data-opt="c">C) Float</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%203%3A%20CSS%20b%C3%A1sico&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F03-css-basico%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F03-css-basico%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%203%3A%20CSS%20b%C3%A1sico%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F03-css-basico%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/03-css-basico/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 4 — JavaScript esencial](04-javascript.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
