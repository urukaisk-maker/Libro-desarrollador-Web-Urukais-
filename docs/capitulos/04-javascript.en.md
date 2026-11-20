---
description: "Chapter 04 of the Web Developer's Book: 04 — Essential JavaScript. Learn step by step with examples, exercises, and quizzes."
---
# 04 — Essential JavaScript

!!! abstract "What you will learn"
    - What JavaScript is and how it runs.
    - Variables, types, and operators.
    - Functions and control flow.
    - DOM manipulation.
    - Events.

---

## ⚡ What is JavaScript?

**JavaScript** is the programming language that brings **behavior** to the web.

```javascript
console.log('Hello, world');
```

!!! tip "JavaScript is not Java"
    Even though their names sound similar, **JavaScript and Java are completely different languages**.

---

## 📦 Variables and Types

```javascript
const nombre = 'Ana';
let edad = 30;
const texto = 'hello';
const numero = 42;
const booleano = true;
```

| Type | Example |
| :--- | :--- |
| string | 'hello' |
| number | 42 |
| boolean | true |
| null | null |
| undefined | undefined |
| object | {} |
| function | function() {} |

---

## 🧮 Operators

```javascript
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
const tipo = edad >= 18 ? 'adult' : 'minor';
```

---

## 🔧 Functions

```javascript
function sumar(a, b) {
  return a + b;
}

const restar = function(a, b) {
  return a - b;
};

const multiplicar = (a, b) => a * b;

function saludar(nombre = 'world') {
  return 'Hello, ' + nombre;
}
```

---

## 🔁 Control Flow

```javascript
const edad = 20;
if (edad >= 18) {
  console.log('You are an adult');
} else {
  console.log('You are a minor');
}

for (let i = 0; i < 5; i++) {
  console.log(i);
}

[1, 2, 3].forEach(n => console.log(n));
```

---

## 🧰 Arrays

```javascript
const arr = [1, 2, 3, 4, 5];

arr.push(6);
arr.pop();
arr.length;

const dobles = arr.map(n => n * 2);
const pares = arr.filter(n => n % 2 === 0);
const suma = arr.reduce((acc, n) => acc + n, 0);

arr.find(n => n > 3);
arr.includes(3);
```

---

## 🏠 The DOM

```javascript
const titulo = document.querySelector('h1');
titulo.textContent = 'New heading';
titulo.classList.add('activo');

const parrafo = document.createElement('p');
parrafo.textContent = 'Hello';
document.body.appendChild(parrafo);

parrafo.remove();
```
---

## 🎯 Events

```javascript
const boton = document.querySelector('button');

boton.addEventListener('click', (event) => {
  console.log('Clicked', event.target);
});

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Form submitted');
});
```

| Event | When it fires |
| :--- | :--- |
| click | On click |
| submit | When submitting a form |
| input | While typing in an input |
| change | When the value changes |
| keydown | When pressing a key |
| scroll | When scrolling |
| DOMContentLoaded | When the DOM is ready |

---

## 🧠 Test Your Knowledge

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
<p><strong>1.</strong> What is the difference between <code>let</code> and <code>const</code>?</p>
<button class="quiz-option" data-opt="a">A) let is for numbers, const for text</button>
<button class="quiz-option" data-opt="b">B) const cannot be reassigned, let can</button>
<button class="quiz-option" data-opt="c">C) There is no difference</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>2.</strong> Which method adds an element to the end of an array?</p>
<button class="quiz-option" data-opt="a">A) append</button>
<button class="quiz-option" data-opt="b">B) add</button>
<button class="quiz-option" data-opt="c">C) push</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>3.</strong> Which method selects the first element matching a CSS selector?</p>
<button class="quiz-option" data-opt="a">A) querySelector</button>
<button class="quiz-option" data-opt="b">B) getElementById</button>
<button class="quiz-option" data-opt="c">C) querySelectorAll</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%204%3A%20Essential%20JavaScript&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F04-javascript%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F04-javascript%2F" target="_blank" rel="noopener">LinkedIn</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/04-javascript/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 5 — Diseño responsive](05-responsive.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }
