# 06 — Formularios

!!! quote "Ejercicio resuelto"
    Practica la creación de formularios accesibles.

---

## 🎯 Objetivo

Crea un formulario de registro con:

1. Campo de nombre.
2. Campo de email.
3. Campo de contraseña.
4. Checkbox de términos.
5. Botón de envío.

---

## 💡 Solución

\`\`\`html
<form action="/registro" method="POST">
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" name="nombre" required minlength="2">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>

  <label for="password">Contraseña:</label>
  <input type="password" id="password" name="password" required minlength="8">

  <label>
    <input type="checkbox" name="terminos" required>
    Acepto los términos
  </label>

  <button type="submit">Registrarse</button>
</form>
\`\`\`

---

## 🧠 Conceptos clave

- Cada input debe tener un \`<label>\` con \`for\` igual al \`id\` del input.
- \`required\`: obligatorio.
- \`minlength\`: longitud mínima.
- \`type="email"\`: valida formato de email.

---

## 🚀 Retos extra

- [ ] Añade un campo de teléfono con \`type="tel"\`.
- [ ] Añade un select de país.
- [ ] Valida la contraseña con JS en tiempo real.

---

[← Ejercicio 05](05-responsive.md){ .md-button }
[Ir al ejercicio 07 →](07-git.md){ .md-button .md-button--primary }
