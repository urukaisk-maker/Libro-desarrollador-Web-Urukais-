# 03 — CSS básico

!!! abstract "Qué vas a aprender"
    - Qué es CSS y cómo se aplica.
    - Selectores, especificidad y cascada.
    - El modelo de caja y `box-sizing`.
    - `display`, `position` y `z-index`.
    - Flexbox y Grid en profundidad.
    - Variables, funciones modernas y `clamp()`.
    - Transitions, transforms y `prefers-reduced-motion`.
    - Media queries y accesibilidad.

---

## 🎨 ¿Qué es CSS?

**CSS** (*Cascading Style Sheets*) es el lenguaje que define la **presentación** de una página web: colores, tipografía, layout, animaciones.

!!! quote "La analogía del cuerpo humano"
    Si HTML es el **esqueleto**, CSS es la **piel, la ropa y el maquillaje**. Define cómo se ve, se siente y se mueve todo lo que el HTML estructura.

~~~css
h1 {
  color: #6a5acd;
  font-size: 2rem;
  font-family: system-ui, sans-serif;
}
~~~

---

## 🔗 Cómo aplicar CSS

Hay tres formas:

### 1. CSS externo (recomendado)

~~~html
<link rel="stylesheet" href="styles.css">
~~~

### 2. CSS interno

~~~html
<style>
  h1 { color: red; }
</style>
~~~

### 3. CSS inline

~~~html
<h1 style="color: red;">Título</h1>
~~~

!!! tip "Siempre CSS externo"
    El CSS externo separa estructura y presentación, se cachea mejor, se reutiliza y permite trabajar en equipo sin conflictos.

---

## 🎯 Selectores

~~~css
p { color: #333; }
.boton { background: #6a5acd; }
#header { padding: 1rem; }
nav a { text-decoration: none; }
ul > li { margin: 0.5rem 0; }
a:hover { color: #00bcd4; }
input[type="text"] { border: 1px solid #ccc; }
~~~

| Selector | Ejemplo | Uso |
| :--- | :--- | :--- |
| Etiqueta | `p` | Todos los párrafos |
| Clase | `.boton` | Elementos con `class="boton"` |
| ID | `#header` | Elemento con `id="header"` |
| Descendiente | `nav a` | Enlaces dentro de `nav` |
| Hijo directo | `ul > li` | `li` hijos directos de `ul` |
| Hermano adyacente | `h2 + p` | Primer `p` tras un `h2` |
| Pseudo-clase | `a:hover` | Enlace al pasar el ratón |
| Atributo | `input[type="email"]` | Solo inputs de tipo email |

!!! tip "`:focus-visible` es accesibilidad"
    Nunca elimines el `outline` sin reemplazarlo. `:focus-visible` aplica el anillo solo cuando el usuario navega con teclado, no al hacer clic.

---

## ⚖️ Especificidad y cascada

| Tipo | Peso | Ejemplo |
| :--- | :--- | :--- |
| Estilos inline | `1000` | `style="..."` |
| IDs | `100` | `#header` |
| Clases / atributos / pseudo-clases | `10` | `.boton`, `:hover` |
| Etiquetas / pseudo-elementos | `1` | `p`, `::before` |

!!! warning "Evita `!important`"
    `!important` rompe la cascada y hace el CSS impredecible.

---

## 📦 El modelo de caja

~~~css
.caja {
  width: 200px;
  height: 100px;
  padding: 16px;
  border: 2px solid #333;
  margin: 8px;
  box-sizing: border-box;
}
~~~

!!! warning "box-sizing: border-box"
    Por defecto, width no incluye padding ni border. Con box-sizing: border-box, sí.

---

## 🧱 `display` y `position`

| Valor | `display` | `position` |
| :--- | :--- | :--- |
| `block` | Ocupa todo el ancho | — |
| `inline` | Solo lo necesario | — |
| `flex` | Contenedor Flexbox | — |
| `grid` | Contenedor Grid | — |
| `none` | No se renderiza | — |
| `static` | — | Flujo normal |
| `relative` | — | Su posición original |
| `absolute` | — | El ancestro posicionado más cercano |
| `fixed` | — | El viewport |
| `sticky` | — | El scroll, hasta un límite |

~~~css
.header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; }
.tooltip-wrap { position: relative; }
.tooltip { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); }
.sidebar { position: sticky; top: 2rem; }
~~~

!!! warning "`z-index` solo funciona con `position`"
    No tiene efecto en elementos `static`.

---

## 🧩 Flexbox

~~~css
.contenedor {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.hijo { flex: 1 1 auto; }
~~~

---

## 🔲 Grid

~~~css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}
~~~

### Grid con áreas con nombre

~~~css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
  gap: 1rem;
}
~~~

---

## 🎨 Variables CSS

~~~css
:root {
  --primario: #6a5acd;
  --acento: #00bcd4;
  --radio: 8px;
}
.boton { background: var(--primario); border-radius: var(--radio); }
~~~

---

## ⚡ Funciones modernas

~~~css
h1 { font-size: clamp(1.5rem, 5vw, 3rem); }
.contenedor { width: min(90%, 1200px); }
.layout { height: calc(100vh - 80px); }
.video { aspect-ratio: 16 / 9; }
.avatar { object-fit: cover; border-radius: 50%; }
~~~

---

## 🎬 Transitions y transforms

~~~css
.boton {
  transition: background 0.2s ease, transform 0.2s ease;
}
.boton:hover {
  background: #5a4abd;
  transform: translateY(-2px);
}
~~~

---

## 📱 Media queries y preferencias

~~~css
@media screen and (min-width: 640px) {
  .elemento { padding: 2rem; }
}
@media (prefers-color-scheme: dark) {
  body { background: #1a1726; color: #fff; }
}
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
~~~

---

## ♿ Accesibilidad CSS

- Nunca quites el `outline` sin reemplazarlo. Usa `:focus-visible`.
- Contraste mínimo 4.5:1 (WCAG AA).
- Respeta `prefers-reduced-motion`.
- Tamaño mínimo táctil: 44×44 px.

~~~css
:root { color-scheme: light dark; }
button:focus-visible { outline: 2px solid #6a5acd; outline-offset: 2px; }
~~~

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

## 🧪 Ejercicio práctico

!!! example "Tarjeta de perfil con Flexbox"
    Crea una tarjeta con avatar circular, nombre, descripción y botón "Seguir". Usa Flexbox columna, `gap: 12px`, y `transition` al hover del botón.

??? success "Solución"
    ~~~css
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 24px;
      max-width: 280px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, .08);
    }
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
    }
    .btn {
      padding: 8px 20px;
      background: #6a5acd;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.2s ease;
    }
    .btn:hover {
      background: #5a4abd;
      transform: translateY(-1px);
    }
    ~~~

---

## 🧠 Quiz de repaso

!!! question "Comprueba lo aprendido"

??? success "1. ¿Diferencia entre `padding` y `margin`?"
    `padding` es el espacio interno. `margin` es el espacio externo.

??? success "2. ¿Qué hace `position: absolute` sin ancestro posicionado?"
    Se posiciona respecto al viewport.

??? success "3. ¿Diferencia entre `:is()` y `:where()`?"
    `:is()` hereda especificidad. `:where()` siempre tiene especificidad 0.

??? success "4. ¿Por qué usar `transform` en lugar de `top`/`left` para animar?"
    Se anima en la GPU y no provoca reflow.

??? success "5. ¿Qué hace `repeat(auto-fit, minmax(240px, 1fr))`?"
    Columnas de mínimo 240px, reparto equitativo.

---

## 📚 Recursos

- [MDN — CSS](https://developer.mozilla.org/es/docs/Web/CSS)
- [MDN — Flexbox](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [MDN — Grid](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Grid_Layout)
- [Flexbox Froggy (juego)](https://flexboxfroggy.com/#es)
- [Grid Garden (juego)](https://cssgridgarden.com/#es)
- [web.dev — Learn CSS](https://web.dev/learn/css)

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
