# 08 — APIs

!!! quote "Ejercicio resuelto"
    Practica el consumo de APIs con \`fetch\`.

---

## 🎯 Objetivo

Consume la API pública de JSONPlaceholder (\`https://jsonplaceholder.typicode.com/posts\`) y muestra los títulos de los primeros 5 posts.

---

## 💡 Solución

\`\`\`html
<h1>Posts</h1>
<ul id="posts"></ul>

<script>
  async function cargarPosts() {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!res.ok) throw new Error('Error HTTP ' + res.status);
      const posts = await res.json();

      const lista = document.getElementById('posts');
      posts.slice(0, 5).forEach(post => {
        const li = document.createElement('li');
        li.textContent = post.title;
        lista.appendChild(li);
      });
    } catch (err) {
      console.error('Algo salió mal:', err);
    }
  }

  cargarPosts();
</script>
\`\`\`

---

## 🧠 Conceptos clave

- \`fetch()\`: hace peticiones HTTP.
- \`await\`: espera la respuesta.
- \`res.ok\`: comprueba si la respuesta es exitosa.
- \`res.json()\`: convierte la respuesta a objeto JS.
- \`try/catch\`: maneja errores de red.

---

## 🚀 Retos extra

- [ ] Muestra también el cuerpo del post.
- [ ] Añade un botón para recargar.
- [ ] Maneja el estado de carga con un \`<p>Cargando...</p>\`.

---

[← Ejercicio 07](07-git.md){ .md-button }
[Ir al ejercicio 09 →](09-despliegue.md){ .md-button .md-button--primary }
