# Capítulo 25 — Design systems

## Introducción

Un **design system** es un conjunto de decisiones compartidas sobre diseño y código: colores, tipografía, espaciado, componentes reutilizables, patrones de interacción y reglas de uso.

No es una librería de componentes. No es una guía de estilo. Es **todo junto** y, sobre todo, es un **producto vivo** que evoluciona con el equipo.

Empresas como Airbnb, Shopify, GitHub, Stripe o IBM tienen design systems públicos. No es casualidad: ahorran tiempo, evitan inconsistencias y aceleran a los equipos.

## ¿Por qué importa?

### Sin design system

- Cada desarrollador elige colores distintos.
- Los botones tienen 8 tamaños diferentes.
- Los espaciados son aleatorios.
- Cada nuevo proyecto empieza de cero.
- Diseño y desarrollo se pisan constantemente.

### Con design system

- **Consistencia visual** en todos los productos.
- **Velocidad**: los componentes ya existen.
- **Documentación viva**: el equipo sabe qué usar y cuándo.
- **Onboarding rápido**: nuevos miembros entienden las reglas.
- **Escalabilidad**: sirve para una web, una app y un panel.

## Anatomía de un design system

Un design system completo incluye:

1. **Fundamentos** (design tokens): colores, tipografía, espaciado, radios, sombras.
2. **Componentes**: botones, inputs, tarjetas, modales…
3. **Patrones**: formularios, navegación, layouts.
4. **Reglas de uso**: cuándo usar cada cosa.
5. **Documentación**: guías escritas.
6. **Código**: implementación en tu stack.
7. **Gobernanza**: cómo evoluciona y quién decide.

## Design tokens

Los **tokens** son las unidades mínimas del sistema: valores con nombre.

### Colores

```css
:root {
  /* Primarios */
  --color-primary-50:  #faf5ff;
  --color-primary-100: #f3e8ff;
  --color-primary-300: #d8b4fe;
  --color-primary-500: #a855f7;
  --color-primary-700: #7e22ce;
  --color-primary-900: #581c87;

  /* Semánticos */
  --color-bg:      #ffffff;
  --color-surface: #f8fafc;
  --color-text:    #1e293b;
  --color-muted:   #64748b;
  --color-border:  #e2e8f0;

  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-danger:  #dc2626;
  --color-info:    #0891b2;
}
```

!!! tip "Tokens semánticos > tokens primitivos"
    Usa `--color-primary-500` para definir la paleta, pero en componentes usa `--color-bg` o `--color-text`. Así puedes cambiar el tema sin tocar componentes.

### Tipografía

```css
:root {
  --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, "Cascadia Code", monospace;

  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  1.875rem;  /* 30px */
  --text-4xl:  2.25rem;   /* 36px */

  --leading-tight:  1.25;
  --leading-normal: 1.5;
  --leading-loose:  1.75;

  --font-normal:   400;
  --font-medium:   500;
  --font-semibold: 600;
  --font-bold:     700;
}
```

### Espaciado

Escala basada en múltiplos de 4:

```css
:root {
  --space-1:  0.25rem;  /* 4px */
  --space-2:  0.5rem;   /* 8px */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-5:  1.25rem;  /* 20px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
}
```

### Radios, sombras y transiciones

```css
:root {
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  12px;
  --radius-xl:  20px;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.12);

  --transition-fast: 150ms ease-out;
  --transition-base: 250ms ease-out;
  --transition-slow: 400ms ease-out;
}
```

## Documentar los tokens

Un token sin contexto no sirve. Cada uno debería responder:

- **Qué es**: un color, un espacio, una sombra.
- **Cuándo usarlo**: en este contexto concreto.
- **Cuándo NO usarlo**: para evitar malos usos.
- **Ejemplo**: en el código real.

Ejemplo de documentación:

```markdown
### `--color-primary-500`

**Tipo**: Color · **Uso**: acciones principales.

Úsalo para el fondo de botones primarios, enlaces activos y elementos destacados.

**No usar** para texto largo sobre fondo blanco: no pasa contraste AA.

```css
.button-primary {
  background: var(--color-primary-500);
  color: white;
}
```
```

## Componentes

Cada componente debe:

- **Ser configurable** mediante props/atributos.
- **Tener un estado por defecto**.
- **Ser accesible** (teclado, ARIA, contraste).
- **Estar documentado** con ejemplos.
- **Estar testeado**.

### Ejemplo: botón

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-fast);
}

.btn:active {
  transform: scale(0.98);
}

.btn:focus-visible {
  outline: 3px solid var(--color-primary-300);
  outline-offset: 2px;
}

/* Variantes */
.btn--primary {
  background: var(--color-primary-500);
  color: white;
}
.btn--primary:hover {
  background: var(--color-primary-700);
}

.btn--secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn--danger {
  background: var(--color-danger);
  color: white;
}

/* Tamaños */
.btn--sm { padding: var(--space-1) var(--space-3); font-size: var(--text-sm); }
.btn--lg { padding: var(--space-3) var(--space-6); font-size: var(--text-lg); }
```

Uso:

```html
<button class="btn btn--primary">Guardar</button>
<button class="btn btn--secondary btn--sm">Cancelar</button>
<button class="btn btn--danger btn--lg">Eliminar cuenta</button>
```

### Ejemplo: tarjeta

```css
.card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-base), transform var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card__title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin: 0 0 var(--space-2);
}

.card__body {
  color: var(--color-muted);
  line-height: var(--leading-normal);
}
```

## Modo oscuro con tokens

Gracias a los tokens, cambiar de tema es trivial:

```css
:root {
  --color-bg: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #1e293b;
  --color-muted: #64748b;
  --color-border: #e2e8f0;
}

[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-surface: #1e293b;
  --color-text: #e2e8f0;
  --color-muted: #94a3b8;
  --color-border: #334155;
}
```

Cambio desde JavaScript:

```javascript
document.documentElement.dataset.theme = 'dark';
```

Todo el sitio se adapta **automáticamente** porque los componentes usan tokens semánticos.

## Estructura de un design system

```
design-system/
├── tokens/
│   ├── colors.css
│   ├── typography.css
│   ├── spacing.css
│   └── index.css
├── components/
│   ├── button/
│   │   ├── button.css
│   │   ├── button.js
│   │   └── button.stories.js
│   ├── input/
│   └── card/
├── patterns/
│   ├── form/
│   └── navigation/
├── utils/
├── docs/
└── README.md
```

## Herramientas

### Storybook

El estándar para documentar y probar componentes de forma aislada.

```bash
npx storybook@latest init
```

```javascript
// button.stories.js
import { html } from 'lit';

export default {
  title: 'Componentes/Button',
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

const Template = ({ variant, size, label }) => html`
  <button class="btn btn--${variant} btn--${size}">${label}</button>
`;

export const Primary = Template.bind({});
Primary.args = { variant: 'primary', size: 'md', label: 'Guardar' };

export const Danger = Template.bind({});
Danger.args = { variant: 'danger', size: 'md', label: 'Eliminar' };
```

### Style Dictionary

Convierte tokens definidos en JSON a CSS, SCSS, iOS, Android…

```json
{
  "color": {
    "primary": {
      "500": { "value": "#a855f7" },
      "700": { "value": "#7e22ce" }
    }
  }
}
```

```bash
npx style-dictionary build
```

### Chromatic

Servicio de **visual regression testing** para Storybook. Detecta cambios visuales no intencionados en cada PR.

## Gobernanza

Un design system sin reglas se pudre. Define:

- **Quién mantiene** el sistema.
- **Cómo se proponen cambios** (issue, PR, RFC).
- **Cómo se versiona** (SemVer: el sistema es un producto).
- **Cómo se comunica** (changelog, newsletter interna).
- **Cómo se mide el uso** (analytics de componentes).

Un patrón común es **Figma + GitHub + Storybook**:

- Diseño en Figma.
- Tokens sincronizados a código.
- Componentes documentados en Storybook.
- Cambios revisados por PR.

## Design systems famosos

Estudia los que ya existen:

- **[Material Design](https://m3.material.io/)** — Google.
- **[Carbon](https://carbondesignsystem.com/)** — IBM.
- **[Polaris](https://polaris.shopify.com/)** — Shopify.
- **[Primer](https://primer.style/)** — GitHub.
- **[Atlassian Design System](https://atlassian.design/)**.
- **[Adobe Spectrum](https://spectrum.adobe.com/)**.
- **[GOV.UK Design System](https://design-system.service.gov.uk/)** — referencia en accesibilidad.

## Buenas prácticas

- **Empieza pequeño**. No intentes cubrir todo el producto el primer día.
- **Tokens primero**. Antes de componentes.
- **Componentes accesibles**. Nunca sacrifiques a11y por estética.
- **Documenta el porqué**, no solo el cómo.
- **Versiona con SemVer**. Los cambios rompen proyectos.
- **Mide el uso**. Si un componente no se usa, cuestiónalo.
- **Un componente, una responsabilidad**.
- **Consistencia > perfección**.
- **Itera**. Un design system nunca está "terminado".
- **Adóptalo tú primero**. Si tu propio equipo no lo usa, nadie lo hará.

## Ejercicios

1. Define tus tokens: 10 colores, 8 tamaños de tipografía, 8 espaciados.
2. Aplica tokens a un componente Button con 3 variantes y 3 tamaños.
3. Añade modo oscuro cambiando solo los tokens semánticos.
4. Documenta un componente con Storybook (o página HTML estática).
5. Crea una página `/design-system` en tu web con todos los componentes.
6. Publica tus tokens con Style Dictionary en CSS y SCSS.
7. Establece una regla: "todo color debe venir de un token".
8. Revisa un proyecto tuyo y sustituye valores sueltos por tokens.

---

⬅️ [Capítulo 24 — Animaciones avanzadas](24-animaciones.md) | ➡️ [Apéndices](../apendices/index.md)
---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz-container" data-correct="c">
  <p class="quiz-question">¿Qué son los "design tokens"?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) Componentes de React</button>
    <button class="quiz-option" data-option="b">B) Animaciones predefinidas</button>
    <button class="quiz-option" data-option="c">C) Valores reutilizables (colores, espaciados, tipografía) que definen el sistema</button>
  </div>
  <div class="quiz-feedback"></div>
</div>

<div class="quiz-container" data-correct="a">
  <p class="quiz-question">¿Qué regla CSS permite controlar el orden de precedencia sin depender de la especificidad?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) @layer</button>
    <button class="quiz-option" data-option="b">B) @scope</button>
    <button class="quiz-option" data-option="c">C) @container</button>
  </div>
  <div class="quiz-feedback"></div>
</div>