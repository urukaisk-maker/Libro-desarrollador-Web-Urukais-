# Ejercicios resueltos — Capítulo 12

[Volver al índice](index.md) · [Capítulo original](../capitulos/12-javascript-asincrono.md)

## Ejercicio 1: Callbacks a async/await

> Reescribe un callback anidado de tres niveles usando `async/await`.

### Antes

```javascript
login(usuario, (err, sesion) => {
  obtenerPerfil(sesion.id, (err, perfil) => {
    obtenerPosts(perfil.id, (err, posts) => {
      console.log(posts);
    });
  });
});
```

### Solución

```javascript
async function cargarDatos(usuario) {
  try {
    const sesion = await login(usuario);
    const perfil = await obtenerPerfil(sesion.id);
    const posts = await obtenerPosts(perfil.id);
    return posts;
  } catch (err) {
    console.error('Error:', err.message);
  }
}
```

---

## Ejercicio 2: Timeout con `AbortController`

> Implementa una función `buscarConTimeout(url, ms)` que aborte la petición si excede el tiempo.

### Solución

```javascript
async function buscarConTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Timeout: la petición tardó demasiado');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// Uso
try {
  const datos = await buscarConTimeout('https://api.com/datos', 3000);
} catch (err) {
  console.error(err.message);
}
```

---

## Ejercicio 3: Descargas paralelas

> Simula un sistema de descargas con `Promise.all` y muestra progreso.

### Solución

```javascript
async function descargarTodo(urls) {
  let completadas = 0;

  const tareas = urls.map(async (url) => {
    const res = await fetch(url);
    completadas++;
    console.log(`Progreso: ${completadas}/${urls.length}`);
    return res.json();
  });

  return Promise.all(tareas);
}

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
];

const resultados = await descargarTodo(urls);
```

---

## Ejercicio 4: Buscador con debounce

> Crea un buscador con `debounce` que consulte una API al escribir.

### Solución

```javascript
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

const input = document.querySelector('#buscar');
const resultados = document.querySelector('#resultados');

const buscar = debounce(async (texto) => {
  if (texto.length < 3) return;

  try {
    const res = await fetch(`/api/buscar?q=${encodeURIComponent(texto)}`);
    const datos = await res.json();
    resultados.innerHTML = datos
      .map(d => `<li>${d.nombre}</li>`)
      .join('');
  } catch (err) {
    console.error(err);
  }
}, 300);

input.addEventListener('input', (e) => buscar(e.target.value));
```

---

## Ejercicio 5: Reintentos con backoff exponencial

> Implementa un patrón de reintento con 3 intentos y espera exponencial.

### Solución

```javascript
const esperar = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchConReintentos(url, intentos = 3) {
  for (let i = 0; i < intentos; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === intentos - 1) throw err;
      const espera = 2 ** i * 1000; // 1s, 2s, 4s...
      console.warn(`Reintentando en ${espera}ms...`);
      await esperar(espera);
    }
  }
}
```

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/12-javascript-asincrono.md)
