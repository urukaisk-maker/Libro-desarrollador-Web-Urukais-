# 17 — Rendimiento

!!! quote "Ejercicio resuelto"
    Practica lazy loading y optimización de imágenes.

---

## 🎯 Objetivo

Optimiza una página con 10 imágenes para que:

1. Solo carguen cuando se acerquen al viewport.
2. Usen formatos modernos.
3. Tengan \`width\` y \`height\` para evitar CLS.

---

## 💡 Solución

\`\`\`html
<div class="galeria">
  <img src="img1.webp" alt="Imagen 1" loading="lazy" width="400" height="300">
  <img src="img2.webp" alt="Imagen 2" loading="lazy" width="400" height="300">
  <!-- ... -->
</div>
\`\`\`

\`\`\`html
<!-- Con srcset para responsive -->
<img
  src="foto-800.webp"
  srcset="foto-400.webp 400w, foto-800.webp 800w, foto-1600.webp 1600w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
  alt="Foto"
  loading="lazy"
  width="800"
  height="600"
>
\`\`\`

---

## 🧠 Conceptos clave

- \`loading="lazy"\`: carga diferida.
- \`width\` y \`height\`: reservan espacio, evitan CLS.
- \`srcset\` y \`sizes\`: imágenes responsive.
- WebP/AVIF: formatos modernos más ligeros.

---

## 🚀 Retos extra

- [ ] Convierte las imágenes a WebP con [Squoosh](https://squoosh.app/).
- [ ] Añade \`<picture>\` con fallback JPG.
- [ ] Mide el LCP antes y después con Lighthouse.

---

[← Ejercicio 16](16-testing.md){ .md-button }
[Ir al ejercicio 18 →](18-arquitectura.md){ .md-button .md-button--primary }
