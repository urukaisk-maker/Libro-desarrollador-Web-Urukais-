# Capítulo 10 — Proyecto final: tu portfolio

## Objetivo

Vas a construir tu **portfolio personal**: una web con tu presentación, tus proyectos y un formulario de contacto. Al terminar, lo desplegarás en internet.

## Estructura del proyecto

```
mi-portfolio/
├── index.html
├── proyectos.html
├── contacto.html
├── css/
│   └── estilos.css
├── js/
│   └── main.js
└── img/
    └── (tus imágenes)
```

## Paso 1: Planificar

Antes de escribir código, responde:

1. ¿Qué quieres mostrar? (bio, proyectos, contacto)
2. ¿Qué estilo visual? (minimalista, colorido, oscuro)
3. ¿Qué secciones? (típico: Inicio · Proyectos · Sobre mí · Contacto)

## Paso 2: HTML base

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tu Nombre — Portfolio</title>
  <meta name="description" content="Portfolio de Tu Nombre, desarrollador web.">
  <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Inicio</a>
      <a href="proyectos.html">Proyectos</a>
      <a href="contacto.html">Contacto</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <h1>Hola, soy <span>Tu Nombre</span></h1>
      <p>Desarrollador web especializado en frontend.</p>
    </section>
  </main>

  <footer>
    <p>© 2026 Tu Nombre</p>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

## Paso 3: CSS responsive

```css
* { box-sizing: border-box; }

body {
  font-family: system-ui, sans-serif;
  margin: 0;
  line-height: 1.6;
  color: #1e293b;
  background: #f8fafc;
}

nav {
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  background: #0f172a;
}

nav a {
  color: #e2e8f0;
  text-decoration: none;
}

nav a:hover { color: #a78bfa; }

.hero {
  max-width: 800px;
  margin: 4rem auto;
  padding: 0 1rem;
  text-align: center;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.hero span {
  background: linear-gradient(90deg, #a78bfa, #22d3ee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

## Paso 4: JavaScript mínimo

```javascript
// Año dinámico en el footer
document.querySelector('footer p').textContent =
  `© ${new Date().getFullYear()} Tu Nombre`;

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});
```

## Paso 5: Añadir tus proyectos

En `proyectos.html`, muestra tarjetas con:

- Captura o imagen.
- Título.
- Descripción breve.
- Enlace al repositorio o demo.

## Paso 6: Desplegar

1. Sube el proyecto a un repositorio en GitHub.
2. Activa GitHub Pages en **Settings → Pages**.
3. Comparte la URL.

!!! tip "Consejo"
    Añade tu portfolio a la firma de tu GitHub y a tu LinkedIn. Es tu carta de presentación.

## Ejercicios finales

1. Personaliza colores y tipografía a tu gusto.
2. Añade una sección "Sobre mí" con tu foto.
3. Crea un formulario de contacto funcional con [Formspree](https://formspree.io/).
4. Añade modo oscuro con un botón.
5. Conecta el proyecto a Netlify para tener CI/CD automático.

---

⬅ [Capítulo 9 — Despliegue](09-despliegue.md) | ➡ [Apéndices](../apendices/chuletas.md)
