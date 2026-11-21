# 📁 Reader Projects

!!! quote "What the community is building"
    This is the showcase of projects built by readers of the book. Browse what others have made, get inspired, and share your own. Any project is welcome—from a simple personal page to a full app.

---

## 🎯 What is this page?

A showcase of projects created by readers of the book while learning. Each entry includes:

- **Title** and short description
- **Book level** it fits into
- **Technologies** used
- **Link** to the project (live demo, repo, CodePen…)
- **Author** (with a link to their profile if they choose)

!!! tip "Want to be featured here?"
    If you built something with what you learned in the book, [submit your project](#enviar-proyecto) using the form below. It can be a personal project, an exercise, a challenge, or something brand new.

---

## 🌟 Featured projects

<div class="proyectos-grid">

<div class="proyecto-card">
<div class="proyecto-card__nivel">🟢 Beginner</div>
<h3 class="proyecto-card__titulo">My first personal page</h3>
<p class="proyecto-card__desc">An introduction page with HTML and CSS featuring about me, projects, and contact sections.</p>
<div class="proyecto-card__tech">
<span class="proyecto-tag">HTML</span>
<span class="proyecto-tag">CSS</span>
</div>
<a href="#" class="proyecto-card__link">View project →</a>
<div class="proyecto-card__autor">by <a href="#">@urukaisk</a></div>
</div>

<div class="proyecto-card">
<div class="proyecto-card__nivel">🟡 Intermediate</div>
<h3 class="proyecto-card__titulo">To-do list with localStorage</h3>
<p class="proyecto-card__desc">A task manager app with browser persistence, filters, and dark mode.</p>
<div class="proyecto-card__tech">
<span class="proyecto-tag">HTML</span>
<span class="proyecto-tag">CSS</span>
<span class="proyecto-tag">JavaScript</span>
</div>
<a href="#" class="proyecto-card__link">View project →</a>
<div class="proyecto-card__autor">by <a href="#">@urukaisk</a></div>
</div>

<div class="proyecto-card">
<div class="proyecto-card__nivel">🟠 Advanced</div>
<h3 class="proyecto-card__titulo">Movie search app with API</h3>
<p class="proyecto-card__desc">An app consuming the OMDb API to search movies, with debounce and error handling.</p>
<div class="proyecto-card__tech">
<span class="proyecto-tag">JavaScript</span>
<span class="proyecto-tag">API</span>
<span class="proyecto-tag">Vite</span>
</div>
<a href="#" class="proyecto-card__link">View project →</a>
<div class="proyecto-card__autor">by <a href="#">@urukaisk</a></div>
</div>

<div class="proyecto-card">
<div class="proyecto-card__nivel">🔴 Professional</div>
<h3 class="proyecto-card__titulo">REST task API with Node.js</h3>
<p class="proyecto-card__desc">A REST API with Express, PostgreSQL, and JWT authentication, deployed on Railway.</p>
<div class="proyecto-card__tech">
<span class="proyecto-tag">Node.js</span>
<span class="proyecto-tag">Express</span>
<span class="proyecto-tag">PostgreSQL</span>
</div>
<a href="#" class="proyecto-card__link">View project →</a>
<div class="proyecto-card__autor">by <a href="#">@urukaisk</a></div>
</div>

<div class="proyecto-card">
<div class="proyecto-card__nivel">🟣 Expert</div>
<h3 class="proyecto-card__titulo">Recipe PWA</h3>
<p class="proyecto-card__desc">An installable PWA with offline support, push notifications, and service worker caching.</p>
<div class="proyecto-card__tech">
<span class="proyecto-tag">PWA</span>
<span class="proyecto-tag">Service Worker</span>
<span class="proyecto-tag">Vite</span>
</div>
<a href="#" class="proyecto-card__link">View project →</a>
<div class="proyecto-card__autor">by <a href="#">@urukaisk</a></div>
</div>

<div class="proyecto-card">
<div class="proyecto-card__nivel">🚀 Vanguard</div>
<h3 class="proyecto-card__titulo">Micro-frontend with Module Federation</h3>
<p class="proyecto-card__desc">A micro-frontend example with Vite, Module Federation, and edge deployment.</p>
<div class="proyecto-card__tech">
<span class="proyecto-tag">Vite</span>
<span class="proyecto-tag">Module Federation</span>
<span class="proyecto-tag">Edge</span>
</div>
<a href="#" class="proyecto-card__link">View project →</a>
<div class="proyecto-card__autor">by <a href="#">@urukaisk</a></div>
</div>

</div>

!!! note "Example projects"
    The projects above are **examples** to show the layout format. Once the community starts submitting real projects, they will be replaced by actual submissions.

---

## 📊 Filter by level

<div class="proyectos-filtros">
<button class="proyecto-filtro is-active" data-nivel="todos">All</button>
<button class="proyecto-filtro" data-nivel="principiante">🟢 Beginner</button>
<button class="proyecto-filtro" data-nivel="intermedio">🟡 Intermediate</button>
<button class="proyecto-filtro" data-nivel="avanzado">🟠 Advanced</button>
<button class="proyecto-filtro" data-nivel="profesional">🔴 Professional</button>
<button class="proyecto-filtro" data-nivel="experto">🟣 Expert</button>
<button class="proyecto-filtro" data-nivel="vanguardia">🚀 Vanguard</button>
</div>

---

## 📬 Submit a project { #enviar-proyecto }

Built something you want to share? Fill out the form and I will add it to the gallery (as long as it follows the basic rules: it is yours, it works, and it is respectful).

<form class="proyecto-form" action="https://formspree.io/f/TU_FORM_ID" method="POST">
  <div class="proyecto-field">
    <label for="proyecto-titulo">Project title <span class="required">*</span></label>
    <input type="text" id="proyecto-titulo" name="titulo" required placeholder="E.g.: To-do list with localStorage">
  </div>

  <div class="proyecto-field">
    <label for="proyecto-desc">Short description <span class="required">*</span></label>
    <textarea id="proyecto-desc" name="descripcion" rows="3" required placeholder="Tell us what your project does in 2–3 sentences…"></textarea>
  </div>

  <div class="proyecto-field">
    <label for="proyecto-url">Project URL <span class="required">*</span></label>
    <input type="url" id="proyecto-url" name="url" required placeholder="https://your-project.com">
  </div>

  <div class="proyecto-field">
    <label for="proyecto-repo">Repository (optional)</label>
    <input type="url" id="proyecto-repo" name="repo" placeholder="https://github.com/your-username/your-project">
  </div>

  <div class="proyecto-field">
    <label for="proyecto-nivel">Book level <span class="required">*</span></label>
    <select id="proyecto-nivel" name="nivel" required>
      <option value="">— Select a level —</option>
      <option value="principiante">🟢 Beginner</option>
      <option value="intermedio">🟡 Intermediate</option>
      <option value="avanzado">🟠 Advanced</option>
      <option value="profesional">🔴 Professional</option>
      <option value="experto">🟣 Expert</option>
      <option value="vanguardia">🚀 Vanguard</option>
    </select>
  </div>

  <div class="proyecto-field">
    <label for="proyecto-tech">Technologies used <span class="required">*</span></label>
    <input type="text" id="proyecto-tech" name="tech" required placeholder="E.g.: HTML, CSS, JavaScript">
  </div>

  <div class="proyecto-field">
    <label for="proyecto-autor">Your name or handle <span class="required">*</span></label>
    <input type="text" id="proyecto-autor" name="autor" required placeholder="E.g.: @your-handle">
  </div>

  <button type="submit" class="md-button md-button--primary">📤 Submit project</button>
</form>

!!! note "Form not working?"
    If the form does not respond (for instance if Formspree is down or the form ID is a placeholder), email me directly at [contacto@urukais.com](mailto:contacto@urukais.com) with your project details.

---

## 📜 Gallery rules

For a project to be listed on this page, it must:

- ✅ **Be yours** (or have permission from the original author).
- ✅ **Work properly** (no major broken functionality).
- ✅ **Be respectful** (no offensive, violent, or illegal content).
- ✅ **Relate to web development** (even tangentially).
- ❌ **Not be** generated entirely by AI without meaningful human contribution.
- ❌ **Not be** promotional spam or sales pitches.

---

## ➡ Next steps

[🧭 View guided projects](proyectos-guiados.md){ .md-button .md-button--primary }
[🎯 View weekly challenges](retos.md){ .md-button }
[🏆 View my achievements](logros.md){ .md-button }
