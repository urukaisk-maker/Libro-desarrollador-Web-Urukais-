# 🎮 Exercises Playground

!!! quote "Learn by doing"
    A collection of interactive exercises to practice HTML, CSS, and JavaScript directly in the browser. Each exercise includes a goal, a live editor, and an annotated solution.

---

## 🎯 How it works

1. **Read the goal** of the exercise.
2. **Write your solution** in the editor.
3. **Click Run** to see the result.
4. **Compare** with the proposed solution (if you get stuck).
5. **Mark the exercise as completed** to unlock the achievement.

!!! tip "Tip"
    Do not copy and paste the solution directly. Try solving it on your own first. Learning comes from the process, not the result.

---

## 🧪 Exercise 1: Custom greeting

**Level**: 🟢 Beginner
**Concepts**: Inputs, events, DOM manipulation

### 🎯 Goal

Create an input where the user types their name and a button that, when clicked, displays a personalized greeting.

### 🖥 Editor

<div class="playground-ejercicio" data-ejercicio="saludo">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" data-lang="html" spellcheck="false"><input type="text" id="nombre" placeholder="Your name">
<button id="saludar">Greet</button>
<p id="resultado"></p></textarea>
<textarea class="playground__textarea is-hidden" data-lang="css" spellcheck="false">body { font-family: system-ui; padding: 1.5rem; }
button { padding: .5rem 1rem; background: #6a5acd; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
#resultado { margin-top: 1rem; font-size: 1.2rem; color: #6a5acd; }</textarea>
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
    document.getElementById('saludar').addEventListener('click', () => {
      const nombre = document.getElementById('nombre').value || 'world';
      document.getElementById('resultado').textContent = 'Hello, ' + nombre + '! 👋';
    });
    ```

---

## 🧪 Exercise 2: Click counter

**Level**: 🟢 Beginner
**Concepts**: Variables, events, state

### 🎯 Goal

A button that increments a counter every time it is clicked, displaying the number on screen.

### 🖥 Editor

<div class="playground-ejercicio" data-ejercicio="contador">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" data-lang="html" spellcheck="false"><button id="btn">Clicks: 0</button></textarea>
<textarea class="playground__textarea is-hidden" data-lang="css" spellcheck="false">body { font-family: system-ui; padding: 1.5rem; text-align: center; }
button { padding: 1rem 2rem; font-size: 1.2rem; background: #6a5acd; color: #fff; border: none; border-radius: 8px; cursor: pointer; }</textarea>
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
    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
      clicks++;
      btn.textContent = 'Clicks: ' + clicks;
    });
    ```

---

## 🧪 Exercise 3: Change background color

**Level**: 🟡 Intermediate
**Concepts**: Math.random, inline styles

### 🎯 Goal

A button that changes the background color of the page to a random color.

### 🖥 Editor

<div class="playground-ejercicio" data-ejercicio="color">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" data-lang="html" spellcheck="false"><button id="btn">Change color</button></textarea>
<textarea class="playground__textarea is-hidden" data-lang="css" spellcheck="false">body { font-family: system-ui; padding: 1.5rem; transition: background .3s; }
button { padding: .75rem 1.5rem; background: #6a5acd; color: #fff; border: none; border-radius: 6px; cursor: pointer; }</textarea>
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
    document.getElementById('btn').addEventListener('click', () => {
      const color = 'hsl(' + (Math.random() * 360) + ', 70%, 80%)';
      document.body.style.background = color;
    });
    ```

---

## 🧪 Exercise 4: To-do list

**Level**: 🟡 Intermediate
**Concepts**: DOM, events, delegation

### 🎯 Goal

An input and a button that add tasks to a list. Each task must be removable.

### 🖥 Editor

<div class="playground-ejercicio" data-ejercicio="tareas">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" data-lang="html" spellcheck="false"><input type="text" id="tarea" placeholder="New task">
<button id="add">Add</button>
<ul id="lista"></ul></textarea>
<textarea class="playground__textarea is-hidden" data-lang="css" spellcheck="false">body { font-family: system-ui; padding: 1.5rem; }
input { padding: .5rem; border: 1px solid #ddd; border-radius: 6px; }
button { padding: .5rem 1rem; background: #6a5acd; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
ul { list-style: none; padding: 0; }
li { padding: .5rem; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
.del { background: #dc3545; padding: .25rem .5rem; }</textarea>
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
    document.getElementById('add').addEventListener('click', () => {
      const texto = document.getElementById('tarea').value.trim();
      if (!texto) return;
      const li = document.createElement('li');
      li.innerHTML = texto + ' <button class="del">❌</button>';
      document.getElementById('lista').appendChild(li);
      document.getElementById('tarea').value = '';
    });

    document.getElementById('lista').addEventListener('click', (e) => {
      if (e.target.classList.contains('del')) {
        e.target.parentElement.remove();
      }
    });
    ```

---

## 🧪 Exercise 5: Live clock

**Level**: 🟠 Advanced
**Concepts**: setInterval, Date, toLocaleTimeString

### 🎯 Goal

Display the current time on screen, updating every second.

### 🖥 Editor

<div class="playground-ejercicio" data-ejercicio="reloj">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" data-lang="html" spellcheck="false"><h2 id="reloj">--:--:--</h2></textarea>
<textarea class="playground__textarea is-hidden" data-lang="css" spellcheck="false">body { font-family: system-ui; padding: 1.5rem; text-align: center; }
h2 { font-size: 3rem; color: #6a5acd; font-variant-numeric: tabular-nums; }</textarea>
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
    function actualizar() {
      document.getElementById('reloj').textContent =
        new Date().toLocaleTimeString('en-US');
    }
    setInterval(actualizar, 1000);
    actualizar();
    ```

---

## 🧪 Exercise 6: Basic calculator

**Level**: 🟠 Advanced
**Concepts**: parseFloat, switch, forms

### 🎯 Goal

A calculator that adds, subtracts, multiplies, and divides two numbers.

### 🖥 Editor

<div class="playground-ejercicio" data-ejercicio="calculadora">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" data-lang="html" spellcheck="false"><input type="number" id="a" placeholder="A">
<select id="op">
<option value="+">+</option>
<option value="-">−</option>
<option value="*">×</option>
<option value="/">÷</option>
</select>
<input type="number" id="b" placeholder="B">
<button id="calcular">=</button>
<span id="resultado"></span></textarea>
<textarea class="playground__textarea is-hidden" data-lang="css" spellcheck="false">body { font-family: system-ui; padding: 1.5rem; }
input, select, button { padding: .5rem; font-size: 1rem; margin: .25rem; }
button { background: #6a5acd; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
#resultado { font-size: 1.5rem; font-weight: 700; color: #6a5acd; margin-left: .5rem; }</textarea>
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
    document.getElementById('calcular').addEventListener('click', () => {
      const a = parseFloat(document.getElementById('a').value);
      const b = parseFloat(document.getElementById('b').value);
      const op = document.getElementById('op').value;
      let r;
      switch (op) {
        case '+': r = a + b; break;
        case '-': r = a - b; break;
        case '*': r = a * b; break;
        case '/': r = b !== 0 ? a / b : 'Error'; break;
      }
      document.getElementById('resultado').textContent = r;
    });
    ```

---

## 📊 Exercise progress

<div class="ejercicios-progreso">
<p>Completed exercises: <strong id="ej-progreso">0 / 6</strong></p>
<div class="ejercicios-progreso__bar">
<div class="ejercicios-progreso__fill" id="ej-progreso-fill" style="width:0%"></div>
</div>
</div>

---

## ➡ Next steps

[🎮 Back to Playground](playground.md){ .md-button .md-button--primary }
[🎯 View weekly challenges](retos.md){ .md-button }
[🏆 View my achievements](logros.md){ .md-button }
