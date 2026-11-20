---
description: "Chapter 10 of the Web Developer's Book: 10 — Final Project: Portfolio. Learn step by step with examples, exercises, and quizzes."
---
# 10 — Final Project: Portfolio

!!! abstract "What you will learn"
    - Plan a real project from start to finish.
    - Structure a professional portfolio.
    - Apply everything learned in previous chapters.
    - Deploy it to production.

---

## 🎯 The Project

You are going to build your **personal portfolio**: a website that shows who you are, what you know how to do, and what you have built. It is the most important project of the Intermediate Level because it is your introduction to the world.

!!! quote "Your portfolio is your living résumé"
    Recruiters don't read résumés: they look at portfolios. A good portfolio is worth more than 10 certificates.

---

## 📋 Requirements

Your portfolio should include:

- **Hero** with your name, role, and a call to action.
- **About me**: who you are, what you do, what excites you.
- **Projects**: at least 3, with a screenshot, description, and link.
- **Skills**: technologies you know well.
- **Contact**: email, GitHub, LinkedIn.
- **Responsive design**: looks good on mobile and desktop.
- **Dark/light mode** (optional, but highly valued).

---

## 🏗 Project Structure

```
portfolio/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── favicon.svg
    ├── portada.jpg
    └── proyectos/
        ├── proyecto-1.jpg
        ├── proyecto-2.jpg
        └── proyecto-3.jpg
```

---

## 🧱 Step 1: Semantic HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ana García — Frontend Developer</title>
  <meta name="description" content="Portfolio of Ana García, frontend developer specialized in JavaScript and accessibility.">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <nav class="nav">
      <a href="#inicio" class="nav__logo">Ana García</a>
      <ul class="nav__links">
        <li><a href="#sobre-mi">About me</a></li>
        <li><a href="#proyectos">Projects</a></li>
        <li><a href="#contacto">Contact</a></li>
      </ul>
      <button id="tema" class="nav__tema" aria-label="Change theme">🌙</button>
    </nav>
  </header>

  <main>
    <section id="inicio" class="hero">
      <div class="hero__content">
        <p class="hero__saludo">👋 Hi, I'm</p>
        <h1 class="hero__nombre">Ana García</h1>
        <p class="hero__rol">Frontend Developer</p>
        <p class="hero__desc">I build accessible, fast, and clean interfaces with HTML, CSS, and JavaScript.</p>
        <div class="hero__cta">
          <a href="#proyectos" class="btn btn--primary">See projects</a>
          <a href="#contacto" class="btn">Contact</a>
        </div>
      </div>
    </section>

    <section id="sobre-mi" class="section">
      <h2 class="section__title">About me</h2>
      <p>I am a frontend developer with 2 years of experience. I specialize in modern JavaScript, accessibility, and web performance.</p>
    </section>

    <section id="proyectos" class="section">
      <h2 class="section__title">Projects</h2>
      <div class="proyectos">
        <article class="proyecto">
          <img src="assets/proyectos/proyecto-1.jpg" alt="Screenshot of project 1" loading="lazy">
          <h3>Task list</h3>
          <p>App to manage tasks with localStorage and dark mode.</p>
          <div class="proyecto__tech">
            <span>HTML</span><span>CSS</span><span>JS</span>
          </div>
          <a href="#" class="proyecto__link">View project →</a>
        </article>
        <!-- more projects -->
      </div>
    </section>

    <section id="contacto" class="section">
      <h2 class="section__title">Contact</h2>
      <p>Want to work together? Write to me at <a href="mailto:ana@ejemplo.com">ana@ejemplo.com</a>.</p>
    </section>
  </main>

  <footer class="footer">
    <p>© 2026 Ana García. Made with ❤ and lots of ☕.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

---

## 🎨 Step 2: CSS

```css
:root {
  --bg: #f8f7fb;
  --fg: #1f1c2e;
  --muted: #5c5870;
  --primary: #6a5acd;
  --border: #e0dde8;
}

[data-theme="dark"] {
  --bg: #1a1726;
  --fg: #e8e5f5;
  --muted: #b8b5c8;
  --border: #3a3550;
}

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--bg);
  color: var(--fg);
  line-height: 1.6;
  transition: background .2s, color .2s;
}

.header {
  position: sticky;
  top: 0;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  z-index: 10;
}

.nav {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav__logo {
  font-weight: 800;
  color: var(--primary);
  text-decoration: none;
}

.nav__links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0 auto 0 0;
  padding: 0;
}

.nav__links a {
  color: var(--fg);
  text-decoration: none;
  font-weight: 500;
}

.nav__links a:hover { color: var(--primary); }

.nav__tema {
  background: none;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: .35rem .55rem;
  cursor: pointer;
  font-size: 1rem;
}

.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  padding: 2rem 1rem;
  max-width: 1100px;
  margin: 0 auto;
}

.hero__saludo { color: var(--muted); margin: 0; }
.hero__nombre {
  font-size: clamp(2rem, 6vw, 4rem);
  margin: .25rem 0;
  line-height: 1.1;
}
.hero__rol { color: var(--primary); font-weight: 700; font-size: 1.2rem; margin: 0 0 1rem; }
.hero__desc { color: var(--muted); max-width: 500px; margin-bottom: 2rem; }
.hero__cta { display: flex; gap: 1rem; flex-wrap: wrap; }

.btn {
  display: inline-block;
  padding: .75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  border: 1px solid var(--border);
  color: var(--fg);
  transition: all .2s;
}

.btn--primary {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}

.btn:hover { transform: translateY(-2px); }

.section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 1rem;
}

.section__title {
  font-size: 2rem;
  margin: 0 0 2rem;
  color: var(--primary);
}

.proyectos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.proyecto {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem;
  transition: transform .2s, box-shadow .2s;
}

.proyecto:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(106, 90, 205, .15);
}

.proyecto img {
  width: 100%;
  border-radius: 8px;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.proyecto h3 { margin: .75rem 0 .25rem; }
.proyecto p { color: var(--muted); font-size: .9rem; }

.proyecto__tech {
  display: flex;
  gap: .35rem;
  flex-wrap: wrap;
  margin: .5rem 0;
}

.proyecto__tech span {
  font-size: .7rem;
  padding: .2rem .5rem;
  background: var(--primary);
  color: #fff;
  border-radius: 999px;
}

.proyecto__link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
}

.footer {
  text-align: center;
  padding: 2rem;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: .85rem;
}

@media (max-width: 640px) {
  .nav__links { display: none; }
  .hero { min-height: auto; padding-top: 3rem; }
}
```

---

## ⚡ Step 3: JavaScript (Dark Mode)

```javascript
const btnTema = document.getElementById('tema');
const temaGuardado = localStorage.getItem('tema');

if (temaGuardado === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  btnTema.textContent = '☀';
}

btnTema.addEventListener('click', () => {
  const actual = document.documentElement.getAttribute('data-theme');
  const nuevo = actual === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nuevo);
  localStorage.setItem('tema', nuevo);
  btnTema.textContent = nuevo === 'dark' ? '☀' : '🌙';
});
```

---

## 🚀 Step 4: Deploy

Follow the steps in [Chapter 09](09-despliegue.md) to deploy to GitHub Pages or Netlify.

Your portfolio will live at:

- `https://tu-usuario.github.io/portfolio/` (GitHub Pages)
- `https://tu-portfolio.netlify.app` (Netlify)

---

## ✅ Delivery Checklist

Before considering the project finished:

- [ ] **HTML is semantic** (`header`, `nav`, `main`, `section`, `footer`).
- [ ] **CSS uses variables** and is responsive.
- [ ] **Dark mode** works and is saved in localStorage.
- [ ] **Images have descriptive alt** text.
- [ ] **Links work** (no empty `href="#"`).
- [ ] **Contrast** meets WCAG AA.
- [ ] **Lighthouse** scores above 90 in Performance, Accessibility, Best Practices, and SEO.
- [ ] The project is **deployed** and publicly accessible.

---

## 🏆 You Finished the Intermediate Level!

If you made it this far, you already know:

- HTML, CSS, and JavaScript
- Responsive design
- Accessible forms
- Git and GitHub
- Consuming APIs
- Production deployment
- And you have your first portfolio online

!!! quote "Congratulations"
    You went from starting from scratch to having a professional portfolio online. That is a huge milestone. Next comes the **Advanced Level**: modern CSS, asynchronous JavaScript, TypeScript, testing, and architecture.

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-10">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What should a professional portfolio include?</p>
<button class="quiz-option" data-opt="a">A) Only a photo and an email</button>
<button class="quiz-option" data-opt="b">B) Hero, about me, projects, skills, and contact</button>
<button class="quiz-option" data-opt="c">C) Only the projects</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which hosting is ideal for a static portfolio?</p>
<button class="quiz-option" data-opt="a">A) GitHub Pages or Netlify</button>
<button class="quiz-option" data-opt="b">B) AWS EC2</button>
<button class="quiz-option" data-opt="c">C) Your own physical server</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=I%20finished%20the%20Intermediate%20Level%20of%20the%20Web%20Developer%27s%20Book%20%F0%9F%8E%89&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F10-proyecto-final%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F10-proyecto-final%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=I%20finished%20the%20Intermediate%20Level%20of%20the%20Web%20Developer%27s%20Book%20%F0%9F%8E%89%20https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F10-proyecto-final%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/10-proyecto-final/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 11 — CSS moderno](11-css-moderno.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }