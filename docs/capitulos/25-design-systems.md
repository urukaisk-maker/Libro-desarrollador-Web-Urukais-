# 25 — Design systems

!!! abstract "Qué vas a aprender"
    - Qué es un design system y por qué importa.
    - Design tokens: colores, tipografía, espaciado.
    - Componentes reutilizables.
    - Documentación con Storybook.
    - Gobernanza y mantenimiento.

---

## 🎨 ¿Qué es un design system?

Un **design system** es un conjunto de **componentes reutilizables**, **guías de estilo** y **reglas** que garantizan coherencia visual y de comportamiento en un producto. No es solo una librería de componentes: es un lenguaje compartido entre diseño y desarrollo.

!!! quote "Un design system es un producto, no un proyecto"
    No se hace una vez y se olvida. Se mantiene, se documenta y se versiona como cualquier otro producto.

---

## 🎯 ¿Por qué usar un design system?

| Ventaja | Descripción |
| :--- | :--- |
| **Consistencia** | Todos los botones se ven y se comportan igual |
| **Velocidad** | Los equipos no reinventan la rueda |
| **Escalabilidad** | Añadir una feature es más rápido |
| **Mantenibilidad** | Cambiar un color se hace en un sitio |
| **Comunicación** | Diseño y desarrollo hablan el mismo idioma |

---

## 🎨 Design tokens

Los **design tokens** son los valores atómicos del sistema: colores, tipografía, espaciado, sombras, radios… Se definen una vez y se usan en todas partes.

```css
:root {
  /* Colores */
  --color-primary: #6a5acd;
  --color-primary-hover: #7d6ce0;
  --color-success: #28a745;
  --color-danger: #dc3545;

  /* Tipografía */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --text-sm: .875rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;

  /* Espaciado */
  --space-1: .25rem;
  --space-2: .5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;

  /* Radios */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  /* Sombras */
  --shadow-sm: 0 1px 2px rgba(0,0,0,.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,.1);
  --shadow-lg: 0 12px 32px rgba(0,0,0,.15);
}
```

!!! tip "Nomenclatura de tokens"
    Usa nombres **semánticos**, no visuales: `--color-primary` mejor que `--color-purple`. Si cambias el color, el nombre sigue teniendo sentido.

---

## 🧩 Componentes

Cada componente debe:

1. **Tener una API clara** (props/atributos).
2. **Ser accesible** (teclado, ARIA, contraste).
3. **Ser testeable** (unitario + visual).
4. **Estar documentado** (props, ejemplos, cuándo usarlo).
5. **Ser versionado** (cambios compatibles vs breaking).

```jsx
// Button.jsx
export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick
}) {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

---

## 📚 Storybook

**Storybook** es la herramienta estándar para documentar y probar componentes de forma aislada.

```bash
npx storybook@latest init
npm run storybook
```

```jsx
// Button.stories.jsx
import { Button } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["sm", "md", "lg"] }
  }
};

export const Primary = {
  args: { children: "Haz clic", variant: "primary" }
};

export const Secondary = {
  args: { children: "Cancelar", variant: "secondary" }
};
```

!!! tip "Storybook es la documentación viva"
    Cada componente tiene sus "stories": casos de uso reales que sirven como documentación, tests visuales y playground para diseñadores.

---

## 🏛️ Gobernanza

Un design system sin gobernanza muere en 6 meses. Necesitas:

- **Owner**: alguien responsable del sistema.
- **Proceso de contribución**: cómo se añaden componentes nuevos.
- **Versionado semántico**: MAJOR.MINOR.PATCH.
- **Changelog**: qué cambia en cada versión.
- **Deprecation policy**: cuándo y cómo se eliminan componentes.
- **Comunicación**: canal de Slack/Discord, newsletter interna.

---

## ✅ Buenas prácticas

- ✅ **Empieza pequeño**: 5-10 componentes bien hechos valen más que 50 a medias.
- ✅ **Documenta cada componente**: props, ejemplos, cuándo usarlo y cuándo no.
- ✅ **Versiona con semver**: los breaking changes deben ser raros y avisados.
- ✅ **Testea visualmente**: Chromatic, Percy o reg-suit.
- ✅ **Involucra a diseño**: el sistema es de ambos equipos.
- ✅ **Mide adopción**: ¿cuántos equipos lo usan? ¿cuántos componentes se reutilizan?
- ❌ **No lo hagas todo de golpe**: empieza por los componentes más usados.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-25">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué son los design tokens?</p>
<button class="quiz-option" data-opt="a">A) Componentes de React</button>
<button class="quiz-option" data-opt="b">B) Valores atómicos del sistema (colores, tipografía, espaciado)</button>
<button class="quiz-option" data-opt="c">C) Iconos SVG</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué herramienta documenta componentes de forma aislada?</p>
<button class="quiz-option" data-opt="a">A) Storybook</button>
<button class="quiz-option" data-opt="b">B) Figma</button>
<button class="quiz-option" data-opt="c">C) Webpack</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué es la gobernanza de un design system?</p>
<button class="quiz-option" data-opt="a">A) El color de los botones</button>
<button class="quiz-option" data-opt="b">B) La documentación de componentes</button>
<button class="quiz-option" data-opt="c">C) Las reglas de contribución, versionado y mantenimiento</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2025%3A%20Design%20systems&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F25-design-systems%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F25-design-systems%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2025%3A%20Design%20systems%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F25-design-systems%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/25-design-systems/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## 🏆 ¡Has terminado el Nivel Experto!

Si has llegado hasta aquí, ya sabes:

- Web Components nativos
- PWA: manifest, service worker, offline
- WebSockets: tiempo real
- Animaciones avanzadas: CSS, WAAPI, GSAP
- Design systems: tokens, componentes, Storybook

!!! quote "Enhorabuena"
    Has pasado de frontend a experto. Ahora toca el **Nivel Élite**: seguridad, WebAssembly, IA, WebXR y Web3.

---

## ➡️ Siguiente paso

[Ir al Capítulo 26 — Seguridad web](26-seguridad.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
