# 12 — JavaScript asíncrono

!!! abstract "Qué vas a aprender"
    - Por qué existe la asincronía en JavaScript.
    - Callbacks, promesas y async/await.
    - El event loop en profundidad.
    - Manejo de errores asíncronos.
    - Patrones: Promise.all, Promise.race, Promise.allSettled.

---

## ⏳ ¿Por qué asincronía?

JavaScript es **de un solo hilo**: solo puede ejecutar una cosa a la vez. Si una operación tarda (una petición HTTP, leer un archivo, un temporizador), bloquearía todo. La asincronía permite **no bloquear** mientras se espera.

\`\`\`javascript
// Síncrono: bloquea
console.log('1');
console.log('2');
console.log('3');
// Salida: 1, 2, 3

// Asíncrono: no bloquea
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// Salida: 1, 3, 2
\`\`\`

!!! quote "JavaScript no espera a nadie"
    Cuando una operación asíncrona empieza, JavaScript sigue ejecutando el resto del código. La operación termina más tarde y su resultado se maneja con callbacks, promesas o async/await.

---

## 🕰️ Callbacks (la forma antigua)

\`\`\`javascript
function cargarDatos(callback) {
  setTimeout(() => {
    callback({ nombre: 'Ana' });
  }, 1000);
}

cargarDatos(function (datos) {
  console.log(datos); // { nombre: 'Ana' }
});
\`\`\`

### El problema: callback hell

\`\`\`javascript
cargarUsuario(id, function (usuario) {
  cargarPosts(usuario.id, function (posts) {
    cargarComentarios(posts[0].id, function (comentarios) {
      console.log(comentarios);
    });
  });
});
\`\`\`

Esto es difícil de leer y de manejar errores. Por eso nacieron las promesas.

---

## 🤝 Promesas

Una **promesa** representa un valor que estará disponible en el futuro. Tiene tres estados:

- **Pending**: pendiente.
- **Fulfilled**: resuelta con un valor.
- **Rejected**: rechazada con un error.

\`\`\`javascript
const promesa = new Promise((resolve, reject) => {
  const exito = true;
  if (exito) resolve('¡Funcionó!');
  else reject(new Error('Algo salió mal'));
});

promesa
  .then(valor => console.log(valor))
  .catch(err => console.error(err));
\`\`\`

### Encadenar promesas

\`\`\`javascript
fetch('/api/usuario')
  .then(res => res.json())
  .then(usuario => fetch('/api/posts/' + usuario.id))
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(err => console.error(err));
\`\`\`

Mucho más legible que los callbacks anidados.

---

## ⚡ async/await

La forma moderna, **azúcar sintáctico sobre promesas**:

\`\`\`javascript
async function cargarDatos() {
  try {
    const res = await fetch('/api/usuario');
    const usuario = await res.json();
    const res2 = await fetch('/api/posts/' + usuario.id);
    const posts = await res2.json();
    console.log(posts);
  } catch (err) {
    console.error(err);
  }
}
\`\`\`

- \`async\` marca la función como asíncrona (siempre devuelve una promesa).
- \`await\` pausa la ejecución hasta que la promesa se resuelva.

!!! tip "async/await no bloquea"
    Aunque parezca que \`await\` bloquea, no lo hace: solo pausa **esa función**. El resto del programa sigue ejecutándose.

---

## 🧠 El event loop en profundidad

\`\`\`javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// Salida: 1, 4, 3, 2
\`\`\`

### ¿Por qué este orden?

1. **1** y **4** son síncronos → se ejecutan primero.
2. **3** es una microtarea (promesa) → se ejecuta antes que las macrotareas.
3. **2** es una macrotarea (\`setTimeout\`) → se ejecuta al final.

| Tipo | Ejemplos | Prioridad |
| :--- | :--- | :--- |
| **Call stack** | Código síncrono | 1 |
| **Microtareas** | Promesas, \`queueMicrotask\` | 2 |
| **Macrotareas** | \`setTimeout\`, \`setInterval\`, eventos | 3 |

!!! quote "El event loop en una frase"
    El event loop vacía la pila, luego todas las microtareas, luego una macrotarea. Y vuelve a empezar.

---

## 🎯 Patrones de promesas

### Promise.all

Espera a que **todas** se resuelvan. Si una falla, todo falla.

\`\`\`javascript
const [usuarios, posts] = await Promise.all([
  fetch('/api/usuarios').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]);
\`\`\`

### Promise.allSettled

Espera a todas, **aunque algunas fallen**. Devuelve un array con \`status\` y \`value\`/\`reason\`.

\`\`\`javascript
const resultados = await Promise.allSettled([p1, p2, p3]);
resultados.forEach(r => {
  if (r.status === 'fulfilled') console.log('OK:', r.value);
  else console.error('Error:', r.reason);
});
\`\`\`

### Promise.race

Devuelve la **primera** que se resuelva o rechace.

\`\`\`javascript
const resultado = await Promise.race([
  fetch('/api/a'),
  new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000)),
]);
\`\`\`

### Promise.any

Devuelve la **primera que se resuelva con éxito**. Si todas fallan, rechaza.

\`\`\`javascript
const primero = await Promise.any([p1, p2, p3]);
\`\`\`

---

## 🚨 Manejo de errores

\`\`\`javascript
async function cargar() {
  try {
    const res = await fetch('/api/datos');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (err) {
    console.error('Error:', err.message);
    return null;
  } finally {
    console.log('Terminado');
  }
}
\`\`\`

!!! warning "No olvides el catch"
    Si no capturas los errores de una promesa, se convierten en **unhandled rejections** y pueden romper la app. Siempre añade \`.catch()\` o \`try/catch\`.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-12">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué palabra clave marca una función como asíncrona?</p>
<button class="quiz-option" data-opt="a">A) await</button>
<button class="quiz-option" data-opt="b">B) async</button>
<button class="quiz-option" data-opt="c">C) promise</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>2.</strong> ¿Qué método espera a que todas las promesas terminen, aunque algunas fallen?</p>
<button class="quiz-option" data-opt="a">A) Promise.all</button>
<button class="quiz-option" data-opt="b">B) Promise.race</button>
<button class="quiz-option" data-opt="c">C) Promise.allSettled</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>3.</strong> ¿Qué se ejecuta primero: una promesa o un setTimeout?</p>
<button class="quiz-option" data-opt="a">A) La promesa (microtarea)</button>
<button class="quiz-option" data-opt="b">B) El setTimeout (macrotarea)</button>
<button class="quiz-option" data-opt="c">C) Depende del navegador</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2012%3A%20JavaScript%20as%C3%ADncrono&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F12-javascript-asincrono%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F12-javascript-asincrono%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2012%3A%20JavaScript%20as%C3%ADncrono%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F12-javascript-asincrono%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/12-javascript-asincrono/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 13 — Módulos y bundlers](13-modulos-bundlers.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
