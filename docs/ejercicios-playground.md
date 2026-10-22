cd ~/Libro-desarrollador-Web-Urukais-
python3 -c "
contenido = '''# 🏋️ Ejercicios Playground

!!! quote \"Aprende practicando\"
    Una colección de ejercicios interactivos para practicar HTML, CSS y JavaScript directamente en el navegador. Cada ejercicio tiene un objetivo, un editor en vivo y una solución comentada.

---

## 🎯 Cómo funciona

1. **Lee el objetivo** del ejercicio.
2. **Escribe tu solución** en el editor.
3. **Pulsa Ejecutar** para ver el resultado.
4. **Compara** con la solución propuesta (si te atascas).
5. **Marca el ejercicio como completado** para desbloquear el logro.

!!! tip \"Consejo\"
    No copies y pegues la solución directamente. Intenta resolverlo tú primero. El aprendizaje viene del proceso, no del resultado.

---

## 🧪 Ejercicio 1: Saludo personalizado

**Nivel**: 🟢 Principiante
**Conceptos**: Inputs, eventos, manipulación del DOM

### 🎯 Objetivo

Crea un input donde el usuario escriba su nombre y un botón que, al pulsarlo, muestre un saludo personalizado.

### 🖥️ Editor

<div class=\"playground-ejercicio\" data-ejercicio=\"saludo\">
<div class=\"playground__editor\">
<div class=\"playground__tabs\">
<button class=\"playground__tab is-active\" data-lang=\"html\">HTML</button>
<button class=\"playground__tab\" data-lang=\"css\">CSS</button>
<button class=\"playground__tab\" data-lang=\"js\">JS</button>
</div>
<textarea class=\"playground__textarea\" data-lang=\"html\" spellcheck=\"false\"><input type=\"text\" id=\"nombre\" placeholder=\"Tu nombre\">
<button id=\"saludar\">Saludar</button>
<p id=\"resultado\"></p></textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"css\" spellcheck=\"false\">body { font-family: system-ui; padding: 1.5rem; }
button { padding: .5rem 1rem; background: #6a5acd; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
#resultado { margin-top: 1rem; font-size: 1.2rem; color: #6a5acd; }</textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"js\" spellcheck=\"false\">// Tu código aquí
</textarea>
<div class=\"playground__actions\">
<button class=\"md-button md-button--primary\" data-run>▶ Ejecutar</button>
</div>
</div>
<div class=\"playground__output\">
<iframe data-output sandbox=\"allow-scripts allow-modals\"></iframe>
</div>
</div>

??? success \"Solución\"
    \`\`\`javascript
    document.getElementById('saludar').addEventListener('click', () => {
      const nombre = document.getElementById('nombre').value || 'mundo';
      document.getElementById('resultado').textContent = '¡Hola, ' + nombre + '! 👋';
    });
    \`\`\`

---

## 🧪 Ejercicio 2: Contador de clics

**Nivel**: 🟢 Principiante
**Conceptos**: Variables, eventos, estado

### 🎯 Objetivo

Un botón que incrementa un contador cada vez que se pulsa, mostrando el número en pantalla.

### 🖥️ Editor

<div class=\"playground-ejercicio\" data-ejercicio=\"contador\">
<div class=\"playground__editor\">
<div class=\"playground__tabs\">
<button class=\"playground__tab is-active\" data-lang=\"html\">HTML</button>
<button class=\"playground__tab\" data-lang=\"css\">CSS</button>
<button class=\"playground__tab\" data-lang=\"js\">JS</button>
</div>
<textarea class=\"playground__textarea\" data-lang=\"html\" spellcheck=\"false\"><button id=\"btn\">Clics: 0</button></textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"css\" spellcheck=\"false\">body { font-family: system-ui; padding: 1.5rem; text-align: center; }
button { padding: 1rem 2rem; font-size: 1.2rem; background: #6a5acd; color: #fff; border: none; border-radius: 8px; cursor: pointer; }</textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"js\" spellcheck=\"false\">// Tu código aquí
</textarea>
<div class=\"playground__actions\">
<button class=\"md-button md-button--primary\" data-run>▶ Ejecutar</button>
</div>
</div>
<div class=\"playground__output\">
<iframe data-output sandbox=\"allow-scripts allow-modals\"></iframe>
</div>
</div>

??? success \"Solución\"
    \`\`\`javascript
    let clicks = 0;
    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
      clicks++;
      btn.textContent = 'Clics: ' + clicks;
    });
    \`\`\`

---

## 🧪 Ejercicio 3: Cambiar color de fondo

**Nivel**: 🟡 Intermedio
**Conceptos**: Math.random, estilos inline

### 🎯 Objetivo

Un botón que cambia el color de fondo de la página a un color aleatorio.

### 🖥️ Editor

<div class=\"playground-ejercicio\" data-ejercicio=\"color\">
<div class=\"playground__editor\">
<div class=\"playground__tabs\">
<button class=\"playground__tab is-active\" data-lang=\"html\">HTML</button>
<button class=\"playground__tab\" data-lang=\"css\">CSS</button>
<button class=\"playground__tab\" data-lang=\"js\">JS</button>
</div>
<textarea class=\"playground__textarea\" data-lang=\"html\" spellcheck=\"false\"><button id=\"btn\">Cambiar color</button></textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"css\" spellcheck=\"false\">body { font-family: system-ui; padding: 1.5rem; transition: background .3s; }
button { padding: .75rem 1.5rem; background: #6a5acd; color: #fff; border: none; border-radius: 6px; cursor: pointer; }</textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"js\" spellcheck=\"false\">// Tu código aquí
</textarea>
<div class=\"playground__actions\">
<button class=\"md-button md-button--primary\" data-run>▶ Ejecutar</button>
</div>
</div>
<div class=\"playground__output\">
<iframe data-output sandbox=\"allow-scripts allow-modals\"></iframe>
</div>
</div>

??? success \"Solución\"
    \`\`\`javascript
    document.getElementById('btn').addEventListener('click', () => {
      const color = 'hsl(' + (Math.random() * 360) + ', 70%, 80%)';
      document.body.style.background = color;
    });
    \`\`\`

---

## 🧪 Ejercicio 4: Lista de tareas

**Nivel**: 🟡 Intermedio
**Conceptos**: DOM, eventos, delegación

### 🎯 Objetivo

Un input y un botón que añadan tareas a una lista. Cada tarea debe poder eliminarse.

### 🖥️ Editor

<div class=\"playground-ejercicio\" data-ejercicio=\"tareas\">
<div class=\"playground__editor\">
<div class=\"playground__tabs\">
<button class=\"playground__tab is-active\" data-lang=\"html\">HTML</button>
<button class=\"playground__tab\" data-lang=\"css\">CSS</button>
<button class=\"playground__tab\" data-lang=\"js\">JS</button>
</div>
<textarea class=\"playground__textarea\" data-lang=\"html\" spellcheck=\"false\"><input type=\"text\" id=\"tarea\" placeholder=\"Nueva tarea\">
<button id=\"add\">Añadir</button>
<ul id=\"lista\"></ul></textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"css\" spellcheck=\"false\">body { font-family: system-ui; padding: 1.5rem; }
input { padding: .5rem; border: 1px solid #ddd; border-radius: 6px; }
button { padding: .5rem 1rem; background: #6a5acd; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
ul { list-style: none; padding: 0; }
li { padding: .5rem; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
.del { background: #dc3545; padding: .25rem .5rem; }</textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"js\" spellcheck=\"false\">// Tu código aquí
</textarea>
<div class=\"playground__actions\">
<button class=\"md-button md-button--primary\" data-run>▶ Ejecutar</button>
</div>
</div>
<div class=\"playground__output\">
<iframe data-output sandbox=\"allow-scripts allow-modals\"></iframe>
</div>
</div>

??? success \"Solución\"
    \`\`\`javascript
    document.getElementById('add').addEventListener('click', () => {
      const texto = document.getElementById('tarea').value.trim();
      if (!texto) return;
      const li = document.createElement('li');
      li.innerHTML = texto + ' <button class=\"del\">❌</button>';
      document.getElementById('lista').appendChild(li);
      document.getElementById('tarea').value = '';
    });

    document.getElementById('lista').addEventListener('click', (e) => {
      if (e.target.classList.contains('del')) {
        e.target.parentElement.remove();
      }
    });
    \`\`\`

---

## 🧪 Ejercicio 5: Reloj en tiempo real

**Nivel**: 🟠 Avanzado
**Conceptos**: setInterval, Date, toLocaleTimeString

### 🎯 Objetivo

Mostrar la hora actual en pantalla, actualizándose cada segundo.

### 🖥️ Editor

<div class=\"playground-ejercicio\" data-ejercicio=\"reloj\">
<div class=\"playground__editor\">
<div class=\"playground__tabs\">
<button class=\"playground__tab is-active\" data-lang=\"html\">HTML</button>
<button class=\"playground__tab\" data-lang=\"css\">CSS</button>
<button class=\"playground__tab\" data-lang=\"js\">JS</button>
</div>
<textarea class=\"playground__textarea\" data-lang=\"html\" spellcheck=\"false\"><h2 id=\"reloj\">--:--:--</h2></textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"css\" spellcheck=\"false\">body { font-family: system-ui; padding: 1.5rem; text-align: center; }
h2 { font-size: 3rem; color: #6a5acd; font-variant-numeric: tabular-nums; }</textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"js\" spellcheck=\"false\">// Tu código aquí
</textarea>
<div class=\"playground__actions\">
<button class=\"md-button md-button--primary\" data-run>▶ Ejecutar</button>
</div>
</div>
<div class=\"playground__output\">
<iframe data-output sandbox=\"allow-scripts allow-modals\"></iframe>
</div>
</div>

??? success \"Solución\"
    \`\`\`javascript
    function actualizar() {
      document.getElementById('reloj').textContent =
        new Date().toLocaleTimeString('es-ES');
    }
    setInterval(actualizar, 1000);
    actualizar();
    \`\`\`

---

## 🧪 Ejercicio 6: Calculadora básica

**Nivel**: 🟠 Avanzado
**Conceptos**: parseFloat, switch, formularios

### 🎯 Objetivo

Una calculadora que sume, reste, multiplique y divida dos números.

### 🖥️ Editor

<div class=\"playground-ejercicio\" data-ejercicio=\"calculadora\">
<div class=\"playground__editor\">
<div class=\"playground__tabs\">
<button class=\"playground__tab is-active\" data-lang=\"html\">HTML</button>
<button class=\"playground__tab\" data-lang=\"css\">CSS</button>
<button class=\"playground__tab\" data-lang=\"js\">JS</button>
</div>
<textarea class=\"playground__textarea\" data-lang=\"html\" spellcheck=\"false\"><input type=\"number\" id=\"a\" placeholder=\"A\">
<select id=\"op\">
<option value=\"+\">+</option>
<option value=\"-\">−</option>
<option value=\"*\">×</option>
<option value=\"/\">÷</option>
</select>
<input type=\"number\" id=\"b\" placeholder=\"B\">
<button id=\"calcular\">=</button>
<span id=\"resultado\"></span></textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"css\" spellcheck=\"false\">body { font-family: system-ui; padding: 1.5rem; }
input, select, button { padding: .5rem; font-size: 1rem; margin: .25rem; }
button { background: #6a5acd; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
#resultado { font-size: 1.5rem; font-weight: 700; color: #6a5acd; margin-left: .5rem; }</textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"js\" spellcheck=\"false\">// Tu código aquí
</textarea>
<div class=\"playground__actions\">
<button class=\"md-button md-button--primary\" data-run>▶ Ejecutar</button>
</div>
</div>
<div class=\"playground__output\">
<iframe data-output sandbox=\"allow-scripts allow-modals\"></iframe>
</div>
</div>

??? success \"Solución\"
    \`\`\`javascript
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
    \`\`\`

---

## 📊 Progreso de ejercicios

<div class=\"ejercicios-progreso\">
<p>Ejercicios completados: <strong id=\"ej-progreso\">0 / 6</strong></p>
<div class=\"ejercicios-progreso__bar\">
<div class=\"ejercicios-progreso__fill\" id=\"ej-progreso-fill\" style=\"width:0%\"></div>
</div>
</div>

---

## ➡️ Siguientes pasos

[🎮 Volver al Playground](playground.md){ .md-button .md-button--primary }
[🎯 Ver los retos semanales](retos.md){ .md-button }
[🏆 Ver mis logros](logros.md){ .md-button }
'''
open('docs/ejercicios-playground.md', 'w', encoding='utf-8').write(contenido)
print('OK:', len(contenido.splitlines()), 'líneas escritas')
"cd ~/Libro-desarrollador-Web-Urukais-
python3 -c "
contenido = '''# 🏋️ Ejercicios Playground

!!! quote \"Aprende practicando\"
    Una colección de ejercicios interactivos para practicar HTML, CSS y JavaScript directamente en el navegador. Cada ejercicio tiene un objetivo, un editor en vivo y una solución comentada.

---

## 🎯 Cómo funciona

1. **Lee el objetivo** del ejercicio.
2. **Escribe tu solución** en el editor.
3. **Pulsa Ejecutar** para ver el resultado.
4. **Compara** con la solución propuesta (si te atascas).
5. **Marca el ejercicio como completado** para desbloquear el logro.

!!! tip \"Consejo\"
    No copies y pegues la solución directamente. Intenta resolverlo tú primero. El aprendizaje viene del proceso, no del resultado.

---

## 🧪 Ejercicio 1: Saludo personalizado

**Nivel**: 🟢 Principiante
**Conceptos**: Inputs, eventos, manipulación del DOM

### 🎯 Objetivo

Crea un input donde el usuario escriba su nombre y un botón que, al pulsarlo, muestre un saludo personalizado.

### 🖥️ Editor

<div class=\"playground-ejercicio\" data-ejercicio=\"saludo\">
<div class=\"playground__editor\">
<div class=\"playground__tabs\">
<button class=\"playground__tab is-active\" data-lang=\"html\">HTML</button>
<button class=\"playground__tab\" data-lang=\"css\">CSS</button>
<button class=\"playground__tab\" data-lang=\"js\">JS</button>
</div>
<textarea class=\"playground__textarea\" data-lang=\"html\" spellcheck=\"false\"><input type=\"text\" id=\"nombre\" placeholder=\"Tu nombre\">
<button id=\"saludar\">Saludar</button>
<p id=\"resultado\"></p></textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"css\" spellcheck=\"false\">body { font-family: system-ui; padding: 1.5rem; }
button { padding: .5rem 1rem; background: #6a5acd; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
#resultado { margin-top: 1rem; font-size: 1.2rem; color: #6a5acd; }</textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"js\" spellcheck=\"false\">// Tu código aquí
</textarea>
<div class=\"playground__actions\">
<button class=\"md-button md-button--primary\" data-run>▶ Ejecutar</button>
</div>
</div>
<div class=\"playground__output\">
<iframe data-output sandbox=\"allow-scripts allow-modals\"></iframe>
</div>
</div>

??? success \"Solución\"
    \`\`\`javascript
    document.getElementById('saludar').addEventListener('click', () => {
      const nombre = document.getElementById('nombre').value || 'mundo';
      document.getElementById('resultado').textContent = '¡Hola, ' + nombre + '! 👋';
    });
    \`\`\`

---

## 🧪 Ejercicio 2: Contador de clics

**Nivel**: 🟢 Principiante
**Conceptos**: Variables, eventos, estado

### 🎯 Objetivo

Un botón que incrementa un contador cada vez que se pulsa, mostrando el número en pantalla.

### 🖥️ Editor

<div class=\"playground-ejercicio\" data-ejercicio=\"contador\">
<div class=\"playground__editor\">
<div class=\"playground__tabs\">
<button class=\"playground__tab is-active\" data-lang=\"html\">HTML</button>
<button class=\"playground__tab\" data-lang=\"css\">CSS</button>
<button class=\"playground__tab\" data-lang=\"js\">JS</button>
</div>
<textarea class=\"playground__textarea\" data-lang=\"html\" spellcheck=\"false\"><button id=\"btn\">Clics: 0</button></textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"css\" spellcheck=\"false\">body { font-family: system-ui; padding: 1.5rem; text-align: center; }
button { padding: 1rem 2rem; font-size: 1.2rem; background: #6a5acd; color: #fff; border: none; border-radius: 8px; cursor: pointer; }</textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"js\" spellcheck=\"false\">// Tu código aquí
</textarea>
<div class=\"playground__actions\">
<button class=\"md-button md-button--primary\" data-run>▶ Ejecutar</button>
</div>
</div>
<div class=\"playground__output\">
<iframe data-output sandbox=\"allow-scripts allow-modals\"></iframe>
</div>
</div>

??? success \"Solución\"
    \`\`\`javascript
    let clicks = 0;
    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
      clicks++;
      btn.textContent = 'Clics: ' + clicks;
    });
    \`\`\`

---

## 🧪 Ejercicio 3: Cambiar color de fondo

**Nivel**: 🟡 Intermedio
**Conceptos**: Math.random, estilos inline

### 🎯 Objetivo

Un botón que cambia el color de fondo de la página a un color aleatorio.

### 🖥️ Editor

<div class=\"playground-ejercicio\" data-ejercicio=\"color\">
<div class=\"playground__editor\">
<div class=\"playground__tabs\">
<button class=\"playground__tab is-active\" data-lang=\"html\">HTML</button>
<button class=\"playground__tab\" data-lang=\"css\">CSS</button>
<button class=\"playground__tab\" data-lang=\"js\">JS</button>
</div>
<textarea class=\"playground__textarea\" data-lang=\"html\" spellcheck=\"false\"><button id=\"btn\">Cambiar color</button></textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"css\" spellcheck=\"false\">body { font-family: system-ui; padding: 1.5rem; transition: background .3s; }
button { padding: .75rem 1.5rem; background: #6a5acd; color: #fff; border: none; border-radius: 6px; cursor: pointer; }</textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"js\" spellcheck=\"false\">// Tu código aquí
</textarea>
<div class=\"playground__actions\">
<button class=\"md-button md-button--primary\" data-run>▶ Ejecutar</button>
</div>
</div>
<div class=\"playground__output\">
<iframe data-output sandbox=\"allow-scripts allow-modals\"></iframe>
</div>
</div>

??? success \"Solución\"
    \`\`\`javascript
    document.getElementById('btn').addEventListener('click', () => {
      const color = 'hsl(' + (Math.random() * 360) + ', 70%, 80%)';
      document.body.style.background = color;
    });
    \`\`\`

---

## 🧪 Ejercicio 4: Lista de tareas

**Nivel**: 🟡 Intermedio
**Conceptos**: DOM, eventos, delegación

### 🎯 Objetivo

Un input y un botón que añadan tareas a una lista. Cada tarea debe poder eliminarse.

### 🖥️ Editor

<div class=\"playground-ejercicio\" data-ejercicio=\"tareas\">
<div class=\"playground__editor\">
<div class=\"playground__tabs\">
<button class=\"playground__tab is-active\" data-lang=\"html\">HTML</button>
<button class=\"playground__tab\" data-lang=\"css\">CSS</button>
<button class=\"playground__tab\" data-lang=\"js\">JS</button>
</div>
<textarea class=\"playground__textarea\" data-lang=\"html\" spellcheck=\"false\"><input type=\"text\" id=\"tarea\" placeholder=\"Nueva tarea\">
<button id=\"add\">Añadir</button>
<ul id=\"lista\"></ul></textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"css\" spellcheck=\"false\">body { font-family: system-ui; padding: 1.5rem; }
input { padding: .5rem; border: 1px solid #ddd; border-radius: 6px; }
button { padding: .5rem 1rem; background: #6a5acd; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
ul { list-style: none; padding: 0; }
li { padding: .5rem; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
.del { background: #dc3545; padding: .25rem .5rem; }</textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"js\" spellcheck=\"false\">// Tu código aquí
</textarea>
<div class=\"playground__actions\">
<button class=\"md-button md-button--primary\" data-run>▶ Ejecutar</button>
</div>
</div>
<div class=\"playground__output\">
<iframe data-output sandbox=\"allow-scripts allow-modals\"></iframe>
</div>
</div>

??? success \"Solución\"
    \`\`\`javascript
    document.getElementById('add').addEventListener('click', () => {
      const texto = document.getElementById('tarea').value.trim();
      if (!texto) return;
      const li = document.createElement('li');
      li.innerHTML = texto + ' <button class=\"del\">❌</button>';
      document.getElementById('lista').appendChild(li);
      document.getElementById('tarea').value = '';
    });

    document.getElementById('lista').addEventListener('click', (e) => {
      if (e.target.classList.contains('del')) {
        e.target.parentElement.remove();
      }
    });
    \`\`\`

---

## 🧪 Ejercicio 5: Reloj en tiempo real

**Nivel**: 🟠 Avanzado
**Conceptos**: setInterval, Date, toLocaleTimeString

### 🎯 Objetivo

Mostrar la hora actual en pantalla, actualizándose cada segundo.

### 🖥️ Editor

<div class=\"playground-ejercicio\" data-ejercicio=\"reloj\">
<div class=\"playground__editor\">
<div class=\"playground__tabs\">
<button class=\"playground__tab is-active\" data-lang=\"html\">HTML</button>
<button class=\"playground__tab\" data-lang=\"css\">CSS</button>
<button class=\"playground__tab\" data-lang=\"js\">JS</button>
</div>
<textarea class=\"playground__textarea\" data-lang=\"html\" spellcheck=\"false\"><h2 id=\"reloj\">--:--:--</h2></textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"css\" spellcheck=\"false\">body { font-family: system-ui; padding: 1.5rem; text-align: center; }
h2 { font-size: 3rem; color: #6a5acd; font-variant-numeric: tabular-nums; }</textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"js\" spellcheck=\"false\">// Tu código aquí
</textarea>
<div class=\"playground__actions\">
<button class=\"md-button md-button--primary\" data-run>▶ Ejecutar</button>
</div>
</div>
<div class=\"playground__output\">
<iframe data-output sandbox=\"allow-scripts allow-modals\"></iframe>
</div>
</div>

??? success \"Solución\"
    \`\`\`javascript
    function actualizar() {
      document.getElementById('reloj').textContent =
        new Date().toLocaleTimeString('es-ES');
    }
    setInterval(actualizar, 1000);
    actualizar();
    \`\`\`

---

## 🧪 Ejercicio 6: Calculadora básica

**Nivel**: 🟠 Avanzado
**Conceptos**: parseFloat, switch, formularios

### 🎯 Objetivo

Una calculadora que sume, reste, multiplique y divida dos números.

### 🖥️ Editor

<div class=\"playground-ejercicio\" data-ejercicio=\"calculadora\">
<div class=\"playground__editor\">
<div class=\"playground__tabs\">
<button class=\"playground__tab is-active\" data-lang=\"html\">HTML</button>
<button class=\"playground__tab\" data-lang=\"css\">CSS</button>
<button class=\"playground__tab\" data-lang=\"js\">JS</button>
</div>
<textarea class=\"playground__textarea\" data-lang=\"html\" spellcheck=\"false\"><input type=\"number\" id=\"a\" placeholder=\"A\">
<select id=\"op\">
<option value=\"+\">+</option>
<option value=\"-\">−</option>
<option value=\"*\">×</option>
<option value=\"/\">÷</option>
</select>
<input type=\"number\" id=\"b\" placeholder=\"B\">
<button id=\"calcular\">=</button>
<span id=\"resultado\"></span></textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"css\" spellcheck=\"false\">body { font-family: system-ui; padding: 1.5rem; }
input, select, button { padding: .5rem; font-size: 1rem; margin: .25rem; }
button { background: #6a5acd; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
#resultado { font-size: 1.5rem; font-weight: 700; color: #6a5acd; margin-left: .5rem; }</textarea>
<textarea class=\"playground__textarea is-hidden\" data-lang=\"js\" spellcheck=\"false\">// Tu código aquí
</textarea>
<div class=\"playground__actions\">
<button class=\"md-button md-button--primary\" data-run>▶ Ejecutar</button>
</div>
</div>
<div class=\"playground__output\">
<iframe data-output sandbox=\"allow-scripts allow-modals\"></iframe>
</div>
</div>

??? success \"Solución\"
    \`\`\`javascript
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
    \`\`\`

---

## 📊 Progreso de ejercicios

<div class=\"ejercicios-progreso\">
<p>Ejercicios completados: <strong id=\"ej-progreso\">0 / 6</strong></p>
<div class=\"ejercicios-progreso__bar\">
<div class=\"ejercicios-progreso__fill\" id=\"ej-progreso-fill\" style=\"width:0%\"></div>
</div>
</div>

---

## ➡️ Siguientes pasos

[🎮 Volver al Playground](playground.md){ .md-button .md-button--primary }
[🎯 Ver los retos semanales](retos.md){ .md-button }
[🏆 Ver mis logros](logros.md){ .md-button }
'''
open('docs/ejercicios-playground.md', 'w', encoding='utf-8').write(contenido)
print('OK:', len(contenido.splitlines()), 'líneas escritas')
"