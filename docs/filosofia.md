# 💭 Filosofía del proyecto

!!! quote "Por qué existe este libro"
    En internet sobran tutoriales. Lo que falta es material **estructurado, en español, que no te suelte a la mitad**. Este libro existe para llenar ese hueco.

Nació de mis propias notas. Cuando aprendía, apuntaba todo en un archivo de texto. Cuando enseñaba, reutilizaba esas notas. Con los años se convirtió en esto.

---

## 🎯 Principios

Cada decisión de este libro (qué incluir, qué omitir, cómo explicarlo) se rige por estos siete principios. Si alguna vez ves algo que los contradice, es un bug y puedes [reportarlo](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new).

### 🛠️ Práctico antes que teórico

Cada concepto viene con **código que puedes ejecutar**. No hay capítulos de relleno ni teoría abstracta sin aplicación.

!!! example "Ejemplo real"
    Cuando explicamos `async/await`, no nos limitamos a decir "sirve para esperar promesas". Mostramos una llamada a una API real, con `try/catch`, manejo de errores y un ejemplo de lo que pasa si no lo usas.

### 📈 Progresivo y sin saltos

Los capítulos siguen una **curva suave**. No hay "ejercicio para el lector" imposibles ni conceptos avanzados metidos con calzador en un capítulo de introducción.

| Nivel | Qué sabes al empezar | Qué sabes al terminar |
| :--- | :--- | :--- |
| 🟢 Principiante | Nada | Crear páginas web estáticas con HTML, CSS y JS |
| 🟡 Intermedio | HTML/CSS/JS básico | Consumir APIs, usar Git, desplegar en producción |
| 🟠 Avanzado | Frontend estático | TypeScript, testing, arquitectura frontend |
| 🔴 Profesional | Frontend | Full-stack con Node.js, DevOps básico |
| 🟣 Experto | Full-stack | Web Components, PWA, WebSockets, design systems |
| 🔵 Élite | Experto | Seguridad, WebAssembly, IA, WebXR, Web3 |
| 🚀 Vanguardia | Élite | Edge computing, GraphQL, micro-frontends, IA generativa |

### 🌍 En español, de verdad

**Sin traducciones automáticas, sin anglicismos innecesarios.** Cuando un término técnico solo existe en inglés (como *callback*, *debounce*, *hoisting* o *event loop*), se explica, se pone en cursiva y se usa con naturalidad. Pero no vas a encontrar "rendimiento de la página" cuando queremos decir *performance*.

!!! tip "Términos que mantenemos en inglés"
    - **callback**: función que se pasa como argumento a otra función
    - **debounce**: técnica para retrasar la ejecución de una función
    - **hoisting**: elevación de variables y funciones al inicio del scope
    - **event loop**: bucle de eventos del motor de JavaScript
    - **closure**: función que recuerda su entorno léxico

    En el [glosario](apendices/glosario.md) tienes la definición de cada uno.

### 🧱 Sin dependencias de moda

No dependemos de un framework concreto que caduque en seis meses. Los fundamentos —**HTML, CSS y JavaScript**— son los mismos hoy que hace diez años. Los frameworks van y vienen, pero el navegador sigue entendiendo lo mismo.

!!! warning "Lo que NO vas a encontrar aquí"
    - ❌ "Aprende React en 24 horas"
    - ❌ "El framework definitivo que reemplazará a todos los demás"
    - ❌ "Esta librería cambiará tu vida"
    - ✅ "Así funciona el DOM, y así lo usan React, Vue y Svelte por debajo"
    - ✅ "Estos son los fundamentos que no cambian, y estos son los frameworks que puedes aprender después"

### ♿ Accesible por defecto

Cada ejemplo que ves aquí está pensado para ser accesible. Porque la **accesibilidad no es un extra: es parte del trabajo**.

- Todos los ejemplos usan **HTML semántico** (`<nav>`, `<main>`, `<article>`, `<button>` en lugar de `<div onclick>`)
- Los formularios llevan **`<label>`** correctamente asociados
- Los colores cumplen **contraste WCAG AA** (4.5:1 mínimo)
- Las imágenes llevan **`alt`** descriptivo
- Los componentes interactivos son **navegables por teclado**

!!! quote "La accesibilidad no es un checkbox"
    No se trata de "aprobar" un validador. Se trata de que **cualquier persona**, independientemente de sus capacidades, pueda usar lo que construyes. Y eso empieza por escribir HTML bien desde el primer día.

### 🔓 Abierto y libre

Todo el código está en [GitHub](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-). Puedes **copiarlo, modificarlo, usarlo en tus proyectos o proponer mejoras**. La licencia es MIT: la más permisiva que existe.

| Puedes | No puedes |
| :--- | :--- |
| ✅ Usar el contenido en tus proyectos | ❌ Quitarme la atribución de autoría |
| ✅ Modificarlo y adaptarlo | ❌ Venderlo como si fuera tuyo |
| ✅ Compartirlo con quien quieras | ❌ Usarlo para hacer daño |
| ✅ Contribuir con mejoras | — |

### 🎓 Enseñar, no lucir

No escribo para demostrar lo mucho que sé, sino para que **tú aprendas**. Eso significa:

- Explicar las cosas dos veces si hace falta.
- No usar jerga innecesaria.
- Reconocer cuando algo es difícil.
- No presumir de "código limpio" si eso hace el ejemplo más confuso.
- Poner ejemplos que funcionen, no ejemplos "elegantes" que no se entienden.

---

## ❌ Lo que NO encontrarás aquí

Es tan importante decir qué **sí** hay como qué **no** hay. Para que sepas qué esperar:

- ❌ **Promesas de "aprender a programar en 24 horas"**. Esto lleva tiempo. Meses, no días. Quien te diga lo contrario te está mintiendo.
- ❌ **Cursos disfrazados**. No hay nada de pago detrás. No hay "versión pro" oculta.
- ❌ **Publicidad ni afiliados**. Nadie paga por aparecer en los recursos recomendados.
- ❌ **Opiniones disfrazadas de hechos**. Cuando algo es cuestión de gustos (como "React vs Vue"), se dice claramente que es una preferencia personal, no un hecho técnico.
- ❌ **Tutoriales desactualizados**. Si algo cambia en el ecosistema y afecta al libro, se actualiza. Puedes ver el historial en el [Changelog](changelog.md).
- ❌ **Contenido copiado de otros sitios**. Todo el texto es original, escrito desde cero, con ejemplos propios.
- ❌ **Relleno**. Cada párrafo está ahí porque aporta algo. Si un capítulo se puede resumir en la mitad, se resume.

---

## 🏗️ Cómo está hecho

El libro está construido con herramientas **100% open source** y **gratuitas**. Nada de servicios de pago ni infraestructura cara.

| Herramienta | Para qué | Alternativa si no existiera |
| :--- | :--- | :--- |
| **MkDocs** | Generar el sitio estático desde Markdown | Hugo, Jekyll, Astro |
| **Material for MkDocs** | El tema, que es el 80% del diseño | Docusaurus, Just the Docs |
| **Markdown** | Escribir el contenido de forma sencilla | HTML puro (más lento de escribir) |
| **GitHub Actions** | Desplegar automáticamente en cada `push` | Netlify, Vercel, CI manual |
| **GitHub Pages** | Servir el sitio de forma gratuita | Netlify, Vercel, Cloudflare Pages |
| **Giscus** | Comentarios anclados a GitHub Discussions | Disqus, Utterances |
| **Mermaid** | Diagramas de arquitectura y flujo | Draw.io, Excalidraw, PlantUML |

Todo el código fuente es público y está en el [repositorio](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-). Si quieres montar tu propio libro con la misma estructura, puedes hacer un fork y empezar.

---

## 🤝 Un compromiso

Este libro **no te va a mentir**. Ni te va a vender humo. Cuando algo es difícil, te lo diré. Cuando algo requiere práctica repetida, también. Cuando algo requiere que hagas proyectos por tu cuenta, no voy a decirte que con leer basta.

!!! quote "Aprender a programar es como aprender a tocar un instrumento"
    Hace falta practicar, equivocarse y volver a intentarlo. No hay atajos. No hay píldoras mágicas. No hay "trucos" que sustituyan las horas de teclado.

### Lo que sí puedo prometerte

- ✅ Que cada capítulo estará escrito con **claridad**, sin jerga innecesaria.
- ✅ Que cada ejemplo **funcionará** cuando lo copies y lo pegues.
- ✅ Que si algo cambia en el ecosistema, **se actualizará** lo antes posible.
- ✅ Que **nunca habrá publicidad** ni muros de pago.
- ✅ Que **tu progreso es tuyo**: no se envía a ningún servidor, no se comparte con nadie.
- ✅ Que si me equivoco, **lo corregiré** y te lo diré.

### Lo que no puedo prometerte

- ❌ Que aprendas en una semana. No es realista.
- ❌ Que con solo leer baste. No funciona así.
- ❌ Que no te frustres. La frustración es parte del proceso.
- ❌ Que este libro sea perfecto. Tiene errores. Si los encuentras, [repórtalos](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new).
- ❌ Que sepas todo lo que necesitas al terminar. Aprender a programar es un proceso de por vida.

---

## 🧭 Sobre el "mejor" lenguaje, framework o herramienta

Una de las preguntas más frecuentes es: **"¿Cuál es el mejor framework?"**. La respuesta honesta es: **depende**.

- **React** es genial para interfaces dinámicas, pero pesa más que Svelte o Solid.
- **Vue** es más fácil de aprender, pero tiene menos oferta laboral en algunos países.
- **Svelte** compila a JavaScript puro, pero su ecosistema es más pequeño.
- **Angular** es robusto para equipos grandes, pero su curva es más empinada.

!!! tip "Mi consejo"
    Aprende **JavaScript bien** antes de elegir un framework. El 80% de lo que vas a hacer con React, Vue o Svelte es JavaScript. Si dominas el lenguaje, cambiar de framework es cuestión de semanas, no de meses.

Lo mismo aplica a los lenguajes de backend: **Node.js** es genial para APIs, **Python** para datos e IA, **Go** para microservicios, **Rust** para rendimiento extremo. No hay uno "mejor" que otro: hay uno **mejor para cada caso**.

---

## 🌱 Sostenibilidad del proyecto

Este libro no es un sprint: es un maratón. Por eso:

- **No hay fechas de entrega**. Los capítulos se publican cuando están listos, no cuando toca.
- **No hay presión de crecimiento**. Si lo leen 10 personas o 10 000, el proyecto sigue igual.
- **No hay equipo**. Soy yo solo, con la ayuda de la comunidad. Si quieres [contribuir](contribuir.md), eres bienvenido.
- **No hay prisa**. Prefiero un capítulo bien escrito al mes que uno mediocre a la semana.
- **No hay monetización agresiva**. Si algún día el proyecto genera ingresos, se reinvertirán en el propio libro.

!!! note "¿Quieres ayudar?"
    Hay muchas formas de contribuir sin escribir código: reportar errores, sugerir mejoras, compartir el libro, dar una estrella en GitHub. Todo cuenta. Lo tienes detallado en la página de [Contribuir](contribuir.md).

---

## 🔮 El futuro del proyecto

Estas son las ideas que tengo en mente para los próximos meses. No todas se harán, y las prioridades pueden cambiar. Pero te sirven para hacerte una idea de hacia dónde va esto:

- [ ] **Traducción al inglés** con `mkdocs-static-i18n` (en investigación).
- [ ] **Más laboratorios interactivos** con StackBlitz y CodeSandbox.
- [ ] **Certificados verificables** con código QR.
- [ ] **Sistema de cuentas** para sincronizar logros entre dispositivos.
- [ ] **Modo "solo lectura"** para imprimir sin distracciones.
- [ ] **Búsqueda semántica** con embeddings (experimental).
- [ ] **Capítulos invitados** de otros autores de la comunidad.

!!! tip "¿Tienes una idea?"
    Si crees que falta algo importante, abre un [issue en GitHub](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new) con la etiqueta `enhancement`. Las ideas de la comunidad se revisan cada semana.

---

## 💬 Última reflexión

> "La mejor forma de aprender es enseñar."

Este libro es mi forma de enseñar. Es lo que me hubiera gustado encontrar cuando empecé. Si te sirve, ya ha valido la pena.

Y si algún día escribes el tuyo, avísame: me encantará leerlo.

**Última actualización:** Octubre 2026 · **Autor:** [Manuel Casimiro Carrasco (Urukais)](autor.md)