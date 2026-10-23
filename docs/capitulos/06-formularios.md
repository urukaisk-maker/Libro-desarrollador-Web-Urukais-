# 06 — Formularios HTML

!!! abstract "Qué vas a aprender"
    - Las etiquetas y atributos esenciales de formularios.
    - Los tipos de input más usados.
    - Validación nativa del navegador.
    - Accesibilidad en formularios.
    - Buenas prácticas.

---

## 📝 ¿Qué es un formulario?

Un **formulario** es la forma principal de recoger datos del usuario. Puede ser un login, un buscador, un checkout, un formulario de contacto, una encuesta… Todos usan las mismas etiquetas.

```html
<form action="/enviar" method="POST">
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" name="nombre" required>
  <button type="submit">Enviar</button>
</form>
```

---

## 🏷️ Etiquetas básicas

| Etiqueta | Uso |
| :--- | :--- |
| \`<form>\` | Contenedor del formulario |
| \`<input>\` | Campo de entrada |
| \`<label>\` | Etiqueta asociada a un campo |
| \`<textarea>\` | Texto largo (multilínea) |
| \`<select>\` | Desplegable |
| \`<option>\` | Opción dentro de un select |
| \`<button>\` | Botón (submit o reset) |
| \`<fieldset>\` | Agrupa campos relacionados |
| \`<legend>\` | Título del fieldset |

---

## 🔤 Tipos de input

```html
<input type="text">        <!-- texto libre -->
<input type="email">       <!-- email (valida formato) -->
<input type="password">    <!-- contraseña -->
<input type="number">      <!-- número -->
<input type="tel">         <!-- teléfono -->
<input type="url">         <!-- URL -->
<input type="date">        <!-- fecha -->
<input type="time">        <!-- hora -->
<input type="datetime-local"> <!-- fecha y hora -->
<input type="color">       <!-- selector de color -->
<input type="range">       <!-- deslizador -->
<input type="file">        <!-- subida de archivos -->
<input type="checkbox">    <!-- casilla -->
<input type="radio">       <!-- opción única -->
<input type="hidden">      <!-- campo oculto -->
<input type="search">      <!-- búsqueda -->
```

!!! tip "Usa el tipo correcto"
    Los móviles cambian el teclado según el tipo de input: \`email\` muestra la @, \`tel\` muestra el teclado numérico, \`date\` muestra el selector de fecha. Es una mejora gratuita de UX.

---

## 🏷️ Label y accesibilidad

```html
<!-- Correcto: label asociado por for/id -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">

<!-- Correcto: label envolviendo el input -->
<label>
  Email:
  <input type="email" name="email">
</label>

<!-- Incorrecto: sin label -->
<input type="email" placeholder="Email">
```

!!! warning "El placeholder NO sustituye al label"
    El placeholder desaparece al escribir y no es leído por todos los lectores de pantalla. Siempre usa un \`<label>\` visible.

---

## ✅ Validación nativa

HTML5 incluye validación sin JavaScript:

```html
<input type="email" required>                     <!-- obligatorio -->
<input type="text" minlength="3" maxlength="20"> <!-- longitud -->
<input type="number" min="1" max="100">         <!-- rango -->
<input type="text" pattern="[A-Za-z]+">          <!-- regex -->
<input type="url">                                <!-- URL válida -->
```

Cuando el usuario envía el formulario, el navegador valida y muestra un mensaje si algo falla.

!!! tip "Personalizar mensajes"
    Puedes cambiar los mensajes con JavaScript usando la **Constraint Validation API**:

    ```javascript
    input.setCustomValidity('Este campo no es válido');
    ```

---

## 📋 Ejemplo completo

```html
<form action="/registro" method="POST">
  <fieldset>
    <legend>Datos personales</legend>

    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" required minlength="2">

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <label for="password">Contraseña:</label>
    <input type="password" id="password" name="password" required minlength="8">
  </fieldset>

  <fieldset>
    <legend>Preferencias</legend>

    <label>
      <input type="checkbox" name="newsletter" checked>
      Recibir newsletter
    </label>

    <p>Plan:</p>
    <label><input type="radio" name="plan" value="free" checked> Gratis</label>
    <label><input type="radio" name="plan" value="pro"> Pro</label>

    <label for="pais">País:</label>
    <select id="pais" name="pais">
      <option value="es">España</option>
      <option value="mx">México</option>
      <option value="ar">Argentina</option>
    </select>
  </fieldset>

  <button type="submit">Registrarse</button>
  <button type="reset">Limpiar</button>
</form>
```

---

## 🎯 Buenas prácticas

- ✅ **Siempre** asocia cada input con un \`<label>\`.
- ✅ Usa el **tipo correcto** de input (\`email\`, \`tel\`, \`date\`…).
- ✅ Añade **validación nativa** (\`required\`, \`minlength\`, \`pattern\`).
- ✅ Agrupa campos relacionados con \`<fieldset>\` y \`<legend>\`.
- ✅ Da feedback claro cuando algo falla.
- ❌ **No** uses el placeholder como sustituto del label.
- ❌ **No** bloquees el pegado en el campo de contraseña (mala UX).
- ❌ **No** uses \`autocomplete="off"\` sin razón.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-6">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Cómo se asocia un label con un input?</p>
<button class="quiz-option" data-opt="a">A) Con el atributo name</button>
<button class="quiz-option" data-opt="b">B) Con el atributo for del label y el id del input</button>
<button class="quiz-option" data-opt="c">C) No se pueden asociar</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué tipo de input valida automáticamente un email?</p>
<button class="quiz-option" data-opt="a">A) type="email"</button>
<button class="quiz-option" data-opt="b">B) type="text"</button>
<button class="quiz-option" data-opt="c">C) type="mail"</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué atributo hace que un campo sea obligatorio?</p>
<button class="quiz-option" data-opt="a">A) mandatory</button>
<button class="quiz-option" data-opt="b">B) force</button>
<button class="quiz-option" data-opt="c">C) required</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%206%3A%20Formularios%20HTML&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F06-formularios%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F06-formularios%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%206%3A%20Formularios%20HTML%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F06-formularios%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/06-formularios/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 7 — Git y control de versiones](07-git.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
