# 05 — Diseño responsive

!!! abstract "Qué vas a aprender"
    - Qué es el diseño responsive y por qué es obligatorio.
    - El viewport y la etiqueta meta.
    - Media queries y mobile-first.
    - Unidades relativas (rem, em, %, vw/vh).
    - Imágenes responsive.

---

## 📱 ¿Qué es el diseño responsive?

El **diseño responsive** (o adaptativo) es la práctica de crear webs que se vean bien en **cualquier tamaño de pantalla**: móvil, tablet, portátil, monitor grande. Ya no es opcional: más del 60% del tráfico web viene de móvil.

```css
/* Móvil primero */
.elemento { padding: 1rem; }

@media (min-width: 768px) {
  .elemento { padding: 2rem; }
}

@media (min-width: 1024px) {
  .elemento { padding: 3rem; }
}
```

!!! tip "Mobile first"
    Diseña primero para móvil y luego amplía con \`min-width\`. Es más fácil añadir complejidad que quitarla.

---

## 🖥️ El viewport

Sin la etiqueta viewport, los móviles renderizan la página como si fueran un monitor de escritorio y luego la reducen. El resultado: texto minúsculo y zoom obligatorio.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- \`width=device-width\`: el ancho del viewport es el ancho del dispositivo.
- \`initial-scale=1.0\`: sin zoom inicial.

---

## 📐 Media queries

Las **media queries** permiten aplicar estilos según las características del dispositivo.

```css
/* Por ancho */
@media (min-width: 640px) { }
@media (max-width: 1023px) { }

/* Por orientación */
@media (orientation: landscape) { }

/* Por preferencias del usuario */
@media (prefers-color-scheme: dark) { }
@media (prefers-reduced-motion: reduce) { }
```

| Breakpoint | Dispositivo típico |
| :--- | :--- |
| < 640px | Móvil |
| 640–1023px | Tablet |
| 1024–1279px | Portátil |
| ≥ 1280px | Monitor |

---

## 📏 Unidades relativas

| Unidad | Relativa a | Uso |
| :--- | :--- | :--- |
| \`rem\` | Tamaño de fuente raíz (16px por defecto) | Tipografía, espaciados |
| \`em\` | Tamaño de fuente del elemento padre | Componentes |
| \`%\` | Tamaño del contenedor padre | Anchuras |
| \`vw\` | 1% del ancho del viewport | Elementos a pantalla completa |
| \`vh\` | 1% del alto del viewport | Secciones a pantalla completa |
| \`ch\` | Ancho del carácter "0" | Líneas de texto |

!!! warning "Evita píxeles para tipografía"
    Usa \`rem\` para tipografía y espaciados. Los píxeles no escalan con las preferencias del usuario.

---

## 🖼️ Imágenes responsive

```html
<img
  src="foto-800.jpg"
  srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1600.jpg 1600w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
  alt="Descripción"
  loading="lazy"
>
```

- \`srcset\`: ofrece varias versiones de la imagen.
- \`sizes\`: indica al navegador qué tamaño tendrá en cada caso.
- \`loading="lazy"\`: carga la imagen solo cuando se acerca al viewport.

!!! tip "Formatos modernos"
    Usa WebP o AVIF siempre que puedas. Pesan menos y se ven igual. Puedes ofrecer alternativas con \`<picture>\`.

---

## 🎯 Patrones de layout responsive

### Contenedor centrado

```css
.contenedor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

### Grid responsive

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}
```

### Barra lateral que colapsa

```css
.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 1024px) {
  .layout {
    grid-template-columns: 250px 1fr;
  }
}
```

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-5">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué etiqueta es obligatoria para que la web se vea bien en móvil?</p>
<button class="quiz-option" data-opt="a">A) &lt;meta charset="UTF-8"&gt;</button>
<button class="quiz-option" data-opt="b">B) &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</button>
<button class="quiz-option" data-opt="c">C) &lt;meta name="mobile"&gt;</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué significa "mobile first"?</p>
<button class="quiz-option" data-opt="a">A) Diseñar primero para móvil y luego ampliar</button>
<button class="quiz-option" data-opt="b">B) Diseñar solo para móvil</button>
<button class="quiz-option" data-opt="c">C) Diseñar primero para escritorio</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué unidad es relativa al tamaño de fuente raíz?</p>
<button class="quiz-option" data-opt="a">A) px</button>
<button class="quiz-option" data-opt="b">B) em</button>
<button class="quiz-option" data-opt="c">C) rem</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%205%3A%20Dise%C3%B1o%20responsive&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F05-responsive%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F05-responsive%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%205%3A%20Dise%C3%B1o%20responsive%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F05-responsive%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/05-responsive/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 6 — Formularios HTML](06-formularios.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
