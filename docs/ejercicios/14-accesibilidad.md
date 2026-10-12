# Ejercicios resueltos — Capítulo 14

[Volver al índice](index.md) · [Capítulo original](../capitulos/14-accesibilidad.md)

## Ejercicio 1: Auditar con Lighthouse

> Audita tu portfolio con Lighthouse y corrige los problemas.

### Solución

**Pasos:**

1. Abre DevTools con `F12`.
2. Ve a la pestaña **Lighthouse**.
3. Marca solo **Accessibility**.
4. Pulsa **Analyze page load**.
5. Revisa los problemas y corrígelos uno a uno.

**Problemas típicos y sus soluciones:**

| Problema | Solución |
|---|---|
| Imágenes sin `alt` | Añade `alt` descriptivo |
| Contraste insuficiente | Ajusta los colores (AA mínimo) |
| `<html>` sin `lang` | Añade `lang="es"` |
| Botones sin nombre | Añade texto visible o `aria-label` |
| Orden de encabezados | Usa `h1` → `h2` → `h3` sin saltos |

---

## Ejercicio 2: Navegar con `Tab`

> Navega toda la home solo con la tecla `Tab`.

### Solución

**Cómo comprobar:**

1. Recarga la página.
2. Pulsa `Tab` repetidamente.
3. Comprueba:
   - ¿Ves dónde está el foco?
   - ¿Puedes llegar a todos los enlaces y botones?
   - ¿Puedes activarlos con `Enter` o `Espacio`?

**Si el foco no se ve, arregla el CSS:**

```css
:focus-visible {
  outline: 3px solid #6a5acd;
  outline-offset: 2px;
  border-radius: 4px;
}
```

---

## Ejercicio 3: Skip link

> Añade un skip link y verifícalo con el teclado.

### Solución

```html
<a href="#main" class="skip-link">Saltar al contenido principal</a>

<nav>...</nav>

<main id="main">
  <!-- contenido -->
</main>
```

```css
.skip-link {
  position: absolute;
  top: -60px;
  left: 1rem;
  background: #6a5acd;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  text-decoration: none;
  z-index: 1000;
  transition: top 200ms;
}

.skip-link:focus {
  top: 1rem;
}
```

**Verificación:** recarga y pulsa `Tab`. El skip link debe aparecer arriba a la izquierda.

---

## Ejercicio 4: Formulario accesible

> Crea un formulario accesible con errores bien asociados.

### Solución

```html
<form novalidate>
  <label for="email">Correo electrónico</label>
  <input
    type="email"
    id="email"
    name="email"
    required
    aria-describedby="email-error"
    aria-invalid="false"
  >
  <p id="email-error" role="alert" hidden>
    El correo no tiene un formato válido.
  </p>

  <button type="submit">Enviar</button>
</form>

<script>
  const form = document.querySelector('form');
  const email = document.getElementById('email');
  const error = document.getElementById('email-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!email.validity.valid) {
      email.setAttribute('aria-invalid', 'true');
      error.hidden = false;
      email.focus();
    } else {
      email.setAttribute('aria-invalid', 'false');
      error.hidden = true;
      console.log('Formulario válido');
    }
  });
</script>
```

---

## Ejercicio 5: `prefers-reduced-motion`

> Implementa `prefers-reduced-motion` en tus animaciones.

### Solución

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

O selectivo: solo desactiva las animaciones grandes.

```css
@media (prefers-reduced-motion: reduce) {
  .animacion-grande {
    animation: none;
  }
}
```

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/14-accesibilidad.md)
