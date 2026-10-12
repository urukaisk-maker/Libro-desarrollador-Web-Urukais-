# Ejercicios resueltos — Capítulo 25

[Volver al índice](index.md) · [Capítulo original](../capitulos/25-design-systems.md)

## Ejercicio 1: Definir tokens

> Define tus tokens: 10 colores, 8 tamaños de tipografía, 8 espaciados.

### Solución

```css
:root {
  /* Colores primarios */
  --color-primary-50: #faf5ff;
  --color-primary-500: #a855f7;
  --color-primary-700: #7e22ce;
  --color-primary-900: #581c87;

  /* Semánticos */
  --color-bg: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #1e293b;
  --color-muted: #64748b;
  --color-border: #e2e8f0;
  --color-danger: #dc2626;

  /* Tipografía */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  /* Espaciado (múltiplos de 4) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
}
```

---

## Ejercicio 2: Componente Button

> Aplica tokens a un Button con 3 variantes y 3 tamaños.

### Solución

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border: none;
  border-radius: 8px;
  font-family: system-ui, sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms ease-out, transform 150ms ease-out;
}

.btn:active { transform: scale(0.98); }
.btn:focus-visible { outline: 3px solid var(--color-primary-500); outline-offset: 2px; }

/* Variantes */
.btn--primary {
  background: var(--color-primary-500);
  color: white;
}
.btn--primary:hover { background: var(--color-primary-700); }

.btn--secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
.btn--secondary:hover { background: var(--color-surface); }

.btn--danger {
  background: var(--color-danger);
  color: white;
}

/* Tamaños */
.btn--sm {
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-sm);
}

.btn--md {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-base);
}

.btn--lg {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-lg);
}
```

```html
<button class="btn btn--primary btn--md">Guardar</button>
<button class="btn btn--secondary btn--sm">Cancelar</button>
<button class="btn btn--danger btn--lg">Eliminar</button>
```

---

## Ejercicio 3: Modo oscuro solo con tokens semánticos

> Añade modo oscuro cambiando solo tokens.

### Solución

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

body {
  background: var(--color-bg);
  color: var(--color-text);
  transition: background 300ms, color 300ms;
}
```

**Todo el sistema se adapta sin tocar componentes.** Solo cambia `data-theme`.

---

## Ejercicio 4: Documentar con Storybook

> Documenta un componente.

### Solución

Instala:

```bash
npx storybook@latest init
```

Crea `button.stories.js`:

```javascript
export default {
  title: 'Componentes/Button',
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

const Template = ({ variant, size, label }) =>
  `<button class="btn btn--${variant} btn--${size}">${label}</button>`;

export const Primary = Template.bind({});
Primary.args = { variant: 'primary', size: 'md', label: 'Guardar' };

export const Danger = Template.bind({});
Danger.args = { variant: 'danger', size: 'lg', label: 'Eliminar' };
```

Ejecuta:

```bash
npm run storybook
```

---

## Ejercicio 5: Página `/design-system`

> Crea una página con todos los componentes.

### Solución

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Design System</title>
  <link rel="stylesheet" href="tokens.css">
  <link rel="stylesheet" href="componentes.css">
</head>
<body>
  <h1>Design System</h1>

  <section>
    <h2>Colores</h2>
    <div class="paleta">
      <div class="swatch" style="background: var(--color-primary-500)">
        <span>primary-500</span>
      </div>
      <div class="swatch" style="background: var(--color-danger)">
        <span>danger</span>
      </div>
    </div>
  </section>

  <section>
    <h2>Tipografía</h2>
    <h1>text-4xl</h1>
    <h2>text-3xl</h2>
    <h3>text-2xl</h3>
    <p>text-base: párrafo normal.</p>
  </section>

  <section>
    <h2>Botones</h2>
    <button class="btn btn--primary btn--md">Primary</button>
    <button class="btn btn--secondary btn--md">Secondary</button>
    <button class="btn btn--danger btn--md">Danger</button>
  </section>

  <section>
    <h2>Espaciado</h2>
    <div style="background:#e2e8f0; padding: var(--space-2)">space-2</div>
    <div style="background:#e2e8f0; padding: var(--space-4)">space-4</div>
    <div style="background:#e2e8f0; padding: var(--space-8)">space-8</div>
  </section>
</body>
</html>
```

---

## Ejercicio 6: Tokens con Style Dictionary

> Publica tus tokens en CSS y SCSS.

### Solución

```bash
npx style-dictionary init basic
```

`tokens/color.json`:

```json
{
  "color": {
    "primary": {
      "500": { "value": "#a855f7" },
      "700": { "value": "#7e22ce" }
    },
    "danger": { "value": "#dc2626" }
  }
}
```

`config.json`:

```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "build/css/",
      "files": [{ "destination": "variables.css", "format": "css/variables" }]
    },
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [{ "destination": "_variables.scss", "format": "scss/variables" }]
    }
  }
}
```

Ejecuta:

```bash
npx style-dictionary build
```

---

## Ejercicio 7: Regla "todo color viene de un token"

> Establece y aplica la regla.

### Solución

**Regla**: en el código, ningún valor de color puede ser literal. Siempre `var(--color-...)`.

**Mal:**

```css
.button { background: #6a5acd; } /* ❌ */
.text { color: #1e293b; } /* ❌ */
```

**Bien:**

```css
.button { background: var(--color-primary-500); } /* ✅ */
.text { color: var(--color-text); } /* ✅ */
```

**Cómo hacerlo cumplir:**

Añade un linter de estilo:

```bash
npm install -D stylelint stylelint-declaration-strict-value
```

`.stylelintrc.json`:

```json
{
  "plugins": ["stylelint-declaration-strict-value"],
  "rules": {
    "scale-unlimited/declaration-strict-value": [
      ["color", "background-color", "border-color", "fill", "stroke"],
      { "ignoreValues": ["transparent", "currentColor", "inherit"] }
    ]
  }
}
```

Ejecuta `npx stylelint "**/*.css"` en CI para bloquear colores hardcodeados.

---

## Ejercicio 8: Auditar un proyecto

> Sustituye valores sueltos por tokens.

### Solución

**Checklist:**

- [ ] Buscar `#[0-9a-f]{3,6}` en tu CSS.
- [ ] Para cada color encontrado, crear o reutilizar un token.
- [ ] Buscar valores de espaciado sueltos (`margin: 17px`).
- [ ] Ajustar a la escala (`--space-4: 1rem`).
- [ ] Buscar tamaños de fuente sueltos.
- [ ] Sustituir por `--text-*`.
- [ ] Verificar visualmente que nada se rompe.

**Comando útil:**

```bash
grep -rn "#[0-9a-fA-F]\{3,6\}" src/
```

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/25-design-systems.md)
