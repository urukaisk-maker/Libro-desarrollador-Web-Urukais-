# Ejercicios resueltos — Capítulo 8

[Volver al índice](index.md) · [Capítulo original](../capitulos/08-apis.md)

## Ejercicio 1: Lista de usuarios

> Muestra una lista de usuarios de `jsonplaceholder.typicode.com/users`.

### Solución

```html
<ul id="lista"></ul>

<script>
  async function cargarUsuarios() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const usuarios = await res.json();

    const lista = document.getElementById('lista');
    lista.innerHTML = usuarios
      .map(u => `<li><strong>${u.name}</strong> — ${u.email}</li>`)
      .join('');
  }

  cargarUsuarios().catch(err => console.error(err));
</script>
```

!!! warning "Cuidado con `innerHTML`"
    Aquí `innerHTML` es seguro porque los datos vienen de una API fiable. Con datos del usuario, usa `textContent` o escapa el HTML.

---

## Ejercicio 2: Buscar usuarios por nombre

> Añade un `input` para buscar usuarios por nombre.

### Solución

```html
<input type="text" id="buscar" placeholder="Buscar...">
<ul id="lista"></ul>

<script>
  let usuarios = [];

  async function cargar() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    usuarios = await res.json();
    render(usuarios);
  }

  function render(lista) {
    document.getElementById('lista').innerHTML = lista
      .map(u => `<li>${u.name}</li>`)
      .join('');
  }

  document.getElementById('buscar').addEventListener('input', (e) => {
    const texto = e.target.value.toLowerCase();
    const filtrados = usuarios.filter(u =>
      u.name.toLowerCase().includes(texto)
    );
    render(filtrados);
  });

  cargar();
</script>
```

---

## Ejercicio 3: Mensaje de "Cargando…"

> Muestra un mensaje mientras llega la respuesta.

### Solución

```html
<div id="estado"></div>
<ul id="lista"></ul>

<script>
  async function cargar() {
    const estado = document.getElementById('estado');
    const lista = document.getElementById('lista');

    estado.textContent = 'Cargando…';
    lista.innerHTML = '';

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const usuarios = await res.json();
      lista.innerHTML = usuarios.map(u => `<li>${u.name}</li>`).join('');
      estado.textContent = `${usuarios.length} usuarios cargados`;
    } catch (err) {
      estado.textContent = `Error: ${err.message}`;
    }
  }

  cargar();
</script>
```

---

## Ejercicio 4: Manejo de error 404

> Maneja el error cuando la API devuelve 404.

### Solución

```javascript
async function obtener(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) throw new Error('Recurso no encontrado');
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error('Fallo:', err.message);
    return null;
  }
}

// Prueba con URL inexistente
obtener('https://jsonplaceholder.typicode.com/inexistente');
```

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/08-apis.md)
