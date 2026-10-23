# 04 — JavaScript esencial

!!! abstract "Qué vas a aprender"
    - Qué es JavaScript y cómo se ejecuta.
    - Variables, tipos y operadores.
    - Funciones y estructuras de control.
    - Manipulación del DOM.
    - Eventos.

---

## ⚡ ¿Qué es JavaScript?

**JavaScript** es el lenguaje de programación que da **comportamiento** a la web.

\`\`\`javascript
console.log('Hola, mundo');
\`\`\`

!!! tip "JavaScript no es Java"
    Aunque se llamen parecido, **JavaScript y Java son lenguajes completamente distintos**.

---

## 📦 Variables y tipos

\`\`\`javascript
const nombre = 'Ana';
let edad = 30;
const texto = 'hola';
const numero = 42;
const booleano = true;
\`\`\`

| Tipo | Ejemplo |
| :--- | :--- |
| string | 'hola' |
| number | 42 |
| boolean | true |
| null | null |
| undefined | undefined |
| object | {} |
| function | function() {} |

---

## 🧮 Operadores

\`\`\`javascript
5 + 3;   // 8
5 - 3;   // 2
5 * 3;   // 15
5 / 3;   // 1.666…
5 % 3;   // 2
5 ** 3;  // 125

5 == '5';    // true
5 === '5';   // false

true && false;   // false
true || false;   // true
!true;           // false

const edad = 20;
const tipo = edad >= 18 ? 'adulto' : 'menor';
\`\`\`

---

## 🔧 Funciones

\`\`\`javascript
function sumar(a, b) {
  return a + b;
}

const restar = function(a, b) {
  return a - b;
};

const multiplicar = (a, b) => a * b;

function saludar(nombre = 'mundo') {
  return 'Hola, ' + nombre;
}
\`\`\`

---

## 🔁 Estructuras de control

\`\`\`javascript
const edad = 20;
if (edad >= 18) {
  console.log('Eres mayor de edad');
} else {
  console.log('Eres menor');
}

for (let i = 0; i < 5; i++) {
  console.log(i);
}

[1, 2, 3].forEach(n => console.log(n));
\`\`\`

---

## 🧰 Arrays

\`\`\`javascript
const arr = [1, 2, 3, 4, 5];

arr.push(6);
arr.pop();
arr.length;

const dobles = arr.map(n => n * 2);
const pares = arr.filter(n => n % 2 === 0);
const suma = arr.reduce((acc, n) => acc + n, 0);

arr.find(n => n > 3);
arr.includes(3);
\`\`\`

---

## 🏠 El DOM

\`\`\`javascript
const titulo = document.querySelector('h1');
titulo.textContent = 'Nuevo título';
titulo.classList.add('activo');

const parrafo = document.createElement('p');
parrafo.textContent = 'Hola';
document.body.appendChild(parrafo);

parrafo.remove();
\`\`\`

---

## 🎯 Eventos

\`\`\`javascript
const boton = document.querySelector('button');

boton.addEventListener('click', (event) => {
  console.log('Se hizo clic', event.target);
});

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Formulario enviado');
});
\`\`\`

| Evento | Cuándo se dispara |
| :--- | :--- |
| click | Al hacer clic |
| submit | Al enviar un formulario |
| input | Al escribir en un input |
| change | Al cambiar el valor |
| keydown | Al pulsar una tecla |
| scroll | Al hacer scroll |
| DOMContentLoaded | Cuando el DOM está listo |

---

## 🧠 Pon a prueba tus conocimientos

<style>
.quiz {
  margin: 1.5rem 0 !important;
  padding: 1rem 1.25rem !important;
  border: 2px solid #6a5acd !important;
  border-radius: 10px !important;
  background: #f8f7fb !important;
}
.quiz-question {
  margin-bottom: 1.5rem !important;
}
.quiz-question p {
  margin-bottom: .75rem !important;
  font-weight: 500 !important;
}
.quiz-option {
  display: block !important;
  width: 100% !important;
  text-align: left !important;
  margin: .35rem 0 !important;
  padding: .6rem .9rem !important;
  border: 1px solid #ccc !important;
  border-radius: 6px !important;
  cursor: pointer !important;
  background: #fff !important;
  color: #333 !important;
  font-size: .85rem !important;
}
.quiz-option:hover {
  border-color: #6a5acd !important;
  background: #f0eef8 !important;
}
.quiz-option.is-correct {
  background: #d4edda !important;
  border-color: #28a745 !important;
  color: #155724 !important;
  font-weight: 600 !important;
}
.quiz-option.is-wrong {
  background: #f8d7da !important;
  border-color: #dc3545 !important;
  color: #721c24 !important;
}
</style>

<div class="quiz" data-quiz="capitulo-4">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué diferencia hay entre <code>let</code> y <code>const</code>?</p>
<button class="quiz-option" data-opt="a">A) let es para números, const para texto</button>
<button class="quiz-option" data-opt="b">B) const no se puede reasignar, let sí</button>
<button class="quiz-option" data-opt="c">C) No hay diferencia</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>2.</strong> ¿Qué método añade un elemento al final de un array?</p>
<button class="quiz-option" data-opt="a">A) append</button>
<button class="quiz-option" data-opt="b">B) add</button>
<button class="quiz-option" data-opt="c">C) push</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>3.</strong> ¿Qué método selecciona el primer elemento que coincida con un selector CSS?</p>
<button class="quiz-option" data-opt="a">A) querySelector</button>
<button class="quiz-option" data-opt="b">B) getElementById</button>
<button class="quiz-option" data-opt="c">C) querySelectorAll</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%204%3A%20JavaScript%20esencial&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F04-javascript%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F04-javascript%2F" target="_blank" rel="noopener">LinkedIn</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/04-javascript/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 5 — Diseño responsive](05-responsive.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
