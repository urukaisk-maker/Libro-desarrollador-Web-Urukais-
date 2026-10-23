# 05 — Diseño Responsive

!!! abstract "Qué vas a aprender"
    - Qué es el diseño responsive y por qué es obligatorio hoy.
    - La filosofía **mobile-first**.
    - `meta viewport` y por qué es imprescindible.
    - Media queries, unidades relativas y funciones modernas (`clamp()`).
    - Imágenes responsive y container queries.

---

## 📱 ¿Qué es el diseño responsive?

El **diseño responsive** (o adaptativo) es la práctica de construir una web que se vea y funcione bien en **cualquier tamaño de pantalla**: móvil, tablet, portátil, monitor 4K.

!!! quote "La analogía del agua"
    El agua se adapta al recipiente que la contiene. Una web responsive debe hacer lo mismo: no "romperse" al cambiar de tamaño, sino **reorganizarse** para seguir siendo usable.

~~~mermaid
graph LR
    A[Móvil 320px] --> B[Tablet 768px]
    B --> C[Portátil 1024px]
    C --> D[Escritorio 1440px+]
    A -.-> E[Mismo HTML]
    B -.-> E
    C -.-> E
    D -.-> E
~~~

---

## 🏛 Mobile-first

**Mobile-first** significa diseñar primero para móvil y **después** ampliar para pantallas grandes. Es lo contrario de "diseño de escritorio y luego lo adapto".

| Enfoque | Ventaja | Desventaja |
| :--- | :--- | :--- |
| **Mobile-first** | CSS más limpio, mejor rendimiento en móvil | Más trabajo inicial en móvil |
| **Desktop-first** | Más rápido si ya tienes diseño de escritorio | CSS con más `max-width`, más deuda técnica |

!!! tip "Por qué mobile-first"
    El tráfico móvil supera el 60% en la mayoría de sitios. Diseñar para móvil primero te obliga a priorizar contenido y simplificar. Y en CSS, `min-width` (mobile-first) es más limpio que `max-width` (desktop-first).

---

## 🖥 Meta viewport (imprescindible)

Sin esta etiqueta en el `<head>`, el móvil **simula** un ancho de 980px y hace zoom out. Resultado: texto minúsculo e ilegible.

~~~html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
~~~

- `width=device-width` → el ancho del viewport es el ancho real del dispositivo.
- `initial-scale=1.0` → sin zoom inicial.

!!! warning "Sin viewport, no hay responsive"
    Es el error nº1 al empezar. Si tu web se ve "enana" en el móvil, revisa esta etiqueta.

---

## 📐 Media queries

Las **media queries** aplican CSS solo cuando se cumple una condición (ancho de pantalla, orientación, preferencias…).

~~~css
/* Base: móvil */
.container {
    padding: 1rem;
}

/* Tablet y superior */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
    }
}

/* Escritorio y superior */
@media (min-width: 1024px) {
    .container {
        padding: 3rem;
        max-width: 1200px;
        margin: 0 auto;
    }
}
~~~

### Breakpoints habituales

| Nombre | Ancho | Uso típico |
| :--- | :--- | :--- |
| **xs** | 0–479px | Móvil pequeño |
| **sm** | ≥ 480px | Móvil grande |
| **md** | ≥ 768px | Tablet |
| **lg** | ≥ 1024px | Portátil / escritorio |
| **xl** | ≥ 1280px | Escritorio grande |
| **2xl** | ≥ 1536px | Monitor 4K |

!!! tip "No persigas dispositivos"
    Los breakpoints deben basarse en **dónde se rompe tu diseño**, no en "el ancho del iPhone 15". Añade media queries cuando el contenido lo necesite.

### Preferencias del usuario

~~~css
/* Modo oscuro del sistema */
@media (prefers-color-scheme: dark) {
    body { background: #111; color: #eee; }
}

/* Reducir movimiento (accesibilidad) */
@media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
}
~~~

---

## 📏 Unidades relativas

Las unidades **absolutas** (`px`) no escalan. Las **relativas** sí:

| Unidad | Referencia | Ejemplo |
| :--- | :--- | :--- |
| `rem` | Tamaño de fuente **raíz** (16px por defecto) | `font-size: 1.5rem;` = 24px |
| `em` | Tamaño de fuente **del elemento padre** | `padding: 1em;` |
| `%` | Ancho/alto del **contenedor** | `width: 100%;` |
| `vw` / `vh` | 1% del **viewport** | `height: 100vh;` (pantalla completa) |
| `svh` / `dvh` | Viewport **dinámico** (móvil con barra) | `height: 100dvh;` |

!!! warning "Cuidado con `vh` en móvil"
    `100vh` en móvil incluye la barra del navegador → contenido cortado. Usa `100svh` (smallest) o `100dvh` (dynamic) para pantalla completa.

### `clamp()`: la función mágica

~~~css
/* Tamaño fluido: mínimo 1rem, ideal 4vw, máximo 3rem */
h1 {
    font-size: clamp(1rem, 4vw, 3rem);
}
~~~

`clamp(min, preferido, max)` escala **suavemente** entre dos valores. Ideal para títulos y espaciados.

~~~css
/* Espaciado fluido sin media queries */
.section {
    padding: clamp(1rem, 5vw, 4rem);
}
~~~

---

## 🖼 Imágenes responsive

### `max-width: 100%` (la base)

~~~css
img {
    max-width: 100%;
    height: auto;
}
~~~

Evita que las imágenes se salgan del contenedor.

### `srcset` y `sizes`

Para servir **la imagen adecuada** a cada pantalla (y ahorrar datos):

~~~html
<img
    src="foto-800.jpg"
    srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1600.jpg 1600w"
    sizes="(max-width: 600px) 100vw, 50vw"
    alt="Ejemplo responsive"
>
~~~

- `srcset` → lista de imágenes con su ancho real.
- `sizes` → qué ancho ocupará en cada pantalla.
- El navegador **elige** la mejor opción.

### `<picture>` (formatos alternativos)

~~~html
<picture>
    <source srcset="foto.avif" type="image/avif">
    <source srcset="foto.webp" type="image/webp">
    <img src="foto.jpg" alt="Ejemplo">
</picture>
~~~

El navegador usa el primer formato que soporta (AVIF > WebP > JPG). Ahorra ancho de banda en navegadores modernos.

---

## 📦 Container queries (moderno)

Las **container queries** aplican CSS según el tamaño de un **contenedor padre**, no del viewport. Es la evolución natural de las media queries.

~~~css
.card-wrapper {
    container-type: inline-size;
}

.card {
    padding: 1rem;
}

@container (min-width: 400px) {
    .card {
        display: grid;
        grid-template-columns: 120px 1fr;
        gap: 1rem;
    }
}
~~~

**Diferencia clave:**
- Media query → "si la **pantalla** es grande…"
- Container query → "si el **contenedor** es grande…"

Un mismo componente puede verse distinto según dónde se coloque (sidebar, hero, grid). Compatibilidad: 90%+ navegadores modernos (2024).

!!! tip "Media vs Container"
    Usa **media queries** para layout global (header, footer, sidebar). Usa **container queries** para **componentes reutilizables** (cards, widgets, botones).

---

## 🧩 Patrones responsive

### 1. Grid auto-adaptativo (sin media queries)

~~~css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}
~~~

Crea tantas columnas como quepan (mínimo 250px). **Cero media queries**.

### 2. Flexbox con wrap

~~~css
.flex {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.flex > * {
    flex: 1 1 250px;
}
~~~

### 3. Navegación responsive

~~~css
.nav {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

@media (max-width: 600px) {
    .nav {
        flex-direction: column;
    }
}
~~~

---

## 🏗 Ejemplo completo: tarjeta responsive

~~~html
<article class="card">
    <img src="foto.jpg" alt="Producto">
    <div class="card-body">
        <h2>Teclado mecánico</h2>
        <p>89 €</p>
        <button>Comprar</button>
    </div>
</article>
~~~

~~~css
.card {
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,.1);
}

.card img {
    width: 100%;
    height: auto;
}

.card-body {
    padding: clamp(1rem, 3vw, 2rem);
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

/* En pantallas grandes, imagen a la izquierda */
@media (min-width: 768px) {
    .card {
        flex-direction: row;
    }
    .card img {
        width: 40%;
        object-fit: cover;
    }
}
~~~

---

## 🧪 Ejercicio práctico

!!! example "Hero con tipografía fluida"
    Crea una sección "hero" con:

    - Un título `<h1>` con tamaño fluido entre `1.5rem` y `4rem`.
    - Un párrafo `<p>` con ancho máximo de `60ch`.
    - Centrado horizontalmente y con `padding` fluido.

    No uses media queries. Usa `clamp()` y unidades relativas.

??? success "Solución"
    ~~~css
    .hero {
        padding: clamp(2rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem);
        text-align: center;
        background: linear-gradient(135deg, #6a5acd, #00bcd4);
        color: #fff;
    }

    .hero h1 {
        font-size: clamp(1.5rem, 5vw, 4rem);
        line-height: 1.2;
        margin: 0 auto 1rem;
        max-width: 20ch;
    }

    .hero p {
        font-size: clamp(1rem, 1.5vw, 1.25rem);
        max-width: 60ch;
        margin: 0 auto;
    }
    ~~~

    **Claves:** `clamp()` para tipografía y espaciado, `max-width` con `ch` (ancho de carácter) para lectura cómoda, `margin: 0 auto` para centrar.

---

## 🧠 Quiz

!!! question "Comprueba lo aprendido"

??? success "1. ¿Para qué sirve `meta viewport`?"
    Sin ella, el móvil simula un ancho de 980px y hace zoom out. Con `width=device-width, initial-scale=1.0` el navegador usa el ancho real del dispositivo y no aplica zoom inicial.

??? success "2. ¿Qué diferencia hay entre `rem`, `em` y `vw`?"
    `rem` → tamaño de fuente **raíz** (html). `em` → tamaño de fuente **del elemento padre**. `vw` → 1% del **ancho del viewport**.

??? success "3. ¿Qué hace `clamp(1rem, 4vw, 3rem)`?"
    Devuelve un tamaño fluido: nunca menos de `1rem`, nunca más de `3rem`, y escala con `4vw` entre ambos.

??? success "4. ¿Cuándo usar `container queries` en vez de media queries?"
    Para **componentes reutilizables** cuyo layout debe adaptarse al **espacio disponible en su contenedor**, no al tamaño del viewport.

??? success "5. ¿Por qué `100vh` puede fallar en móvil?"
    Porque incluye la barra de navegación del navegador, que aparece y desaparece. Usa `100svh` (smallest) o `100dvh` (dynamic) para pantalla completa segura.

---

## 📚 Recursos

- [MDN — Diseño responsive](https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [MDN — `clamp()`](https://developer.mozilla.org/es/docs/Web/CSS/clamp)
- [MDN — Container queries](https://developer.mozilla.org/es/docs/Web/CSS/CSS_containment/Container_queries)
- [web.dev — Learn Responsive Design](https://web.dev/learn/design/)
- [Can I use — Container queries](https://caniuse.com/css-container-queries)
- [Modern CSS Solutions — Fluid typography](https://moderncss.dev/)

---

➡️ Siguiente capítulo: [06 — Formularios](06-formularios.md)