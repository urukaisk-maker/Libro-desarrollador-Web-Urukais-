# 🧭 Guided Projects

!!! abstract "Learn by building"
    Five step-by-step projects designed so you can apply what you learn at each level. Each one includes goals, requirements, common pitfalls, a testing checklist, and the book chapters you need.

---

## 🎯 How to choose your project

| If you already know… | Start with… | Difficulty |
| :--- | :--- | :--- |
| Basic HTML and CSS | **Personal portfolio** | 🟢 Beginner |
| Basic JavaScript | **To-do list** | 🟢 Beginner |
| `fetch` and promises | **Movie search app** | 🟡 Intermediate |
| Git and deployment | **Static blog** | 🟡 Intermediate |
| All of the above | **Full-stack app** | 🔴 Advanced |

!!! tip "Golden rule"
    Do not start two projects at once. Finish one, ship it, and move to the next. That “done and shipped” feeling is what keeps momentum going.

---

## 1. Personal portfolio { #portfolio }

**Covers:** chapters 02, 03, 05, 09, 10 · **Difficulty:** 🟢 Beginner · **Estimated time:** 4–6 h

!!! quote "Your first real project"
    A portfolio is not just a gallery of screenshots. It is proof that you can build something working, deploy it, and explain how you built it. You do not need frameworks: semantic HTML, clean CSS, and 3 solid projects are enough.

### 🎯 What you will build

A single-column page with **6 required sections**:

| Section | What to include |
| :--- | :--- |
| **Hero** | Your name, role, and a concise line summarizing what you do |
| **About me** | 2–3 sentences: specialization, what motivates you, what you are learning now |
| **Projects** | 3 cards, each with title, description, stack, and **two links: live demo + code** |
| **Stack** | Technologies you use, with context (no fake skill bars) |
| **Contact** | Email, GitHub, and LinkedIn. A `mailto:` link or working form |
| **Footer** | Copyright and link to the portfolio repository itself |

### 🧠 What you will learn

- Semantic HTML structure (`<header>`, `<main>`, `<section>`, `<footer>`).
- Modern CSS: Flexbox, Grid, custom properties, fluid typography.
- Responsive layout without complex media queries.
- Deploying to GitHub Pages or Netlify.
- **Writing case studies** that explain your process, not just the result.

### 🛠 Technologies

`HTML5` · `CSS3` · `Git` · `GitHub Pages` or `Netlify`

### 📋 Minimum requirements

- [ ] All 6 sections from the table above.
- [ ] **3 real projects**, not tutorial clones.
- [ ] Each project with a **live demo** and **GitHub repo**.
- [ ] Responsive: looks good from 320px up to 1920px.
- [ ] `alt` text on all images and sufficient color contrast.
- [ ] Published with a real URL.

### 🚀 Steps

1. **Sketch on paper** (or Figma): draw the 6 sections before writing code.
2. Create `index.html` with semantic structure.
3. Create `styles.css` using `:root` custom properties.
4. Add sections one by one, testing in the browser.
5. Test in responsive mode (`Ctrl+Shift+M` in Chrome).
6. Deploy on GitHub Pages (`Settings → Pages → Branch: main`).
7. Add each project's case study in a `README.md` inside its repo.

### ⚠ Common pitfalls

| Pitfall | Why it hurts |
| :--- | :--- |
| **Broken links or dead demos** | If a recruiter clicks and nothing loads, the project “does not exist” |
| **Inflated stack** | Do not list 20 tools you cannot defend in an interview |
| **Progress bars like “React 75%”** | They mean nothing and look amateurish |
| **Generic uncustomized template** | It shows right away |
| **Never updating it** | A portfolio is a living CV. Review it every 3 months |

### 🧪 Testing checklist

- [ ] Open the URL on mobile → layout looks right.
- [ ] Click all 3 demo links → all load properly.
- [ ] Click all 3 GitHub links → all open the right repo.
- [ ] Contact email opens the mail client.
- [ ] Run Lighthouse “Accessibility” audit → ≥ 90.
- [ ] No placeholder “Lorem ipsum” text left behind.

### 🚀 Extensions

1. **Dark mode** using `prefers-color-scheme` or a manual toggle.
2. **Fetch repos from the GitHub API** instead of hardcoding them.
3. **Built-in blog** with 2–3 posts sharing what you learn.
4. **Downloadable CV** button in PDF.
5. **Entrance animations** with `IntersectionObserver`.

### 🔗 Links

[View starter template](https://github.com/brayandiazc/portfolio-template-basic){ .md-button target=_blank }
[View solved exercise](ejercicios/10-proyecto-final.md){ .md-button }

### 📚 Related chapters

- [02 — Basic HTML](capitulos/02-html-basico.md)
- [03 — Basic CSS](capitulos/03-css-basico.md)
- [05 — Responsive design](capitulos/05-responsive.md)
- [09 — Deployment and hosting](capitulos/09-despliegue.md)
- [10 — Final project: portfolio](capitulos/10-proyecto-final.md)

---

## 2. To-do list with localStorage { #tareas }

**Covers:** chapters 04, 06, 10 · **Difficulty:** 🟢 Beginner · **Estimated time:** 3–4 h

!!! quote "Your first full CRUD"
    Create, read, update, and delete. The most important pattern in programming. Here you build it **without frameworks**, using vanilla JavaScript and `localStorage`. Once you master this, you can build real apps.

### 🎯 What you will build

A task app with:

- 📝 Form to add tasks (input + button).
- ✅ Checkbox to mark completed (with visual strikethrough).
- 🗑 Delete button per task.
- 🔍 Filters: **All / Active / Completed**.
- 💾 Persistence in `localStorage` (survives page reloads).
- 🌙 Dark mode toggle.
- 📊 Remaining tasks counter.

### 🧠 What you will learn

- DOM manipulation: `createElement`, `appendChild`, `querySelector`.
- Events: `submit`, `click`, `change`.
- State stored in an array of objects and rendered from that state.
- `localStorage`: `setItem`, `getItem`, `JSON.stringify` / `JSON.parse`.
- Event delegation (for delete buttons).
- `data-*` attributes to connect DOM nodes with data.

### 🛠 Technologies

`HTML5` · `CSS3` · `JavaScript ES6+` · `localStorage`

### 📋 Minimum requirements

- [ ] Add a task from a `<form>` using `preventDefault()`.
- [ ] Mark as completed (strikethrough styling).
- [ ] Delete individual tasks.
- [ ] Working filters (all / active / completed).
- [ ] Persistence in `localStorage`.
- [ ] Persistent dark/light theme.
- [ ] Counter: "N tasks remaining".
- [ ] Validation: reject empty tasks.

### 🧩 HTML structure

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Tasks</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="app">
    <header class="app__header">
      <h1>📝 My Tasks</h1>
      <button id="toggle-theme" aria-label="Toggle theme">🌙</button>
    </header>

    <form id="form-tarea" class="app__form">
      <input
        type="text"
        id="input-tarea"
        placeholder="What do you need to do?"
        autocomplete="off"
        required
      >
      <button type="submit">Add</button>
    </form>

    <div class="app__filtros">
      <button data-filtro="todas" class="activo">All</button>
      <button data-filtro="pendientes">Active</button>
      <button data-filtro="completadas">Completed</button>
    </div>

    <p id="contador" class="app__contador"></p>
    <ul id="lista-tareas" class="app__lista"></ul>
  </main>

  <script src="app.js"></script>
</body>
</html>
```

### ⚙ Key JavaScript

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
      <button class="btn-eliminar">🗑</button>
    `;
    lista.appendChild(li);
  });
  const pend = tareas.filter(t => !t.completada).length;
  document.getElementById('contador').textContent = `${pend} tasks remaining`;
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

### 🚀 Steps

1. HTML structure: input, button, list, filters.
2. CSS with two themes using `data-theme="dark"`.
3. JS: `render()` function redrawing the list from an array.
4. Persist with `localStorage.setItem('tareas', JSON.stringify(tareas))`.
5. Restore on load with `JSON.parse(localStorage.getItem('tareas'))`.

### ⚠ Common pitfalls

| Pitfall | Why it hurts |
| :--- | :--- |
| **Storing DOM elements in `localStorage`** | Only strings are stored. Use `JSON.stringify` |
| **Unescaped `innerHTML` with user input** | XSS risk. Use `textContent` or escape input |
| **`addEventListener` inside `render()`** | Duplicate listeners stack on every re-render. Use event delegation |
| **Forgetting `render()` after state changes** | UI stays out of sync with state |

### 🧪 Testing checklist

- [ ] Add a task → appears in the list.
- [ ] Check a task → gets strikethrough and leaves “Active”.
- [ ] Uncheck it → returns to “Active”.
- [ ] Delete it → disappears from list.
- [ ] Reload page → state stays intact.
- [ ] Switch filter → only matching tasks show.
- [ ] Dark mode persists across reloads.
- [ ] Try adding an empty task → rejected.

### 🚀 Extensions

1. **Edit task** on double click.
2. **Drag & drop** to reorder items.
3. **Categories** (work, home, personal).
4. **Due dates** highlighting overdue tasks.
5. **Export to JSON** via a button.
6. **Connect to a backend API** when building [project 5](#fullstack).

### 🔗 Links

[View live example](https://github.com/urukaisk-maker){ .md-button target=_blank }
[View solved exercise](ejercicios/04-javascript.md){ .md-button }

### 📚 Related chapters

- [04 — Essential JavaScript](capitulos/04-javascript.md)
- [06 — HTML forms](capitulos/06-formularios.md)
- [10 — Final project: portfolio](capitulos/10-proyecto-final.md)

---

## 3. Movie search app with API { #peliculas }

**Covers:** chapters 08, 12, 16 · **Difficulty:** 🟡 Intermediate · **Estimated time:** 5–7 h

!!! quote "Your first real API"
    Consuming an API is the gateway to professional development. Here you combine `fetch`, `async/await`, UI states, `debounce`, and `AbortController` in a single app.

### 🎯 What you will build

A movie search app featuring:

- Input with a 300 ms **debounce**.
- Results grid with poster, title, and year.
- Visual states: `loading`, `empty`, `error`.
- Pagination or infinite scroll (optional).
- Handling network errors and invalid API keys.

### 🧠 What you will learn

- `fetch` + `async/await`.
- `AbortController` to cancel stale requests.
- `debounce` to avoid flooding the API.
- State-driven rendering (`loading` / `data` / `error` / `empty`).
- API key handling (never expose secrets in public HTML).
- Error handling with `try/catch` and HTTP status checks.

### 🛠 Technologies

`JavaScript ES6+` · `fetch` · `OMDb API` · `Vite` (optional)

### 📋 Minimum requirements

- [ ] Sign up on [OMDb API](https://www.omdbapi.com/apikey.aspx){ target=_blank } for a free API key.
- [ ] `fetch` against `https://www.omdbapi.com/?apikey=XXX&s=…`.
- [ ] Debounced search input.
- [ ] Visible loading state while searching.
- [ ] Error states: offline/network failure, invalid API key, no results.
- [ ] Render poster, title, and year.

### ⚙ Fetch + debounce

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
    if (!res.ok) throw new Error('Network error');
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

### 🚀 Steps

1. Sign up on OMDb and get your API key.
2. Build the HTML: search input, results container, status states.
3. Implement `debounce(fn, 300)`.
4. Write `async function buscar(termino)` using `AbortController`.
5. Render each state: `loading`, `data`, `error`, `empty`.
6. Test fast vs. slow typing to verify debounce behavior.

### ⚠ Common pitfalls

| Pitfall | Why it hurts |
| :--- | :--- |
| **Hardcoding API keys in public HTML** | Easily exposed. In production use a backend proxy or `.env` |
| **No debounce** | Every keystroke triggers a request → rate limiting |
| **Missing error handling** | API failures leave a blank screen |
| **No `AbortController`** | Out-of-order responses arrive on fast typing |
| **No loading indicator** | Users cannot tell if the search is running |

### 🧪 Testing checklist

- [ ] Type `matrix` → results appear.
- [ ] Type quickly `m`, `ma`, `mat`, `matr`, `matrix` → only 1 final request.
- [ ] Search non-existent query (`asdfghjkl`) → “no results” message.
- [ ] Disconnect network → clear error message.
- [ ] Invalid API key → specific error feedback.
- [ ] Works on mobile screens.

### 🚀 Extensions

1. **Infinite scroll** or pagination.
2. **Filter by type** (movie, series, episode).
3. **Detail modal/view** when clicking a card.
4. **Favorites saved in `localStorage`**.
5. **Unit tests with Vitest** for `buscar()`.
6. **Skeleton loader** instead of “Loading…”.

### 🔗 Links

[View live example](https://github.com/urukaisk-maker){ .md-button target=_blank }
[View solved exercise](ejercicios/08-apis.md){ .md-button }

### 📚 Related chapters

- [08 — Consuming APIs with fetch](capitulos/08-apis.md)
- [12 — Asynchronous JavaScript](capitulos/12-javascript-asincrono.md)
- [16 — Frontend testing](capitulos/16-testing.md)

---

## 4. Static blog { #blog }

**Covers:** chapters 07, 09, 11, 14 · **Difficulty:** 🟡 Intermediate · **Estimated time:** 8–10 h

!!! quote "Your first blog"
    A blog is the ideal excuse to learn Markdown, static site generators, and continuous deployment. Plus, writing forces you to **truly understand** what you learn.

### 🎯 What you will build

A blog featuring:

- 3 posts written in Markdown.
- Static site generator (Astro, Eleventy, or Hugo).
- Home page listing posts.
- Individual page per post.
- Automatic deployment on Netlify or Vercel.
- WCAG AA accessibility.

### 🧠 What you will learn

- Markdown and frontmatter.
- Static site generators.
- Basic SEO (title, description, Open Graph).
- Continuous deployment (`push → build → deploy`).
- Accessible content (heading hierarchy, `alt`, contrast).
- Clean URL structure.

### 🛠 Technologies

`Astro` or `Eleventy` or `Hugo` · `Markdown` · `Netlify` or `Vercel`

### 📋 Minimum requirements

- [ ] Home page listing the 3 posts.
- [ ] Individual page per post with clean URL (`/blog/my-post/`).
- [ ] Markdown files with frontmatter (`title`, `date`, `description`).
- [ ] Basic SEO: `<title>`, `<meta description>`, Open Graph.
- [ ] Navigation between posts.
- [ ] Automatic deployment on git push.

### 🧩 Post structure

```markdown
---
title: "My first post"
description: "Learning to build a blog with Astro"
date: 2026-01-15
tags: [astro, markdown, blog]
---

# My first post

Markdown content…

## Subsection

More content.
```

### 📁 Folder structure (Astro)

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

### 🚀 Steps

1. Pick a generator: [Astro](https://astro.build){ target=_blank } is a modern default choice.
2. Run `npm create astro@latest` and configure the project.
3. Write 3 posts in `src/content/blog/`.
4. Create `index.astro` with the post list.
5. Create `[...slug].astro` for individual post pages.
6. Connect the repo to Netlify.
7. Add a custom domain (optional).

### ⚠ Common pitfalls

| Pitfall | Why it hurts |
| :--- | :--- |
| **Missing `<meta description>`** | Search engines lack post summary context |
| **Missing Open Graph tags** | Link previews look broken on social media |
| **Exposed `.html` URLs** | Dated look; prefer clean routes |
| **Manual deploys** | Every post requires uploading files by hand |
| **Hard-to-read typography** | Poor contrast or unclear heading hierarchy |

### 🧪 Testing checklist

- [ ] All 3 posts render properly.
- [ ] Clean URLs (`/blog/post-1/`).
- [ ] Each post sets its own `<title>` (not just the site title).
- [ ] Sharing on Twitter/X renders a preview card.
- [ ] Push to GitHub → automatic deploy on Netlify.
- [ ] Lighthouse “Accessibility” audit → ≥ 90.

### 🚀 Extensions

1. **RSS feed** generated automatically.
2. **Client-side search** with Pagefind.
3. **Comments** with Giscus.
4. **Dark mode** toggle.
5. **Automatic sitemap**.
6. **Privacy-friendly analytics** with Plausible or Umami.

### 🔗 Links

[View live example](https://github.com/urukaisk-maker){ .md-button target=_blank }
[View solved exercise](ejercicios/09-despliegue.md){ .md-button }

### 📚 Related chapters

- [07 — Git and version control](capitulos/07-git.md)
- [09 — Deployment and hosting](capitulos/09-despliegue.md)
- [11 — Modern CSS](capitulos/11-css-moderno.md)
- [14 — Web accessibility](capitulos/14-accesibilidad.md)

---

## 5. Full-stack app { #fullstack }

**Covers:** chapters 15, 18, 19, 20 · **Difficulty:** 🔴 Advanced · **Estimated time:** 20–30 h

!!! quote "The capstone project"
    Frontend + backend + database + auth + deployment + CI. Finish this and you have a solid junior-level portfolio project.

### 🎯 What you will build

A full-stack app with:

- **Frontend:** React + TypeScript + Vite.
- **Backend:** Node.js + Express.
- **Database:** SQLite (or PostgreSQL).
- **Auth:** JWT + bcrypt.
- **Deploy:** frontend on Vercel, backend on Railway.
- **CI/CD:** GitHub Actions running tests on every PR.

### 🧠 What you will learn

- End-to-end full-stack architecture.
- Frontend/backend separation.
- Real authentication with JWT.
- Database integration.
- Environment variables and per-environment config.
- CORS, validation, and error handling.
- Independent frontend and backend deployments.
- CI with GitHub Actions.

### 🛠 Technologies

`React` · `TypeScript` · `Vite` · `Node.js` · `Express` · `SQLite` · `JWT` · `Railway` · `Vercel` · `GitHub Actions`

### 📋 Minimum requirements

- [ ] Full CRUD from the frontend.
- [ ] Email + password authentication.
- [ ] Protected routes (frontend redirects when unauthenticated).
- [ ] Environment variables in `.env` (never committed).
- [ ] Backend unit tests.
- [ ] Live deployment accessible online.
- [ ] CI running tests on each PR.

### 🧩 Example endpoint

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
    return res.status(400).json({ error: "Missing fields" });
  }
  const hash = await bcrypt.hash(password, 10);
  try {
    await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash]);
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(409).json({ error: "Email already registered" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });
  res.json({ token });
});

export default router;
```

### 🚀 Steps

1. **Backend first:** Express with `GET /tasks`, `POST /tasks`, etc.
2. **Database:** start with SQLite; migrate to PostgreSQL once working.
3. **Auth:** bcrypt + JWT.
4. **Frontend:** React + Vite + TypeScript.
5. **HTTP client:** `fetch` or Axios with token handling.
6. **Deploy:** Railway for backend, Vercel for frontend.
7. **CI:** GitHub Actions running `npm test` on each PR.

### ⚠ Common pitfalls

| Pitfall | Why it hurts |
| :--- | :--- |
| **`JWT_SECRET` in the repo** | Anyone can forge valid tokens |
| **Missing CORS config** | Frontend cannot communicate with backend |
| **Missing input validation** | SQL injection, XSS, corrupted records |
| **No tests** | Refactoring feels risky |
| **Inconsistent error responses** | Each route returns a different error shape |
| **Manual deployments** | Pushing should trigger deployment automatically |

### 🧪 Testing checklist

- [ ] Register with new email → 201.
- [ ] Register with duplicate email → 409.
- [ ] Login with bad credentials → 401.
- [ ] Valid login → valid JWT token.
- [ ] `GET /tasks` without token → 401.
- [ ] `GET /tasks` with token → only my tasks.
- [ ] `POST /tasks` with token → creates task.
- [ ] Frontend redirects to `/login` when unauthenticated.
- [ ] Push to `main` → deploys to Railway and Vercel.
- [ ] PR → CI runs tests.

### 🚀 Extensions

1. **Refresh tokens** with short expiration.
2. **Roles** (admin / user).
3. **Confirmation email** on sign-up.
4. **Rate limiting** with `express-rate-limit`.
5. **E2E tests** with Playwright.
6. **Docker Compose** to run the stack locally.
7. **Migrate SQLite to PostgreSQL** with Prisma.

### 🔗 Links

[View live example](https://github.com/urukaisk-maker){ .md-button target=_blank }
[View solved exercise](ejercicios/19-fullstack-node.md){ .md-button }

### 📚 Related chapters

- [15 — TypeScript from scratch](capitulos/15-typescript.md)
- [18 — Frontend architecture](capitulos/18-arquitectura.md)
- [19 — Full-stack with Node.js](capitulos/19-fullstack-node.md)
- [20 — Frontend DevOps](capitulos/20-devops.md)

---

## 🎁 How to submit your project

1. **Publish it on GitHub** with a clear README.
2. **Deploy it** on Netlify, Vercel, or GitHub Pages.
3. **Share it** in the [Hall of Fame](hall-of-fame.md).
4. **Optional:** message me and I will highlight it in the [Journal](diario.md).

!!! tip "A finished project beats ten half-built ones"
    Do not wait for perfection. Ship v1, gather feedback, iterate. Iterating is the real job.

---

## 🚀 Next

[Go to Playground](playground.md){ .md-button }
[View solved exercises](ejercicios/index.md){ .md-button .md-button--primary }
