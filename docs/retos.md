cd ~/Libro-desarrollador-Web-Urukais-
python3 -c "
contenido = '''# 🎯 Retos Semanales

!!! quote \"Aprende resolviendo problemas reales\"
    Cada semana se publica un reto de código corto para poner a prueba lo que has aprendido. Puedes resolverlo a tu ritmo, compartir tu solución y comparar con otras personas de la comunidad.

---

## 🎯 ¿Qué es un reto semanal?

Un **reto semanal** es un problema de código acotado que se puede resolver en 1–3 horas. Cada reto incluye:

- **Objetivo**: qué hay que construir.
- **Requisitos**: qué debe cumplir la solución.
- **Pistas**: si te atascas, puedes mirarlas.
- **Soluciones**: cuando el reto termina, se publican las soluciones de la comunidad.

!!! tip \"¿Cómo participar?\"
    1. Lee el reto de la semana.
    2. Resuélvelo en tu editor (o en el [Playground](playground.md)).
    3. Comparte tu solución en [GitHub Discussions](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/discussions).
    4. Compara con otras soluciones.

---

## 📅 Retos activos

<div class=\"retos-grid\">

<div class=\"reto-card\">
<div class=\"reto-card__badge\">🎯 Reto #5</div>
<h3 class=\"reto-card__title\">Validador de formulario</h3>
<p class=\"reto-card__desc\">Construye un formulario de registro con validación en tiempo real usando la Constraint Validation API.</p>
<div class=\"reto-card__meta\">
<span class=\"reto-tag\">JavaScript</span>
<span class=\"reto-tag\">Formularios</span>
<span class=\"reto-tag\">🟡 Intermedio</span>
</div>
<a href=\"retos/reto-5.md\" class=\"md-button md-button--primary\">Ver reto</a>
</div>

<div class=\"reto-card\">
<div class=\"reto-card__badge\">🎯 Reto #4</div>
<h3 class=\"reto-card__title\">Galería responsive</h3>
<p class=\"reto-card__desc\">Crea una galería de imágenes responsive con CSS Grid, lightbox y lazy loading.</p>
<div class=\"reto-card__meta\">
<span class=\"reto-tag\">CSS</span>
<span class=\"reto-tag\">Grid</span>
<span class=\"reto-tag\">🟡 Intermedio</span>
</div>
<a href=\"retos/reto-4.md\" class=\"md-button\">Ver reto</a>
</div>

<div class=\"reto-card\">
<div class=\"reto-card__badge\">🎯 Reto #3</div>
<h3 class=\"reto-card__title\">Contador de clics</h3>
<p class=\"reto-card__desc\">Un botón que cuenta clics, con persistencia en localStorage y botón de reset.</p>
<div class=\"reto-card__meta\">
<span class=\"reto-tag\">JavaScript</span>
<span class=\"reto-tag\">localStorage</span>
<span class=\"reto-tag\">🟢 Principiante</span>
</div>
<a href=\"retos/reto-3.md\" class=\"md-button\">Ver reto</a>
</div>

<div class=\"reto-card\">
<div class=\"reto-card__badge\">🎯 Reto #2</div>
<h3 class=\"reto-card__title\">Tarjeta de presentación</h3>
<p class=\"reto-card__desc\">Diseña una tarjeta de presentación personal con HTML y CSS, con modo oscuro y responsive.</p>
<div class=\"reto-card__meta\">
<span class=\"reto-tag\">HTML</span>
<span class=\"reto-tag\">CSS</span>
<span class=\"reto-tag\">🟢 Principiante</span>
</div>
<a href=\"retos/reto-2.md\" class=\"md-button\">Ver reto</a>
</div>

<div class=\"reto-card\">
<div class=\"reto-card__badge\">🎯 Reto #1</div>
<h3 class=\"reto-card__title\">El botón camaleón</h3>
<p class=\"reto-card__desc\">Un botón que cambia de color cada vez que se pulsa, con una animación suave.</p>
<div class=\"reto-card__meta\">
<span class=\"reto-tag\">CSS</span>
<span class=\"reto-tag\">JavaScript</span>
<span class=\"reto-tag\">🟢 Principiante</span>
</div>
<a href=\"retos/reto-1.md\" class=\"md-button\">Ver reto</a>
</div>

</div>

---

## 🏆 Cómo se puntúan los retos

Cada reto tiene una puntuación según su dificultad:

| Nivel | Puntos | Tiempo estimado |
| :--- | :--- | :--- |
| 🟢 Principiante | 10 XP | 30 min – 1 h |
| 🟡 Intermedio | 20 XP | 1–2 h |
| 🟠 Avanzado | 30 XP | 2–4 h |
| 🔴 Profesional | 50 XP | 4–8 h |

Los puntos se acumulan en tu perfil y contribuyen a tu nivel en el [sistema de logros](logros.md).

---

## 📊 Clasificación semanal

*(Aún no hay clasificación. Sé el primero en compartir tu solución.)*

---

## 📜 Historial de retos

| Reto | Tema | Fecha | Estado |
| :--- | :--- | :--- | :--- |
| #5 | Validador de formulario | Nov 2026 | 🟢 Activo |
| #4 | Galería responsive | Oct 2026 | ✅ Completado |
| #3 | Contador de clics | Oct 2026 | ✅ Completado |
| #2 | Tarjeta de presentación | Sep 2026 | ✅ Completado |
| #1 | El botón camaleón | Sep 2026 | ✅ Completado |

---

## 💡 ¿Tienes una idea para un reto?

Si se te ocurre un reto que podría gustar a la comunidad, abre un [issue en GitHub](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new) con la etiqueta `reto`. Los retos más votados se añaden al calendario.

---

## ➡️ Siguientes pasos

[🤝 Ver retos de la comunidad](retos-comunidad.md){ .md-button .md-button--primary }
[🎮 Ir al Playground](playground.md){ .md-button }
[🏆 Ver mis logros](logros.md){ .md-button }
'''
open('docs/retos.md', 'w', encoding='utf-8').write(contenido)
print('OK:', len(contenido.splitlines()), 'líneas escritas')
"