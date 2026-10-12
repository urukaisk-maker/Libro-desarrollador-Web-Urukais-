# Capítulo 8 — Consumo de APIs con fetch

## ¿Qué es una API?

Una **API** (*Application Programming Interface*) es un conjunto de reglas que permite a dos programas comunicarse. En la web, casi siempre hablamos de **APIs REST**: servicios que exponen datos en formato JSON a través de URLs.

Ejemplo: `https://api.github.com/users/urukaisk-maker` devuelve información de un usuario de GitHub en JSON.

## Métodos HTTP

| Método | Uso |
|---|---|
| `GET` | Obtener datos |
| `POST` | Crear un recurso |
| `PUT` / `PATCH` | Actualizar |
| `DELETE` | Borrar |

## JSON

**JSON** (*JavaScript Object Notation*) es el formato estándar para intercambiar datos.

```json
{
  "nombre": "Urukais",
  "edad": 30,
  "lenguajes": ["HTML", "CSS", "JavaScript"]
}
```

## Peticiones con fetch

`fetch()` es la forma moderna de hacer peticiones HTTP desde el navegador.

### GET básico

```javascript
fetch('https://api.github.com/users/urukaisk-maker')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Con async/await (más limpio)

```javascript
async function obtenerUsuario() {
  const res = await fetch('https://api.github.com/users/urukaisk-maker');
  const data = await res.json();
  console.log(data);
}
obtenerUsuario();
```

### Manejo de errores

```javascript
async function obtenerUsuario() {
  try {
    const res = await fetch('https://api.github.com/users/urukaisk-maker');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Error:', err.message);
  }
}
```

### POST con datos

```javascript
const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Hola', body: 'Mundo' })
});
const data = await res.json();
```

## Mostrar datos en el DOM

```javascript
async function cargarUsuarios() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const usuarios = await res.json();

  const lista = document.querySelector('#lista');
  lista.innerHTML = usuarios
    .map(u => `<li>${u.name} — ${u.email}</li>`)
    .join('');
}
cargarUsuarios();
```

## Ejemplo práctico

Ver [ejemplos/08-apis/ejemplo.html](../ejemplos/08-apis/ejemplo.html).

## Ejercicios

1. Muestra una lista de usuarios de `jsonplaceholder.typicode.com/users`.
2. Añade un `input` para buscar usuarios por nombre.
3. Muestra un mensaje de "Cargando…" mientras llega la respuesta.
4. Maneja el error cuando la API devuelve 404.

---

⬅ [Capítulo 7 — Git](07-git.md) | ➡ [Capítulo 9 — Despliegue y hosting](09-despliegue.md)
