# 03 — CSS básico

!!! abstract "Qué vas a aprender"
    - Qué es CSS y cómo se aplica.
    - Selectores, especificidad y cascada.
    - El modelo de caja y `box-sizing`.
    - `display`, `position` y `z-index`.
    - Flexbox y Grid en profundidad.
    - Variables, funciones modernas y `clamp()`.
    - Transitions, transforms y `prefers-reduced-motion`.
    - Media queries y accesibilidad.

---

## 🎨 ¿Qué es CSS?

**CSS** (*Cascading Style Sheets*) es el lenguaje que define la **presentación** de una página web: colores, tipografía, layout, animaciones.

!!! quote "La analogía del cuerpo humano"
    Si HTML es el **esqueleto**, CSS es la **piel, la ropa y el maquillaje**. Define cómo se ve, se siente y se mueve todo lo que el HTML estructura.

```css
h1 {
  color: #6a5acd;
  font-size: 2rem;
  font-family: system-ui, sans-serif;
}
