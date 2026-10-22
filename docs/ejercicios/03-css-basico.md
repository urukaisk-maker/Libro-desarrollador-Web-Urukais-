# 03 — CSS básico

!!! quote "Ejercicio resuelto"
    Practica los selectores y el modelo de caja.

---

## 🎯 Objetivo

Crea una tarjeta con:

1. Un borde redondeado.
2. Una sombra.
3. Un fondo de color.
4. Texto centrado.

---

## 💡 Solución

\`\`\`html
<div class="tarjeta">
  <h2>Ana García</h2>
  <p>Desarrolladora frontend</p>
</div>
\`\`\`

\`\`\`css
body {
  font-family: system-ui, sans-serif;
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #f0f0f0;
}

.tarjeta {
  background: linear-gradient(135deg, #6a5acd, #00bcd4);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(106, 90, 205, 0.3);
  text-align: center;
  max-width: 300px;
}
\`\`\`

---

## 🧠 Conceptos clave

- \`border-radius\`: redondea las esquinas.
- \`box-shadow\`: añade sombra (\`x y blur color\`).
- \`linear-gradient\`: fondo con degradado.
- \`text-align: center\`: centra el texto.

---

## 🚀 Retos extra

- [ ] Añade una animación al hacer hover.
- [ ] Cambia el color según el tema del sistema con \`prefers-color-scheme\`.
- [ ] Convierte la tarjeta en un componente reutilizable.

---

[← Ejercicio 02](02-html-basico.md){ .md-button }
[Ir al ejercicio 04 →](04-javascript.md){ .md-button .md-button--primary }
