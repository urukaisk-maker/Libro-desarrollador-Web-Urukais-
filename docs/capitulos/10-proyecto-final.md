# 10 — Proyecto final: portfolio

!!! abstract "Qué vas a aprender"
    - Planificar un proyecto real de principio a fin.
    - Estructurar un portfolio profesional.
    - Aplicar todo lo aprendido en los capítulos anteriores.
    - Desplegarlo en producción.

---

## 🎯 El proyecto

Vas a construir tu **portfolio personal**: una web que muestre quién eres, qué sabes hacer y qué has construido. Es el proyecto más importante del Nivel Intermedio, porque es tu carta de presentación al mundo.

!!! quote "Tu portfolio es tu currículum vivo"
    Los reclutadores no leen currículums: miran portfolios. Un buen portfolio vale más que 10 certificados.

---

## 📋 Requisitos

Tu portfolio debe incluir:

- **Hero** con tu nombre, rol y una llamada a la acción.
- **Sobre mí**: quién eres, qué haces, qué te apasiona.
- **Proyectos**: al menos 3, con captura, descripción y enlace.
- **Habilidades**: tecnologías que dominas.
- **Contacto**: email, GitHub, LinkedIn.
- **Diseño responsive**: se ve bien en móvil y escritorio.
- **Modo oscuro/claro** (opcional, pero muy valorado).

---

## 🏗️ Estructura del proyecto

\`\`\`
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
\`\`\`

---

## 🧱 Paso 1: HTML semántico

\`\`\`html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ana García — Desarrolladora Frontend</title>
  <meta name="description" content="Portfolio de Ana García, desarrolladora frontend especializada en JavaScript y accesibilidad.">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <nav class="nav">
      <a href="#inicio" class="nav__logo">Ana García</a>
      <ul class="nav__links">
        <li><a href="#sobre-mi">Sobre mí</a></li>
        <li><a href="#proyectos">Proyectos</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
      <button id="tema" class="nav__tema" aria-label="Cambiar tema">🌙</button>
    </nav>
  </header>

  <main>
    <section id="inicio" class="hero">
      <div class="hero__content">
        <p class="hero__saludo">👋 Hola, soy</p>
        <h1 class="hero__nombre">Ana García</h1>
        <p class="hero__rol">Desarrolladora Frontend</p>
        <p class="hero__desc">Construyo interfaces accesibles, rápidas y bonitas con HTML, CSS y JavaScript.</p>
        <div class="hero__cta">
          <a href="#proyectos" class="btn btn--primary">Ver proyectos</a>
          <a href="#contacto" class="btn">Contactar</a>
        </div>
      </div>
    </section>

    <section id="sobre-mi" class="section">
      <h2 class="section__title">Sobre mí</h2>
      <p>Soy desarrolladora frontend con 2 años de experiencia. Me especializo en JavaScript moderno, accesibilidad y rendimiento web.</p>
    </section>

    <section id="proyectos" class="section">
      <h2 class="section__title">Proyectos</h2>
      <div class="proyectos">
        <article class="proyecto">
          <img src="assets/proyectos/proyecto-1.jpg" alt="Captura del proyecto 1" loading="lazy">
          <h3>Lista de tareas</h3>
          <p>App para gestionar tareas con localStorage y modo oscuro.</p>
          <div class="proyecto__tech">
            <span>HTML</span><span>CSS</span><span>JS</span>
          </div>
          <a href="#" class="proyecto__link">Ver proyecto →</a>
        </article>
        <!-- más proyectos -->
      </div>
    </section>

    <section id="contacto" class="section">
      <h2 class="section__title">Contacto</h2>
      <p>¿Trabajamos juntos? Escríbeme a <a href="mailto:ana@ejemplo.com">ana@ejemplo.com</a>.</p>
    </section>
  </main>

  <footer class="footer">
    <p>© 2026 Ana García. Hecho con ❤️ y mucho ☕.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
\`\`\`

---

## 🎨 Paso 2: CSS

\`\`\`css
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
\`\`\`

---

## ⚡ Paso 3: JavaScript (modo oscuro)

\`\`\`javascript
const btnTema = document.getElementById('tema');
const temaGuardado = localStorage.getItem('tema');

if (temaGuardado === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  btnTema.textContent = '☀️';
}

btnTema.addEventListener('click', () => {
  const actual = document.documentElement.getAttribute('data-theme');
  const nuevo = actual === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nuevo);
  localStorage.setItem('tema', nuevo);
  btnTema.textContent = nuevo === 'dark' ? '☀️' : '🌙';
});
\`\`\`

---

## 🚀 Paso 4: Desplegar

Sigue los pasos del [capítulo 09](09-despliegue.md) para desplegar en GitHub Pages o Netlify.

Tu portfolio estará en:

- \`https://tu-usuario.github.io/portfolio/\` (GitHub Pages)
- \`https://tu-portfolio.netlify.app\` (Netlify)

---

## ✅ Checklist de entrega

Antes de dar el proyecto por terminado:

- [ ] El **HTML es semántico** (\`header\`, \`nav\`, \`main\`, \`section\`, \`footer\`).
- [ ] El **CSS usa variables** y es responsive.
- [ ] El **modo oscuro** funciona y se guarda en localStorage.
- [ ] Las **imágenes tienen alt** descriptivo.
- [ ] Los **enlaces funcionan** (no hay \`href="#"\` vacíos).
- [ ] El **contraste** cumple WCAG AA.
- [ ] **Lighthouse** da más de 90 en Performance, Accessibility, Best Practices y SEO.
- [ ] El proyecto está **desplegado** y accesible públicamente.

---

## 🏆 ¡Has terminado el Nivel Intermedio!

Si has llegado hasta aquí, ya sabes:

- HTML, CSS y JavaScript
- Diseño responsive
- Formularios accesibles
- Git y GitHub
- Consumo de APIs
- Despliegue en producción
- Y tienes tu primer portfolio online

!!! quote "Enhorabuena"
    Has pasado de no saber nada a tener un portfolio profesional online. Eso es un logro enorme. Ahora toca el **Nivel Avanzado**: CSS moderno, JavaScript asíncrono, TypeScript, testing y arquitectura.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-10">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué debe incluir un portfolio profesional?</p>
<button class="quiz-option" data-opt="a">A) Solo una foto y un email</button>
<button class="quiz-option" data-opt="b">B) Hero, sobre mí, proyectos, habilidades y contacto</button>
<button class="quiz-option" data-opt="c">C) Solo los proyectos</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué hosting es ideal para un portfolio estático?</p>
<button class="quiz-option" data-opt="a">A) GitHub Pages o Netlify</button>
<button class="quiz-option" data-opt="b">B) AWS EC2</button>
<button class="quiz-option" data-opt="c">C) Un servidor físico propio</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=He%20terminado%20el%20Nivel%20Intermedio%20del%20Libro%20del%20Desarrollador%20Web%20%F0%9F%8E%89&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F10-proyecto-final%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F10-proyecto-final%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=He%20terminado%20el%20Nivel%20Intermedio%20del%20Libro%20del%20Desarrollador%20Web%20%F0%9F%8E%89%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F10-proyecto-final%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/10-proyecto-final/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 11 — CSS moderno](11-css-moderno.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
