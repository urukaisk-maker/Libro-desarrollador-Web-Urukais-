# Capítulo 1 — Introducción al desarrollo web

## ¿Qué es el desarrollo web?

El desarrollo web es el proceso de crear sitios y aplicaciones que se ejecutan en el navegador. Combina tres pilares fundamentales:

- **HTML** — la estructura del contenido.
- **CSS** — la presentación visual.
- **JavaScript** — el comportamiento y la interactividad.

Juntas, estas tres tecnologías permiten construir desde una simple página informativa hasta aplicaciones complejas como redes sociales, tiendas online o editores de texto en la nube.

## Frontend vs Backend

El desarrollo web se divide tradicionalmente en dos grandes áreas:

| Aspecto | Frontend | Backend |
|---|---|---|
| Se ejecuta en | Navegador | Servidor |
| Lenguajes | HTML, CSS, JS | Node, Python, PHP, Go… |
| Responsabilidad | Interfaz de usuario | Lógica, datos, seguridad |
| Frameworks populares | React, Vue, Svelte | Express, Django, Laravel |
| Se comunica con | El usuario | Bases de datos y APIs |

Existe también el rol **full-stack**, que cubre ambas partes.

## ¿Qué hace un desarrollador web?

Dependiendo del perfil, un desarrollador web puede:

- Diseñar y maquetar interfaces accesibles y responsive.
- Programar la lógica del cliente (formularios, animaciones, estados).
- Consumir APIs y mostrar datos dinámicos.
- Optimizar el rendimiento y la accesibilidad.
- Desplegar y mantener la aplicación en producción.

## Herramientas básicas

Para empezar necesitas muy poco:

1. **Un navegador moderno** — Firefox, Chrome, Edge o Safari.
2. **Un editor de código** — [Visual Studio Code](https://code.visualstudio.com/) es el estándar.
3. **Un servidor local simple** — la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) es suficiente.
4. **Git** — para llevar el control de versiones.

## Tu primer "Hola, mundo"

Crea un archivo llamado `index.html` con este contenido:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Hola, mundo</title>
</head>
<body>
  <h1>Hola, mundo</h1>
  <p>Mi primera página web.</p>
</body>
</html>
```

Ábrelo en el navegador y verás tu primera página.

## Ejemplo práctico

Ver [ejemplos/hola-mundo.html](../ejemplos/hola-mundo.html).

## Ejercicios

1. Crea tu primer archivo HTML con un título y un párrafo.
2. Ábrelo en el navegador y comprueba que se ve bien.
3. Modifica el color de fondo con CSS en línea.
4. Añade un enlace a tu web favorita.

---

⬅️ [Introducción](../introduccion.md) | ➡️ [Capítulo 2 — HTML básico](02-html-basico.md)cat docs/capitulos/01-introduccion.md | head -20
git add docs/capitulos/01-introduccion.md
git commit -m "fix: completar capítulo 1"
git push
