# 14 — Accesibilidad web

!!! abstract "Qué vas a aprender"
    - Qué es la accesibilidad y por qué es obligatoria.
    - Las pautas WCAG.
    - HTML semántico y ARIA.
    - Navegación por teclado.
    - Contraste y herramientas de auditoría.

---

## ♿ ¿Qué es la accesibilidad?

La **accesibilidad web** (a11y) es la práctica de diseñar webs que **cualquier persona pueda usar**, incluyendo quienes tienen discapacidades visuales, auditivas, motoras o cognitivas.

!!! quote "No es un extra, es parte del trabajo"
    La accesibilidad no es un checkbox que se marca al final. Es una forma de pensar el desarrollo desde el primer div.

---

## 📜 Las pautas WCAG

Las **WCAG** (*Web Content Accessibility Guidelines*) son el estándar internacional. Tienen tres niveles:

| Nivel | Descripción |
| :--- | :--- |
| **A** | Nivel mínimo. Obligatorio por ley en muchos países. |
| **AA** | Nivel recomendado. El objetivo habitual. |
| **AAA** | Nivel máximo. Muy difícil de cumplir al 100%. |

Los **cuatro principios** de WCAG (POUR):

1. **Perceptible**: la información debe ser presentada de forma que todos puedan percibirla.
2. **Operable**: la interfaz debe poder usarse con teclado u otros dispositivos.
3. **Comprensible**: el contenido y la interfaz deben ser entendibles.
4. **Robusto**: debe funcionar con diferentes tecnologías de asistencia.

---

## 🏗️ HTML semántico

El HTML semántico es la base de la accesibilidad. Los lectores de pantalla lo entienden.

```html
<!-- Correcto -->
<button onclick="enviar()">Enviar</button>
<nav><a href="/inicio">Inicio</a></nav>
<main><h1>Título</h1></main>

<!-- Incorrecto -->
<div onclick="enviar()">Enviar</div>
<div class="nav"><a href="/inicio">Inicio</a></div>
```

!!! warning "Un div no es un botón"
    Un div con onclick no es accesible: no se puede enfocar con Tab, no se activa con Enter, no lo anuncian los lectores de pantalla. Usa button.

---

## 🏷️ ARIA: cuándo y cómo usarlo

**ARIA** (*Accessible Rich Internet Applications*) son atributos que añaden semántica a elementos que HTML no cubre.

```html
<div role="alert">Error: contraseña incorrecta</div>
<button aria-label="Cerrar menú">✕</button>
<nav aria-label="Navegación principal">...</nav>
```

!!! warning "Regla de oro de ARIA"
    **No uses ARIA si puedes usar HTML nativo.** Un button ya tiene role=button implícito. ARIA solo cuando no hay otra opción.

---

## ⌨️ Navegación por teclado

Toda web debe poder usarse **solo con el teclado**. Prueba a navegar con Tab, Enter, Escape y las flechas.

```css
/* Nunca elimines el outline sin sustituirlo */
:focus-visible {
  outline: 2px solid #6a5acd;
  outline-offset: 2px;
}
```

!!! tip "Prueba con Tab"
    Abre tu web y pulsa Tab repetidamente. ¿Ves dónde está el foco? ¿Puedes llegar a todos los botones y enlaces? Si no, tienes un problema de accesibilidad.

---

## 🎨 Contraste de color

El contraste entre texto y fondo debe cumplir **WCAG AA**:

| Elemento | Ratio mínimo |
| :--- | :--- |
| Texto normal | 4.5:1 |
| Texto grande (18pt+ o 14pt+ bold) | 3:1 |
| Componentes de UI (bordes, iconos) | 3:1 |

Herramientas para comprobarlo:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Contrast Checker](https://coolors.co/contrast-checker)
- Lighthouse (en Chrome DevTools)

---

## 📝 Formularios accesibles

```html
<label for="email">Email:</label>
<input type="email" id="email" name="email" required
       aria-describedby="email-error">
<small id="email-error" class="error">Introduce un email válido</small>
```

Buenas prácticas:

- ✅ Asocia cada input con un `<label>`.
- ✅ Usa `aria-describedby` para mensajes de error.
- ✅ Marca los campos obligatorios con `required`.
- ✅ Agrupa campos relacionados con `<fieldset>` y `<legend>`.
- ✅ Da feedback claro cuando algo falla.

!!! warning "El placeholder no es un label"
    El placeholder desaparece al escribir y no lo leen todos los lectores de pantalla. Siempre usa un label visible.

---

## 🖼️ Imágenes y multimedia

```html
<!-- Imagen informativa -->
<img src="grafico.png" alt="Ventas del trimestre: 40% en enero, 35% en febrero, 25% en marzo">

<!-- Imagen decorativa -->
<img src="decoracion.png" alt="">

<!-- Vídeo con subtítulos -->
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="subtitulos.vtt" srclang="es" label="Español">
</video>
```

!!! tip "El alt correcto"
    - Si la imagen aporta información, describe **qué información aporta**.
    - Si es decorativa, usa `alt=""` (vacío).
    - No empieces con "Imagen de..." (los lectores ya lo dicen).

---

## 🔍 Herramientas de auditoría

| Herramienta | Qué mide |
| :--- | :--- |
| **Lighthouse** (Chrome DevTools) | Accesibilidad, rendimiento, SEO, PWA |
| **axe DevTools** | Errores de accesibilidad detallados |
| **WAVE** | Evaluación visual de accesibilidad |
| **Pa11y** | Auditoría por línea de comandos |
| **Screen Reader** (NVDA, VoiceOver) | Cómo lo percibe una persona ciega |

!!! tip "Prueba con un lector de pantalla"
    Nada sustituye a probar tu web con un lector de pantalla real. En Linux puedes usar **Orca**, en Windows **NVDA** (gratis), en macOS **VoiceOver** (integrado).

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-14">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué significa WCAG?</p>
<button class="quiz-option" data-opt="a">A) Web Code Accessibility Guide</button>
<button class="quiz-option" data-opt="b">B) Web Content Accessibility Guidelines</button>
<button class="quiz-option" data-opt="c">C) World Consortium Access Group</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué ratio de contraste mínimo exige WCAG AA para texto normal?</p>
<button class="quiz-option" data-opt="a">A) 4.5:1</button>
<button class="quiz-option" data-opt="b">B) 2:1</button>
<button class="quiz-option" data-opt="c">C) 10:1</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Cuándo se usa aria-label?</p>
<button class="quiz-option" data-opt="a">A) Siempre, en todos los elementos</button>
<button class="quiz-option" data-opt="b">B) Nunca</button>
<button class="quiz-option" data-opt="c">C) Cuando no hay texto visible que describa el elemento</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2014%3A%20Accesibilidad%20web&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F14-accesibilidad%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F14-accesibilidad%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2014%3A%20Accesibilidad%20web%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F14-accesibilidad%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/14-accesibilidad/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 15 — TypeScript desde cero](15-typescript.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
