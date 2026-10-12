# Ejercicios resueltos — Capítulo 10

[Volver al índice](index.md) · [Capítulo original](../capitulos/10-proyecto-final.md)

## Ejercicio 1: Personalizar colores y tipografía

> Personaliza colores y tipografía a tu gusto.

### Solución

```css
:root {
  --color-primary: #6a5acd;
  --color-accent: #22d3ee;
  --color-bg: #ffffff;
  --color-text: #1e293b;
  --font-main: 'Inter', system-ui, sans-serif;
}

body {
  font-family: var(--font-main);
  background: var(--color-bg);
  color: var(--color-text);
}

a {
  color: var(--color-primary);
}

.hero h1 {
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

---

## Ejercicio 2: Sección "Sobre mí"

> Añade una sección con tu foto.

### Solución

```html
<section id="sobre-mi" class="sobre-mi">
  <img src="img/perfil.jpg" alt="Foto de Tu Nombre" class="perfil">
  <div>
    <h2>Sobre mí</h2>
    <p>Soy desarrollador web con experiencia en frontend...</p>
  </div>
</section>
```

```css
.sobre-mi {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 2rem;
  align-items: center;
  max-width: 800px;
  margin: 4rem auto;
  padding: 0 1rem;
}

.perfil {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
}

@media (max-width: 600px) {
  .sobre-mi {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
```

---

## Ejercicio 3: Formulario de contacto con Formspree

> Crea un formulario de contacto funcional.

### Solución

```html
<form action="https://formspree.io/f/TU_ID" method="POST">
  <label for="nombre">Nombre</label>
  <input type="text" id="nombre" name="nombre" required>

  <label for="email">Email</label>
  <input type="email" id="email" name="_replyto" required>

  <label for="mensaje">Mensaje</label>
  <textarea id="mensaje" name="mensaje" rows="5" required></textarea>

  <button type="submit">Enviar</button>
</form>
```

Regístrate gratis en [formspree.io](https://formspree.io), crea un form y sustituye `TU_ID`.

---

## Ejercicio 4: Modo oscuro

> Añade modo oscuro con un botón.

### Solución

```html
<button id="toggle-tema" aria-label="Cambiar tema">🌙</button>

<script>
  const btn = document.getElementById('toggle-tema');

  btn.addEventListener('click', () => {
    const actual = document.documentElement.dataset.theme;
    const nuevo = actual === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nuevo;
    btn.textContent = nuevo === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('tema', nuevo);
  });

  // Cargar preferencia guardada
  const guardado = localStorage.getItem('tema') || 'light';
  document.documentElement.dataset.theme = guardado;
  btn.textContent = guardado === 'dark' ? '☀️' : '🌙';
</script>
```

```css
:root {
  --bg: #ffffff;
  --text: #1e293b;
}

[data-theme="dark"] {
  --bg: #0f172a;
  --text: #e2e8f0;
}

body {
  background: var(--bg);
  color: var(--text);
  transition: background 300ms, color 300ms;
}
```

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/10-proyecto-final.md)
