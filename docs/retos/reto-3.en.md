---
description: "Challenge 3: Click Counter. Practice your web development skills with this challenge from the Web Developer Book."
---
# 🎯 Challenge #3: Click Counter

!!! quote "Beginner-level challenge"
    A counter that persists in localStorage, with buttons to increment, decrement, and reset. Ideal for practicing state and persistence.

---

## 🎯 Goal

Create a counter with:

1. A **+1** button and a **-1** button.
2. A **reset** button.
3. Persistence with **localStorage**.
4. Do not go below 0.

## 🧠 Concepts

- Variables and state
- localStorage
- Events

## 🖥 Editor

<div class="playground-ejercicio" data-ejercicio="reto-3">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" data-lang="html" spellcheck="false"><h2 id="numero">0</h2>
<button id="mas">+1</button>
<button id="menos">−1</button>
<button id="reset">Reset</button></textarea>
<textarea class="playground__textarea is-hidden" data-lang="css" spellcheck="false">body { font-family: system-ui; padding: 1.5rem; text-align: center; }
h2 { font-size: 4rem; color: #6a5acd; margin: 0 0 1rem; }
button { padding: .75rem 1.5rem; font-size: 1rem; margin: .25rem; border: none; border-radius: 6px; cursor: pointer; background: #6a5acd; color: #fff; }
#reset { background: #dc3545; }</textarea>
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
    let count = Number(localStorage.getItem('reto3') || 0);
    const num = document.getElementById('numero');
    num.textContent = count;

    document.getElementById('mas').addEventListener('click', () => {
      count++;
      num.textContent = count;
      localStorage.setItem('reto3', count);
    });

    document.getElementById('menos').addEventListener('click', () => {
      if (count > 0) count--;
      num.textContent = count;
      localStorage.setItem('reto3', count);
    });

    document.getElementById('reset').addEventListener('click', () => {
      count = 0;
      num.textContent = count;
      localStorage.setItem('reto3', count);
    });
    ```

## 🚀 Bonus Challenges

- [ ] Make the number change **color** depending on whether it is positive, negative, or zero.
- [ ] Allow **typing** a number directly into an input.
- [ ] Keep a **history** of changes.

---

[← Back to challenges](../retos.md){ .md-button }
[🎯 Go to Challenge #4](reto-4.md){ .md-button .md-button--primary }
