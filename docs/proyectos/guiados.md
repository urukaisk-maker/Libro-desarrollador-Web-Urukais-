# 🧭 Proyectos Guiados

!!! abstract "Aprende construyendo"
    Cinco proyectos paso a paso, pensados para que apliques lo aprendido en cada nivel. Cada uno incluye objetivos, requisitos, pasos y los capítulos del libro que necesitas.

---

## 🎯 Cómo elegir tu proyecto

| Si ya sabes… | Empieza por… | Dificultad |
| :--- | :--- | :--- |
| HTML y CSS básico | **Portfolio personal** | 🟢 Principiante |
| JavaScript básico | **Lista de tareas** | 🟢 Principiante |
| `fetch` y promesas | **Buscador de películas** | 🟡 Intermedio |
| Git y despliegue | **Blog estático** | 🟡 Intermedio |
| Todo lo anterior | **App full-stack** | 🔴 Avanzado |

!!! tip "Regla de oro"
    No empieces dos proyectos a la vez. Termina uno, publícalo, y pasa al siguiente. La sensación de “proyecto terminado” es lo que engancha.

---

## 🟢 1. Portfolio personal {#portfolio}

**Cubre:** capítulos 02, 03, 05, 09, 10  
**Dificultad:** 🟢 Principiante  
**Tiempo estimado:** 4–6 h

!!! quote "Tu primer proyecto real"
    Un portfolio es la carta de presentación de cualquier desarrollador. No necesitas frameworks: HTML semántico y CSS bien escrito bastan para destacar.

### Qué vas a construir

Una página de una sola columna con:

- **Hero** con tu nombre, rol y una llamada a la acción.
- **Sobre mí** con foto/avatar y bio.
- **Proyectos** con 2–3 tarjetas (título, descripción, enlace).
- **Contacto** con enlaces a GitHub, LinkedIn y email.
- **Footer** con copyright.

### Requisitos mínimos

- [ ] HTML semántico (`<header>`, `<main>`, `<section>`, `<footer>`).
- [ ] CSS con variables para color y tipografía.
- [ ] Responsive: se ve bien desde 320px hasta 1920px.
- [ ] Accesibilidad: `alt` en imágenes, contraste suficiente.
- [ ] Publicado en GitHub Pages.

### Pasos

1. Crea `index.html` con la estructura semántica.
2. Crea `styles.css` con variables en `:root`.
3. Añade las secciones una a una, probando en el navegador.
4. Prueba en modo responsive (`Ctrl+Shift+M` en Chrome).
5. Publica en GitHub Pages con `Settings → Pages → Branch: main`.

### Enlaces

[Ver ejemplo en vivo](https://github.com/urukaisk-maker){ .md-button target=_blank }
[Ver ejercicio resuelto](../ejercicios/10-proyecto-final.md){ .md-button }

---
## 🟢 2. Lista de tareas con localStorage {#tareas}

**Cubre:** capítulos 04, 06, 10  
**Dificultad:** 🟢 Principiante  
**Tiempo estimado:** 3–4 h

!!! quote "Tu primer CRUD completo"
    Crear, leer, actualizar y borrar. El patrón más importante de la programación. Aquí lo haces **sin frameworks**, con JavaScript puro y `localStorage`. Si dominas esto, ya puedes construir apps reales.

### 🎯 Qué vas a construir

Una app de tareas con:

- 📝 Formulario para añadir tareas (input + botón).
- ✅ Checkbox para marcar como completada (con tachado visual).
- 🗑️ Botón de eliminar por tarea.
- 🔍 Filtros: **Todas / Pendientes / Completadas**.
- 💾 Persistencia en `localStorage` (al recargar, todo sigue ahí).
- 🌙 Modo oscuro con un toggle.
- 📊 Contador de tareas pendientes.

### 🧠 Qué vas a aprender

- Manipulación del DOM: `createElement`, `appendChild`, `querySelector`.
- Eventos: `submit`, `click`, `change`.
- Estado en un array de objetos y renderizado desde ese array.
- `localStorage`: `setItem`, `getItem`, `JSON.stringify` / `JSON.parse`.
- Delegación de eventos (para los botones de eliminar).
- `data-*` attributes para conectar el DOM con los datos.

### 🛠️ Tecnologías

`HTML5` · `CSS3` · `JavaScript ES6+` · `localStorage`

### 📋 Requisitos mínimos

- [ ] Añadir tarea desde un `<form>` con `preventDefault()`.
- [ ] Marcar como completada (que se tache visualmente).
- [ ] Eliminar tarea individual.
- [ ] Filtros funcionales (todas / pendientes / completadas).
- [ ] Persistencia en `localStorage`.
- [ ] Modo oscuro/claro persistente.
- [ ] Contador: "Te quedan N tareas".
- [ ] Validación: no permitir tareas vacías.

### 🧩 Estructura HTML

```html
<!DOCTYPE html>
<html lang="es" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mis Tareas</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="app">
    <header class="app__header">
      <h1>📝 Mis Tareas</h1>
      <button id="toggle-theme" aria-label="Cambiar tema">🌙</button>
    </header>

    <form id="form-tarea" class="app__form">
      <input
        type="text"
        id="input-tarea"
        placeholder="¿Qué tienes que hacer?"
        autocomplete="off"
        required
      >
      <button type="submit">Añadir</button>
    </form>

    <div class="app__filtros">
      <button data-filtro="todas" class="activo">Todas</button>
      <button data-filtro="pendientes">Pendientes</button>
      <button data-filtro="completadas">Completadas</button>
    </div>

    <p id="contador" class="app__contador"></p>
    <ul id="lista-tareas" class="app__lista"></ul>
  </main>

  <script src="app.js"></script>
</body>
</html>
### Qué vas a construir

Una app de tareas con:

- Formulario para añadir tareas.
- Lista con checkbox para completar.
- Botón de eliminar por tarea.
- Filtros: todas / pendientes / completadas.
- Persistencia en `localStorage`.
- Modo oscuro con un toggle.

### Requisitos mínimos

- [ ] Añadir tarea desde un `<form>`.
- [ ] Marcar como completada y que se tache visualmente.
- [ ] Eliminar tarea.
- [ ] Filtros funcionales.
- [ ] Persistencia: al recargar, todo sigue ahí.
- [ ] Modo oscuro/claro.

### Pasos

1. Estructura HTML: input, botón, lista, filtros.
2. CSS con dos temas usando `data-theme="dark"`.
3. JS: función `render()` que repinte la lista desde un array.
4. Persistir con `localStorage.setItem('tareas', JSON.stringify(tareas))`.
5. Recuperar al cargar con `JSON.parse(localStorage.getItem('tareas'))`.

### Enlaces

[Ver ejemplo en vivo](https://github.com/urukaisk-maker){ .md-button target=_blank }
[Ver ejercicio resuelto](../ejercicios/04-javascript.md){ .md-button }

---

## 🟡 3. Buscador de películas con API {#peliculas}

**Cubre:** capítulos 08, 12, 16  
**Dificultad:** 🟡 Intermedio  
**Tiempo estimado:** 5–7 h

!!! quote "Tu primera API real"
    Consumir una API es la puerta al desarrollo profesional. Aquí usas `fetch`, manejo de estados y debounce en una sola app.

### Qué vas a construir

Un buscador de películas con:

- Input de búsqueda con **debounce** de 300 ms.
- Grid de resultados con póster, título y año.
- Estados visuales: `loading`, `empty`, `error`.
- Paginación o scroll infinito (opcional).

### Requisitos mínimos

- [ ] Registro en [OMDb API](https://www.omdbapi.com/apikey.aspx){ target=_blank } para obtener una API key gratuita.
- [ ] `fetch` a `https://www.omdbapi.com/?apikey=XXX&s=…`.
- [ ] Manejo de errores: sin red, API key inválida, sin resultados.
- [ ] Debounce en el input.
- [ ] Loading visible mientras se busca.

### Pasos

1. Crea el HTML: input, estado, contenedor de resultados.
2. Escribe `async function buscar(termino)`.
3. Implementa `debounce(fn, 300)`.
4. Renderiza según estado: `if (loading)`, `if (error)`, `if (!data.length)`.
5. Maneja la cancelación con `AbortController` si haces varias peticiones seguidas.

### Enlaces

[Ver ejemplo en vivo](https://github.com/urukaisk-maker){ .md-button target=_blank }
[Ver ejercicio resuelto](../ejercicios/08-apis.md){ .md-button }

---

## 🟡 4. Blog estático {#blog}

**Cubre:** capítulos 07, 09, 11, 14  
**Dificultad:** 🟡 Intermedio  
**Tiempo estimado:** 8–10 h

!!! quote "Tu primer blog"
    Un blog es la excusa perfecta para aprender Markdown, generadores estáticos y despliegue continuo.

### Qué vas a construir

Un blog con:

- 3 posts escritos en Markdown.
- Generador estático (Eleventy, Astro o Hugo).
- Diseño limpio con tipografía legible.
- Despliegue automático en Netlify o Vercel.
- Accesibilidad WCAG AA.

### Requisitos mínimos

- [ ] Estructura: home, listado, post individual.
- [ ] Markdown con frontmatter (`title`, `date`, `tags`).
- [ ] Navegación entre posts.
- [ ] SEO básico: `<title>`, `<meta description>`, Open Graph.
- [ ] Despliegue automático al hacer push.

### Pasos

1. Elige un generador: [Astro](https://astro.build){ target=_blank } es la opción más moderna.
2. Crea la estructura de carpetas.
3. Escribe 3 posts en `src/content/`.
4. Diseña el layout con CSS moderno.
5. Conecta Netlify a tu repo de GitHub.
6. Configura el dominio personalizado (opcional).

### Enlaces

[Ver ejemplo en vivo](https://github.com/urukaisk-maker){ .md-button target=_blank }
[Ver ejercicio resuelto](../ejercicios/09-despliegue.md){ .md-button }

---

## 🔴 5. App full-stack {#fullstack}

**Cubre:** capítulos 15, 18, 19, 20  
**Dificultad:** 🔴 Avanzado  
**Tiempo estimado:** 20–30 h

!!! quote "El proyecto final"
    Frontend + backend + base de datos + deploy. Si terminas esto, tienes un portfolio real de nivel junior profesional.

### Qué vas a construir

Una app full-stack con:

- **Frontend:** React + TypeScript.
- **Backend:** Node.js + Express.
- **Base de datos:** SQLite (o PostgreSQL).
- **Auth:** JWT.
- **Deploy:** frontend en Vercel, backend en Railway.
- **CI/CD:** GitHub Actions que ejecute tests.

### Requisitos mínimos

- [ ] CRUD completo desde el frontend.
- [ ] Autenticación con email + contraseña.
- [ ] Rutas protegidas.
- [ ] Variables de entorno en `.env` (nunca en el repo).
- [ ] Tests unitarios en backend (Vitest o Jest).
- [ ] Deploy funcionando y accesible.

### Pasos

1. **Backend primero:** Express con `GET /tasks`, `POST /tasks`, etc.
2. **DB:** SQLite para empezar; migra a PostgreSQL cuando funcione.
3. **Auth:** bcrypt + JWT.
4. **Frontend:** React + Vite + TypeScript.
5. **Cliente HTTP:** `fetch` o Axios con interceptor de token.
6. **Deploy:** Railway para backend, Vercel para frontend.
7. **CI:** workflow de GitHub Actions que corra `npm test` en cada PR.

### Enlaces

[Ver ejemplo en vivo](https://github.com/urukaisk-maker){ .md-button target=_blank }
[Ver ejercicio resuelto](../ejercicios/19-fullstack-node.md){ .md-button }

---

## 🎁 Cómo entregar tu proyecto

1. **Publícalo en GitHub** con un README claro.
2. **Despliégalo** en Netlify, Vercel o GitHub Pages.
3. **Compártelo** en el [Hall of Fame](../hall-of-fame.md).
4. **Opcional:** escríbeme y lo destaco en el [Diario](../diario.md).

!!! tip "Un proyecto terminado vale más que diez empezados"
    No esperes a tenerlo perfecto. Publica la v1, recibe feedback, mejora. Iterar es el trabajo real.

---

## 🚀 Siguiente

[Ir al Playground](../playground.md){ .md-button }
[Ver ejercicios resueltos](../ejercicios/index.md){ .md-button .md-button--primary }