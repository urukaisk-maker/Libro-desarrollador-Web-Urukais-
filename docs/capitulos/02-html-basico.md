# Capítulo 2 — HTML básico

## ¿Qué es HTML?

HTML (*HyperText Markup Language*) es el lenguaje de marcado que define la **estructura** del contenido de una página web. No es un lenguaje de programación, sino una forma de describir qué es cada cosa: un título, un párrafo, una imagen, un enlace…

## Estructura mínima de un documento HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi primera página</title>
</head>
<body>
  <h1>Hola, mundo</h1>
  <p>Esta es mi primera página web.</p>
  ---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz-container" data-correct="b">
  <p class="quiz-question">¿Qué significa la sigla HTML?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) High Tech Modern Language</button>
    <button class="quiz-option" data-option="b">B) HyperText Markup Language</button>
    <button class="quiz-option" data-option="c">C) Home Tool Markup Language</button>
  </div>
  <div class="quiz-feedback"></div>
</div>
### 🎮 Editor en Vivo

Prueba tus conocimientos de HTML editando el código de la izquierda y viendo el resultado a la derecha (o abajo).

<div class="live-sandbox-wrapper">
  <p>💡 Edita el texto y pulsa el botón para ver los cambios.</p>
  <iframe 
    class="live-sandbox" 
    srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 2rem; text-align: center; background: #f8fafc; }
          h1 { color: #6a5acd; }
        </style>
      </head>
      <body>
        <h1>¡Hola, mundo!</h1>
        <p>Este es mi primer código HTML interactivo.</p>
        <button onclick="alert('"'"'¡Funciona! 🎉'"'"')">Haz clic aquí</button>
      </body>
      </html>
    '>
  </iframe>
</div>
<div class="quiz-container" data-correct="c">
  <p class="quiz-question">¿Cuál es la etiqueta correcta para crear un enlace?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) &lt;link&gt;</button>
    <button class="quiz-option" data-option="b">B) &lt;href&gt;</button>
    <button class="quiz-option" data-option="c">C) &lt;a&gt;</button>
  </div>
  <div class="quiz-feedback"></div>
</div>
</body>
</html>
