# 08 — Consumo de APIs con fetch

!!! abstract "Qué vas a aprender"
    - Qué es una API y para qué sirve.
    - Cómo hacer peticiones HTTP con fetch.
    - Manejar respuestas JSON.
    - async/await y manejo de errores.
    - Buenas prácticas al consumir APIs.

---

## 🔌 ¿Qué es una API?

Una **API** (*Application Programming Interface*) es un conjunto de reglas que permite que dos programas se comuniquen. En desarrollo web, casi siempre se refiere a una **API REST** que devuelve datos en formato **JSON**.

!!! quote "Una API es como un camarero"
    Tú (el cliente) pides algo del menú (la petición). El camarero (la API) va a la cocina (el servidor), recoge tu pedido y te lo trae (la respuesta). No necesitas saber cómo funciona la cocina.

---

## 🌐 Anatomía de una petición HTTP

```
GET https://api.ejemplo.com/usuarios?limit=10
Headers:
  Authorization: Bearer token123
  Content-Type: application/json
```

| Verbo | Uso |
| :--- | :--- |
| \`GET\` | Obtener datos |
| \`POST\` | Crear un recurso |
| \`PUT\` / \`PATCH\` | Actualizar un recurso |
| \`DELETE\` | Eliminar un recurso |

| Código | Significado |
| :--- | :--- |
| 200 | OK |
| 201 | Creado |
| 400 | Petición incorrecta |
| 401 | No autorizado |
| 403 | Prohibido |
| 404 | No encontrado |
| 500 | Error del servidor |

---

## 📡 Fetch básico

```javascript
fetch('https://api.ejemplo.com/usuarios')
  .then(res => {
    if (!res.ok) throw new Error('Error HTTP ' + res.status);
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

!!! tip "fetch no falla en errores HTTP"
    \`fetch\` solo rechaza la promesa si hay un error **de red**. Si el servidor devuelve un 404 o un 500, la promesa se resuelve igual. Por eso hay que comprobar \`res.ok\` manualmente.

---

## ⚡ async/await

La forma moderna y más legible:

```javascript
async function cargarUsuarios() {
  try {
    const res = await fetch('https://api.ejemplo.com/usuarios');
    if (!res.ok) throw new Error('Error HTTP ' + res.status);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error('Algo salió mal:', err);
  }
}

cargarUsuarios();
```

---

## 📤 Enviar datos (POST)

```javascript
async function crearUsuario(usuario) {
  const res = await fetch('https://api.ejemplo.com/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });

  if (!res.ok) throw new Error('Error al crear usuario');
  return res.json();
}

crearUsuario({ nombre: 'Ana', email: 'ana@ejemplo.com' })
  .then(data => console.log('Creado:', data))
  .catch(err => console.error(err));
```

---

## 🔑 Autenticación con tokens

```javascript
const res = await fetch('https://api.ejemplo.com/perfil', {
  headers: {
    'Authorization': 'Bearer ' + token,
  },
});
```

!!! warning "Nunca guardes tokens en el código"
    Los tokens van en variables de entorno o en \`localStorage\` (con cuidado). **Nunca** en el código fuente que subes a GitHub.

---

## 🔄 Peticiones en paralelo

```javascript
const [usuarios, posts] = await Promise.all([
  fetch('/api/usuarios').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]);
```

\`Promise.all\` espera a que **todas** terminen. Si una falla, todo falla.

```javascript
const resultados = await Promise.allSettled([
  fetch('/api/a').then(r => r.json()),
  fetch('/api/b').then(r => r.json()),
]);
// resultados[0].status === 'fulfilled' o 'rejected'
```

\`Promise.allSettled\` espera a todas, pero **no falla** si alguna falla.

---

## 🚨 Manejo de errores

```javascript
async function cargarDatos() {
  try {
    const res = await fetch('/api/datos');
    if (!res.ok) {
      if (res.status === 401) throw new Error('No autorizado');
      if (res.status === 404) throw new Error('No encontrado');
      throw new Error('Error HTTP ' + res.status);
    }
    return await res.json();
  } catch (err) {
    console.error(err.message);
    return null;
  }
}
```

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-8">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué verbo HTTP se usa para obtener datos?</p>
<button class="quiz-option" data-opt="a">A) POST</button>
<button class="quiz-option" data-opt="b">B) GET</button>
<button class="quiz-option" data-opt="c">C) DELETE</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué hay que comprobar después de un fetch para saber si hubo error HTTP?</p>
<button class="quiz-option" data-opt="a">A) res.ok</button>
<button class="quiz-option" data-opt="b">B) res.error</button>
<button class="quiz-option" data-opt="c">C) res.status === 0</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué método espera a que todas las promesas terminen?</p>
<button class="quiz-option" data-opt="a">A) Promise.race</button>
<button class="quiz-option" data-opt="b">B) Promise.any</button>
<button class="quiz-option" data-opt="c">C) Promise.all</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%208%3A%20Consumo%20de%20APIs%20con%20fetch&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F08-apis%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F08-apis%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%208%3A%20Consumo%20de%20APIs%20con%20fetch%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F08-apis%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/08-apis/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 9 — Despliegue y hosting](09-despliegue.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
