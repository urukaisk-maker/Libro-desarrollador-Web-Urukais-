# 04 — JavaScript esencial

!!! abstract "Qué vas a aprender"
    - Qué es JavaScript y cómo se ejecuta.
    - Variables, tipos y operadores.
    - Funciones y estructuras de control.
    - Manipulación del DOM.
    - Eventos.

---

## ⚡ ¿Qué es JavaScript?

**JavaScript** es el lenguaje de programación que da **comportamiento** a la web. Es el único lenguaje que entienden todos los navegadores, y hoy también se usa en el servidor (Node.js), en apps móviles (React Native) y en el escritorio (Electron).

\`\`\`javascript
console.log('Hola, mundo');
\`\`\`

!!! tip "JavaScript no es Java"
    Aunque se llamen parecido, **JavaScript y Java son lenguajes completamente distintos**. Es una confusión histórica que se arrastra desde los años 90.

---

## 📦 Variables y tipos

\`\`\`javascript
// Variables
const nombre = 'Ana';   // no se puede reasignar
let edad = 30;          // se puede reasignar

// Tipos primitivos
const texto = 'hola';        // string
const numero = 42;           // number
const booleano = true;       // boolean
const nulo = null;           // null
const indefinido = undefined; // undefined
\`\`\`

| Tipo | Ejemplo |
| :--- | :--- |
| string | 'hola', "mundo" |
| number | 42, 3.14 |
| boolean | true, false |
| null | null |
| undefined | undefined |
| object | {}, [], new Date() |
| function | function() {} |

---

## 🧮 Operadores

\`\`\`javascript
// Aritméticos
5 + 3;   // 8
5 - 3;   // 2
5 * 3;   // 15
5 / 3;   // 1.666…
5 % 3;   // 2 (módulo)
5 ** 3;  // 125 (potencia)

// Comparación
5 == '5';    // true (coerción)
5 === '5';   // false (estricta)

// Lógicos
true && false;   // false (AND)
true || false;   // true (OR)
!true;           // false (NOT)

// Ternario
const edad = 20;
const tipo = edad >= 18 ? 'adulto' : 'menor';
\`\`\`

!!! warning "Usa === siempre"
    == hace coerción de tipos, lo que puede dar resultados inesperados. === compara valor y tipo.

---

## 🔧 Funciones

\`\`\`javascript
// Declaración
function sumar(a, b) {
  return a + b;
}

// Expresión
const restar = function(a, b) {
  return a - b;
};

// Arrow function
const multiplicar = (a, b) => a * b;

// Parámetros por defecto
function saludar(nombre = 'mundo') {
  return 'Hola, ' + nombre;
}
\`\`\`

---

## 🔁 Estructuras de control

\`\`\`javascript
// if / else
const edad = 20;
if (edad >= 18) {
  console.log('Eres mayor de edad');
} else {
  console.log('Eres menor');
}

// for
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// forEach
[1, 2, 3].forEach(n => console.log(n));

// while
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
\`\`\`

---

## 🧰 Arrays

\`\`\`javascript
const arr = [1, 2, 3, 4, 5];

// Métodos básicos
arr.push(6);        // añade al final
arr.pop();          // quita el último
arr.length;         // longitud

// Iteración
arr.forEach(n => console.log(n));

// Transformación
const dobles = arr.map(n => n * 2);
const pares = arr.filter(n => n % 2 === 0);
const suma = arr.reduce((acc, n) => acc + n, 0);

// Búsqueda
arr.find(n => n > 3);
arr.includes(3);
\`\`\`

---

## 🏠 El DOM

El **DOM** (*Document Object Model*) es la representación en memoria del HTML. JavaScript puede leerlo y modificarlo.

\`\`\`javascript
// Seleccionar elementos
const titulo = document.querySelector('h1');
const botones = document.querySelectorAll('.boton');

// Modificar
titulo.textContent = 'Nuevo título';
titulo.innerHTML = '<strong>Nuevo</strong> título';
titulo.classList.add('activo');
titulo.style.color = 'red';

// Crear elementos
const parrafo = document.createElement('p');
parrafo.textContent = 'Hola';
document.body.appendChild(parrafo);

// Eliminar
parrafo.remove();
\`\`\`

!!! tip "textContent vs innerHTML"
    - textContent escribe **texto plano** (seguro).
    - innerHTML interpreta **HTML** (peligroso si viene del usuario).
    Siempre que puedas, usa textContent.

---

## 🎯 Eventos

\`\`\`javascript
const boton = document.querySelector('button');

boton.addEventListener('click', (event) => {
  console.log('Se hizo clic', event.target);
});

// Formulario
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault(); // evita el envío
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

<div class="quiz" data-quiz="capitulo-4">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué diferencia hay entre let y const?</p>
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
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%204%3A%20JavaScript%20esencial%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F04-javascript%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/04-javascript/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 5 — Diseño responsive](05-responsive.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
