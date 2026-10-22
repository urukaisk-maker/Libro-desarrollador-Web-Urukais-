# 26 — Seguridad

!!! quote "Ejercicio resuelto"
    Identifica y corrige vulnerabilidades XSS.

---

## 🎯 Objetivo

Dado este código vulnerable, corrígelo:

\`\`\`javascript
const input = document.getElementById('comentario').value;
document.getElementById('resultado').innerHTML = input;
\`\`\`

---

## 💡 Solución

\`\`\`javascript
const input = document.getElementById('comentario').value;

// Opción 1: textContent (escapa HTML)
document.getElementById('resultado').textContent = input;

// Opción 2: si necesitas HTML, sanitiza con DOMPurify
// import DOMPurify from 'dompurify';
// document.getElementById('resultado').innerHTML = DOMPurify.sanitize(input);
\`\`\`

---

## 🧠 Conceptos clave

- \`innerHTML\` con datos del usuario → XSS.
- \`textContent\` escapa el HTML.
- DOMPurify para HTML seguro.
- Valida y sanitiza **siempre** la entrada del usuario.

---

## 🚀 Retos extra

- [ ] Añade una Content Security Policy.
- [ ] Valida el input en el servidor también.
- [ ] Audita con OWASP ZAP.

---

[← Ejercicio 25](25-design-systems.md){ .md-button }
[Ir al ejercicio 27 →](27-webassembly.md){ .md-button .md-button--primary }
