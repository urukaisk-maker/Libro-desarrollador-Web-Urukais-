# 12 — JavaScript asíncrono

!!! quote "Ejercicio resuelto"
    Practica promesas, async/await y manejo de errores.

---

## 🎯 Objetivo

Crea una función que:

1. Haga 2 peticiones en paralelo.
2. Combine los resultados.
3. Maneje errores de red.

---

## 💡 Solución

\`\`\`javascript
async function cargarDatos() {
  try {
    const [usuarios, posts] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
      fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json())
    ]);

    return {
      usuarios: usuarios.length,
      posts: posts.length,
      ultimoPost: posts[posts.length - 1].title
    };
  } catch (err) {
    console.error('Error:', err.message);
    return null;
  }
}

cargarDatos().then(data => console.log(data));
\`\`\`

---

## 🧠 Conceptos clave

- \`Promise.all()\`: espera a que todas las promesas se resuelvan.
- \`async/await\`: sintaxis más legible.
- \`try/catch\`: manejo de errores.
- Desestructuración de arrays.

---

## 🚀 Retos extra

- [ ] Usa \`Promise.allSettled\` para que un error no cancele todo.
- [ ] Añade un timeout con \`Promise.race\`.
- [ ] Muestra un estado de carga mientras se cargan los datos.

---

[← Ejercicio 11](11-css-moderno.md){ .md-button }
[Ir al ejercicio 13 →](13-modulos-bundlers.md){ .md-button .md-button--primary }
