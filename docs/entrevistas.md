cd ~/Libro-desarrollador-Web-Urukais-
python3 -c "
contenido = '''# 💼 Preguntas de Entrevista

!!! quote \"Prepárate para tu próxima oportunidad\"
    Una colección de las preguntas más comunes en entrevistas técnicas para desarrolladores frontend, con respuestas detalladas y ejemplos de código. Organizadas por nivel para que puedas practicar según tu experiencia.

---

## 🎯 Cómo usar esta página

1. **Lee la pregunta** e intenta responderla tú mismo antes de ver la respuesta.
2. **Haz clic en la pregunta** para ver la respuesta detallada.
3. **Practica el código** de los ejemplos en tu editor.
4. **No memorices**: entiende el concepto.

!!! tip \"Consejo para entrevistas\"
    En una entrevista técnica no solo importa la respuesta correcta, sino **cómo piensas**. Si no sabes algo, dilo y explica cómo lo buscarías. La honestidad vale más que fingir.

---

## 🟢 Nivel Principiante

??? question \"¿Qué diferencia hay entre let, const y var?\"
    **var**: Tiene alcance de función y se eleva (hoisting). Se puede redeclarar. Evítalo en código moderno.

    **let**: Tiene alcance de bloque. No se puede redeclarar, pero sí reasignar.

    **const**: Tiene alcance de bloque. No se puede redeclarar ni reasignar. Requiere inicialización.

    \`\`\`javascript
    var x = 1;
    let y = 2;
    const z = 3;
    \`\`\`

??? question \"¿Qué es el DOM y para qué sirve?\"
    El **DOM** (*Document Object Model*) es una representación en forma de árbol del documento HTML que el navegador construye en memoria. Permite a JavaScript acceder y manipular los elementos de la página.

    \`\`\`javascript
    const titulo = document.querySelector('h1');
    titulo.textContent = 'Nuevo título';
    \`\`\`

??? question \"¿Qué es un evento y cómo se maneja en JavaScript?\"
    Un **evento** es una acción que ocurre en el navegador: un clic, una tecla, el envío de un formulario, el scroll, la carga de la página… JavaScript puede **escuchar** esos eventos y ejecutar código cuando ocurren.

    \`\`\`javascript
    const boton = document.querySelector('button');
    boton.addEventListener('click', (event) => {
      console.log('Se hizo clic', event.target);
    });
    \`\`\`

??? question \"¿Qué diferencia hay entre == y ===?\"
    - **==** compara solo el valor después de una coerción de tipos.
    - **===** compara valor y tipo (igualdad estricta).

    \`\`\`javascript
    5 == '5';   // true
    5 === '5';  // false
    null == undefined;   // true
    null === undefined;  // false
    \`\`\`

    **Siempre usa ===** salvo que tengas una razón muy justificada para lo contrario.

??? question \"¿Qué es el hoisting?\"
    Es el comportamiento de JavaScript que **eleva las declaraciones de variables y funciones al inicio de su scope**. Las funciones declaradas se pueden usar antes de su definición; las variables var se elevan pero su valor es undefined hasta la asignación.

    \`\`\`javascript
    console.log(nombre); // undefined (no error)
    var nombre = 'Ana';

    saludar(); // 'Hola' (funciona)
    function saludar() { console.log('Hola'); }
    \`\`\`

??? question \"¿Qué es un closure y para qué sirve?\"
    Un **closure** es una función que \"recuerda\" el entorno en el que fue creada, incluso después de que ese entorno haya dejado de existir. Se usa para encapsular estado privado.

    \`\`\`javascript
    function crearContador() {
      let contador = 0;
      return function () {
        contador++;
        return contador;
      };
    }

    const contador = crearContador();
    console.log(contador()); // 1
    console.log(contador()); // 2
    console.log(contador()); // 3
    \`\`\`

---

## 🟡 Nivel Intermedio

??? question \"¿Qué es el event loop en JavaScript?\"
    El **event loop** es el mecanismo que permite a JavaScript (que es de un solo hilo) gestionar operaciones asíncronas. Funciona con:

    1. **Call stack**: pila de llamadas síncronas.
    2. **Task queue**: cola de tareas (macrotareas) como setTimeout.
    3. **Microtask queue**: cola de microtareas como promesas.

    El event loop vacía la pila, luego las microtareas, luego las macrotareas, una por una.

    \`\`\`javascript
    console.log('1');
    setTimeout(() => console.log('2'), 0);
    Promise.resolve().then(() => console.log('3'));
    console.log('4');
    // Salida: 1, 4, 3, 2
    \`\`\`

??? question \"¿Qué diferencia hay entre una promesa y async/await?\"
    **Ambas son la misma cosa por debajo**: async/await es azúcar sintáctico sobre promesas. La diferencia es de estilo:

    \`\`\`javascript
    // Con promesas
    fetch('/api/user')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));

    // Con async/await
    async function cargar() {
      try {
        const res = await fetch('/api/user');
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
    \`\`\`

    async/await es más legible, especialmente cuando hay varias operaciones encadenadas.

??? question \"¿Qué es la delegación de eventos y por qué es útil?\"
    Es una técnica que consiste en **añadir un único event listener a un elemento padre** en lugar de añadirlo a cada uno de los hijos. Se basa en el bubbling de los eventos.

    \`\`\`javascript
    document.querySelector('ul').addEventListener('click', (e) => {
      if (e.target.matches('li')) {
        console.log('Click en li:', e.target.textContent);
      }
    });
    \`\`\`

    **Ventajas**: menos listeners (mejor rendimiento), funciona con elementos añadidos dinámicamente, código más limpio.

??? question \"¿Qué diferencia hay entre localStorage, sessionStorage y cookies?\"
    | Característica | localStorage | sessionStorage | Cookies |
    | :--- | :--- | :--- | :--- |
    | **Persistencia** | Permanente | Solo la sesión | Configurable |
    | **Capacidad** | ~5 MB | ~5 MB | ~4 KB |
    | **Enviado al servidor** | No | No | Sí (con cada petición) |
    | **Accesible desde JS** | Sí | Sí | Sí (salvo HttpOnly) |
    | **Usos típicos** | Preferencias, logros | Formularios temporales | Autenticación, tracking |

    \`\`\`javascript
    localStorage.setItem('tema', 'oscuro');
    sessionStorage.setItem('carrito', JSON.stringify(items));
    document.cookie = 'usuario=ana; max-age=3600; path=/';
    \`\`\`

??? question \"¿Qué es la propagación de eventos (bubbling y capturing)?\"
    Cuando ocurre un evento en un elemento, se propaga en tres fases:

    1. **Capturing**: del documento raíz hacia el elemento objetivo.
    2. **Target**: el evento llega al elemento objetivo.
    3. **Bubbling**: del elemento objetivo hacia la raíz.

    \`\`\`javascript
    // Bubbling (por defecto)
    hijo.addEventListener('click', () => console.log('hijo'));
    padre.addEventListener('click', () => console.log('padre'));
    // Click en hijo → 'hijo', 'padre'

    // Capturing
    padre.addEventListener('click', () => console.log('padre'), true);
    // Click en hijo → 'padre', 'hijo'
    \`\`\`

??? question \"¿Cómo funciona this en JavaScript?\"
    this depende de **cómo se llama la función**, no de dónde se define. Hay 4 reglas principales:

    \`\`\`javascript
    // 1. Método de objeto → el objeto
    const obj = { nombre: 'Ana', saludar() { console.log(this.nombre); } };
    obj.saludar(); // 'Ana'

    // 2. Función normal → window (o undefined en strict mode)
    function global() { console.log(this); }
    global(); // window / undefined

    // 3. Arrow function → this del contexto donde se define
    const obj2 = {
      nombre: 'Ana',
      saludar: () => console.log(this.nombre)
    };

    // 4. call/apply/bind → el objeto que se pasa
    function saludar() { console.log(this.nombre); }
    saludar.call({ nombre: 'Luis' }); // 'Luis'
    \`\`\`

??? question \"¿Qué es el patrón módulo?\"
    Es un patrón para encapsular código y exponer solo lo que necesitas, usando closures o módulos ES6.

    \`\`\`javascript
    // Con closure
    const contador = (() => {
      let valor = 0;
      return {
        incrementar: () => ++valor,
        obtener: () => valor,
      };
    })();

    contador.incrementar();
    console.log(contador.obtener()); // 1

    // Con módulos ES6
    export const PI = 3.14;
    export function sumar(a, b) { return a + b; }
    \`\`\`

---

## 🟠 Nivel Avanzado

??? question \"¿Qué es el Virtual DOM?\"
    Es una **representación en memoria del DOM real**, que usan frameworks como React para minimizar las manipulaciones del DOM (que son lentas). Cuando cambia el estado, se crea un nuevo Virtual DOM, se compara con el anterior (diffing) y se aplican solo los cambios necesarios al DOM real.

??? question \"¿Qué es un debounce y un throttle?\"
    **Debounce**: retrasa la ejecución de una función hasta que pase un tiempo sin que ocurra el evento. Útil en inputs de búsqueda.

    \`\`\`javascript
    function debounce(fn, ms = 300) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
      };
    }
    \`\`\`

    **Throttle**: ejecuta la función como máximo una vez cada X ms. Útil en scroll o resize.

    \`\`\`javascript
    function throttle(fn, ms = 200) {
      let last = 0;
      return (...args) => {
        const now = Date.now();
        if (now - last >= ms) { last = now; fn(...args); }
      };
    }
    \`\`\`

??? question \"¿Qué es el renderizado condicional en React?\"
    Es mostrar u ocultar partes de la interfaz según el estado o las props.

    \`\`\`jsx
    function Saludo({ usuario }) {
      return usuario ? <p>Hola, {usuario.nombre}</p> : <p>Hola, visitante</p>;
    }
    \`\`\`

??? question \"¿Qué es el Context API de React?\"
    Es una forma de **pasar datos a través del árbol de componentes sin tener que pasar props manualmente en cada nivel**.

    \`\`\`jsx
    const TemaContext = React.createContext('claro');
    \`\`\`

??? question \"¿Qué son los hooks y cuáles son los más usados?\"
    Los **hooks** son funciones de React que permiten usar estado y otras características en componentes funcionales.

    | Hook | Uso |
    | :--- | :--- |
    | useState | Estado local |
    | useEffect | Efectos secundarios |
    | useContext | Consumir un contexto |
    | useRef | Referencia mutable |
    | useMemo | Memorizar valores |
    | useCallback | Memorizar funciones |

??? question \"¿Qué es la optimización de rendimiento en frontend?\"
    Mejorar la velocidad y fluidez de la web. Técnicas: lazy loading, code splitting, memoización, virtualización, imágenes modernas (WebP/AVIF), cacheo, service workers.

??? question \"¿Qué es la accesibilidad web?\"
    Diseñar webs que **cualquier persona pueda usar**. Buenas prácticas: HTML semántico, alt descriptivo, contraste WCAG AA, navegación por teclado, aria-label, focus visible.

---

## 🔴 Nivel Profesional

??? question \"¿Qué es el Server-Side Rendering (SSR)?\"
    **SSR** es renderizar el HTML en el servidor antes de enviarlo al navegador. Ventajas: mejor SEO y primer renderizado más rápido. Desventajas: más carga en el servidor y más complejidad.

??? question \"¿Qué es un micro-frontend?\"
    Arquitectura que divide un frontend grande en **aplicaciones más pequeñas e independientes**, que se pueden desarrollar y desplegar por separado.

??? question \"¿Qué es la hidratación en SSR?\"
    Proceso por el cual el HTML renderizado en el servidor se \"activa\" en el navegador, añadiéndole los event listeners y el estado.

??? question \"¿Cómo funciona la caché HTTP?\"
    | Cabecera | Uso |
    | :--- | :--- |
    | Cache-Control | Directivas de cacheo |
    | ETag | Identificador de versión |
    | Last-Modified | Última modificación |

    Estrategias: assets con hash → max-age largo; HTML → no-cache; API → private, max-age corto.

??? question \"¿Qué es CORS y por qué da errores?\"
    **CORS** es un mecanismo de seguridad que permite o bloquea peticiones entre dominios. El servidor debe incluir Access-Control-Allow-Origin.

    \`\`\`http
    Access-Control-Allow-Origin: https://libro.urukais.com
    \`\`\`

??? question \"¿Qué es una Content Security Policy (CSP)?\"
    Cabecera HTTP que restringe qué recursos puede cargar una página (scripts, estilos, imágenes). Defensa contra XSS.

??? question \"¿Cómo mejorarías el rendimiento de una web lenta?\"
    1. Medir con Lighthouse y Core Web Vitals
    2. Optimizar imágenes (WebP/AVIF, lazy loading)
    3. Minificar CSS/JS y hacer code splitting
    4. font-display: swap en fuentes
    5. Cacheo HTTP y service workers
    6. CDN para assets estáticos
    7. SSR o SSG si el SEO importa
    8. Critical CSS inline

---

## 📊 Consejos para la entrevista

!!! tip \"Antes\"
    - Investiga la empresa
    - Practica en voz alta
    - Prepara preguntas para el entrevistador

!!! tip \"Durante\"
    - Piensa antes de responder
    - Si no sabes algo, dilo
    - Muestra tu proceso

!!! tip \"Después\"
    - Anota las preguntas que te han hecho
    - Pide feedback si es posible
    - No te obsesiones

---

## 📚 Recursos

| Recurso | Descripción |
| :--- | :--- |
| [Front-end Interview Handbook](https://github.com/yangshun/front-end-interview-handbook) | Guía completa |
| [JavaScript Questions](https://github.com/lydiahallie/javascript-questions) | 100+ preguntas |
| [LeetCode](https://leetcode.com/) | Algoritmos |
| [Exercism](https://exercism.org/tracks/javascript) | Ejercicios |

---

## ➡️ Siguientes pasos

[🎮 Ir al Playground](playground.md){ .md-button .md-button--primary }
[📝 Ver los ejercicios resueltos](ejercicios/index.md){ .md-button }
[🏆 Ver mis logros](logros.md){ .md-button }
'''
open('docs/entrevistas.md', 'w', encoding='utf-8').write(contenido)
print('OK:', len(contenido.splitlines()), 'líneas escritas')
"