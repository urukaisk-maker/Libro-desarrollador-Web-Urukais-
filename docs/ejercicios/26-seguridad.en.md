---
description: "Solved exercise 26: 26 — Security. Step-by-step annotated solution from the Web Developer Book."
---
# 26 — Security

!!! quote "Solved exercise"
    Identify and fix XSS vulnerabilities.

---

## 🎯 Goal

Given this vulnerable code, fix it:

```javascript
const input = document.getElementById('comentario').value;
document.getElementById('resultado').innerHTML = input;
```

---

## 💡 Solution

```javascript
const input = document.getElementById('comentario').value;

// Option 1: textContent (escapes HTML)
document.getElementById('resultado').textContent = input;

// Option 2: if you need HTML, sanitize with DOMPurify
// import DOMPurify from 'dompurify';
// document.getElementById('resultado').innerHTML = DOMPurify.sanitize(input);
```

---

## 🧠 Key concepts

- `innerHTML` with user data → XSS.
- `textContent` escapes HTML.
- DOMPurify for safe HTML.
- Validate and sanitize user input **always**.

---

## 🚀 Bonus challenges

- [ ] Add a Content Security Policy.
- [ ] Validate input on the server as well.
- [ ] Audit with OWASP ZAP.

---

[← Exercise 25](25-design-systems.md){ .md-button }
[Go to exercise 27 →](27-webassembly.md){ .md-button .md-button--primary }
