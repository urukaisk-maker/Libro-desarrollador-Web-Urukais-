---
description: "Solved exercise 10: 10 — Portfolio. Step-by-step annotated solution from the Web Developer's Book."
---
# 10 — Portfolio

!!! quote "Solved exercise"
    Create a simple portfolio with semantic HTML and CSS.

---

## 🎯 Goal

Create a portfolio with:

1. An "About me" section.
2. A "Projects" section with 3 cards.
3. A "Contact" section with an email address.
4. Responsive design.

---

## 💡 Solution

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ana's Portfolio</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Ana García</h1>
    <p>Frontend developer</p>
  </header>

  <main>
    <section id="about-me">
      <h2>About me</h2>
      <p>I love building accessible and fast interfaces.</p>
    </section>

    <section id="projects">
      <h2>Projects</h2>
      <div class="proyectos">
        <article>
          <h3>To-do list</h3>
          <p>App to manage tasks with localStorage.</p>
        </article>
        <article>
          <h3>Movie search</h3>
          <p>Consumes the OMDB API.</p>
        </article>
        <article>
          <h3>Twitter clone</h3>
          <p>Interface built with React.</p>
        </article>
      </div>
    </section>

    <section id="contact">
      <h2>Contact</h2>
      <p>Write to me at <a href="mailto:ana@example.com">ana@example.com</a>.</p>
    </section>
  </main>

  <footer>
    <p>© 2026 Ana García</p>
  </footer>
</body>
</html>
```

```css
body {
  font-family: system-ui, sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

.proyectos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

article {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
```

---

## 🧠 Key Concepts

- Semantic HTML (`header`, `main`, `section`, `article`, `footer`).
- CSS Grid with `auto-fit` for responsive layouts.
- `mailto` links.

---

## 🚀 Extra Challenges

- [ ] Add dark mode.
- [ ] Add a profile photo.
- [ ] Add subtle hover animations.

---

[← Exercise 09](09-despliegue.md){ .md-button }
[Back to index](index.md){ .md-button .md-button--primary }