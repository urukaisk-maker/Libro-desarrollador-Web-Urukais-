# 💼 Preguntas de Entrevista Técnica

Una recopilación de las preguntas más comunes en entrevistas para desarrolladores web, con respuestas claras y directas.

## 🟢 HTML

??? question "¿Qué diferencia hay entre `<div>` y `<span>`?"
    `<div>` es un elemento de bloque, lo que significa que ocupa todo el ancho disponible y comienza en una nueva línea. `<span>` es un elemento en línea, lo que significa que solo ocupa el espacio necesario y no comienza en una nueva línea.

??? question "¿Qué es el HTML semántico y por qué es importante?"
    Es el uso de etiquetas HTML que describen el significado del contenido (como `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`) en lugar de usar solo `<div>` y `<span>`. Es importante para la accesibilidad, el SEO y la mantenibilidad del código.

??? question "¿Qué es el atributo `alt` en las imágenes?"
    Es un texto alternativo que se muestra si la imagen no puede cargarse. Es crucial para la accesibilidad, ya que los lectores de pantalla lo leen en voz alta para describir la imagen a personas con discapacidad visual.

## 🟡 CSS

??? question "¿Qué es el modelo de caja en CSS?"
    Es la forma en que CSS trata cada elemento como una caja rectangular compuesta por cuatro capas: contenido, padding (espacio interior), border (borde) y margin (espacio exterior).

??? question "¿Cuál es la diferencia entre `display: none` y `visibility: hidden`?"
    `display: none` elimina el elemento del flujo del documento, por lo que no ocupa espacio. `visibility: hidden` oculta el elemento pero sigue ocupando su espacio en el layout.

??? question "¿Qué son los media queries?"
    Son reglas CSS que permiten aplicar estilos condicionalmente según las características del dispositivo, como el ancho de la pantalla. Son la base del diseño responsive.

## 🟠 JavaScript

??? question "¿Cuál es la diferencia entre `let`, `const` y `var`?"
    `var` tiene alcance de función y se eleva (hoisting). `let` y `const` tienen alcance de bloque. `const` además no permite reasignar el valor.

??? question "¿Qué es el DOM?"
    El Document Object Model es una representación en forma de árbol del documento HTML. JavaScript puede manipularlo para cambiar dinámicamente el contenido y los estilos de la página.

??? question "¿Qué es una Promesa (Promise)?"
    Es un objeto que representa la eventual finalización (o fallo) de una operación asíncrona. Tiene tres estados: pendiente, resuelta y rechazada.

??? question "¿Qué es el `event loop` en JavaScript?"
    Es el mecanismo que permite a JavaScript, siendo un lenguaje de un solo hilo, manejar operaciones asíncronas. Se encarga de mover las tareas de la cola de eventos a la pila de llamadas cuando esta está vacía.

## 🟣 React

??? question "¿Qué es el estado (state) en React?"
    Es un objeto que contiene datos que pueden cambiar con el tiempo y que afectan al renderizado del componente. Se gestiona con `useState` en componentes funcionales.

??? question "¿Qué es el Virtual DOM?"
    Es una representación en memoria del DOM real. React lo usa para comparar el estado anterior y el nuevo (diffing) y aplicar solo los cambios necesarios al DOM real, mejorando el rendimiento.

??? question "¿Qué son los hooks?"
    Son funciones que permiten usar estado y otras características de React en componentes funcionales. Los más comunes son `useState`, `useEffect`, `useContext` y `useReducer`.

??? question "¿Qué diferencia hay entre `useEffect` y `useLayoutEffect`?"
    `useEffect` se ejecuta después de que el navegador haya pintado la pantalla. `useLayoutEffect` se ejecuta de forma síncrona después de que React actualice el DOM pero antes de que el navegador pinte, lo que es útil para medir el layout.

## 🔴 Node.js y Backend

??? question "¿Qué es Node.js?"
    Es un entorno de ejecución de JavaScript del lado del servidor, construido sobre el motor V8 de Chrome. Permite usar JavaScript para crear aplicaciones de backend.

??? question "¿Qué es Express.js?"
    Es un framework minimalista para Node.js que facilita la creación de servidores web y APIs REST. Proporciona utilidades para manejar rutas, middlewares y peticiones HTTP.

??? question "¿Qué es JWT?"
    JSON Web Token es un estándar abierto para transmitir información de forma segura entre partes como un objeto JSON. Se usa comúnmente para autenticación y autorización en APIs.

---

## 📌 ¿Quieres contribuir con más preguntas?

Si tienes una pregunta que te han hecho en una entrevista y quieres añadirla, abre un [issue](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues) o envía un Pull Request.