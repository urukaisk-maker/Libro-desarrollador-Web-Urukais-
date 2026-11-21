# 💻 Editor Playground

!!! quote "Write, test, learn"
    An interactive environment to write HTML, CSS, and JavaScript directly in your browser. Nothing to install, nothing to configure. Write code, click Run, and see the result right away.

---

## 🧪 Live editor

<div class="playground">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" id="pg-html" spellcheck="false"><h1>Hello, world 🌍</h1>
<p>This is my first playground.</p>
<button id="btn">Click me</button></textarea>
<textarea class="playground__textarea is-hidden" id="pg-css" spellcheck="false">body {
  font-family: system-ui, sans-serif;
  padding: 1.5rem;
  background: #f8f7fb;
  color: #1f1c2e;
}
h1 { color: #6a5acd; }
button {
  padding: .5rem 1rem;
  background: #6a5acd;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}</textarea>
<textarea class="playground__textarea is-hidden" id="pg-js" spellcheck="false">document.getElementById('btn').addEventListener('click', () => {
  alert('Hello from the Playground! 👋');
});</textarea>
<div class="playground__actions">
<button class="md-button md-button--primary" id="pg-run">▶ Run</button>
<button class="md-button" id="pg-reset">↺ Reset</button>
</div>
</div>
<div class="playground__output">
<iframe id="pg-output" sandbox="allow-scripts allow-modals"></iframe>
</div>
</div>

!!! tip "How to use it"
    1. **Write** your HTML, CSS, and JavaScript across the tabs.
    2. **Click Run** (or Ctrl+Enter) to see the output.
    3. **Click Reset** to restore the original example.
    4. **Copy the code** into your local editor whenever you want to keep working offline.

---

## 🎯 Playground challenges

Try solving these challenges using the editor above. Each one has a goal and a solution you can check when needed.

### 🟢 Challenge 1: Custom greeting

**Goal**: Create an input where the user types their name and, upon clicking a button, displays a personalized greeting.

??? success "Solution"
    ```html
    <input type="text" id="nombre" placeholder="Your name">
    <button id="saludar">Greet</button>
    <p id="resultado"></p>
    ```

    ```javascript
    document.getElementById('saludar').addEventListener('click', () => {
      const nombre = document.getElementById('nombre').value || 'world';
      document.getElementById('resultado').textContent = 'Hello, ' + nombre + '! 👋';
    });
    ```

### 🟡 Challenge 2: Click counter

**Goal**: A button that increments a counter every time it is clicked.

??? success "Solution"
    ```html
    <button id="btn">Clicks: 0</button>
    ```

    ```javascript
    let clicks = 0;
    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
      clicks++;
      btn.textContent = 'Clicks: ' + clicks;
    });
    ```

### 🟡 Challenge 3: Change background color

**Goal**: A button that changes the page background color to a random color.

??? success "Solution"
    ```javascript
    document.getElementById('btn').addEventListener('click', () => {
      const color = 'hsl(' + (Math.random() * 360) + ', 70%, 80%)';
      document.body.style.background = color;
    });
    ```

### 🟠 Challenge 4: Simple to-do list

**Goal**: An input and a button that add tasks to a list. Each task should be removable.

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

### 🟠 Challenge 5: Live clock

**Goal**: Display the current time on screen, updating every second.

??? success "Solution"
    ```javascript
    function actualizar() {
      document.getElementById('reloj').textContent =
        new Date().toLocaleTimeString('en-US');
    }
    setInterval(actualizar, 1000);
    actualizar();
    ```

### 🔴 Challenge 6: Basic calculator

**Goal**: A calculator that adds, subtracts, multiplies, and divides two numbers.

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
        case '/': r = b !== 0 ? a / b : 'Error: /0'; break;
      }
      document.getElementById('resultado').textContent = r;
    });
    ```

---

## 🎨 Examples for inspiration

### Example 1: Profile card

```html
<div class="card">
  <h2>Ana García</h2>
  <p>Frontend developer</p>
  <a href="#">Contact</a>
</div>
```

```css
.card {
  max-width: 320px;
  padding: 1.5rem;
  background: linear-gradient(135deg, #6a5acd, #00bcd4);
  color: #fff;
  border-radius: 12px;
  text-align: center;
}
.card a {
  display: inline-block;
  margin-top: 1rem;
  padding: .5rem 1rem;
  background: #fff;
  color: #6a5acd;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
}
```

### Example 2: Loading spinner

```css
.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e0dde8;
  border-top-color: #6a5acd;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 2rem auto;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Example 3: Dark mode toggle button

```javascript
document.getElementById('tema').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
```

```css
body.dark {
  background: #1a1726;
  color: #e8e5f5;
}
```

---

## 🔒 Playground security

The editor runs code inside an **isolated sandboxed iframe**. This means:

- ✅ You can use HTML, CSS, and JavaScript normally.
- ✅ You can use `alert`, `console.log`, and manipulate the DOM.
- ❌ You **cannot** access cookies from the main page.
- ❌ You **cannot** make cross-origin requests without CORS.
- ❌ You **cannot** access `localStorage` from the main page.

---

## 🚀 Next steps

[🧪 Go to Playground exercises](ejercicios-playground.md){ .md-button .md-button--primary }
[🎯 View weekly challenges](retos.md){ .md-button }
[💼 Practice interview questions](entrevistas.md){ .md-button }
