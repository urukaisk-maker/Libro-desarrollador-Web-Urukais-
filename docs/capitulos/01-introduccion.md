# 01 — Introducción al desarrollo web

!!! abstract "Qué vas a aprender"
    - Qué es el desarrollo web y por qué importa.
    - Los tres pilares: **HTML**, **CSS** y **JavaScript**.
    - La diferencia entre **frontend** y **backend**.
    - Cómo funciona una página web desde que la pides hasta que la ves.
    - Las herramientas que necesitas para empezar.

---

## 🌐 ¿Qué es el desarrollo web?

El **desarrollo web** es el proceso de crear sitios y aplicaciones que se ejecutan en un navegador. Es una de las disciplinas más demandadas del sector tecnológico y una de las más accesibles: solo necesitas un ordenador, un editor de código y conexión a internet.

!!! quote "La web es el mayor escaparate del mundo"
    Cada vez que abres una página, un equipo de desarrolladores ha diseñado su estructura, su estilo y su comportamiento. Aprender desarrollo web es aprender a **construir ese escaparate**.

---

## 🏛 Los tres pilares fundamentales

Toda página web moderna se apoya en tres tecnologías:

| Pilar | Qué hace | Analogía |
| :--- | :--- | :--- |
| **HTML** | Define la **estructura** y el contenido | El esqueleto |
| **CSS** | Define la **apariencia** (colores, tipografía, layout) | La piel y la ropa |
| **JavaScript** | Define el **comportamiento** (interacción, lógica) | Los músculos |

~~~mermaid
graph LR
    A[Tu código] --> B[HTML]
    A --> C[CSS]
    A --> D[JavaScript]
    B --> E[Navegador]
    C --> E
    D --> E
    E --> F[Página web]
~~~

!!! tip "Aprende en este orden"
    Primero HTML (estructura), luego CSS (apariencia), luego JavaScript (comportamiento). Saltarse el orden es la causa nº1 de frustración al empezar.

---

## ⚖️ Frontend vs Backend

| | **Frontend** | **Backend** |
| :--- | :--- | :--- |
| Dónde se ejecuta | En el **navegador** del usuario | En el **servidor** |
| Tecnologías | HTML, CSS, JavaScript | Node.js, Python, PHP, Java, Go… |
| Qué gestiona | Lo que **ves** y **tocas** | Datos, lógica, seguridad, base de datos |
| Ejemplo | Un botón que cambia de color | Guardar tu contraseña en la base de datos |

**Full-stack** = sabe hacer las dos cosas.

---

## 🔄 Cómo funciona una página web

Cuando escribes `https://libro.urukais.com` en el navegador, ocurre esto:

~~~mermaid
sequenceDiagram
    participant U as Usuario
    participant N as Navegador
    participant D as DNS
    participant S as Servidor
    U->>N: Escribe la URL
    N->>D: ¿Qué IP tiene libro.urukais.com?
    D->>N: 185.x.x.x
    N->>S: GET /
    S->>N: HTML, CSS, JS
    N->>U: Muestra la página
~~~

1. **DNS**: traduce el dominio a una dirección IP.
2. **Petición HTTP**: el navegador pide los archivos al servidor.
3. **Respuesta**: el servidor devuelve HTML, CSS y JS.
4. **Renderizado**: el navegador interpreta esos archivos y pinta la página.

!!! warning "El navegador no ejecuta todo igual"
    HTML y CSS se interpretan (no son lenguajes de programación). JavaScript sí se **ejecuta** (tiene lógica: variables, bucles, condiciones).

---

## 🧰 Herramientas que necesitas

| Herramienta | Para qué | Recomendación |
| :--- | :--- | :--- |
| **Editor de código** | Escribir el código | VS Code |
| **Navegador moderno** | Probar y depurar | Chrome / Firefox |
| **Git** | Control de versiones | Git + GitHub |
| **Terminal** | Ejecutar comandos | La de tu sistema |

!!! tip "No necesitas 20 herramientas"
    Con VS Code y un navegador puedes empezar. Todo lo demás se añade cuando lo necesites.

---

## 👋 Tu primer "Hola, mundo"

Crea un archivo llamado `index.html` con este contenido:

~~~html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi primera página</title>
</head>
<body>
    <h1>¡Hola, mundo!</h1>
    <p>Esta es mi primera página web.</p>
</body>
</html>
~~~

Ábrelo con doble clic. Verás tu primera página en el navegador. **Ya eres desarrollador web.** 😄

---

## 🧪 Ejercicio práctico

!!! example "Preséntate en HTML"
    Crea un archivo `presentacion.html` con:

    - Un `<h1>` con tu nombre.
    - Un `<p>` con una frase sobre ti.
    - Un `<h2>` con "Mis objetivos".
    - Una lista `<ul>` con 3 cosas que quieres aprender.

    Ábrelo en el navegador y comprueba que se ve bien.

??? success "Solución"
    ~~~html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Mi presentación</title>
    </head>
    <body>
        <h1>Urukais</h1>
        <p>Soy desarrollador web y me encanta enseñar.</p>
        <h2>Mis objetivos</h2>
        <ul>
            <li>Dominar HTML y CSS</li>
            <li>Aprender JavaScript a fondo</li>
            <li>Construir mi propio portfolio</li>
        </ul>
    </body>
    </html>
    ~~~

---

## 🧠 Quiz

!!! question "Comprueba lo aprendido"

??? success "1. ¿Cuáles son los tres pilares del desarrollo web?"
    HTML (estructura), CSS (apariencia) y JavaScript (comportamiento).

??? success "2. ¿Qué diferencia hay entre frontend y backend?"
    El frontend se ejecuta en el navegador (lo que ve el usuario); el backend se ejecuta en el servidor (datos, lógica, seguridad).

??? success "3. ¿HTML es un lenguaje de programación?"
    No. Es un **lenguaje de marcado**. No tiene variables, bucles ni condiciones. JavaScript sí es un lenguaje de programación.

??? success "4. ¿Qué hace el DNS cuando escribes una URL?"
    Traduce el nombre del dominio a la dirección IP del servidor donde está alojada la página.

---

## 📚 Recursos

- [MDN — Aprender desarrollo web](https://developer.mozilla.org/es/docs/Learn)
- [MDN — Primeros pasos en la web](https://developer.mozilla.org/es/docs/Learn/Getting_started_with_the_web)
- [roadmap.sh — Frontend Developer Roadmap](https://roadmap.sh/frontend)

---

➡️ Siguiente capítulo: [02 — HTML básico](02-html-basico.md)



---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-1">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Cuáles son los tres pilares del desarrollo web?</p>
<button class="quiz-option" data-opt="a">A) HTML, Python, SQL</button>
<button class="quiz-option" data-opt="b">B) HTML, CSS, JavaScript</button>
<button class="quiz-option" data-opt="c">C) React, Vue, Angular</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>2.</strong> ¿Dónde se ejecuta el frontend?</p>
<button class="quiz-option" data-opt="a">A) En el servidor</button>
<button class="quiz-option" data-opt="b">B) En la base de datos</button>
<button class="quiz-option" data-opt="c">C) En el navegador</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>3.</strong> ¿Qué hace el DNS?</p>
<button class="quiz-option" data-opt="a">A) Traduce dominio a IP</button>
<button class="quiz-option" data-opt="b">B) Guarda la base de datos</button>
<button class="quiz-option" data-opt="c">C) Pinta la página</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%201%3A%20Introducci%C3%B3n&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F01-introduccion%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F01-introduccion%2F" target="_blank" rel="noopener">LinkedIn</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/01-introduccion/" aria-label="Copiar enlace">Copiar enlace</button>
</div>
