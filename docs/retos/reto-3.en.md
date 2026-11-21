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

## 💡 Progressive Hints


??? tip "Hint 1 — Hydrate initial state from `localStorage`"

    On load, read the stored value from `localStorage` (casting with `Number(...)` and falling back to `0`) and render it into `#numero`.


??? tip "Hint 2 — Guard the lower bound on decrement"

    Before decrementing in `#menos`, check `if (count > 0)` so the counter never goes below `0`, and set it back to `0` on `Reset`.


??? tip "Hint 3 — Persist every state update to `localStorage`"

    Whenever `count` changes (`+1`, `-1`, or `Reset`), update `#numero.textContent` and write the new value with `localStorage.setItem(...)`.

