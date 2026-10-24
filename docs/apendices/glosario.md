# 📖 Glosario

!!! quote "Términos esenciales del desarrollo web"
    Ordenados alfabéticamente. Cada término tiene una definición corta, y cuando aplica, un enlace al capítulo donde se explica en profundidad.

---

## 🧭 Navegación rápida

[**A**](#a) · [**B**](#b) · [**C**](#c) · [**D**](#d) · [**E**](#e) · [**F**](#f) · [**G**](#g) · [**H**](#h) · [**I**](#i) · [**J**](#j) · [**K**](#k) · [**L**](#l) · [**M**](#m) · [**N**](#n) · [**O**](#o) · [**P**](#p) · [**Q**](#q) · [**R**](#r) · [**S**](#s) · [**T**](#t) · [**U**](#u) · [**V**](#v) · [**W**](#w) · [**X**](#x) · [**Y**](#y) · [**Z**](#z)

---

## A

**Accesibilidad (a11y)** — Práctica de diseñar webs que cualquier persona pueda usar, incluyendo quienes tienen discapacidades visuales, auditivas o motoras. Se mide con las pautas **WCAG**. → [Capítulo 14](../capitulos/14-accesibilidad.md)

**API** — *Application Programming Interface*. Conjunto de reglas que permite a dos programas comunicarse. En web, casi siempre se refiere a una API REST o GraphQL que devuelve JSON. → [Capítulo 8](../capitulos/08-apis.md)

**Async/await** — Sintaxis moderna de JavaScript para manejar operaciones asíncronas de forma legible. Se apoya en promesas por debajo. → [Capítulo 12](../capitulos/12-javascript-asincrono.md)

**Atributo** — Información adicional que se añade a una etiqueta HTML. Por ejemplo, `href` en `<a href="...">`.

---

## B

**Backend** — Parte del desarrollo web que corre en el servidor (lógica, base de datos, autenticación). → [Capítulo 19](../capitulos/19-fullstack-node.md)

**Branch (rama)** — Línea de desarrollo independiente dentro de un repositorio Git. La rama principal suele llamarse `main` o `master`. → [Capítulo 7](../capitulos/07-git.md)

**Bundler** — Herramienta que empaqueta todos los archivos de un proyecto (JS, CSS, imágenes) en unos pocos archivos optimizados. Ejemplos: **Vite**, **Webpack**, **esbuild**. → [Capítulo 13](../capitulos/13-modulos-bundlers.md)

---

## C

**Callback** — Función que se pasa como argumento a otra función y se ejecuta después de que ocurra algo. Muy usada en JavaScript antes de las promesas.

**CDN** — *Content Delivery Network*. Red de servidores distribuidos geográficamente que sirven archivos estáticos (imágenes, CSS, JS) de forma rápida.

**Closure** — Función que "recuerda" el entorno en el que fue creada, incluso después de que ese entorno haya dejado de existir. Concepto clave en JavaScript.

**Commit** — Registro de un cambio en el historial de Git. Cada commit tiene un hash único y un mensaje descriptivo. → [Capítulo 7](../capitulos/07-git.md)

**CORS** — *Cross-Origin Resource Sharing*. Mecanismo de seguridad que permite o bloquea peticiones entre dominios distintos.

**CSS** — *Cascading Style Sheets*. Lenguaje que define la presentación de una página: colores, tipografía, layout, animaciones. → [Capítulo 3](../capitulos/03-css-basico.md)

**CSRF** — *Cross-Site Request Forgery*. Ataque que fuerza al navegador de un usuario autenticado a ejecutar acciones no deseadas en otro sitio.

---

## D

**Debounce** — Técnica para retrasar la ejecución de una función hasta que pase un tiempo sin que ocurra un evento. Muy útil en inputs de búsqueda.

**Deploy** — Publicar una aplicación en internet para que cualquiera pueda acceder. → [Capítulo 9](../capitulos/09-despliegue.md)

**DevOps** — Conjunto de prácticas que combinan desarrollo y operaciones para automatizar despliegues y monitorización. → [Capítulo 20](../capitulos/20-devops.md)

**DOM** — *Document Object Model*. Representación en memoria del HTML, manipulable con JavaScript. Es un árbol de nodos. → [Capítulo 4](../capitulos/04-javascript.md)

---

## E

**ES6** — Sexta versión de ECMAScript (2015), que introdujo `let`, `const`, arrow functions, clases, promesas, módulos y más.

**Edge Computing** — Ejecutar código en servidores distribuidos cerca del usuario (no en un único servidor central) para reducir latencia. → [Capítulo 33](../capitulos/33-edge-computing.md)

**Event loop** — Mecanismo que permite a JavaScript (de un solo hilo) gestionar operaciones asíncronas. Coordina la pila de llamadas, la cola de tareas y la cola de microtareas.

**Evento** — Acción que ocurre en el navegador (clic, tecla, scroll) y que JavaScript puede escuchar y manejar.

---

## F

**Fetch** — API del navegador para hacer peticiones HTTP de forma nativa. Devuelve promesas. → [Capítulo 8](../capitulos/08-apis.md)

**Flexbox** — Modelo de layout CSS unidimensional, ideal para alinear elementos en fila o columna. → [Capítulo 3](../capitulos/03-css-basico.md)

**Framework** — Conjunto de herramientas y convenciones que aceleran el desarrollo. Ejemplos: React, Vue, Angular, Svelte.

**Frontend** — Parte del desarrollo web que corre en el navegador: estructura, estilos e interactividad. → [Capítulo 1](../capitulos/01-introduccion.md)

---

## G

**Git** — Sistema de control de versiones distribuido, creado por Linus Torvalds en 2005. → [Capítulo 7](../capitulos/07-git.md)

**GitHub** — Plataforma para alojar repositorios Git y colaborar en proyectos open source.

**GitHub Actions** — Sistema de CI/CD integrado en GitHub. Permite ejecutar scripts automáticamente en cada push, PR o evento.

**Grid** — Modelo de layout CSS bidimensional, ideal para maquetar páginas completas. → [Capítulo 3](../capitulos/03-css-basico.md)

---

## H

**Hash** — En Git, identificador único de un commit (40 caracteres hexadecimales). También se usa en URLs para saltar a una sección.

**Hoisting** — Comportamiento de JavaScript que eleva las declaraciones de variables (`var`) y funciones al inicio de su scope.

**HTML** — *HyperText Markup Language*. Lenguaje de marcado que define la estructura de la web. → [Capítulo 2](../capitulos/02-html-basico.md)

**HTTP** — *HyperText Transfer Protocol*. Protocolo de transferencia de hipertexto. Es la base de la web.

**HTTPS** — HTTP con cifrado TLS. Es obligatorio a día de hoy para cualquier sitio en producción.

---

## I

**i18n** — Abreviatura de *internationalization*. Proceso de preparar una aplicación para múltiples idiomas.

**IDE** — *Integrated Development Environment*. Editor de código con herramientas integradas (depurador, terminal, control de versiones). Ejemplo: VS Code, WebStorm.

**Índice** — Estructura de base de datos que acelera las búsquedas. También, en este libro, la página de inicio.

---

## J

**JavaScript** — Lenguaje de programación que corre en el navegador (y también en Node.js). Es el único lenguaje que entienden todos los navegadores. → [Capítulo 4](../capitulos/04-javascript.md)

**JSON** — *JavaScript Object Notation*. Formato ligero de intercambio de datos. Es el estándar de facto en APIs REST.

**JWT** — *JSON Web Token*. Estándar para transmitir información de autenticación entre cliente y servidor de forma segura.

---

## K

**Keyword** — Palabra reservada del lenguaje. En JavaScript: `const`, `let`, `function`, `return`, `if`, `for`…

---

## L

**Layout** — Disposición de los elementos en una página.

**LCP** — *Largest Contentful Paint*. Métrica de rendimiento web que mide cuándo se carga el elemento más grande visible. Parte de **Core Web Vitals**.

**Linter** — Herramienta que analiza el código en busca de errores o malas prácticas. Ejemplo: ESLint.

---

## M

**Markdown** — Lenguaje de marcado ligero para escribir documentación. Es el que usa este libro.

**Media query** — Regla CSS que aplica estilos según el tamaño de pantalla u otras condiciones. → [Capítulo 5](../capitulos/05-responsive.md)

**Merge** — En Git, fusionar los cambios de una rama en otra. → [Capítulo 7](../capitulos/07-git.md)

**Micro-frontend** — Arquitectura que divide un frontend grande en aplicaciones más pequeñas e independientes. → [Capítulo 36](../capitulos/36-micro-frontends.md)

**MIME type** — Tipo de contenido que el servidor declara en la cabecera `Content-Type` (`text/html`, `application/json`, `image/png`…).

---

## N

**Node.js** — Entorno que permite ejecutar JavaScript fuera del navegador, en el servidor. → [Capítulo 19](../capitulos/19-fullstack-node.md)

**npm** — *Node Package Manager*. Gestor de paquetes de Node.js. El mayor registro de librerías del mundo.

---

## O

**OAuth** — Protocolo de autorización que permite a una aplicación acceder a recursos de otra sin compartir contraseñas.

**ORM** — *Object-Relational Mapping*. Herramienta que traduce entre objetos de código y tablas de base de datos. Ejemplo: Prisma, Sequelize.

---

## P

**PNG / JPG / SVG / WebP / AVIF** — Formatos de imagen. **SVG** es vectorial; el resto son mapas de bits. **WebP** y **AVIF** son los más modernos y ligeros.

**Promise (promesa)** — Objeto que representa el resultado eventual de una operación asíncrona. Puede estar pendiente, resuelta o rechazada.

**Pull request (PR)** — Propuesta de fusionar cambios en GitHub. Permite revisar el código antes de integrarlo. → [Capítulo 7](../capitulos/07-git.md)

**PWA** — *Progressive Web App*. Web que se comporta como una app nativa: instalable, offline, notificaciones push. → [Capítulo 22](../capitulos/22-pwa.md)

---

## Q

**Query** — Consulta. En bases de datos, sentencia SQL. En URLs, la parte después de `?` con parámetros (`?q=hola&page=2`).

**Quirks Mode** — Modo de renderizado antiguo que activan los navegadores cuando falta el `<!DOCTYPE html>`. Rompe el layout moderno.

---

## R

**React** — Librería de JavaScript para construir interfaces de usuario. Creada por Facebook en 2013.

**Rebase** — En Git, reescribir el historial moviendo commits de una rama a otra base. Alternativa a `merge`. → [Capítulo 7](../capitulos/07-git.md)

**Refactorizar** — Reestructurar código sin cambiar su comportamiento externo, para hacerlo más limpio o mantenible.

**RegEx (expresión regular)** — Patrón para buscar o reemplazar texto. Muy potente y muy críptico.

**Repo (repositorio)** — Almacén donde Git guarda el historial de un proyecto.

**Responsive** — Diseño que se adapta a cualquier tamaño de pantalla. → [Capítulo 5](../capitulos/05-responsive.md)

**REST** — *Representational State Transfer*. Estilo arquitectónico para APIs basadas en HTTP. Usa verbos (`GET`, `POST`, `PUT`, `DELETE`) y recursos.

---

## S

**SCSS / Sass** — Preprocesador de CSS con variables, anidamiento, mixins y funciones. Se compila a CSS puro.

**SEO** — *Search Engine Optimization*. Optimización para buscadores. Incluye HTML semántico, metadatos, velocidad y accesibilidad.

**Service Worker** — Script que se ejecuta en segundo plano en el navegador y permite funcionalidad offline, caché y notificaciones push.

**SPA** — *Single Page Application*. Aplicación web que carga una sola página HTML y actualiza el contenido con JavaScript, sin recargar.

**SSG** — *Static Site Generator*. Generador de sitios estáticos a partir de Markdown u otro formato. MkDocs, Hugo y Jekyll son ejemplos.

**SSR** — *Server-Side Rendering*. Renderizar el HTML en el servidor antes de enviarlo al navegador. Mejora el SEO y el primer renderizado.

**Stack** — Conjunto de tecnologías que usa un proyecto. "Stack frontend" = HTML + CSS + JS + framework.

---

## T

**Tailwind CSS** — Framework de CSS basado en clases utilitarias. Se usa directamente en el HTML, sin escribir CSS aparte.

**Terminal** — Interfaz de línea de comandos. En Linux/macOS es `bash`, `zsh` o `fish`. En Windows, PowerShell o WSL.

**Testing** — Práctica de escribir pruebas automáticas para verificar que el código funciona. Tipos: unitario, integración, E2E. → [Capítulo 16](../capitulos/16-testing.md)

**TypeScript** — JavaScript con tipos estáticos. Se compila a JavaScript puro antes de ejecutarse. → [Capítulo 15](../capitulos/15-typescript.md)

---

## U

**UI** — *User Interface*. Interfaz de usuario: lo que el usuario ve y con lo que interactúa.

**UX** — *User Experience*. Experiencia de usuario: cómo se siente al usar un producto.

**URL** — *Uniform Resource Locator*. Dirección de un recurso en la web.

---

## V

**Viewport** — Área visible de la página en el dispositivo. Se controla con `<meta name="viewport" content="...">`.

**Virtual DOM** — Representación en memoria del DOM que usan frameworks como React para actualizar la interfaz de forma eficiente.

**Vite** — Bundler y servidor de desarrollo ultrarrápido, basado en ES modules nativos. → [Capítulo 13](../capitulos/13-modulos-bundlers.md)

---

## W

**WCAG** — *Web Content Accessibility Guidelines*. Pautas internacionales de accesibilidad web. Niveles: A, AA, AAA. → [Capítulo 14](../capitulos/14-accesibilidad.md)

**WebAssembly (Wasm)** — Formato binario que permite ejecutar código de otros lenguajes (C, C++, Rust) en el navegador a velocidad casi nativa. → [Capítulo 27](../capitulos/27-webassembly.md)

**Web Components** — Conjunto de estándares nativos (Custom Elements, Shadow DOM, Templates) para crear componentes reutilizables sin frameworks. → [Capítulo 21](../capitulos/21-web-components.md)

**WebSocket** — Protocolo de comunicación bidireccional en tiempo real entre cliente y servidor. → [Capítulo 23](../capitulos/23-websockets.md)

**WebXR** — Conjunto de APIs para realidad virtual (VR) y realidad aumentada (AR) en el navegador. → [Capítulo 29](../capitulos/29-webxr.md)

**Web3** — Visión descentralizada de la web basada en blockchain. → [Capítulo 30](../capitulos/30-web3.md)

---

## X

**XSS** — *Cross-Site Scripting*. Ataque que inyecta código malicioso en una web. Se previene escapando la entrada del usuario.

**XML** — *eXtensible Markup Language*. Formato de datos basado en etiquetas. Hoy se usa menos que JSON.

---

## Y

**YAML** — Formato de serialización legible por humanos. Es el que usa `mkdocs.yml`.

---

## Z

**Zeitgeist** — (No es un término técnico, pero nos gusta.) El espíritu de la época. Lo que está de moda ahora mismo en el ecosistema.

---

!!! tip "¿Falta algún término?"
    Si echas en falta un término que debería estar aquí, abre un [issue en GitHub](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new) o envía un pull request con la definición. Los términos nuevos se añaden en orden alfabético.

**Última actualización:** Octubre 2026