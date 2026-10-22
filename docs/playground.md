cd ~/Libro-desarrollador-Web-Urukais-
python3 -c "
contenido = '''# 🎮 Playground

!!! quote \"Programa, prueba, aprende\"
    Un entorno interactivo para escribir HTML, CSS y JavaScript directamente en el navegador. Sin instalar nada, sin configurar nada. Escribe código, pulsa Ejecutar y ve el resultado al instante.

---

## 🧪 Editor en vivo

<div class=\"playground\">
<div class=\"playground__editor\">
<div class=\"playground__tabs\">
<button class=\"playground__tab is-active\" data-lang=\"html\">HTML</button>
<button class=\"playground__tab\" data-lang=\"css\">CSS</button>
<button class=\"playground__tab\" data-lang=\"js\">JS</button>
</div>
<textarea class=\"playground__textarea\" id=\"pg-html\" spellcheck=\"false\"><h1>Hola, mundo 🌍</h1>
<p>Este es mi primer playground.</p>
<button id=\"btn\">Haz clic</button></textarea>
<textarea class=\"playground__textarea is-hidden\" id=\"pg-css\" spellcheck=\"false\">body {
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
<textarea class=\"playground__textarea is-hidden\" id=\"pg-js\" spellcheck=\"false\">document.getElementById('btn').addEventListener('click', () => {
  alert('¡Hola desde el Playground! 👋');
});</textarea>
<div class=\"playground__actions\">
<button class=\"md-button md-button--primary\" id=\"pg-run\">▶ Ejecutar</button>
<button class=\"md-button\" id=\"pg-reset\">↺ Reiniciar</button>
</div>
</div>
<div class=\"playground__output\">
<iframe id=\"pg-output\" sandbox=\"allow-scripts allow-modals\"></iframe>
</div>
</div>

!!! tip \"Cómo usarlo\"
    1. **Escribe** tu HTML, CSS y JavaScript en las pestañas.
    2. **Pulsa Ejecutar** (o Ctrl+Enter) para ver el resultado.
    3. **Pulsa Reiniciar** para volver al ejemplo original.
    4. **Copia el código** y llévalo a tu editor para trabajar en local.

---

## 🎯 Retos del Playground

Prueba a resolver estos retos usando el editor de arriba. Cada uno tiene un objetivo y una pista.

### 🟢 Reto 1: Saludo personalizado

**Objetivo**: Crear un input donde el usuario escriba su nombre y, al pulsar un botón, se muestre un saludo personalizado.

??? success \"Solución\"
    \`\`\`html
    <input type=\"text\" id=\"nombre\" placeholder=\"Tu nombre\">
    <button id=\"saludar\">Saludar</button>
    <p id=\"resultado\"></p>
    \`\`\`

    \`\`\`javascript
    document.getElementById('saludar').addEventListener('click', () => {
      const nombre = document.getElementById('nombre').value || 'mundo';
      document.getElementById('resultado').textContent = '¡Hola, ' + nombre + '! 👋';
    });
    \`\`\`

### 🟡 Reto 2: Contador de clics

**Objetivo**: Un botón que incrementa un contador cada vez que se pulsa.

??? success \"Solución\"
    \`\`\`html
    <button id=\"btn\">Clics: 0</button>
    \`\`\`

    \`\`\`javascript
    let clicks = 0;
    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
      clicks++;
      btn.textContent = 'Clics: ' + clicks;
    });
    \`\`\`

### 🟡 Reto 3: Cambiar color de fondo

**Objetivo**: Un botón que cambia el color de fondo de la página a un color aleatorio.

??? success \"Solución\"
    \`\`\`javascript
    document.getElementById('btn').addEventListener('click', () => {
      const color = 'hsl(' + (Math.random() * 360) + ', 70%, 80%)';
      document.body.style.background = color;
    });
    \`\`\`

### 🟠 Reto 4: Lista de tareas simple

**Objetivo**: Un input y un botón que añadan tareas a una lista. Cada tarea debe poder eliminarse.

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

### 🟠 Reto 5: Reloj en tiempo real

**Objetivo**: Mostrar la hora actual en pantalla, actualizándose cada segundo.

??? success \"Solución\"
    \`\`\`javascript
    function actualizar() {
      document.getElementById('reloj').textContent =
        new Date().toLocaleTimeString('es-ES');
    }
    setInterval(actualizar, 1000);
    actualizar();
    \`\`\`

### 🔴 Reto 6: Calculadora básica

**Objetivo**: Una calculadora que sume, reste, multiplique y divida dos números.

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
        case '/': r = b !== 0 ? a / b : 'Error: /0'; break;
      }
      document.getElementById('resultado').textContent = r;
    });
    \`\`\`

---

## 🎨 Ejemplos para inspirarte

### Ejemplo 1: Tarjeta de presentación

\`\`\`html
<div class=\"card\">
  <h2>Ana García</h2>
  <p>Desarrolladora frontend</p>
  <a href=\"#\">Contactar</a>
</div>
\`\`\`

\`\`\`css
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
\`\`\`

### Ejemplo 2: Spinner de carga

\`\`\`css
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
\`\`\`

### Ejemplo 3: Modo oscuro con un botón

\`\`\`javascript
document.getElementById('tema').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
\`\`\`

\`\`\`css
body.dark {
  background: #1a1726;
  color: #e8e5f5;
}
\`\`\`

---

## 🔒 Seguridad del Playground

El editor ejecuta el código en un **iframe aislado** con sandbox. Esto significa que:

- ✅ Puedes usar HTML, CSS y JavaScript con normalidad.
- ✅ Puedes usar alert, console.log y manipular el DOM.
- ❌ **No** puedes acceder a las cookies de la página principal.
- ❌ **No** puedes hacer peticiones a otros dominios sin CORS.
- ❌ **No** puedes acceder a localStorage de la página principal.

---

## 🚀 Siguientes pasos

[🧪 Ir a los ejercicios del Playground](ejercicios-playground.md){ .md-button .md-button--primary }
[🎯 Ver los retos semanales](retos.md){ .md-button }
[💼 Practicar preguntas de entrevista](entrevistas.md){ .md-button }
'''
open('docs/playground.md', 'w', encoding='utf-8').write(contenido)
print('OK:', len(contenido.splitlines()), 'líneas escritas')
"