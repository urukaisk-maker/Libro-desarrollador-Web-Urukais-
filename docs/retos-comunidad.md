cd ~/Libro-desarrollador-Web-Urukais-
python3 -c "
contenido = '''# 🤝 Retos de la Comunidad

!!! quote \"Los retos que propone la comunidad\"
    Además de los retos semanales oficiales, la comunidad propone sus propios desafíos. Algunos son más fáciles, otros más difíciles, pero todos tienen algo en común: los ha propuesto alguien que está aprendiendo, igual que tú.

---

## 🎯 ¿Qué son los retos de la comunidad?

Son retos **propuestos por lectores** del libro, no por el autor. Pueden ser:

- Variantes de los retos oficiales.
- Problemas específicos que alguien encontró en su trabajo.
- Ideas locas que se te ocurrieron un domingo por la tarde.

Cada reto incluye el nombre del autor (o alias) y una descripción. Si quieres proponer uno, [abre un issue](#proponer-reto).

---

## 🌟 Retos destacados

<div class=\"retos-grid\">

<div class=\"reto-card\">
<div class=\"reto-card__badge\">💡 Propuesto por @urukaisk</div>
<h3 class=\"reto-card__title\">Modo oscuro automático</h3>
<p class=\"reto-card__desc\">Detecta la preferencia del sistema con <code>prefers-color-scheme</code> y aplica el tema automáticamente. Añade un botón para alternar manualmente.</p>
<div class=\"reto-card__meta\">
<span class=\"reto-tag\">CSS</span>
<span class=\"reto-tag\">JavaScript</span>
<span class=\"reto-tag\">🟢 Principiante</span>
</div>
</div>

<div class=\"reto-card\">
<div class=\"reto-card__badge\">💡 Propuesto por @urukaisk</div>
<h3 class=\"reto-card__title\">Buscador con debounce</h3>
<p class=\"reto-card__desc\">Un input de búsqueda que filtre una lista de elementos mientras escribes, pero con debounce de 300 ms para no saturar el navegador.</p>
<div class=\"reto-card__meta\">
<span class=\"reto-tag\">JavaScript</span>
<span class=\"reto-tag\">Debounce</span>
<span class=\"reto-tag\">🟡 Intermedio</span>
</div>
</div>

<div class=\"reto-card\">
<div class=\"reto-card__badge\">💡 Propuesto por @urukaisk</div>
<h3 class=\"reto-card__title\">Calculadora de propinas</h3>
<p class=\"reto-card__desc\">Una calculadora que, dado el total de una cuenta y el porcentaje de propina, calcule cuánto paga cada comensal.</p>
<div class=\"reto-card__meta\">
<span class=\"reto-tag\">HTML</span>
<span class=\"reto-tag\">JavaScript</span>
<span class=\"reto-tag\">🟢 Principiante</span>
</div>
</div>

<div class=\"reto-card\">
<div class=\"reto-card__badge\">💡 Propuesto por @urukaisk</div>
<h3 class=\"reto-card__title\">Lista de tareas con drag & drop</h3>
<p class=\"reto-card__desc\">Extiende la lista de tareas del proyecto guiado para permitir reordenar las tareas arrastrándolas. Usa la Drag and Drop API nativa.</p>
<div class=\"reto-card__meta\">
<span class=\"reto-tag\">JavaScript</span>
<span class=\"reto-tag\">Drag & Drop</span>
<span class=\"reto-tag\">🟠 Avanzado</span>
</div>
</div>

<div class=\"reto-card\">
<div class=\"reto-card__badge\">💡 Propuesto por @urukaisk</div>
<h3 class=\"reto-card__title\">Generador de paletas de colores</h3>
<p class=\"reto-card__desc\">Una app que genere paletas de 5 colores armónicos aleatorios y permita copiar cada color al portapapeles en formato HEX.</p>
<div class=\"reto-card__meta\">
<span class=\"reto-tag\">JavaScript</span>
<span class=\"reto-tag\">Clipboard API</span>
<span class=\"reto-tag\">🟡 Intermedio</span>
</div>
</div>

<div class=\"reto-card\">
<div class=\"reto-card__badge\">💡 Propuesto por @urukaisk</div>
<h3 class=\"reto-card__title\">Reloj analógico con CSS</h3>
<p class=\"reto-card__desc\">Un reloj analógico que muestre la hora actual usando solo HTML y CSS (con transformaciones y animaciones). Nada de Canvas.</p>
<div class=\"reto-card__meta\">
<span class=\"reto-tag\">CSS</span>
<span class=\"reto-tag\">Animaciones</span>
<span class=\"reto-tag\">🟡 Intermedio</span>
</div>
</div>

</div>

---

## 📬 Proponer un reto { #proponer-reto }

¿Tienes una idea para un reto? Rellena este formulario o abre un issue en GitHub.

<form class=\"reto-form\" action=\"https://formspree.io/f/TU_FORM_ID\" method=\"POST\">
  <div class=\"reto-field\">
    <label for=\"reto-titulo\">Título del reto <span class=\"required\">*</span></label>
    <input type=\"text\" id=\"reto-titulo\" name=\"titulo\" required placeholder=\"Ej: Generador de contraseñas seguras\">
  </div>

  <div class=\"reto-field\">
    <label for=\"reto-desc\">Descripción <span class=\"required\">*</span></label>
    <textarea id=\"reto-desc\" name=\"descripcion\" rows=\"4\" required placeholder=\"¿Qué hay que construir? ¿Qué requisitos debe cumplir?\"></textarea>
  </div>

  <div class=\"reto-field\">
    <label for=\"reto-nivel\">Nivel de dificultad <span class=\"required\">*</span></label>
    <select id=\"reto-nivel\" name=\"nivel\" required>
      <option value=\"\">— Selecciona —</option>
      <option value=\"principiante\">🟢 Principiante</option>
      <option value=\"intermedio\">🟡 Intermedio</option>
      <option value=\"avanzado\">🟠 Avanzado</option>
      <option value=\"profesional\">🔴 Profesional</option>
    </select>
  </div>

  <div class=\"reto-field\">
    <label for=\"reto-tech\">Tecnologías <span class=\"required\">*</span></label>
    <input type=\"text\" id=\"reto-tech\" name=\"tech\" required placeholder=\"Ej: HTML, CSS, JavaScript\">
  </div>

  <div class=\"reto-field\">
    <label for=\"reto-autor\">Tu nombre o alias <span class=\"required\">*</span></label>
    <input type=\"text\" id=\"reto-autor\" name=\"autor\" required placeholder=\"Ej: @tu-usuario\">
  </div>

  <button type=\"submit\" class=\"md-button md-button--primary\">💡 Proponer reto</button>
</form>

!!! note \"¿No funciona el formulario?\"
    Si el formulario no responde, abre un [issue en GitHub](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/issues/new) con la etiqueta \`reto\`.

---

## 📜 Historial de retos propuestos

| Reto | Autor | Nivel | Estado |
| :--- | :--- | :--- | :--- |
| Modo oscuro automático | @urukaisk | 🟢 | 🟢 Activo |
| Buscador con debounce | @urukaisk | 🟡 | 🟢 Activo |
| Calculadora de propinas | @urukaisk | 🟢 | 🟢 Activo |
| Lista de tareas con drag & drop | @urukaisk | 🟠 | 🟢 Activo |
| Generador de paletas | @urukaisk | 🟡 | 🟢 Activo |
| Reloj analógico con CSS | @urukaisk | 🟡 | 🟢 Activo |

---

## 🏆 Soluciones de la comunidad

Si has resuelto un reto, comparte tu solución:

- **GitHub Discussions**: [Ir a Discussions](https://github.com/urukaisk-maker/Libro-desarrollador-Web-Urukais-/discussions)
- **Twitter/X**: usa el hashtag \`#LibroDelDesarrolladorWeb\`
- **CodePen/StackBlitz**: pega el enlace en el hilo del reto

Las soluciones más creativas aparecerán destacadas en esta página.

---

## 🤔 ¿Por qué participar?

- **Practicas lo que aprendes**: los retos son la mejor forma de afianzar conceptos.
- **Recibes feedback**: otras personas comentan tu solución.
- **Aprendes de otras soluciones**: siempre hay alguien que lo resuelve de forma más elegante.
- **Aparecerás en la página**: si tu reto es aceptado, tu nombre aparecerá aquí.
- **Acumulas XP**: contribuye a tu nivel en el [sistema de logros](logros.md).

---

## ➡️ Siguientes pasos

[🎯 Ver los retos oficiales](retos.md){ .md-button .md-button--primary }
[🎮 Ir al Playground](playground.md){ .md-button }
[🏆 Ver mis logros](logros.md){ .md-button }
'''
open('docs/retos-comunidad.md', 'w', encoding='utf-8').write(contenido)
print('OK:', len(contenido.splitlines()), 'líneas escritas')
"