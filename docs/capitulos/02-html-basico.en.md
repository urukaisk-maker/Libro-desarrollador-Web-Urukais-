---
description: "Chapter 02 of the Web Developer's Book: 02 — Basic HTML. Learn step by step with examples, exercises, and quizzes."
---
# 02 — Basic HTML

!!! abstract "What you will learn"
    - The structure of an HTML document.
    - Tags, attributes, and nesting.
    - Essential tags: headings, paragraphs, lists, links, images.
    - What semantic HTML is and why it matters.
    - How to validate your HTML.

---

## 🌐 What is HTML?

**HTML** (*HyperText Markup Language*) is the markup language that defines the **structure** of a web page. It is not a programming language: it has no variables, loops, or conditionals. It is a **markup language**—a system of tags that tells the browser what each element is.

!!! quote "The skeleton analogy"
    If a web page were a human body, HTML would be the **skeleton** (structure), CSS the **skin and clothes** (appearance), and JavaScript the **muscles** (movement and interaction).

~~~html
<h1>This is a heading</h1>
<p>This is a paragraph with <strong>bold text</strong>.</p>
~~~

---

## 🏛 HTML Document Structure

Every HTML document follows the same skeleton:

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My first page</title>
</head>
<body>
  <h1>Hello, world!</h1>
  <p>My first web page.</p>
</body>
</html>
~~~

### What does each line do?

| Line | Purpose |
| :--- | :--- |
| `<!DOCTYPE html>` | Tells the browser the document is HTML5. |
| `<html lang="en">` | Root of the document. `lang="en"` sets the language (important for screen readers and SEO). |
| `<head>` | Metadata: not shown on the page itself, but configures the document. |
| `<meta charset="UTF-8">` | Character encoding. Without it, accents and special characters can look broken. |
| `<meta name="viewport" ...>` | Makes the page adapt to mobile screens. |
| `<title>` | Text shown in the browser tab. |
| `<body>` | **Everything visible** on the page goes inside here. |

~~~mermaid
graph TD
A[html] --> B[head]
A --> C[body]
B --> B1[meta charset]
B --> B2[title]
B --> B3[meta viewport]
C --> C1[h1]
C --> C2[p]
C --> C3[img]
~~~

---

## 🏷 Tags, Attributes, and Nesting

### Tags

A **tag** goes between `<` and `>`. Almost always they come **in pairs**:

~~~html
<p>Content</p>
~~~

- `<p>` → opening tag.
- `</p>` → closing tag (with `/`).
- `Content` → what sits between them.

Some are **self-closing** (no closing tag):

~~~html
<img src="photo.jpg" alt="A photo">
<br>
<hr>
<input type="text">
~~~

### Attributes

**Attributes** add extra information to a tag. They go inside the opening tag:

~~~html
<a href="https://developer.mozilla.org">MDN Web Docs</a>
~~~

- `href` is the attribute.
- `"https://developer.mozilla.org"` is the value.

### Nesting

Tags can be nested (one inside another). **They must close in reverse order** from how they opened:

~~~html
<p>This is <strong>very important</strong>.</p>   <!-- ✅ valid -->
<p>This is <strong>very important.</p></strong>   <!-- ❌ invalid -->
~~~

!!! warning "Nesting errors"
    A common beginner mistake is closing tags in the wrong order. If you open `<strong>` inside a `<p>`, close `</strong>` **before** `</p>`.

---

## 📝 Essential Tags

### Headings: `<h1>` to `<h6>`

There are 6 heading levels. `<h1>` is the most important and `<h6>` the least. Each page should have **a single `<h1>`**.

~~~html
<h1>Main title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
~~~

!!! tip "Hierarchy, not size"
    Don't pick `<h3>` "because it looks smaller". Use the level that **semantically** matches the content structure. Size is controlled with CSS.

### Paragraphs: `<p>`

~~~html
<p>This is a normal paragraph.</p>
<p>This is another separate paragraph.</p>
~~~

### Lists

**Unordered** (bullets):

~~~html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
~~~

**Ordered** (numbers):

~~~html
<ol>
  <li>Install the editor</li>
  <li>Create the file</li>
  <li>Write the code</li>
</ol>
~~~

### Links: `<a>`

~~~html
<a href="https://developer.mozilla.org">Visit MDN</a>
<a href="contact.html">Contact page</a>
<a href="#section">Jump to a section</a>
~~~

!!! warning "External links"
    For links that open in a new tab (`target="_blank"`), always add `rel="noopener noreferrer"` for security.

### Images: `<img>`

~~~html
<img src="photo.jpg" alt="A sunset beach" width="400">
~~~

- `src` → image path.
- `alt` → alternative text (required for accessibility).

!!! warning "`alt` is not optional"
    The `alt` attribute describes the image for people who cannot see it (screen readers, broken images, SEO). If the image is purely decorative, use `alt=""` (empty).

### Emphasis: `<strong>` and `<em>`

~~~html
<p>This is <strong>important</strong> and this is <em>emphatic</em>.</p>
~~~

- `<strong>` → importance (usually rendered **bold**).
- `<em>` → emphasis (usually rendered *italic*).

---

## 🧩 Semantic HTML

**Semantic** tags describe the meaning of content, not just how it looks. They are key for accessibility and SEO:

~~~html
<header>
  <h1>My blog</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>

<main>
  <article>
    <h2>My first post</h2>
    <p>Post content…</p>
  </article>
</main>

<footer>
  <p>© 2026 My blog</p>
</footer>
~~~

| Tag | Meaning |
| :--- | :--- |
| `<header>` | Header (logo, title, navigation). |
| `<nav>` | Navigation block (menu). |
| `<main>` | Main content (one per page). |
| `<article>` | Standalone content (post, news item). |
| `<section>` | Thematic section with its own heading. |
| `<aside>` | Tangential content (sidebar). |
| `<footer>` | Footer. |

!!! tip "Rule of thumb"
    When torn between a `<div>` and a semantic tag, pick the semantic one. Use `<div>` only when nothing else fits.

---

## 🧪 Practical Exercise

!!! example "Your first complete page"
    Create an `index.html` file with:
    - An `<h1>` with your name.
    - A `<p>` with a sentence about yourself.
    - A `<ul>` list with your 3 favorite languages.
    - A link to MDN.
    - An image (can be a URL).

When you're done, open it in your browser (double click) and verify how it looks.

??? success "Solution"
    ~~~html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>My first page</title>
    </head>
    <body>
      <h1>Urukais</h1>
      <p>I'm a web developer and love teaching.</p>
      <h2>My favorite languages</h2>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </ul>
      <p><a href="https://developer.mozilla.org/">Visit MDN</a></p>
      <img src="https://picsum.photos/400/200" alt="Random image" width="400">
    </body>
    </html>
    ~~~

---

## 🧠 Quiz

!!! question "Check what you learned"

??? success "1. Which declaration indicates the document is HTML5?"
    `<!DOCTYPE html>` at the very top of the file.

??? success "2. What is the difference between `<strong>` and `<b>`?"
    `<strong>` indicates **semantic importance** (for screen readers and SEO); `<b>` only applies **visual bold**. Whenever possible, use `<strong>`.

??? success "3. What is the `alt` attribute on images for?"
    It describes the image for people who cannot see it (accessibility), when the image fails to load, and for SEO.

??? success "4. How many `<h1>` tags should a page have?"
    Ideally one. It reflects the main heading of the document.

## 📚 Resources

- [MDN — HTML: HyperText Markup Language](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN — HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [HTML Living Standard (WHATWG)](https://html.spec.whatwg.org/)
- [W3C HTML Validator](https://validator.w3.org/)

---

➡ Next chapter: [03 — CSS básico](03-css-basico.md)

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-2">
<div class="quiz-question" data-answer="b">
  <p><strong>1.</strong> Which tag defines the main heading of a page?</p>
  <button class="quiz-option" data-opt="a">A) p</button>
  <button class="quiz-option" data-opt="b">B) h1</button>
  <button class="quiz-option" data-opt="c">C) title</button>
</div>
<div class="quiz-question" data-answer="b">
  <p><strong>2.</strong> What is the alt attribute on an image for?</p>
  <button class="quiz-option" data-opt="a">A) Change size</button>
  <button class="quiz-option" data-opt="b">B) Describe the image</button>
  <button class="quiz-option" data-opt="c">C) Add a border</button>
</div>
<div class="quiz-question" data-answer="a">
  <p><strong>3.</strong> What is the right structure for an HTML document?</p>
  <button class="quiz-option" data-opt="a">A) DOCTYPE, html, head, body</button>
  <button class="quiz-option" data-opt="b">B) head, html, body, DOCTYPE</button>
  <button class="quiz-option" data-opt="c">C) html, DOCTYPE, body, head</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
  <a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%202%3A%20Basic%20HTML&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F02-html-basico%2F" target="_blank" rel="noopener">Twitter</a>
  <a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F02-html-basico%2F" target="_blank" rel="noopener">LinkedIn</a>
  <button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/02-html-basico/" aria-label="Copy link">Copy link</button>
</div>
