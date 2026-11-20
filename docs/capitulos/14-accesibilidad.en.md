---
description: "Chapter 14 of the Web Developer's Book: 14 — Web Accessibility. Learn step by step with examples, exercises, and quizzes."
---
# 14 — Web Accessibility

!!! abstract "What you will learn"
    - What accessibility is and why it is mandatory.
    - The WCAG guidelines.
    - Semantic HTML and ARIA.
    - Keyboard navigation.
    - Contrast and auditing tools.

---

## ♿ What is Accessibility?

**Web accessibility** (a11y) is the practice of designing websites that **anyone can use**, including people with visual, auditory, motor, or cognitive disabilities.

!!! quote "Not an extra, it is part of the job"
    Accessibility is not a checkbox you tick at the end. It is a way of thinking about development from the very first div.

---

## 📜 The WCAG Guidelines

**WCAG** (*Web Content Accessibility Guidelines*) are the international standard. They have three levels:

| Level | Description |
| :--- | :--- |
| **A** | Minimum level. Legally required in many countries. |
| **AA** | Recommended level. The standard target. |
| **AAA** | Maximum level. Very hard to meet at 100%. |

The **four principles** of WCAG (POUR):

1. **Perceivable**: information must be presented in ways everyone can perceive.
2. **Operable**: the interface must be usable with a keyboard or other devices.
3. **Understandable**: content and interface must be easy to understand.
4. **Robust**: must work reliably with different assistive technologies.

---

## 🏗 Semantic HTML

Semantic HTML is the foundation of accessibility. Screen readers understand it.

```html
<!-- Correct -->
<button onclick="enviar()">Send</button>
<nav><a href="/inicio">Home</a></nav>
<main><h1>Title</h1></main>

<!-- Incorrect -->
<div onclick="enviar()">Send</div>
<div class="nav"><a href="/inicio">Home</a></div>
```

!!! warning "A div is not a button"
    A div with onclick is not accessible: it cannot be focused with Tab, cannot be activated with Enter, and screen readers don't announce it as a button. Use button.

---

## 🏷 ARIA: When and How to Use It

**ARIA** (*Accessible Rich Internet Applications*) are attributes that add semantics to elements that HTML doesn't cover on its own.

```html
<div role="alert">Error: incorrect password</div>
<button aria-label="Close menu">✕</button>
<nav aria-label="Main navigation">...</nav>
```

!!! warning "Golden rule of ARIA"
    **Don't use ARIA if you can use native HTML.** A button already has an implicit role=button. Use ARIA only when there is no other option.

---

## ⌨ Keyboard Navigation

Every website must be usable **with the keyboard alone**. Test navigating with Tab, Enter, Escape, and the arrow keys.

```css
/* Never remove outline without replacing it */
:focus-visible {
  outline: 2px solid #6a5acd;
  outline-offset: 2px;
}
```

!!! tip "Test with Tab"
    Open your site and press Tab repeatedly. Can you see where focus is? Can you reach all buttons and links? If not, you have an accessibility issue.

---

## 🎨 Color Contrast

Contrast between text and background must meet **WCAG AA**:

| Element | Minimum ratio |
| :--- | :--- |
| Normal text | 4.5:1 |
| Large text (18pt+ or 14pt+ bold) | 3:1 |
| UI components (borders, icons) | 3:1 |

Tools to check it:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Contrast Checker](https://coolors.co/contrast-checker)
- Lighthouse (in Chrome DevTools)

---

## 📝 Accessible Forms

```html
<label for="email">Email:</label>
<input type="email" id="email" name="email" required
       aria-describedby="email-error">
<small id="email-error" class="error">Enter a valid email</small>
```

Best practices:

- ✅ Associate every input with a `<label>`.
- ✅ Use `aria-describedby` for error messages.
- ✅ Mark required fields with `required`.
- ✅ Group related fields with `<fieldset>` and `<legend>`.
- ✅ Give clear feedback when something fails.

!!! warning "Placeholder is not a label"
    Placeholders disappear when typing and aren't read by all screen readers. Always use a visible label.

---

## 🖼 Images and Media

```html
<!-- Informative image -->
<img src="grafico.png" alt="Quarterly sales: 40% in January, 35% in February, 25% in March">

<!-- Decorative image -->
<img src="decoracion.png" alt="">

<!-- Video with captions -->
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="subtitulos.vtt" srclang="es" label="Español">
</video>
```

!!! tip "The right alt"
    - If the image conveys information, describe **what information it conveys**.
    - If it is decorative, use `alt=""` (empty).
    - Don't start with "Image of..." (screen readers already announce it).

---

## 🔍 Auditing Tools

| Tool | What it measures |
| :--- | :--- |
| **Lighthouse** (Chrome DevTools) | Accessibility, performance, SEO, PWA |
| **axe DevTools** | Detailed accessibility errors |
| **WAVE** | Visual accessibility evaluation |
| **Pa11y** | Command-line auditing |
| **Screen Reader** (NVDA, VoiceOver) | How a blind person perceives it |

!!! tip "Test with a screen reader"
    Nothing replaces testing your site with a real screen reader. On Linux you can use **Orca**, on Windows **NVDA** (free), and on macOS **VoiceOver** (built-in).

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-14">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What does WCAG stand for?</p>
<button class="quiz-option" data-opt="a">A) Web Code Accessibility Guide</button>
<button class="quiz-option" data-opt="b">B) Web Content Accessibility Guidelines</button>
<button class="quiz-option" data-opt="c">C) World Consortium Access Group</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> What minimum contrast ratio does WCAG AA require for normal text?</p>
<button class="quiz-option" data-opt="a">A) 4.5:1</button>
<button class="quiz-option" data-opt="b">B) 2:1</button>
<button class="quiz-option" data-opt="c">C) 10:1</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> When should you use aria-label?</p>
<button class="quiz-option" data-opt="a">A) Always, on every element</button>
<button class="quiz-option" data-opt="b">B) Never</button>
<button class="quiz-option" data-opt="c">C) When there is no visible text describing the element</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2014%3A%20Web%20Accessibility&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F14-accesibilidad%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F14-accesibilidad%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2014%3A%20Web%20Accessibility%20https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F14-accesibilidad%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/14-accesibilidad/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 15 — TypeScript desde cero](15-typescript.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }