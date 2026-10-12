# Capítulo 12 — JavaScript asíncrono

## Introducción

JavaScript es **monohilo**: solo puede ejecutar una cosa a la vez. Pero la web es inherentemente asíncrona: descargas, temporizadores, eventos, peticiones a APIs… Todas esas cosas tardan y no pueden bloquear la interfaz.

Este capítulo explica cómo JavaScript maneja la asincronía y cómo escribir código legible, seguro y moderno.

## El problema: código bloqueante

```javascript
console.log('Inicio');
const datos = descargaBloqueante(); // bloquea 3 segundos
console.log(datos);
console.log('Fin');
```

Mientras se ejecuta `descargaBloqueante`, el navegador se congela. Nadie puede hacer clic, ni scroll, ni nada.

## Callbacks (el enfoque antiguo)

La primera solución fueron los **callbacks**: funciones que se ejecutan cuando termina la operación.

```javascript
descargar('https://api.com/datos', (error, resultado) => {
  if (error) {
    console.error('Falló:', error);
    return;
  }
  console.log('Datos:', resultado);
});
```

### El infierno de los callbacks

```javascript
login(usuario, (err, sesion) => {
  obtenerPerfil(sesion.id, (err, perfil) => {
    obtenerPosts(perfil.id, (err, posts) => {
      obtenerComentarios(posts[0].id, (err, comentarios) => {
        // 😱
      });
    });
  });
});
```

Anidar callbacks genera código difícil de leer y de mantener. La comunidad lo llamó *callback hell*.

## Promesas

Una **Promise** es un objeto que representa un valor que estará disponible **ahora, en el futuro o nunca**.

Tiene tres estados:

- **pending** — todavía no se ha resuelto.
- **fulfilled** — se resolvió con un valor.
- **rejected** — falló con un error.

### Crear una promesa

```javascript
const esperar = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

esperar(1000).then(() => console.log('Pasó 1 segundo'));
```

### Encadenar promesas

```javascript
fetch('https://api.com/usuarios')
  .then(res => res.json())
  .then(usuarios => {
    console.log(usuarios);
    return fetch(`https://api.com/posts/${usuarios[0].id}`);
  })
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(err => console.error('Error:', err));
```

Mucho mejor que los callbacks anidados, pero aún hay que leer `.then` y `.catch` uno tras otro.

## `async` / `await`

La sintaxis moderna. Convierte código asíncrono en algo que **se lee como código síncrono**.

```javascript
async function obtenerDatos() {
  try {
    const res = await fetch('https://api.com/usuarios');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const usuarios = await res.json();

    const resPosts = await fetch(`https://api.com/posts/${usuarios[0].id}`);
    const posts = await resPosts.json();

    return posts;
  } catch (err) {
    console.error('Error:', err.message);
  }
}
```

Reglas:

- `async` convierte una función en una promesa.
- `await` pausa la ejecución de la función hasta que la promesa se resuelva.
- `await` solo puede usarse dentro de funciones `async` (o en el top-level de un módulo).

!!! tip "Consejo"
    Envuelve siempre las operaciones `await` en `try/catch`. Sin eso, cualquier fallo en la red propagará el error.

## `Promise.all`, `Promise.allSettled` y `Promise.race`

### `Promise.all` — esperar a que todas terminen

```javascript
const [usuarios, posts, comentarios] = await Promise.all([
  fetch('/api/usuarios').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comentarios').then(r => r.json()),
]);
```

Si **una falla**, todo el `Promise.all` falla. Útil cuando todas son necesarias.

### `Promise.allSettled` — esperar sin importar si fallan

```javascript
const resultados = await Promise.allSettled([
  fetch('/api/a'),
  fetch('/api/b'),
  fetch('/api/c'),
]);

resultados.forEach(r => {
  if (r.status === 'fulfilled') console.log('OK:', r.value);
  else console.error('Fallo:', r.reason);
});
```

### `Promise.race` — la primera que responda gana

```javascript
const resultado = await Promise.race([
  fetch('/api/rapida'),
  esperar(3000).then(() => { throw new Error('Timeout'); }),
]);
```

Perfecto para implementar timeouts.

## Cancelar peticiones con `AbortController`

¿Qué pasa si el usuario cambia de página antes de que llegue la respuesta? Hay que **cancelar** la petición.

```javascript
const controller = new AbortController();

fetch('/api/datos', { signal: controller.signal })
  .then(res => res.json())
  .catch(err => {
    if (err.name === 'AbortError') console.log('Cancelado');
    else console.error('Error real:', err);
  });

// En algún momento:
controller.abort();
```

Con `async/await`:

```javascript
async function buscar(texto) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(`/api/buscar?q=${texto}`, {
      signal: controller.signal,
    });
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') return null;
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
```

## Async iterators y `for await...of`

```javascript
async function* contar() {
  for (let i = 1; i <= 3; i++) {
    await esperar(1000);
    yield i;
  }
}

for await (const n of contar()) {
  console.log(n);
}
```

Útil para streams de datos.

## Patrones reales

### Debounce de búsqueda

```javascript
function debounce(fn, ms) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };
}

const buscar = debounce(async (texto) => {
  const res = await fetch(`/api/buscar?q=${texto}`);
  const datos = await res.json();
  renderizar(datos);
}, 300);

input.addEventListener('input', e => buscar(e.target.value));
```

### Reintentos con backoff exponencial

```javascript
async function fetchConReintentos(url, intentos = 3) {
  for (let i = 0; i < intentos; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (err) {
      if (i === intentos - 1) throw err;
    }
    await esperar(2 ** i * 1000);
  }
}
```

### Caché de promesas

```javascript
const cache = new Map();

function fetchCache(url) {
  if (!cache.has(url)) {
    cache.set(url, fetch(url).then(r => r.json()));
  }
  return cache.get(url);
}

// Llamadas repetidas solo disparan una petición
await Promise.all([fetchCache('/api/a'), fetchCache('/api/a')]);
```

## Buenas prácticas

- **Usa siempre `async/await`** en código nuevo. Los callbacks anidados son un antipatrón.
- **Envuelve en `try/catch`** cada bloque `await` que pueda fallar.
- **Comprueba `res.ok`** antes de llamar a `res.json()` en un `fetch`.
- **Cancela peticiones** con `AbortController` cuando el usuario navega o cambia de vista.
- **No mezcles `then` y `await`** en la misma función sin motivo.
- **Usa `Promise.all`** cuando varias operaciones pueden ir en paralelo.
- **Nunca bloquees el hilo** con bucles largos o cálculos pesados; usa Web Workers.

## Ejercicios

1. Reescribe un callback anidado de tres niveles usando `async/await`.
2. Implementa una función `buscarConTimeout(url, ms)` que aborte la petición si excede el tiempo.
3. Simula un sistema de descargas paralelas con `Promise.all` y muestra el progreso.
4. Crea un buscador con `debounce` que consulte una API al escribir.
5. Implementa un patrón de reintento con 3 intentos y espera exponencial.

---

⬅️ [Capítulo 11 — CSS moderno](11-css-moderno.md) | ➡️ Capítulo 13 — Módulos y bundlers (pendiente)tail -5 docs/capitulos/12-javascript-asincrono.md
