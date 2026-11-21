---
description: "Challenge 2: Business Card. Practice your web development skills with this challenge from the Web Developer Book."
---
# 🎯 Challenge #2: Business Card

!!! quote "Beginner-level challenge"
    Design a personal business card with HTML and CSS, featuring dark mode and responsive layout. Ideal for practicing layout and CSS variables.

---

## 🎯 Goal

Create a business card with:

1. Profile picture, name, and role.
2. Social media links.
3. Dark/light mode toggle button.
4. Responsive design.

## 🧠 Concepts

- Semantic HTML
- CSS Grid or Flexbox
- CSS variables
- Media queries

## 🖥 Editor

<div class="playground-ejercicio" data-ejercicio="reto-2">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" data-lang="html" spellcheck="false"><div class="card">
  <div class="avatar">👤</div>
  <h2>Your name</h2>
  <p class="role">Frontend developer</p>
  <div class="social">
    <a href="#">GitHub</a>
    <a href="#">LinkedIn</a>
  </div>
  <button id="tema">🌙 Dark mode</button>
</div></textarea>
<textarea class="playground__textarea is-hidden" data-lang="css" spellcheck="false">body { font-family: system-ui; padding: 1.5rem; display: flex; justify-content: center; }
.card {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  max-width: 320px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0,0,0,.1);
}
.avatar { font-size: 4rem; }
h2 { margin: .5rem 0 .25rem; }
.role { color: #666; margin: 0 0 1rem; }
.social { display: flex; gap: 1rem; justify-content: center; margin-bottom: 1rem; }
.social a { color: #6a5acd; text-decoration: none; font-weight: 600; }
button { padding: .5rem 1rem; background: #6a5acd; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
body.dark { background: #1a1726; }
body.dark .card { background: #2a2342; color: #e8e5f5; }</textarea>
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
    document.getElementById('tema').addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
    ```

## 🚀 Bonus Challenges

- [ ] Make the photo a **real image** with `border-radius: 50%`.
- [ ] **Save** dark mode in localStorage.
- [ ] Respect the system preference with `prefers-color-scheme`.

---

[← Back to challenges](../retos.md){ .md-button }
[🎯 Go to Challenge #3](reto-3.md){ .md-button .md-button--primary }
