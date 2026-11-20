---
description: "Solved exercise 02: 02 — Basic HTML. Step-by-step annotated solution from the Web Developer's Book."
---
# 02 — Basic HTML

!!! quote "Solved exercise"
    Practice the semantic structure of an HTML page.

---

## 🎯 Goal

Create a page with:

1. `<header>` with a title and a `<nav>` containing 3 links.
2. `<main>` with an `<article>` and an `<aside>`.
3. `<footer>` with a copyright notice.

---

## 💡 Solution

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My blog</title>
</head>
<body>
  <header>
    <h1>My personal blog</h1>
    <nav>
      <a href="#inicio">Home</a>
      <a href="#sobre-mi">About me</a>
      <a href="#contacto">Contact</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>My first post</h2>
      <p>Today I learned semantic HTML.</p>
    </article>

    <aside>
      <h3>Links</h3>
      <ul>
        <li><a href="#">MDN</a></li>
        <li><a href="#">CSS Tricks</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>© 2026 My blog</p>
  </footer>
</body>
</html>
```

---

## 🧠 Key Concepts

- **Semantic tags**: describe what each part is.
- `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`.
- Each one has a purpose and improves accessibility + SEO.

---

## 🚀 Extra Challenges

- [ ] Add an image with `<figure>` and `<figcaption>`.
- [ ] Add a table with `<table>`.
- [ ] Add a contact form.

---

[← Exercise 01](01-introduccion.md){ .md-button }
[Go to exercise 03 →](03-css-basico.md){ .md-button .md-button--primary }