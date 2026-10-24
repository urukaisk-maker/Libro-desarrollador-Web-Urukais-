# 🧭 Proyectos Guiados

!!! abstract "Aprende construyendo"
    Cinco proyectos paso a paso, pensados para que apliques lo aprendido en cada nivel. Cada uno incluye objetivos, requisitos, errores comunes, checklist de pruebas y los capítulos del libro que necesitas.

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

## 1. Portfolio personal {#portfolio}

**Cubre:** capítulos 02, 03, 05, 09, 10 · **Dificultad:** 🟢 Principiante · **Tiempo estimado:** 4–6 h

!!! quote "Tu primer proyecto real"
    Un portfolio no es una galería de capturas. Es la prueba de que sabes construir algo funcional, desplegarlo y explicar cómo lo hiciste. No necesitas frameworks: HTML semántico, CSS bien escrito y 3 proyectos sólidos bastan.

### 🎯 Qué vas a construir

Una página de una sola columna con **6 secciones obligatorias**:

| Sección | Qué debe incluir |
| :--- | :--- |
| **Hero** | Tu nombre, rol y una frase que resuma qué haces |
| **Sobre mí** | 2–3 frases: especialización, qué te motiva, qué estás aprendiendo ahora |
| **Proyectos** | 3 tarjetas, cada una con título, descripción, stack y **dos enlaces: demo + código** |
| **Stack** | Tecnologías que usas, con contexto (no barras de progreso falsas) |
| **Contacto** | Email, GitHub y LinkedIn. Un `mailto:` o formulario funcional |
| **Footer** | Copyright y enlace al repo del propio portfolio |

### 🧠 Qué vas a aprender

- Estructura HTML semántica (`<header>`, `<main>`, `<section>`, `<footer>`).
- CSS moderno: Flexbox, Grid, variables, tipografía fluida.
- Diseño responsive sin media queries complejas.
- Desplegar en GitHub Pages o Netlify.
- **Escribir case studies** que expliquen tu proceso, no solo el resultado.

### 🛠️ Tecnologías

`HTML5` · `CSS3` · `Git` · `GitHub Pages` o `Netlify`

### 📋 Requisitos mínimos

- [ ] Las 6 secciones de la tabla anterior.
- [ ] **3 proyectos reales**, no clones de tutoriales.
- [ ] Cada proyecto con **demo en vivo** y **repo de GitHub**.
- [ ] Responsive: se ve bien desde 320px hasta 1920px.
- [ ] `alt` en todas las imágenes y contraste suficiente.
- [ ] Publicado con URL real.

### 🚀 Pasos

1. **Planifica en papel** (o Figma): dibuja las 6 secciones antes de escribir código.
2. Crea `index.html` con la estructura semántica.
3. Crea `styles.css` con variables en `:root`.
4. Añade las secciones una a una, probando en el navegador.
5. Prueba en modo responsive (`Ctrl+Shift+M` en Chrome).
6. Despliega en GitHub Pages (`Settings → Pages → Branch: main`).
7. Añade el case study de cada proyecto en un `README.md` dentro de su repo.

### ⚠️ Errores comunes

| Error | Por qué es malo |
| :--- | :--- |
| **Enlaces rotos o demos caídas** | Si un reclutador pincha y no funciona, el proyecto “no existe” |
| **Stack inflado** | No pongas 20 tecnologías que no puedes defender en una entrevista |
| **Barras de progreso tipo “React 75%”** | No significan nada y parecen amateur |
| **Diseño genérico de plantilla sin personalizar** | Se nota a la legua |
| **No actualizarlo** | Un portfolio es un CV vivo. Revísalo cada 3 meses |

### 🧪 Checklist de pruebas

- [ ] Abro la URL en el móvil → se ve bien.
- [ ] Pincho los 3 enlaces de demo → todos funcionan.
- [ ] Pincho los 3 enlaces de GitHub → todos abren el repo correcto.
- [ ] El email de contacto abre el cliente de correo.
- [ ] Paso el Lighthouse en “Accessibility” → ≥ 90.
- [ ] No hay texto de relleno tipo “Lorem ipsum”.

### 🚀 Extensiones

1. **Modo oscuro** con `prefers-color-scheme` o un toggle manual.
2. **Cargar los repos desde la API de GitHub** en lugar de hardcodearlos.
3. **Blog integrado** con 2–3 posts explicando lo que aprendes.
4. **Botón de descarga de CV** en PDF.
5. **Animaciones de entrada** con `IntersectionObserver`.

### 🔗 Enlaces

[Ver plantilla de ejemplo](https://github.com/brayandiazc/portfolio-template-basic){ .md-button target=_blank }
[Ver ejercicio resuelto](ejercicios/10-proyecto-final.md){ .md-button }

### 📚 Capítulos relacionados

- [02 — HTML básico](capitulos/02-html-basico.md)
- [03 — CSS básico](capitulos/03-css-basico.md)
- [05 — Diseño responsive](capitulos/05-responsive.md)
- [09 — Despliegue y hosting](capitulos/09-despliegue.md)
- [10 — Proyecto final: portfolio](capitulos/10-proyecto-final.md)

---

## 2. Lista de tareas con localStorage {#tareas}

**Cubre:** capítulos 04, 06, 10 · **Dificultad:** 🟢 Principiante · **Tiempo estimado:** 3–4 h

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
```

### ⚙️ JavaScript clave

```javascript
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
let filtroActual = 'todas';

function guardar() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function render() {
  const lista = document.getElementById('lista-tareas');
  lista.innerHTML = '';
  const filtradas = tareas.filter(t => {
    if (filtroActual === 'pendientes') return !t.completada;
    if (filtroActual === 'completadas') return t.completada;
    return true;
  });
  filtradas.forEach(t => {
    const li = document.createElement('li');
    li.dataset.id = t.id;
    li.innerHTML = `
      <input type="checkbox" ${t.completada ? 'checked' : ''}>
      <span>${t.texto}</span>
      <button class="btn-eliminar">🗑️</button>
    `;
    lista.appendChild(li);
  });
  const pend = tareas.filter(t => !t.completada).length;
  document.getElementById('contador').textContent = `Te quedan ${pend} tareas`;
}

document.getElementById('form-tarea').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('input-tarea');
  const texto = input.value.trim();
  if (!texto) return;
  tareas.push({ id: Date.now(), texto, completada: false });
  input.value = '';
  guardar();
  render();
});

document.getElementById('lista-tareas').addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;
  const id = Number(li.dataset.id);
  if (e.target.matches('input[type="checkbox"]')) {
    const t = tareas.find(t => t.id === id);
    t.completada = !t.completada;
    guardar();
    render();
  }
  if (e.target.matches('.btn-eliminar')) {
    tareas = tareas.filter(t => t.id !== id);
    guardar();
    render();
  }
});

document.querySelectorAll('[data-filtro]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-filtro]').forEach(b => b.classList.remove('activo'));
    btn.classList.add('activo');
    filtroActual = btn.dataset.filtro;
    render();
  });
});

render();
```

### 🚀 Pasos

1. Estructura HTML: input, botón, lista, filtros.
2. CSS con dos temas usando `data-theme="dark"`.
3. JS: función `render()` que repinte la lista desde un array.
4. Persistir con `localStorage.setItem('tareas', JSON.stringify(tareas))`.
5. Recuperar al cargar con `JSON.parse(localStorage.getItem('tareas'))`.

### ⚠️ Errores comunes

| Error | Por qué es malo |
| :--- | :--- |
| **Guardar objetos del DOM en `localStorage`** | Solo guarda strings. Usa `JSON.stringify` |
| **`innerHTML` con datos del usuario sin escapar** | Riesgo de XSS. Usa `textContent` o escapa |
| **`addEventListener` dentro de `render()`** | Los listeners se multiplican en cada repintado. Usa delegación |
| **No llamar a `render()` tras cambiar estado** | El usuario no ve el cambio |

### 🧪 Checklist de pruebas

- [ ] Añado tarea → aparece en la lista.
- [ ] Marco tarea → se tacha y desaparece de “Pendientes”.
- [ ] Desmarco → vuelve a aparecer.
- [ ] Elimino → desaparece.
- [ ] Recargo → todo sigue igual.
- [ ] Cambio filtro → solo veo las correspondientes.
- [ ] Modo oscuro se mantiene al recargar.
- [ ] Intento añadir tarea vacía → no se añade.

### 🚀 Extensiones

1. **Editar tarea** con doble clic.
2. **Drag & drop** para reordenar.
3. **Categorías** (trabajo, casa, personal).
4. **Fecha límite** con tareas vencidas en rojo.
5. **Exportar a JSON** con un botón.
6. **Conectar a una API** cuando hagas el [proyecto 5](#fullstack).

### 🔗 Enlaces

[Ver ejemplo en vivo](https://github.com/urukaisk-maker){ .md-button target=_blank }
[Ver ejercicio resuelto](ejercicios/04-javascript.md){ .md-button }

### 📚 Capítulos relacionados

- [04 — JavaScript esencial](capitulos/04-javascript.md)
- [06 — Formularios HTML](capitulos/06-formularios.md)
- [10 — Proyecto final: portfolio](capitulos/10-proyecto-final.md)

---

## 3. Buscador de películas con API {#peliculas}

**Cubre:** capítulos 08, 12, 16 · **Dificultad:** 🟡 Intermedio · **Tiempo estimado:** 5–7 h

!!! quote "Tu primera API real"
    Consumir una API es la puerta al desarrollo profesional. Aquí usas `fetch`, `async/await`, manejo de estados, `debounce` y `AbortController` en una sola app.

### 🎯 Qué vas a construir

Un buscador de películas con:

- Input con **debounce** de 300 ms.
- Grid de resultados con póster, título y año.
- Estados visuales: `loading`, `empty`, `error`.
- Paginación o scroll infinito (opcional).
- Manejo de errores de red y API key inválida.

### 🧠 Qué vas a aprender

- `fetch` + `async/await`.
- `AbortController` para cancelar peticiones.
- `debounce` para no saturar la API.
- Renderizado según estado (`loading` / `data` / `error` / `empty`).
- Manejo de API keys (nunca en el HTML público).
- Manejo de errores con `try/catch` y estados HTTP.

### 🛠️ Tecnologías

`JavaScript ES6+` · `fetch` · `OMDb API` · `Vite` (opcional)

### 📋 Requisitos mínimos

- [ ] Registro en [OMDb API](https://www.omdbapi.com/apikey.aspx){ target=_blank } para una API key gratuita.
- [ ] `fetch` a `https://www.omdbapi.com/?apikey=XXX&s=…`.
- [ ] Debounce en el input.
- [ ] Loading visible mientras se busca.
- [ ] Estados de error: sin red, API key inválida, sin resultados.
- [ ] Renderizado de póster, título y año.

### ⚙️ Fetch + debounce

```javascript
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

let controller = null;

async function buscar(termino) {
  if (controller) controller.abort();
  controller = new AbortController();

  if (!termino.trim()) {
    renderEmpty();
    return;
  }

  renderLoading();

  try {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(termino)}`;
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error('Error de red');
    const data = await res.json();
    if (data.Response === 'False') {
      renderError(data.Error);
    } else {
      renderResults(data.Search);
    }
  } catch (err) {
    if (err.name !== 'AbortError') renderError(err.message);
  }
}

document.getElementById('input-busqueda').addEventListener(
  'input',
  debounce(e => buscar(e.target.value), 300)
);
```

### 🚀 Pasos

1. Regístrate en OMDb y consigue tu API key.
2. Crea el HTML: input, contenedor de resultados, estados.
3. Implementa `debounce(fn, 300)`.
4. Escribe `async function buscar(termino)` con `AbortController`.
5. Renderiza según estado: `loading`, `data`, `error`, `empty`.
6. Prueba con búsquedas rápidas y lentas para verificar el debounce.

### ⚠️ Errores comunes

| Error | Por qué es malo |
| :--- | :--- |
| **Hardcodear la API key en el HTML público** | Es visible. En producción usa proxy o `.env` |
| **Sin debounce** | Cada tecla hace una petición → rate limiting |
| **Sin manejo de errores** | Si la API falla, el usuario ve una pantalla en blanco |
| **Sin `AbortController`** | Las respuestas llegan desordenadas con búsquedas rápidas |
| **No mostrar loading** | El usuario no sabe si la app está funcionando |

### 🧪 Checklist de pruebas

- [ ] Escribo `matrix` → aparecen resultados.
- [ ] Escribo rápido `m`, `ma`, `mat`, `matr`, `matrix` → solo 1 petición final.
- [ ] Busco algo que no existe (`asdfghjkl`) → mensaje “sin resultados”.
- [ ] Desconecto la red → mensaje de error claro.
- [ ] API key inválida → mensaje de error específico.
- [ ] Funciona en móvil.

### 🚀 Extensiones

1. **Scroll infinito** o paginación.
2. **Filtro por tipo** (película, serie, episodio).
3. **Ficha de detalle** al pinchar una tarjeta.
4. **Favoritos en `localStorage`**.
5. **Tests con Vitest** de la función `buscar()`.
6. **Skeleton loader** en vez de “Cargando…”.

### 🔗 Enlaces

[Ver ejemplo en vivo](https://github.com/urukaisk-maker){ .md-button target=_blank }
[Ver ejercicio resuelto](ejercicios/08-apis.md){ .md-button }

### 📚 Capítulos relacionados

- [08 — Consumo de APIs con fetch](capitulos/08-apis.md)
- [12 — JavaScript asíncrono](capitulos/12-javascript-asincrono.md)
- [16 — Testing frontend](capitulos/16-testing.md)

---

## 4. Blog estático {#blog}

**Cubre:** capítulos 07, 09, 11, 14 · **Dificultad:** 🟡 Intermedio · **Tiempo estimado:** 8–10 h

!!! quote "Tu primer blog"
    Un blog es la excusa perfecta para aprender Markdown, generadores estáticos y despliegue continuo. Además, escribir te obliga a **entender** lo que aprendes.

### 🎯 Qué vas a construir

Un blog con:

- 3 posts escritos en Markdown.
- Generador estático (Astro, Eleventy o Hugo).
- Home con listado de posts.
- Página individual por post.
- Despliegue automático en Netlify o Vercel.
- Accesibilidad WCAG AA.

### 🧠 Qué vas a aprender

- Markdown y frontmatter.
- Generadores estáticos.
- SEO básico (title, description, Open Graph).
- Despliegue continuo (push → build → deploy).
- Accesibilidad en contenido (encabezados jerárquicos, alt, contraste).
- Estructura de URLs limpias.

### 🛠️ Tecnologías

`Astro` o `Eleventy` o `Hugo` · `Markdown` · `Netlify` o `Vercel`

### 📋 Requisitos mínimos

- [ ] Home con listado de los 3 posts.
- [ ] Página individual por post con URL limpia (`/blog/mi-post/`).
- [ ] Markdown con frontmatter (`title`, `date`, `description`).
- [ ] SEO básico: `<title>`, `<meta description>`, Open Graph.
- [ ] Navegación entre posts.
- [ ] Despliegue automático al hacer push.

### 🧩 Estructura de un post

```markdown
---
title: "Mi primer post"
description: "Aprendiendo a crear un blog con Astro"
date: 2026-01-15
tags: [astro, markdown, blog]
---

# Mi primer post

Contenido en Markdown…

## Subsección

Más contenido.
```

### 📁 Estructura de carpetas (Astro)

```text
mi-blog/
├── src/
│   ├── content/
│   │   └── blog/
│   │       ├── primer-post.md
│   │       ├── segundo-post.md
│   │       └── tercer-post.md
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       ├── index.astro
│       └── blog/
│           └── [...slug].astro
└── astro.config.mjs
```

### 🚀 Pasos

1. Elige generador: [Astro](https://astro.build){ target=_blank } es la opción más moderna.
2. `npm create astro@latest` y configura el proyecto.
3. Escribe 3 posts en `src/content/blog/`.
4. Crea `index.astro` con el listado.
5. Crea `[...slug].astro` para las páginas individuales.
6. Conecta el repo a Netlify.
7. Añade dominio personalizado (opcional).

### ⚠️ Errores comunes

| Error | Por qué es malo |
| :--- | :--- |
| **Sin `<meta description>`** | Google no sabe de qué va el post |
| **Sin Open Graph** | No se ve preview al compartir en redes |
| **URLs con `.html`** | Se ven anticuadas. Usa rutas limpias |
| **No hacer deploy automático** | Cada post requiere subir archivos a mano |
| **Fuentes ilegibles** | Sin contraste, sin jerarquía tipográfica |

### 🧪 Checklist de pruebas

- [ ] Los 3 posts se ven bien.
- [ ] Las URLs son limpias (`/blog/post-1/`).
- [ ] El `<title>` de cada post es el del post (no el del sitio).
- [ ] Al compartir en Twitter/X aparece preview.
- [ ] Push a GitHub → deploy automático en Netlify.
- [ ] Lighthouse en “Accessibility” → ≥ 90.

### 🚀 Extensiones

1. **RSS feed** generado automáticamente.
2. **Buscador interno** con Pagefind.
3. **Comentarios con Giscus**.
4. **Modo oscuro** con toggle.
5. **Sitemap** automático.
6. **Analytics** con Plausible o Umami.

### 🔗 Enlaces

[Ver ejemplo en vivo](https://github.com/urukaisk-maker){ .md-button target=_blank }
[Ver ejercicio resuelto](ejercicios/09-despliegue.md){ .md-button }

### 📚 Capítulos relacionados

- [07 — Git y control de versiones](capitulos/07-git.md)
- [09 — Despliegue y hosting](capitulos/09-despliegue.md)
- [11 — CSS moderno](capitulos/11-css-moderno.md)
- [14 — Accesibilidad web](capitulos/14-accesibilidad.md)

---

## 5. App full-stack {#fullstack}

**Cubre:** capítulos 15, 18, 19, 20 · **Dificultad:** 🔴 Avanzado · **Tiempo estimado:** 20–30 h

!!! quote "El proyecto final"
    Frontend + backend + base de datos + autenticación + deploy + CI. Si terminas esto, tienes un portfolio real de nivel junior profesional.

### 🎯 Qué vas a construir

Una app full-stack con:

- **Frontend:** React + TypeScript + Vite.
- **Backend:** Node.js + Express.
- **Base de datos:** SQLite (o PostgreSQL).
- **Auth:** JWT + bcrypt.
- **Deploy:** frontend en Vercel, backend en Railway.
- **CI/CD:** GitHub Actions que ejecuten tests en cada PR.

### 🧠 Qué vas a aprender

- Arquitectura full-stack completa.
- Separación frontend/backend.
- Autenticación real con JWT.
- Conexión a base de datos.
- Variables de entorno y configuración por entorno.
- CORS, validación y manejo de errores.
- Deploy de frontend y backend independientes.
- CI con GitHub Actions.

### 🛠️ Tecnologías

`React` · `TypeScript` · `Vite` · `Node.js` · `Express` · `SQLite` · `JWT` · `Railway` · `Vercel` · `GitHub Actions`

### 📋 Requisitos mínimos

- [ ] CRUD completo desde el frontend.
- [ ] Autenticación con email + contraseña.
- [ ] Rutas protegidas (frontend redirige si no hay token).
- [ ] Variables de entorno en `.env` (nunca en el repo).
- [ ] Tests unitarios en backend.
- [ ] Deploy funcionando y accesible.
- [ ] CI que corra tests en cada PR.

### 🧩 Endpoint de ejemplo

```javascript
// backend/routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Faltan campos" });
  }
  const hash = await bcrypt.hash(password, 10);
  try {
    await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash]);
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(409).json({ error: "Email ya registrado" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (!user) return res.status(401).json({ error: "Credenciales inválidas" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });
  res.json({ token });
});

export default router;
```

### 🚀 Pasos

1. **Backend primero:** Express con `GET /tasks`, `POST /tasks`, etc.
2. **DB:** SQLite para empezar; migra a PostgreSQL cuando funcione.
3. **Auth:** bcrypt + JWT.
4. **Frontend:** React + Vite + TypeScript.
5. **Cliente HTTP:** `fetch` o Axios con interceptor de token.
6. **Deploy:** Railway para backend, Vercel para frontend.
7. **CI:** GitHub Actions que corra `npm test` en cada PR.

### ⚠️ Errores comunes

| Error | Por qué es malo |
| :--- | :--- |
| **`JWT_SECRET` en el repo** | Cualquiera puede firmar tokens falsos |
| **Sin CORS configurado** | El frontend no puede hablar con el backend |
| **Sin validación de inputs** | SQL injection, XSS, datos corruptos |
| **Sin tests** | Refactorizar es aterrador |
| **Sin manejo de errores centralizado** | Cada endpoint devuelve cosas distintas |
| **Deploy manual** | Un push debe desplegar solo |

### 🧪 Checklist de pruebas

- [ ] Registro con email nuevo → 201.
- [ ] Registro con email duplicado → 409.
- [ ] Login con credenciales malas → 401.
- [ ] Login correcto → token JWT válido.
- [ ] `GET /tasks` sin token → 401.
- [ ] `GET /tasks` con token → solo mis tareas.
- [ ] `POST /tasks` con token → crea la tarea.
- [ ] Frontend redirige a `/login` si no hay token.
- [ ] Push a `main` → deploy en Railway y Vercel.
- [ ] PR → CI corre tests.

### 🚀 Extensiones

1. **Refresh tokens** con expiración corta.
2. **Roles** (admin / usuario).
3. **Email de confirmación** al registrarse.
4. **Rate limiting** con `express-rate-limit`.
5. **Tests E2E** con Playwright.
6. **Docker Compose** para levantar todo en local.
7. **Migrar SQLite a PostgreSQL** con Prisma.

### 🔗 Enlaces

[Ver ejemplo en vivo](https://github.com/urukaisk-maker){ .md-button target=_blank }
[Ver ejercicio resuelto](ejercicios/19-fullstack-node.md){ .md-button }

### 📚 Capítulos relacionados

- [15 — TypeScript desde cero](capitulos/15-typescript.md)
- [18 — Arquitectura frontend](capitulos/18-arquitectura.md)
- [19 — Full-stack con Node.js](capitulos/19-fullstack-node.md)
- [20 — DevOps para frontend](capitulos/20-devops.md)

---

## 🎁 Cómo entregar tu proyecto

1. **Publícalo en GitHub** con un README claro.
2. **Despliégalo** en Netlify, Vercel o GitHub Pages.
3. **Compártelo** en el [Hall of Fame](hall-of-fame.md).
4. **Opcional:** escríbeme y lo destaco en el [Diario](diario.md).

!!! tip "Un proyecto terminado vale más que diez empezados"
    No esperes a tenerlo perfecto. Publica la v1, recibe feedback, mejora. Iterar es el trabajo real.

---

## 🚀 Siguiente

[Ir al Playground](playground.md){ .md-button }
[Ver ejercicios resueltos](ejercicios/index.md){ .md-button .md-button--primary }