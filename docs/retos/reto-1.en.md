---
description: "Challenge 1: The Chameleon Button. Practice your web development skills with this challenge from the Web Developer Book."
---
# 🎯 Challenge #1: The Chameleon Button

!!! quote "Beginner-level challenge"
    A button that changes color every time it is clicked, with a smooth animation. Ideal for practicing events and style manipulation.

---

## 🎯 Goal

Create a button that:

1. Changes color **every time it is clicked**.
2. Uses a **smooth transition** between colors.
3. Displays the number of times it has been clicked.

## 🧠 Concepts

- JavaScript events (`addEventListener`)
- Style manipulation (`element.style`)
- CSS transitions

## 🖥 Editor

<div class="playground-ejercicio" data-ejercicio="reto-1">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" data-lang="html" spellcheck="false"><button id="camaleon">Click me!</button>
<p id="contador">Clicked 0 times</p></textarea>
<textarea class="playground__textarea is-hidden" data-lang="css" spellcheck="false">body { font-family: system-ui; padding: 1.5rem; text-align: center; }
button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #6a5acd;
  transition: background .3s;
}
#contador { margin-top: 1rem; color: #666; }</textarea>
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
    let clicks = 0;
    const boton = document.getElementById('camaleon');
    const contador = document.getElementById('contador');

    boton.addEventListener('click', () => {
      clicks++;
      const hue = (clicks * 60) % 360;
      boton.style.background = 'hsl(' + hue + ', 70%, 55%)';
      contador.textContent = 'Clicked ' + clicks + ' times';
    });
    ```

## 🚀 Bonus Challenges

- [ ] Make the color **random** instead of sequential.
- [ ] Make the button **grow** slightly when clicked.
- [ ] **Save** the counter in localStorage.

---

[← Back to challenges](../retos.md){ .md-button }
[🎯 Go to Challenge #2](reto-2.md){ .md-button .md-button--primary }
