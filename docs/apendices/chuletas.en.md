---
description: "Appendix: Quick cheat sheets. Reference resource from the Web Developer's Book."
---
# Quick Cheat Sheets

Condensed reference to keep handy.

## HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
</head>
<body>
  <h1>Heading</h1>
  <p>Paragraph with a <a href="url">link</a>.</p>
  <img src="img.png" alt="Description">
  <ul><li>Item</li></ul>
  <div class="caja">Block</div>
</body>
</html>
```

## CSS

```css
/* Selectors */
p { color: red; }
.clase { font-size: 1.2rem; }
#id { margin: 1rem; }

/* Box model */
.caja {
  padding: 1rem;
  border: 1px solid #ccc;
  margin: 1rem;
}

/* Flexbox */
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* Media query */
@media (min-width: 768px) {
  body { font-size: 18px; }
}
```

## JavaScript

```javascript
// Variables
const PI = 3.14;
let contador = 0;

// Functions
function saludar(nombre) { return `Hello ${nombre}`; }
const saludar2 = (nombre) => `Hello ${nombre}`;

// DOM
const el = document.querySelector('.clase');
el.textContent = 'New text';
el.classList.add('activo');

// Events
el.addEventListener('click', () => console.log('click'));

// Arrays
const nums = [1, 2, 3];
nums.map(n => n * 2);
nums.filter(n => n > 1);
nums.reduce((acc, n) => acc + n, 0);

// Fetch
const res = await fetch('[https://api.com/datos](https://api.com/datos)');
const data = await res.json();
```

## Git

```bash
git init
git status
git add .
git commit -m "message"
git log --oneline
git branch
git checkout -b new-branch
git push -u origin main
git pull
```

## Markdown

```markdown
# Heading 1
## Heading 2

**bold** *italic* `code`

- list
- list

1. numbered
2. numbered

[link](url)

![image](url)

> quote
```

## Emmet (VS Code)

| Shortcut | Output |
|---|---|
| `!` | Full HTML5 boilerplate |
| `ul>li*3` | `<ul>` with 3 `<li>` items |
| `div.clase` | `<div class="clase">` |
| `a[href="#"]` | `<a href="#">` |