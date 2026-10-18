# 🔥 Reto #1: El botón camaleón

**Dificultad:** 🟢 Fácil · **Tema:** HTML y CSS

Crea un botón que cambie de color de fondo y de texto cuando el usuario pase el ratón por encima (`hover`). Debe tener bordes redondeados y una transición suave.

??? success "Ver solución"
    ```html
    <button class="mi-boton">Púlsame</button>
    .mi-boton {
  background: #6a5acd; color: white;
  padding: 10px 20px; border: none; border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
}
.mi-boton:hover { background: #22d3ee; color: #0f172a; }

---

### 📄 Archivo 3: `docs/retos/reto-2.md`

```markdown
# 🔥 Reto #2: La tarjeta de presentación

**Dificultad:** 🟡 Medio · **Tema:** HTML y CSS

Crea una tarjeta con tu nombre, foto (placeholder) y biografía. Debe tener sombra suave y elevarse al hacer hover.

??? success "Ver solución"
    ```html
    <div class="tarjeta">
      <img src="https://i.pravatar.cc/150?img=3" alt="Avatar">
      <h2>Tu Nombre</h2>
      <p>Desarrollador web apasionado.</p>
    </div>
    .tarjeta {
  border: 1px solid #e2e8f0; border-radius: 12px;
  padding: 2rem; text-align: center; max-width: 300px;
  transition: transform 0.3s, box-shadow 0.3s;
}
.tarjeta:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.tarjeta img { border-radius: 50%; width: 100px; height: 100px; }

---

### 📄 Archivo 4: `docs/retos/reto-3.md`

```markdown
# 🔥 Reto #3: Contador de clics

**Dificultad:** 🟢 Fácil · **Tema:** JavaScript

Crea un botón que incremente un contador cada vez que se pulse. Muestra el número en pantalla.

??? success "Ver solución"
    ```html
    <button id="btn">Púlsame</button>
    <p>Has pulsado: <span id="contador">0</span> veces</p>
    let n = 0;
const btn = document.getElementById('btn');
const display = document.getElementById('contador');
btn.addEventListener('click', () => {
  n++;
  display.textContent = n;
});