# Capítulo 14 — Accesibilidad web

## Introducción

La **accesibilidad web** consiste en diseñar y construir sitios que **cualquier persona pueda usar**, independientemente de sus capacidades físicas, sensoriales o cognitivas, del dispositivo o del contexto.

No es un extra opcional. Es una **obligación legal** en muchos países (WCAG 2.2, ADA, EN 301 549) y, sobre todo, es **lo correcto**.

Aproximadamente **1 de cada 6 personas** tiene algún tipo de discapacidad. Diseñar sin accesibilidad es excluir a millones de usuarios.

## Los cuatro principios WCAG: POUR

Las **Web Content Accessibility Guidelines** (WCAG) se organizan en cuatro principios:

| Principio | Significado |
|---|---|
| **Perceivable** | La información debe poder percibirse (texto alternativo, subtítulos) |
| **Operable** | Debe poder usarse con teclado, ratón, voz, etc. |
| **Understandable** | Debe ser comprensible (lenguaje claro, errores descriptivos) |
| **Robust** | Debe funcionar en distintos navegadores y ayudas técnicas |

Cada principio se divide en **criterios** con tres niveles: **A**, **AA** y **AAA**. El nivel **AA** es el estándar exigido por ley en la mayoría de países.

## HTML semántico: la base

El mayor error de accesibilidad es usar `<div>` para todo. Un `<button>` no es solo un botón visual; es un elemento que los lectores de pantalla reconocen, que se activa con Enter y Espacio, y que recibe foco automáticamente.

```html
<!-- ❌ Mal -->
<div onclick="enviar()">Enviar</div>

<!-- ✅ Bien -->
<button type="button" onclick="enviar()">Enviar</button>
```

Etiquetas semánticas esenciales:

- `<button>` para acciones.
- `<a href="...">` para navegación (no `<a onclick>`).
- `<nav>`, `<main>`, `<header>`, `<footer>`, `<aside>`.
- `<h1>` a `<h6>` en orden jerárquico, sin saltarse niveles.
- `<label>` asociado a cada `<input>`.

## Textos alternativos

Toda imagen informativa necesita `alt`.

```html
<!-- Informativa -->
<img src="grafico-ventas.png" alt="Ventas de 2025: 45% en Q1, 30% en Q2, 25% en Q3">

<!-- Decorativa (sin alt, con role) -->
<img src="adorno.png" alt="" role="presentation">

<!-- Icono con enlace -->
<a href="/inicio">
  <img src="casa.svg" alt="Ir a la página de inicio">
</a>
```

!!! tip "Regla práctica"
    Pregúntate: *si no pudiera ver la imagen, ¿qué información perdería?* Eso es lo que va en el `alt`. Si no pierdes nada, `alt=""`.

## Contraste de color

El texto debe tener **contraste suficiente** con el fondo.

- **AA**: contraste mínimo 4.5:1 en texto normal, 3:1 en texto grande.
- **AAA**: 7:1 y 4.5:1 respectivamente.

Herramientas:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)
- DevTools de Chrome (pestaña "Accessibility").

Nunca uses **solo el color** para transmitir información.

```html
<!-- ❌ Mal: solo cambia el color -->
<p style="color: red;">Error en el formulario</p>

<!-- ✅ Bien: color + icono + texto -->
<p style="color: #b91c1c;">
  <span aria-hidden="true">⚠</span>
  <strong>Error:</strong> el email no es válido.
</p>
```

## Navegación por teclado

Todo debe poder usarse **sin ratón**. Prueba tu web pulsando `Tab` repetidamente:

- ¿Ves dónde está el foco?
- ¿Puedes llegar a todos los enlaces y botones?
- ¿Puedes activarlos con `Enter` o `Espacio`?
- ¿Puedes cerrar los modales con `Esc`?

### `:focus-visible`

Nunca elimines el contorno del foco sin reemplazarlo:

```css
/* ❌ Mal */
button:focus { outline: none; }

/* ✅ Bien */
button:focus-visible {
  outline: 3px solid #6a5acd;
  outline-offset: 2px;
}
```

### Orden de tabulación

El orden por defecto sigue el DOM. Si necesitas modificarlo, usa `tabindex`:

- `tabindex="0"`: añade el elemento al orden natural.
- `tabindex="-1"`: focuseable por script, pero no por teclado.
- `tabindex="1+"`: **evítalo**, rompe el orden natural.

## ARIA: cuándo y cómo usarlo

**ARIA** (*Accessible Rich Internet Applications*) añade semántica cuando HTML no la tiene. Su primera regla es:

!!! warning "Regla nº1 de ARIA"
    **No uses ARIA si puedes usar HTML nativo.** Un `<button>` con ARIA sigue siendo peor que un `<button>` nativo.

Atributos más usados:

| Atributo | Función |
|---|---|
| `role` | Define el tipo de elemento (`role="dialog"`, `role="alert"`) |
| `aria-label` | Nombre accesible cuando no hay texto visible |
| `aria-labelledby` | Referencia a otro elemento que da el nombre |
| `aria-describedby` | Referencia a otro elemento con descripción |
| `aria-hidden="true"` | Oculta de lectores de pantalla |
| `aria-live` | Anuncia cambios dinámicos |
| `aria-expanded` | Estado de un menú/acordeón |

### Ejemplo: botón con solo icono

```html
<button aria-label="Cerrar menú">
  <svg>...</svg>
</button>
```

### Ejemplo: alerta dinámica

```html
<div role="alert" aria-live="polite">
  Tu perfil se ha guardado correctamente.
</div>
```

### Ejemplo: acordeón

```html
<button aria-expanded="false" aria-controls="seccion1">
  ¿Qué es HTML?
</button>
<div id="seccion1" hidden>
  HTML es el lenguaje de marcado...
</div>
```

## Formularios accesibles

Cada input debe tener un `<label>` asociado:

```html
<label for="email">Correo electrónico</label>
<input type="email" id="email" name="email" required>
```

### Errores claros y asociados

```html
<label for="email">Correo</label>
<input
  type="email"
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
>
<p id="email-error" role="alert">El correo no tiene un formato válido.</p>
```

### Agrupaciones

```html
<fieldset>
  <legend>Método de pago</legend>
  <label><input type="radio" name="pago" value="tarjeta"> Tarjeta</label>
  <label><input type="radio" name="pago" value="paypal"> PayPal</label>
</fieldset>
```

## Skip links

Un enlace al inicio del `body` para saltar directamente al contenido:

```html
<a href="#main" class="skip-link">Saltar al contenido principal</a>
...
<main id="main">...</main>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #6a5acd;
  color: white;
  padding: 8px 16px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

## Movimiento reducido

Algunas personas sufren mareos con animaciones. Respétalo:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Herramientas para auditar

- **[axe DevTools](https://www.deque.com/axe/devtools/)** — extensión de navegador.
- **[Lighthouse](https://developers.google.com/web/tools/lighthouse)** — pestaña *Accessibility* en DevTools.
- **[WAVE](https://wave.webaim.org/)** — análisis online.
- **[Pa11y](https://pa11y.org/)** — CLI para CI.
- **Lectores de pantalla**: NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android).

## Testing manual imprescindible

Ninguna herramienta automática detecta todo. Prueba tú:

1. **Navega solo con teclado.** Sin ratón. Todo el flujo.
2. **Activa el lector de pantalla** y navega por la home.
3. **Pon el zoom al 200%.** ¿Sigue siendo usable?
4. **Usa modo alto contraste** del sistema operativo.
5. **Prueba con `prefers-reduced-motion`** activado.

## Buenas prácticas

- **HTML semántico primero**, ARIA solo cuando sea imprescindible.
- **Todos los `input` con `<label>`** asociado.
- **Todos los botones con texto visible o `aria-label`**.
- **Contraste AA mínimo** siempre.
- **Foco visible** en todos los elementos interactivos.
- **Enlaces con texto descriptivo**: "Descargar el informe anual" en lugar de "clic aquí".
- **`lang` correcto** en `<html lang="es">`.
- **Títulos jerárquicos** sin saltos (`h1` → `h2` → `h3`).
- **No bloquees el zoom** con `user-scalable=no`.

## Ejercicios

1. Audita tu portfolio con Lighthouse y corrige los problemas detectados.
2. Navega toda la home solo con `Tab`. Anota qué no funciona bien.
3. Añade un skip link y verifícalo con el teclado.
4. Crea un formulario accesible con errores bien asociados.
5. Implementa `prefers-reduced-motion` en tus animaciones.
6. Escribe un `<dialog>` accesible (foco atrapado, cierre con Esc, retorno del foco).

---

⬅️ [Capítulo 13 — Módulos y bundlers](13-modulos-bundlers.md) | ➡️ [Capítulo 15 — TypeScript desde cero](15-typescript.md)
---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz-container" data-correct="b">
  <p class="quiz-question">¿Qué significa la sigla WCAG?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) Web Code Accessibility Group</button>
    <button class="quiz-option" data-option="b">B) Web Content Accessibility Guidelines</button>
    <button class="quiz-option" data-option="c">C) World Computer Access Gateway</button>
  </div>
  <div class="quiz-feedback"></div>
</div>

<div class="quiz-container" data-correct="c">
  <p class="quiz-question">¿Qué atributo es esencial en las imágenes para que los lectores de pantalla las describan?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) title</button>
    <button class="quiz-option" data-option="b">B) src</button>
    <button class="quiz-option" data-option="c">C) alt</button>
  </div>
  <div class="quiz-feedback"></div>
</div>