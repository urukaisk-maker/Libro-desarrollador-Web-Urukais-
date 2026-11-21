---
description: "Challenge 4: Responsive Gallery. Practice your web development skills with this challenge from the Web Developer Book."
---
# 🎯 Challenge #4: Responsive Gallery

!!! quote "Intermediate-level challenge"
    Create a responsive image gallery with CSS Grid, lightbox, and lazy loading. Ideal for practicing Grid and events.

---

## 🎯 Goal

Create a gallery that:

1. Uses **CSS Grid** for the layout.
2. Adapts to **any screen size**.
3. Displays images in a **lightbox** when clicked.
4. Uses native **lazy loading**.

## 🧠 Concepts

- CSS Grid
- Media queries
- Events
- `loading="lazy"`

## 🖥 Editor

<div class="playground-ejercicio" data-ejercicio="reto-4">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" data-lang="html" spellcheck="false"><div class="galeria">
  <img src="https://picsum.photos/id/10/400/300" alt="Image 1" loading="lazy">
  <img src="https://picsum.photos/id/20/400/300" alt="Image 2" loading="lazy">
  <img src="https://picsum.photos/id/30/400/300" alt="Image 3" loading="lazy">
  <img src="https://picsum.photos/id/40/400/300" alt="Image 4" loading="lazy">
  <img src="https://picsum.photos/id/50/400/300" alt="Image 5" loading="lazy">
  <img src="https://picsum.photos/id/60/400/300" alt="Image 6" loading="lazy">
</div></textarea>
<textarea class="playground__textarea is-hidden" data-lang="css" spellcheck="false">body { font-family: system-ui; padding: 1rem; margin: 0; }
.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.galeria img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 4/3;
  border-radius: 8px;
  cursor: pointer;
  transition: transform .2s;
}
.galeria img:hover { transform: scale(1.03); }</textarea>
<textarea class="playground__textarea is-hidden" data-lang="js" spellcheck="false">// Your code here
</textarea>
<div class="playground__actions">
<button class="md-button md-button--primary" data-run>▶ Run</button>
</div>
</div>
<div class="playground__output">
<iframe data-output sandbox="allow-scripts allow-modals"></iframe>
</div>
</div>

??? success "Solution"
    ```javascript
    document.querySelectorAll('.galeria img').forEach(img => {
      img.addEventListener('click', () => {
        const w = window.open('');
        w.document.write('<img src="' + img.src + '" style="max-width:100%">');
      });
    });
    ```

## 💡 Progressive Hints

??? tip "Hint 1 — Base structure and core flow (Challenge #4: Responsive Gallery)"
    Start with a minimal working implementation and verify the core flow before adding extra polish or optional enhancements.

??? tip "Hint 2 — State updates, inputs, and edge cases"
    Test empty or unexpected values, UI state transitions, and repeated interactions so state stays consistent and clean.

??? tip "Hint 3 — Cleanup, accessibility, and final check"
    Verify there are no console errors or warnings, interactive controls remain accessible, and the code is readable and modular.

## ✅ Verification Checklist

- [ ] The core goal of Challenge #4: Responsive Gallery works with no console errors.
- [ ] Main interactions, state updates, and edge cases from the prompt are covered.
- [ ] The solution is clean, maintainable, and verified in the editor/browser.

## 🚀 Bonus Challenges

- [ ] **Category filters**.
- [ ] **Skeleton loader** while images load.
- [ ] **Masonry mode** with CSS columns.

---

[← Back to challenges](../retos.md){ .md-button }
[🎯 Go to Challenge #5](reto-5.md){ .md-button .md-button--primary }
