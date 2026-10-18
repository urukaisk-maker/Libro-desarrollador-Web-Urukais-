# 📚 Proyectos Guiados

Aprende construyendo. Aquí tienes proyectos paso a paso que combinan todo lo aprendido en el libro.

## 📝 Proyecto 1: Lista de Tareas (To-Do List)

Vamos a crear una aplicación para añadir, tachar y eliminar tareas. Es el "Hola Mundo" de las aplicaciones web interactivas.

### Paso 1: El HTML (Estructura)

Crea un archivo `index.html` y pega esto:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Lista de Tareas</title>
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <div class="contenedor">
    <h1>Mis Tareas</h1>
    <form id="formulario">
      <input type="text" id="nueva-tarea" placeholder="Escribe una tarea..." required>
      <button type="submit">Añadir</button>
    </form>
    <ul id="lista-tareas"></ul>
  </div>
  <script src="app.js"></script>
</body>
</html>