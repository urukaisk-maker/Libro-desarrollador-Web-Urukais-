# Capítulo 6 — Formularios HTML

## ¿Qué es un formulario?

Un formulario permite al usuario **introducir datos** y enviarlos a un servidor o procesarlos con JavaScript.

## Estructura básica

```html
<form action="/enviar" method="post">
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" name="nombre" required>

  <button type="submit">Enviar</button>
</form>
```

## Tipos de input

| Tipo | Uso |
|---|---|
| `text` | Texto corto |
| `email` | Correo electrónico |
| `password` | Contraseña |
| `number` | Número |
| `date` | Fecha |
| `checkbox` | Casilla de verificación |
| `radio` | Opción única |
| `file` | Subir archivo |

## Validación

HTML5 trae validación nativa:

```html
<input type="email" required>
<input type="number" min="0" max="100">
<input type="text" pattern="[A-Za-z]{3,}" title="Mínimo 3 letras">
```

!!! warning "Nunca confíes solo en la validación del navegador"
    Siempre valida también en el servidor. La validación HTML5 es una ayuda para el usuario, no una medida de seguridad.

## Accesibilidad

- Cada `<input>` debe tener un `<label>` asociado con `for`/`id`.
- Usa `aria-*` cuando sea necesario.
- No dependas solo del color para comunicar información.

## Ejemplo práctico

Ver [ejemplos/06-formularios/ejemplo.html](../ejemplos/06-formularios/ejemplo.html).

## Ejercicios

1. Crea un formulario de contacto con nombre, email y mensaje.
2. Añade validación para que el email sea obligatorio.
3. Muestra en consola los datos al enviar.

---

⬅️ [Capítulo 5 — Responsive](05-responsive.md) | ➡️ Apéndices (próximamente)
---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz-container" data-correct="b">
  <p class="quiz-question">¿Qué etiqueta se usa para crear un campo de texto en un formulario?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) &lt;text&gt;</button>
    <button class="quiz-option" data-option="b">B) &lt;input type="text"&gt;</button>
    <button class="quiz-option" data-option="c">C) &lt;form&gt;</button>
  </div>
  <div class="quiz-feedback"></div>
</div>

<div class="quiz-container" data-correct="a">
  <p class="quiz-question">¿Para qué sirve el atributo <code>required</code> en un input?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) Para que el navegador no permita enviar el formulario si está vacío</button>
    <button class="quiz-option" data-option="b">B) Para cambiar el color del campo</button>
    <button class="quiz-option" data-option="c">C) Para hacer que el campo sea de solo lectura</button>
  </div>
  <div class="quiz-feedback"></div>
</div>