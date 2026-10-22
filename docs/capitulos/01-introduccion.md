# 01 — Introducción al desarrollo web

!!! abstract "Qué vas a aprender"
    - Qué es el desarrollo web y por qué importa.
    - Los tres pilares: **HTML**, **CSS** y **JavaScript**.
    - La diferencia entre **frontend** y **backend**.
    - Cómo funciona una página web desde que la pides hasta que la ves.

---

## 🌐 ¿Qué es el desarrollo web?

El **desarrollo web** es el proceso de crear sitios y aplicaciones que se ejecutan en un navegador. Es una de las disciplinas más demandadas del sector tecnológico y una de las más accesibles: solo necesitas un ordenador, un editor de código y conexión a internet.

!!! quote "La web es el mayor escaparate del mundo"
    Cada vez que abres una página, un equipo de desarrolladores ha diseñado su estructura, su estilo y su comportamiento. Aprender desarrollo web es aprender a **construir ese escaparate**.

---

## 🏛️ Los tres pilares fundamentales

Toda página web moderna se apoya en tres tecnologías:

| Pilar | Qué hace | Analogía |
| :--- | :--- | :--- |
| **HTML** | Define la **estructura** y el contenido | Los huesos |
| **CSS** | Define la **presentación** y el estilo | La piel y la ropa |
| **JavaScript** | Define el **comportamiento** y la interactividad | Los músculos y el cerebro |

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi primera página</title>
  <style>
    /* CSS: estilos */
    body { font-family: sans-serif; background: #f5f5f5; }
    h1   { color: #6a5acd; }
  </style>
</head>
<body>
  <!-- HTML: estructura -->
  <h1>Hola, mundo 🌍</h1>
  <button id="saludo">Haz clic</button>

  <script>
    // JavaScript: comportamiento
    document.getElementById('saludo').addEventListener('click', () => {
      alert('¡Bienvenido al desarrollo web!');
    });
  </script>
</body>
</html>