---
description: "Chapter 25 of the Web Developer's Book: 25 — Design Systems. Learn step by step with examples, exercises, and quizzes."
---
# 25 — Design Systems

!!! abstract "What you will learn"
    - What a design system is and why it matters.
    - Design tokens: colors, typography, spacing.
    - Reusable components.
    - Documentation with Storybook.
    - Governance and maintenance.

---

## 🎨 What is a Design System?

A **design system** is a collection of **reusable components**, **style guides**, and **rules** that guarantee visual and behavioral consistency across a product. It isn't just a component library—it's a shared language between design and development.

!!! quote "A design system is a product, not a project"
    You don't build it once and forget it. You maintain it, document it, and version it like any other product.

---

## 🎯 Why Use a Design System?

| Benefit | Description |
| :--- | :--- |
| **Consistency** | Every button looks and behaves the same way |
| **Speed** | Teams don't reinvent the wheel |
| **Scalability** | Adding a feature is faster |
| **Maintainability** | Changing a color happens in one place |
| **Communication** | Design and engineering speak the same language |

---

## 🎨 Design Tokens

**Design tokens** are the atomic values of the system: colors, typography, spacing, shadows, radii… You define them once and use them everywhere.

```css
:root {
  /* Colors */
  --color-primary: #6a5acd;
  --color-primary-hover: #7d6ce0;
  --color-success: #28a745;
  --color-danger: #dc3545;

  /* Typography */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --text-sm: .875rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;

  /* Spacing */
  --space-1: .25rem;
  --space-2: .5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,.1);
  --shadow-lg: 0 12px 32px rgba(0,0,0,.15);
}
```

!!! tip "Token naming"
    Use **semantic** names, not visual ones: `--color-primary` is better than `--color-purple`. If the color changes, the name still makes sense.

---

## 🧩 Components

Every component should:

1. **Have a clear API** (props/attributes).
2. **Be accessible** (keyboard, ARIA, contrast).
3. **Be testable** (unit + visual).
4. **Be documented** (props, examples, when to use it).
5. **Be versioned** (compatible changes vs. breaking).

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

**Storybook** is the standard tool for documenting and testing components in isolation.

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

!!! tip "Storybook is living documentation"
    Each component has its "stories": real use cases that serve as documentation, visual tests, and a playground for designers.

---

## 🏛 Governance

A design system without governance dies in 6 months. You need:

- **Owner**: someone accountable for the system.
- **Contribution process**: how new components are added.
- **Semantic versioning**: MAJOR.MINOR.PATCH.
- **Changelog**: what changes in each release.
- **Deprecation policy**: when and how components are removed.
- **Communication**: Slack/Discord channel, internal newsletter.

---

## ✅ Best Practices

- ✅ **Start small**: 5-10 well-built components beat 50 half-baked ones.
- ✅ **Document every component**: props, examples, when to use it and when not to.
- ✅ **Version with semver**: breaking changes should be rare and announced.
- ✅ **Test visually**: Chromatic, Percy, or reg-suit.
- ✅ **Involve design**: the system belongs to both teams.
- ✅ **Measure adoption**: how many teams use it? How many components are reused?
- ❌ **Don't build everything at once**: start with the most-used components.

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-25">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What are design tokens?</p>
<button class="quiz-option" data-opt="a">A) React components</button>
<button class="quiz-option" data-opt="b">B) Atomic system values (colors, typography, spacing)</button>
<button class="quiz-option" data-opt="c">C) SVG icons</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which tool documents components in isolation?</p>
<button class="quiz-option" data-opt="a">A) Storybook</button>
<button class="quiz-option" data-opt="b">B) Figma</button>
<button class="quiz-option" data-opt="c">C) Webpack</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> What is design system governance?</p>
<button class="quiz-option" data-opt="a">A) Button color</button>
<button class="quiz-option" data-opt="b">B) Component documentation</button>
<button class="quiz-option" data-opt="c">C) Rules for contribution, versioning, and maintenance</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2025%3A%20Design%20Systems&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F25-design-systems%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F25-design-systems%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2025%3A%20Design%20Systems%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F25-design-systems%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/25-design-systems/" aria-label="Copy link">Copy link</button>
</div>

---

## 🏆 You Finished the Expert Level!

If you made it this far, you already know:

- Native Web Components
- PWA: manifest, service worker, offline
- WebSockets: real time
- Advanced animations: CSS, WAAPI, GSAP
- Design systems: tokens, components, Storybook

!!! quote "Congratulations"
    You moved from frontend to expert. Now comes the **Elite Level**: security, WebAssembly, AI, WebXR, and Web3.

---

## ➡ Next Step

[Go to Chapter 26 — Seguridad web](26-seguridad.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }