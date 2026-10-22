# 04 — JavaScript

!!! quote "Ejercicio resuelto"
    Practica variables, funciones y manipulación del DOM.

---

## 🎯 Objetivo

Crea un contador que:

1. Empiece en 0.
2. Se incremente al pulsar un botón.
3. Muestre el número en pantalla.

---

## 💡 Solución

\`\`\`html
<h1 id="numero">0</h1>
<button id="incrementar">+1</button>

<script>
  let contador = 0;
  const numero = document.getElementById('numero');
  const boton = document.getElementById('incrementar');

  boton.addEventListener('click', () => {
    contador++;
    numero.textContent = contador;
  });
</script>
\`\`\`

---

## 🧠 Conceptos clave

- \`let\`: variable reasignable.
- \`document.getElementById()\`: selecciona elemento por id.
- \`addEventListener('click', ...)\`: escucha el clic.
- \`textContent\`: cambia el texto del elemento.

---

## 🚀 Retos extra

- [ ] Añade un botón de reset.
- [ ] Añade un botón de -1.
- [ ] Guarda el contador en \`localStorage\` para que persista.

---

[← Ejercicio 03](03-css-basico.md){ .md-button }
[Ir al ejercicio 05 →](05-responsive.md){ .md-button .md-button--primary }
