# Chuletas rápidas

Referencia condensada para tener a mano.

## HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título</title>
</head>
<body>
  <h1>Encabezado</h1>
  <p>Párrafo con <a href="url">enlace</a>.</p>
  <img src="img.png" alt="Descripción">
  <ul><li>Item</li></ul>
  <div class="caja">Bloque</div>
</body>
</html>
```

## CSS

```css
/* Selectores */
p { color: red; }
.clase { font-size: 1.2rem; }
#id { margin: 1rem; }

/* Modelo de caja */
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

// Funciones
function saludar(nombre) { return `Hola ${nombre}`; }
const saludar2 = (nombre) => `Hola ${nombre}`;

// DOM
const el = document.querySelector('.clase');
el.textContent = 'Nuevo texto';
el.classList.add('activo');

// Eventos
el.addEventListener('click', () => console.log('click'));

// Arrays
const nums = [1, 2, 3];
nums.map(n => n * 2);
nums.filter(n => n > 1);
nums.reduce((acc, n) => acc + n, 0);

// Fetch
const res = await fetch('https://api.com/datos');
const data = await res.json();
```

## Git

```bash
git init
git status
git add .
git commit -m "mensaje"
git log --oneline
git branch
git checkout -b nueva-rama
git push -u origin main
git pull
```

## Markdown

```markdown
# Título 1
## Título 2

**negrita** *cursiva* `código`

- lista
- lista

1. numerada
2. numerada

[enlace](url)

![imagen](url)

> cita
```

## Emmet (VS Code)

| Atajo | Resultado |
|---|---|
| `!` | Estructura HTML5 completa |
| `ul>li*3` | `<ul>` con 3 `<li>` |
| `div.clase` | `<div class="clase">` |
| `a[href="#"]` | `<a href="#">` |
